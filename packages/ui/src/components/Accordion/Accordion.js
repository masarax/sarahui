import * as UI from '../../templates.js';

/**
 * Accordion component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Accordion(props = {}) {
  if (typeof UI.Accordion === 'function') {
    return UI.Accordion(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
