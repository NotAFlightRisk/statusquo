import type { RequestHandler } from './$types';
import { boardOrFail } from '$lib/server/load';
import { boardFeed } from '$lib/server/feed';
import { siteConfig } from '$lib/server/config';

export const GET: RequestHandler = async ({ params, url }) => {
  const board = await boardOrFail(params.token);
  return new Response(boardFeed(board, url.origin), {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': `public, max-age=0, s-maxage=${siteConfig().refreshSeconds}`
    }
  });
};
