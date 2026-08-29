import { describe, expect, it } from 'vitest';
import { byMonth, heatmap, meanMinutes } from '../src/lib/stats';
import { coverageStart, tracePath } from '../src/lib/trace';
import type { Incident } from '../src/lib/types';

const NOW = Date.parse('2026-08-29T12:00:00Z');
const DAY = 86_400_000;

const incident = (daysAgo: number, extra: Partial<Incident> = {}): Incident => ({
  id: `i${daysAgo}${extra.level ?? ''}`,
  title: 'Something broke',
  level: 'major',
  status: 'resolved',
  resolved: true,
  startedAt: new Date(NOW - daysAgo * DAY).toISOString(),
  endedAt: new Date(NOW - daysAgo * DAY + 2 * 3600_000).toISOString(),
  updates: [],
  ...extra
});

describe('heatmap', () => {
  it('marks the days an incident actually spanned', () => {
    const cells = heatmap([incident(3)], 10, NOW);
    expect(cells).toHaveLength(10);
    expect(cells.filter((cell) => cell.level === 'major')).toHaveLength(1);
    expect(cells.at(-1)?.level).toBe('operational');
  });

  it('treats a short history as complete, so a quiet service reads as quiet', () => {
    const cells = heatmap([incident(3)], 90, NOW);
    expect(cells.every((cell) => cell.covered)).toBe(true);
  });

  it('runs an open incident through to today rather than stopping after a day', () => {
    const cells = heatmap([incident(5, { endedAt: null, resolved: false })], 10, NOW);
    expect(cells.filter((cell) => cell.level === 'major').length).toBeGreaterThanOrEqual(5);
  });

  it('marks days before a paged-out history as unpublished, not as fine', () => {
    const capped = Array.from({ length: 30 }, (_, index) => incident(index + 1));
    const cells = heatmap(capped, 90, NOW);
    expect(cells[0].covered).toBe(false);
    expect(cells.at(-1)?.covered).toBe(true);
    expect(cells.filter((cell) => !cell.covered).length).toBeGreaterThan(50);
  });
});

describe('tracePath', () => {
  it('draws nothing over the window it has no history for', () => {
    const capped = Array.from({ length: 30 }, (_, index) => incident(index + 1));
    const cells = heatmap(capped, 90, NOW);
    expect(coverageStart(cells)).toBeGreaterThan(0);
    expect(tracePath(cells, 720, 40)).not.toBe('');
  });

  it('is deterministic, so the server and the client draw the same line', () => {
    const cells = heatmap([incident(2)], 30, NOW);
    expect(tracePath(cells, 720, 40)).toBe(tracePath(cells, 720, 40));
  });

  it('has no line at all when nothing is covered', () => {
    expect(tracePath([], 720, 40)).toBe('');
  });
});

describe('byMonth', () => {
  it('counts each incident into the month it started', () => {
    const buckets = byMonth([incident(1), incident(2), incident(200)], 12, NOW);
    expect(buckets).toHaveLength(12);
    expect(buckets.at(-1)?.total).toBe(2);
    expect(buckets.reduce((sum, bucket) => sum + bucket.total, 0)).toBe(3);
  });
});

describe('meanMinutes', () => {
  it('averages only the incidents that were actually closed', () => {
    expect(meanMinutes([incident(1), incident(2, { endedAt: null })])).toBe(120);
  });

  it('says nothing rather than zero when no incident has a resolved time', () => {
    expect(meanMinutes([incident(1, { endedAt: null })])).toBeNull();
  });
});
