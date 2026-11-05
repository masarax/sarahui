import * as UI from '../../templates.js';

export function OrbitingCircles(props = {}) {
  if (typeof UI.OrbitingCircles === 'function') {
    return UI.OrbitingCircles(props);
  }
  return `<div class="s-orbiting-circles">${props.children || ''}</div>`;
}
