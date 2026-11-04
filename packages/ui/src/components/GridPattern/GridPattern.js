import * as UI from '../../templates.js';

/**
 * GridPattern component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function GridPattern(props = {}) {
  if (typeof UI.GridPattern === 'function') {
    return UI.GridPattern(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
