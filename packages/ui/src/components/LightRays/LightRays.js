import * as UI from '../../templates.js';

/**
 * LightRays component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function LightRays(props = {}) {
  if (typeof UI.LightRays === 'function') {
    return UI.LightRays(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
