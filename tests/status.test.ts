import { describe, expect, it } from 'vitest';
import { levelFromText, worst } from '../src/lib/status';

describe('levelFromText', () => {
  it('reads the underscored wording Statuspage uses', () => {
    expect(levelFromText('major_outage')).toBe('major');
    expect(levelFromText('partial_outage')).toBe('partial');
    expect(levelFromText('degraded_performance')).toBe('degraded');
    expect(levelFromText('under_maintenance')).toBe('maintenance');
  });

  it('reads the run-together wording Instatus uses', () => {
    expect(levelFromText('MAJOROUTAGE')).toBe('major');
    expect(levelFromText('PARTIALOUTAGE')).toBe('partial');
    expect(levelFromText('DEGRADEDPERFORMANCE')).toBe('degraded');
    expect(levelFromText('HASISSUES')).toBe('major');
    expect(levelFromText('UP')).toBe('operational');
  });

  it('prefers the more specific word when several match', () => {
    expect(levelFromText('Partial major outage')).toBe('partial');
    expect(levelFromText('Scheduled maintenance, major work')).toBe('maintenance');
  });

  it('admits when it cannot tell', () => {
    expect(levelFromText('')).toBe('unknown');
    expect(levelFromText(null)).toBe('unknown');
    expect(levelFromText('purple')).toBe('unknown');
  });
});

describe('worst', () => {
  it('picks the most severe level on the board', () => {
    expect(worst(['operational', 'degraded', 'major'])).toBe('major');
    expect(worst(['operational', 'unknown'])).toBe('unknown');
    expect(worst([])).toBe('operational');
  });

  it('does not let an unreadable service outrank a real outage', () => {
    expect(worst(['unknown', 'partial'])).toBe('partial');
  });
});
