import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { countTokens, validateTokens } from '../scripts/token-utils.mjs';

const ROOT_DIR = process.cwd();

/**
 * Recursively walk directory and gather files matching extension
 */
function walk(dir, ext) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(walk(full, ext));
    } else if (full.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

test('Adversarial M3-1: Agent rules directory structure & file completeness', () => {
  const rulesDir = path.join(ROOT_DIR, '.agents', 'rules');
  assert.ok(fs.existsSync(rulesDir), '.agents/rules directory must exist');
  assert.ok(fs.statSync(rulesDir).isDirectory(), '.agents/rules must be a directory');

  const expectedFiles = [
    'architecture.md',
    'tokens.md',
    'tailwind.md',
    'accessibility.md'
  ];

  for (const filename of expectedFiles) {
    const filePath = path.join(rulesDir, filename);
    assert.ok(fs.existsSync(filePath), `${filename} must exist in .agents/rules/`);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    assert.ok(
      lines.length >= 95,
      `${filename} must be substantial (expected >= 95 lines, got ${lines.length})`
    );
    assert.ok(
      content.length > 5000,
      `${filename} must have substantial body (expected > 5000 bytes, got ${content.length})`
    );
  }

  // Verify mandatory architectural pillars in architecture.md
  const archContent = fs.readFileSync(path.join(rulesDir, 'architecture.md'), 'utf8');
  assert.match(archContent, /Modular Directory Structure/i);
  assert.match(archContent, /Mandatory 6-File Component Suite/i);
  assert.match(archContent, /Master Aggregator/i);
  assert.match(archContent, /Framework-Neutral/i);
  assert.match(archContent, /Progressive Enhancement/i);

  // Verify mandatory token hierarchy in tokens.md
  const tokensContent = fs.readFileSync(path.join(rulesDir, 'tokens.md'), 'utf8');
  assert.match(tokensContent, /Adobe Spectrum Design Data/i);
  assert.match(tokensContent, /319/);
  assert.match(tokensContent, /--s-/);
  assert.match(tokensContent, /WCAG 2\.1 AA/);

  // Verify dynamic tailwind rules in tailwind.md
  const tailwindContent = fs.readFileSync(path.join(rulesDir, 'tailwind.md'), 'utf8');
  assert.match(tailwindContent, /tailwind-preset/i);
  assert.match(tailwindContent, /Dynamic Utility Guidelines/i);
  assert.match(tailwindContent, /Glassmorphism/i);
  assert.match(tailwindContent, /Zero Hardcoded Hex Codes/i);

  // Verify accessibility standards in accessibility.md
  const a11yContent = fs.readFileSync(path.join(rulesDir, 'accessibility.md'), 'utf8');
  assert.match(a11yContent, /WCAG 2\.1 Level AA/i);
  assert.match(a11yContent, /Roving Tabindex/i);
  assert.match(a11yContent, /aria-live="polite"/i);
  assert.match(a11yContent, /prefers-reduced-motion/i);
});

test('Adversarial M3-2: Purge of legacy nested rules directory (.agents/rules/rules)', () => {
  const rulesDir = path.join(ROOT_DIR, '.agents', 'rules');
  const legacyNestedDir = path.join(rulesDir, 'rules');
  assert.ok(
    !fs.existsSync(legacyNestedDir),
    'Legacy nested directory .agents/rules/rules/ must NOT exist'
  );

  // Ensure no subdirectories exist at all inside .agents/rules/
  const items = fs.readdirSync(rulesDir);
  for (const item of items) {
    const fullPath = path.join(rulesDir, item);
    assert.ok(
      !fs.statSync(fullPath).isDirectory(),
      `No nested directory allowed in .agents/rules/ (found: ${item})`
    );
  }
});

test('Adversarial M3-3: Root README.md and packages/ui/README.md count consistency', () => {
  const rootReadmePath = path.join(ROOT_DIR, 'README.md');
  assert.ok(fs.existsSync(rootReadmePath), 'Root README.md must exist');
  const rootReadme = fs.readFileSync(rootReadmePath, 'utf8');

  // Must mention 120 components and 319 tokens
  assert.match(rootReadme, /120(?:\s+modular|\s+production-grade)?\s+components/i);
  assert.match(rootReadme, /319(?:\s+design)?\s+tokens/i);
  // Must NOT contain outdated counts
  assert.doesNotMatch(rootReadme, /badge\/components-32/);
  assert.doesNotMatch(rootReadme, /277\s+design\s+tokens/i);

  const pkgReadmePath = path.join(ROOT_DIR, 'packages', 'ui', 'README.md');
  assert.ok(fs.existsSync(pkgReadmePath), 'packages/ui/README.md must exist');
  const pkgReadme = fs.readFileSync(pkgReadmePath, 'utf8');

  // Must mention 120 components and 319 tokens
  assert.match(pkgReadme, /120(?:\s+modular)?\s+components/i);
  assert.match(pkgReadme, /319(?:\s+design)?\s+tokens/i);
  assert.doesNotMatch(pkgReadme, /badge\/components-32/);
  assert.doesNotMatch(pkgReadme, /277\s+tokens/i);
});

test('Adversarial M3-4: Documentation files (apps/docs/*.mjs) parity & sanitization', () => {
  const docsDir = path.join(ROOT_DIR, 'apps', 'docs');
  const docsFiles = walk(docsDir, '.mjs');
  assert.ok(docsFiles.length >= 5, 'apps/docs should have .mjs files');

  // Check catalog.mjs for 120 badge and 319 tokens
  const catalogPath = path.join(docsDir, 'catalog.mjs');
  const catalogContent = fs.readFileSync(catalogPath, 'utf8');
  assert.match(catalogContent, /badge:\s*'120'/);
  assert.match(catalogContent, /319 design tokens/);
  assert.doesNotMatch(catalogContent, /badge:\s*'32'/);
  assert.doesNotMatch(catalogContent, /277 design tokens/);

  // Check site.mjs for 319 token count in stat card and nav
  const sitePath = path.join(docsDir, 'site.mjs');
  const siteContent = fs.readFileSync(sitePath, 'utf8');
  assert.match(siteContent, /\['319',\s*'tokens'/);
  assert.match(siteContent, /badge:\s*'319'/);
  assert.doesNotMatch(siteContent, /\['277',\s*'tokens'/);
  assert.doesNotMatch(siteContent, /badge:\s*'277'/);

  // Check recipes.mjs for 319 in NumberTicker and clean credits
  const recipesPath = path.join(docsDir, 'recipes.mjs');
  const recipesContent = fs.readFileSync(recipesPath, 'utf8');
  assert.match(recipesContent, /value:\s*319/);
  assert.doesNotMatch(recipesContent, /value:\s*277/);
  assert.doesNotMatch(recipesContent, /@Code_Parth/);

  // Check start.mjs for 319 tokens reference
  const startPath = path.join(docsDir, 'start.mjs');
  const startContent = fs.readFileSync(startPath, 'utf8');
  assert.match(startContent, /319\s+Design\s+Tokens/i);

  // Scan all docs files for unwanted mentions outside of sanitization routines
  for (const file of docsFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split(/\r?\n/);

    lines.forEach((line, idx) => {
      // Allow replacement expressions in registry-data.mjs: code = code.replace(/.../, ...)
      // and comment in registry-data.mjs: Zero external filesystem dependencies on read_ui/magicui.
      if (line.includes('.replace(') || line.includes('Zero external filesystem dependencies')) return;

      assert.ok(
        !line.includes('magicui.design'),
        `Forbidden mention 'magicui.design' in ${path.relative(ROOT_DIR, file)}:${idx + 1}`
      );
      assert.ok(
        !line.includes('dillionverma'),
        `Forbidden mention 'dillionverma' in ${path.relative(ROOT_DIR, file)}:${idx + 1}`
      );

      // Verify no external third-party webm files are linked
      const webmMatch = line.match(/https?:\/\/[^\s'"`]+\.webm/);
      if (webmMatch) {
        const url = webmMatch[0];
        assert.ok(
          url.includes('cdn.sarahui.dev'),
          `Forbidden external webm URL '${url}' in ${path.relative(ROOT_DIR, file)}:${idx + 1}`
        );
      }
    });
  }
});

test('Adversarial M3-5: Package source files (packages/ui/src/**/*.js) sanitization', () => {
  const uiSrcDir = path.join(ROOT_DIR, 'packages', 'ui', 'src');
  const uiJsFiles = walk(uiSrcDir, '.js');
  assert.ok(uiJsFiles.length >= 120, 'Should find 120+ JS files in packages/ui/src');

  for (const file of uiJsFiles) {
    const content = fs.readFileSync(file, 'utf8');

    assert.ok(
      !content.includes('magicui.design'),
      `Unwanted 'magicui.design' found in ${path.relative(ROOT_DIR, file)}`
    );
    assert.ok(
      !content.includes('dillionverma'),
      `Unwanted 'dillionverma' found in ${path.relative(ROOT_DIR, file)}`
    );
    assert.ok(
      !content.includes('cdn.magicui.design'),
      `Unwanted 'cdn.magicui.design' found in ${path.relative(ROOT_DIR, file)}`
    );

    // Check no external webm video urls
    const webmMatch = content.match(/https?:\/\/[^\s'"`]+\.webm/);
    assert.ok(
      !webmMatch,
      `Unwanted external webm URL in ${path.relative(ROOT_DIR, file)}: ${webmMatch ? webmMatch[0] : ''}`
    );
  }

  // Verify packages/ui/src/templates.js contains no third-party media dependencies.
  const templatesPath = path.join(uiSrcDir, 'templates.js');
  const templatesContent = fs.readFileSync(templatesPath, 'utf8');
  assert.match(templatesContent, /export function VideoText/);
  assert.match(templatesContent, /export function TweetCard/);
  assert.doesNotMatch(templatesContent, /https?:\/\/(?:pbs|video)\.twimg\.com/);
  assert.doesNotMatch(templatesContent, /https?:\/\/[^\s'"`]+\.(?:mp4|webm)/);
  assert.doesNotMatch(templatesContent, /cdn\.magicui\.design/);
  assert.doesNotMatch(templatesContent, /dillionverma/);
});

test('Adversarial M3-6: Build process execution & dist/ verification', () => {
  // Execute node scripts/build.mjs synchronously
  let stdout;
  try {
    stdout = execSync('node scripts/build.mjs', {
      cwd: ROOT_DIR,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
  } catch (err) {
    assert.fail(`node scripts/build.mjs failed with error: ${err.message}\n${err.stderr}`);
  }

  assert.match(stdout, /generated 319 token entries/i);
  assert.match(stdout, /prepared unscoped npm package/i);
  assert.match(stdout, /built documentation and distributable components in dist\//i);

  // Verify dist directory and artifacts
  const distDir = path.join(ROOT_DIR, 'dist');
  assert.ok(fs.existsSync(distDir), 'dist/ directory must exist');
  assert.ok(fs.statSync(distDir).isDirectory(), 'dist/ must be a directory');

  const distIndex = path.join(distDir, 'index.html');
  assert.ok(fs.existsSync(distIndex), 'dist/index.html must exist');
  const distIndexContent = fs.readFileSync(distIndex, 'utf8');
  assert.ok(distIndexContent.length > 10000, 'dist/index.html must be substantial');

  // Verify tokens generated files exist and validate
  const specPath = path.join(ROOT_DIR, 'tokens', 'sarah.tokens.json');
  assert.ok(fs.existsSync(specPath), 'tokens/sarah.tokens.json must exist');
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));

  assert.strictEqual(
    countTokens(spec),
    319,
    `Total tokens in tokens/sarah.tokens.json must be exactly 319`
  );
  assert.ok(validateTokens(spec), 'tokens/sarah.tokens.json must pass validation');

  const generatedCss = path.join(ROOT_DIR, 'tokens', 'generated', 'sarah.css');
  const generatedJson = path.join(ROOT_DIR, 'tokens', 'generated', 'sarah.resolved.json');
  assert.ok(fs.existsSync(generatedCss), 'tokens/generated/sarah.css must exist');
  assert.ok(fs.existsSync(generatedJson), 'tokens/generated/sarah.resolved.json must exist');

  const cssContent = fs.readFileSync(generatedCss, 'utf8');
  assert.match(cssContent, /--s-bg-surface/);
  assert.match(cssContent, /--s-marquee-duration/);
  assert.match(cssContent, /--s-glare-hover-radius/);
});
