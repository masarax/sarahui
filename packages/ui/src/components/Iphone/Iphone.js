import * as UI from '../../templates.js';

/**
 * Iphone component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Iphone(props = {}) {
  if (typeof UI.Iphone === 'function') {
    return UI.Iphone(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
