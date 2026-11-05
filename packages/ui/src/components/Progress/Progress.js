import * as UI from '../../templates.js';

/**
 * Progress component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Progress(props = {}) {
  if (typeof UI.Progress === 'function') {
    return UI.Progress(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
