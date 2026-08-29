import { normaliseUrl } from '$lib/token';

const TIMEOUT_MS = 9000;
const MAX_HOPS = 5;
const UA = 'statusquo (+https://statusquo.peng.ly)';

interface Fetched {
  body: string;
  url: string;
}

/**
 * Every upstream read is best effort - a miss degrades one field, never the whole page.
 * Redirects are followed by hand so each hop gets the same guard the pasted URL got,
 * otherwise a 302 walks the fetcher straight into a private network.
 */
export async function fetchText(url: string, accept = '*/*'): Promise<Fetched | null> {
  let target: string | null = normaliseUrl(url);
  try {
    for (let hop = 0; hop <= MAX_HOPS; hop += 1) {
      if (!target) return null;
      const res = await fetch(target, {
        headers: { accept, 'user-agent': UA },
        redirect: 'manual',
        signal: AbortSignal.timeout(TIMEOUT_MS)
      });
      const location = res.headers.get('location');
      if (res.status >= 300 && res.status < 400 && location) {
        target = normaliseUrl(new URL(location, target).href);
        continue;
      }
      if (!res.ok) return null;
      return { body: await res.text(), url: target };
    }
    return null;
  } catch {
    return null;
  }
}

export async function fetchJson<T>(url: string): Promise<T | null> {
  const res = await fetchText(url, 'application/json');
  if (!res) return null;
  try {
    return JSON.parse(res.body) as T;
  } catch {
    return null;
  }
}

export function at(base: string, path: string): string {
  return new URL(path, base).href;
}
