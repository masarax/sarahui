import fs from 'fs';
const content = fs.readFileSync('C:/Users/Marketing/.gemini/antigravity/brain/b1852804-c4a7-4b37-a4c8-120b7a58db86/.system_generated/steps/14598/content.md', 'utf8');

const idx = content.indexOf('\"use client\"\\n\\nimport React, { useEffect, useRef, useState } from \"react\"');
if (idx !== -1) {
  const endIdx = content.indexOf('</pre>', idx);
  console.log(content.slice(idx, idx + 10000).replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\u003c/g, '<').replace(/\\u003e/g, '>').replace(/\\&/g, '&'));
}
