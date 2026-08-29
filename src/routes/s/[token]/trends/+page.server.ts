import type { PageServerLoad } from './$types';
import { allIncidents } from '$lib/aggregate';
import { boardOrFail, cacheHeaders } from '$lib/server/load';
import { serviceStats } from '$lib/stats';
import { boardShell, stripUpdates } from '$lib/slim';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
  cacheHeaders(setHeaders);
  const board = await boardOrFail(params.token);
  const stats = serviceStats(board);
  return { board: boardShell(board), incidents: stripUpdates(allIncidents(board)), stats };
};
