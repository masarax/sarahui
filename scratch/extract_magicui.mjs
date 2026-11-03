import fs from 'fs';
const content = fs.readFileSync('C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86/.system_generated/steps/14598/content.md', 'utf8');

const regex = /"code":\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const unescaped = match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
  if (unescaped.includes('IconCloud') || unescaped.includes('canvas')) {
    console.log('=== FOUND CODE ===');
    console.log(unescaped);
  }
}
