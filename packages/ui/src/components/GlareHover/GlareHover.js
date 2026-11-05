import * as UI from '../../templates.js';

export function GlareHover(props = {}) {
  if (typeof UI.GlareHover === 'function') {
    return UI.GlareHover(props);
  }
  return `<div class="s-glare-hover"><div class="s-glare-hover-surface">${props.children || ''}</div></div>`;
}
