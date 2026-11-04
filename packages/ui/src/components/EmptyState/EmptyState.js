import * as UI from '../../templates.js';

/**
 * EmptyState component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function EmptyState(props = {}) {
  if (typeof UI.EmptyState === 'function') {
    return UI.EmptyState(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
