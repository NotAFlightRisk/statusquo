import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DEFAULT_THEME, isTheme, THEMES } from '../src/lib/themes';

const read = (name: string) => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');

interface Rule {
  selector: string;
  declarations: [string, string][];
}

// comments and @import both land in the next rule's selector otherwise
const strip = (source: string) =>
  source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@[\w-]+[^;{]*;/g, '');

const rules = (source: string): Rule[] =>
  [...strip(source).matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => ({
    selector: selector.trim().replace(/\s+/g, ' '),
    declarations: [...body.matchAll(/(--[\w-]+)\s*:\s*([^;}]+);?/g)].map(([, prop, value]) => [
      prop,
      value.trim()
    ])
  }));

const THEME_SELECTOR = /^\[data-theme=['"]?([\w-]+)['"]?\]$/;
const FLOOR = ':root, .theme-swatch';

const themed = rules(read('themes.css'));
const floor = themed.filter((rule) => rule.selector === FLOOR);
const themeRules = themed.filter((rule) => THEME_SELECTOR.test(rule.selector));

// a property set here beats an inherited theme value, whatever the theme's specificity
const outside = rules(read('app.css')).filter((rule) => /^(:root|body)\b/.test(rule.selector));

// what a pane and a page are made of, as opposed to what colour they are
const MATERIAL = /^--(paper|panel|radius)/;
const INERT = /^(none|auto|scroll|transparent|0|0 solid transparent)$/;

describe('THEMES', () => {
  it('has a unique id for every theme', () => {
    expect(new Set(THEMES.map((theme) => theme.id)).size).toBe(THEMES.length);
  });

  it('leads with the default', () => {
    expect(THEMES[0].id).toBe(DEFAULT_THEME);
  });

  it('styles exactly the ones the picker offers', () => {
    const styled = themeRules.map((rule) => rule.selector.match(THEME_SELECTOR)![1]);
    expect(styled.sort()).toEqual(THEMES.map((theme) => theme.id).sort());
  });

  it('leaves no rule in themes.css unaccounted for', () => {
    const stray = themed
      .filter((rule) => rule.selector !== FLOOR && !THEME_SELECTOR.test(rule.selector))
      .map((rule) => rule.selector);
    expect(stray).toEqual([]);
  });

  it('defaults every knob a theme reaches for, so none can inherit the one before it', () => {
    const defaulted = new Set(floor.flatMap((rule) => rule.declarations.map(([prop]) => prop)));
    const leaks = themeRules.flatMap((rule) =>
      rule.declarations
        .filter(([prop]) => !defaulted.has(prop))
        .map(([prop]) => `${rule.selector} ${prop}`)
    );
    expect(leaks).toEqual([]);
  });

  it('keeps what a theme sets out of app.css, where it would outrank the theme', () => {
    const owned = new Set(themeRules.flatMap((rule) => rule.declarations.map(([prop]) => prop)));
    const outranked = outside.flatMap((rule) =>
      rule.declarations
        .filter(([prop]) => owned.has(prop))
        .map(([prop]) => `${rule.selector} ${prop}`)
    );
    expect(outranked).toEqual([]);
  });

  it('leaves every material to the themes, so none of them wears another one', () => {
    const stuck = floor.flatMap((rule) =>
      rule.declarations
        .filter(([prop, value]) => MATERIAL.test(prop) && !INERT.test(value))
        .map(([prop, value]) => `${prop}: ${value}`)
    );
    expect(stuck).toEqual([]);
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
