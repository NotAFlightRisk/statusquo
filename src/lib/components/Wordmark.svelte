<script lang="ts">
  let { title }: { title: string } = $props();
</script>

<span class="wordmark">
  <svg viewBox="0 0 40 14" width="34" height="12" aria-hidden="true">
    <path
      d="M0 7h6l2-5 2.5 11L13 3l2 8 2-4h4l2-3 2 6 2-4h11"
      fill="none"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  {title}
</span>

<style>
  .wordmark {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    font-weight: 640;
    font-size: 1.02rem;
    letter-spacing: -0.02em;
    color: var(--text);
  }

  svg {
    color: var(--accent);
  }
</style>
