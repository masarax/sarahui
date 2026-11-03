import { catalog, componentVariants } from '../apps/docs/catalog.mjs';

console.log(`Total components in catalog: ${catalog.length}`);

const missing = [];
const singleVariant = [];
const multiVariants = [];

for (const item of catalog) {
  const v = componentVariants[item.name];
  if (!v || v.length === 0) {
    missing.push(item.name);
  } else if (v.length === 1) {
    singleVariant.push(item.name);
  } else {
    multiVariants.push({ name: item.name, count: v.length });
  }
}

console.log(`Components with multi variants (${multiVariants.length}):`);
multiVariants.forEach(m => console.log(`  - ${m.name}: ${m.count} examples`));

console.log(`\nComponents missing variants (${missing.length}):`, missing);
console.log(`\nComponents with single variant (${singleVariant.length}):`, singleVariant);

