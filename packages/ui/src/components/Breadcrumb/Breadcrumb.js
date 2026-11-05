import * as UI from '../../templates.js';

/**
 * Breadcrumb component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Breadcrumb(props = {}) {
  if (typeof UI.Breadcrumb === 'function') {
    return UI.Breadcrumb(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
