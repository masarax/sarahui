import * as UI from '../../templates.js';

/**
 * AnimatedSubscribeButton component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function AnimatedSubscribeButton(props = {}) {
  if (typeof UI.AnimatedSubscribeButton === 'function') {
    return UI.AnimatedSubscribeButton(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
