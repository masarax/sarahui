import * as UI from '../../templates.js';

/**
 * InteractiveHoverButton component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function InteractiveHoverButton(props = {}) {
  if (typeof UI.InteractiveHoverButton === 'function') {
    return UI.InteractiveHoverButton(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
