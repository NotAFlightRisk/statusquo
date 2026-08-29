import type { Adapter } from './types';
import { levelFromText, worst } from '$lib/status';
import { at, fetchJson } from '../http';

interface RawIncident {
  id: string;
  external_desc: string;
  begin: string;
  end?: string | null;
  severity?: string;
  status_impact?: string;
  uri?: string;
  service_name?: string;
  most_recent_update?: { text?: string; when?: string; status?: string };
  updates?: { text?: string; when?: string; status?: string }[];
}

/** Google Cloud publishes one flat incidents.json and no component list. */
export const googlecloud: Adapter = {
  id: 'googlecloud',
  label: 'Google Cloud',
  async load(base) {
    const raw = await fetchJson<RawIncident[]>(at(base, '/incidents.json'));
    if (!Array.isArray(raw) || !raw[0]?.external_desc) return null;

    const incidents = raw.map((entry) => ({
      id: entry.id,
      title: entry.external_desc,
      level: levelFromText(entry.status_impact ?? entry.severity),
      status: entry.end ? 'resolved' : 'investigating',
      resolved: Boolean(entry.end),
      startedAt: entry.begin,
      endedAt: entry.end ?? null,
      url: entry.uri ? at(base, `/${entry.uri}`) : undefined,
      updates: (entry.updates ?? [])
        .filter((update) => update.text && update.when)
        .map((update) => ({
          at: update.when as string,
          status: update.status ?? 'update',
          body: update.text as string
        }))
    }));

    const open = incidents.filter((incident) => !incident.resolved);
    return {
      name: 'Google Cloud',
      level: open.length ? worst(open.map((incident) => incident.level)) : 'operational',
      summary: open.length ? open[0].title : 'No open incidents',
      components: [],
      incidents,
      maintenances: []
    };
  }
};
