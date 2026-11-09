# AGENTS.md — system-nginxproxy

Proxy inverso compartido del VPS. **No lo reinicies ni lo borres sin motivo.**

## Servicios

| Servicio | Imagen | Función |
|---|---|---|
| `nginx-proxy` | `nginxproxy/nginx-proxy:1.11` | Escucha 80/443 y enruta por `VIRTUAL_HOST` |
| `acme-companion` | `nginxproxy/acme-companion:2.8` | Emite y renueva certificados Let's Encrypt |

- Red externa: `proxy`.
- Volúmenes: `system-nginxproxy_certs` (certificados), `system-nginxproxy_acme`,
  `system-nginxproxy_vhost`, `system-nginxproxy_html`.
- `DEFAULT_HOST=13.140.216.193` en `.env`.
- `acme-companion` solo corre con el perfil `tls`.

## Cómo publicar un sitio

En el `docker-compose.yml` del sitio:

```yaml
environment:
  VIRTUAL_HOST: ejemplo.com,www.ejemplo.com
  VIRTUAL_PORT: "80"
  LETSENCRYPT_HOST: ejemplo.com,www.ejemplo.com
  LETSENCRYPT_EMAIL: ""   # opcional desde 2025
networks:
  - proxy
```

Y en el proxy:

```bash
cd /opt/stacks/system-nginxproxy
docker compose up -d
docker compose --profile tls up -d
```

No hay que tocar la configuración de nginx: `nginx-proxy` detecta el contenedor por Docker.

## Certificados

- Emisión/renovación automática por HTTP-01.
- Funciona con Cloudflare en proxy naranja: el challenge llega al origen por HTTP.
- No ejecutes `certbot` ni edites archivos en `/etc/nginx/certs`.
- Comprobar:

```bash
docker logs --tail=100 acme-companion
docker exec nginx-proxy ls -la /etc/nginx/certs
echo | openssl s_client -servername kathatenorio.com -connect kathatenorio.com:443 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates
```

## Reglas

- Nunca `docker compose down -v` (borra certificados).
- No añadas otro proxy en 80/443.
- No cambies `DEFAULT_HOST` sin razón.
- Si `nginx-proxy` no ve un contenedor, comprueba que esté en la red `proxy` y que tenga `VIRTUAL_HOST`.
- Tras cambios: `docker compose up -d` y revisa `docker logs --tail=50 nginx-proxy`.
