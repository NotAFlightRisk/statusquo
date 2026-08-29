<script lang="ts">
  import { page } from '$app/state';
</script>

<svelte:head><title>{page.status} · statusquo</title></svelte:head>

<div class="wrap">
  <p class="mono code">{page.status}</p>
  <h1>{page.status === 404 ? 'Nothing on that address' : 'That did not work'}</h1>
  <p class="detail">{page.error?.message}</p>
  <p><a href="/">Start a new board</a></p>
</div>

<style>
  .wrap {
    padding-block: var(--space-7);
    max-width: var(--measure);
  }

  .code {
    font-size: 3rem;
    color: var(--rule-strong);
  }

  h1 {
    padding-block: var(--space-3);
  }

  .detail {
    padding-block-end: var(--space-4);
    color: var(--text-muted);
  }
</style>
