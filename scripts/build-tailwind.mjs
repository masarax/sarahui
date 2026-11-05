import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(root, 'node_modules', '@tailwindcss', 'cli', 'dist', 'index.mjs');
const input = path.join(root, 'packages', 'ui', 'src', 'tailwind.source.css');
const output = path.join(root, 'packages', 'ui', 'src', 'tailwind.generated.css');

const result = spawnSync(process.execPath, [cli, '-i', input, '-o', output, '--minify'], {
  cwd: root,
  encoding: 'utf8',
  env: process.env
});

if (result.status !== 0) {
  process.stderr.write(result.stderr || result.stdout || 'Tailwind build failed.\n');
  process.exit(result.status || 1);
}

console.log('sarahUI: compiled Tailwind component utilities.');
