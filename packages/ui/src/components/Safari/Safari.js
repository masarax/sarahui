import * as UI from '../../templates.js';

/**
 * Safari component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Safari(props = {}) {
  if (typeof UI.Safari === 'function') {
    return UI.Safari(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
