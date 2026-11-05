import * as UI from '../../templates.js';

/**
 * Separator component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Separator(props = {}) {
  if (typeof UI.Separator === 'function') {
    return UI.Separator(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
