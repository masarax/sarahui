import * as UI from '../../templates.js';

/**
 * Text3DFlip component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Text3DFlip(props = {}) {
  if (typeof UI.Text3DFlip === 'function') {
    return UI.Text3DFlip(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
