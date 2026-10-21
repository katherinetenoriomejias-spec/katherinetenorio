# Media Kit — Katha Tenorio

Media kit digital, profesional y femenino, con **estadísticas reales de Instagram y TikTok
que se actualizan solas**.

- **Stack:** Astro 5 (SSR) + Vercel adapter + API propia. Sin frameworks de UI: HTML, CSS y
  un script mínimo de refresco.
- **Contenido editable:** todo el copy, la galería y las colaboraciones viven en
  `src/content/kit.ts` — se edita sin tocar componentes.

## Puesta en marcha

```bash
npm install     # o: bun install
npm run dev     # http://localhost:4321
npm run build
```

## Estadísticas en vivo

El panel de la sección **Estadísticas** llama a `GET /api/stats`, que lee de las APIs
oficiales. Con los tokens configurados, los datos aparecen solos y se refrescan cada
5 minutos en el navegador.

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

## Despliegue (Vercel)

1. `npm i -g vercel` y `vercel` en la carpeta, o importá el repo en Vercel.
2. Configurá las variables de entorno (`IG_ACCESS_TOKEN`, `IG_USER_ID`,
   `TIKTOK_ACCESS_TOKEN`) en **Settings → Environment Variables**.
3. `vercel --prod`.

El build ya usa `@astrojs/vercel` con `output: 'server'`, así que el endpoint
`/api/stats` funciona como función serverless.

## Accesibilidad

- Contraste alto sobre fondo claro y texto de al menos 16px.
- Navegación por teclado con foco visible en inputs y botones.
- `aria-label` en los enlaces de contacto y en los indicadores de estado.
- Se respeta `prefers-reduced-motion` en las transiciones.
- Etiquetas `alt` en todas las imágenes de la galería y colaboraciones.

## Repositorio

Este proyecto es independiente de la web 3D (`heavenly-tech/kathatenorio`).
