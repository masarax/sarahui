import fs from 'node:fs';
import { componentVariants } from '../apps/docs/catalog.mjs';

const audit = JSON.parse(fs.readFileSync('scripts/magicui_audit.json', 'utf8'));

let matchCount = 0;
let diffCount = 0;

for (const item of audit) {
  let pascal = item.slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  if (pascal === 'Iphone') pascal = 'Iphone';
  if (!componentVariants[pascal]) {
    // Try uppercase variants
    const foundKey = Object.keys(componentVariants).find(k => k.toLowerCase() === pascal.toLowerCase());
    if (foundKey) pascal = foundKey;
  }
  const variants = componentVariants[pascal] || [];
  const docExamplesCount = item.examples.length;
  const ourVariantsCount = variants.length;
  
  if (docExamplesCount > 0) {
    console.log(`[${pascal}] MagicUI doc examples (${docExamplesCount}):`, item.examples.map(e => e.title).join(' | '));
    console.log(`   SarahUI variants (${ourVariantsCount}):`, variants.map(v => v.title).join(' | '));
  }
}

