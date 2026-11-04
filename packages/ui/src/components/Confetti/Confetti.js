import * as UI from '../../templates.js';

/**
 * Confetti component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Confetti(props = {}) {
  if (typeof UI.Confetti === 'function') {
    return UI.Confetti(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
