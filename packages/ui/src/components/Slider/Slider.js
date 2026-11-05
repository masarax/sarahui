import * as UI from '../../templates.js';

/**
 * Slider component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Slider(props = {}) {
  if (typeof UI.Slider === 'function') {
    return UI.Slider(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
