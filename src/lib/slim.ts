import type { Board, Incident, Maintenance, Service, Update } from './types';

const BODY_CHARS = 280;
const WITH_BODIES = 10;

const trim = (updates: Update[], keep: number): Update[] =>
  updates.slice(0, keep).map((update) => ({
    ...update,
    body:
      update.body.length > BODY_CHARS
        ? `${update.body.slice(0, BODY_CHARS).trimEnd()}…`
        : update.body
  }));

const withUpdates = <T extends { updates: Update[] }>(item: T, keep: number): T => ({
  ...item,
  updates: trim(item.updates, keep)
});

/**
 * Cloudflare alone publishes 470 components and pages of update history per incident, so the
 * full board is about a megabyte. Each view carries only the prose it actually renders.
 */
const listed = <T extends { updates: Update[] }>(items: T[]): T[] =>
  items.map((item, index) => withUpdates(item, index < WITH_BODIES ? 1 : 0));

export function slimBoard(board: Board): Board {
  return {
    ...board,
    services: board.services.map((service) => ({
      ...service,
      components: [],
      incidents: listed(service.incidents),
      maintenances: listed(service.maintenances)
    }))
  };
}

/** For pages that carry their own flat list, so nothing is serialised twice. */
export function boardShell(board: Board): Board {
  return {
    ...board,
    services: board.services.map((service) => ({
      ...service,
      components: [],
      incidents: [],
      maintenances: []
    }))
  };
}

export const slimList = <T extends { updates: Update[] }>(items: T[]): T[] =>
  items.map((item) => withUpdates(item, 1));

export const stripUpdates = <T extends { updates: Update[] }>(items: T[]): T[] =>
  items.map((item) => ({ ...item, updates: [] }));

/** One service in full, but only the recent incidents keep their whole thread. */
export function detailService(service: Service): Service {
  const shape = (items: Incident[] | Maintenance[]) =>
    items.map((item, index) => withUpdates(item, index < WITH_BODIES ? item.updates.length : 1));
  return {
    ...service,
    incidents: shape(service.incidents) as Incident[],
    maintenances: shape(service.maintenances) as Maintenance[]
  };
}
