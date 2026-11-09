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

- La clave SSH de GitHub debe estar registrada **para el usuario que ejecuta git** (normalmente `kath`).
  Verifica con `ssh -T git@github.com`; debe responder `Hi <usuario>!`.
- Estado conocido: la clave puede estar registrada en otra cuenta/usuario. Si `kath` recibe
  `Permission denied (publickey)`, no intentes `git pull`: usa el despliegue por `scp`/`rsync`
  desde la máquina de desarrollo o registra la clave correcta.
- Repositorio del proyecto: `katherinetenoriomejias-spec/katherinetenorio.git`.
  **Ojo:** la rama `main` remota puede estar desactualizada respecto al contenido desplegado
  (tuvo `base: /portafolio/` para GitHub Pages). No hagas `git pull` a ciegas sobre producción.

## No hacer

- `docker system prune -a --volumes` (puede borrar certificados y datos).
- Cambiar `VIRTUAL_HOST`/`LETSENCRYPT_HOST` sin actualizar DNS/Cloudflare.
- Servir la web por IP o por puerto directo; siempre a través de `nginx-proxy`.
- Instalar otro reverse proxy (Apache, Caddy, Traefik) en 80/443.
