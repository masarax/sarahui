import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const componentsDir = path.join(root, 'packages/ui/src/components');
const aggregator = fs.readFileSync(path.join(componentsDir, 'index.js'), 'utf8');
const directories = fs.readdirSync(componentsDir, {withFileTypes: true})
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .sort();

assert.equal(directories.length, 120, 'expected 120 component directories');

for (const name of directories) {
  const dir = path.join(componentsDir, name);
  const files = ['index.js', `${name}.js`, `${name}.d.ts`, `${name}.test.mjs`, 'styles.css', 'README.md'];
  for (const file of files) {
    assert(fs.statSync(path.join(dir, file), {throwIfNoEntry: false})?.isFile(), `${name}/${file} is missing`);
  }

  const index = fs.readFileSync(path.join(dir, 'index.js'), 'utf8');
  assert.match(index, new RegExp(`export\\s*\\{[^}]*\\b${name}\\b[^}]*\\}\\s*from\\s*'\\./${name}\\.js'`), `${name}/index.js must export ${name} from ./${name}.js`);

  const implementation = fs.readFileSync(path.join(dir, `${name}.js`), 'utf8');
  assert.match(implementation, /import\s+\*\s+as\s+UI\s+from\s+'\.\.\/\.\.\/templates\.js'/, `${name}.js must import the shared template engine`);
  assert.match(implementation, new RegExp(`export\\s+function\\s+${name}\\s*\\(`), `${name}.js must define ${name}()`);
  assert.match(implementation, /return\s+`/, `${name}.js must retain a progressive-enhancement fallback`);

  const styles = fs.readFileSync(path.join(dir, 'styles.css'), 'utf8');
  assert.match(styles, /\.s-[a-z0-9-]+\s*\{/, `${name}/styles.css must contain scoped .s-* rules`);

  assert.match(aggregator, new RegExp(`export\\s*\\*\\s*from\\s*'\\./${name}/index\\.js'`), `${name} is missing from components/index.js`);
}

console.log(`Component contract verified for ${directories.length} modules.`);
