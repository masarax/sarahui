import fs from 'node:fs';
import * as m from '../apps/docs/registry-data.mjs';
const reg = m.registry;
const keys = Object.keys(reg);
console.log('registry entries', keys.length, 'exports', Object.keys(m));
const dummy = keys.filter(k => reg[k].demoTsx && reg[k].demoTsx.includes('function BentoDemo') && k !== 'BentoGrid');
console.log('bento dummies', dummy);
// detect duplicated demoTsx bodies
const byBody = new Map();
for (const k of keys) { const d = reg[k].demoTsx || ''; if (!byBody.has(d)) byBody.set(d, []); byBody.get(d).push(k); }
for (const [b, ks] of byBody) if (ks.length > 1) console.log('dup demo', ks, b.slice(0, 80));
const missing = keys.filter(k => !reg[k].demoTsx);
console.log('missing demo', missing);
// demo not mentioning own component name
const noName = keys.filter(k => reg[k].demoTsx && !reg[k].demoTsx.includes(k));
console.log('demo not referencing own name', noName);
console.log('toKebab', typeof m.toKebab === 'function' ? [m.toKebab('toString'), m.toKebab('__proto__'), m.toKebab('constructor'), m.toKebab(null)] : 'n/a');
const dirs = fs.readdirSync('packages/ui/src/components', { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
console.log('dirs', dirs.length, 'not in registry', dirs.filter(d => !keys.includes(d)), 'registry not dir', keys.filter(k => !dirs.includes(k)));
console.log('sample entry keys', Object.keys(reg[keys[0]]));
