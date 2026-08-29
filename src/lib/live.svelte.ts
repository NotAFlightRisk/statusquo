import type { Board } from './types';

/**
 * Cloudflare rewrites our max-age on every edge hit, so a plain fetch stops asking after
 * one interval. 'no-cache' revalidates and keeps the edge cache doing its job.
 */
export function livePoll(source: () => Board, seconds: () => number) {
  let fetched = $state<Board | null>(null);
  let stale = $state(false);

  // Navigating between boards reuses this component, so a read for the old token is dropped.
  let board = $derived(fetched?.token === source().token ? fetched : source());

  $effect(() => {
    const url = `/api/board/${source().token}`;
    const timer = setInterval(async () => {
      try {
        const res = await fetch(url, {
          cache: 'no-cache',
          headers: { accept: 'application/json' }
        });
        if (!res.ok) throw new Error(String(res.status));
        fetched = await res.json();
        stale = false;
      } catch {
        stale = true;
      }
    }, seconds() * 1000);
    return () => clearInterval(timer);
  });

  return {
    get board() {
      return board;
    },
    get stale() {
      return stale;
    }
  };
}
