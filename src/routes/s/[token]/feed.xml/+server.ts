import type { RequestHandler } from './$types';
import { boardOrFail } from '#lib/server/load.js';
import { boardFeed } from '#lib/server/feed.js';
import { siteConfig } from '#lib/server/config.js';

export const GET: RequestHandler = async ({ params, url }) => {
  const board = await boardOrFail(params.token);
  return new Response(boardFeed(board, url.origin), {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': `public, max-age=0, s-maxage=${siteConfig().refreshSeconds}`
    }
  });
};
