import * as UI from '../../templates.js';

/**
 * Drawer component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Drawer(props = {}) {
  if (typeof UI.Drawer === 'function') {
    return UI.Drawer(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
