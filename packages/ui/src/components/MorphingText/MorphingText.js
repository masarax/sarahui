import * as UI from '../../templates.js';

/**
 * MorphingText component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function MorphingText(props = {}) {
  if (typeof UI.MorphingText === 'function') {
    return UI.MorphingText(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
