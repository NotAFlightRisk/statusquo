import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DEFAULT_THEME, isTheme, THEMES } from '../src/lib/themes';

const css = readFileSync(new URL('../src/themes.css', import.meta.url), 'utf8');

describe('THEMES', () => {
  it('has a unique id for every theme', () => {
    expect(new Set(THEMES.map((theme) => theme.id)).size).toBe(THEMES.length);
  });

  it('leads with the default', () => {
    expect(THEMES[0].id).toBe(DEFAULT_THEME);
  });

  it('has a block of CSS behind every one of them', () => {
    const missing = THEMES.filter((theme) => !css.includes(`[data-theme='${theme.id}']`));
    expect(missing.map((theme) => theme.id)).toEqual([]);
  });

  it('styles nothing the picker cannot offer', () => {
    const styled = [...css.matchAll(/\[data-theme='([\w-]+)'\]/g)].map((match) => match[1]);
    const known = new Set(THEMES.map((theme) => theme.id));
    expect([...new Set(styled)].filter((id) => !known.has(id))).toEqual([]);
  });
});

describe('isTheme', () => {
  it('takes the ones we ship', () => {
    expect(isTheme('nord')).toBe(true);
    expect(isTheme(DEFAULT_THEME)).toBe(true);
  });

  it('turns down anything else', () => {
    expect(isTheme('dark')).toBe(false);
    expect(isTheme('../evil')).toBe(false);
    expect(isTheme('')).toBe(false);
    expect(isTheme(null)).toBe(false);
    expect(isTheme(undefined)).toBe(false);
  });
});
