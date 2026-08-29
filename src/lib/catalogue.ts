import type { CatalogueEntry } from './types';

/** Probed live, so every entry is known to answer. Anything else can still be pasted as a URL. */
export const CATALOGUE: CatalogueEntry[] = [
  {
    slug: '1password',
    name: '1Password',
    url: 'https://status.1password.com',
    site: '1password.com',
    provider: 'statuspage'
  },
  {
    slug: 'linode',
    name: 'Akamai Linode',
    url: 'https://status.linode.com',
    site: 'linode.com',
    provider: 'statuspage'
  },
  {
    slug: 'atlassian',
    name: 'Atlassian',
    url: 'https://status.atlassian.com',
    site: 'atlassian.com',
    provider: 'statuspage'
  },
  {
    slug: 'bitbucket',
    name: 'Bitbucket',
    url: 'https://bitbucket.status.atlassian.com',
    site: 'bitbucket.org',
    provider: 'statuspage'
  },
  {
    slug: 'circleci',
    name: 'CircleCI',
    url: 'https://status.circleci.com',
    site: 'circleci.com',
    provider: 'statuspage'
  },
  {
    slug: 'anthropic',
    name: 'Claude',
    url: 'https://status.claude.com',
    site: 'claude.com',
    provider: 'statuspage'
  },
  {
    slug: 'clerk',
    name: 'Clerk',
    url: 'https://status.clerk.com',
    site: 'clerk.com',
    provider: 'statuspage'
  },
  {
    slug: 'cloudflare',
    name: 'Cloudflare',
    url: 'https://www.cloudflarestatus.com',
    site: 'cloudflare.com',
    provider: 'statuspage'
  },
  {
    slug: 'cloudinary',
    name: 'Cloudinary',
    url: 'https://status.cloudinary.com',
    site: 'cloudinary.com',
    provider: 'statuspage'
  },
  {
    slug: 'coinbase',
    name: 'Coinbase',
    url: 'https://status.coinbase.com',
    site: 'coinbase.com',
    provider: 'statuspage'
  },
  {
    slug: 'crates',
    name: 'crates.io',
    url: 'https://status.crates.io',
    site: 'crates.io',
    provider: 'statuspage'
  },
  {
    slug: 'datadog',
    name: 'Datadog',
    url: 'https://status.datadoghq.com',
    site: 'datadoghq.com',
    provider: 'statuspage'
  },
  {
    slug: 'deno',
    name: 'Deno',
    url: 'https://denostatus.com',
    site: 'deno.com',
    provider: 'instatus'
  },
  {
    slug: 'digitalocean',
    name: 'DigitalOcean',
    url: 'https://status.digitalocean.com',
    site: 'digitalocean.com',
    provider: 'statuspage'
  },
  {
    slug: 'discord',
    name: 'Discord',
    url: 'https://discordstatus.com',
    site: 'discord.com',
    provider: 'statuspage'
  },
  {
    slug: 'docker',
    name: 'Docker',
    url: 'https://www.dockerstatus.com',
    site: 'docker.com',
    provider: 'statuspage'
  },
  {
    slug: 'dropbox',
    name: 'Dropbox',
    url: 'https://status.dropbox.com',
    site: 'dropbox.com',
    provider: 'statuspage'
  },
  {
    slug: 'elastic',
    name: 'Elastic',
    url: 'https://status.elastic.co',
    site: 'elastic.co',
    provider: 'statuspage'
  },
  {
    slug: 'figma',
    name: 'Figma',
    url: 'https://status.figma.com',
    site: 'figma.com',
    provider: 'statuspage'
  },
  {
    slug: 'fly',
    name: 'Fly.io',
    url: 'https://status.flyio.net',
    site: 'fly.io',
    provider: 'statuspage'
  },
  {
    slug: 'ghost',
    name: 'Ghost',
    url: 'https://status.ghost.org',
    site: 'ghost.org',
    provider: 'feed'
  },
  {
    slug: 'github',
    name: 'GitHub',
    url: 'https://www.githubstatus.com',
    site: 'github.com',
    provider: 'statuspage'
  },
  {
    slug: 'gcp',
    name: 'Google Cloud',
    url: 'https://status.cloud.google.com',
    site: 'cloud.google.com',
    provider: 'googlecloud'
  },
  {
    slug: 'grafana',
    name: 'Grafana Cloud',
    url: 'https://status.grafana.com',
    site: 'grafana.com',
    provider: 'statuspage'
  },
  {
    slug: 'heroku',
    name: 'Heroku',
    url: 'https://status.heroku.com',
    site: 'heroku.com',
    provider: 'feed'
  },
  {
    slug: 'hetzner',
    name: 'Hetzner',
    url: 'https://status.hetzner.com',
    site: 'hetzner.com',
    provider: 'feed'
  },
  {
    slug: 'hubspot',
    name: 'HubSpot',
    url: 'https://status.hubspot.com',
    site: 'hubspot.com',
    provider: 'statuspage'
  },
  {
    slug: 'intercom',
    name: 'Intercom',
    url: 'https://www.intercomstatus.com',
    site: 'intercom.com',
    provider: 'feed'
  },
  {
    slug: 'linear',
    name: 'Linear',
    url: 'https://linearstatus.com',
    site: 'linear.app',
    provider: 'statuspage'
  },
  {
    slug: 'mongodb',
    name: 'MongoDB',
    url: 'https://status.mongodb.com',
    site: 'mongodb.com',
    provider: 'statuspage'
  },
  {
    slug: 'monzo',
    name: 'Monzo',
    url: 'https://status.monzo.com',
    site: 'monzo.com',
    provider: 'statuspage'
  },
  {
    slug: 'netlify',
    name: 'Netlify',
    url: 'https://www.netlifystatus.com',
    site: 'netlify.com',
    provider: 'statuspage'
  },
  {
    slug: 'newrelic',
    name: 'New Relic',
    url: 'https://status.newrelic.com',
    site: 'newrelic.com',
    provider: 'statuspage'
  },
  {
    slug: 'notion',
    name: 'Notion',
    url: 'https://status.notion.so',
    site: 'notion.so',
    provider: 'feed'
  },
  {
    slug: 'npm',
    name: 'npm',
    url: 'https://status.npmjs.org',
    site: 'npmjs.com',
    provider: 'statuspage'
  },
  {
    slug: 'openai',
    name: 'OpenAI',
    url: 'https://status.openai.com',
    site: 'openai.com',
    provider: 'statuspage'
  },
  {
    slug: 'paypal',
    name: 'PayPal',
    url: 'https://www.paypal-status.com',
    site: 'paypal.com',
    provider: 'feed'
  },
  {
    slug: 'planetscale',
    name: 'PlanetScale',
    url: 'https://www.planetscalestatus.com',
    site: 'planetscale.com',
    provider: 'statuspage'
  },
  {
    slug: 'pypi',
    name: 'PyPI',
    url: 'https://status.python.org',
    site: 'pypi.org',
    provider: 'statuspage'
  },
  {
    slug: 'reddit',
    name: 'Reddit',
    url: 'https://www.redditstatus.com',
    site: 'reddit.com',
    provider: 'statuspage'
  },
  {
    slug: 'render',
    name: 'Render',
    url: 'https://status.render.com',
    site: 'render.com',
    provider: 'statuspage'
  },
  {
    slug: 'scaleway',
    name: 'Scaleway',
    url: 'https://status.scaleway.com',
    site: 'scaleway.com',
    provider: 'statuspage'
  },
  {
    slug: 'segment',
    name: 'Segment',
    url: 'https://status.segment.com',
    site: 'segment.com',
    provider: 'statuspage'
  },
  {
    slug: 'sentry',
    name: 'Sentry',
    url: 'https://status.sentry.io',
    site: 'sentry.io',
    provider: 'statuspage'
  },
  {
    slug: 'shopify',
    name: 'Shopify',
    url: 'https://www.shopifystatus.com',
    site: 'shopify.com',
    provider: 'statuspage'
  },
  {
    slug: 'snowflake',
    name: 'Snowflake',
    url: 'https://status.snowflake.com',
    site: 'snowflake.com',
    provider: 'statuspage'
  },
  {
    slug: 'squarespace',
    name: 'Squarespace',
    url: 'https://status.squarespace.com',
    site: 'squarespace.com',
    provider: 'statuspage'
  },
  {
    slug: 'stripe',
    name: 'Stripe',
    url: 'https://status.stripe.com',
    site: 'stripe.com',
    provider: 'feed'
  },
  {
    slug: 'supabase',
    name: 'Supabase',
    url: 'https://status.supabase.com',
    site: 'supabase.com',
    provider: 'statuspage'
  },
  {
    slug: 'tailscale',
    name: 'Tailscale',
    url: 'https://status.tailscale.com',
    site: 'tailscale.com',
    provider: 'statuspage'
  },
  {
    slug: 'trello',
    name: 'Trello',
    url: 'https://trello.status.atlassian.com',
    site: 'trello.com',
    provider: 'statuspage'
  },
  {
    slug: 'twilio',
    name: 'Twilio',
    url: 'https://status.twilio.com',
    site: 'twilio.com',
    provider: 'statuspage'
  },
  {
    slug: 'twitch',
    name: 'Twitch',
    url: 'https://status.twitch.com',
    site: 'twitch.tv',
    provider: 'statuspage'
  },
  {
    slug: 'upstash',
    name: 'Upstash',
    url: 'https://status.upstash.com',
    site: 'upstash.com',
    provider: 'statuspage'
  },
  {
    slug: 'vercel',
    name: 'Vercel',
    url: 'https://www.vercel-status.com',
    site: 'vercel.com',
    provider: 'statuspage'
  },
  {
    slug: 'wise',
    name: 'Wise',
    url: 'https://status.wise.com',
    site: 'wise.com',
    provider: 'statuspage'
  },
  {
    slug: 'zoom',
    name: 'Zoom',
    url: 'https://status.zoom.us',
    site: 'zoom.us',
    provider: 'statuspage'
  }
];

export const BY_SLUG = new Map(CATALOGUE.map((entry) => [entry.slug, entry]));

export const BY_HOST = new Map(CATALOGUE.map((entry) => [new URL(entry.url).host, entry]));
