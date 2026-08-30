export interface Theme {
  id: string;
  label: string;
  note: string;
}

/** Every theme is a block of CSS variables in themes.css, keyed by `data-theme`. */
export const THEMES: Theme[] = [
  { id: 'plotting', label: 'Plotting paper', note: 'Graph paper and warm ink' },
  { id: 'catppuccin', label: 'Catppuccin', note: 'Pastels, Latte and Mocha' },
  { id: 'material', label: 'Material', note: 'Tonal surfaces, soft corners' },
  { id: 'glass', label: 'Glass', note: 'Frosted panes over a wash' },
  { id: 'nord', label: 'Nord', note: 'Arctic blues and muted aurora' },
  { id: 'solarized', label: 'Solarized', note: 'The old terminal standby' },
  { id: 'terminal', label: 'Terminal', note: 'Phosphor green, monospaced' },
  { id: 'newsprint', label: 'Newsprint', note: 'Grey stock and serif type' }
];

export const DEFAULT_THEME = THEMES[0].id;
export const THEME_KEY = 'statusquo-theme';
export const THEME_PARAM = 'theme';

export function isTheme(id: string | null | undefined): id is string {
  return !!id && THEMES.some((theme) => theme.id === id);
}
