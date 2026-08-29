<script lang="ts">
  import BoardNav from '$lib/components/BoardNav.svelte';
  import IncidentItem from '$lib/components/IncidentItem.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import MonthChart from '$lib/components/MonthChart.svelte';
  import { LEVELS, LEVEL_ORDER } from '$lib/status';

  let { data } = $props();

  let base = $derived(`/s/${data.board.token}`);
  let levels = $derived(LEVEL_ORDER.filter((level) => data.counts[level]));
  let last = $derived(data.from + data.incidents.length);

  const filterHref = (level: string | null) => `${base}/incidents${level ? `?level=${level}` : ''}`;

  const pageHref = (from: number) => {
    const query = new URLSearchParams();
    if (data.level) query.set('level', data.level);
    if (from) query.set('from', String(from));
    const suffix = query.toString();
    return `${base}/incidents${suffix ? `?${suffix}` : ''}`;
  };
</script>

<Meta
  title="Incident history · {data.board.title}"
  description="Every incident these providers have published, newest first."
  feed="{base}/feed.xml"
  noindex
/>

<header class="intro">
  <h1>Incident history</h1>
  <p>
    {data.total} on record across {data.board.services.length} services, newest first. Providers keep
    different amounts of history, so this is what they publish rather than everything that ever happened.
  </p>
</header>

<BoardNav {base} here="incidents" />

<div class="chart">
  <MonthChart incidents={data.chart} />
</div>

<nav class="filters" aria-label="Filter by impact">
  <a href={filterHref(null)} aria-current={data.level ? undefined : 'true'}>All {data.total}</a>
  {#each levels as level (level)}
    <a
      href={filterHref(level)}
      style:--level="var(--level-{level})"
      aria-current={data.level === level ? 'true' : undefined}
    >
      {LEVELS[level].label}
      {data.counts[level]}
    </a>
  {/each}
</nav>

<section>
  {#each data.incidents as incident (incident.service.token + incident.id)}
    <IncidentItem {incident} service={incident.service} />
  {:else}
    <p class="empty">Nothing matches that filter.</p>
  {/each}
</section>

{#if data.matching > data.perPage}
  <nav class="pager" aria-label="More incidents">
    {#if data.from > 0}
      <a href={pageHref(Math.max(0, data.from - data.perPage))}>← Newer</a>
    {/if}
    <p class="stamp">{data.from + 1}–{last} of {data.matching}</p>
    {#if last < data.matching}
      <a href={pageHref(data.from + data.perPage)}>Older →</a>
    {/if}
  </nav>
{/if}

<style>
  .intro {
    padding-block-end: var(--space-4);

    & p {
      margin-block-start: var(--space-2);
      max-width: var(--measure);
      color: var(--text-muted);
    }
  }

  .chart {
    padding-block: var(--space-6);
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    padding-block-end: var(--space-4);
    border-block-end: var(--hairline) solid var(--rule-strong);

    & a {
      padding: var(--space-2) var(--space-3);
      border: var(--hairline) solid var(--rule);
      border-radius: var(--radius);
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: 0.7rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      text-decoration: none;

      &:hover {
        border-color: var(--rule-strong);
        color: var(--text);
      }

      &[aria-current] {
        color: var(--level, var(--text));
        border-color: currentcolor;
      }
    }
  }

  .pager {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding-block: var(--space-5);

    & a {
      font-weight: 560;
    }
  }

  .empty {
    padding-block: var(--space-5);
    color: var(--text-muted);
  }
</style>
