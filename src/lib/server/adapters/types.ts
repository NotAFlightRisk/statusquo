import type { ServiceData } from '$lib/types';

export interface Adapter {
  id: string;
  label: string;
  /** Returns null when this provider clearly isn't the one serving the page. */
  load(base: string): Promise<ServiceData | null>;
}
