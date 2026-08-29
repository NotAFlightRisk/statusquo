import type { CatalogueEntry } from './types';

/** Probed live, so every entry is known to answer. Anything else can still be pasted as a URL. */
export const CATALOGUE: CatalogueEntry[] = [
  {
    slug: 'assemblyai',
    name: 'AssemblyAI',
    url: 'https://status.assemblyai.com',
    site: 'assemblyai.com',
    group: 'AI',
    provider: 'statuspage'
  },
  {
    slug: 'baseten',
    name: 'Baseten',
    url: 'https://status.baseten.co',
    site: 'baseten.co',
    group: 'AI',
    provider: 'statuspage'
  },
  {
    slug: 'anthropic',
    name: 'Claude',
    url: 'https://status.claude.com',
    site: 'claude.com',
    group: 'AI',
    provider: 'statuspage'
  },
  {
    slug: 'cohere',
    name: 'Cohere',
    url: 'https://status.cohere.com',
    site: 'cohere.com',
    group: 'AI',
    provider: 'statuspage'
  },
  {
    slug: 'cursor',
    name: 'Cursor',
    url: 'https://status.cursor.com',
    site: 'cursor.com',
    group: 'AI',
    provider: 'statuspage'
  },
  {
    slug: 'deepgram',
    name: 'Deepgram',
    url: 'https://status.deepgram.com',
    site: 'deepgram.com',
    group: 'AI',
    provider: 'statuspage'
  },
  {
    slug: 'elevenlabs',
    name: 'ElevenLabs',
    url: 'https://status.elevenlabs.io',
    site: 'elevenlabs.io',
    group: 'AI',
    provider: 'statuspage'
  },
  {
    slug: 'fireworks',
    name: 'Fireworks AI',
    url: 'https://status.fireworks.ai',
    site: 'fireworks.ai',
    group: 'AI',
    provider: 'statuspage'
  },
  {
    slug: 'groq',
    name: 'Groq',
    url: 'https://groqstatus.com',
    site: 'groq.com',
    group: 'AI',
    provider: 'statuspage'
  },
  {
    slug: 'huggingface',
    name: 'Hugging Face',
    url: 'https://status.huggingface.co',
    site: 'huggingface.co',
    group: 'AI',
    provider: 'feed'
  },
  {
    slug: 'langsmith',
    name: 'LangSmith',
    url: 'https://status.smith.langchain.com',
    site: 'langchain.com',
    group: 'AI',
    provider: 'feed'
  },
  {
    slug: 'mistral',
    name: 'Mistral AI',
    url: 'https://status.mistral.ai',
    site: 'mistral.ai',
    group: 'AI',
    provider: 'feed'
  },
  {
    slug: 'modal',
    name: 'Modal',
    url: 'https://status.modal.com',
    site: 'modal.com',
    group: 'AI',
    provider: 'feed'
  },
  {
    slug: 'openai',
    name: 'OpenAI',
    url: 'https://status.openai.com',
    site: 'openai.com',
    group: 'AI',
    provider: 'statuspage'
  },
  {
    slug: 'openrouter',
    name: 'OpenRouter',
    url: 'https://status.openrouter.ai',
    site: 'openrouter.ai',
    group: 'AI',
    provider: 'feed'
  },
  {
    slug: 'perplexity',
    name: 'Perplexity',
    url: 'https://status.perplexity.com',
    site: 'perplexity.ai',
    group: 'AI',
    provider: 'instatus'
  },
  {
    slug: 'pinecone',
    name: 'Pinecone',
    url: 'https://status.pinecone.io',
    site: 'pinecone.io',
    group: 'AI',
    provider: 'statuspage'
  },
  {
    slug: 'qdrant',
    name: 'Qdrant Cloud',
    url: 'https://status.qdrant.io',
    site: 'qdrant.tech',
    group: 'AI',
    provider: 'feed'
  },
  {
    slug: 'replicate',
    name: 'Replicate',
    url: 'https://replicatestatus.com',
    site: 'replicate.com',
    group: 'AI',
    provider: 'statuspage'
  },
  {
    slug: 'together',
    name: 'Together AI',
    url: 'https://status.together.ai',
    site: 'together.ai',
    group: 'AI',
    provider: 'feed'
  },
  {
    slug: 'atlassian',
    name: 'Atlassian',
    url: 'https://status.atlassian.com',
    site: 'atlassian.com',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'statuspage',
    name: 'Atlassian Statuspage',
    url: 'https://metastatuspage.com',
    site: 'statuspage.io',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'bitbucket',
    name: 'Bitbucket',
    url: 'https://bitbucket.status.atlassian.com',
    site: 'bitbucket.org',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'buildkite',
    name: 'Buildkite',
    url: 'https://www.buildkitestatus.com',
    site: 'buildkite.com',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'circleci',
    name: 'CircleCI',
    url: 'https://status.circleci.com',
    site: 'circleci.com',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'crates',
    name: 'crates.io',
    url: 'https://status.crates.io',
    site: 'crates.io',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'deno',
    name: 'Deno',
    url: 'https://denostatus.com',
    site: 'deno.com',
    group: 'Developer tools',
    provider: 'instatus'
  },
  {
    slug: 'docker',
    name: 'Docker',
    url: 'https://www.dockerstatus.com',
    site: 'docker.com',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'expo',
    name: 'Expo',
    url: 'https://status.expo.dev',
    site: 'expo.dev',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'github',
    name: 'GitHub',
    url: 'https://www.githubstatus.com',
    site: 'github.com',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'hashicorp',
    name: 'HashiCorp',
    url: 'https://status.hashicorp.com',
    site: 'hashicorp.com',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'jfrog',
    name: 'JFrog',
    url: 'https://status.jfrog.io',
    site: 'jfrog.com',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'npm',
    name: 'npm',
    url: 'https://status.npmjs.org',
    site: 'npmjs.com',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'gitpod',
    name: 'Ona (Gitpod)',
    url: 'https://www.gitpodstatus.com',
    site: 'ona.com',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'postman',
    name: 'Postman',
    url: 'https://status.postman.com',
    site: 'postman.com',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'pulumi',
    name: 'Pulumi',
    url: 'https://status.pulumi.com',
    site: 'pulumi.com',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'pypi',
    name: 'PyPI',
    url: 'https://status.python.org',
    site: 'pypi.org',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'replit',
    name: 'Replit',
    url: 'https://status.replit.com',
    site: 'replit.com',
    group: 'Developer tools',
    provider: 'feed'
  },
  {
    slug: 'rubygems',
    name: 'RubyGems',
    url: 'https://status.rubygems.org',
    site: 'rubygems.org',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'sonatype',
    name: 'Sonatype',
    url: 'https://status.sonatype.com',
    site: 'sonatype.com',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'sourcegraph',
    name: 'Sourcegraph',
    url: 'https://sourcegraphstatus.com',
    site: 'sourcegraph.com',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'travisci',
    name: 'Travis CI',
    url: 'https://www.traviscistatus.com',
    site: 'travis-ci.com',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'trello',
    name: 'Trello',
    url: 'https://trello.status.atlassian.com',
    site: 'trello.com',
    group: 'Developer tools',
    provider: 'statuspage'
  },
  {
    slug: 'akamai',
    name: 'Akamai',
    url: 'https://www.akamaistatus.com',
    site: 'akamai.com',
    group: 'Hosting',
    provider: 'statuspage'
  },
  {
    slug: 'linode',
    name: 'Akamai Linode',
    url: 'https://status.linode.com',
    site: 'linode.com',
    group: 'Hosting',
    provider: 'statuspage'
  },
  {
    slug: 'bunny',
    name: 'Bunny.net',
    url: 'https://status.bunny.net',
    site: 'bunny.net',
    group: 'Hosting',
    provider: 'statuspage'
  },
  {
    slug: 'cloudflare',
    name: 'Cloudflare',
    url: 'https://www.cloudflarestatus.com',
    site: 'cloudflare.com',
    group: 'Hosting',
    provider: 'statuspage'
  },
  {
    slug: 'digitalocean',
    name: 'DigitalOcean',
    url: 'https://status.digitalocean.com',
    site: 'digitalocean.com',
    group: 'Hosting',
    provider: 'statuspage'
  },
  {
    slug: 'firebase',
    name: 'Firebase',
    url: 'https://status.firebase.google.com',
    site: 'firebase.google.com',
    group: 'Hosting',
    provider: 'googlecloud'
  },
  {
    slug: 'fly',
    name: 'Fly.io',
    url: 'https://status.flyio.net',
    site: 'fly.io',
    group: 'Hosting',
    provider: 'statuspage'
  },
  {
    slug: 'gcp',
    name: 'Google Cloud',
    url: 'https://status.cloud.google.com',
    site: 'cloud.google.com',
    group: 'Hosting',
    provider: 'googlecloud'
  },
  {
    slug: 'heroku',
    name: 'Heroku',
    url: 'https://status.heroku.com',
    site: 'heroku.com',
    group: 'Hosting',
    provider: 'feed'
  },
  {
    slug: 'hetzner',
    name: 'Hetzner',
    url: 'https://status.hetzner.com',
    site: 'hetzner.com',
    group: 'Hosting',
    provider: 'feed'
  },
  {
    slug: 'koyeb',
    name: 'Koyeb',
    url: 'https://status.koyeb.com',
    site: 'koyeb.com',
    group: 'Hosting',
    provider: 'instatus'
  },
  {
    slug: 'netlify',
    name: 'Netlify',
    url: 'https://www.netlifystatus.com',
    site: 'netlify.com',
    group: 'Hosting',
    provider: 'statuspage'
  },
  {
    slug: 'oracle-cloud',
    name: 'Oracle Cloud',
    url: 'https://ocistatus.oraclecloud.com',
    site: 'oracle.com',
    group: 'Hosting',
    provider: 'feed'
  },
  {
    slug: 'render',
    name: 'Render',
    url: 'https://status.render.com',
    site: 'render.com',
    group: 'Hosting',
    provider: 'statuspage'
  },
  {
    slug: 'scaleway',
    name: 'Scaleway',
    url: 'https://status.scaleway.com',
    site: 'scaleway.com',
    group: 'Hosting',
    provider: 'statuspage'
  },
  {
    slug: 'upcloud',
    name: 'UpCloud',
    url: 'https://status.upcloud.com',
    site: 'upcloud.com',
    group: 'Hosting',
    provider: 'statuspage'
  },
  {
    slug: 'vercel',
    name: 'Vercel',
    url: 'https://www.vercel-status.com',
    site: 'vercel.com',
    group: 'Hosting',
    provider: 'statuspage'
  },
  {
    slug: 'appwrite',
    name: 'Appwrite',
    url: 'https://status.appwrite.online',
    site: 'appwrite.io',
    group: 'Data',
    provider: 'feed'
  },
  {
    slug: 'cockroach',
    name: 'CockroachDB Cloud',
    url: 'https://status.cockroachlabs.cloud',
    site: 'cockroachlabs.com',
    group: 'Data',
    provider: 'statuspage'
  },
  {
    slug: 'confluent',
    name: 'Confluent',
    url: 'https://status.confluent.cloud',
    site: 'confluent.io',
    group: 'Data',
    provider: 'statuspage'
  },
  {
    slug: 'contentful',
    name: 'Contentful',
    url: 'https://www.contentfulstatus.com',
    site: 'contentful.com',
    group: 'Data',
    provider: 'statuspage'
  },
  {
    slug: 'dbt',
    name: 'dbt Cloud',
    url: 'https://status.getdbt.com',
    site: 'getdbt.com',
    group: 'Data',
    provider: 'statuspage'
  },
  {
    slug: 'elastic',
    name: 'Elastic',
    url: 'https://status.elastic.co',
    site: 'elastic.co',
    group: 'Data',
    provider: 'statuspage'
  },
  {
    slug: 'meilisearch',
    name: 'Meilisearch',
    url: 'https://status.meilisearch.com',
    site: 'meilisearch.com',
    group: 'Data',
    provider: 'feed'
  },
  {
    slug: 'mongodb',
    name: 'MongoDB',
    url: 'https://status.mongodb.com',
    site: 'mongodb.com',
    group: 'Data',
    provider: 'statuspage'
  },
  {
    slug: 'planetscale',
    name: 'PlanetScale',
    url: 'https://www.planetscalestatus.com',
    site: 'planetscale.com',
    group: 'Data',
    provider: 'statuspage'
  },
  {
    slug: 'sanity',
    name: 'Sanity',
    url: 'https://www.sanity-status.com',
    site: 'sanity.io',
    group: 'Data',
    provider: 'statuspage'
  },
  {
    slug: 'snowflake',
    name: 'Snowflake',
    url: 'https://status.snowflake.com',
    site: 'snowflake.com',
    group: 'Data',
    provider: 'statuspage'
  },
  {
    slug: 'strapi',
    name: 'Strapi Cloud',
    url: 'https://status.strapi.io',
    site: 'strapi.io',
    group: 'Data',
    provider: 'feed'
  },
  {
    slug: 'supabase',
    name: 'Supabase',
    url: 'https://status.supabase.com',
    site: 'supabase.com',
    group: 'Data',
    provider: 'statuspage'
  },
  {
    slug: 'turso',
    name: 'Turso',
    url: 'https://status.turso.tech',
    site: 'turso.tech',
    group: 'Data',
    provider: 'feed'
  },
  {
    slug: 'upstash',
    name: 'Upstash',
    url: 'https://status.upstash.com',
    site: 'upstash.com',
    group: 'Data',
    provider: 'statuspage'
  },
  {
    slug: 'bugsnag',
    name: 'Bugsnag',
    url: 'https://status.bugsnag.com',
    site: 'bugsnag.com',
    group: 'Monitoring',
    provider: 'statuspage'
  },
  {
    slug: 'datadog',
    name: 'Datadog',
    url: 'https://status.datadoghq.com',
    site: 'datadoghq.com',
    group: 'Monitoring',
    provider: 'statuspage'
  },
  {
    slug: 'grafana',
    name: 'Grafana Cloud',
    url: 'https://status.grafana.com',
    site: 'grafana.com',
    group: 'Monitoring',
    provider: 'statuspage'
  },
  {
    slug: 'honeycomb',
    name: 'Honeycomb',
    url: 'https://status.honeycomb.io',
    site: 'honeycomb.io',
    group: 'Monitoring',
    provider: 'statuspage'
  },
  {
    slug: 'launchdarkly',
    name: 'LaunchDarkly',
    url: 'https://status.launchdarkly.com',
    site: 'launchdarkly.com',
    group: 'Monitoring',
    provider: 'statuspage'
  },
  {
    slug: 'newrelic',
    name: 'New Relic',
    url: 'https://status.newrelic.com',
    site: 'newrelic.com',
    group: 'Monitoring',
    provider: 'statuspage'
  },
  {
    slug: 'opsgenie',
    name: 'Opsgenie',
    url: 'https://status.opsgenie.com',
    site: 'opsgenie.com',
    group: 'Monitoring',
    provider: 'statuspage'
  },
  {
    slug: 'rollbar',
    name: 'Rollbar',
    url: 'https://status.rollbar.com',
    site: 'rollbar.com',
    group: 'Monitoring',
    provider: 'statuspage'
  },
  {
    slug: 'sentry',
    name: 'Sentry',
    url: 'https://status.sentry.io',
    site: 'sentry.io',
    group: 'Monitoring',
    provider: 'statuspage'
  },
  {
    slug: '1password',
    name: '1Password',
    url: 'https://status.1password.com',
    site: '1password.com',
    group: 'Security',
    provider: 'statuspage'
  },
  {
    slug: 'clerk',
    name: 'Clerk',
    url: 'https://status.clerk.com',
    site: 'clerk.com',
    group: 'Security',
    provider: 'statuspage'
  },
  {
    slug: 'duo',
    name: 'Duo Security',
    url: 'https://status.duo.com',
    site: 'duo.com',
    group: 'Security',
    provider: 'statuspage'
  },
  {
    slug: 'lastpass',
    name: 'LastPass',
    url: 'https://status.lastpass.com',
    site: 'lastpass.com',
    group: 'Security',
    provider: 'feed'
  },
  {
    slug: 'snyk',
    name: 'Snyk',
    url: 'https://status.snyk.io',
    site: 'snyk.io',
    group: 'Security',
    provider: 'statuspage'
  },
  {
    slug: 'stytch',
    name: 'Stytch',
    url: 'https://status.stytch.com',
    site: 'stytch.com',
    group: 'Security',
    provider: 'instatus'
  },
  {
    slug: 'tailscale',
    name: 'Tailscale',
    url: 'https://status.tailscale.com',
    site: 'tailscale.com',
    group: 'Security',
    provider: 'statuspage'
  },
  {
    slug: 'workos',
    name: 'WorkOS',
    url: 'https://status.workos.com',
    site: 'workos.com',
    group: 'Security',
    provider: 'statuspage'
  },
  {
    slug: 'coinbase',
    name: 'Coinbase',
    url: 'https://status.coinbase.com',
    site: 'coinbase.com',
    group: 'Payments',
    provider: 'statuspage'
  },
  {
    slug: 'kraken',
    name: 'Kraken',
    url: 'https://status.kraken.com',
    site: 'kraken.com',
    group: 'Payments',
    provider: 'statuspage'
  },
  {
    slug: 'mollie',
    name: 'Mollie',
    url: 'https://status.mollie.com',
    site: 'mollie.com',
    group: 'Payments',
    provider: 'instatus'
  },
  {
    slug: 'monzo',
    name: 'Monzo',
    url: 'https://status.monzo.com',
    site: 'monzo.com',
    group: 'Payments',
    provider: 'statuspage'
  },
  {
    slug: 'paddle',
    name: 'Paddle',
    url: 'https://status.paddle.com',
    site: 'paddle.com',
    group: 'Payments',
    provider: 'feed'
  },
  {
    slug: 'paypal',
    name: 'PayPal',
    url: 'https://www.paypal-status.com',
    site: 'paypal.com',
    group: 'Payments',
    provider: 'feed'
  },
  {
    slug: 'plaid',
    name: 'Plaid',
    url: 'https://status.plaid.com',
    site: 'plaid.com',
    group: 'Payments',
    provider: 'statuspage'
  },
  {
    slug: 'square',
    name: 'Square',
    url: 'https://www.issquareup.com',
    site: 'squareup.com',
    group: 'Payments',
    provider: 'statuspage'
  },
  {
    slug: 'stripe',
    name: 'Stripe',
    url: 'https://status.stripe.com',
    site: 'stripe.com',
    group: 'Payments',
    provider: 'feed'
  },
  {
    slug: 'wise',
    name: 'Wise',
    url: 'https://status.wise.com',
    site: 'wise.com',
    group: 'Payments',
    provider: 'statuspage'
  },
  {
    slug: 'ably',
    name: 'Ably',
    url: 'https://status.ably.com',
    site: 'ably.com',
    group: 'Messaging',
    provider: 'statuspage'
  },
  {
    slug: 'braze',
    name: 'Braze',
    url: 'https://status.braze.com',
    site: 'braze.com',
    group: 'Messaging',
    provider: 'statuspage'
  },
  {
    slug: 'discord',
    name: 'Discord',
    url: 'https://discordstatus.com',
    site: 'discord.com',
    group: 'Messaging',
    provider: 'statuspage'
  },
  {
    slug: 'intercom',
    name: 'Intercom',
    url: 'https://www.intercomstatus.com',
    site: 'intercom.com',
    group: 'Messaging',
    provider: 'feed'
  },
  {
    slug: 'livekit',
    name: 'LiveKit',
    url: 'https://status.livekit.io',
    site: 'livekit.io',
    group: 'Messaging',
    provider: 'statuspage'
  },
  {
    slug: 'mailgun',
    name: 'Mailgun',
    url: 'https://status.mailgun.com',
    site: 'mailgun.com',
    group: 'Messaging',
    provider: 'statuspage'
  },
  {
    slug: 'onesignal',
    name: 'OneSignal',
    url: 'https://status.onesignal.com',
    site: 'onesignal.com',
    group: 'Messaging',
    provider: 'statuspage'
  },
  {
    slug: 'pusher',
    name: 'Pusher',
    url: 'https://status.pusher.com',
    site: 'pusher.com',
    group: 'Messaging',
    provider: 'statuspage'
  },
  {
    slug: 'resend',
    name: 'Resend',
    url: 'https://resend-status.com',
    site: 'resend.com',
    group: 'Messaging',
    provider: 'statuspage'
  },
  {
    slug: 'twilio',
    name: 'Twilio',
    url: 'https://status.twilio.com',
    site: 'twilio.com',
    group: 'Messaging',
    provider: 'statuspage'
  },
  {
    slug: 'zoom',
    name: 'Zoom',
    url: 'https://status.zoom.us',
    site: 'zoom.us',
    group: 'Messaging',
    provider: 'statuspage'
  },
  {
    slug: 'airtable',
    name: 'Airtable',
    url: 'https://status.airtable.com',
    site: 'airtable.com',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'amplitude',
    name: 'Amplitude',
    url: 'https://status.amplitude.com',
    site: 'amplitude.com',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'box',
    name: 'Box',
    url: 'https://status.box.com',
    site: 'box.com',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'calendly',
    name: 'Calendly',
    url: 'https://www.calendlystatus.com',
    site: 'calendly.com',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'docusign',
    name: 'Docusign',
    url: 'https://status.docusign.com',
    site: 'docusign.com',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'dropbox',
    name: 'Dropbox',
    url: 'https://status.dropbox.com',
    site: 'dropbox.com',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'figma',
    name: 'Figma',
    url: 'https://status.figma.com',
    site: 'figma.com',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'hubspot',
    name: 'HubSpot',
    url: 'https://status.hubspot.com',
    site: 'hubspot.com',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'linear',
    name: 'Linear',
    url: 'https://linearstatus.com',
    site: 'linear.app',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'loom',
    name: 'Loom',
    url: 'https://status.loom.com',
    site: 'loom.com',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'miro',
    name: 'Miro',
    url: 'https://status.miro.com',
    site: 'miro.com',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'mixpanel',
    name: 'Mixpanel',
    url: 'https://www.mixpanelstatus.com',
    site: 'mixpanel.com',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'notion',
    name: 'Notion',
    url: 'https://status.notion.so',
    site: 'notion.so',
    group: 'Productivity',
    provider: 'feed'
  },
  {
    slug: 'okteto',
    name: 'Okteto',
    url: 'https://status.okteto.com',
    site: 'okteto.com',
    group: 'Productivity',
    provider: 'feed'
  },
  {
    slug: 'retool',
    name: 'Retool',
    url: 'https://status.retool.com',
    site: 'retool.com',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'segment',
    name: 'Segment',
    url: 'https://status.segment.com',
    site: 'segment.com',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'typeform',
    name: 'Typeform',
    url: 'https://status.typeform.com',
    site: 'typeform.com',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'zapier',
    name: 'Zapier',
    url: 'https://status.zapier.com',
    site: 'zapier.com',
    group: 'Productivity',
    provider: 'statuspage'
  },
  {
    slug: 'buffer',
    name: 'Buffer',
    url: 'https://status.buffer.com',
    site: 'buffer.com',
    group: 'Consumer',
    provider: 'statuspage'
  },
  {
    slug: 'canva',
    name: 'Canva',
    url: 'https://www.canvastatus.com',
    site: 'canva.com',
    group: 'Consumer',
    provider: 'statuspage'
  },
  {
    slug: 'cloudinary',
    name: 'Cloudinary',
    url: 'https://status.cloudinary.com',
    site: 'cloudinary.com',
    group: 'Consumer',
    provider: 'statuspage'
  },
  {
    slug: 'epicgames',
    name: 'Epic Games',
    url: 'https://status.epicgames.com',
    site: 'epicgames.com',
    group: 'Consumer',
    provider: 'statuspage'
  },
  {
    slug: 'ghost',
    name: 'Ghost',
    url: 'https://status.ghost.org',
    site: 'ghost.org',
    group: 'Consumer',
    provider: 'feed'
  },
  {
    slug: 'imgix',
    name: 'imgix',
    url: 'https://status.imgix.com',
    site: 'imgix.com',
    group: 'Consumer',
    provider: 'statuspage'
  },
  {
    slug: 'mux',
    name: 'Mux',
    url: 'https://status.mux.com',
    site: 'mux.com',
    group: 'Consumer',
    provider: 'statuspage'
  },
  {
    slug: 'reddit',
    name: 'Reddit',
    url: 'https://www.redditstatus.com',
    site: 'reddit.com',
    group: 'Consumer',
    provider: 'statuspage'
  },
  {
    slug: 'shopify',
    name: 'Shopify',
    url: 'https://www.shopifystatus.com',
    site: 'shopify.com',
    group: 'Consumer',
    provider: 'statuspage'
  },
  {
    slug: 'squarespace',
    name: 'Squarespace',
    url: 'https://status.squarespace.com',
    site: 'squarespace.com',
    group: 'Consumer',
    provider: 'statuspage'
  },
  {
    slug: 'twitch',
    name: 'Twitch',
    url: 'https://status.twitch.com',
    site: 'twitch.tv',
    group: 'Consumer',
    provider: 'statuspage'
  },
  {
    slug: 'vimeo',
    name: 'Vimeo',
    url: 'https://www.vimeostatus.com',
    site: 'vimeo.com',
    group: 'Consumer',
    provider: 'statuspage'
  },
  {
    slug: 'webflow',
    name: 'Webflow',
    url: 'https://status.webflow.com',
    site: 'webflow.com',
    group: 'Consumer',
    provider: 'statuspage'
  },
  {
    slug: 'wix',
    name: 'Wix',
    url: 'https://status.wix.com',
    site: 'wix.com',
    group: 'Consumer',
    provider: 'statuspage'
  }
];

export const BY_SLUG = new Map(CATALOGUE.map((entry) => [entry.slug, entry]));

export const BY_HOST = new Map(CATALOGUE.map((entry) => [new URL(entry.url).host, entry]));
