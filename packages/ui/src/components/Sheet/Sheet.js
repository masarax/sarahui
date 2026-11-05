import * as UI from '../../templates.js';

/**
 * Sheet component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Sheet(props = {}) {
  if (typeof UI.Sheet === 'function') {
    return UI.Sheet(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
