import type { DayCell } from './stats';
import type { Level } from './types';

const AMPLITUDE: Record<Level, number> = {
  operational: 0.07,
  unknown: 0.14,
  maintenance: 0.24,
  degraded: 0.45,
  partial: 0.7,
  major: 1
};

const SAMPLES = 4;

/** Deterministic so the server and the client draw the same wobble. */
function noise(seed: string, step: number): number {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash = Math.imul(hash ^ seed.charCodeAt(index), 16777619);
  }
  hash = Math.imul(hash ^ step, 16777619);
  return ((hash >>> 8) % 2000) / 1000 - 1;
}

/** One continuous line across the days we hold history for, spiking where it went wrong. */
export function tracePath(cells: DayCell[], width: number, height: number): string {
  const middle = height / 2;
  const span = width / cells.length;
  const points: string[] = [];

  cells.forEach((cell, index) => {
    if (!cell.covered) return;
    const reach = AMPLITUDE[cell.level] * (middle - 1);
    for (let sample = 0; sample < SAMPLES; sample += 1) {
      const x = (index + sample / SAMPLES) * span;
      const swing = noise(cell.date, sample) * reach;
      points.push(`${x.toFixed(2)} ${(middle - swing).toFixed(2)}`);
    }
  });
  if (!points.length) return '';
  points.push(`${width} ${middle}`);
  return `M${points.join('L')}`;
}

/** How far along the window the published history starts, as a fraction. */
export function coverageStart(cells: DayCell[]): number {
  const first = cells.findIndex((cell) => cell.covered);
  return first <= 0 ? 0 : first / cells.length;
}

export interface Band {
  x: number;
  width: number;
  level: Level;
}

/** Contiguous runs of trouble, drawn behind the trace as event windows. */
export function traceBands(cells: DayCell[], width: number): Band[] {
  const span = width / cells.length;
  const bands: Band[] = [];
  cells.forEach((cell, index) => {
    if (cell.level === 'operational' || !cell.covered) return;
    const last = bands.at(-1);
    if (last && last.level === cell.level && Math.abs(last.x + last.width - index * span) < 0.01) {
      last.width += span;
      return;
    }
    bands.push({ x: index * span, width: span, level: cell.level });
  });
  return bands;
}
