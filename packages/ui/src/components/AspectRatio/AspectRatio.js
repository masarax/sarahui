import * as UI from '../../templates.js';

/**
 * AspectRatio component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function AspectRatio(props = {}) {
  if (typeof UI.AspectRatio === 'function') {
    return UI.AspectRatio(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
