<script lang="ts">
  const MODE_KEY = 'statusquo-mode';

  const MODES = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' }
  ] as const;

  let mode = $state<string>('system');

  $effect(() => {
    mode = localStorage.getItem(MODE_KEY) ?? 'system';
  });

  function pick(value: string) {
    mode = value;
    if (value === 'system') {
      delete document.documentElement.dataset.mode;
      localStorage.removeItem(MODE_KEY);
    } else {
      document.documentElement.dataset.mode = value;
      localStorage.setItem(MODE_KEY, value);
    }
  }
</script>

<fieldset class="toggle">
  <legend class="sr-only">Light or dark</legend>
  {#each MODES as option (option.value)}
    <label class="stamp">
      <input
        type="radio"
        name="theme"
        value={option.value}
        checked={mode === option.value}
        onchange={() => pick(option.value)}
      />
      {option.label}
    </label>
  {/each}
</fieldset>

<style>
  .toggle {
    display: flex;
    margin: 0;
    padding: 0;
    border: var(--hairline) solid var(--rule);
    border-radius: var(--radius);
  }

  label {
    padding: var(--space-1) var(--space-3);
    cursor: pointer;
    border-inline-end: var(--hairline) solid var(--rule);

    &:last-child {
      border-inline-end: 0;
    }

    &:hover {
      color: var(--text);
    }

    &:has(:checked) {
      color: var(--text);
      background: var(--surface-sunk);
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
</style>
