import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(import.meta.url), '../../');

let failures = 0;
let passes = 0;

function assert(condition, message) {
  if (!condition) {
    failures++;
    console.error(`FAIL: ${message}`);
  } else {
    passes++;
    console.log(`PASS: ${message}`);
  }
}

console.log('=== TEST SUITE 1: Token Alias Resolution ===');
const tokensPath = path.join(root, 'tokens/sarah.tokens.json');
assert(fs.existsSync(tokensPath), 'tokens/sarah.tokens.json exists');
const spec = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

const base = {
  ...spec.layout,
  ...spec.typography,
  ...spec.motion,
  ...spec.layers,
  ...spec.grid,
};

assert(spec.componentTokens && typeof spec.componentTokens === 'object', 'componentTokens is defined in sarah.tokens.json');

const componentTokenKeys = Object.keys(spec.componentTokens || {});
assert(componentTokenKeys.length >= 42, `componentTokens has at least 42 entries (actual: ${componentTokenKeys.length})`);

for (const [key, ref] of Object.entries(spec.componentTokens || {})) {
  const isBaseAlias = Object.hasOwn(base, ref);
  const isColorAlias = Object.hasOwn(spec.colors.light, ref) && Object.hasOwn(spec.colors.dark, ref);
  const resolves = isBaseAlias || isColorAlias;
  assert(resolves, `Token "${key}" references valid foundation alias "${ref}" (base: ${isBaseAlias}, color: ${isColorAlias})`);

  if (isColorAlias) {
    const lightPrim = spec.colors.light[ref];
    const darkPrim = spec.colors.dark[ref];
    assert(
      Object.hasOwn(spec.primitives, lightPrim),
      `Color alias "${ref}" resolves to valid light primitive "${lightPrim}"`
    );
    assert(
      Object.hasOwn(spec.primitives, darkPrim),
      `Color alias "${ref}" resolves to valid dark primitive "${darkPrim}"`
    );
  }
}

console.log('\n=== TEST SUITE 2: Audited Components Coverage (21 Components) ===');
const auditedComponents = [
  'marquee',
  'terminal',
  'hero-video',
  'bento',
  'animated-list',
  'dock',
  'globe',
  'tweet-card',
  'orbit',
  'avatar-circles',
  'icon-cloud',
  'lens',
  'pointer',
  'smooth-cursor',
  'progressive-blur',
  'dotted-map',
  'animated-beam',
  'border-beam',
  'shine-border',
  'magic-card',
  'glare-hover'
];

for (const comp of auditedComponents) {
  const matching = componentTokenKeys.filter(k => k.startsWith(comp + '/'));
  assert(matching.length > 0, `Component "${comp}" has componentTokens defined: [${matching.join(', ')}]`);
}

console.log('\n=== TEST SUITE 3: Generated CSS Custom Property Validity ===');
const cssFiles = [
  path.join(root, 'tokens/generated/sarah.css'),
  path.join(root, 'packages/ui/src/tokens.css')
];

const declaredVars = new Set();
const referencedVars = new Set();

for (const file of cssFiles) {
  assert(fs.existsSync(file), `CSS file exists: ${path.relative(root, file)}`);
  const content = fs.readFileSync(file, 'utf8');
  assert(content.length > 1000, `CSS file has non-trivial content (${content.length} bytes)`);

  const varDeclRegex = /(--s-[\w-]+)\s*:\s*([^;]+);/g;
  let match;
  let declCount = 0;
  let invalidValues = 0;

  while ((match = varDeclRegex.exec(content)) !== null) {
    const varName = match[1];
    const varValue = match[2].trim();
    declCount++;
    declaredVars.add(varName);

    if (
      varValue.includes('undefined') ||
      varValue.includes('NaN') ||
      varValue.includes('null') ||
      varValue.includes('[object Object]') ||
      varValue === ''
    ) {
      invalidValues++;
      console.error(`Invalid CSS value for ${varName}: "${varValue}" in ${file}`);
    }

    const varRefRegex = /var\((--s-[\w-]+)\)/g;
    let refMatch;
    while ((refMatch = varRefRegex.exec(varValue)) !== null) {
      referencedVars.add(refMatch[1]);
    }
  }

  assert(declCount > 100, `Found ${declCount} CSS variable declarations in ${path.relative(root, file)}`);
  assert(invalidValues === 0, `Zero invalid values (undefined, NaN, null, empty) in ${path.relative(root, file)}`);
}

// Check dangling CSS variable references
let danglingRefs = 0;
for (const ref of referencedVars) {
  if (!declaredVars.has(ref)) {
    danglingRefs++;
    console.error(`Dangling CSS variable reference: ${ref}`);
  }
}
assert(danglingRefs === 0, `Zero dangling CSS variable references among ${referencedVars.size} referenced vars`);

console.log('\n=== TEST SUITE 4: Adobe Spectrum Component Taxonomy Completeness ===');
assert(Array.isArray(spec.spectrumComponentTaxonomy), 'spectrumComponentTaxonomy is an array');
assert(spec.spectrumComponentTaxonomy.length >= 21, `Taxonomy entries count >= 21 (actual: ${spec.spectrumComponentTaxonomy?.length})`);

const requiredTaxonomyFields = ['component', 'structure', 'property', 'intent', 'state', 'colorScheme', 'scale'];
const taxonomyComponents = new Set();

for (const entry of spec.spectrumComponentTaxonomy || []) {
  assert(typeof entry.token === 'string' && entry.token.length > 0, `Taxonomy item has valid token name "${entry.token}"`);
  assert(typeof entry.alias === 'string' && entry.alias.length > 0, `Taxonomy item "${entry.token}" has valid alias "${entry.alias}"`);
  assert(entry.alias === spec.componentTokens[entry.token], `Taxonomy item "${entry.token}" alias matches componentTokens`);
  assert(typeof entry.cssVariable === 'string' && entry.cssVariable.startsWith('--s-'), `Taxonomy item "${entry.token}" has valid cssVariable "${entry.cssVariable}"`);

  assert(entry.name && typeof entry.name === 'object', `Taxonomy item "${entry.token}" has name object`);
  if (entry.name) {
    taxonomyComponents.add(entry.name.component);
    for (const field of requiredTaxonomyFields) {
      assert(
        typeof entry.name[field] === 'string' && entry.name[field].length > 0,
        `Taxonomy item "${entry.token}" name.${field} is non-empty string (value: "${entry.name[field]}")`
      );
    }
  }
}

for (const comp of auditedComponents) {
  assert(taxonomyComponents.has(comp), `Taxonomy includes entry for audited component "${comp}"`);
}

console.log('\n=== TEST SUITE 5: Preset & Types Deliverables Integrity ===');
const resolvedJsonPath = path.join(root, 'tokens/generated/sarah.resolved.json');
assert(fs.existsSync(resolvedJsonPath), 'sarah.resolved.json exists');
const resolvedObj = JSON.parse(fs.readFileSync(resolvedJsonPath, 'utf8'));
assert(resolvedObj.name === 'sarahUI', 'sarah.resolved.json has correct branding name');
assert(resolvedObj.count >= 300, `sarah.resolved.json token count >= 300 (actual: ${resolvedObj.count})`);
assert(resolvedObj.componentTokens && typeof resolvedObj.componentTokens === 'object', 'sarah.resolved.json exports componentTokens');

const tokensTsPath = path.join(root, 'tokens/generated/sarah.tokens.ts');
assert(fs.existsSync(tokensTsPath), 'sarah.tokens.ts exists');
const tokensTsContent = fs.readFileSync(tokensTsPath, 'utf8');
assert(tokensTsContent.includes('export const sarahTokens'), 'sarah.tokens.ts exports sarahTokens');
assert(tokensTsContent.includes('export type SarahColorToken'), 'sarah.tokens.ts exports SarahColorToken');
assert(tokensTsContent.includes('export type SarahComponentToken'), 'sarah.tokens.ts exports SarahComponentToken');

console.log(`\n========================================`);
console.log(`SUMMARY: ${passes} passed, ${failures} failed.`);
console.log(`========================================`);

if (failures > 0) {
  process.exit(1);
}
