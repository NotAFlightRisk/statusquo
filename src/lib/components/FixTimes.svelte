<script lang="ts">
  import { minutesLabel } from '$lib/format';
  import type { ServiceStats } from '$lib/stats';

  let { rows }: { rows: ServiceStats[] } = $props();

  let timed = $derived(
    rows
      .filter((row): row is ServiceStats & { mttrMinutes: number } => row.mttrMinutes !== null)
      .sort((a, b) => b.mttrMinutes - a.mttrMinutes)
  );
  let slowest = $derived(Math.max(1, ...timed.map((row) => row.mttrMinutes)));
</script>

{#if timed.length}
  <ul class="times">
    {#each timed as row (row.service.token)}
      <li>
        <span class="name">{row.service.name}</span>
        <span class="track">
          <span class="fill" style:inline-size="{(row.mttrMinutes / slowest) * 100}%"></span>
        </span>
        <span class="mono value">{minutesLabel(row.mttrMinutes)}</span>
      </li>
    {/each}
  </ul>
  <p class="note">Mean time from raising an incident to marking it resolved.</p>
{:else}
  <p class="empty">
    None of these providers publish a resolved time, so there is nothing to average.
  </p>
{/if}

<style>
  .times {
    margin: 0;
    padding: 0;
    list-style: none;

    & li {
      display: grid;
      grid-template-columns: minmax(6rem, 9rem) 1fr auto;
      align-items: center;
      gap: var(--space-3);
      padding-block: var(--space-2);
      font-size: 0.86rem;
    }
  }

  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .track {
    display: block;
    block-size: 0.55rem;
    background: var(--surface-sunk);
  }

  .fill {
    display: block;
    block-size: 100%;
    background: var(--accent);
  }

  .value {
    font-variant-numeric: tabular-nums;
    color: var(--text-muted);
  }

  .note,
  .empty {
    margin-block-start: var(--space-3);
    max-width: var(--measure);
    font-size: 0.82rem;
    color: var(--text-muted);
  }
</style>
