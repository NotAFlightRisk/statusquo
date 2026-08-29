<script lang="ts">
  import { navigating } from '$app/state';

  /** Below this, the navigation lands before a bar would help and it just flickers. */
  const SETTLE_MS = 120;

  let busy = $state(false);

  $effect(() => {
    if (!navigating.to) {
      busy = false;
      return;
    }
    const timer = setTimeout(() => (busy = true), SETTLE_MS);
    return () => clearTimeout(timer);
  });
</script>

{#if busy}
  <div class="bar" role="progressbar" aria-label="Loading the next page"></div>
{/if}

<style>
  .bar {
    position: fixed;
    inset-block-start: 0;
    inset-inline: 0;
    z-index: 3;
    block-size: 2px;
    background: var(--accent-quiet);
    overflow: hidden;

    &::after {
      content: '';
      display: block;
      block-size: 100%;
      inline-size: 40%;
      background: var(--accent);
      animation: sweep 1.1s var(--ease) infinite;
    }
  }

  @keyframes sweep {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(350%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bar::after {
      inline-size: 100%;
      animation: none;
      opacity: 0.6;
    }
  }
</style>
