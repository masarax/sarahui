import * as UI from '../../templates.js';

export function DottedMap(props = {}) {
  if (typeof UI.DottedMap === 'function') {
    return UI.DottedMap(props);
  }
  return `<div class="s-dotted-map-container" data-s-dotted-map="">${props.children || ''}</div>`;
}
