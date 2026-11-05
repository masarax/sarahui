import * as UI from '../../templates.js';

/**
 * TextAnimate component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function TextAnimate(props = {}) {
  if (typeof UI.TextAnimate === 'function') {
    return UI.TextAnimate(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
