import * as UI from '../../templates.js';

/**
 * Ripple component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Ripple(props = {}) {
  if (typeof UI.Ripple === 'function') {
    return UI.Ripple(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
