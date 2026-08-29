<script lang="ts">
  interface Props {
    base: string;
    here: string;
  }

  let { base, here }: Props = $props();

  let links = $derived([
    { key: 'board', href: base || '/', label: 'Board' },
    { key: 'incidents', href: `${base}/incidents`, label: 'Incidents' },
    { key: 'maintenance', href: `${base}/maintenance`, label: 'Maintenance' },
    { key: 'trends', href: `${base}/trends`, label: 'Trends' },
    { key: 'feed', href: `${base}/feed.xml`, label: 'RSS' }
  ]);
</script>

<nav aria-label="This board">
  {#each links as link (link.key)}
    <a href={link.href} aria-current={link.key === here ? 'page' : undefined}>{link.label}</a>
  {/each}
</nav>

<style>
  nav {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
    border-block: var(--hairline) solid var(--rule);
  }

  a {
    padding: var(--space-2) var(--space-3);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
    text-decoration: none;

    &:hover {
      color: var(--text);
      background: var(--surface-raised);
    }

    &[aria-current='page'] {
      color: var(--text);
      box-shadow: inset 0 -2px 0 var(--accent);
    }
  }
</style>
