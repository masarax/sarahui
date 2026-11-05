import * as UI from '../../templates.js';

/**
 * Meteors component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Meteors(props = {}) {
  if (typeof UI.Meteors === 'function') {
    return UI.Meteors(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
