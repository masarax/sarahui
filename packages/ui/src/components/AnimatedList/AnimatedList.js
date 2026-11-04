import * as UI from '../../templates.js';

export function AnimatedList(props = {}) {
  if (typeof UI.AnimatedList === 'function') {
    return UI.AnimatedList(props);
  }
  return `<div class="s-animated-list" data-s-animated-list="">${props.children || ''}</div>`;
}
