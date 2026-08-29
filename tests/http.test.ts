import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchText } from '../src/lib/server/http';

const reply = (status: number, headers: Record<string, string> = {}, body = 'ok') =>
  new Response(body, { status, headers });

afterEach(() => vi.unstubAllGlobals());

describe('fetchText', () => {
  it('follows a redirect that stays on a public name', async () => {
    const calls: string[] = [];
    vi.stubGlobal('fetch', async (url: string) => {
      calls.push(url);
      return calls.length === 1
        ? reply(301, { location: 'https://status.claude.com/api' })
        : reply(200, {}, 'payload');
    });
    const res = await fetchText('https://status.anthropic.com/api');
    expect(res?.body).toBe('payload');
    expect(res?.url).toBe('https://status.claude.com/api');
  });

  it('refuses to follow a redirect into a private network', async () => {
    vi.stubGlobal('fetch', async () => reply(302, { location: 'http://169.254.169.254/latest' }));
    expect(await fetchText('https://status.example.com')).toBeNull();
  });

  it('refuses a redirect that hides the address in another base', async () => {
    vi.stubGlobal('fetch', async () => reply(302, { location: 'http://0177.0.0.1/' }));
    expect(await fetchText('https://status.example.com')).toBeNull();
  });

  it('gives up rather than looping forever', async () => {
    let hops = 0;
    vi.stubGlobal('fetch', async () => {
      hops += 1;
      return reply(302, { location: 'https://status.example.com/again' });
    });
    expect(await fetchText('https://status.example.com')).toBeNull();
    expect(hops).toBeLessThanOrEqual(6);
  });

  it('returns nothing on an upstream error rather than throwing', async () => {
    vi.stubGlobal('fetch', async () => reply(503));
    expect(await fetchText('https://status.example.com')).toBeNull();
  });
});
