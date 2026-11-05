import * as UI from '../../templates.js';

export function AnimatedBeam(props = {}) {
  if (typeof UI.AnimatedBeam === 'function') {
    return UI.AnimatedBeam(props);
  }
  return `<svg class="s-animated-beam" aria-hidden="true"></svg>`;
}
