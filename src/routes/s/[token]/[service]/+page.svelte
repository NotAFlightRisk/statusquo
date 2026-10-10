<script lang="ts">
  import BoardNav from '#lib/components/BoardNav.svelte';
  import IncidentItem from '#lib/components/IncidentItem.svelte';
  import MaintenanceItem from '#lib/components/MaintenanceItem.svelte';
  import Meta from '#lib/components/Meta.svelte';
  import MonthChart from '#lib/components/MonthChart.svelte';
  import ServiceIcon from '#lib/components/ServiceIcon.svelte';
  import StatusMark from '#lib/components/StatusMark.svelte';
  import Trace from '#lib/components/Trace.svelte';
  import { LEVELS, worst } from '#lib/status.js';
  import { daysSinceIncident, meanMinutes, upcoming } from '#lib/stats.js';
  import { minutesLabel, relative, stationCode } from '#lib/format.js';

  let { data } = $props();

  let base = $derived(`/s/${data.board.token}`);
  let service = $derived(data.service);
  let groups = $derived.by(() => {
    const map = new Map<string, typeof service.components>();
    for (const component of service.components) {
      const key = component.group ?? '';
      map.set(key, [...(map.get(key) ?? []), component]);
    }
    return [...map.entries()];
  });
  let ahead = $derived(upcoming(service.maintenances));
  let mttr = $derived(meanMinutes(service.incidents));
  let quiet = $derived(daysSinceIncident(service.incidents));
</script>

<Meta
  title="{service.name} status · {data.board.title}"
  description="{service.name} is {LEVELS[service.level].label.toLowerCase()}. Components, incident
    history and scheduled maintenance, read from {new URL(service.url).host}."
  feed="{base}/feed.xml"
  noindex
/>

<header class="intro">
  <p class="stamp"><a href={base}>← {data.board.title}</a></p>
  <div class="who">
    <ServiceIcon src={service.icon} name={service.name} slug={service.slug} size={40} />
    <div>
      <h1>{service.name}</h1>
      <p class="stamp">
        Station {stationCode(service.slug)} · read from
        <a href={service.url} target="_blank" rel="noreferrer">{new URL(service.url).host}</a>
        via {service.providerLabel}
      </p>
    </div>
  </div>
  <p class="state"><StatusMark level={service.level} size={34} label /></p>
  {#if service.summary}<p class="summary">{service.summary}</p>{/if}
  {#if service.error}<p class="warn" role="alert">{service.error}</p>{/if}
  {#if service.provider === 'feed'}
    <p class="warn">
      This provider only publishes a feed, so the current status is worked out from what is still
      open rather than read from an API. Treat it as a hint.
    </p>
  {/if}
</header>

<BoardNav {base} here="" />

<section class="panel" aria-labelledby="trace-title">
  <h2 id="trace-title">Last 90 days</h2>
  <Trace incidents={service.incidents} height={64} />
  <dl class="readout">
    <div>
      <dt>Incidents on record</dt>
      <dd class="mono">{service.incidents.length}</dd>
    </div>
    <div>
      <dt>Mean time to fix</dt>
      <dd class="mono">{mttr === null ? '—' : minutesLabel(mttr)}</dd>
    </div>
    <div>
      <dt>Quiet for</dt>
      <dd class="mono">{quiet === null ? '—' : `${quiet} days`}</dd>
    </div>
    <div>
      <dt>Components watched</dt>
      <dd class="mono">{service.components.length}</dd>
    </div>
  </dl>
</section>

{#if service.components.length}
  <section class="panel" aria-labelledby="components-title">
    <h2 id="components-title">Components</h2>
    {#each groups as [group, items] (group)}
      {#if group}<h3 class="group stamp">{group}</h3>{/if}
      <ul class="components">
        {#each items as component (component.id)}
          <li>
            <StatusMark level={component.level} size={20} />
            <span class="name">{component.name}</span>
            <span class="level">{LEVELS[component.level].short}</span>
          </li>
        {/each}
      </ul>
    {/each}
  </section>
{/if}

{#if ahead.length}
  <section class="panel" aria-labelledby="ahead-title">
    <h2 id="ahead-title">Coming up</h2>
    {#each ahead as entry (entry.id)}
      <MaintenanceItem {entry} detail />
    {/each}
  </section>
{/if}

<section class="panel" aria-labelledby="history-title">
  <h2 id="history-title">Incident history</h2>
  {#if service.incidents.length}
    <MonthChart incidents={service.incidents} />
    <div class="list">
      {#each service.incidents as incident (incident.id)}
        <IncidentItem {incident} detail />
      {/each}
    </div>
  {:else}
    <p class="empty">
      Nothing on record. {service.name} either publishes only what is currently broken, or has had a very
      good run.
    </p>
  {/if}
</section>

<style>
  .who {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding-block: var(--space-4) var(--space-3);
  }

  .state {
    padding-block-end: var(--space-2);
  }

  .summary {
    max-width: var(--measure);
    color: var(--text-muted);
  }

  .warn {
    margin-block-start: var(--space-3);
    padding: var(--space-3) var(--space-4);
    max-width: var(--measure);
    border: var(--hairline) solid var(--level-unknown);
    color: var(--text-muted);
    font-size: 0.88rem;
  }

  .readout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    gap: var(--space-4);
    margin: var(--space-5) 0 0;

    & dt {
      font-family: var(--font-mono);
      font-size: 0.66rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-faint);
    }

    & dd {
      margin: var(--space-1) 0 0;
      font-size: 1.1rem;
    }
  }

  .group {
    padding-block: var(--space-4) var(--space-2);
  }

  .components {
    margin: 0;
    padding: 0;
    list-style: none;

    & li {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: var(--space-3);
      padding-block: var(--space-2);
      border-block-end: var(--hairline) solid var(--rule);
      font-size: 0.9rem;
    }
  }

  .level {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-faint);
  }

  .list {
    padding-block-start: var(--space-5);
  }

  .empty {
    max-width: var(--measure);
    color: var(--text-muted);
  }
</style>
