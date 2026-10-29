/**
 * Estadísticas reales de Instagram y TikTok.
 * ------------------------------------------------------------------
 * - Si hay tokens configurados, los datos se leen de las APIs oficiales.
 * - Si una API falla, se recurre a public/data/social.json (valores que
 *   Katha actualiza a mano) para que la web nunca se vea vacía.
 * - Todo se cachea 5 minutos para no golpear los límites de las APIs.
 */

export type Network = 'instagram' | 'tiktok';

export interface NetworkStats {
  followers: number | null;
  reach: number | null;
  impressions: number | null;
  views: number | null;
  engagement: number | null;
  growth: number | null;
  posts: number | null;
  likes: number | null;
  audience: string | null;
}

export interface StatsPayload {
  instagram: NetworkStats;
  tiktok: NetworkStats;
  total: NetworkStats;
  updatedAt: string;
  live: boolean;
}

const TTL_MS = 5 * 60 * 1000;
const GRAPH_VERSION = 'v21.0';

let cache: { at: number; data: StatsPayload } | null = null;

const emptyStats = (): NetworkStats => ({
  followers: null,
  reach: null,
  impressions: null,
  views: null,
  engagement: null,
  growth: null,
  posts: null,
  likes: null,
  audience: null,
});

/** Valores de respaldo: se editan en public/data/social.json. */
async function readFallback(origin: string): Promise<Partial<StatsPayload>> {
  try {
    const res = await fetch(`${origin}/data/social.json`, { headers: { Accept: 'application/json' } });
    if (!res.ok) return {};
    return (await res.json()) as Partial<StatsPayload>;
  } catch {
    return {};
  }
}

async function getJson(url: string, token: string): Promise<Record<string, any> | null> {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return (await res.json()) as Record<string, unknown>;
}

/** Instagram Graph API: seguidores, publicaciones e insights. */
async function fetchInstagram(): Promise<Partial<NetworkStats>> {
  const token = import.meta.env.IG_ACCESS_TOKEN;
  const userId = import.meta.env.IG_USER_ID;
  if (!token || !userId) return {};

  const base = `https://graph.facebook.com/${GRAPH_VERSION}`;
  const out: Partial<NetworkStats> = {};

  const profile = await getJson(
    `${base}/${userId}?fields=followers_count,media_count,username&access_token=${encodeURIComponent(token)}`,
    token,
  );
  if (profile) {
    out.followers = numberOrNull(profile.followers_count);
    out.posts = numberOrNull(profile.media_count);
  }

  // Insights: alcance, impresiones y vistas (solo cuentas profesionales).
  const insights = await getJson(
    `${base}/${userId}/insights?metric=reach,views,total_interactions&period=day&metric_type=total_value&access_token=${encodeURIComponent(token)}`,
    token,
  );
  const values =
    (insights?.data as Array<{ name: string; values?: Array<{ value: number }> }> | undefined) ?? [];
  const byName = new Map(values.map((v) => [v.name, v.values?.[0]?.value ?? null]));
  out.reach = byName.get('reach') ?? null;
  out.views = byName.get('views') ?? null;
  const interactions = byName.get('total_interactions') ?? null;
  if (interactions !== null && out.followers) {
    // Engagement = interacciones de 30 días sobre seguidores.
    out.engagement = round1((interactions / out.followers) * 100);
  }
  return out;
}

/** TikTok Display API: seguidores, videos y vistas. */
async function fetchTiktok(): Promise<Partial<NetworkStats>> {
  const token = import.meta.env.TIKTOK_ACCESS_TOKEN;
  if (!token) return {};

  const out: Partial<NetworkStats> = {};
  const fields = 'follower_count,video_count,likes_count,username';

  const info = await getJson(
    `https://open.tiktokapis.com/v2/user/info/?fields=${fields}&access_token=${encodeURIComponent(token)}`,
    token,
  );
  const user = (info?.data as { user?: Record<string, unknown> } | undefined)?.user;
  if (user) {
    out.followers = numberOrNull(user.follower_count);
    out.posts = numberOrNull(user.video_count);
    out.likes = numberOrNull(user.likes_count);
  }

  const videos = await getJson(
    `https://open.tiktokapis.com/v2/video/query/?fields=view_count,like_count,comment_count,share_count&max_count=20&access_token=${encodeURIComponent(token)}`,
    token,
  );
  const list =
    (videos?.data as { videos?: Array<Record<string, number>> } | undefined)?.videos ?? [];
  if (list.length) {
    const views = list.reduce((acc, v) => acc + (v.view_count ?? 0), 0);
    const likes = list.reduce((acc, v) => acc + (v.like_count ?? 0), 0);
    const comments = list.reduce((acc, v) => acc + (v.comment_count ?? 0), 0);
    const shares = list.reduce((acc, v) => acc + (v.share_count ?? 0), 0);
    out.views = views;
    if (out.followers) {
      out.engagement = round1(((likes + comments + shares) / out.followers) * 100);
    }
  }
  return out;
}

function numberOrNull(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

function merge(base: NetworkStats, extra: Partial<NetworkStats>): NetworkStats {
  const out = { ...base };
  for (const [key, value] of Object.entries(extra)) {
    if (value !== null && value !== undefined) {
      (out as unknown as Record<string, unknown>)[key] = value;
    }
  }
  return out;
}

export { combine };

export interface FeedPost {
  id: string;
  permalink: string;
  mediaUrl: string | null;
  thumbnailUrl: string | null;
  caption: string;
  timestamp: string | null;
}

let feedCache: { at: number; posts: FeedPost[] } | null = null;

/** Últimas publicaciones de Instagram (Graph API). */
export async function getFeed(): Promise<FeedPost[]> {
  const now = Date.now();
  if (feedCache && now - feedCache.at < TTL_MS) return feedCache.posts;

  const token = import.meta.env.IG_ACCESS_TOKEN;
  const userId = import.meta.env.IG_USER_ID;
  if (!token || !userId) {
    feedCache = { at: now, posts: [] };
    return [];
  }

  const url =
    `https://graph.facebook.com/${GRAPH_VERSION}/${userId}/media` +
    `?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp` +
    `&limit=6&access_token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { data?: Array<Record<string, unknown>> };
    const posts = (data.data ?? []).map((p) => ({
      id: String(p.id),
      permalink: String(p.permalink ?? '#'),
      mediaUrl: p.media_type === 'IMAGE' ? ((p.media_url as string) ?? null) : null,
      thumbnailUrl: (p.thumbnail_url as string) ?? null,
      caption: String(p.caption ?? ''),
      timestamp: (p.timestamp as string) ?? null,
    }));
    feedCache = { at: now, posts };
    return posts;
  } catch {
    feedCache = { at: now, posts: [] };
    return [];
  }
}

export async function getStats(origin: string): Promise<StatsPayload> {
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) return cache.data;

  const fallback = await readFallback(origin);
  const [ig, tt] = await Promise.all([
    fetchInstagram().catch(() => ({})),
    fetchTiktok().catch(() => ({})),
  ]);

  const live = Object.keys(ig).length > 0 || Object.keys(tt).length > 0;

  const instagram = merge(
    emptyStats(),
    { ...(fallback.instagram ?? {}), ...ig, audience: (fallback.instagram?.audience) ?? 'Venezuela · México · Chile' },
  );
  const tiktok = merge(emptyStats(), { ...(fallback.tiktok ?? {}), ...tt });

  const data: StatsPayload = {
    instagram,
    tiktok,
    total: combine(instagram, tiktok),
    updatedAt: new Date().toISOString(),
    live,
  };

  cache = { at: now, data };
  return data;
}
