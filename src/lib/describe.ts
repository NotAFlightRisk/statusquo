import type { Board, Service } from './types';
import { LEVELS, isDown } from './status';

const joined = (services: Service[]) => services.map((service) => service.name).join(', ');

function verdict(services: Service[]): string {
  const troubled = services.filter((service) => isDown(service.level));
  if (troubled.length) return `${joined(troubled)} reporting trouble`;
  const servicing = services.filter((service) => service.level === 'maintenance');
  if (servicing.length) return `${joined(servicing)} under maintenance`;
  const unclear = services.filter((service) => service.level === 'unknown');
  return unclear.length ? `no clear status from ${joined(unclear)}` : 'everything running clean';
}

/** One sentence that works as a meta description, an RSS title and a social card. */
export function boardDescription(board: Board): string {
  const names = board.services.map((service) => service.name);
  const list =
    names.slice(0, 4).join(', ') + (names.length > 4 ? ` and ${names.length - 4} more` : '');
  return `${list}: ${verdict(board.services)}. Combined status, incident history and scheduled maintenance.`;
}

export const boardTitle = (board: Board): string => `${board.title} · ${LEVELS[board.level].label}`;
