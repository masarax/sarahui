import * as UI from '../../templates.js';

export function BorderBeam(props = {}) {
  if (typeof UI.BorderBeam === 'function') {
    return UI.BorderBeam(props);
  }
  return `<div class="s-border-beam" aria-hidden="true"><div class="s-border-beam-glow"></div></div>`;
}
