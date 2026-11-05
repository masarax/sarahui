import * as UI from '../../templates.js';

export function ShineBorder(props = {}) {
  if (typeof UI.ShineBorder === 'function') {
    return UI.ShineBorder(props);
  }
  return `<div class="s-shine-border"><div class="s-shine-border-inner">${props.children || ''}</div></div>`;
}
