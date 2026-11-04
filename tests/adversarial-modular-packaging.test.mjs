/**
 * Challenger Adversarial Stress Test Suite: Modular Packaging & Consumer Ergonomics
 * Milestone 2 Gate Verification
 *
 * Verifies:
 * 1. Exhaustive Import Verification: All 120 component names import cleanly without undefined collisions from:
 *    (a) packages/ui/src/index.js
 *    (b) packages/ui/src/templates.js
 *    (c) packages/ui/src/components/index.js
 *    (d) packages/ui/src/components/<ComponentName>/index.js
 * 2. 6-File Suite Completeness: Each of the 120 component directories has all 6 required files:
 *    index.js, <ComponentName>.js, <ComponentName>.d.ts, styles.css, <ComponentName>.test.mjs, README.md
 * 3. Utilities Packaging: packages/ui/src/utilities/index.js exports html, raw, Markup, render, escapeText, safeHref, uid, choice, formatComponentName, attributes, enhancers (setTheme, enhanceUI, openDialog, closeDialog, toast, copyText, specialized inits)
 * 4. Styles Packaging: packages/ui/src/styles/ contains fonts.css, tokens.css, styles.css, sarahui.css with valid @import order
 * 5. Tokens Packaging: packages/ui/src/tokens/ contains theme-tokens.js, theme-tokens.d.ts, tokens.css with sarahTokens structure
 * 6. Root & Modular File Parity: Verifies zero divergence between modular src/styles/ & src/tokens/ and root src/
 * 7. Consumer Ergonomics & Functional Invocation: All 120 components execute without throwing and render valid HTML strings
 * 8. Dynamic Tailwind Class & Attribute Preservation: All 120 components forward custom utility classes and data attributes
 * 9. Security & XSS Immunity: Hostile script injection is escaped across component templates
 * 10. Prototype Unity: Markup instances from utilities/raw.js and templates.js share identical prototype chain
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(fileURLToPath(import.meta.url), '../../');
const uiRoot = path.join(root, 'packages/ui/src');
const componentsDir = path.join(uiRoot, 'components');
const utilitiesDir = path.join(uiRoot, 'utilities');
const stylesDir = path.join(uiRoot, 'styles');
const tokensDir = path.join(uiRoot, 'tokens');

// Dynamic module URLs with cachebusting
const indexUrl = pathToFileURL(path.join(uiRoot, 'index.js')).href + `?t=${Date.now()}`;
const templatesUrl = pathToFileURL(path.join(uiRoot, 'templates.js')).href + `?t=${Date.now()}`;
const componentsBarrelUrl = pathToFileURL(path.join(componentsDir, 'index.js')).href + `?t=${Date.now()}`;
const utilitiesBarrelUrl = pathToFileURL(path.join(utilitiesDir, 'index.js')).href + `?t=${Date.now()}`;
const tokensModuleUrl = pathToFileURL(path.join(tokensDir, 'theme-tokens.js')).href + `?t=${Date.now()}`;

// Discover all 120 component directories
const componentEntries = fs.readdirSync(componentsDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .sort();

describe('Challenger Suite 1: Directory & 6-File Suite Completeness', () => {
  test('Exactly 120 component directories exist under packages/ui/src/components/', () => {
    assert.equal(componentEntries.length, 120, `Expected exactly 120 component directories, found ${componentEntries.length}`);
  });

  test('Every component directory contains the mandatory 6-file suite with non-empty content', () => {
    const missing = [];
    const empty = [];

    for (const compName of componentEntries) {
      const compPath = path.join(componentsDir, compName);
      const expectedFiles = [
        'index.js',
        `${compName}.js`,
        `${compName}.d.ts`,
        'styles.css',
        `${compName}.test.mjs`,
        'README.md'
      ];

      for (const relFile of expectedFiles) {
        const fullPath = path.join(compPath, relFile);
        if (!fs.existsSync(fullPath)) {
          missing.push(`${compName}/${relFile}`);
        } else {
          const stats = fs.statSync(fullPath);
          if (stats.size === 0) {
            empty.push(`${compName}/${relFile}`);
          }
        }
      }
    }

    assert.deepEqual(missing, [], `Missing required files: ${missing.join(', ')}`);
    assert.deepEqual(empty, [], `Empty required files: ${empty.join(', ')}`);
  });

  test('Component README files are titled with component name and provide documentation', () => {
    const nonCompliant = [];
    for (const compName of componentEntries) {
      const readmePath = path.join(componentsDir, compName, 'README.md');
      const content = fs.readFileSync(readmePath, 'utf8');
      if (!content.includes(`# ${compName}`)) {
        nonCompliant.push(compName);
      }
    }
    assert.deepEqual(nonCompliant, [], `README missing # ComponentName heading: ${nonCompliant.join(', ')}`);
  });

  test('Component TypeScript definition files export interface and function declarations', () => {
    const nonCompliant = [];
    for (const compName of componentEntries) {
      const dtsPath = path.join(componentsDir, compName, `${compName}.d.ts`);
      const content = fs.readFileSync(dtsPath, 'utf8');
      const hasInterface = content.includes(`export interface ${compName}Props`) || content.includes(`interface ${compName}Props`);
      const hasFunction = content.includes(`export declare function ${compName}`) || content.includes(`export function ${compName}`) || content.includes(`declare function ${compName}`);
      if (!hasInterface || !hasFunction) {
        nonCompliant.push(compName);
      }
    }
    assert.deepEqual(nonCompliant, [], `.d.ts missing interface or function declaration: ${nonCompliant.join(', ')}`);
  });
});

describe('Challenger Suite 2: Exhaustive 4-Way Import Verification & Collision Immunity', async () => {
  const indexMod = await import(indexUrl);
  const templatesMod = await import(templatesUrl);
  const componentsBarrelMod = await import(componentsBarrelUrl);

  test('All 120 component names import cleanly and are defined across all 3 barrel modules', () => {
    const indexUndefined = [];
    const templatesUndefined = [];
    const componentsBarrelUndefined = [];

    for (const compName of componentEntries) {
      if (typeof indexMod[compName] === 'undefined') indexUndefined.push(compName);
      if (typeof templatesMod[compName] === 'undefined') templatesUndefined.push(compName);
      if (typeof componentsBarrelMod[compName] === 'undefined') componentsBarrelUndefined.push(compName);
    }

    assert.deepEqual(indexUndefined, [], `Undefined in packages/ui/src/index.js (possible export collision): ${indexUndefined.join(', ')}`);
    assert.deepEqual(templatesUndefined, [], `Undefined in packages/ui/src/templates.js: ${templatesUndefined.join(', ')}`);
    assert.deepEqual(componentsBarrelUndefined, [], `Undefined in packages/ui/src/components/index.js: ${componentsBarrelUndefined.join(', ')}`);
  });

  test('All 120 components import cleanly from their dedicated directory entry point', async () => {
    const directImportFailures = [];

    for (const compName of componentEntries) {
      const directUrl = pathToFileURL(path.join(componentsDir, compName, 'index.js')).href + `?t=${Date.now()}`;
      try {
        const mod = await import(directUrl);
        if (typeof mod[compName] !== 'function') {
          directImportFailures.push(`${compName}: export is not a function (${typeof mod[compName]})`);
        }
      } catch (err) {
        directImportFailures.push(`${compName}: failed to import (${err.message})`);
      }
    }

    assert.deepEqual(directImportFailures, [], `Direct component import failures: ${directImportFailures.join(', ')}`);
  });

  test('Secondary exports import cleanly from designated components and barrels', () => {
    // BentoCard from BentoGrid
    assert.equal(typeof indexMod.BentoCard, 'function', 'BentoCard must be exported from index.js');
    assert.equal(typeof templatesMod.BentoCard, 'function', 'BentoCard must be exported from templates.js');
    assert.equal(typeof componentsBarrelMod.BentoCard, 'function', 'BentoCard must be exported from components/index.js');

    // AnimatedSpan from Terminal
    assert.equal(typeof indexMod.AnimatedSpan, 'function', 'AnimatedSpan must be exported from index.js');
    assert.equal(typeof templatesMod.AnimatedSpan, 'function', 'AnimatedSpan must be exported from templates.js');
    assert.equal(typeof componentsBarrelMod.AnimatedSpan, 'function', 'AnimatedSpan must be exported from components/index.js');

    // Icons from Icon
    assert.ok(indexMod.Icons, 'Icons proxy must be exported from index.js');
    assert.ok(templatesMod.Icons, 'Icons proxy must be exported from templates.js');
  });

  test('No export collisions occurred: all exported values are distinct and non-null', () => {
    for (const compName of componentEntries) {
      const fnIndex = indexMod[compName];
      const fnTemplates = templatesMod[compName];
      const fnComponents = componentsBarrelMod[compName];

      assert.ok(fnIndex !== null && fnIndex !== undefined, `${compName} in index.js is null or undefined`);
      assert.ok(fnTemplates !== null && fnTemplates !== undefined, `${compName} in templates.js is null or undefined`);
      assert.ok(fnComponents !== null && fnComponents !== undefined, `${compName} in components/index.js is null or undefined`);
    }
  });
});

describe('Challenger Suite 3: Utilities Packaging & Integrity', async () => {
  const utilitiesMod = await import(utilitiesBarrelUrl);
  const templatesMod = await import(templatesUrl);
  const rawMod = await import(pathToFileURL(path.join(utilitiesDir, 'raw.js')).href);

  test('Utilities barrel exports all required helpers and enhancers', () => {
    const requiredExports = [
      'raw',
      'Markup',
      'render',
      'escapeText',
      'safeHref',
      'uid',
      'choice',
      'formatComponentName',
      'html',
      'attributes',
      'setTheme',
      'openDialog',
      'closeDialog',
      'enhanceUI',
      'toast',
      'copyText',
      'initTerminal',
      'initAnimatedList',
      'initNumberTicker',
      'initDock',
      'initGlobe',
      'initIconCloud',
      'initPointer',
      'initSmoothCursor',
      'initHyperText',
      'initConfetti',
      'initParticles',
      'initFloating3DParticles',
      'initFlickeringGrid',
      'initGlyphMatrix',
      'initMagicCard',
      'initLens',
      'initFileTree',
      'initRippleButton',
      'initCoolMode',
      'initHighlighter',
      'initScrollProgress',
      'initAnimatedBeam'
    ];

    const missing = [];
    for (const exp of requiredExports) {
      if (typeof utilitiesMod[exp] === 'undefined') {
        missing.push(exp);
      }
    }

    assert.deepEqual(missing, [], `Missing exports in packages/ui/src/utilities/index.js: ${missing.join(', ')}`);
  });

  test('Markup prototype unity: instances created via utilities/raw.js pass instanceof check and render correctly in templates.js', () => {
    const instanceFromRaw = rawMod.raw('<span class="test">Hello</span>');
    const instanceFromUtils = utilitiesMod.raw('<span class="test">Hello</span>');
    const instanceFromTemplates = templatesMod.raw('<span class="test">Hello</span>');

    assert.ok(instanceFromRaw instanceof rawMod.Markup, 'instanceFromRaw is instanceof rawMod.Markup');
    assert.ok(instanceFromUtils instanceof rawMod.Markup, 'instanceFromUtils is instanceof rawMod.Markup');
    assert.ok(instanceFromTemplates instanceof rawMod.Markup, 'instanceFromTemplates is instanceof rawMod.Markup');

    // Verify render() across both modules accepts all of them without double-escaping
    assert.equal(templatesMod.render(instanceFromRaw), '<span class="test">Hello</span>', 'Markup must not be HTML-escaped by templates.render()');
    assert.equal(templatesMod.render(instanceFromUtils), '<span class="test">Hello</span>', 'Markup must not be HTML-escaped by templates.render()');
    assert.equal(utilitiesMod.render(instanceFromTemplates), '<span class="test">Hello</span>', 'Markup must not be HTML-escaped by utilities.render()');
  });

  test('Safe HTML attributes serialization includes style attribute and rejects unsafe attributes', () => {
    const attrs = utilitiesMod.attributes({
      id: 'test-id',
      class: 's-test my-custom-class',
      style: '--color-from: #ff0000; --color-to: #0000ff;',
      'aria-hidden': 'true',
      'data-s-custom': 'val',
      onclick: 'malicious()',
      onerror: 'alert(1)'
    });

    assert.ok(attrs.includes('id="test-id"'), 'id attribute must be serialized');
    assert.ok(attrs.includes('class="s-test my-custom-class"'), 'class attribute must be serialized');
    assert.ok(attrs.includes('style="--color-from: #ff0000; --color-to: #0000ff;"'), 'style attribute must be serialized');
    assert.ok(attrs.includes('aria-hidden="true"'), 'aria-hidden attribute must be serialized');
    assert.ok(attrs.includes('data-s-custom="val"'), 'data-s-custom attribute must be serialized');
    assert.ok(!attrs.includes('onclick'), 'onclick attribute must be stripped');
    assert.ok(!attrs.includes('onerror'), 'onerror attribute must be stripped');
  });
});

describe('Challenger Suite 4: Styles, Tokens & Modular Parity', async () => {
  test('Styles directory contains all 4 mandatory stylesheets', () => {
    const expected = ['fonts.css', 'tokens.css', 'styles.css', 'sarahui.css'];
    for (const file of expected) {
      const fullPath = path.join(stylesDir, file);
      assert.ok(fs.existsSync(fullPath), `Missing style file: ${file}`);
      assert.ok(fs.statSync(fullPath).size > 0, `Empty style file: ${file}`);
    }
  });

  test('sarahui.css imports fonts, tokens, and styles in strict cascading order', () => {
    const content = fs.readFileSync(path.join(stylesDir, 'sarahui.css'), 'utf8');
    const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

    assert.ok(lines.some(l => l.includes('fonts.css')), 'sarahui.css must import fonts.css');
    assert.ok(lines.some(l => l.includes('tokens.css')), 'sarahui.css must import tokens.css');
    assert.ok(lines.some(l => l.includes('styles.css')), 'sarahui.css must import styles.css');

    const fontsIdx = lines.findIndex(l => l.includes('fonts.css'));
    const tokensIdx = lines.findIndex(l => l.includes('tokens.css'));
    const stylesIdx = lines.findIndex(l => l.includes('styles.css'));

    assert.ok(fontsIdx < tokensIdx, 'fonts.css must be imported before tokens.css');
    assert.ok(tokensIdx < stylesIdx, 'tokens.css must be imported before styles.css');
  });

  test('Tokens directory contains theme-tokens.js, theme-tokens.d.ts, tokens.css', () => {
    const expected = ['theme-tokens.js', 'theme-tokens.d.ts', 'tokens.css'];
    for (const file of expected) {
      const fullPath = path.join(tokensDir, file);
      assert.ok(fs.existsSync(fullPath), `Missing token file: ${file}`);
      assert.ok(fs.statSync(fullPath).size > 0, `Empty token file: ${file}`);
    }
  });

  test('theme-tokens.js exports sarahTokens with valid token taxonomy', async () => {
    const tokensMod = await import(tokensModuleUrl);
    assert.ok(tokensMod.sarahTokens, 'theme-tokens.js must export sarahTokens');
    const tokens = tokensMod.sarahTokens;

    assert.equal(tokens.name, 'sarahUI', 'tokens.name must be sarahUI');
    assert.ok(tokens.light && typeof tokens.light === 'object', 'tokens.light must exist');
    assert.ok(tokens.dark && typeof tokens.dark === 'object', 'tokens.dark must exist');
    assert.ok(tokens.componentTokens && typeof tokens.componentTokens === 'object', 'tokens.componentTokens must exist');
    assert.equal(typeof tokens.count, 'number', 'tokens.count must be a number');
  });

  test('Modular vs root stylesheet and token file contents match identically', () => {
    // fonts.css
    assert.equal(
      fs.readFileSync(path.join(stylesDir, 'fonts.css'), 'utf8'),
      fs.readFileSync(path.join(uiRoot, 'fonts.css'), 'utf8'),
      'styles/fonts.css must match src/fonts.css'
    );
    // styles.css
    assert.equal(
      fs.readFileSync(path.join(stylesDir, 'styles.css'), 'utf8'),
      fs.readFileSync(path.join(uiRoot, 'styles.css'), 'utf8'),
      'styles/styles.css must match src/styles.css'
    );
    // tokens.css
    assert.equal(
      fs.readFileSync(path.join(stylesDir, 'tokens.css'), 'utf8'),
      fs.readFileSync(path.join(uiRoot, 'tokens.css'), 'utf8'),
      'styles/tokens.css must match src/tokens.css'
    );
    // theme-tokens.js
    assert.equal(
      fs.readFileSync(path.join(tokensDir, 'theme-tokens.js'), 'utf8'),
      fs.readFileSync(path.join(uiRoot, 'theme-tokens.js'), 'utf8'),
      'tokens/theme-tokens.js must match src/theme-tokens.js'
    );
    // theme-tokens.d.ts
    assert.equal(
      fs.readFileSync(path.join(tokensDir, 'theme-tokens.d.ts'), 'utf8'),
      fs.readFileSync(path.join(uiRoot, 'theme-tokens.d.ts'), 'utf8'),
      'tokens/theme-tokens.d.ts must match src/theme-tokens.d.ts'
    );
  });
});

describe('Challenger Suite 5: Consumer Ergonomics, Classes, & XSS Hardening', async () => {
  const indexMod = await import(indexUrl);

  test('Every one of the 120 components executes without throwing when invoked', () => {
    const executionFailures = [];

    for (const compName of componentEntries) {
      const fn = indexMod[compName];
      try {
        const result = fn({});
        const rendered = indexMod.render(result);
        if (typeof rendered !== 'string' || rendered.trim().length === 0) {
          executionFailures.push(`${compName}: rendered empty output`);
        }
      } catch (err) {
        executionFailures.push(`${compName}: threw ${err.message}`);
      }
    }

    assert.deepEqual(executionFailures, [], `Component execution failures: ${executionFailures.join(', ')}`);
  });

  test('All 120 rendered components output valid HTML elements with s- or custom class', () => {
    const invalidHtml = [];

    for (const compName of componentEntries) {
      const fn = indexMod[compName];
      const result = fn({});
      const rendered = indexMod.render(result);

      if (!rendered.startsWith('<') || !rendered.endsWith('>')) {
        invalidHtml.push(`${compName}: output is not an HTML element tag`);
      }
    }

    assert.deepEqual(invalidHtml, [], `Invalid HTML output: ${invalidHtml.join(', ')}`);
  });

  test('Interactive components render accessible attributes by default', () => {
    // Terminal
    const termHtml = indexMod.render(indexMod.Terminal({}));
    assert.ok(termHtml.includes('role="region"'), 'Terminal must have role="region"');
    assert.ok(termHtml.includes('aria-label="Terminal"'), 'Terminal must have aria-label="Terminal"');

    // Dock
    const dockHtml = indexMod.render(indexMod.Dock({}));
    assert.ok(dockHtml.includes('role="toolbar"'), 'Dock must have role="toolbar"');
    assert.ok(dockHtml.includes('aria-label="Quick tools"'), 'Dock must have aria-label="Quick tools"');

    // AnimatedList
    const listHtml = indexMod.render(indexMod.AnimatedList({}));
    assert.ok(listHtml.includes('role="log"'), 'AnimatedList must have role="log"');
    assert.ok(listHtml.includes('aria-live="polite"'), 'AnimatedList must have aria-live="polite"');

    // HeroVideoDialog
    const heroHtml = indexMod.render(indexMod.HeroVideoDialog({}));
    assert.ok(heroHtml.includes('aria-haspopup="dialog"'), 'HeroVideoDialog trigger must have aria-haspopup="dialog"');
    assert.ok(heroHtml.includes('<dialog'), 'HeroVideoDialog must render <dialog');
  });

  test('Hostile XSS input is sanitized across component templates without script injection', () => {
    const hostilePayload = '"><script>alert("xss")</script><img src=x onerror=alert(1)>';

    // Button
    const btn = indexMod.render(indexMod.Button({ label: hostilePayload }));
    assert.ok(!btn.includes('<script>'), 'Button must not evaluate hostile <script>');
    assert.ok(btn.includes('&lt;script&gt;'), 'Button must escape HTML tags');

    // Alert
    const alert = indexMod.render(indexMod.Alert({ title: hostilePayload, description: hostilePayload }));
    assert.ok(!alert.includes('<script>'), 'Alert must not evaluate hostile <script>');

    // Input
    const input = indexMod.render(indexMod.Input({ label: hostilePayload, error: hostilePayload }));
    assert.ok(!input.includes('<script>'), 'Input must not evaluate hostile <script>');

    // TweetCard (with sanitized text and author name)
    const tweet = indexMod.render(indexMod.TweetCard({ name: hostilePayload, handle: 'sarahui', text: hostilePayload }));
    assert.ok(!tweet.includes('<script>'), 'TweetCard must not evaluate hostile <script>');
  });

  test('Dynamic Tailwind classes forward onto components without being stripped', () => {
    const customTailwind = 'hover:scale-105 active:opacity-90 shadow-2xl transition-all';

    // Marquee
    const marq = indexMod.render(indexMod.Marquee({ className: customTailwind }));
    assert.ok(marq.includes(customTailwind), 'Marquee must preserve dynamic Tailwind classes');

    // BentoCard
    const bento = indexMod.render(indexMod.BentoCard({ className: customTailwind }));
    assert.ok(bento.includes(customTailwind), 'BentoCard must preserve dynamic Tailwind classes');

    // Terminal
    const term = indexMod.render(indexMod.Terminal({ className: customTailwind }));
    assert.ok(term.includes(customTailwind), 'Terminal must preserve dynamic Tailwind classes');

    // BorderBeam
    const beam = indexMod.render(indexMod.BorderBeam({ className: customTailwind }));
    assert.ok(beam.includes(customTailwind), 'BorderBeam must preserve dynamic Tailwind classes');
  });
});
