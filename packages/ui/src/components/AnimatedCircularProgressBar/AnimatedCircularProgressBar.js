import * as UI from '../../templates.js';

/**
 * AnimatedCircularProgressBar component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function AnimatedCircularProgressBar(props = {}) {
  if (typeof UI.AnimatedCircularProgressBar === 'function') {
    return UI.AnimatedCircularProgressBar(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
