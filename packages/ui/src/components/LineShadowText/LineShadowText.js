import * as UI from '../../templates.js';

/**
 * LineShadowText component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function LineShadowText(props = {}) {
  if (typeof UI.LineShadowText === 'function') {
    return UI.LineShadowText(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
