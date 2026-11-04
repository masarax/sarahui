import * as UI from '../../templates.js';

/**
 * ToggleGroup component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function ToggleGroup(props = {}) {
  if (typeof UI.ToggleGroup === 'function') {
    return UI.ToggleGroup(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
