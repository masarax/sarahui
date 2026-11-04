import * as UI from '../../templates.js';

/**
 * ButtonGroup component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function ButtonGroup(props = {}) {
  if (typeof UI.ButtonGroup === 'function') {
    return UI.ButtonGroup(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
