<script lang="ts">
  import BoardView from '$lib/components/BoardView.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import { boardDescription, boardTitle } from '$lib/describe';

  let { data } = $props();
</script>

<Meta
  title={boardTitle(data.board)}
  description={boardDescription(data.board)}
  feed="/s/{data.board.token}/feed.xml"
  noindex
/>

<BoardView
  board={data.board}
  base="/s/{data.board.token}"
  refreshSeconds={data.site.refreshSeconds}
/>
