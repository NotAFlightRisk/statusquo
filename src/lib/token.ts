import { BY_HOST, BY_SLUG } from './catalogue';
import type { Target } from './types';

export const MAX_SERVICES = 10;

// Every IP literal, in every base, ends in a numeric label. Requiring an alphabetic TLD
// rejects the lot in one rule: 0177.0.0.1, 2130706433, 0x7f000001, [fc00::1], localhost.
const DNS_NAME = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/i;

const PRIVATE_SUFFIX =
  /\.(local|internal|localdomain|home|lan|intranet|corp|test|example|invalid)$/i;

const b64url = {
  encode: (value: string) => btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
  decode: (value: string) => atob(value.replace(/-/g, '+').replace(/_/g, '/'))
};

/** Rejects anything that would turn the server into an open proxy for a private network. */
export function normaliseUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  if (!DNS_NAME.test(url.hostname) || PRIVATE_SUFFIX.test(url.hostname)) return null;
  url.hash = '';
  url.pathname = url.pathname.replace(/\/+$/, '');
  return url.href.replace(/\/$/, '');
}

export function tokenFor(raw: string): string | null {
  const url = normaliseUrl(raw);
  if (!url) return null;
  const parsed = new URL(url);
  const plain = parsed.pathname === '/' && !parsed.search && parsed.protocol === 'https:';
  const known = BY_HOST.get(parsed.host);
  if (known && plain) return known.slug;
  return plain ? `u.${parsed.host}` : `b.${b64url.encode(url)}`;
}

function targetFor(token: string): Target | null {
  const entry = BY_SLUG.get(token);
  if (entry) return { token, url: entry.url, entry };
  if (token.startsWith('u.')) {
    const url = normaliseUrl(token.slice(2));
    return url ? { token, url, entry: BY_HOST.get(new URL(url).host) } : null;
  }
  if (token.startsWith('b.')) {
    try {
      const url = normaliseUrl(b64url.decode(token.slice(2)));
      return url ? { token, url, entry: BY_HOST.get(new URL(url).host) } : null;
    } catch {
      return null;
    }
  }
  return null;
}

export function decodeToken(token: string): Target[] {
  const seen = new Set<string>();
  return token
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map(targetFor)
    .filter((target): target is Target => Boolean(target))
    .filter((target) => !seen.has(target.url) && seen.add(target.url))
    .slice(0, MAX_SERVICES);
}

export const encodeToken = (targets: { token: string }[]) =>
  targets.map((target) => target.token).join(',');

/** A stable id for one service inside a page, used for its detail route. */
export function slugFor(target: Target): string {
  if (target.entry) return target.entry.slug;
  return new URL(target.url).host.replace(/^(www|status)\./, '').replace(/[^a-z0-9]+/gi, '-');
}
