import { catalog, catalogOrder, categories, demos, componentVariants } from '../apps/docs/catalog.mjs';

console.log(`Total catalog components: ${catalog.length}`);
const groupMap = {};
for (const c of catalog) {
  if (!groupMap[c.group]) groupMap[c.group] = [];
  groupMap[c.group].push(c.name);
}

for (const [group, names] of Object.entries(groupMap)) {
  console.log(`\n=== Group: ${group} (${names.length}) ===`);
  console.log(names.join(', '));
}

