import type { LayoutServerLoad } from './$types';
import { siteConfig } from '$lib/server/config';

export const load: LayoutServerLoad = () => {
  const { title, tagline, builder, pinned, refreshSeconds } = siteConfig();
  return { site: { title, tagline, builder, pinned, refreshSeconds } };
};
