import { buildSite } from '../apps/docs/site.mjs';

const html = buildSite();
const idMatches = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
const counts = {};
for (const id of idMatches) counts[id] = (counts[id] || 0) + 1;
const duplicates = Object.entries(counts).filter(([id, c]) => c > 1);
console.log('Duplicates in buildSite:', duplicates);

