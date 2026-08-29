<script lang="ts">
  import ServiceIcon from './ServiceIcon.svelte';
  import { CATALOGUE } from '$lib/catalogue';
  import { MAX_SERVICES, normaliseUrl, tokenFor } from '$lib/token';
  import { stationCode } from '$lib/format';

  interface Props {
    icons: string;
    problem?: string;
  }

  let { icons, problem }: Props = $props();

  let filter = $state('');
  let picked = $state<string[]>([]);
  let pasted = $state<string[]>([]);
  let typed = $state('');

  let shown = $derived(
    CATALOGUE.filter((entry) => entry.name.toLowerCase().includes(filter.trim().toLowerCase()))
  );
  let sections = $derived(
    [...Map.groupBy(shown, (entry) => entry.group)].map(([group, entries]) => ({ group, entries }))
  );
  // Tokens, not URLs - pasting a service you already ticked is the same service.
  let taken = $derived(new Set([...picked, ...pasted.map((url) => tokenFor(url) ?? url)]));
  let locked = $derived(taken.size >= MAX_SERVICES);
  let typedUrl = $derived(normaliseUrl(typed));
  /** An address left in the box still gets submitted, as long as it is new and there is room. */
  let carried = $derived(
    typedUrl && !locked && !taken.has(tokenFor(typedUrl) ?? typedUrl) ? typedUrl : null
  );
  let chosen = $derived(taken.size + (carried ? 1 : 0));
  let full = $derived(chosen >= MAX_SERVICES);

  function toggle(slug: string, on: boolean) {
    picked = on ? [...picked, slug] : picked.filter((one) => one !== slug);
  }

  function add() {
    if (!carried) return;
    pasted = [...pasted, carried];
    typed = '';
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

    <div class="field">
      <label class="stamp" for="paste">Or paste a status page</label>
      <div class="paste">
        <input
          id="paste"
          type="text"
          inputmode="url"
          bind:value={typed}
          placeholder="https://status.example.com"
          onkeydown={(event) => {
            if (event.key !== 'Enter' || !typed.trim()) return;
            event.preventDefault();
            add();
          }}
        />
        <button type="button" class="add" onclick={add} disabled={!carried}>Add</button>
      </div>
    </div>
  </div>

  {#if pasted.length}
    <ul class="pasted">
      {#each pasted as url (url)}
        <li>
          <input type="hidden" name="page" value={url} />
          <span class="mono">{url.replace(/^https?:\/\//, '')}</span>
          <button
            type="button"
            class="drop"
            aria-label="Remove {url}"
            onclick={() => (pasted = pasted.filter((one) => one !== url))}>&times;</button
          >
        </li>
      {/each}
    </ul>
  {/if}

  <div class="index">
    <p class="stamp">Station index · {CATALOGUE.length} confirmed answering</p>
    {#each sections as section (section.group)}
      <fieldset class="section">
        <legend class="stamp">{section.group} · {section.entries.length}</legend>
        <div class="stations">
          {#each section.entries as entry (entry.slug)}
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
          {/each}
        </div>
      </fieldset>
    {:else}
      <p class="empty">Nothing in the index matches that. Paste its address instead.</p>
    {/each}
  </div>

  {#if carried}
    <input type="hidden" name="page" value={carried} />
  {/if}

  <div class="go">
    <button type="submit">Build the board</button>
    <p class="stamp">
      {chosen} of {MAX_SERVICES} picked{full ? ' · that is the lot' : ''}
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
    border-radius: var(--radius);
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
  #paste {
    padding: var(--space-3);
    background: var(--surface-raised);
    border: var(--hairline) solid var(--rule-strong);
    border-radius: var(--radius);
    backdrop-filter: var(--blur);

    &::placeholder {
      color: var(--text-faint);
    }
  }

  .paste {
    display: flex;
    gap: var(--space-2);

    & input {
      flex: 1 1 auto;
      min-inline-size: 0;
    }
  }

  .add {
    flex: none;
    padding-inline: var(--space-4);
    background: var(--surface-raised);
    border: var(--hairline) solid var(--rule-strong);
    border-radius: var(--radius);
    backdrop-filter: var(--blur);
    color: var(--text);
    cursor: pointer;

    &:hover:not(:disabled) {
      background: var(--accent-quiet);
      border-color: var(--accent);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.45;
    }
  }

  .pasted {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;

    & li {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-1) var(--space-2);
      background: var(--accent-quiet);
      border: var(--hairline) solid var(--accent);
      font-size: 0.82rem;
    }
  }

  .drop {
    padding: 0 var(--space-1);
    background: none;
    border: 0;
    color: var(--text-muted);
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;

    &:hover {
      color: var(--text);
    }
  }

  .index {
    padding-block-start: var(--space-4);
    border-block-start: var(--hairline) solid var(--rule);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .section {
    margin: 0;
    padding: 0;
    border: 0;
    display: grid;
    gap: var(--space-2);

    & legend {
      padding-inline-end: var(--space-3);
      color: var(--text-muted);
    }
  }

  .stations {
    display: grid;
    gap: var(--space-1) var(--space-4);
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
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

  .go button {
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
