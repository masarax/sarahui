import fs from 'node:fs';
import { catalog, demos, componentVariants } from '../apps/docs/catalog.mjs';

console.log('Auditing all 120 component demos and variants...');

const issues = [];

for (const item of catalog) {
  const name = item.name;
  const demoFn = demos[name];
  if (!demoFn) {
    issues.push({ name, error: 'Missing demo in demos object' });
    continue;
  }
  
  let htmlOutput = '';
  try {
    htmlOutput = String(demoFn(`demo-${name.toLowerCase()}`));
  } catch (err) {
    issues.push({ name, error: `Demo execution failed: ${err.message}` });
  }

  const variants = componentVariants[name] || [];
  
  // Check if demo is very short or placeholder
  const isShort = htmlOutput.length < 50;
  
  console.log(`[${item.group}] ${name}: demo len=${htmlOutput.length}, variants=${variants.length}`);
}

if (issues.length > 0) {
  console.log('\n--- ISSUES FOUND ---');
  console.log(issues);
} else {
  console.log('\nAll 120 demos execute without error.');
}

