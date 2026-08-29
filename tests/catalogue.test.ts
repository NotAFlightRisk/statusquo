import { describe, expect, it } from 'vitest';
import { BY_HOST, BY_SLUG, CATALOGUE } from '../src/lib/catalogue';
import { BY_ID } from '../src/lib/server/adapters';
import { normaliseUrl } from '../src/lib/token';

const unique = (values: string[]) => new Set(values).size === values.length;

describe('catalogue', () => {
  it('keeps slugs and hosts unique, so the two lookups never lose an entry', () => {
    expect(unique(CATALOGUE.map((entry) => entry.slug))).toBe(true);
    expect(unique(CATALOGUE.map((entry) => new URL(entry.url).host))).toBe(true);
    expect(BY_SLUG.size).toBe(CATALOGUE.length);
    expect(BY_HOST.size).toBe(CATALOGUE.length);
  });

  it('only names providers we can actually read', () => {
    const unknown = CATALOGUE.filter((entry) => !BY_ID.has(entry.provider));
    expect(unknown).toEqual([]);
  });

  it('gives every entry a group, a site and a url the guard accepts', () => {
    const broken = CATALOGUE.filter(
      (entry) => !entry.group || !entry.site || normaliseUrl(entry.url) !== entry.url
    );
    expect(broken).toEqual([]);
  });
});
