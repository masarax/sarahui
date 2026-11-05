import * as UI from '../../templates.js';

export function Dock(props = {}) {
  if (typeof UI.Dock === 'function') {
    return UI.Dock(props);
  }
  return `<nav class="s-dock" data-s-dock="">${props.children || ''}</nav>`;
}
