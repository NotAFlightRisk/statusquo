import type { Action } from 'svelte/action';

/**
 * A floating readout for chart marks, which are too small to label in place.
 * Purely visual - every figure it shows is already in the page as text.
 */
let bubble: HTMLDivElement | null = null;
let users = 0;

function surface(): HTMLDivElement {
  bubble ??= document.body.appendChild(document.createElement('div'));
  bubble.className = 'tooltip';
  bubble.ariaHidden = 'true';
  return bubble;
}

function place(node: Element, label: string): void {
  const box = node.getBoundingClientRect();
  const tip = surface();
  tip.textContent = label;
  tip.style.insetInlineStart = `${box.left + box.width / 2}px`;
  tip.style.insetBlockStart = `${box.top}px`;
  tip.dataset.shown = '';
}

function hide(): void {
  delete bubble?.dataset.shown;
}

export const tooltip: Action<Element, string> = (node, label) => {
  let text = label;
  const show = () => text && place(node, text);

  users += 1;

  node.addEventListener('pointerenter', show);
  node.addEventListener('focusin', show);
  node.addEventListener('pointerleave', hide);
  node.addEventListener('focusout', hide);

  return {
    update: (next) => {
      text = next;
    },
    destroy: () => {
      hide();
      users -= 1;
      if (!users) {
        bubble?.remove();
        bubble = null;
      }
      node.removeEventListener('pointerenter', show);
      node.removeEventListener('focusin', show);
      node.removeEventListener('pointerleave', hide);
      node.removeEventListener('focusout', hide);
    }
  };
};
