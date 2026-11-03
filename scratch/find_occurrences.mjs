import fs from 'fs';
const content = fs.readFileSync('C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86/.system_generated/steps/14598/content.md', 'utf8');

let pos = 0;
while (true) {
  const idx = content.indexOf('IconCloud', pos);
  if (idx === -1) break;
  console.log('--- FOUND AT ' + idx + ' ---');
  console.log(content.slice(Math.max(0, idx - 100), Math.min(content.length, idx + 600)));
  pos = idx + 10;
}
