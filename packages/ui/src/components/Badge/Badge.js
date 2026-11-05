import * as UI from '../../templates.js';

/**
 * Badge component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Badge(props = {}) {
  if (typeof UI.Badge === 'function') {
    return UI.Badge(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
