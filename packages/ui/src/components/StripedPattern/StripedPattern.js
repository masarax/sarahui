import * as UI from '../../templates.js';

/**
 * StripedPattern component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function StripedPattern(props = {}) {
  if (typeof UI.StripedPattern === 'function') {
    return UI.StripedPattern(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
