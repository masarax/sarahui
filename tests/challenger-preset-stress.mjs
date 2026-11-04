import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(fileURLToPath(import.meta.url), '../../');

console.log('=== CHALLENGER STRESS HARNESS: MILESTONE 1, ITERATION 2 ===\n');

let passCount = 0;
let failCount = 0;

async function runCheck(name, fn) {
  try {
    await fn();
    passCount++;
    console.log(`[PASS] ${name}`);
  } catch (err) {
    failCount++;
    console.error(`[FAIL] ${name}`);
    console.error(`       Error: ${err.message}`);
    if (err.stack) {
      const relevant = err.stack.split('\n').slice(1, 4).join('\n');
      console.error(`       ${relevant}`);
    }
  }
}

// 1. AST / Lexical Safety of packages/ui/src/tailwind-preset.js
await runCheck('Preset file contains no raw prematurely-closing block comment sequence */ inside JSDoc', async () => {
  const content = fs.readFileSync(path.join(root, 'packages/ui/src/tailwind-preset.js'), 'utf8');
  // Check comment block (lines 1 to 14)
  const commentMatch = content.match(/\/\*\*[\s\S]*?\*\//);
  assert.ok(commentMatch, 'JSDoc comment should exist');
  // In the comment body, check that no line has unescaped `*/`
  const lines = commentMatch[0].split('\n');
  for (let i = 1; i < lines.length - 1; i++) {
    const line = lines[i];
    // Strip leading `* `
    const stripped = line.replace(/^\s*\*\s?/, '');
    assert.ok(!stripped.includes('*/'), `Line ${i + 1} inside JSDoc comment has unescaped */: "${line}"`);
  }
});

// 2. ESM Import & Named Exports
let presetMod = null;
await runCheck('Preset module imports dynamically and exports identical default, preset, and sarahuiPreset', async () => {
  const presetPath = path.join(root, 'packages/ui/src/tailwind-preset.js');
  const mod = await import('file:///' + presetPath.replace(/\\/g, '/'));
  presetMod = mod;
  assert.ok(mod.default, 'Default export exists');
  assert.ok(mod.preset, 'Named export "preset" exists');
  assert.ok(mod.sarahuiPreset, 'Named export "sarahuiPreset" exists');
  assert.equal(mod.default, mod.preset, 'default export strictly equals preset');
  assert.equal(mod.default, mod.sarahuiPreset, 'default export strictly equals sarahuiPreset');
});

// 3. Theme Extension Integrity
await runCheck('Preset theme.extend structure conforms to Tailwind CSS requirements', async () => {
  const extend = presetMod.default.theme.extend;
  assert.ok(extend.colors && typeof extend.colors === 'object');
  assert.ok(extend.borderRadius && typeof extend.borderRadius === 'object');
  assert.ok(extend.boxShadow && typeof extend.boxShadow === 'object');
  assert.ok(extend.spacing && typeof extend.spacing === 'object');
  assert.ok(extend.animation && typeof extend.animation === 'object');
  assert.ok(extend.keyframes && typeof extend.keyframes === 'object');
});

// 4. Border Radius Enumerable vs Prototype Isolation
await runCheck('Border radius own keys are prefixed with sarah- and exclude any s-* collisions', async () => {
  const radii = presetMod.default.theme.extend.borderRadius;
  const ownKeys = Object.keys(radii);
  assert.ok(ownKeys.length > 0, 'Must have own keys');
  for (const k of ownKeys) {
    assert.ok(k.startsWith('sarah-'), `Own key "${k}" must start with "sarah-"`);
    assert.ok(!/^s-(none|sm|md|lg|xl|2xl|3xl|full|pill)$/.test(k), `Collision found: "${k}"`);
  }
});

await runCheck('Border radius backward compatibility properties resolve via prototype chain', async () => {
  const radii = presetMod.default.theme.extend.borderRadius;
  const legacyKeys = ['s-none', 's-xs', 's-sm', 's-md', 's-lg', 's-xl', 's-2xl', 's-3xl', 's-full', 's-pill'];
  for (const k of legacyKeys) {
    assert.ok(radii[k], `Legacy key "${k}" must be accessible`);
    assert.match(radii[k], /^var\(--s-radius-/, `Legacy key "${k}" must reference radius var`);
  }
});

// 5. CSS Custom Property Reference Validity against BOTH tokens.css and tokens/generated/sarah.css
await runCheck('All CSS variables in preset exist in both packages/ui/src/tokens.css and tokens/generated/sarah.css', async () => {
  const uiTokensCss = fs.readFileSync(path.join(root, 'packages/ui/src/tokens.css'), 'utf8');
  const genTokensCss = fs.readFileSync(path.join(root, 'tokens/generated/sarah.css'), 'utf8');

  function collectVars(obj) {
    let vars = [];
    for (const v of Object.values(obj)) {
      if (typeof v === 'string') {
        for (const m of v.matchAll(/var\((--s-[a-zA-Z0-9-]+)/g)) {
          vars.push(m[1]);
        }
      } else if (typeof v === 'object' && v !== null) {
        vars.push(...collectVars(v));
      }
    }
    return vars;
  }

  const allVars = collectVars(presetMod.default.theme.extend);
  assert.ok(allVars.length > 0, 'Should find CSS variables in preset');

  const missingUi = [];
  const missingGen = [];
  for (const varName of allVars) {
    if (!uiTokensCss.includes(varName + ':')) missingUi.push(varName);
    if (!genTokensCss.includes(varName + ':')) missingGen.push(varName);
  }

  assert.equal(missingUi.length, 0, `Missing in packages/ui/src/tokens.css: ${missingUi.join(', ')}`);
  assert.equal(missingGen.length, 0, `Missing in tokens/generated/sarah.css: ${missingGen.join(', ')}`);
});

// 6. Typings Validation: SarahComponentToken
await runCheck('SarahComponentToken is strictly typed in theme-tokens.d.ts, sarah.tokens.ts, and index.d.ts', async () => {
  const themeTokensDts = fs.readFileSync(path.join(root, 'packages/ui/src/theme-tokens.d.ts'), 'utf8');
  const indexDts = fs.readFileSync(path.join(root, 'packages/ui/src/index.d.ts'), 'utf8');
  const genTokensTs = fs.readFileSync(path.join(root, 'tokens/generated/sarah.tokens.ts'), 'utf8');

  assert.ok(themeTokensDts.includes('export type SarahComponentToken = keyof typeof sarahTokens.componentTokens;'));
  assert.ok(genTokensTs.includes('export type SarahComponentToken = keyof typeof sarahTokens.componentTokens;'));
  assert.ok(indexDts.includes('SarahComponentToken') && indexDts.includes('export type { SarahColorToken, SarahComponentToken } from "./theme-tokens.js";'));
});

// 7. Tailwind Preset TypeScript Definitions & Direct Consumer Compilation
await runCheck('tailwind-preset.d.ts exists and compiles cleanly with consumer tailwind.config.ts fixture', async () => {
  const dtsPath = path.join(root, 'packages/ui/src/tailwind-preset.d.ts');
  assert.ok(fs.existsSync(dtsPath), 'tailwind-preset.d.ts must exist');

  const tmpFixture = fs.mkdtempSync(path.join(os.tmpdir(), 'sarahui-challenger-preset-'));
  try {
    fs.writeFileSync(path.join(tmpFixture, 'package.json'), JSON.stringify({
      name: 'consumer-app',
      type: 'module'
    }));

    // Test a realistic tailwind.config.ts directly referencing local definitions
    const configTs = `
import type { SarahPreset } from '${path.join(root, 'packages/ui/src/tailwind-preset.d.ts').replace(/\\/g, '/')}';
import preset, { sarahuiPreset } from '${path.join(root, 'packages/ui/src/tailwind-preset.js').replace(/\\/g, '/')}';
import type { SarahComponentToken, SarahColorToken } from '${path.join(root, 'packages/ui/src/index.d.ts').replace(/\\/g, '/')}';

const token1: SarahComponentToken = 'button/radius';
const token2: SarahColorToken = 'text/primary';

const config: SarahPreset = {
  theme: {
    extend: {
      colors: preset.theme.extend.colors,
      borderRadius: sarahuiPreset.theme.extend.borderRadius,
    }
  }
};
export default config;
`;
    fs.writeFileSync(path.join(tmpFixture, 'tailwind.config.ts'), configTs);

    const tscBin = path.join(root, 'node_modules/typescript/bin/tsc');
    const result = spawnSync(process.execPath, [
      tscBin,
      '--noEmit',
      '--skipLibCheck',
      '--strict',
      '--target', 'ES2022',
      '--module', 'NodeNext',
      '--moduleResolution', 'NodeNext',
      'tailwind.config.ts'
    ], { cwd: tmpFixture, encoding: 'utf8' });

    assert.equal(result.status, 0, `tsc failed: ${result.stderr || result.stdout}`);
  } finally {
    fs.rmSync(tmpFixture, { recursive: true, force: true });
  }
});

// 8. Negative Test / Type Oracle: Invalid SarahComponentToken must be rejected by tsc
await runCheck('Type Oracle: Invalid SarahComponentToken is rejected at compile time', async () => {
  const tmpFixture = fs.mkdtempSync(path.join(os.tmpdir(), 'sarahui-challenger-oracle-'));
  try {
    fs.writeFileSync(path.join(tmpFixture, 'package.json'), JSON.stringify({
      name: 'oracle-app',
      type: 'module'
    }));

    const invalidTs = `
import type { SarahComponentToken } from '${path.join(root, 'packages/ui/src/theme-tokens.d.ts').replace(/\\/g, '/')}';

// This should fail typecheck:
const badToken: SarahComponentToken = 'non-existent/component-token';
console.log(badToken);
`;
    fs.writeFileSync(path.join(tmpFixture, 'invalid.ts'), invalidTs);

    const tscBin = path.join(root, 'node_modules/typescript/bin/tsc');
    const result = spawnSync(process.execPath, [
      tscBin,
      '--noEmit',
      '--skipLibCheck',
      '--strict',
      'invalid.ts'
    ], { cwd: tmpFixture, encoding: 'utf8' });

    assert.notEqual(result.status, 0, 'TypeScript MUST reject invalid SarahComponentToken');
    assert.match(result.stdout + result.stderr, /Type '"non-existent\/component-token"' is not assignable to type/);
  } finally {
    fs.rmSync(tmpFixture, { recursive: true, force: true });
  }
});

// 9. Negative Test / Type Oracle: Invalid SarahColorToken must be rejected by tsc
await runCheck('Type Oracle: Invalid SarahColorToken is rejected at compile time', async () => {
  const tmpFixture = fs.mkdtempSync(path.join(os.tmpdir(), 'sarahui-challenger-oracle2-'));
  try {
    fs.writeFileSync(path.join(tmpFixture, 'package.json'), JSON.stringify({
      name: 'oracle-app-2',
      type: 'module'
    }));

    const invalidTs = `
import type { SarahColorToken } from '${path.join(root, 'packages/ui/src/theme-tokens.d.ts').replace(/\\/g, '/')}';

// This should fail typecheck:
const badColor: SarahColorToken = 'fake/color/token';
console.log(badColor);
`;
    fs.writeFileSync(path.join(tmpFixture, 'invalid.ts'), invalidTs);

    const tscBin = path.join(root, 'node_modules/typescript/bin/tsc');
    const result = spawnSync(process.execPath, [
      tscBin,
      '--noEmit',
      '--skipLibCheck',
      '--strict',
      'invalid.ts'
    ], { cwd: tmpFixture, encoding: 'utf8' });

    assert.notEqual(result.status, 0, 'TypeScript MUST reject invalid SarahColorToken');
    assert.match(result.stdout + result.stderr, /Type '"fake\/color\/token"' is not assignable to type/);
  } finally {
    fs.rmSync(tmpFixture, { recursive: true, force: true });
  }
});

// 10. Keyframe Mapping Completeness
await runCheck('Every animation references an existing keyframe and animation definitions are well-formed', async () => {
  const anims = presetMod.default.theme.extend.animation;
  const kfs = presetMod.default.theme.extend.keyframes;

  for (const [name, val] of Object.entries(anims)) {
    assert.ok(typeof val === 'string' && val.length > 0, `Animation "${name}" is not a valid string`);
    const kfName = val.trim().split(/\s+/)[0];
    assert.ok(kfs[kfName], `Animation "${name}" references keyframe "${kfName}" which is missing from keyframes`);
  }
});

// 11. Packed Tarball Consumer: import 'sarahui/tailwind-preset' in ESM and TS
await runCheck('Packed tarball consumer imports sarahui/tailwind-preset in both ESM and TypeScript', async () => {
  const npmBin = process.env.npm_execpath || (process.platform === 'win32' ? 'npm.cmd' : 'npm');
  const tgzPath = path.join(root, 'artifacts/npm/sarahui-0.1.0.tgz');
  assert.ok(fs.existsSync(tgzPath), 'npm tarball sarahui-0.1.0.tgz must exist in artifacts/npm');

  const tmpFixture = fs.mkdtempSync(path.join(os.tmpdir(), 'sarahui-tarball-consumer-'));
  try {
    fs.writeFileSync(path.join(tmpFixture, 'package.json'), JSON.stringify({
      name: 'tarball-consumer-app',
      type: 'module'
    }));

    const installRes = spawnSync(npmBin, [
      'install',
      `"${tgzPath}"`,
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      '--package-lock=false'
    ], { cwd: tmpFixture, encoding: 'utf8', shell: true });
    assert.equal(installRes.status, 0, `npm install failed: ${installRes.stderr}`);

    // Test ESM import from node_modules
    const consumerJs = `
import assert from 'node:assert/strict';
import preset, { sarahuiPreset } from 'sarahui/tailwind-preset';
import presetAlias from 'sarahui/tailwind';

assert.ok(preset && preset.theme && preset.theme.extend);
assert.equal(preset, sarahuiPreset);
assert.equal(preset, presetAlias);
console.log('Tarball ESM consumer verified');
`;
    fs.writeFileSync(path.join(tmpFixture, 'consumer.mjs'), consumerJs);

    const jsRes = spawnSync(process.execPath, ['consumer.mjs'], { cwd: tmpFixture, encoding: 'utf8' });
    assert.equal(jsRes.status, 0, `JS import failed: ${jsRes.stderr}`);
    assert.ok(jsRes.stdout.includes('Tarball ESM consumer verified'));

    // Test TypeScript resolution from node_modules
    const consumerTs = `
import preset, { sarahuiPreset } from 'sarahui/tailwind-preset';
import type { SarahPreset } from 'sarahui/tailwind-preset';
import type { SarahComponentToken, SarahColorToken } from 'sarahui';

const p: SarahPreset = preset;
const c: SarahComponentToken = 'button/radius';
console.log(p.theme.extend.colors, c);
`;
    fs.writeFileSync(path.join(tmpFixture, 'consumer.ts'), consumerTs);

    const tscBin = path.join(root, 'node_modules/typescript/bin/tsc');
    const tsRes = spawnSync(process.execPath, [
      tscBin,
      '--noEmit',
      '--skipLibCheck',
      '--strict',
      '--target', 'ES2022',
      '--module', 'NodeNext',
      '--moduleResolution', 'NodeNext',
      'consumer.ts'
    ], { cwd: tmpFixture, encoding: 'utf8' });
    assert.equal(tsRes.status, 0, `TS import failed: ${tsRes.stderr || tsRes.stdout}`);
  } finally {
    fs.rmSync(tmpFixture, { recursive: true, force: true });
  }
});

console.log(`\n========================================`);
console.log(`STRESS RESULTS: ${passCount} passed, ${failCount} failed.`);
console.log(`========================================`);

if (failCount > 0) {
  process.exit(1);
}

