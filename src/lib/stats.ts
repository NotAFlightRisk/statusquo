import type { Board, Incident, Level, ServiceRef } from './types';
import { LEVELS, worst } from './status';

const DAY_MS = 86_400_000;

const day = (value: string | number | Date) => new Date(value).toISOString().slice(0, 10);

export interface DayCell {
  date: string;
  level: Level;
  covered: boolean;
  incidents: Incident[];
}

/**
 * Providers page their history, so a busy one's 50 incidents may only reach back a few weeks.
 * Anything older than that is unknown, not quiet, and the trace has to say so.
 */
const PAGE_CAP = 25;

function coveredFrom(incidents: Incident[]): number {
  if (incidents.length < PAGE_CAP) return -Infinity;
  return Math.min(...incidents.map((incident) => new Date(incident.startedAt).valueOf()));
}

/** One cell per day, coloured by the worst incident overlapping it. */
export function heatmap(incidents: Incident[], days = 90, now = Date.now()): DayCell[] {
  const start = now - (days - 1) * DAY_MS;
  const known = coveredFrom(incidents);
  const cells: DayCell[] = [];
  for (let offset = 0; offset < days; offset += 1) {
    const at = start + offset * DAY_MS;
    const hit = incidents.filter((incident) => {
      const from = new Date(incident.startedAt).valueOf();
      const to = incident.endedAt ? new Date(incident.endedAt).valueOf() : from + DAY_MS;
      return from < at + DAY_MS && to >= at;
    });
    cells.push({
      date: day(at),
      level: hit.length ? worst(hit.map((incident) => incident.level)) : 'operational',
      covered: at + DAY_MS > known,
      incidents: hit
    });
  }
  return cells;
}

export interface MonthBucket {
  month: string;
  label: string;
  counts: Partial<Record<Level, number>>;
  total: number;
}

export function byMonth(incidents: Incident[], months = 12, now = Date.now()): MonthBucket[] {
  const buckets: MonthBucket[] = [];
  const cursor = new Date(now);
  cursor.setUTCDate(1);
  for (let offset = months - 1; offset >= 0; offset -= 1) {
    const at = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() - offset, 1));
    const month = at.toISOString().slice(0, 7);
    const hit = incidents.filter((incident) => incident.startedAt.slice(0, 7) === month);
    const counts: Partial<Record<Level, number>> = {};
    for (const incident of hit) counts[incident.level] = (counts[incident.level] ?? 0) + 1;
    buckets.push({
      month,
      label: at.toLocaleString('en-GB', { month: 'short', timeZone: 'UTC' }),
      counts,
      total: hit.length
    });
  }
  return buckets;
}

export function resolvedDurations(incidents: Incident[]): number[] {
  return incidents
    .filter((incident) => incident.endedAt)
    .map(
      (incident) =>
        new Date(incident.endedAt as string).valueOf() - new Date(incident.startedAt).valueOf()
    )
    .filter((span) => span > 0);
}

export function meanMinutes(incidents: Incident[]): number | null {
  const spans = resolvedDurations(incidents);
  if (!spans.length) return null;
  return Math.round(spans.reduce((sum, span) => sum + span, 0) / spans.length / 60_000);
}

export function daysSinceIncident(incidents: Incident[], now = Date.now()): number | null {
  const latest = incidents[0];
  if (!latest) return null;
  return Math.floor((now - new Date(latest.startedAt).valueOf()) / DAY_MS);
}

export interface ServiceStats {
  service: ServiceRef;
  total: number;
  last90: number;
  mttrMinutes: number | null;
  cleanDays: number | null;
}

export function serviceStats(board: Board, now = Date.now()): ServiceStats[] {
  const since = now - 90 * DAY_MS;
  return board.services.map((service) => ({
    service: {
      token: service.token,
      slug: service.slug,
      name: service.name,
      icon: service.icon,
      level: service.level
    },
    total: service.incidents.length,
    last90: service.incidents.filter((one) => new Date(one.startedAt).valueOf() >= since).length,
    mttrMinutes: meanMinutes(service.incidents),
    cleanDays: daysSinceIncident(service.incidents, now)
  }));
}

export function impactMix(incidents: Incident[]): { level: Level; count: number }[] {
  const counts = new Map<Level, number>();
  for (const incident of incidents) {
    counts.set(incident.level, (counts.get(incident.level) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([level, count]) => ({ level, count }))
    .sort((a, b) => LEVELS[b.level].severity - LEVELS[a.level].severity);
}

export function upcoming<T extends { startsAt: string }>(items: T[], now = Date.now()): T[] {
  return items.filter((item) => new Date(item.startsAt).valueOf() >= now - DAY_MS);
}
