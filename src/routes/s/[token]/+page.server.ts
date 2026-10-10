import type { PageServerLoad } from './$types';
import { boardOrFail, cacheHeaders } from '#lib/server/load.js';
import { slimBoard } from '#lib/slim.js';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
  cacheHeaders(setHeaders);
  return { board: slimBoard(await boardOrFail(params.token)) };
};
