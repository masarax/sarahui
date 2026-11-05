import * as UI from '../../templates.js';

/**
 * Tooltip component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Tooltip(props = {}) {
  if (typeof UI.Tooltip === 'function') {
    return UI.Tooltip(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
