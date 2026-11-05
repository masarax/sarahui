import * as UI from '../../templates.js';

/**
 * Switch component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Switch(props = {}) {
  if (typeof UI.Switch === 'function') {
    return UI.Switch(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
