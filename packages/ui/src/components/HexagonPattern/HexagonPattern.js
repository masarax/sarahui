import * as UI from '../../templates.js';

/**
 * HexagonPattern component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function HexagonPattern(props = {}) {
  if (typeof UI.HexagonPattern === 'function') {
    return UI.HexagonPattern(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
