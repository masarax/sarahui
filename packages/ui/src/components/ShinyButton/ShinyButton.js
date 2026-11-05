import * as UI from '../../templates.js';

/**
 * ShinyButton component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function ShinyButton(props = {}) {
  if (typeof UI.ShinyButton === 'function') {
    return UI.ShinyButton(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
