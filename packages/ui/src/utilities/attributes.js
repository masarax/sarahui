import { escapeText, safeHref } from './render.js';

const allowed = new Set('id class style name title type value placeholder required disabled checked min max step autocomplete rows role tabindex href download target rel selected hidden open multiple pattern minlength maxlength form inputmode readonly for autofocus cols wrap dir lang accept list size'.split(' '));

export function attributes(props = {}) {
  return Object.entries(props).map(([key, value]) => {
    if ((!allowed.has(key) && !/^(aria|data)-[a-z0-9-]+$/.test(key)) || value == null || (value === false && !key.startsWith('aria-'))) return '';
    if (key === 'href') value = safeHref(value);
    return value === true && !key.startsWith('aria-') ? ' ' + key : ' ' + key + '="' + escapeText(value) + '"';
  }).join('');
}
