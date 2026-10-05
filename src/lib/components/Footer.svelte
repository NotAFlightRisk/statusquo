<script lang="ts">
  const REPO = 'https://github.com/NotAFlightRisk/statusquo';
  const PANELS = ['Self-host', 'Privacy', 'Terms'] as const;

  type Panel = (typeof PANELS)[number];

  const year = new Date().getFullYear();
  const analytics = Boolean(import.meta.env.PUBLIC_PLAUSIBLE_SCRIPT);
  const reporting = Boolean(import.meta.env.PUBLIC_SENTRY_DSN);

  let panel = $state<Panel | null>(null);
  let sheet = $state<HTMLDialogElement | null>(null);

  function open(name: Panel) {
    panel = name;
    sheet?.showModal();
  }
</script>

<footer class="site">
  <p class="legal">
    Licensed under <a href="{REPO}/blob/main/LICENSE" target="_blank" rel="noreferrer">MIT</a> © {year}
    <span class="dot" aria-hidden="true">•</span>
    <a href={REPO} target="_blank" rel="noreferrer">Source on GitHub</a>
  </p>

  <p class="docs">
    {#each PANELS as name, index (name)}
      {#if index > 0}<span class="dot" aria-hidden="true">•</span>{/if}
      <button onclick={() => open(name)}>{name}</button>
    {/each}
  </p>
</footer>

<dialog bind:this={sheet} aria-labelledby="sheet-title" onclose={() => (panel = null)}>
  <h2 id="sheet-title">{panel}</h2>

  {#if panel === 'Self-host'}
    <p>
      Docker's the quickest way. Pin the pages you care about and that set becomes the homepage:
    </p>
    <p class="run">
      <code
        >docker run -p 3000:3000 -e STATUSQUO_PAGES=github,cloudflare,npm notaflightrisk/statusquo</code
      >
    </p>
    <p>
      No database to set up, because there isn't one. The
      <a href="{REPO}#configuration" target="_blank" rel="noreferrer">readme</a> lists the rest of the
      settings, plus Cloudflare, Vercel and building from source.
    </p>
  {:else if panel === 'Privacy'}
    <p>
      We fetch the status pages you name and nothing else. No cookies, no accounts, no logging of
      who looked at what.
    </p>
    {#if analytics}
      <p>This site counts visits with Plausible, which is anonymous and doesn't use cookies.</p>
    {/if}
    {#if reporting}
      <p>
        If something breaks, it sends us the error so we can fix it, with your board's link stripped
        out first.
      </p>
    {/if}
    <p>
      Your board lives in its own URL rather than in a database, so there's nothing here to store or
      leak. Lose the link and it's gone, which is the trade.
    </p>
  {:else if panel === 'Terms'}
    <p>
      Free for anything, work included, under the <a
        href="{REPO}/blob/main/LICENSE"
        target="_blank"
        rel="noreferrer">MIT licence</a
      >. No warranty: it's a mirror of what other people publish, so don't hang a pager off it.
    </p>
    <p>
      The status data belongs to the providers who publish it, and their terms apply to it, not
      ours.
    </p>
  {/if}

  <form method="dialog"><button class="close">Close</button></form>
</dialog>

<style>
  .site {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--space-2) var(--space-5);
    margin-block-start: var(--space-7);
    padding-block: var(--space-4);
    border-block-start: var(--hairline) solid var(--rule);
    color: var(--text-muted);
    font-size: 0.8125rem;
  }

  .dot {
    padding-inline: var(--space-1);
    color: var(--rule-strong);
  }

  button {
    padding: 0;
    background: none;
    border: 0;
    color: inherit;
    font-size: inherit;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: var(--rule-strong);
    text-underline-offset: 0.18em;

    &:hover {
      color: var(--text);
    }
  }

  dialog {
    max-width: min(38rem, calc(100vw - 2 * var(--space-4)));
    padding: var(--space-5);
    background: var(--surface-raised);
    border-radius: var(--radius);
    box-shadow: var(--panel-shadow);
    backdrop-filter: var(--panel-blur);
    color: var(--text);
    border: var(--hairline) solid var(--rule-strong);

    &::backdrop {
      background: light-dark(rgb(26 26 20 / 0.4), rgb(0 0 0 / 0.6));
    }

    & p {
      margin-block-start: var(--space-3);
      max-width: var(--measure);
      font-size: 0.9rem;
      color: var(--text-muted);
    }
  }

  .run {
    padding: var(--space-3);
    background: var(--surface-sunk);
    border-radius: var(--radius);
    overflow-x: auto;

    & code {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      white-space: pre-wrap;
      color: var(--text);
    }
  }

  .close {
    margin-block-start: var(--space-4);
    padding: var(--space-2) var(--space-4);
    border: var(--hairline) solid var(--rule-strong);
    text-decoration: none;

    &:hover {
      background: var(--surface-sunk);
    }
  }
</style>
