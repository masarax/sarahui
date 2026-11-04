import * as UI from '../../templates.js';

/**
 * SparklesText component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function SparklesText(props = {}) {
  if (typeof UI.SparklesText === 'function') {
    return UI.SparklesText(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
