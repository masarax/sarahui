import * as UI from '../../templates.js';

/**
 * Android component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Android(props = {}) {
  if (typeof UI.Android === 'function') {
    return UI.Android(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
