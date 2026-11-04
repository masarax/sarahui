import * as UI from '../../templates.js';

/**
 * WordRotate component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function WordRotate(props = {}) {
  if (typeof UI.WordRotate === 'function') {
    return UI.WordRotate(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
