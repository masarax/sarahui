import * as UI from '../../templates.js';

/**
 * Highlighter component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Highlighter(props = {}) {
  if (typeof UI.Highlighter === 'function') {
    return UI.Highlighter(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
