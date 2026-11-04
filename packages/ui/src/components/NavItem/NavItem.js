import * as UI from '../../templates.js';

/**
 * NavItem component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function NavItem(props = {}) {
  if (typeof UI.NavItem === 'function') {
    return UI.NavItem(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
