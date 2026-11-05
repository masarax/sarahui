import * as UI from '../../templates.js';

export function Globe(props = {}) {
  if (typeof UI.Globe === 'function') {
    return UI.Globe(props);
  }
  return `<div class="s-globe-container"><canvas class="s-globe-canvas" data-s-globe=""></canvas></div>`;
}
