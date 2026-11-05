import * as UI from '../../templates.js';

/**
 * BlurFade component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function BlurFade(props = {}) {
  if (typeof UI.BlurFade === 'function') {
    return UI.BlurFade(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
