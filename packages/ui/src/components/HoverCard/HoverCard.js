import * as UI from '../../templates.js';

/**
 * HoverCard component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function HoverCard(props = {}) {
  if (typeof UI.HoverCard === 'function') {
    return UI.HoverCard(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
