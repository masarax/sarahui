import { readFileSync } from 'fs';

const indexJs = readFileSync('packages/ui/src/index.js', 'utf8');
const tmplJs = readFileSync('packages/ui/src/templates.js', 'utf8');
const catMjs = readFileSync('apps/docs/catalog.mjs', 'utf8');

const regex = /root\.querySelectorAll\((['"`])(.*?)\1\)/g;
let match;
const selectors = new Set();
while ((match = regex.exec(indexJs)) !== null) {
  selectors.add(match[2]);
}

console.log(`Found ${selectors.size} querySelectorAll calls in index.js:`);
for (const sel of Array.from(selectors).sort()) {
  const inTmpl = tmplJs.includes(sel) || (sel.startsWith('[') && tmplJs.includes(sel.replace(/[\[\]]/g, '')));
  const inCat = catMjs.includes(sel) || (sel.startsWith('[') && catMjs.includes(sel.replace(/[\[\]]/g, '')));
  console.log(`${sel.padEnd(45)} -> in templates: ${inTmpl ? 'YES' : 'NO'}, in catalog: ${inCat ? 'YES' : 'NO'}`);
}

