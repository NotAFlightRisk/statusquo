<script lang="ts">
  import { stationCode } from '$lib/format';

  interface Props {
    src: string;
    name: string;
    slug: string;
    size?: number;
  }

  let { src, name, slug, size = 22 }: Props = $props();
  let failed = $state(false);
</script>

<span class="icon" style:--size="{size}px" aria-hidden="true">
  {#if failed}
    <span class="fallback mono">{stationCode(slug).slice(0, 2)}</span>
  {:else}
    <img {src} alt="" width={size} height={size} loading="lazy" onerror={() => (failed = true)} />
  {/if}
</span>
<span class="sr-only">{name}</span>

<style>
  .icon {
    display: grid;
    place-items: center;
    inline-size: var(--size);
    block-size: var(--size);
    flex: none;
  }

  /* plenty of brand marks are dark on transparent, so dark mode gives them a paper chip */
  img {
    inline-size: 100%;
    block-size: 100%;
    object-fit: contain;
    background: light-dark(transparent, #ece8dc);
    padding: light-dark(0, 1px);
    border-radius: 2px;
  }

  .fallback {
    display: grid;
    place-items: center;
    inline-size: 100%;
    block-size: 100%;
    font-size: calc(var(--size) * 0.42);
    font-weight: 600;
    color: var(--text-faint);
    background: var(--surface-sunk);
    border: var(--hairline) solid var(--rule);
    border-radius: var(--radius);
  }
</style>
