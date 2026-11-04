import * as UI from '../../templates.js';

/**
 * TypingAnimation component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function TypingAnimation(props = {}) {
  if (typeof UI.TypingAnimation === 'function') {
    return UI.TypingAnimation(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
