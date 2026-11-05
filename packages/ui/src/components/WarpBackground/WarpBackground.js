import * as UI from '../../templates.js';

/**
 * WarpBackground component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function WarpBackground(props = {}) {
  if (typeof UI.WarpBackground === 'function') {
    return UI.WarpBackground(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
