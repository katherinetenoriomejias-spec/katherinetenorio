# Media Kit — Katha Tenorio

Media kit digital, profesional y femenino, con **estadísticas reales de Instagram y TikTok
que se actualizan solas**.

- **Stack:** Astro 5 (build estático) + nginx en un VPS, con Cloudflare delante.
  Sin frameworks de UI: HTML, CSS y un script mínimo de refresco.
- **Contenido editable:** todo el copy, la galería y las colaboraciones viven en
  `src/content/kit.ts` — se edita sin tocar componentes.

## Puesta en marcha

```bash
npm install     # o: bun install
npm run dev     # http://localhost:4321
npm run build
```

## Estadísticas en vivo

El panel de la sección **Estadísticas** se genera en el build a partir de
`public/data/social.json` y luego se refresca en el navegador leyendo ese mismo
archivo. No requiere backend ni tokens: Katha pega ahí los últimos números reales
y la web los muestra al instante.

### 1. Instagram (Graph API)

1. Convertí la cuenta de Instagram en **Profesional** (Empresa o Creador) y vinculala a una
   Página de Facebook.
2. Generá un **token de acceso de larga duración** (60 días) desde
   [developers.facebook.com](https://developers.facebook.com) → Herramientas → Token de
   Graph.
3. Copiá el **IG User ID** (en Graph API: `/me/accounts` → `igUserId`).

```env
IG_ACCESS_TOKEN=EAAB...
IG_USER_ID=1784...
```

El endpoint pide `followers_count`, `media_count` y los *insights* `reach`, `views` y
`total_interactions` (estos últimos solo existen si la cuenta es profesional y tiene al
menos 30 días de datos).

### 2. TikTok (Display API)

1. Creá una app en [developers.tiktok.com](https://developers.tiktok.com).
2. Pedí el scope `user.info.stats` (y `video.list` para las vistas).
3. Solicitá la verificación de la app para poder usar el *Display API* en producción.

```env
TIKTOK_ACCESS_TOKEN=...
```

### 3. Respaldo manual

Si una API falla o hay métricas que la plataforma no expone, la web usa los valores de
`public/data/social.json`. Ahí Katha puede pegar los últimos números reales a mano; la web
nunca se ve vacía y marca el dato como **"Último dato"** en vez de **"En vivo"**.

```json
{
  "instagram": { "followers": 99400, "posts": 585, "audience": "Venezuela · México · Chile" },
  "tiktok": { "followers": null, "views": null }
}
```

## Editar el contenido

`src/content/kit.ts` contiene:

| Dato | Variable |
|---|---|
| Nombre, bio, contacto, redes | `profile` |
| Áreas de la propuesta | `proposal` |
| Servicios | `services` |
| Colaboraciones | `collaborations` |
| Galería de fotos | `gallery` |
| Mensaje de propósito | `purpose` |

Las imágenes van en `public/fotos/`. Hay un generador de placeholders para probar:

```bash
python3 scripts/placeholders.py
```

## Despliegue (VPS + nginx-proxy)

El sitio se sirve como build estático de Astro detrás de `nginxproxy/nginx-proxy`
con certificado de Let's Encrypt gestionado por `acme-companion`.

```bash
./deploy.sh                       # push a Git + checkout, build y levanta en el VPS
DEPLOY_HOST=kathavps-root ./deploy.sh
```

`deploy.sh` exige el árbol local limpio, hace `git push` a `kathatenorio/main`,
actualiza el checkout del VPS por HTTPS, conserva el `.env`, reconstruye la imagen
y levanta el contenedor. Los vídeos no se incluyen: se sincronizan aparte con
`./deploy-media.sh`.

- Destino: `/opt/stacks/pagina-kathatenorio` (repo Git, rama `main`)
- Proxy: `/opt/stacks/system-nginxproxy`
- Vídeos: `/opt/media/kathatenorio/videos` (bind mount read-only; fuera de la imagen)
- Dominio: `https://kathatenorio.com` (Cloudflare → VPS)
- El `.env` del VPS define `VIRTUAL_HOST` y `LETSENCRYPT_HOST`; no se sobrescribe
  en cada despliegue.

Las estadísticas del panel se leen de `public/data/social.json`; para actualizarlas
basta editar ese archivo y volver a desplegar.

## Accesibilidad

- Contraste alto sobre fondo claro y texto de al menos 16px.
- Navegación por teclado con foco visible en inputs y botones.
- `aria-label` en los enlaces de contacto y en los indicadores de estado.
- Se respeta `prefers-reduced-motion` en las transiciones.
- Etiquetas `alt` en todas las imágenes de la galería y colaboraciones.

## Repositorio

Este proyecto es independiente de la web 3D (`heavenly-tech/kathatenorio`).
