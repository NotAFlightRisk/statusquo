import { defineEnvVars } from '@sveltejs/kit/env';

const optional = { schema: (value: string | undefined) => value };

export const variables = defineEnvVars({
  STATUSQUO_PAGES: optional,
  STATUSQUO_TITLE: optional,
  STATUSQUO_TAGLINE: optional,
  STATUSQUO_PUBLIC: optional,
  STATUSQUO_REFRESH_SECONDS: optional,
  STATUSQUO_ICONS: optional
});
