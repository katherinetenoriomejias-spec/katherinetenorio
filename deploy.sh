#!/usr/bin/env bash
set -euo pipefail

# Despliegue del media kit al VPS (nginx-proxy ya instalado).
# Uso:
#   ./deploy.sh
#   DEPLOY_HOST=kathavps-root ./deploy.sh
#
# Requiere acceso SSH sin contraseña al host (por defecto kathavps).

HOST="${DEPLOY_HOST:-kathavps}"
PAGE_DIR="${PAGE_DIR:-/opt/stacks/pagina-kathatenorio}"
PROXY_DIR="${PROXY_DIR:-/opt/stacks/system-nginxproxy}"
ROOT="$(cd "$(dirname "$0")" && pwd)"

TARBALL="$(mktemp "${TMPDIR:-/tmp}/pagina-kathatenorio.XXXXXX")"
REMOTE_TAR="/tmp/pagina-kathatenorio.tar"
trap 'rm -f "$TARBALL"' EXIT

echo "==> Empaquetando el proyecto"
# --no-mac-metadata evita los xattrs de macOS (tar de GNU en el VPS los rechaza).
COPYFILE_DISABLE=1 tar --no-mac-metadata -cf "$TARBALL" -C "$ROOT" \
  --exclude=node_modules --exclude=dist --exclude=.astro --exclude=.vercel \
  --exclude=.git --exclude=.env --exclude=.DS_Store --exclude=__pycache__ \
  --exclude=public/videos .

echo "==> Subiendo con scp a $HOST"
scp "$TARBALL" "$HOST:$REMOTE_TAR"

echo "==> Extrayendo en $PAGE_DIR (conserva .env)"
# Limpia el destino para no dejar restos de despliegues anteriores.
ssh "$HOST" "mkdir -p '$PAGE_DIR' && find '$PAGE_DIR' -mindepth 1 -maxdepth 1 ! -name .env -exec rm -rf {} + && tar -xf '$REMOTE_TAR' -C '$PAGE_DIR' && rm -f '$REMOTE_TAR'"

echo "==> Creando .env inicial si no existe"
ssh "$HOST" "[ -f '$PAGE_DIR/.env' ] || cp '$PAGE_DIR/.env.example' '$PAGE_DIR/.env'"

echo "==> Instalando instrucciones para agentes"
scp "$ROOT/deploy/AGENTS.md" "$HOST:/opt/stacks/AGENTS.md"
scp "$ROOT/deploy/system-nginxproxy-AGENTS.md" "$HOST:/opt/stacks/system-nginxproxy/AGENTS.md"

echo "==> Asegurando red proxy y nginx-proxy"
ssh "$HOST" "docker network inspect proxy >/dev/null 2>&1 || docker network create proxy"
ssh "$HOST" "cd '$PROXY_DIR' && docker compose up -d"

echo "==> Construyendo y levantando la página"
ssh "$HOST" "cd '$PAGE_DIR' && docker compose up -d --build"

if ssh "$HOST" "grep -Eq '^LETSENCRYPT_HOST=.+' '$PAGE_DIR/.env'"; then
  echo "==> HTTPS activado: levantando acme-companion"
  ssh "$HOST" "cd '$PROXY_DIR' && docker compose --profile tls up -d"
else
  echo "==> HTTPS pendiente (LETSENCRYPT_HOST vacío)."
fi

echo "==> Listo"
ssh "$HOST" "cd '$PAGE_DIR' && docker compose ps"
