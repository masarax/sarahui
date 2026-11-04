import * as UI from '../../templates.js';

/**
 * AnimatedThemeToggler component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function AnimatedThemeToggler(props = {}) {
  if (typeof UI.AnimatedThemeToggler === 'function') {
    return UI.AnimatedThemeToggler(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
