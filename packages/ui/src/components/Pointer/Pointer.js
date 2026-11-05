import * as UI from '../../templates.js';

export function Pointer(props = {}) {
  if (typeof UI.Pointer === 'function') {
    return UI.Pointer(props);
  }
  return `<div class="s-custom-pointer-wrap" data-s-pointer="">${props.children || ''}</div>`;
}
