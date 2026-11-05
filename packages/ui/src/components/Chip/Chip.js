import * as UI from '../../templates.js';

/**
 * Chip component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Chip(props = {}) {
  if (typeof UI.Chip === 'function') {
    return UI.Chip(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
