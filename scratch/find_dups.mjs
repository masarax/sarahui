import { buildSite } from '../apps/docs/site.mjs';

const html = String(buildSite());
const matches = [...html.matchAll(/(?<=\s)id="([^"]+)"/g)].map(m => m[1]);
const counts = {};
for (const id of matches) {
  counts[id] = (counts[id] || 0) + 1;
}
const dups = Object.entries(counts).filter(([id, c]) => c > 1);
console.log('Total unique IDs:', Object.keys(counts).length);
console.log('Duplicates count:', dups.length);
for (const [id, count] of dups) {
  console.log(`ID: "${id}" appears ${count} times`);
}
