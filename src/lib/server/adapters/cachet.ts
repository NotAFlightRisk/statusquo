import type { Adapter } from './types';
import type { Level } from '$lib/types';
import { worst } from '$lib/status';
import { at, fetchJson } from '../http';

const COMPONENT: Level[] = ['unknown', 'operational', 'degraded', 'partial', 'major'];
const INCIDENT: Level[] = ['unknown', 'major', 'degraded', 'degraded', 'operational'];

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

const stamp = (value: string) => value.replace(' ', 'T') + (value.endsWith('Z') ? '' : 'Z');

/** Cachet, self-hosted and common on smaller providers. Numeric status codes, hence the arrays. */
export const cachet: Adapter = {
  id: 'cachet',
  label: 'Cachet',
  async load(base) {
    const raw = await fetchJson<{ data?: RawComponent[] }>(at(base, '/api/v1/components'));
    if (!raw?.data) return null;

    const components = raw.data.map((entry) => ({
      id: String(entry.id),
      name: entry.name,
      description: entry.description || undefined,
      level: COMPONENT[entry.status] ?? 'unknown'
    }));

    const incidents = await fetchJson<{ data?: RawIncident[] }>(at(base, '/api/v1/incidents'));
    const all = incidents?.data ?? [];

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
          level: INCIDENT[entry.status] ?? 'unknown',
          status: entry.status === 4 ? 'resolved' : 'investigating',
          resolved: entry.status === 4,
          startedAt: stamp(entry.created_at),
          endedAt: entry.status === 4 ? stamp(entry.updated_at ?? entry.created_at) : null,
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
