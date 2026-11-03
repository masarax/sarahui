import fs from 'fs';
const content = fs.readFileSync('C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86/.system_generated/steps/14598/content.md', 'utf8');

const key = '82:T2b26,';
const idx = content.indexOf(key);
if (idx !== -1) {
  const raw = content.slice(idx + key.length + 15 + 4500, idx + key.length + 15 + 11000);
  console.log(raw.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\u003c/g, '<').replace(/\\u003e/g, '>').replace(/\\&/g, '&'));
}
