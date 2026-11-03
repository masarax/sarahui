import { catalog, componentVariants } from '../apps/docs/catalog.mjs';

let duplicates = 0;
let errors = 0;
let totalVariants = 0;
const duplicateList = [];

for (const item of catalog) {
  const variants = componentVariants[item.name];
  if (!variants || variants.length === 0) {
    console.error('Missing variants for:', item.name);
    errors++;
    continue;
  }
  const rendered = [];
  variants.forEach((v, idx) => {
    totalVariants++;
    try {
      const out = typeof v.preview === 'function' ? String(v.preview()) : '';
      if (!out || out.trim() === '') {
        console.error(`Empty preview for ${item.name} variant ${idx} (${v.title})`);
        errors++;
      }
      rendered.push(out);
    } catch (e) {
      console.error(`Error evaluating preview for ${item.name} variant ${idx}:`, e.message);
      errors++;
    }
  });

  if (rendered.length > 1) {
    for (let i = 0; i < rendered.length; i++) {
      for (let j = i + 1; j < rendered.length; j++) {
        if (rendered[i] === rendered[j]) {
          duplicateList.push({
            component: item.name,
            variantA: `${i} (${variants[i].title})`,
            variantB: `${j} (${variants[j].title})`
          });
          duplicates++;
        }
      }
    }
  }
}

console.log(`\nVerification Complete!`);
console.log(`Total components checked: ${catalog.length}`);
console.log(`Total variants evaluated: ${totalVariants}`);
console.log(`Errors: ${errors}`);
console.log(`Duplicates: ${duplicates}`);

if (duplicateList.length > 0) {
  console.log('\nDuplicates Found:');
  duplicateList.forEach(d => {
    console.log(`- ${d.component}: [${d.variantA}] matches [${d.variantB}]`);
  });
}

