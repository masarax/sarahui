import { buildSite } from '../apps/docs/site.mjs';

const html = String(buildSite());
let idx = 0;
while ((idx = html.indexOf('id="npm-Confetti"', idx)) !== -1) {
  console.log('Found at:', idx);
  console.log(html.substring(Math.max(0, idx - 150), Math.min(html.length, idx + 150)));
  idx += 'npm-Confetti'.length;
}
