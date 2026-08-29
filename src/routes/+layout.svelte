<script lang="ts">
  import '../app.css';
  import Footer from '$lib/components/Footer.svelte';
  import Loading from '$lib/components/Loading.svelte';
  import ThemePicker from '$lib/components/ThemePicker.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import Wordmark from '$lib/components/Wordmark.svelte';

  let { data, children } = $props();
</script>

<Loading />

<a class="skip" href="#main">Skip to the board</a>

<header class="site">
  <div class="page bar">
    <a class="home" href="/"><Wordmark title={data.site.title} /></a>
    <div class="looks">
      <ThemeToggle />
      <ThemePicker />
    </div>
  </div>
</header>

<main id="main" class="page">
  {@render children()}
</main>

<div class="page">
  <Footer />
</div>

<style>
  .skip {
    position: absolute;
    inset-block-start: var(--space-2);
    inset-inline-start: var(--space-2);
    padding: var(--space-2) var(--space-3);
    background: var(--surface-raised);
    border: var(--hairline) solid var(--rule-strong);
    border-radius: var(--radius);
    transform: translateY(-200%);

    &:focus {
      transform: none;
    }
  }

  .site {
    border-block-end: var(--hairline) solid var(--rule);
    background: color-mix(in srgb, var(--surface) 88%, transparent);
    backdrop-filter: blur(6px);
    position: sticky;
    inset-block-start: 0;
    z-index: 2;
  }

  .bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding-block: var(--space-3);
  }

  .home {
    text-decoration: none;
  }

  .looks {
    display: flex;
    align-items: stretch;
    gap: var(--space-2);
  }

  main {
    padding-block: var(--space-6);
    min-height: 60vh;
  }
</style>
