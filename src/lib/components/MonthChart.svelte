<script lang="ts">
  import { LEVELS, LEVEL_ORDER } from '#lib/status.js';
  import { tooltip } from '#lib/tooltip.js';
  import { byMonth } from '#lib/stats.js';
  import type { Incident, Level } from '#lib/types.js';

  interface Props {
    incidents: Incident[];
    months?: number;
  }

  let { incidents, months = 12 }: Props = $props();

  const HEIGHT = 150;

  let buckets = $derived(byMonth(incidents, months));
  let peak = $derived(Math.max(1, ...buckets.map((bucket) => bucket.total)));
  let levels = $derived(LEVEL_ORDER.filter((level) => level !== 'operational'));

  const breakdown = (counts: Partial<Record<Level, number>>) =>
    levels
      .filter((level) => counts[level])
      .map((level) => `${counts[level]} ${LEVELS[level].label.toLowerCase()}`)
      .join(', ');

  const readout = (bucket: (typeof buckets)[number]) =>
    `${bucket.month} · ${bucket.total} ${bucket.total === 1 ? 'incident' : 'incidents'}` +
    (bucket.total ? ` · ${breakdown(bucket.counts)}` : '');
</script>

<figure class="chart">
  <figcaption class="stamp">Incidents per month · tallest bar {peak}</figcaption>

  <div class="bars" style:--height="{HEIGHT}px">
    {#each buckets as bucket (bucket.month)}
      <button class="bar" type="button" aria-label={readout(bucket)} use:tooltip={readout(bucket)}>
        <span class="stack">
          {#each levels as level (level)}
            {#if bucket.counts[level]}
              <span
                class="slice"
                style:background="var(--level-{level})"
                style:height="{((bucket.counts[level] ?? 0) / peak) * HEIGHT}px"
              ></span>
            {/if}
          {/each}
        </span>
        <span class="stamp tick">{bucket.label}</span>
      </button>
    {/each}
  </div>
</figure>

<style>
  .chart {
    margin: 0;
  }

  figcaption {
    padding-block-end: var(--space-3);
    min-height: 1.4em;
  }

  .bars {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: var(--space-1);
    align-items: end;
    border-block-end: var(--hairline) solid var(--rule-strong);
  }

  .bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    padding: 0 0 var(--space-2);
    background: none;
    border: 0;
    cursor: default;

    &:hover .stack,
    &:focus-visible .stack {
      opacity: 0.75;
    }
  }

  .stack {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    width: 100%;
    height: var(--height);
    transition: opacity var(--step) var(--ease);
  }

  .slice {
    display: block;
    width: 100%;
    min-height: 2px;
  }

  .tick {
    font-size: 0.62rem;
  }
</style>
