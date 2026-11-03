import fs from 'fs';
const content = fs.readFileSync('C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86/.system_generated/steps/14598/content.md', 'utf8');

const key = 'relative inline-block';
const idx = content.indexOf(key);
if (idx !== -1) {
  console.log(content.slice(idx - 50, idx + 600).replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\u003c/g, '<').replace(/\\u003e/g, '>').replace(/\\&/g, '&'));
}
