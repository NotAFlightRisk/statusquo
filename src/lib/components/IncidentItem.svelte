<script lang="ts">
  import ServiceIcon from './ServiceIcon.svelte';
  import StatusMark from './StatusMark.svelte';
  import { dateLabel, duration, relative } from '#lib/format.js';
  import type { Incident, ServiceRef } from '#lib/types.js';

  interface Props {
    incident: Incident;
    service?: ServiceRef;
    detail?: boolean;
  }

  let { incident, service, detail = false }: Props = $props();

  let span = $derived.by(() => {
    if (!incident.endedAt) return incident.resolved ? null : 'ongoing';
    const ms = new Date(incident.endedAt).valueOf() - new Date(incident.startedAt).valueOf();
    return ms > 0 ? `took ${duration(ms)}` : null;
  });
</script>

<article class="incident">
  <p class="head">
    <StatusMark level={incident.level} />
    {#if service}
      <a class="who" href="/s/{service.token}">
        <ServiceIcon src={service.icon} name={service.name} slug={service.slug} size={16} />
        {service.name}
      </a>
    {/if}
    <span class="stamp">
      <time datetime={incident.startedAt}>{relative(incident.startedAt)}</time>
      {#if span}
        · {span}{/if}
      {#if !incident.resolved}
        · open{/if}
    </span>
  </p>

  <h3>
    {#if incident.url}
      <a href={incident.url} target="_blank" rel="noreferrer">{incident.title}</a>
    {:else}
      {incident.title}
    {/if}
  </h3>

  {#if detail && incident.updates.length}
    <ol class="updates">
      {#each incident.updates as update, index (update.at + index)}
        <li>
          <p class="stamp">{update.status} · {dateLabel(update.at)}</p>
          <p class="body">{update.body}</p>
        </li>
      {/each}
    </ol>
  {:else if incident.updates.length}
    <p class="latest">{incident.updates[0].body}</p>
  {/if}
</article>

<style>
  .incident {
    padding-block: var(--space-4);
    border-block-end: var(--hairline) solid var(--rule);
  }

  .head {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-3);
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

    & a {
      text-decoration-color: var(--rule-strong);
    }
  }

  .latest,
  .body {
    margin-block-start: var(--space-2);
    max-width: var(--measure);
    font-size: 0.88rem;
    color: var(--text-muted);
  }

  .latest {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .updates {
    margin: var(--space-3) 0 0;
    padding: 0 0 0 var(--space-4);
    list-style: none;
    border-inline-start: var(--hairline) solid var(--rule);

    & li {
      padding-block: var(--space-2);
    }
  }
</style>
