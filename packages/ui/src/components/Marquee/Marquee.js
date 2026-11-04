import * as UI from '../../templates.js';

export function Marquee(props = {}) {
  if (typeof UI.Marquee === 'function') {
    return UI.Marquee(props);
  }
  return `<div class="s-marquee" data-s-marquee="">${props.children || ''}</div>`;
}
