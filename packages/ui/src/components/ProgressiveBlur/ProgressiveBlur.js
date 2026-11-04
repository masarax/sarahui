import * as UI from '../../templates.js';

export function ProgressiveBlur(props = {}) {
  if (typeof UI.ProgressiveBlur === 'function') {
    return UI.ProgressiveBlur(props);
  }
  return `<div class="s-progressive-blur">${props.children || ''}</div>`;
}
