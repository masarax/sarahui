import * as UI from '../../templates.js';

/**
 * VideoText component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function VideoText(props = {}) {
  if (typeof UI.VideoText === 'function') {
    return UI.VideoText(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
