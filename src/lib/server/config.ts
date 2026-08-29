import { env } from '$env/dynamic/private';
import { decodeToken, normaliseUrl, tokenFor } from '$lib/token';

export interface SiteConfig {
  /** Set STATUSQUO_PAGES to pin one board as the homepage, which is how self-hosters run it. */
  pinned: string | null;
  title: string;
  tagline: string;
  builder: boolean;
  refreshSeconds: number;
  icons: string;
}

const list = (raw: string) =>
  raw
    .split(/[\s,]+/)
    .map((part) => (part.includes('.') ? (normaliseUrl(part) ? tokenFor(part) : part) : part))
    .filter(Boolean)
    .join(',');

export function siteConfig(): SiteConfig {
  const pages = env.STATUSQUO_PAGES?.trim();
  const pinned = pages ? list(pages) : null;
  return {
    pinned: pinned && decodeToken(pinned).length ? pinned : null,
    title: env.STATUSQUO_TITLE?.trim() || 'statusquo',
    tagline: env.STATUSQUO_TAGLINE?.trim() || 'Every status page you depend on, on one page',
    builder: env.STATUSQUO_PUBLIC?.trim().toLowerCase() !== 'false',
    refreshSeconds: Math.max(15, Number(env.STATUSQUO_REFRESH_SECONDS) || 60),
    icons: env.STATUSQUO_ICONS?.trim() || 'https://icons.duckduckgo.com/ip3/{domain}.ico'
  };
}
