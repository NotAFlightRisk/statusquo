import type { Board } from '$lib/types';
import { LEVELS } from '$lib/status';
import { allIncidents, allMaintenances } from '$lib/aggregate';
import { boardDescription } from '$lib/describe';

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const rfc822 = (iso: string) => {
  const at = new Date(iso);
  return Number.isNaN(at.valueOf()) ? new Date().toUTCString() : at.toUTCString();
};

interface Entry {
  title: string;
  link: string;
  guid: string;
  at: string;
  body: string;
}

/** One combined feed per board, incidents and maintenance together, newest first. */
export function boardFeed(board: Board, origin: string): string {
  const base = `${origin}/s/${board.token}`;

  const entries: Entry[] = [
    ...allIncidents(board).map((incident) => ({
      title: `${incident.service.name}: ${incident.title}`,
      link: incident.url ?? `${base}/${incident.service.slug}`,
      guid: `${incident.service.slug}-${incident.id}`,
      at: incident.startedAt,
      body: [
        `${LEVELS[incident.level].label}${incident.resolved ? ', resolved' : ', still open'}.`,
        incident.updates[0]?.body ?? ''
      ]
        .join(' ')
        .trim()
    })),
    ...allMaintenances(board).map((entry) => ({
      title: `${entry.service.name}: scheduled maintenance, ${entry.title}`,
      link: entry.url ?? `${base}/${entry.service.slug}`,
      guid: `${entry.service.slug}-maint-${entry.id}`,
      at: entry.startsAt,
      body: entry.updates[0]?.body ?? 'Scheduled maintenance window.'
    }))
  ]
    .sort((a, b) => new Date(b.at).valueOf() - new Date(a.at).valueOf())
    .slice(0, 100);

  const items = entries
    .map(
      (entry) => `    <item>
      <title>${escape(entry.title)}</title>
      <link>${escape(entry.link)}</link>
      <guid isPermaLink="false">${escape(entry.guid)}</guid>
      <pubDate>${rfc822(entry.at)}</pubDate>
      <description>${escape(entry.body)}</description>
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(board.title)} status</title>
    <link>${escape(base)}</link>
    <atom:link href="${escape(base)}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escape(boardDescription(board))}</description>
    <language>en</language>
    <lastBuildDate>${rfc822(board.fetchedAt)}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}
