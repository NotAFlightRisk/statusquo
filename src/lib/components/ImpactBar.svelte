<script lang="ts">
  import { LEVELS } from '$lib/status';
  import { tooltip } from '$lib/tooltip';
  import type { Level } from '$lib/types';

  let { mix }: { mix: { level: Level; count: number }[] } = $props();

  let total = $derived(mix.reduce((sum, slice) => sum + slice.count, 0));
</script>

{#if total}
  <div class="bar">
    {#each mix as slice (slice.level)}
      <span
        class="slice"
        style:background="var(--level-{slice.level})"
        style:flex-grow={slice.count}
        use:tooltip={`${LEVELS[slice.level].label} · ${slice.count} of ${total} · ${Math.round((slice.count / total) * 100)}%`}
      ></span>
    {/each}
  </div>

  <ul class="key">
    {#each mix as slice (slice.level)}
      <li>
        <span class="swatch" style:background="var(--level-{slice.level})"></span>
        <span class="name">{LEVELS[slice.level].label}</span>
        <span class="mono count">{slice.count}</span>
        <span class="mono share">{Math.round((slice.count / total) * 100)}%</span>
      </li>
    {/each}
  </ul>
{:else}
  <p class="empty">No incidents to break down.</p>
{/if}

<style>
  .bar {
    display: flex;
    height: 1.5rem;
    gap: 2px;
  }

  .slice {
    display: block;
  }

  .key {
    margin: var(--space-4) 0 0;
    padding: 0;
    list-style: none;

    & li {
      display: grid;
      grid-template-columns: auto 1fr auto auto;
      align-items: center;
      gap: var(--space-3);
      padding-block: var(--space-2);
      border-block-end: var(--hairline) solid var(--rule);
      font-size: 0.86rem;
    }
  }

  .swatch {
    inline-size: 0.7rem;
    block-size: 0.7rem;
  }

  .count,
  .share {
    font-variant-numeric: tabular-nums;
    color: var(--text-muted);
  }

  .share {
    min-inline-size: 3ch;
    text-align: end;
  }

  .empty {
    color: var(--text-muted);
  }
</style>
