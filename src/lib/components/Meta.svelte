<script lang="ts">
  import { page } from '$app/state';

  interface Props {
    title: string;
    description: string;
    feed?: string;
    noindex?: boolean;
  }

  let { title, description, feed, noindex = false }: Props = $props();

  let canonical = $derived(new URL(page.url.pathname, page.url.origin).href);
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  {#if feed}
    <link rel="alternate" type="application/rss+xml" title="{title} feed" href={feed} />
  {/if}
  {#if noindex}
    <meta name="robots" content="noindex, follow" />
  {/if}
</svelte:head>
