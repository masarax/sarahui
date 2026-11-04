import * as UI from '../../templates.js';

/**
 * Collapsible component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Collapsible(props = {}) {
  if (typeof UI.Collapsible === 'function') {
    return UI.Collapsible(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
