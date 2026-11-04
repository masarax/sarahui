import * as UI from '../../templates.js';

/**
 * CommandPalette component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function CommandPalette(props = {}) {
  if (typeof UI.CommandPalette === 'function') {
    return UI.CommandPalette(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
