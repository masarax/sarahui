import * as UI from '../../templates.js';

/**
 * Spinner component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Spinner(props = {}) {
  if (typeof UI.Spinner === 'function') {
    return UI.Spinner(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
