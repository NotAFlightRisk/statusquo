import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { boardOrFail, cacheHeaders } from '#lib/server/load.js';
import { boardShell, detailService } from '#lib/slim.js';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
  cacheHeaders(setHeaders);
  const board = await boardOrFail(params.token);
  const service = board.services.find((one) => one.slug === params.service);
  if (!service) error(404, 'That service is not on this board.');
  return { board: boardShell(board), service: detailService(service) };
};
