const TIMEOUT_MS = 9000;
const UA = 'statusquo (+https://statusquo.peng.ly)';

interface Fetched {
  body: string;
  url: string;
}

/** Every upstream read is best effort - a miss degrades one field, never the whole page. */
export async function fetchText(url: string, accept = '*/*'): Promise<Fetched | null> {
  try {
    const res = await fetch(url, {
      headers: { accept, 'user-agent': UA },
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS)
    });
    if (!res.ok) return null;
    return { body: await res.text(), url: res.url || url };
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
