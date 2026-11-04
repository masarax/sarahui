import * as UI from '../../templates.js';

/**
 * ScrollProgress component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function ScrollProgress(props = {}) {
  if (typeof UI.ScrollProgress === 'function') {
    return UI.ScrollProgress(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
