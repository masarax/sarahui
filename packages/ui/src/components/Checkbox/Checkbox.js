import * as UI from '../../templates.js';

/**
 * Checkbox component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Checkbox(props = {}) {
  if (typeof UI.Checkbox === 'function') {
    return UI.Checkbox(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
