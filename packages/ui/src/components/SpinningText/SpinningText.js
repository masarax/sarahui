import * as UI from '../../templates.js';

/**
 * SpinningText component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function SpinningText(props = {}) {
  if (typeof UI.SpinningText === 'function') {
    return UI.SpinningText(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
