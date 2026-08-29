import type { Adapter } from './types';
import type { Incident, Maintenance } from '$lib/types';
import { levelFromText, worst } from '$lib/status';
import { at, fetchText } from '../http';

const FEED_PATHS = [
  '/history.rss',
  '/history.atom',
  '/feed.rss',
  '/feed.atom',
  '/feed',
  '/rss',
  '/index.xml'
];
const LIVE_WINDOW_MS = 12 * 60 * 60 * 1000;

export interface FeedItem {
  id: string;
  title: string;
  body: string;
  link?: string;
  at: string;
}

const strip = (value: string) =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

const tag = (chunk: string, ...names: string[]) => {
  for (const name of names) {
    const match = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i').exec(chunk);
    if (match) return strip(match[1]);
  }
  return '';
};

const href = (chunk: string) => {
  const link = tag(chunk, 'link');
  if (link) return link;
  return (/<link[^>]+href="([^"]+)"/i.exec(chunk) ?? [])[1];
};

export function parseFeed(xml: string): FeedItem[] {
  const chunks = xml.match(/<(?:item|entry)(?:\s[^>]*)?>[\s\S]*?<\/(?:item|entry)>/gi) ?? [];
  return chunks
    .map((chunk, index) => {
      const when = tag(chunk, 'pubDate', 'published', 'updated', 'dc:date');
      const stamp = when ? new Date(when) : null;
      return {
        id: tag(chunk, 'guid', 'id') || `item-${index}`,
        title: tag(chunk, 'title'),
        body: tag(chunk, 'description', 'content:encoded', 'content', 'summary'),
        link: href(chunk),
        at: stamp && !Number.isNaN(stamp.valueOf()) ? stamp.toISOString() : ''
      };
    })
    .filter((item) => item.title && item.at);
}

/** Finds a feed by autodiscovery first, then by the paths providers conventionally use. */
export async function loadFeedItems(base: string): Promise<FeedItem[]> {
  const page = await fetchText(base, 'text/html');
  const discovered = page
    ? [...page.body.matchAll(/<link[^>]+rel="alternate"[^>]*>/gi)]
        .filter((match) => /(rss|atom)\+xml/i.test(match[0]))
        .map((match) => (/href="([^"]+)"/i.exec(match[0]) ?? [])[1])
        .filter(Boolean)
        .map((url) => at(page.url, url as string))
    : [];

  for (const url of [...discovered, ...FEED_PATHS.map((path) => at(base, path))]) {
    const res = await fetchText(url, 'application/rss+xml, application/atom+xml, application/xml');
    if (res && /<(rss|feed)[\s>]/i.test(res.body.slice(0, 800))) {
      const items = parseFeed(res.body);
      if (items.length) return items;
    }
  }
  return [];
}

const isMaintenance = (item: FeedItem) => /maintenance|scheduled|planned work/i.test(item.title);

const isResolved = (item: FeedItem) =>
  /resolved|completed|restored/i.test(item.body.slice(0, 400)) ||
  Date.now() - new Date(item.at).valueOf() > LIVE_WINDOW_MS;

export function splitFeedItems(items: FeedItem[]): {
  incidents: Incident[];
  maintenances: Maintenance[];
} {
  const incidents: Incident[] = items
    .filter((item) => !isMaintenance(item))
    .map((item) => ({
      id: item.id,
      title: item.title,
      level: levelFromText(`${item.title} ${item.body.slice(0, 200)}`),
      status: isResolved(item) ? 'resolved' : 'ongoing',
      resolved: isResolved(item),
      startedAt: item.at,
      endedAt: null,
      url: item.link,
      updates: item.body ? [{ at: item.at, status: 'update', body: item.body }] : []
    }));

  const maintenances: Maintenance[] = items.filter(isMaintenance).map((item) => ({
    id: item.id,
    title: item.title,
    status: 'scheduled',
    startsAt: item.at,
    endsAt: null,
    url: item.link,
    updates: item.body ? [{ at: item.at, status: 'update', body: item.body }] : []
  }));

  return { incidents, maintenances };
}

/** Last resort. Current status is inferred from anything still open, so the UI flags it. */
export const feed: Adapter = {
  id: 'feed',
  label: 'RSS feed',
  async load(base) {
    const items = await loadFeedItems(base);
    if (!items.length) return null;

    const split = splitFeedItems(items);
    const open = split.incidents.filter((incident) => !incident.resolved);
    return {
      name: '',
      level: open.length ? worst(open.map((incident) => incident.level)) : 'operational',
      summary: open.length ? open[0].title : 'No open incidents in the feed',
      components: [],
      ...split
    };
  }
};
