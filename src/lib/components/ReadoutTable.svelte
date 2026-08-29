<script lang="ts">
  import ServiceIcon from './ServiceIcon.svelte';
  import StatusMark from './StatusMark.svelte';
  import { minutesLabel, stationCode } from '$lib/format';
  import type { ServiceStats } from '$lib/stats';

  let { rows }: { rows: ServiceStats[] } = $props();
</script>

<table>
  <caption class="sr-only">Incident record per service</caption>
  <thead>
    <tr>
      <th scope="col">Station</th>
      <th scope="col">Now</th>
      <th scope="col" class="num">Recorded</th>
      <th scope="col" class="num">Last 90d</th>
      <th scope="col" class="num">Mean fix</th>
      <th scope="col" class="num">Quiet for</th>
    </tr>
  </thead>
  <tbody>
    {#each rows as row (row.service.token)}
      <tr>
        <th scope="row">
          <a href="/s/{row.service.token}">
            <ServiceIcon
              src={row.service.icon}
              name={row.service.name}
              slug={row.service.slug}
              size={16}
            />
            <span class="mono code">{stationCode(row.service.slug)}</span>
            {row.service.name}
          </a>
        </th>
        <td><StatusMark level={row.service.level} size={20} /></td>
        <td class="num mono">{row.total}</td>
        <td class="num mono">{row.last90}</td>
        <td class="num mono">{row.mttrMinutes === null ? '—' : minutesLabel(row.mttrMinutes)}</td>
        <td class="num mono">{row.cleanDays === null ? '—' : `${row.cleanDays}d`}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.88rem;
  }

  th,
  td {
    padding: var(--space-3) var(--space-3);
    text-align: start;
    border-block-end: var(--hairline) solid var(--rule);
  }

  thead th {
    font-weight: 500;
    font-family: var(--font-mono);
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-faint);
    border-block-end-color: var(--rule-strong);
  }

  tbody th {
    font-weight: 560;

    & a {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 0.2em;
      }
    }
  }

  .code {
    font-size: 0.66rem;
    letter-spacing: 0.09em;
    color: var(--text-faint);
  }

  .num {
    text-align: end;
    font-variant-numeric: tabular-nums;
  }

  tbody tr:hover {
    background: var(--surface-raised);
  }
</style>
