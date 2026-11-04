import * as UI from '../../templates.js';

/**
 * ScrollBasedVelocity component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function ScrollBasedVelocity(props = {}) {
  if (typeof UI.ScrollBasedVelocity === 'function') {
    return UI.ScrollBasedVelocity(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
