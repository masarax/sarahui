import * as UI from '../../templates.js';

/**
 * CoolMode component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function CoolMode(props = {}) {
  if (typeof UI.CoolMode === 'function') {
    return UI.CoolMode(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
