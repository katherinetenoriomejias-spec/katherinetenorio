import type { APIRoute } from 'astro';
import { getStats } from '../../lib/stats';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const stats = await getStats(new URL(request.url).origin);
  return new Response(JSON.stringify(stats), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=3600',
    },
  });
};
