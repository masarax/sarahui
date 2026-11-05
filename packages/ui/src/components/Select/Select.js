import * as UI from '../../templates.js';

/**
 * Select component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Select(props = {}) {
  if (typeof UI.Select === 'function') {
    return UI.Select(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
