import { error } from '@sveltejs/kit';
import type { Board } from '#lib/types.js';
import { loadBoard } from './board';
import { siteConfig } from './config';

/** Boards are read straight off the URL, so a bad token is a 404 with a reason. */
export async function boardOrFail(token: string): Promise<Board> {
  const board = await loadBoard(token);
  if (!board.services.length) {
    error(404, 'None of those look like status pages. Check the addresses and try again.');
  }
  return board;
}

export function cacheHeaders(setHeaders: (headers: Record<string, string>) => void): void {
  const { refreshSeconds } = siteConfig();
  setHeaders({ 'cache-control': `public, max-age=0, s-maxage=${refreshSeconds}` });
}
