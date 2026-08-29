<script lang="ts">
  import ServiceIcon from './ServiceIcon.svelte';
  import { CATALOGUE } from '$lib/catalogue';
  import { MAX_SERVICES } from '$lib/token';
  import { stationCode } from '$lib/format';

  interface Props {
    icons: string;
    problem?: string;
  }

  let { icons, problem }: Props = $props();

  let filter = $state('');
  let picked = $state<string[]>([]);

  let shown = $derived(
    CATALOGUE.filter((entry) => entry.name.toLowerCase().includes(filter.trim().toLowerCase()))
  );
  let full = $derived(picked.length >= MAX_SERVICES);

  function toggle(slug: string, on: boolean) {
    picked = on ? [...picked, slug] : picked.filter((one) => one !== slug);
  }
</script>

<form class="builder" action="/go" method="GET">
  <div class="lede">
    <h1>Every status page you depend on, on one page</h1>
    <p>
      Pick the services you rely on, or paste any status page address. You get one URL back with the
      lot on it, plus an RSS feed. Nothing to sign up for, and nothing stored.
    </p>
  </div>

  {#if problem}
    <p class="problem" role="alert">{problem}</p>
  {/if}

  <div class="controls">
    <label class="field">
      <span class="stamp">Filter the index</span>
      <input type="search" bind:value={filter} placeholder="cloudflare, npm, stripe…" />
    </label>

    <label class="field">
      <span class="stamp">Or paste a status page</span>
      <input type="url" name="page" placeholder="https://status.example.com" />
    </label>
  </div>

  <fieldset class="index">
    <legend class="stamp">Station index · {CATALOGUE.length} confirmed answering</legend>
    {#each shown as entry (entry.slug)}
      <label class="station" class:disabled={full && !picked.includes(entry.slug)}>
        <input
          type="checkbox"
          name="page"
          value={entry.slug}
          checked={picked.includes(entry.slug)}
          disabled={full && !picked.includes(entry.slug)}
          onchange={(event) => toggle(entry.slug, event.currentTarget.checked)}
        />
        <ServiceIcon
          src={icons.replace('{domain}', entry.site)}
          name={entry.name}
          slug={entry.slug}
          size={18}
        />
        <span class="mono code">{stationCode(entry.slug)}</span>
        <span class="label">{entry.name}</span>
      </label>
    {:else}
      <p class="empty">Nothing in the index matches that. Paste its address instead.</p>
    {/each}
  </fieldset>

  <div class="go">
    <button type="submit">Build the board</button>
    <p class="stamp">
      {picked.length} of {MAX_SERVICES} picked{full ? ' · that is the lot' : ''}
    </p>
  </div>
</form>

<style>
  .builder {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .lede {
    max-width: var(--measure);

    & p {
      margin-block-start: var(--space-3);
      color: var(--text-muted);
    }
  }

  .problem {
    padding: var(--space-3) var(--space-4);
    border: var(--hairline) solid var(--level-partial);
    color: var(--level-partial);
    font-size: 0.9rem;
  }

  .controls {
    display: grid;
    gap: var(--space-4);
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  input[type='search'],
  input[type='url'] {
    padding: var(--space-3);
    background: var(--surface-raised);
    border: var(--hairline) solid var(--rule-strong);

    &::placeholder {
      color: var(--text-faint);
    }
  }

  .index {
    margin: 0;
    padding: var(--space-4) 0 0;
    border: 0;
    border-block-start: var(--hairline) solid var(--rule);
    display: grid;
    gap: var(--space-1) var(--space-4);
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));

    & legend {
      padding-inline-end: var(--space-3);
    }
  }

  .station {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2);
    cursor: pointer;
    border-block-end: var(--hairline) solid transparent;

    &:hover {
      background: var(--surface-raised);
    }

    &:has(:checked) {
      background: var(--accent-quiet);
      border-block-end-color: var(--accent);
    }

    &:has(:focus-visible) {
      outline: 2px solid var(--focus);
      outline-offset: -2px;
    }
  }

  .disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  input[type='checkbox'] {
    flex: none;
    margin: 0;
  }

  .code {
    font-size: 0.68rem;
    letter-spacing: 0.09em;
    color: var(--text-faint);
  }

  .label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.92rem;
  }

  .empty {
    grid-column: 1 / -1;
    color: var(--text-muted);
  }

  .go {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    flex-wrap: wrap;
    padding-block-start: var(--space-4);
    border-block-start: var(--hairline) solid var(--rule);
  }

  button {
    padding: var(--space-3) var(--space-5);
    background: var(--text);
    color: var(--surface);
    border: 0;
    font-weight: 600;
    cursor: pointer;
    transition: opacity var(--step) var(--ease);

    &:hover {
      opacity: 0.86;
    }
  }
</style>
