import type { Level } from './types';

interface LevelMeta {
  label: string;
  short: string;
  severity: number;
  tone: string;
}

export const LEVELS: Record<Level, LevelMeta> = {
  operational: { label: 'Operational', short: 'Up', severity: 0, tone: 'ok' },
  unknown: { label: 'Unknown', short: 'Unknown', severity: 1, tone: 'unknown' },
  maintenance: { label: 'Under maintenance', short: 'Maintenance', severity: 2, tone: 'info' },
  degraded: { label: 'Degraded performance', short: 'Degraded', severity: 3, tone: 'warn' },
  partial: { label: 'Partial outage', short: 'Partial', severity: 4, tone: 'bad' },
  major: { label: 'Major outage', short: 'Outage', severity: 5, tone: 'critical' }
};

export const LEVEL_ORDER: Level[] = [
  'major',
  'partial',
  'degraded',
  'maintenance',
  'unknown',
  'operational'
];

export function worst(levels: Level[]): Level {
  return levels.reduce<Level>(
    (acc, level) => (LEVELS[level].severity > LEVELS[acc].severity ? level : acc),
    'operational'
  );
}

export function isDown(level: Level): boolean {
  return LEVELS[level].severity >= LEVELS.degraded.severity;
}

/** Loose fallback for providers we have no explicit mapping for, like a bare RSS feed. */
export function levelFromText(raw: string | null | undefined): Level {
  const text = (raw ?? '').toLowerCase().replace(/[\s_-]+/g, '');
  if (!text) return 'unknown';
  const rules: [RegExp, Level][] = [
    [/maintenance|scheduled/, 'maintenance'],
    [/partial|someissue|minoroutage/, 'partial'],
    [/major|critical|severe|fulloutage|hasissues|unavailable|offline|down|outage/, 'major'],
    [/degraded|minor|slow|elevated|disrupt|performance|investigating|identified/, 'degraded'],
    [/operational|resolved|completed|available|normal|nominal|good|none|^ok$|^up$/, 'operational']
  ];
  return rules.find(([pattern]) => pattern.test(text))?.[1] ?? 'unknown';
}
