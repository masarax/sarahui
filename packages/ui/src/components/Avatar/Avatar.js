import * as UI from '../../templates.js';

/**
 * Avatar component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Avatar(props = {}) {
  if (typeof UI.Avatar === 'function') {
    return UI.Avatar(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
