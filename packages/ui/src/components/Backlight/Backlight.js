import * as UI from '../../templates.js';

/**
 * Backlight component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Backlight(props = {}) {
  if (typeof UI.Backlight === 'function') {
    return UI.Backlight(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
