<script lang="ts">
  import ServiceIcon from './ServiceIcon.svelte';
  import StatusMark from './StatusMark.svelte';
  import Trace from './Trace.svelte';
  import { LEVELS } from '$lib/status';
  import { relative, stationCode } from '$lib/format';
  import type { Service } from '$lib/types';

  interface Props {
    service: Service;
    href: string;
    days?: number;
  }

  let { service, href, days = 90 }: Props = $props();

  let open = $derived(service.incidents.find((incident) => !incident.resolved));
  let latest = $derived(service.incidents[0]);
  let note = $derived.by(() => {
    if (service.error) return service.error;
    if (open) return `${open.title} · started ${relative(open.startedAt)}`;
    if (latest) return `Last incident ${relative(latest.startedAt)}`;
    return 'Nothing recorded in this window';
  });
</script>

<article class="station" class:faulty={service.error}>
  <a class="name" {href}>
    <ServiceIcon src={service.icon} name={service.name} slug={service.slug} />
    <span>
      <span class="mono code">{stationCode(service.slug)}</span>
      {service.name}
    </span>
  </a>

  <p class="state"><StatusMark level={service.level} label /></p>

  <div class="plot">
    <Trace incidents={service.incidents} {days} />
  </div>

  <p class="note">{note}</p>
</article>

<style>
  .station {
    display: grid;
    grid-template-areas: 'name state' 'plot plot' 'note note';
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-2) var(--space-4);
    padding-block: var(--space-4);
    border-block-end: var(--hairline) solid var(--rule);

    &:hover .plot {
      --trace-ink: var(--text);
    }
  }

  .name {
    grid-area: name;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-width: 0;
    font-weight: 560;
    text-decoration: none;

    & > span {
      display: flex;
      align-items: baseline;
      gap: var(--space-2);
      min-width: 0;
    }

    &:hover span:last-child {
      text-decoration: underline;
      text-underline-offset: 0.2em;
    }
  }

  .code {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: var(--text-faint);
  }

  .state {
    grid-area: state;
  }

  .plot {
    grid-area: plot;
  }

  .note {
    grid-area: note;
    font-size: 0.84rem;
    color: var(--text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .faulty .note {
    color: var(--level-unknown);
  }

  @media (min-width: 56rem) {
    .station {
      grid-template-areas: 'name state plot' 'note note plot';
      grid-template-columns: minmax(11rem, 1fr) minmax(9.5rem, auto) minmax(0, 2.2fr);
      column-gap: var(--space-5);
    }

    .note {
      align-self: start;
    }
  }
</style>
