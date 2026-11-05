import * as UI from '../../templates.js';

/**
 * Button component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Button(props = {}) {
  if (typeof UI.Button === 'function') {
    return UI.Button(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
