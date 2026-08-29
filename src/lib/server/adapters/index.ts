import { cachet } from './cachet';
import { feed } from './feed';
import { googlecloud } from './googlecloud';
import { instatus } from './instatus';
import { statuspage } from './statuspage';
import type { Adapter } from './types';

/** Ordered by how much a hit tells us, so the cheap precise ones get asked first. */
export const ADAPTERS: Adapter[] = [statuspage, instatus, cachet, googlecloud, feed];

export const BY_ID = new Map(ADAPTERS.map((adapter) => [adapter.id, adapter]));

export type { Adapter };
