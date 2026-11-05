import * as UI from '../../templates.js';

/**
 * Particles component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Particles(props = {}) {
  if (typeof UI.Particles === 'function') {
    return UI.Particles(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
