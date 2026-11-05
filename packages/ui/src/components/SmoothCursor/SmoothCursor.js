import * as UI from '../../templates.js';

export function SmoothCursor(props = {}) {
  if (typeof UI.SmoothCursor === 'function') {
    return UI.SmoothCursor(props);
  }
  return `<div class="s-smooth-cursor-container" data-s-smooth-cursor="" aria-hidden="true"></div>`;
}
