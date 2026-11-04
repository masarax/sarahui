import * as UI from '../../templates.js';

/**
 * PixelImage component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function PixelImage(props = {}) {
  if (typeof UI.PixelImage === 'function') {
    return UI.PixelImage(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
