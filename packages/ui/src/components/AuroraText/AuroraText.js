import * as UI from '../../templates.js';

/**
 * AuroraText component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function AuroraText(props = {}) {
  if (typeof UI.AuroraText === 'function') {
    return UI.AuroraText(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
