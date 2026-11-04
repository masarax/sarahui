import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(fileURLToPath(import.meta.url), '../../');

let failures = 0;
let passes = 0;

function assert(condition, message, failureDetail = '') {
  if (!condition) {
    failures++;
    console.error(`FAIL: ${message}`);
    if (failureDetail) console.error(`      Detail: ${failureDetail}`);
  } else {
    passes++;
    console.log(`PASS: ${message}`);
  }
}

console.log('=== SUITE 1: Direct Preset Import & Syntax Validation ===');
const presetPath = path.join(root, 'packages/ui/src/tailwind-preset.js');
assert(fs.existsSync(presetPath), 'packages/ui/src/tailwind-preset.js exists');

let preset = null;
let importError = null;
try {
  const { pathToFileURL } = await import('node:url');
  const mod = await import(pathToFileURL(presetPath).href);
  preset = mod.default;
} catch (err) {
  importError = err;
}

assert(
  preset !== null && importError === null,
  'packages/ui/src/tailwind-preset.js imports cleanly as an ES module without syntax errors',
  importError ? `${importError.name}: ${importError.message}` : ''
);

// If direct import failed due to syntax error in comment, parse with stripped header for remaining suites
let testablePreset = preset;
if (!testablePreset) {
  try {
    const raw = fs.readFileSync(presetPath, 'utf8');
    const exportIndex = raw.lastIndexOf('export default');
    if (exportIndex !== -1) {
      const stripped = raw.slice(exportIndex);
      const moduleUrl = 'data:text/javascript;base64,' + Buffer.from(stripped).toString('base64');
      const mod = await import(moduleUrl);
      testablePreset = mod.default;
      console.log('NOTE: Evaluated payload using stripped header fallback for deep schema inspection.');
    }
  } catch (err) {
    console.error('Failed to evaluate fallback preset payload:', err.message);
  }
}

console.log('\n=== SUITE 2: Preset Theme Extension Completeness & Consistency ===');
assert(
  testablePreset && typeof testablePreset === 'object' && testablePreset.theme?.extend,
  'Preset exports theme.extend object'
);

const extend = testablePreset?.theme?.extend || {};
const requiredSections = ['colors', 'borderRadius', 'boxShadow', 'spacing', 'animation', 'keyframes'];
for (const sec of requiredSections) {
  assert(
    extend[sec] && typeof extend[sec] === 'object' && Object.keys(extend[sec]).length > 0,
    `Preset defines non-empty theme.extend.${sec} (found ${Object.keys(extend[sec] || {}).length} keys)`
  );
}

// Keyframe mapping validation
const animations = extend.animation || {};
const keyframes = extend.keyframes || {};
const declaredKeyframes = new Set(Object.keys(keyframes));

for (const [animName, animDef] of Object.entries(animations)) {
  const firstToken = animDef.trim().split(/\s+/)[0];
  assert(
    declaredKeyframes.has(firstToken),
    `Animation "${animName}" references defined keyframe "${firstToken}"`
  );
}

// CSS Variable consistency with tokens.css
const cssPath = path.join(root, 'packages/ui/src/tokens.css');
const cssContent = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';

function extractVars(obj) {
  let vars = [];
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') {
      for (const m of v.matchAll(/var\((--s-[a-zA-Z0-9-]+)/g)) {
        vars.push({ key: k, varName: m[1] });
      }
    } else if (typeof v === 'object' && v !== null) {
      vars.push(...extractVars(v));
    }
  }
  return vars;
}

const referencedVars = extractVars(extend);
const missingCssVars = [];
for (const item of referencedVars) {
  if (!cssContent.includes(item.varName + ':')) {
    missingCssVars.push(item);
  }
}

assert(
  missingCssVars.length === 0,
  `All CSS custom properties referenced in preset exist in packages/ui/src/tokens.css (missing: ${missingCssVars.length})`,
  missingCssVars.map(m => `${m.key} -> ${m.varName}`).join(', ')
);

console.log('\n=== SUITE 3: Tailwind Utility Interoperability & Naming Collisions ===');
// Verify prefixing on spacing, radius, shadows
const spacingKeys = Object.keys(extend.spacing || {});
const allSpacingPrefixed = spacingKeys.every(k => k.startsWith('s-'));
assert(allSpacingPrefixed, 'All custom spacing keys are namespaced with "s-" to avoid overriding Tailwind numeric scale');

const shadowKeys = Object.keys(extend.boxShadow || {});
const allShadowsPrefixed = shadowKeys.every(k => k.startsWith('s-'));
assert(allShadowsPrefixed, 'All custom shadow keys are namespaced with "s-" to avoid overriding Tailwind shadow scale');

const radiusKeys = Object.keys(extend.borderRadius || {});
// Check collision: in Tailwind v3.3+, rounded-s-* is the logical property for border-start radius.
// Keys like 's-md', 's-xl' match 'rounded-s-{size}' where size is 'md', 'xl'.
const collidingRadiusKeys = radiusKeys.filter(k => /^s-(none|sm|md|lg|xl|2xl|3xl|full)$/.test(k));
assert(
  collidingRadiusKeys.length === 0,
  `Border radius keys avoid collision with Tailwind logical start radius utility "rounded-s-*" (found: ${collidingRadiusKeys.length})`,
  `Keys [${collidingRadiusKeys.join(', ')}] collide with Tailwind's "rounded-s" (start) directional modifier`
);

console.log('\n=== SUITE 4: TypeScript Typings & Consumer Exports Validation ===');
// 1. Repo tsc typecheck
const tscResult = spawnSync(process.execPath, [path.join(root, 'node_modules/typescript/bin/tsc'), '--noEmit'], {
  cwd: root,
  encoding: 'utf8'
});
assert(tscResult.status === 0, 'Internal repository typecheck (tsc --noEmit) passes cleanly');

// 2. SarahComponentToken export in tokens/generated/sarah.tokens.ts
const genTokensPath = path.join(root, 'tokens/generated/sarah.tokens.ts');
const genTokensContent = fs.existsSync(genTokensPath) ? fs.readFileSync(genTokensPath, 'utf8') : '';
assert(
  genTokensContent.includes('export type SarahComponentToken'),
  'tokens/generated/sarah.tokens.ts exports SarahComponentToken type'
);

// 3. SarahComponentToken export in packages/ui/src/theme-tokens.d.ts (the public package export for "sarahui/tokens")
const uiThemeTokensPath = path.join(root, 'packages/ui/src/theme-tokens.d.ts');
const uiThemeTokensContent = fs.existsSync(uiThemeTokensPath) ? fs.readFileSync(uiThemeTokensPath, 'utf8') : '';
assert(
  uiThemeTokensContent.includes('export type SarahComponentToken'),
  'packages/ui/src/theme-tokens.d.ts exports SarahComponentToken type for public consumers of "sarahui/tokens"'
);

// 4. Check whether packages/ui/src/tailwind-preset.d.ts exists
const presetDtsPath = path.join(root, 'packages/ui/src/tailwind-preset.d.ts');
assert(
  fs.existsSync(presetDtsPath),
  'packages/ui/src/tailwind-preset.d.ts exists for TypeScript tailwind.config.ts consumers'
);

console.log('\n========================================');
console.log(`SUMMARY: ${passes} passed, ${failures} failed.`);
console.log('========================================');

if (failures > 0) {
  process.exit(1);
}
