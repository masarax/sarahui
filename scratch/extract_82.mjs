import fs from 'fs';
const content = fs.readFileSync('C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86/.system_generated/steps/14598/content.md', 'utf8');

// Find 82:
const idx = content.indexOf('82:');
if (idx !== -1) {
  console.log(content.slice(idx, idx + 4000));
} else {
  console.log('82: not found');
}
