import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { loadBoard } from '$lib/server/board';
import { siteConfig } from '$lib/server/config';
import { slimBoard } from '$lib/slim';

/** What the page polls. The client asks with cache 'no-cache' so the edge still answers. */
export const GET: RequestHandler = async ({ params }) => {
  const board = await loadBoard(params.token);
  if (!board.services.length) error(404, 'Nothing readable on that board.');
  return json(slimBoard(board), {
    headers: {
      'cache-control': `public, max-age=0, s-maxage=${siteConfig().refreshSeconds}`,
      'last-modified': new Date(board.fetchedAt).toUTCString()
    }
  });
};
