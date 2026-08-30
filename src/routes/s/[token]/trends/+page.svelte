<script lang="ts">
  import BoardNav from '$lib/components/BoardNav.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import MonthChart from '$lib/components/MonthChart.svelte';
  import ReadoutTable from '$lib/components/ReadoutTable.svelte';
  import ImpactBar from '$lib/components/ImpactBar.svelte';
  import FixTimes from '$lib/components/FixTimes.svelte';
  import { impactMix } from '$lib/stats';

  let { data } = $props();

  let base = $derived(`/s/${data.board.token}`);
  let mix = $derived(impactMix(data.incidents));
</script>

<Meta
  title="Trends · {data.board.title}"
  description="How often these providers break, how bad it gets and how long they take to fix it."
  feed="{base}/feed.xml"
  noindex
/>

<header class="intro">
  <h1>Trends</h1>
  <p>
    Worked out here from what each provider publishes. A provider that only keeps 25 incidents shows
    25, so treat these as a comparison between services rather than an absolute record.
  </p>
</header>

<BoardNav {base} here="trends" />

<section class="panel" aria-labelledby="record-title">
  <h2 id="record-title">The record</h2>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div class="scroller" tabindex="0" role="region" aria-labelledby="record-title">
    <ReadoutTable rows={data.stats} />
  </div>
</section>

<section class="panel" aria-labelledby="rate-title">
  <h2 id="rate-title">Incidents per month</h2>
  <MonthChart incidents={data.incidents} />
</section>

<div class="split">
  <section class="panel" aria-labelledby="mix-title">
    <h2 id="mix-title">How bad they get</h2>
    <ImpactBar {mix} />
  </section>

  <section class="panel" aria-labelledby="fix-title">
    <h2 id="fix-title">How long they take</h2>
    <FixTimes rows={data.stats} />
  </section>
</div>

<style>
  .intro {
    & p {
      margin-block-start: var(--space-2);
      max-width: var(--measure);
      color: var(--text-muted);
    }
  }

  .scroller {
    overflow-x: auto;
    overscroll-behavior-x: contain;
  }

  .split {
    display: grid;
    gap: var(--space-6);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  }
</style>
