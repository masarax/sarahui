import * as UI from '../../templates.js';

/**
 * Input component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Input(props = {}) {
  if (typeof UI.Input === 'function') {
    return UI.Input(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
