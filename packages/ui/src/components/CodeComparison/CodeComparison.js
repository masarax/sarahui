import * as UI from '../../templates.js';

/**
 * CodeComparison component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function CodeComparison(props = {}) {
  if (typeof UI.CodeComparison === 'function') {
    return UI.CodeComparison(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
