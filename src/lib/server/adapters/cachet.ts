import type { Adapter } from './types';
import type { Level } from '#lib/types.js';
import { worst } from '#lib/status.js';
import { at, fetchJson } from '../http';

const COMPONENT: Level[] = ['unknown', 'operational', 'degraded', 'partial', 'major'];

// Cachet's incident status is a lifecycle (investigating/identified/watching/fixed), not a
// severity, so there is no impact to report. Fixed is 4.
const FIXED = 4;

interface RawComponent {
  id: number;
  name: string;
  description?: string;
  status: number;
}

interface RawIncident {
  id: number;
  name: string;
  status: number;
  message?: string;
  created_at: string;
  updated_at?: string;
  scheduled_at?: string | null;
  permalink?: string;
}

// Cachet sends "2026-08-29 12:00:00", sometimes already carrying an offset
const stamp = (value: string) => {
  const iso = value.replace(' ', 'T');
  return /[Zz]$|[+-]\d{2}:?\d{2}$/.test(iso) ? iso : `${iso}Z`;
};

/** Cachet, self-hosted and common on smaller providers. Numeric status codes, hence the arrays. */
export const cachet: Adapter = {
  id: 'cachet',
  label: 'Cachet',
  async load(base) {
    const raw = await fetchJson<{ data?: RawComponent[] }>(at(base, '/api/v1/components'));
    if (!Array.isArray(raw?.data)) return null;

    const components = raw.data.map((entry) => ({
      id: String(entry.id),
      name: entry.name,
      description: entry.description || undefined,
      level: COMPONENT[entry.status] ?? 'unknown'
    }));

    const incidents = await fetchJson<{ data?: RawIncident[] }>(at(base, '/api/v1/incidents'));
    const all = Array.isArray(incidents?.data) ? incidents.data : [];

    return {
      name: '',
      level: worst(components.map((entry) => entry.level)),
      summary: '',
      components,
      incidents: all
        .filter((entry) => !entry.scheduled_at)
        .map((entry) => ({
          id: String(entry.id),
          title: entry.name,
          level: 'degraded',
          status: entry.status === FIXED ? 'resolved' : 'investigating',
          resolved: entry.status === FIXED,
          startedAt: stamp(entry.created_at),
          endedAt: entry.status === FIXED ? stamp(entry.updated_at ?? entry.created_at) : null,
          url: entry.permalink,
          updates: entry.message
            ? [{ at: stamp(entry.created_at), status: 'update', body: entry.message }]
            : []
        })),
      maintenances: all
        .filter((entry) => entry.scheduled_at)
        .map((entry) => ({
          id: String(entry.id),
          title: entry.name,
          status: 'scheduled',
          startsAt: stamp(entry.scheduled_at as string),
          endsAt: null,
          url: entry.permalink,
          updates: []
        }))
    };
  }
};
