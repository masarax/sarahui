import * as UI from '../../templates.js';

/**
 * Alert component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Alert(props = {}) {
  if (typeof UI.Alert === 'function') {
    return UI.Alert(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
