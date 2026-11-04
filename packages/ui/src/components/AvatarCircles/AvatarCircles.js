import * as UI from '../../templates.js';

export function AvatarCircles(props = {}) {
  if (typeof UI.AvatarCircles === 'function') {
    return UI.AvatarCircles(props);
  }
  return `<div class="s-avatar-circles">${props.children || ''}</div>`;
}
