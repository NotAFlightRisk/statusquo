<script lang="ts">
  import { browser } from '$app/environment';
  import { afterNavigate, replaceState } from '$app/navigation';
  import { page } from '$app/state';
  import { DEFAULT_THEME, isTheme, THEME_KEY, THEME_PARAM, THEMES } from '$lib/themes';

  // the head script has already applied one before paint; adopt it, or clear it if it was junk
  function adopt() {
    const id = document.documentElement.dataset.theme;
    if (isTheme(id)) return id;
    delete document.documentElement.dataset.theme;
    return DEFAULT_THEME;
  }

  let theme = $state(browser ? adopt() : DEFAULT_THEME);

  // replaceState needs the router up, and that isn't true on the first hydrating effect
  let routed = $state(false);
  afterNavigate(() => {
    routed = true;
    const arriving = page.url.searchParams.get(THEME_PARAM);
    if (isTheme(arriving)) apply(arriving);
  });

  // A board wears its theme in the URL, so a link you send someone arrives looking the same.
  // page.url drives the reactivity but goes stale after replaceState, so the query comes from
  // the address bar itself.
  $effect(() => {
    if (!routed || !page.url.pathname.startsWith('/s/')) return;
    const wanted = theme === DEFAULT_THEME ? null : theme;
    const url = new URL(location.href);
    if (url.searchParams.get(THEME_PARAM) === wanted) return;
    if (wanted) url.searchParams.set(THEME_PARAM, wanted);
    else url.searchParams.delete(THEME_PARAM);
    replaceState(url, page.state);
  });

  function apply(id: string) {
    theme = id;
    document.documentElement.dataset.theme = id;
  }

  function pick(id: string) {
    apply(id);
    localStorage.setItem(THEME_KEY, id);
  }
</script>

<button class="more stamp" popovertarget="themes" aria-label="Choose a theme" title="Choose a theme"
  >&hellip;</button
>

<div popover id="themes" class="menu">
  <fieldset>
    <legend class="stamp">Theme</legend>
    {#each THEMES as option (option.id)}
      <label>
        <input
          type="radio"
          name="skin"
          value={option.id}
          checked={theme === option.id}
          onchange={() => pick(option.id)}
        />
        <span class="theme-swatch" data-theme={option.id} aria-hidden="true">
          <span class="pane">
            <i style:background="var(--level-operational)"></i>
            <i style:background="var(--accent)"></i>
            <i style:background="var(--level-major)"></i>
          </span>
        </span>
        <span class="name">
          {option.label}
          <span class="note">{option.note}</span>
        </span>
      </label>
    {/each}
  </fieldset>
</div>

<style>
  .more {
    padding: var(--space-1) var(--space-3);
    line-height: 1.1;
    background: none;
    border: var(--hairline) solid var(--rule);
    border-radius: var(--radius);
    cursor: pointer;

    &:hover {
      color: var(--text);
      background: var(--surface-sunk);
    }
  }

  .menu {
    position: fixed;
    inset: auto var(--space-4) auto auto;
    inset-block-start: 3.4rem;
    margin: 0;
    padding: var(--space-3);
    width: min(20rem, calc(100vw - var(--space-6)));
    max-height: min(34rem, calc(100dvh - 5rem));
    overflow-y: auto;
    background: var(--surface-raised);
    color: var(--text);
    border: var(--hairline) solid var(--rule-strong);
    border-radius: var(--radius);
    box-shadow: var(--panel-shadow);
    backdrop-filter: var(--panel-blur);
  }

  fieldset {
    display: grid;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    border: 0;
  }

  legend {
    padding-block-end: var(--space-2);
  }

  label {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2);
    border-radius: var(--radius);
    cursor: pointer;

    &:hover {
      background: var(--surface-sunk);
    }

    &:has(:checked) {
      background: var(--accent-quiet);
    }

    &:has(:focus-visible) {
      outline: 2px solid var(--focus);
      outline-offset: -2px;
    }
  }

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .theme-swatch {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 3.2rem;
    height: 2rem;
    background-color: var(--surface);
    background-image: var(--paper);
    background-size: var(--paper-size);
    border: var(--hairline) solid var(--rule-strong);
    border-radius: min(var(--radius), 6px);
  }

  /* the pane inside, so a theme previews its material and not only its colours */
  .pane {
    display: flex;
    gap: 2px;
    padding: 3px 5px;
    background: var(--panel-fill);
    border: var(--panel-edge);
    border-radius: min(var(--radius), 5px);
  }

  i {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
  }

  .name {
    display: grid;
    font-size: 0.9rem;
    font-weight: 560;
  }

  .note {
    font-size: 0.76rem;
    font-weight: 400;
    color: var(--text-muted);
  }
</style>
