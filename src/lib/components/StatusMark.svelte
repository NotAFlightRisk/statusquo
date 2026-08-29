<script lang="ts">
  import { LEVELS } from '$lib/status';
  import type { Level } from '$lib/types';

  interface Props {
    level: Level;
    size?: number;
    label?: boolean;
  }

  let { level, size = 26, label = false }: Props = $props();

  // Each level is a different trace shape, so colour is never doing the work alone.
  const PATHS: Record<Level, string> = {
    operational: 'M1 6H23',
    unknown: 'M1 6h3M8 6h3M15 6h3M22 6h1',
    maintenance: 'M1 6h6M7 2v8M17 2v8M17 6h6',
    degraded: 'M1 6q2.5-3 5 0t5 0 5 0 5 0 2 0',
    partial: 'M1 6h8l3-4.5 3 9 2-4.5h6',
    major: 'M1 6h5l2-5 2 10 2-9 2 8 2-4h6'
  };

  // The tick-and-cross set some themes ask for instead.
  const GLYPHS: Record<Level, string> = {
    operational: 'M4.5 12.5 10 18 19.5 6.5',
    unknown: 'M8.4 8.6a3.6 3.6 0 1 1 3.6 3.9V15M12 19.2h.01',
    maintenance: 'M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.8 4.6v4.2h-4.2',
    degraded: 'M12 4.5v9M12 18.4h.01',
    partial: 'M12 4 21.2 19.5H2.8zM12 10.2v3.6M12 16.9h.01',
    major: 'M6 6l12 12M18 6 6 18'
  };
</script>

<span class="mark" style:--level="var(--level-{level})" style:--size="{size}px">
  <svg class="trace" viewBox="0 0 24 12" width={size} height={size / 2} aria-hidden="true">
    <path
      d={PATHS[level]}
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <svg
    class="glyph"
    viewBox="0 0 24 24"
    width={size * 0.72}
    height={size * 0.72}
    aria-hidden="true"
  >
    <path
      d={GLYPHS[level]}
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  {#if label}
    <span class="label">{LEVELS[level].label}</span>
  {:else}
    <span class="sr-only">{LEVELS[level].label}</span>
  {/if}
</span>

<style>
  .mark {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--level);
  }

  svg {
    flex: none;
  }

  .trace {
    display: var(--mark-trace);
  }

  .glyph {
    display: var(--mark-glyph);
  }

  .label {
    font-size: 0.86rem;
    font-weight: 560;
    letter-spacing: -0.005em;
    white-space: nowrap;
  }
</style>
