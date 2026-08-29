export type Level = 'operational' | 'maintenance' | 'degraded' | 'partial' | 'major' | 'unknown';

export interface Component {
  id: string;
  name: string;
  description?: string;
  level: Level;
  group?: string;
}

export interface Update {
  at: string;
  status: string;
  body: string;
}

export interface Incident {
  id: string;
  title: string;
  level: Level;
  status: string;
  resolved: boolean;
  startedAt: string;
  endedAt: string | null;
  url?: string;
  updates: Update[];
}

export interface Maintenance {
  id: string;
  title: string;
  status: string;
  startsAt: string;
  endsAt: string | null;
  url?: string;
  updates: Update[];
}

export interface ServiceData {
  name: string;
  level: Level;
  summary: string;
  components: Component[];
  incidents: Incident[];
  maintenances: Maintenance[];
}

export interface Service extends ServiceData {
  token: string;
  slug: string;
  url: string;
  provider: string;
  providerLabel: string;
  icon: string;
  error?: string;
}

export type ServiceRef = Pick<Service, 'token' | 'slug' | 'name' | 'icon' | 'level'>;

export interface Board {
  token: string;
  title: string;
  level: Level;
  services: Service[];
  fetchedAt: string;
}

export interface CatalogueEntry {
  slug: string;
  name: string;
  url: string;
  site: string;
  provider: string;
}

export interface Target {
  token: string;
  url: string;
  entry?: CatalogueEntry;
}
