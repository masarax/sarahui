import * as UI from '../../templates.js';

/**
 * Textarea component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Textarea(props = {}) {
  if (typeof UI.Textarea === 'function') {
    return UI.Textarea(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
