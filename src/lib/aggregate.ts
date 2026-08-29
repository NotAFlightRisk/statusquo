import type { Board, Incident, Maintenance, Service, ServiceRef } from './types';

const byNewest = (a: string, b: string) => new Date(b).valueOf() - new Date(a).valueOf();

/** Only what the list rows render, so a flat list does not re-serialise every service. */
const ref = (service: Service): ServiceRef => ({
  token: service.token,
  slug: service.slug,
  name: service.name,
  icon: service.icon,
  level: service.level
});

export function allIncidents(board: Board): (Incident & { service: ServiceRef })[] {
  return board.services
    .flatMap((service) =>
      service.incidents.map((incident) => ({ ...incident, service: ref(service) }))
    )
    .sort((a, b) => byNewest(a.startedAt, b.startedAt));
}

export function allMaintenances(board: Board): (Maintenance & { service: ServiceRef })[] {
  return board.services
    .flatMap((service) =>
      service.maintenances.map((entry) => ({ ...entry, service: ref(service) }))
    )
    .sort((a, b) => new Date(a.startsAt).valueOf() - new Date(b.startsAt).valueOf());
}
