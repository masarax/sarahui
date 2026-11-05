import * as UI from '../../templates.js';

/**
 * DataTable component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function DataTable(props = {}) {
  if (typeof UI.DataTable === 'function') {
    return UI.DataTable(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
