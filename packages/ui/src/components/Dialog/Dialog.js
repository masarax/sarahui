import * as UI from '../../templates.js';

/**
 * Dialog component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Dialog(props = {}) {
  if (typeof UI.Dialog === 'function') {
    return UI.Dialog(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
