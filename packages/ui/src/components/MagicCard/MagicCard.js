import * as UI from '../../templates.js';

export function MagicCard(props = {}) {
  if (typeof UI.MagicCard === 'function') {
    return UI.MagicCard(props);
  }
  return `<div class="s-magic-card" data-s-magic-card="true"><div class="s-magic-card-content">${props.children || ''}</div></div>`;
}
