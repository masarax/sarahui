import * as UI from '../../templates.js';

/**
 * Radio component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Radio(props = {}) {
  if (typeof UI.Radio === 'function') {
    return UI.Radio(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
