<script lang="ts">
  import { LEVELS } from '$lib/status';
  import { heatmap } from '$lib/stats';
  import { coverageStart, tracePath, traceBands } from '$lib/trace';
  import type { Incident } from '$lib/types';

  interface Props {
    incidents: Incident[];
    days?: number;
    height?: number;
    now?: number;
  }

  let { incidents, days = 90, height = 40, now = Date.now() }: Props = $props();

  const WIDTH = 720;

  let cells = $derived(heatmap(incidents, days, now));
  let path = $derived(tracePath(cells, WIDTH, height));
  let bands = $derived(traceBands(cells, WIDTH));
  let troubled = $derived(cells.filter((cell) => cell.level !== 'operational' && cell.covered));
  let gap = $derived(coverageStart(cells));
  let blindDays = $derived(Math.round(gap * days));

  let summary = $derived.by(() => {
    const blind = blindDays ? `, the first ${blindDays} days unpublished` : '';
    const window = `Last ${days} days${blind}`;
    if (!troubled.length) return `${window}: a flat trace, no incidents recorded`;
    const worst = troubled.reduce((acc, cell) =>
      LEVELS[cell.level].severity > LEVELS[acc.level].severity ? cell : acc
    );
    const shape = troubled.length === 1 ? 'one spike' : `${troubled.length} spikes`;
    return `${window}: ${shape}, the tallest a ${LEVELS[worst.level].label.toLowerCase()} on ${worst.date}`;
  });
</script>

<svg
  class="trace"
  viewBox="0 0 {WIDTH} {height}"
  preserveAspectRatio="none"
  role="img"
  aria-label={summary}
>
  <line class="baseline" x1={gap * WIDTH} y1={height / 2} x2={WIDTH} y2={height / 2} />
  {#if gap > 0}
    <line class="blind" x1="0" y1={height / 2} x2={gap * WIDTH} y2={height / 2} />
  {/if}
  {#each bands as band (band.x)}
    <rect
      x={band.x}
      y="0"
      width={band.width}
      {height}
      fill="var(--level-{band.level})"
      opacity="0.16"
    />
  {/each}
  <path class="line" d={path} />
</svg>

<style>
  .trace {
    display: block;
    width: 100%;
    height: var(--trace-height, 40px);
    overflow: visible;
  }

  .baseline {
    stroke: var(--rule);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }

  .blind {
    stroke: var(--rule-strong);
    stroke-width: 1;
    stroke-dasharray: 2 4;
    vector-effect: non-scaling-stroke;
  }

  .line {
    fill: none;
    stroke: var(--text-muted);
    stroke-width: 1.1;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }
</style>
