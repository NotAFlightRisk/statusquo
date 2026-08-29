import type { Board } from './types';
import { LEVELS, isDown } from './status';

/** One sentence that works as a meta description, an RSS title and a social card. */
export function boardDescription(board: Board): string {
  const names = board.services.map((service) => service.name);
  const troubled = board.services.filter((service) => isDown(service.level));
  const list =
    names.slice(0, 4).join(', ') + (names.length > 4 ? ` and ${names.length - 4} more` : '');
  const verdict = troubled.length
    ? `${troubled.map((service) => service.name).join(', ')} reporting trouble`
    : 'everything running clean';
  return `${list}: ${verdict}. Combined status, incident history and scheduled maintenance.`;
}

export const boardTitle = (board: Board): string => `${board.title} · ${LEVELS[board.level].label}`;
