import * as UI from '../../templates.js';

/**
 * RainbowButton component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function RainbowButton(props = {}) {
  if (typeof UI.RainbowButton === 'function') {
    return UI.RainbowButton(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
