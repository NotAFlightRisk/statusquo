import { describe, expect, it } from 'vitest';
import { MAX_SERVICES, decodeToken, normaliseUrl, slugFor, tokenFor } from '../src/lib/token';

describe('normaliseUrl', () => {
  it('fills in a missing scheme and drops the trailing slash', () => {
    expect(normaliseUrl('status.example.com')).toBe('https://status.example.com');
    expect(normaliseUrl('https://status.example.com/')).toBe('https://status.example.com');
  });

  it('refuses anything that would point the fetcher at a private network', () => {
    expect(normaliseUrl('http://localhost:8080')).toBeNull();
    expect(normaliseUrl('http://127.0.0.1/status')).toBeNull();
    expect(normaliseUrl('http://192.168.1.4')).toBeNull();
    expect(normaliseUrl('http://10.0.0.1')).toBeNull();
    expect(normaliseUrl('http://169.254.169.254/latest/meta-data')).toBeNull();
    expect(normaliseUrl('http://box.internal')).toBeNull();
    expect(normaliseUrl('file:///etc/passwd')).toBeNull();
    expect(normaliseUrl('javascript:alert(1)')).toBeNull();
  });
});

describe('tokenFor', () => {
  it('uses the catalogue slug for a service we already know', () => {
    expect(tokenFor('https://www.githubstatus.com')).toBe('github');
  });

  it('keeps a plain host readable in the URL', () => {
    expect(tokenFor('https://status.example.com')).toBe('u.status.example.com');
  });

  it('encodes anything with a path, since a slash would split the segment', () => {
    const token = tokenFor('https://example.com/status/live');
    expect(token?.startsWith('b.')).toBe(true);
    expect(token).not.toContain('/');
  });
});

describe('decodeToken', () => {
  it('round-trips every token shape back to its URL', () => {
    const targets = decodeToken('github,u.status.example.com');
    expect(targets.map((target) => target.url)).toEqual([
      'https://www.githubstatus.com',
      'https://status.example.com'
    ]);
  });

  it('round-trips a URL with a path', () => {
    const token = tokenFor('https://example.com/status/live') as string;
    expect(decodeToken(token)[0].url).toBe('https://example.com/status/live');
  });

  it('drops the parts it cannot read rather than failing the whole board', () => {
    expect(decodeToken('github,nonsense,b.@@@@').map((one) => one.token)).toEqual(['github']);
  });

  it('drops a repeat of the same service', () => {
    expect(decodeToken('github,u.www.githubstatus.com')).toHaveLength(1);
  });

  it('caps the board, because each service costs three upstream requests', () => {
    const token = Array.from({ length: 20 }, (_, i) => `u.status${i}.example.com`).join(',');
    expect(decodeToken(token)).toHaveLength(MAX_SERVICES);
  });
});

describe('slugFor', () => {
  it('names an unknown service after its host, without the noise words', () => {
    const target = decodeToken('u.status.example.com')[0];
    expect(slugFor(target)).toBe('example-com');
  });
});
