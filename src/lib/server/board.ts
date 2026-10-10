import type { Board, Service, Target } from '#lib/types.js';
import { worst } from '#lib/status.js';
import { decodeToken, encodeToken, slugFor } from '#lib/token.js';
import { ADAPTERS, BY_ID } from './adapters';
import { siteConfig } from './config';

const MEMO_MS = 30_000;
const memo = new Map<string, { at: number; service: Service }>();

const byNewest = (a: string, b: string) => new Date(b).valueOf() - new Date(a).valueOf();

function dedupe<T extends { id: string }>(items: T[]): T[] {
  const seen = new Map<string, T>();
  for (const item of items) if (!seen.has(item.id)) seen.set(item.id, item);
  return [...seen.values()];
}

function iconFor(template: string, target: Target): string {
  const domain = target.entry?.site ?? new URL(target.url).host;
  return template.replace('{domain}', domain);
}

async function load(target: Target, icons: string): Promise<Service> {
  const slug = slugFor(target);
  const base = {
    token: target.token,
    slug,
    url: target.url,
    icon: iconFor(icons, target),
    name: target.entry?.name ?? new URL(target.url).host
  };

  const hinted = target.entry?.provider ? BY_ID.get(target.entry.provider) : undefined;
  const order = hinted ? [hinted, ...ADAPTERS.filter((one) => one !== hinted)] : ADAPTERS;

  for (const adapter of order) {
    // A provider that answers with an unexpected shape is a miss, not a broken board
    const data = await adapter.load(target.url).catch(() => null);
    if (!data) continue;
    return {
      ...base,
      ...data,
      name: target.entry?.name || data.name || base.name,
      provider: adapter.id,
      providerLabel: adapter.label,
      incidents: dedupe(data.incidents).sort((a, b) => byNewest(a.startedAt, b.startedAt)),
      maintenances: dedupe(data.maintenances).sort(
        (a, b) => new Date(a.startsAt).valueOf() - new Date(b.startsAt).valueOf()
      )
    };
  }

  return {
    ...base,
    level: 'unknown',
    summary: '',
    provider: 'none',
    providerLabel: 'Unrecognised',
    components: [],
    incidents: [],
    maintenances: [],
    error: 'No status API or feed found here. Check the URL points at the status page itself.'
  };
}

async function cached(target: Target, icons: string): Promise<Service> {
  const key = `${target.url}|${icons}`;
  const hit = memo.get(key);
  if (hit && Date.now() - hit.at < MEMO_MS) return hit.service;
  const service = await load(target, icons);
  memo.set(key, { at: Date.now(), service });
  return service;
}

export async function loadBoard(token: string, title?: string): Promise<Board> {
  const targets = decodeToken(token);
  const { icons } = siteConfig();
  const services = await Promise.all(targets.map((target) => cached(target, icons)));
  return {
    token: encodeToken(targets),
    title: title || defaultTitle(services),
    level: worst(services.map((service) => service.level)),
    services,
    fetchedAt: new Date().toISOString()
  };
}

function defaultTitle(services: Service[]): string {
  const names = services.map((service) => service.name);
  if (!names.length) return 'Empty status page';
  if (names.length <= 3) return names.join(', ');
  return `${names.slice(0, 2).join(', ')} and ${names.length - 2} more`;
}
