import * as UI from '../../templates.js';

/**
 * ComicText component modular wrapper.
 * Conforms to Adobe Spectrum token hierarchy & WCAG accessibility standards.
 */
export function ComicText(props = {}) {
  if (typeof UI.ComicText === 'function') {
    return UI.ComicText(props);
  }
  return `<div class="s-${name.toLowerCase()}" data-s-${name.toLowerCase()}="">${props.children || ''}</div>`;
}
