import type { HandleServerError } from '@sveltejs/kit';
import { scrub } from '$lib/reporting';
import { report } from '$lib/server/report';

export const handleError: HandleServerError = ({ error, event, status }) => {
  if (import.meta.env.PUBLIC_SENTRY_DSN && status >= 500) report(error, event, scrub);
};
