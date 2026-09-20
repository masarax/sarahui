import { componentVariants } from '../apps/docs/catalog.mjs';

const allIds = [];
for (const [comp, vars] of Object.entries(componentVariants)) {
  for (const v of vars) {
    if (v.preview) {
      const html = v.preview();
      const str = typeof html === 'string' ? html : (html ? String(html) : '');
      const ids = [...str.matchAll(/id="([^"]+)"/g)].map(x => x[1]);
      if (ids.length > 0) {
        allIds.push({ comp, title: v.title, ids });
      }
    }
  }
}
console.log('Specimen preview IDs:', allIds);

