import * as UI from '../../templates.js';

/**
 * Floating3DParticles component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function Floating3DParticles(props = {}) {
  if (typeof UI.Floating3DParticles === 'function') {
    return UI.Floating3DParticles(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
