import * as UI from '../../templates.js';

/**
 * ContextMenu component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function ContextMenu(props = {}) {
  if (typeof UI.ContextMenu === 'function') {
    return UI.ContextMenu(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
