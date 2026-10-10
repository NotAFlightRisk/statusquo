import type { HandleServerError } from '@sveltejs/kit/hooks';
import { scrub } from '#lib/reporting.js';
import { report } from '#lib/server/report.js';

export const handleError: HandleServerError = async ({ kind, error, event }) => {
  if (import.meta.env.PUBLIC_SENTRY_DSN && kind === 'unknown') await report(error, event, scrub);
};
