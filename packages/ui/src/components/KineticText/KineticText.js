import * as UI from '../../templates.js';

/**
 * KineticText component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function KineticText(props = {}) {
  if (typeof UI.KineticText === 'function') {
    return UI.KineticText(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
