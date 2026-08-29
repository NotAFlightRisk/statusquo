<script lang="ts">
  import BoardNav from '$lib/components/BoardNav.svelte';
  import MaintenanceItem from '$lib/components/MaintenanceItem.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import { upcoming } from '$lib/stats';

  let { data } = $props();

  let base = $derived(`/s/${data.board.token}`);
  let ahead = $derived(upcoming(data.maintenances));
  let past = $derived(data.maintenances.filter((entry) => !ahead.includes(entry)).reverse());
</script>

<Meta
  title="Scheduled maintenance · {data.board.title}"
  description="Maintenance windows announced by these providers, soonest first."
  feed="{base}/feed.xml"
  noindex
/>

<header class="intro">
  <h1>Scheduled maintenance</h1>
  <p>{ahead.length} window{ahead.length === 1 ? '' : 's'} ahead, soonest first.</p>
</header>

<BoardNav {base} here="maintenance" />

<section aria-labelledby="ahead-title">
  <h2 id="ahead-title" class="stamp">Ahead</h2>
  {#each ahead as entry (entry.service.token + entry.id)}
    <MaintenanceItem {entry} service={entry.service} detail />
  {:else}
    <p class="empty">
      Nothing announced. Providers tend to give a few days' notice, so check back.
    </p>
  {/each}
</section>

{#if past.length}
  <section aria-labelledby="past-title">
    <h2 id="past-title" class="stamp">Already done</h2>
    {#each past as entry (entry.service.token + entry.id)}
      <MaintenanceItem {entry} service={entry.service} />
    {/each}
  </section>
{/if}

<style>
  .intro {
    padding-block-end: var(--space-4);

    & p {
      margin-block-start: var(--space-2);
      color: var(--text-muted);
    }
  }

  section {
    padding-block-start: var(--space-6);
  }

  h2 {
    padding-block-end: var(--space-3);
    border-block-end: var(--hairline) solid var(--rule-strong);
  }

  .empty {
    padding-block: var(--space-5);
    max-width: var(--measure);
    color: var(--text-muted);
  }
</style>
