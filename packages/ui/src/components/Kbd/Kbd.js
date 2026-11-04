import * as UI from '../../templates.js';

/**
 * Kbd component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Kbd(props = {}) {
  if (typeof UI.Kbd === 'function') {
    return UI.Kbd(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
