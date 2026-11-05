import * as UI from '../../templates.js';

export function BentoGrid(props = {}) {
  if (typeof UI.BentoGrid === 'function') {
    return UI.BentoGrid(props);
  }
  return `<div class="s-bento-grid">${props.children || ''}</div>`;
}

export function BentoCard(props = {}) {
  if (typeof UI.BentoCard === 'function') {
    return UI.BentoCard(props);
  }
  return `<article class="s-bento-card">${props.children || ''}</article>`;
}
