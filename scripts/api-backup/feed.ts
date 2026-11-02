import type { APIRoute } from 'astro';
import { getFeed } from '../../lib/stats';

export const prerender = false;

export const GET: APIRoute = async () => {
  const posts = await getFeed();
  return new Response(JSON.stringify({ posts }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=3600',
    },
  });
};
