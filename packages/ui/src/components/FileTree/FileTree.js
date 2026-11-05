import * as UI from '../../templates.js';

/**
 * FileTree component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function FileTree(props = {}) {
  if (typeof UI.FileTree === 'function') {
    return UI.FileTree(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
