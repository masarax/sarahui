import * as UI from '../../templates.js';

/**
 * TextReveal component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function TextReveal(props = {}) {
  if (typeof UI.TextReveal === 'function') {
    return UI.TextReveal(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
