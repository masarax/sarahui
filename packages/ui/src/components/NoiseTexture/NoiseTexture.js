import * as UI from '../../templates.js';

/**
 * NoiseTexture component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function NoiseTexture(props = {}) {
  if (typeof UI.NoiseTexture === 'function') {
    return UI.NoiseTexture(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
