import * as UI from '../../templates.js';

/**
 * GlyphMatrix component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function GlyphMatrix(props = {}) {
  if (typeof UI.GlyphMatrix === 'function') {
    return UI.GlyphMatrix(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
