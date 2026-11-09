# AGENTS.md — pagina-kathatenorio

Sitio en producción: **https://kathatenorio.com** (media kit de Katha Tenorio).

## Qué hay aquí

- Astro 5 con `output: 'static'` → build en `dist/` servido por `nginx:alpine`.
- **Los vídeos NO están en la imagen**: viven en `/opt/media/kathatenorio/videos`
  (~200 MB) y se montan read-only en `/usr/share/nginx/html/videos`.
- `public/fotos` (~5 MB) sí va dentro de la imagen.
- El panel de estadísticas se genera desde `public/data/social.json`; no hay backend ni API.
- Archivos de despliegue: `Dockerfile`, `docker-compose.yml`, `docker/nginx/default.conf`,
  `deploy.sh`, `deploy-media.sh`, `.dockerignore`.

## Cómo se publica

Contenedor `pagina-kathatenorio` en la red externa `proxy`:

- `VIRTUAL_HOST=kathatenorio.com,www.kathatenorio.com`
- `VIRTUAL_PORT=80`
- `LETSENCRYPT_HOST=kathatenorio.com,www.kathatenorio.com`
- Volumen read-only: `/opt/media/kathatenorio/videos:/usr/share/nginx/html/videos:ro`
- TLS por `acme-companion` (ver `/opt/stacks/system-nginxproxy/AGENTS.md`).

El `.env` del VPS no se toca al desplegar.

## Actualizar el sitio

El despliegue normal se hace desde el Mac, con el árbol limpio (todo commiteado):

```bash
./deploy.sh
```

El script hace `git push` de `HEAD` a `kathatenorio/main`, actualiza el checkout de
`/opt/stacks/pagina-kathatenorio` en el VPS por HTTPS (conserva `.env` y hace
`git clean -fd`), reconstruye la imagen y levanta el contenedor. **No sube los vídeos.**

En el VPS también se puede actualizar a mano:

```bash
cd /opt/stacks/pagina-kathatenorio
git fetch origin main && git checkout -f -B main origin/main
docker compose up -d --build
```

El repo del VPS lee por HTTPS; no depende de la clave SSH de GitHub.

### Actualizar solo los vídeos

```bash
./deploy-media.sh
```

Los copia a `/opt/media/kathatenorio/videos`, que está montado en el contenedor.
No hace falta reconstruir la imagen.

## Verificar después de desplegar

```bash
docker ps --filter name=pagina-kathatenorio
curl -sS https://kathatenorio.com/ | grep -o '<title>[^<]*</title>'
curl -sS -o /dev/null -w '%{http_code}\n' https://kathatenorio.com/media-kit/
curl -sS -o /dev/null -w '%{http_code}\n' https://kathatenorio.com/videos/destino1.mp4
docker logs --tail=30 pagina-kathatenorio
```

Esperado: título `Katha Tenorio — Media Kit`, rutas 200 y contenedor `healthy`.

## Problemas comunes

| Síntoma | Causa probable | Solución |
|---|---|---|
| 502 Bad Gateway | contenedor caído o sin red `proxy` | `docker ps`; `docker compose up -d --build` |
| Vídeos dan 404 | falta el bind mount o `/opt/media` vacío | `ls /opt/media/kathatenorio/videos`; `./deploy-media.sh` |
| Se ve la web vieja | caché de Cloudflare o build antiguo | reconstruir y purgar caché en Cloudflare |
| HTTPS no responde | certificado no emitido | `docker logs acme-companion` |
| Cambios no aparecen | falta rebuild | `docker compose up -d --build` (no basta `restart`) |
| `git fetch` falla en el VPS | `origin` no apunta al repo o no hay red | `git -C /opt/stacks/pagina-kathatenorio remote -v`; reintentar `./deploy.sh` |

## Reglas

- No cambies `output` a `server` ni añadas adaptadores: el hosting es nginx estático.
- No metas tokens ni `.env` en el repo.
- Mantén `site`/`base` en `https://kathatenorio.com` y `/`.
- Si añades videos grandes, usa `./deploy-media.sh`; no van dentro de la imagen.
