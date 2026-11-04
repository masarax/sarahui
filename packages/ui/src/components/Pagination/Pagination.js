import * as UI from '../../templates.js';

/**
 * Pagination component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Pagination(props = {}) {
  if (typeof UI.Pagination === 'function') {
    return UI.Pagination(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
