import * as UI from '../../templates.js';

export function Lens(props = {}) {
  if (typeof UI.Lens === 'function') {
    return UI.Lens(props);
  }
  return `<div class="s-lens-container" data-s-lens="">${props.children || ''}</div>`;
}
