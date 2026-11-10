#!/usr/bin/env bash
set -euo pipefail

# Genera public/media-kit-katha-tenorio.pdf a partir de la página /media-kit/.
# Requisitos: Node (npm) o Bun, python3 y Google Chrome.
#
# Uso:
#   ./scripts/generate-media-kit-pdf.sh
#   CHROME_BIN=/ruta/a/chrome PORT=8765 ./scripts/generate-media-kit-pdf.sh
#
# El PDF se sirve como archivo estático y se descarga desde el botón del hero.
# Volvé a ejecutarlo cuando cambie el contenido del media kit.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHROME_BIN="${CHROME_BIN:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PORT="${PORT:-8765}"
OUT="$ROOT/public/media-kit-katha-tenorio.pdf"
PROFILE_DIR="$(mktemp -d "${TMPDIR:-/tmp}/chrome-media-kit.XXXXXX")"
SERVER_PID=""

cleanup() {
  if [ -n "$SERVER_PID" ]; then kill "$SERVER_PID" 2>/dev/null || true; fi
  rm -rf "$PROFILE_DIR"
}
trap cleanup EXIT

if [ ! -x "$CHROME_BIN" ]; then
  echo "ERROR: Chrome no encontrado en '$CHROME_BIN'." >&2
  echo "Definí CHROME_BIN con la ruta al ejecutable de Chrome." >&2
  exit 1
fi

echo "==> Construyendo el sitio"
cd "$ROOT"
if command -v bun >/dev/null 2>&1; then
  bun run build
elif [ -x "$HOME/.bun/bin/bun" ]; then
  "$HOME/.bun/bin/bun" run build
else
  npm run build
fi

echo "==> Sirviendo dist en 127.0.0.1:$PORT"
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$ROOT/dist" >/dev/null 2>&1 &
SERVER_PID=$!

for _ in $(seq 1 50); do
  if curl -sf "http://127.0.0.1:$PORT/media-kit/" >/dev/null; then break; fi
  sleep 0.2
done

if ! curl -sf "http://127.0.0.1:$PORT/media-kit/" >/dev/null; then
  echo "ERROR: el servidor local no respondió en el puerto $PORT." >&2
  exit 1
fi

echo "==> Generando PDF"
"$CHROME_BIN" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --virtual-time-budget=15000 \
  --user-data-dir="$PROFILE_DIR" \
  --print-to-pdf="$OUT" \
  "http://127.0.0.1:$PORT/media-kit/"

if [ ! -s "$OUT" ]; then
  echo "ERROR: no se generó el PDF." >&2
  exit 1
fi

echo "==> Listo: $OUT"
ls -lh "$OUT"
