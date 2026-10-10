<script lang="ts">
  import StatusMark from './StatusMark.svelte';
  import { LEVELS, isDown } from '#lib/status.js';
  import { relative } from '#lib/format.js';
  import type { Board } from '#lib/types.js';

  interface Props {
    board: Board;
  }

  let { board }: Props = $props();

  let troubled = $derived(board.services.filter((service) => isDown(service.level)));
  let unreadable = $derived(board.services.filter((service) => service.error));

  let headline = $derived.by(() => {
    const total = board.services.length;
    const noun = total === 1 ? 'station' : 'stations';
    if (troubled.length) {
      const names = troubled.map((service) => service.name);
      const list =
        names.length === 1
          ? names[0]
          : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
      return `${list} ${troubled.length === 1 ? 'is' : 'are'} having trouble`;
    }
    if (unreadable.length === total) return `Nothing readable across ${total} ${noun}`;
    return `All ${total} ${noun} running clean`;
  });
</script>

<div class="verdict">
  <StatusMark level={board.level} size={44} />
  <div>
    <h1>{headline}</h1>
    <p class="stamp">
      {LEVELS[board.level].label} · read {relative(board.fetchedAt)}
      {#if unreadable.length && unreadable.length < board.services.length}
        · {unreadable.length} unreadable
      {/if}
    </p>
  </div>
</div>

<style>
  .verdict {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  h1 {
    margin-block-end: var(--space-2);
  }
</style>
