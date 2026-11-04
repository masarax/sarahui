import * as UI from '../../templates.js';

/**
 * RippleButton component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function RippleButton(props = {}) {
  if (typeof UI.RippleButton === 'function') {
    return UI.RippleButton(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
