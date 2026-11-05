import * as UI from '../../templates.js';

/**
 * NumberTicker component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function NumberTicker(props = {}) {
  if (typeof UI.NumberTicker === 'function') {
    return UI.NumberTicker(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
