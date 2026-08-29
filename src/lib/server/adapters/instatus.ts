import type { Adapter } from './types';
import type { Level } from '$lib/types';
import { levelFromText, worst } from '$lib/status';
import { at, fetchJson } from '../http';
import { loadFeedItems, splitFeedItems } from './feed';

const STATUS: Record<string, Level> = {
  UP: 'operational',
  HASISSUES: 'partial',
  UNDERMAINTENANCE: 'maintenance'
};

const COMPONENT: Record<string, Level> = {
  OPERATIONAL: 'operational',
  DEGRADEDPERFORMANCE: 'degraded',
  PARTIALOUTAGE: 'partial',
  MAJOROUTAGE: 'major',
  UNDERMAINTENANCE: 'maintenance'
};

interface RawComponent {
  id: string;
  name: string;
  description?: string | null;
  status: string;
  group?: { name?: string } | null;
}

/** Instatus. Components come from JSON, but history only exists as a feed. */
export const instatus: Adapter = {
  id: 'instatus',
  label: 'Instatus',
  async load(base) {
    const summary = await fetchJson<{ page?: { name?: string; status?: string } }>(
      at(base, '/summary.json')
    );
    if (!summary?.page?.status) return null;

    const raw = await fetchJson<{ components?: RawComponent[] }>(at(base, '/v2/components.json'));
    const source = Array.isArray(raw?.components) ? raw.components : [];
    const components = source.map((entry) => ({
      id: entry.id,
      name: entry.name,
      description: entry.description ?? undefined,
      level: COMPONENT[entry.status] ?? levelFromText(entry.status),
      group: entry.group?.name ?? undefined
    }));

    const status = summary.page.status;
    const level = STATUS[status] ?? levelFromText(status);
    const items = await loadFeedItems(base);

    return {
      name: summary.page.name ?? '',
      level: components.length ? worst([level, ...components.map((c) => c.level)]) : level,
      summary: '',
      components,
      ...splitFeedItems(items)
    };
  }
};
