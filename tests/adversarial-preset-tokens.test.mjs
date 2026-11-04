/**
 * Challenger Adversarial Stress Test Suite
 * Milestone 1, Iteration 2: Tailwind Preset & Token Taxonomy Validation
 * 
 * Verifies:
 * 1. Preset import semantics, default/named exports, and lexical safety.
 * 2. structuredClone & JSON serialization resilience.
 * 3. borderRadius prototype isolation, own-property enumerability, and collision immunity.
 * 4. Exhaustive CSS custom property oracle against tokens.css and sarah.css.
 * 5. Animation <-> Keyframe bidirectional mapping.
 * 6. Isolated consumer TypeScript compilation in both NodeNext and Bundler modes.
 * 7. Exhaustive componentToken typing coverage for all 54 tokens.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(fileURLToPath(import.meta.url), '../../');

describe('Challenger Suite 1: Lexical Safety & Module Semantics', async () => {
  const presetFile = path.join(root, 'packages/ui/src/tailwind-preset.js');

  test('Preset source file contains zero unescaped comment closing sequences in comments', () => {
    const raw = fs.readFileSync(presetFile, 'utf8');
    // Verify that the JSDoc block comment before line 15 is properly closed only once
    const firstCommentEnd = raw.indexOf('*/');
    assert.ok(firstCommentEnd > 0, 'JSDoc comment must terminate');
    const commentBody = raw.slice(0, firstCommentEnd);
    assert.ok(commentBody.includes('content: ["./src/**\\/*.{html,js,ts,jsx,tsx}"]'), 'Glob pattern must be escaped with \\/*');
    // Ensure no secondary unexpected */ appears in the file outside comments
    const remainder = raw.slice(firstCommentEnd + 2);
    assert.ok(!remainder.includes('*/'), 'No stray comment closing delimiter in remainder of file');
  });

  test('Preset exports both default and named exports (preset, sarahuiPreset)', async () => {
    const mod = await import(pathToFileURL(presetFile).href + `?cachebust=${Date.now()}`);
    assert.ok(mod.default, 'Default export exists');
    assert.ok(mod.sarahuiPreset, 'Named export sarahuiPreset exists');
    assert.ok(mod.preset, 'Named export preset exists');
    assert.equal(mod.default, mod.preset, 'Default export matches preset');
    assert.equal(mod.sarahuiPreset, mod.preset, 'Named export sarahuiPreset matches preset');
  });

  test('Preset can be serialized via JSON.stringify without cyclical errors', async () => {
    const mod = await import(pathToFileURL(presetFile).href);
    const serialized = JSON.stringify(mod.default);
    assert.ok(typeof serialized === 'string', 'Serialization succeeds');
    const parsed = JSON.parse(serialized);
    assert.ok(parsed.theme.extend.colors.sarah, 'Colors survived serialization');
    assert.ok(parsed.theme.extend.borderRadius['sarah-md'], 'BorderRadius survived serialization');
  });

  test('Preset can be cloned via structuredClone without throwing', async () => {
    const mod = await import(pathToFileURL(presetFile).href);
    const cloned = structuredClone(mod.default);
    assert.ok(cloned.theme.extend.colors.sarah.brand, 'Cloned preset has colors');
    assert.equal(cloned.theme.extend.colors.sarah.brand, mod.default.theme.extend.colors.sarah.brand);
  });
});

describe('Challenger Suite 2: borderRadius Prototype Isolation & Utility Collision Immunity', async () => {
  const presetFile = path.join(root, 'packages/ui/src/tailwind-preset.js');
  const mod = await import(pathToFileURL(presetFile).href);
  const radii = mod.default.theme.extend.borderRadius;

  test('Own enumerable keys of borderRadius are strictly prefixed with "sarah-"', () => {
    const ownKeys = Object.keys(radii);
    assert.ok(ownKeys.length >= 10, `Expected at least 10 radius keys, got ${ownKeys.length}`);
    for (const key of ownKeys) {
      assert.ok(key.startsWith('sarah-'), `Key "${key}" must start with "sarah-" to prevent collision with rounded-s-*`);
    }
  });

  test('Zero own property names collide with Tailwind CSS v3.3+ logical start modifier (rounded-s-*)', () => {
    const ownProps = Object.getOwnPropertyNames(radii);
    const collisions = ownProps.filter(k => /^s-(none|xs|sm|md|lg|xl|2xl|3xl|full|pill)$/.test(k));
    assert.equal(collisions.length, 0, `Found collisions in own properties: ${collisions.join(', ')}`);
  });

  test('Legacy s-* keys are accessible via prototype inheritance for backwards compatibility', () => {
    const legacyKeys = ['s-none', 's-xs', 's-sm', 's-md', 's-lg', 's-xl', 's-2xl', 's-3xl', 's-full', 's-pill'];
    for (const lk of legacyKeys) {
      assert.ok(radii[lk] !== undefined, `Legacy key ${lk} must be accessible on borderRadius`);
      assert.match(radii[lk], /^var\(--s-radius-/, `Legacy key ${lk} must point to --s-radius var`);
      assert.equal(Object.prototype.hasOwnProperty.call(radii, lk), false, `Legacy key ${lk} must NOT be an own property`);
    }
  });

  test('Object spread ({ ...radii }) copies only non-colliding sarah-* keys', () => {
    const spread = { ...radii };
    const spreadKeys = Object.keys(spread);
    for (const k of spreadKeys) {
      assert.ok(k.startsWith('sarah-'), `Spread key "${k}" must start with "sarah-"`);
    }
    assert.equal(spread['s-sm'], undefined, 's-sm must not be copied by object spread');
  });
});

describe('Challenger Suite 3: CSS Variable Oracle & Completeness', async () => {
  const presetFile = path.join(root, 'packages/ui/src/tailwind-preset.js');
  const mod = await import(pathToFileURL(presetFile).href);
  const extend = mod.default.theme.extend;

  const tokensCssPath = path.join(root, 'packages/ui/src/tokens.css');
  const tokensCss = fs.readFileSync(tokensCssPath, 'utf8');

  const generatedCssPath = path.join(root, 'tokens/generated/sarah.css');
  const generatedCss = fs.readFileSync(generatedCssPath, 'utf8');

  function collectAllVars(obj) {
    const results = [];
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === 'string') {
        const matches = [...v.matchAll(/var\((--s-[a-zA-Z0-9_-]+)(?:,\s*([^)]+))?\)/g)];
        for (const m of matches) {
          results.push({ path: k, varName: m[1], fallback: m[2] });
        }
      } else if (typeof v === 'object' && v !== null) {
        for (const child of collectAllVars(v)) {
          results.push({ path: `${k}.${child.path}`, varName: child.varName, fallback: child.fallback });
        }
      }
    }
    return results;
  }

  const allVars = collectAllVars(extend);

  test(`Exhaustive check: all ${allVars.length} referenced CSS variables exist in tokens.css`, () => {
    assert.ok(allVars.length > 0, 'Must have found CSS variables in preset');
    const missing = [];
    for (const item of allVars) {
      if (!tokensCss.includes(`${item.varName}:`)) {
        missing.push(item);
      }
    }
    assert.equal(missing.length, 0, `Missing in tokens.css: ${missing.map(m => `${m.path} -> ${m.varName}`).join(', ')}`);
  });

  test(`Exhaustive check: all ${allVars.length} referenced CSS variables exist in tokens/generated/sarah.css`, () => {
    const missing = [];
    for (const item of allVars) {
      if (!generatedCss.includes(`${item.varName}:`)) {
        missing.push(item);
      }
    }
    assert.equal(missing.length, 0, `Missing in sarah.css: ${missing.map(m => `${m.path} -> ${m.varName}`).join(', ')}`);
  });

  test('All fallback values are syntactically non-empty and valid CSS literals', () => {
    for (const item of allVars) {
      if (item.fallback !== undefined) {
        const fb = item.fallback.trim();
        assert.ok(fb.length > 0, `Fallback for ${item.varName} cannot be empty`);
        assert.ok(!fb.includes('undefined'), `Fallback for ${item.varName} cannot be "undefined"`);
        assert.ok(!fb.includes('null'), `Fallback for ${item.varName} cannot be "null"`);
      }
    }
  });
});

describe('Challenger Suite 4: Keyframe & Animation Mapping Oracle', async () => {
  const presetFile = path.join(root, 'packages/ui/src/tailwind-preset.js');
  const mod = await import(pathToFileURL(presetFile).href);
  const anims = mod.default.theme.extend.animation || {};
  const kfs = mod.default.theme.extend.keyframes || {};

  test('Every animation shorthand references a defined keyframe name', () => {
    for (const [animName, animVal] of Object.entries(anims)) {
      const parts = animVal.trim().split(/\s+/);
      const kfName = parts[0];
      assert.ok(kfs[kfName] !== undefined, `Animation "${animName}" references keyframe "${kfName}" which must exist in keyframes`);
      assert.ok(typeof kfs[kfName] === 'object', `Keyframe "${kfName}" must be an object definition`);
    }
  });

  test('All keyframe rules contain valid stop selectors and non-empty property blocks', () => {
    for (const [kfName, stops] of Object.entries(kfs)) {
      const stopKeys = Object.keys(stops);
      assert.ok(stopKeys.length > 0, `Keyframe "${kfName}" must have at least one stop`);
      for (const stopKey of stopKeys) {
        assert.match(stopKey, /^(from|to|\d+%(?:,\s*\d+%)*)$/, `Stop "${stopKey}" in "${kfName}" must be from, to, or percentage`);
        const decls = stops[stopKey];
        assert.ok(typeof decls === 'object' && Object.keys(decls).length > 0, `Declarations at stop "${stopKey}" in "${kfName}" cannot be empty`);
      }
    }
  });
});

describe('Challenger Suite 5: Consumer TypeScript Isolation & 54 Component Tokens Oracle', async () => {
  const resolvedTokensPath = path.join(root, 'tokens/generated/sarah.resolved.json');
  const resolved = JSON.parse(fs.readFileSync(resolvedTokensPath, 'utf8'));
  const componentTokenKeys = Object.keys(resolved.componentTokens || {});

  test('componentTokens has exactly 54 audited tokens covering all 21 components', () => {
    assert.equal(componentTokenKeys.length, 54, `Expected 54 component tokens, got ${componentTokenKeys.length}`);
  });

  test('Strict TypeScript consumer test with NodeNext resolution compiling preset and all 54 component tokens', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'challenger-consumer-nodenext-'));
    try {
      const packageJson = {
        name: 'challenger-consumer',
        version: '1.0.0',
        type: 'module',
        dependencies: {
          sarahui: `file:${path.join(root, 'packages/ui')}`
        }
      };
      fs.writeFileSync(path.join(tempDir, 'package.json'), JSON.stringify(packageJson, null, 2));

      // Construct consumer code testing:
      // 1. Preset import (both default and named)
      // 2. SarahPreset interface type
      // 3. SarahComponentToken exhaustive array validation
      // 4. Negative test rejecting invalid token
      const tokenArrayLiteral = componentTokenKeys.map(k => `  '${k}'`).join(',\n');
      const consumerTs = `
import sarahuiPreset, { preset, sarahuiPreset as sp } from 'sarahui/tailwind-preset';
import type { SarahPreset } from 'sarahui/tailwind-preset';
import { sarahTokens, type SarahColorToken, type SarahComponentToken } from 'sarahui/tokens';
import { type SarahComponentToken as SctRoot } from 'sarahui';

const p1: SarahPreset = sarahuiPreset;
const p2: SarahPreset = preset;
const p3: SarahPreset = sp;

// Exhaustive test: all 54 component tokens must satisfy SarahComponentToken
const allAuditedTokens: SarahComponentToken[] = [
${tokenArrayLiteral}
];

const rootTypedToken: SctRoot = 'terminal/bg';

console.log(p1.theme.extend, allAuditedTokens.length, rootTypedToken);

// @ts-expect-error Non-existent token must be rejected by TypeScript
const invalidToken: SarahComponentToken = 'invalid/not-a-component-token';
`;
      fs.writeFileSync(path.join(tempDir, 'consumer.ts'), consumerTs);

      // Symlink or install packages/ui into node_modules/sarahui
      fs.mkdirSync(path.join(tempDir, 'node_modules'), { recursive: true });
      const sarahuiDest = path.join(tempDir, 'node_modules/sarahui');
      if (process.platform === 'win32') {
        spawnSync('cmd', ['/c', 'mklink', '/J', sarahuiDest, path.join(root, 'packages/ui')]);
      } else {
        fs.symlinkSync(path.join(root, 'packages/ui'), sarahuiDest, 'junction');
      }

      const tscPath = path.join(root, 'node_modules/typescript/bin/tsc');
      const res = spawnSync(process.execPath, [
        tscPath,
        '--noEmit',
        '--strict',
        '--skipLibCheck',
        '--target', 'ES2022',
        '--module', 'NodeNext',
        '--moduleResolution', 'NodeNext',
        '--lib', 'ES2022,DOM',
        'consumer.ts'
      ], {
        cwd: tempDir,
        encoding: 'utf8'
      });

      assert.equal(res.status, 0, `tsc failed with error:\n${res.stdout}\n${res.stderr}`);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('Strict TypeScript consumer test with Bundler resolution compiling preset and tokens', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'challenger-consumer-bundler-'));
    try {
      const packageJson = {
        name: 'challenger-consumer-bundler',
        version: '1.0.0',
        type: 'module'
      };
      fs.writeFileSync(path.join(tempDir, 'package.json'), JSON.stringify(packageJson, null, 2));

      fs.mkdirSync(path.join(tempDir, 'node_modules'), { recursive: true });
      const sarahuiDest = path.join(tempDir, 'node_modules/sarahui');
      if (process.platform === 'win32') {
        spawnSync('cmd', ['/c', 'mklink', '/J', sarahuiDest, path.join(root, 'packages/ui')]);
      } else {
        fs.symlinkSync(path.join(root, 'packages/ui'), sarahuiDest, 'junction');
      }

      const consumerTs = `
import sarahuiPreset from 'sarahui/tailwind-preset';
import type { SarahPreset } from 'sarahui/tailwind-preset';
import { type SarahComponentToken } from 'sarahui/tokens';

const config = {
  presets: [sarahuiPreset],
  theme: {
    extend: {
      colors: {
        custom: '#ff0000',
      }
    }
  }
};

const token: SarahComponentToken = 'magic-card/radius';
console.log(config, token);
`;
      fs.writeFileSync(path.join(tempDir, 'consumer.ts'), consumerTs);

      const tscPath = path.join(root, 'node_modules/typescript/bin/tsc');
      const res = spawnSync(process.execPath, [
        tscPath,
        '--noEmit',
        '--strict',
        '--skipLibCheck',
        '--target', 'ESNext',
        '--module', 'ESNext',
        '--moduleResolution', 'bundler',
        '--lib', 'ESNext,DOM',
        'consumer.ts'
      ], {
        cwd: tempDir,
        encoding: 'utf8'
      });

      assert.equal(res.status, 0, `tsc with Bundler resolution failed:\n${res.stdout}\n${res.stderr}`);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
