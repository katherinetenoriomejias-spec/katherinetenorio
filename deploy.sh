#!/usr/bin/env bash
set -euo pipefail

# Despliegue del media kit al VPS usando el repo Git.
# Uso:
#   ./deploy.sh
#   DEPLOY_HOST=kathavps-root ./deploy.sh
#
# Requisitos:
#   - El árbol local debe estar limpio (todo commiteado).
#   - El remoto local `kathatenorio` debe existir y aceptar push por SSH.
#   - El VPS debe tener acceso de lectura por HTTPS al repo.
#
# El script hace:
#   1. push de HEAD a kathatenorio/main
#   2. fetch + checkout de ese commit en /opt/stacks/pagina-kathatenorio
#   3. copia las instrucciones AGENTS.md a /opt/stacks
#   4. reconstruye y levanta el contenedor
#
# Los vídeos no van en la imagen: se sincronizan aparte con ./deploy-media.sh.

HOST="${DEPLOY_HOST:-kathavps}"
PAGE_DIR="${PAGE_DIR:-/opt/stacks/pagina-kathatenorio}"
PROXY_DIR="${PROXY_DIR:-/opt/stacks/system-nginxproxy}"
REMOTE="${DEPLOY_REMOTE:-kathatenorio}"
BRANCH="${DEPLOY_BRANCH:-main}"
REPO_URL="${REPO_URL:-https://github.com/katherinetenoriomejias-spec/katherinetenorio.git}"
ROOT="$(cd "$(dirname "$0")" && pwd)"
SSH=(ssh -o BatchMode=yes)

cd "$ROOT"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "ERROR: $ROOT no es un repo Git." >&2
  exit 1
fi

if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  echo "ERROR: no existe el remoto '$REMOTE' en este repo." >&2
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "ERROR: hay cambios sin commitear. Commitea antes de desplegar:" >&2
  git status --short >&2
  exit 1
fi

echo "==> Subiendo $(git rev-parse --short HEAD) a $REMOTE/$BRANCH"
git push "$REMOTE" "HEAD:$BRANCH"

echo "==> Actualizando el repo en el VPS"
"${SSH[@]}" "$HOST" bash -s -- "$PAGE_DIR" "$REPO_URL" "$BRANCH" <<'REMOTE_SCRIPT'
set -euo pipefail
PAGE_DIR="$1"
REPO_URL="$2"
BRANCH="$3"

mkdir -p "$PAGE_DIR"
cd "$PAGE_DIR"

if [ ! -d .git ]; then
  git init -q
  git remote add origin "$REPO_URL"
fi

git remote set-url origin "$REPO_URL"
git fetch --prune origin "$BRANCH"
# Limpia restos no versionados antes del checkout (respeta .env: está en .gitignore).
git clean -fd
git checkout -f -B "$BRANCH" "origin/$BRANCH"
git branch --set-upstream-to="origin/$BRANCH" "$BRANCH" >/dev/null 2>&1 || true
git log --oneline -1
REMOTE_SCRIPT

echo "==> Creando .env inicial si no existe"
"${SSH[@]}" "$HOST" "[ -f '$PAGE_DIR/.env' ] || cp '$PAGE_DIR/.env.example' '$PAGE_DIR/.env'"

echo "==> Instalando instrucciones para agentes"
"${SSH[@]}" "$HOST" "install -m 0644 '$PAGE_DIR/deploy/AGENTS.md' /opt/stacks/AGENTS.md && install -m 0644 '$PAGE_DIR/deploy/system-nginxproxy-AGENTS.md' '$PROXY_DIR/AGENTS.md'"

echo "==> Asegurando red proxy y nginx-proxy"
"${SSH[@]}" "$HOST" "docker network inspect proxy >/dev/null 2>&1 || docker network create proxy"
"${SSH[@]}" "$HOST" "cd '$PROXY_DIR' && docker compose up -d"

echo "==> Construyendo y levantando la página"
"${SSH[@]}" "$HOST" "cd '$PAGE_DIR' && docker compose up -d --build"

if "${SSH[@]}" "$HOST" "grep -Eq '^LETSENCRYPT_HOST=.+' '$PAGE_DIR/.env'"; then
  echo "==> HTTPS activado: levantando acme-companion"
  "${SSH[@]}" "$HOST" "cd '$PROXY_DIR' && docker compose --profile tls up -d"
else
  echo "==> HTTPS pendiente (LETSENCRYPT_HOST vacío)."
fi

echo "==> Listo"
"${SSH[@]}" "$HOST" "cd '$PAGE_DIR' && docker compose ps"
