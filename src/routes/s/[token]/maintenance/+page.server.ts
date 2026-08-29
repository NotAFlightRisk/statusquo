import type { PageServerLoad } from './$types';
import { allMaintenances } from '$lib/aggregate';
import { boardOrFail, cacheHeaders } from '$lib/server/load';
import { boardShell, slimList } from '$lib/slim';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
  cacheHeaders(setHeaders);
  const board = await boardOrFail(params.token);
  return { board: boardShell(board), maintenances: slimList(allMaintenances(board)) };
};
