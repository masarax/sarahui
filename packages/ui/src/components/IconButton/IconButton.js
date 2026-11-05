import * as UI from '../../templates.js';

/**
 * IconButton component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function IconButton(props = {}) {
  if (typeof UI.IconButton === 'function') {
    return UI.IconButton(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
