import type { PageServerLoad } from './$types';
import { loadBoard } from '#lib/server/board.js';
import { cacheHeaders } from '#lib/server/load.js';
import { siteConfig } from '#lib/server/config.js';
import { slimBoard } from '#lib/slim.js';

export const load: PageServerLoad = async ({ url, setHeaders }) => {
  const config = siteConfig();
  if (!config.pinned) {
    return { board: null, icons: config.icons, problem: url.searchParams.get('problem') };
  }

  cacheHeaders(setHeaders);
  return {
    board: slimBoard(await loadBoard(config.pinned, config.title)),
    icons: config.icons,
    problem: null
  };
};
