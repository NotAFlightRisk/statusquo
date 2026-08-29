import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { MAX_SERVICES, tokenFor } from '$lib/token';
import { BY_SLUG } from '$lib/catalogue';

/** Where the builder form lands. Turns the picks into a token and sends you to the board. */
export const GET: RequestHandler = ({ url }) => {
  const tokens = url.searchParams
    .getAll('page')
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => (BY_SLUG.has(value) ? value : tokenFor(value)))
    .filter((token): token is string => Boolean(token));

  const unique = [...new Set(tokens)].slice(0, MAX_SERVICES);
  if (!unique.length) {
    redirect(303, '/?problem=Pick+at+least+one+service%2C+or+paste+a+status+page+address.');
  }
  redirect(303, `/s/${unique.join(',')}`);
};
