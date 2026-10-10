import type { PageServerLoad } from './$types';
import { allMaintenances } from '#lib/aggregate.js';
import { boardOrFail, cacheHeaders } from '#lib/server/load.js';
import { boardShell, slimList } from '#lib/slim.js';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
  cacheHeaders(setHeaders);
  const board = await boardOrFail(params.token);
  return { board: boardShell(board), maintenances: slimList(allMaintenances(board)) };
};
