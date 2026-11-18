import { describe, expect, it } from 'vitest';
import { boardDescription } from '../src/lib/describe';
import type { Board, Level } from '../src/lib/types';

const board = (...services: [string, Level][]) =>
  ({ services: services.map(([name, level]) => ({ name, level })) }) as Board;

describe('boardDescription', () => {
  it('stops calling a board clean when a station has no clear status', () => {
    expect(boardDescription(board(['GitHub', 'operational']))).toContain(
      'everything running clean'
    );
    expect(
      boardDescription(board(['GitHub', 'operational'], ['example.com', 'unknown']))
    ).toContain('no clear status from example.com');
  });

  it('names stations under maintenance rather than calling them clean', () => {
    const text = boardDescription(board(['GitHub', 'operational'], ['Confluent', 'maintenance']));
    expect(text).toContain('Confluent under maintenance');
    expect(text).not.toContain('running clean');
  });

  it('leads with trouble over stations it cannot read', () => {
    const text = boardDescription(board(['Slack', 'major'], ['example.com', 'unknown']));
    expect(text).toContain('Slack reporting trouble');
    expect(text).not.toContain('example.com reporting');
  });
});
