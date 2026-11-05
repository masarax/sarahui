import * as UI from '../../templates.js';

export function HeroVideoDialog(props = {}) {
  if (typeof UI.HeroVideoDialog === 'function') {
    return UI.HeroVideoDialog(props);
  }
  return `<div class="s-hero-video-wrap">${props.children || ''}</div>`;
}
