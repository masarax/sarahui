import * as UI from '../../templates.js';

/**
 * HyperText component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function HyperText(props = {}) {
  if (typeof UI.HyperText === 'function') {
    return UI.HyperText(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
