import type { PageServerLoad } from './$types';
import { allIncidents } from '#lib/aggregate.js';
import { boardOrFail, cacheHeaders } from '#lib/server/load.js';
import { serviceStats } from '#lib/stats.js';
import { boardShell, stripUpdates } from '#lib/slim.js';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
  cacheHeaders(setHeaders);
  const board = await boardOrFail(params.token);
  const stats = serviceStats(board);
  return { board: boardShell(board), incidents: stripUpdates(allIncidents(board)), stats };
};
