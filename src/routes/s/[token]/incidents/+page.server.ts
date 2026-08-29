import type { PageServerLoad } from './$types';
import { allIncidents } from '$lib/aggregate';
import { boardOrFail, cacheHeaders } from '$lib/server/load';
import { boardShell, slimList } from '$lib/slim';
import type { Level } from '$lib/types';

const PER_PAGE = 60;

export const load: PageServerLoad = async ({ params, url, setHeaders }) => {
  cacheHeaders(setHeaders);
  const board = await boardOrFail(params.token);
  const all = allIncidents(board);

  const level = url.searchParams.get('level') as Level | null;
  const matching = level ? all.filter((incident) => incident.level === level) : all;
  const from = Math.max(0, Number(url.searchParams.get('from')) || 0);

  const counts: Partial<Record<Level, number>> = {};
  for (const incident of all) counts[incident.level] = (counts[incident.level] ?? 0) + 1;

  return {
    board: boardShell(board),
    // The chart wants every incident; the list only wants the page you are looking at.
    chart: all.map(({ id, level: impact, startedAt, endedAt, resolved }) => ({
      id,
      level: impact,
      startedAt,
      endedAt,
      resolved,
      title: '',
      status: '',
      updates: []
    })),
    incidents: slimList(matching.slice(from, from + PER_PAGE)),
    counts,
    total: all.length,
    matching: matching.length,
    from,
    perPage: PER_PAGE,
    level
  };
};
