# AGENTS.md — VPS (kathavps)

Instrucciones para cualquier agente que opere este servidor.

## Contexto

- Host: `kathavps` → `kath@13.140.216.193` (Debian 13).
- Docker 29 + Compose v5. El usuario `kath` está en el grupo `docker` y es dueño de `/opt/stacks`.
- Todo el stack vive en `/opt/stacks`:

| Ruta | Qué es |
|---|---|
| `/opt/stacks/system-nginxproxy` | `nginx-proxy` (80/443) + `acme-companion` (Let's Encrypt) |
| `/opt/stacks/pagina-kathatenorio` | Media kit de Katha Tenorio (Astro estático + nginx) |
| `/opt/media/kathatenorio/videos` | Vídeos del sitio (bind mount read-only, fuera de la imagen) |

- Dominio: `kathatenorio.com` y `www.kathatenorio.com`.
- DNS y proxy: Cloudflare (nube naranja), SSL/TLS **Full (strict)**.
- Red Docker compartida: `proxy` (externa; los stacks se conectan por nombre).

## Reglas

1. **No expongas puertos nuevos al host** salvo 80/443 en `nginx-proxy`. Los sitios se publican con `VIRTUAL_HOST` en la red `proxy`.
2. **No ejecutes certbot ni edites certificados a mano.** TLS lo gestiona `acme-companion`.
3. **No uses `docker compose down -v`**: borra los volúmenes de certificados (`system-nginxproxy_certs`, `system-nginxproxy_acme`).
4. **No borres ni sobrescribas los `.env`** de los stacks. Contienen `VIRTUAL_HOST`, `LETSENCRYPT_HOST`, etc.
5. **No subas secretos al repo.** Los tokens viven en `~/.config/hostinger/token` y `~/.config/cloudflare/token` (permisos `600`).
6. Ejecuta los comandos como `kath`, no como root, salvo que sea imprescindible.
7. Antes de reiniciar algo, comprueba el estado: `docker ps` y `docker logs --tail=50 <contenedor>`.

## Operación habitual

```bash
# Estado
docker ps
docker compose -f /opt/stacks/system-nginxproxy/docker-compose.yml ps
docker compose -f /opt/stacks/pagina-kathatenorio/docker-compose.yml ps

# Logs
docker logs --tail=100 nginx-proxy
docker logs --tail=100 acme-companion
docker logs --tail=100 pagina-kathatenorio

# Reconstruir solo la web
cd /opt/stacks/pagina-kathatenorio && docker compose up -d --build

# Reiniciar el proxy (rara vez necesario)
cd /opt/stacks/system-nginxproxy && docker compose up -d
```

## Comprobaciones rápidas

```bash
curl -sSI https://kathatenorio.com/ | head -5          # 200 + server: cloudflare
curl -sSI http://kathatenorio.com/  | grep -i location # 301 -> https
dig +short A kathatenorio.com @8.8.8.8                 # IPs de Cloudflare
echo | openssl s_client -servername kathatenorio.com -connect kathatenorio.com:443 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates        # Let's Encrypt
```

## TLS / Let's Encrypt

- `acme-companion` se levanta con el perfil `tls`:
  `cd /opt/stacks/system-nginxproxy && docker compose --profile tls up -d`
- Los certificados se guardan en el volumen `system-nginxproxy_certs` y nginx-proxy los usa solo.
- La renovación es automática. El challenge HTTP-01 funciona a través de Cloudflare
  (`/.well-known/acme-challenge/` responde 200 por HTTP).
- Si un certificado no se emite: revisa `docker logs acme-companion` y que el DNS del dominio
  apunte al VPS (o a Cloudflare con el origen correcto).

## Git / despliegue

- El checkout de producción vive en `/opt/stacks/pagina-kathatenorio` y lee el repo por
  **HTTPS** (`https://github.com/katherinetenoriomejias-spec/katherinetenorio.git`);
  no depende de la clave SSH de GitHub del usuario `kath`.
- Repositorio del proyecto: `katherinetenoriomejias-spec/katherinetenorio.git`, rama `main`.
- Para desplegar lo último, desde el Mac: `./deploy.sh` (hace push, fetch/checkout en el
  VPS, reconstruye y levanta). El `.env` se conserva porque está en `.gitignore`.
- Para actualizar a mano en el VPS:
  `git fetch origin main && git checkout -f -B main origin/main && docker compose up -d --build`.

### Flujo desde fuera vs. directo en el VPS

- **Desde fuera (Mac):** editar → commit → `./deploy.sh`. El script hace push y después
  `git clean -fd` + `git checkout -f` aquí: cualquier cambio local sin commitear se pierde.
- **Directo en el VPS:** sirve para urgencias o pruebas
  (`docker compose up -d --build`), pero este checkout es un espejo de solo lectura por
  HTTPS. Si el cambio debe quedar, commitéalo aquí y tráelo al Mac antes del próximo
  `./deploy.sh`:
  `git fetch kathavps:/opt/stacks/pagina-kathatenorio main` (o genera un parche).
  Si no lo traes, el próximo despliegue lo sobrescribe.
- Antes de desplegar desde fuera, verifica que el VPS esté limpio:
  `git -C /opt/stacks/pagina-kathatenorio status --short`.

## No hacer

- `docker system prune -a --volumes` (puede borrar certificados y datos).
- Cambiar `VIRTUAL_HOST`/`LETSENCRYPT_HOST` sin actualizar DNS/Cloudflare.
- Servir la web por IP o por puerto directo; siempre a través de `nginx-proxy`.
- Instalar otro reverse proxy (Apache, Caddy, Traefik) en 80/443.
