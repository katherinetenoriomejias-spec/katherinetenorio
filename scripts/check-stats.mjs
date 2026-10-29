#!/usr/bin/env bun
/**
 * Diagnóstico de las APIs de Instagram y TikTok.
 *
 * Uso:
 *   bun run check              # lee .env
 *   IG_ACCESS_TOKEN=... bun run check
 *
 * Exit code 0 = todo OK. 1 = hay algo que revisar.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const GRAPH = 'https://graph.facebook.com/v21.0';

function loadEnv() {
  const file = resolve(process.cwd(), '.env');
  if (!existsSync(file)) return {};
  const out = {};
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match) out[match[1]] = match[2].replace(/^["']|["']$/g, '');
  }
  return out;
}

const env = { ...loadEnv(), ...process.env };
const ok = (label, detail = '') => console.log(`  ✅ ${label}${detail ? ` — ${detail}` : ''}`);
const fail = (label, detail = '') => {
  console.log(`  ❌ ${label}${detail ? ` — ${detail}` : ''}`);
  problems++;
};
const warn = (label, detail = '') => console.log(`  ⚠️  ${label}${detail ? ` — ${detail}` : ''}`);

let problems = 0;
const compact = (n) => new Intl.NumberFormat('es-ES', { notation: 'compact' }).format(n);

async function get(url) {
  const res = await fetch(url);
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }
  return { status: res.status, data };
}

// ---------------------------------------------------------------- INSTAGRAM
console.log('\n📸 INSTAGRAM');
const igToken = env.IG_ACCESS_TOKEN;
const igUserId = env.IG_USER_ID;

if (!igToken) {
  fail('Falta IG_ACCESS_TOKEN', 'generá el token en developers.facebook.com');
} else {
  const me = await get(`${GRAPH}/me?fields=id,username&access_token=${encodeURIComponent(igToken)}`);
  if (me.status === 200) {
    ok('Token válido', `usuario ${me.data.username ?? me.data.id}`);
  } else {
    fail('Token rechazado', me.data?.error?.message ?? `HTTP ${me.status}`);
  }
}

if (!igUserId) {
  warn('Falta IG_USER_ID', 'sacalo de GET /me/accounts → instagram_business_account.id');
} else if (igToken) {
  const profile = await get(
    `${GRAPH}/${igUserId}?fields=followers_count,media_count,username,name&access_token=${encodeURIComponent(igToken)}`,
  );
  if (profile.status === 200) {
    ok(
      'Perfil leído',
      `${profile.data.username ?? ''} · ${compact(profile.data.followers_count ?? 0)} seguidores · ${profile.data.media_count ?? 0} publicaciones`,
    );
  } else {
    fail('No se pudo leer el perfil', profile.data?.error?.message ?? `HTTP ${profile.status}`);
  }

  const insights = await get(
    `${GRAPH}/${igUserId}/insights?metric=reach,views,total_interactions&period=day&metric_type=total_value&access_token=${encodeURIComponent(igToken)}`,
  );
  if (insights.status === 200) {
    const names = (insights.data?.data ?? []).map((m) => m.name);
    ok('Insights disponibles', names.join(', ') || 'sin métricas en el periodo');
    for (const metric of ['reach', 'views', 'total_interactions']) {
      if (!names.includes(metric)) {
        warn(`Métrica ${metric} no disponible`, 'cuenta no profesional o menos de 30 días de datos');
      }
    }
  } else {
    warn(
      'Insights no disponibles',
      insights.data?.error?.message ?? 'hace falta cuenta profesional con 30 días de datos',
    );
  }
}

// ---------------------------------------------------------------- TIKTOK
console.log('\n🎵 TIKTOK');
const ttToken = env.TIKTOK_ACCESS_TOKEN;
if (!ttToken) {
  fail('Falta TIKTOK_ACCESS_TOKEN', 'generalo en developers.tiktok.com');
} else {
  const info = await get(
    `https://open.tiktokapis.com/v2/user/info/?fields=follower_count,video_count,likes_count,username&access_token=${encodeURIComponent(ttToken)}`,
  );
  if (info.status === 200) {
    const user = info.data?.data?.user ?? {};
    ok(
      'Perfil leído',
      `@${user.username ?? '?'} · ${compact(user.follower_count ?? 0)} seguidores · ${user.video_count ?? 0} videos`,
    );
  } else {
    fail(
      'Token rechazado',
      info.data?.error?.message ?? info.data?.message ?? `HTTP ${info.status}`,
    );
  }

  const videos = await get(
    `https://open.tiktokapis.com/v2/video/query/?fields=view_count,like_count,comment_count,share_count&max_count=20&access_token=${encodeURIComponent(ttToken)}`,
  );
  if (videos.status === 200) {
    const list = videos.data?.data?.videos ?? [];
    const views = list.reduce((a, v) => a + (v.view_count ?? 0), 0);
    ok('Videos consultados', `${list.length} videos · ${compact(views)} vistas acumuladas`);
  } else {
    warn('Listado de videos no disponible', videos.data?.error?.message ?? 'falta el scope video.list');
  }
}

console.log(
  problems
    ? `\n❌ ${problems} problema(s). Revisa lo marcado arriba.\n`
    : '\n✅ Todo listo. Reinicia el server para tomar los cambios.\n',
);
process.exit(problems ? 1 : 0);
