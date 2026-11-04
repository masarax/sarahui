import * as UI from '../../templates.js';

/**
 * DiaTextReveal component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function DiaTextReveal(props = {}) {
  if (typeof UI.DiaTextReveal === 'function') {
    return UI.DiaTextReveal(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
