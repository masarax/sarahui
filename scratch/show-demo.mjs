import { registry } from '../apps/docs/registry-data.mjs';
for (const n of process.argv.slice(2)) { console.log('=== ' + n); console.log(registry[n].demoTsx); console.log(JSON.stringify(registry[n].props)); }
