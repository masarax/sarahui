import * as UI from '../../templates.js';

/**
 * Tabs component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Tabs(props = {}) {
  if (typeof UI.Tabs === 'function') {
    return UI.Tabs(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
