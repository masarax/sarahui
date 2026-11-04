import fs from 'node:fs';
import { registry } from '../apps/docs/registry-data.mjs';

const src = fs.readFileSync('packages/ui/src/templates.js', 'utf8');

function splitTop(s) {
  const out = []; let depth = 0, cur = '', q = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) { cur += c; if (c === q && s[i - 1] !== '\\') q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; cur += c; continue; }
    if ('([{'.includes(c)) depth++;
    if (')]}'.includes(c)) depth--;
    if (c === ',' && depth === 0) { out.push(cur); cur = ''; continue; }
    cur += c;
  }
  if (cur.trim()) out.push(cur);
  return out;
}

export function templateParams(name) {
  if (['Checkbox', 'Radio', 'Switch'].includes(name)) return ['id', 'label', 'description', 'checked', 'disabled', 'attrs'];
  const re = new RegExp(`export (?:function ${name}\\s*\\(|const ${name}\\s*=\\s*\\()`);
  const m = re.exec(src);
  if (!m) return null;
  let i = m.index + m[0].length;
  while (/\s/.test(src[i])) i++;
  if (src[i] !== '{') return [];
  let depth = 0, start = i, q = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === q && src[i - 1] !== '\\') q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') depth++;
    if (c === '}') { depth--; if (depth === 0) break; }
  }
  const inner = src.slice(start + 1, i);
  return splitTop(inner).map(p => p.trim().replace(/^\.\.\./, '').split(/[=:]/)[0].trim()).filter(Boolean);
}

function jsxProps(tsx, name) {
  const props = new Set();
  const re = new RegExp(`<${name}(?![A-Za-z0-9.])`, 'g');
  let m;
  while ((m = re.exec(tsx))) {
    let i = m.index + m[0].length, depth = 0, q = null, buf = '';
    for (; i < tsx.length; i++) {
      const c = tsx[i];
      if (q) { buf += ' '; if (c === q) q = null; continue; }
      if (depth === 0 && (c === '"' || c === "'")) { q = c; buf += ' '; continue; }
      if (c === '{') { depth++; buf += ' '; continue; }
      if (c === '}') { depth--; buf += ' '; continue; }
      if (depth > 0) { buf += ' '; continue; }
      if (c === '>') break;
      buf += c;
    }
    for (const a of buf.matchAll(/([A-Za-z_][\w-]*)\s*=/g)) props.add(a[1]);
    for (const a of buf.replace(/[A-Za-z_][\w-]*\s*=/g, ' ').matchAll(/\b([A-Za-z_][\w-]*)\b/g)) if (a[1] !== '/') props.add(a[1]);
  }
  return [...props];
}

const ignore = new Set(['className', 'class', 'children', 'attrs', 'key', 'style', 'id', 'ref']);
const report = {};
for (const [name, item] of Object.entries(registry)) {
  const params = templateParams(name);
  const used = jsxProps(item.demoTsx || '', name).filter(p => !ignore.has(p) && !p.startsWith('aria-') && !p.startsWith('data-'));
  const regProps = (item.props || []).flatMap(t => t.rows.map(r => r.prop));
  const unknown = params ? used.filter(p => !params.includes(p)) : used;
  const regUnknown = params ? regProps.filter(p => !ignore.has(p) && !params.includes(p)) : [];
  if (!params || unknown.length || regUnknown.length || used.length === 0) {
    report[name] = { params, used, unknown, regUnknown };
  }
}
if (process.argv[2] !== 'quiet') {
  for (const [k, v] of Object.entries(report)) console.log(k, JSON.stringify(v));
  console.log('flagged', Object.keys(report).length);
}
export { report };
