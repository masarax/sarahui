import * as m from '../apps/docs/registry-data.mjs';
const bad = Object.values(m.registry).filter(i => m.toKebab(i.name) !== i.slug).map(i => [i.name, i.slug, m.toKebab(i.name)]);
console.log('slug mismatches', bad);
console.log(['__proto__', 'constructor', 'toString', 'hasOwnProperty'].map(k => [k, m.toKebab(k), m.getRegistryItem(k), typeof m.getComponentTsx(k)]));
console.log(m.toKebab('HTMLElement'), m.sanitizeTsx(123), m.sanitizeTsx('https://cdn.magicui.design/ocean-small.webm magicui'));
