<script lang="ts">
  const MODES = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' }
  ] as const;

  let mode = $state<string>('system');

  $effect(() => {
    mode = localStorage.getItem('statusquo-theme') ?? 'system';
  });

  function pick(value: string) {
    mode = value;
    if (value === 'system') {
      delete document.documentElement.dataset.theme;
      localStorage.removeItem('statusquo-theme');
    } else {
      document.documentElement.dataset.theme = value;
      localStorage.setItem('statusquo-theme', value);
    }
  }
</script>

<fieldset class="toggle">
  <legend class="sr-only">Colour theme</legend>
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
