const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Short station code for a service, in the spirit of a seismic network. */
export function stationCode(slug: string): string {
  const letters = slug.replace(/[^a-z0-9]/gi, '').toUpperCase();
  return letters.slice(0, 3) || '???';
}

export function duration(ms: number): string {
  if (ms < MINUTE) return 'under a minute';
  if (ms < HOUR) return `${Math.round(ms / MINUTE)}m`;
  if (ms < DAY) {
    const hours = Math.floor(ms / HOUR);
    const minutes = Math.round((ms % HOUR) / MINUTE);
    return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  const days = Math.floor(ms / DAY);
  const hours = Math.round((ms % DAY) / HOUR);
  return hours ? `${days}d ${hours}h` : `${days}d`;
}

export function relative(iso: string, now = Date.now()): string {
  const at = new Date(iso).valueOf();
  if (Number.isNaN(at)) return '';
  const gap = now - at;
  if (gap < 0) return `in ${duration(-gap)}`;
  if (gap < MINUTE) return 'just now';
  return `${duration(gap)} ago`;
}

export function dateLabel(iso: string): string {
  const at = new Date(iso);
  if (Number.isNaN(at.valueOf())) return '';
  return at.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });
}

export function dayLabel(iso: string): string {
  const at = new Date(iso);
  if (Number.isNaN(at.valueOf())) return '';
  return at.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

export function minutesLabel(minutes: number): string {
  return duration(minutes * MINUTE);
}
