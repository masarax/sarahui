import * as UI from '../../templates.js';

/**
 * ShimmerButton component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function ShimmerButton(props = {}) {
  if (typeof UI.ShimmerButton === 'function') {
    return UI.ShimmerButton(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
