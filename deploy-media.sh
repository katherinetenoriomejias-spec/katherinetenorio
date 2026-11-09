#!/usr/bin/env bash
set -euo pipefail

# Sincroniza solo los vídeos a /opt/media/kathatenorio/videos (fuera de la imagen).
# Uso:
#   ./deploy-media.sh
#   DEPLOY_HOST=kathavps-root ./deploy-media.sh

HOST="${DEPLOY_HOST:-kathavps}"
MEDIA_DIR="${MEDIA_DIR:-/opt/media/kathatenorio/videos}"
ROOT="$(cd "$(dirname "$0")" && pwd)"

TARBALL="$(mktemp "${TMPDIR:-/tmp}/katha-videos.XXXXXX")"
REMOTE_TAR="/tmp/katha-videos.tar"
trap 'rm -f "$TARBALL"' EXIT

echo "==> Empaquetando vídeos"
COPYFILE_DISABLE=1 tar --no-mac-metadata -cf "$TARBALL" -C "$ROOT/public/videos" .

echo "==> Subiendo con scp a $HOST:$MEDIA_DIR"
scp "$TARBALL" "$HOST:$REMOTE_TAR"

echo "==> Extrayendo"
ssh "$HOST" "mkdir -p '$MEDIA_DIR' && tar -xf '$REMOTE_TAR' -C '$MEDIA_DIR' && rm -f '$REMOTE_TAR' && chmod -R u+rwX,go+rX '$MEDIA_DIR'"

echo "==> Listo: $(ssh "$HOST" "ls '$MEDIA_DIR' | wc -l") archivos en $MEDIA_DIR"
