<script lang="ts">
  import ServiceIcon from './ServiceIcon.svelte';
  import { dateLabel, relative } from '$lib/format';
  import type { Maintenance, ServiceRef } from '$lib/types';

  interface Props {
    entry: Maintenance;
    service?: ServiceRef;
    detail?: boolean;
  }

  let { entry, service, detail = false }: Props = $props();

  let starts = $derived(new Date(entry.startsAt).valueOf());
  let running = $derived(
    starts <= Date.now() && (!entry.endsAt || new Date(entry.endsAt).valueOf() > Date.now())
  );
</script>

<article class="entry">
  <p class="head">
    <span class="when mono" class:running>{relative(entry.startsAt)}</span>
    {#if service}
      <a class="who" href="/s/{service.token}">
        <ServiceIcon src={service.icon} name={service.name} slug={service.slug} size={16} />
        {service.name}
      </a>
    {/if}
    <span class="stamp"
      >{dateLabel(entry.startsAt)}{entry.endsAt ? ` → ${dateLabel(entry.endsAt)}` : ''}</span
    >
  </p>

  <h3>
    {#if entry.url}
      <a href={entry.url} target="_blank" rel="noreferrer">{entry.title}</a>
    {:else}
      {entry.title}
    {/if}
  </h3>

  {#if detail && entry.updates.length}
    <p class="body">{entry.updates[0].body}</p>
  {/if}
</article>

<style>
  .entry {
    padding-block: var(--space-4);
    border-block-end: var(--hairline) solid var(--rule);
  }

  .head {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-3);
  }

  .when {
    font-size: 0.78rem;
    padding: 2px var(--space-2);
    border: var(--hairline) solid var(--rule-strong);
    color: var(--text-muted);
  }

  .running {
    color: var(--level-maintenance);
    border-color: currentcolor;
  }

  .who {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: 0.86rem;
    font-weight: 560;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 0.2em;
    }
  }

  h3 {
    margin-block-start: var(--space-2);
    max-width: var(--measure);
    font-weight: 560;
  }

  .body {
    margin-block-start: var(--space-2);
    max-width: var(--measure);
    font-size: 0.88rem;
    color: var(--text-muted);
  }
</style>
