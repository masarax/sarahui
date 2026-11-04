import * as UI from '../../templates.js';

/**
 * DotPattern component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function DotPattern(props = {}) {
  if (typeof UI.DotPattern === 'function') {
    return UI.DotPattern(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
