<script lang="ts">
  import BoardView from '$lib/components/BoardView.svelte';
  import Builder from '$lib/components/Builder.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import { boardDescription } from '$lib/describe';

  let { data } = $props();
</script>

{#if data.board}
  <Meta
    title="{data.site.title} · status"
    description={boardDescription(data.board)}
    feed="/s/{data.board.token}/feed.xml"
  />
  <BoardView
    board={data.board}
    base="/s/{data.board.token}"
    refreshSeconds={data.site.refreshSeconds}
  />
{:else}
  <Meta
    title="statusquo · every status page you depend on, on one page"
    description="Combine GitHub, Cloudflare, npm and 50-odd other status pages into one dashboard
      and one RSS feed. No account, no database, the board lives in its own URL."
  />
  <Builder icons={data.icons} problem={data.problem ?? undefined} />
{/if}
