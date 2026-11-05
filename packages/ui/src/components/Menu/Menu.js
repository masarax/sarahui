import * as UI from '../../templates.js';

/**
 * Menu component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Menu(props = {}) {
  if (typeof UI.Menu === 'function') {
    return UI.Menu(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
