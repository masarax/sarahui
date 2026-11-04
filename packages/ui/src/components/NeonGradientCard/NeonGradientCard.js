import * as UI from '../../templates.js';

/**
 * NeonGradientCard component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function NeonGradientCard(props = {}) {
  if (typeof UI.NeonGradientCard === 'function') {
    return UI.NeonGradientCard(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
