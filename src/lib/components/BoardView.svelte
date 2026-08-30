<script lang="ts">
  import IncidentItem from './IncidentItem.svelte';
  import MaintenanceItem from './MaintenanceItem.svelte';
  import MonthChart from './MonthChart.svelte';
  import StationRow from './StationRow.svelte';
  import Verdict from './Verdict.svelte';
  import BoardNav from './BoardNav.svelte';
  import { allIncidents, allMaintenances } from '$lib/aggregate';
  import { livePoll } from '$lib/live.svelte';
  import { upcoming } from '$lib/stats';
  import type { Board } from '$lib/types';

  interface Props {
    board: Board;
    base: string;
    refreshSeconds: number;
  }

  let { board, base, refreshSeconds }: Props = $props();

  const SUMMARY = 5;

  let live = livePoll(
    () => board,
    () => refreshSeconds
  );
  let current = $derived(live.board);
  let incidents = $derived(allIncidents(current));
  let maintenances = $derived(upcoming(allMaintenances(current)));
</script>

<Verdict board={current} />
<BoardNav {base} here="board" />

<section class="drum panel" aria-labelledby="drum-title">
  <div class="head">
    <h2 id="drum-title">The network</h2>
    <p class="stamp">
      Last 90 days, today at the right edge{live.stale
        ? ' · refresh failed, showing the last read'
        : ''}
    </p>
  </div>
  {#each current.services as service (service.token)}
    <StationRow {service} href="{base}/{service.slug}" />
  {/each}
</section>

<div class="split">
  <section class="panel" aria-labelledby="incidents-title">
    <div class="head">
      <h2 id="incidents-title">Recent incidents</h2>
      {#if incidents.length > SUMMARY}
        <a class="stamp" href="{base}/incidents">All {incidents.length} →</a>
      {/if}
    </div>
    {#each incidents.slice(0, SUMMARY) as incident (incident.service.token + incident.id)}
      <IncidentItem {incident} service={incident.service} />
    {:else}
      <p class="empty">
        Nothing on record. Either it has been a good few months, or these providers only publish
        what is currently broken.
      </p>
    {/each}
  </section>

  <section class="panel" aria-labelledby="maintenance-title">
    <div class="head">
      <h2 id="maintenance-title">Coming up</h2>
      {#if maintenances.length > SUMMARY}
        <a class="stamp" href="{base}/maintenance">All {maintenances.length} →</a>
      {/if}
    </div>
    {#each maintenances.slice(0, SUMMARY) as entry (entry.service.token + entry.id)}
      <MaintenanceItem {entry} service={entry.service} />
    {:else}
      <p class="empty">No maintenance windows announced.</p>
    {/each}
  </section>
</div>

<section class="panel" aria-labelledby="trend-title">
  <div class="head">
    <h2 id="trend-title">The year in incidents</h2>
    <a class="stamp" href="{base}/trends">Full trends →</a>
  </div>
  <MonthChart {incidents} />
</section>

<style>
  .drum > .head {
    border-block-end-width: 2px;
  }

  .split {
    display: grid;
    gap: var(--space-6);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
  }

  .empty {
    padding-block: var(--space-4);
    max-width: var(--measure);
    color: var(--text-muted);
    font-size: 0.9rem;
  }
</style>
