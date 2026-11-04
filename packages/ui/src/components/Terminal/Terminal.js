import * as UI from '../../templates.js';

export function Terminal(props = {}) {
  if (typeof UI.Terminal === 'function') {
    return UI.Terminal(props);
  }
  return `<div class="s-terminal" data-s-terminal="">${props.children || ''}</div>`;
}

export function AnimatedSpan(props = {}) {
  if (typeof UI.AnimatedSpan === 'function') {
    return UI.AnimatedSpan(props);
  }
  return `<div class="s-terminal-span" data-s-terminal-item="span">${props.children || ''}</div>`;
}
