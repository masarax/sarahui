import fs from 'node:fs';
import { catalog, demos, componentVariants } from '../apps/docs/catalog.mjs';

console.log('Inspecting all 120 demos and their markup quality...');

const inspected = catalog.map(c => {
  const html = String(demos[c.name](`demo-${c.name.toLowerCase()}`));
  const variants = componentVariants[c.name] || [];
  return {
    name: c.name,
    group: c.group,
    htmlLen: html.length,
    hasInlineStyle: html.includes('style='),
    hasMagicClass: html.includes('s-'),
    variantCount: variants.length
  };
});

console.log(JSON.stringify(inspected, null, 2));

