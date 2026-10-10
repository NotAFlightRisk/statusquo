<script lang="ts">
  import { LEVELS } from '#lib/status.js';
  import type { Level } from '#lib/types.js';

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
</script>

<span class="mark" style:--level="var(--level-{level})" style:--size="{size}px">
  <svg viewBox="0 0 24 12" width={size} height={size / 2} aria-hidden="true">
    <path
      d={PATHS[level]}
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
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

  .label {
    font-size: 0.86rem;
    font-weight: 560;
    letter-spacing: -0.005em;
    white-space: nowrap;
  }
</style>
