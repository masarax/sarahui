import * as UI from '../../templates.js';

/**
 * Toast component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Toast(props = {}) {
  if (typeof UI.Toast === 'function') {
    return UI.Toast(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
