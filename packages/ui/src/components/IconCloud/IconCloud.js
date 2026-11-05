import * as UI from '../../templates.js';

export function IconCloud(props = {}) {
  if (typeof UI.IconCloud === 'function') {
    return UI.IconCloud(props);
  }
  return `<div class="s-icon-cloud-wrap"><canvas class="s-icon-cloud-canvas" data-s-icon-cloud=""></canvas></div>`;
}
