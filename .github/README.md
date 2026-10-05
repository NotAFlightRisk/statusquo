<h1 align="center">statusquo</h1>
<p align="center">
<i>Every status page you depend on, on one page</i>
<br />
<b>🌐 <a href="https://statusquo.peng.ly/">statusquo.peng.ly</a></b><br />
</p>

<details>
  <summary>Contents</summary>

- [About](#about)
- [Usage](#usage)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Adding a provider](#adding-a-provider)
- [Development](#development)

</details>

## About

Your app sits on GitHub, Cloudflare, npm and a payment provider, and checking whether any of them
is having a bad morning means eight tabs. statusquo reads all of them and puts the answer in one
place: what's broken now, what broke recently, and what's scheduled next.

It doesn't probe anything itself. It reads what each provider already publishes, so it's only ever
as good as they are, and it says so when a provider won't tell it anything.

Boards live in their own URL. There's no database, no account, and nothing to sign up for.

---

## Usage

Pick services from the index or paste any status page address, and you get a URL like:

```
https://statusquo.peng.ly/s/github,cloudflare,npm
```

Bookmark it, share it, or hand it to a feed reader as `.../feed.xml`. The URL is the whole
configuration, so you can edit it by hand.

Each board gives you the live network view, the full incident history with filters, the
maintenance calendar, and per-service pages with components and update threads.

Eight themes ship with it, and the one you're on rides along in the URL as `?theme=nord`, so a
board you hand someone turns up looking the way you left it. Pick one from the `...` button in the
header; it's remembered for next time. Light and dark are a separate switch, and both follow your
system until you tell them not to.

---

## Deployment

### Option 1: Cloudflare

It ships with `@sveltejs/adapter-cloudflare` and a `wrangler.jsonc`. Set `CLOUDFLARE_API_TOKEN`
and `CLOUDFLARE_ACCOUNT_ID`, point the route at your own hostname, then:

```shell
ADAPTER=cloudflare npm run build && npx wrangler deploy
```

### Option 2: Vercel

Fork the repo, import it in Vercel, and set `ADAPTER=vercel`.

[![1-Click Deploy to Vercel](https://img.shields.io/badge/Deploy-Vercel-ffffff?style=for-the-badge&logo=vercel&labelColor=1b2744&link=https%3A%2F%2Fstatusquo.peng.ly)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNotAFlightRisk%2Fstatusquo&demo-title=statusquo&demo-url=https%3A%2F%2Fstatusquo.peng.ly)

### Option 3: Docker

Multi-arch images on DockerHub ([`notaflightrisk/statusquo`](https://hub.docker.com/r/notaflightrisk/statusquo))
and GHCR ([`ghcr.io/notaflightrisk/statusquo`](https://github.com/NotAFlightRisk/statusquo/pkgs/container/statusquo)).
Most self-hosters want one fixed board as the homepage, which is one environment variable:

```shell
docker run -p 3000:3000 -e STATUSQUO_PAGES=github,cloudflare,npm notaflightrisk/statusquo
```

[![Deploy from Docker](https://img.shields.io/badge/Deploy-Docker-2496ED?style=for-the-badge&logo=docker&labelColor=1b2744&link=https%3A%2F%2Fstatusquo.peng.ly)](https://hub.docker.com/r/notaflightrisk/statusquo)

### Option 4: Build from source

Follow the [Development](#development) steps, then `ADAPTER=node npm run build`.<br>
That puts a Node server in `build/`, which you start with `node build`.

---

## Configuration

All optional. Copy `.env.example` if you'd rather use a file.

| Variable                    | Default            | What it does                                                                                                                  |
| --------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `STATUSQUO_PAGES`           | _(none)_           | Pin one board as the homepage. Catalogue slugs or full URLs, comma separated. Leave it unset and the homepage is the builder. |
| `STATUSQUO_TITLE`           | `statusquo`        | What to call the instance.                                                                                                    |
| `STATUSQUO_TAGLINE`         | _(a sensible one)_ | The line under the name.                                                                                                      |
| `STATUSQUO_PUBLIC`          | `true`             | Set `false` to hide the builder, so visitors only see the pinned board.                                                       |
| `STATUSQUO_REFRESH_SECONDS` | `60`               | How long a board is held at the edge, and how often an open page asks for a fresh one. Minimum 15.                            |
| `STATUSQUO_ICONS`           | DuckDuckGo         | Icon URL template. `{domain}` is replaced with the service's domain.                                                          |
| `PUBLIC_PLAUSIBLE_SCRIPT`   | _(none)_           | Your [Plausible](https://plausible.io/) script URL, to count visits. Read at build time, so set it before building.           |

A board is capped at 10 services, because each one costs up to three upstream requests and
Cloudflare Workers allows 50 per request.

---

## Adding a provider

Providers live in `src/lib/server/adapters/`. Each one exports a `load(base)` that returns the
shared shape, or `null` if it isn't the provider serving that page:

```ts
export const mything: Adapter = {
  id: 'mything',
  label: 'My Thing',
  async load(base) {
    const raw = await fetchJson<Summary>(at(base, '/api/status.json'));
    if (!raw?.components) return null;
    return {
      name: raw.title,
      level: 'operational',
      summary: '',
      components: [],
      incidents: [],
      maintenances: []
    };
  }
};
```

Add it to the list in `adapters/index.ts` and you're done. Five ship already: Atlassian
Statuspage (which incident.io mirrors exactly), Instatus, Cachet, Google Cloud, and a generic
RSS/Atom fallback that catches most of the rest.

---

## Development

You'll need [Node](https://nodejs.org/) 22 or newer, plus [Git](https://git-scm.com/). It's a
[SvelteKit](https://svelte.dev/docs/kit) app, so there's nothing else to install.

```bash
git clone git@github.com:NotAFlightRisk/statusquo.git
cd statusquo
npm install
npm run dev
```

The dev server is then on [localhost:5173](http://localhost:5173).<br>
The other scripts you'll want are `npm run check` (types), `npm test` (tests) and
`npm run preview` (serve a production build locally).

Or build the container with `docker build -t statusquo .`

---

<!-- License + Copyright -->
<p  align="center">
  <a href="https://github.com/NotAFlightRisk"><img width="64" src="https://pixelflare.cc/iain/gif/penguin-dance.gif" /></a><br>
  <sup>
    <i>Licensed under <a href="../LICENSE">MIT</a>, © <a href="https://peng.ly">NotAFlightRisk</a> 2026</i>
  </sup>
</p>

<!--
oooh, hello there! hope you're having a nice day :)
   |\__      |\___
 (:> __)X  (:o ___(
   |/        |/
-->
