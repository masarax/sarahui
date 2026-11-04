import * as UI from '../../templates.js';

/**
 * Popover component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Popover(props = {}) {
  if (typeof UI.Popover === 'function') {
    return UI.Popover(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
