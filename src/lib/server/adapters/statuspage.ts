import type { Adapter } from './types';
import type { Incident, Level, Maintenance, Update } from '$lib/types';
import { levelFromText, worst } from '$lib/status';
import { at, fetchJson } from '../http';

const INDICATOR: Record<string, Level> = {
  none: 'operational',
  minor: 'degraded',
  major: 'partial',
  critical: 'major',
  maintenance: 'maintenance'
};

const COMPONENT: Record<string, Level> = {
  operational: 'operational',
  degraded_performance: 'degraded',
  partial_outage: 'partial',
  major_outage: 'major',
  under_maintenance: 'maintenance'
};

interface RawComponent {
  id: string;
  name: string;
  description?: string | null;
  status: string;
  group?: boolean;
  group_id?: string | null;
}

interface RawUpdate {
  created_at: string;
  status: string;
  body: string;
}

interface RawIncident {
  id: string;
  name: string;
  impact: string;
  status: string;
  created_at: string;
  started_at?: string;
  resolved_at?: string | null;
  shortlink?: string;
  incident_updates?: RawUpdate[];
}

interface RawMaintenance extends RawIncident {
  scheduled_for: string;
  scheduled_until?: string | null;
}

interface Summary {
  page?: { name?: string; url?: string };
  status?: { indicator?: string; description?: string };
  components?: RawComponent[];
  incidents?: RawIncident[];
  scheduled_maintenances?: RawMaintenance[];
}

const updates = (raw: RawUpdate[] = []): Update[] =>
  (Array.isArray(raw) ? raw : []).map((entry) => ({
    at: entry.created_at,
    status: entry.status,
    body: entry.body
  }));

const toIncident = (raw: RawIncident): Incident => ({
  id: raw.id,
  title: raw.name,
  level: INDICATOR[raw.impact] ?? levelFromText(raw.impact),
  status: raw.status,
  resolved: raw.status === 'resolved' || raw.status === 'postmortem',
  startedAt: raw.started_at ?? raw.created_at,
  endedAt: raw.resolved_at ?? null,
  url: raw.shortlink,
  updates: updates(raw.incident_updates)
});

const toMaintenance = (raw: RawMaintenance): Maintenance => ({
  id: raw.id,
  title: raw.name,
  status: raw.status,
  startsAt: raw.scheduled_for ?? raw.created_at,
  endsAt: raw.scheduled_until ?? null,
  url: raw.shortlink,
  updates: updates(raw.incident_updates)
});

/** Atlassian Statuspage, and incident.io which serves the same shape at the same paths. */
export const statuspage: Adapter = {
  id: 'statuspage',
  label: 'Statuspage',
  async load(base) {
    const summary = await fetchJson<Summary>(at(base, '/api/v2/summary.json'));
    if (!summary?.page || (!summary.components && !summary.status)) return null;

    // The summary only carries unresolved items, so history comes from its own endpoints.
    const [history, planned] = await Promise.all([
      fetchJson<{ incidents?: RawIncident[] }>(at(base, '/api/v2/incidents.json')),
      fetchJson<{ scheduled_maintenances?: RawMaintenance[] }>(
        at(base, '/api/v2/scheduled-maintenances.json')
      )
    ]);

    const components = (Array.isArray(summary.components) ? summary.components : [])
      .filter((entry) => !entry.group)
      .map((entry) => ({
        id: entry.id,
        name: entry.name,
        description: entry.description ?? undefined,
        level: COMPONENT[entry.status] ?? levelFromText(entry.status)
      }));

    const list = <T>(value: T[] | undefined) => (Array.isArray(value) ? value : []);
    // Summary first, since its copy of a live incident is the fresher one and dedupe keeps
    // whichever it sees first
    const incidents = [...list(summary.incidents), ...list(history?.incidents)];
    const maintenances = [
      ...list(summary.scheduled_maintenances),
      ...list(planned?.scheduled_maintenances)
    ];

    const indicator = summary.status?.indicator;
    const level = indicator
      ? (INDICATOR[indicator] ?? levelFromText(indicator))
      : worst(components.map((entry) => entry.level));

    return {
      name: summary.page.name ?? '',
      level,
      summary: summary.status?.description ?? '',
      components,
      incidents: incidents.map(toIncident),
      maintenances: maintenances.map(toMaintenance)
    };
  }
};
