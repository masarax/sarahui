import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildSite } from '../../apps/docs/site.mjs';
import { setupExamples, installCommand, version } from '../../apps/docs/start.mjs';

// Pre-render site once for opaque-box HTML inspection
const siteHtml = buildSite();

// Helper to isolate landmark sections by slice without inner tag collision
function getSection(viewName) {
  const startIdx = siteHtml.indexOf(`data-view="${viewName}"`);
  if (startIdx === -1) return '';
  const openTag = siteHtml.lastIndexOf('<section', startIdx);
  const nextSection = siteHtml.indexOf('<section data-view=', startIdx + 20);
  const endIdx = nextSection !== -1 ? nextSection : siteHtml.indexOf('</main>', startIdx);
  return siteHtml.slice(openTag, endIdx);
}

const overviewSection = getSection('overview');
const foundationsSection = getSection('foundations');
const patternsSection = getSection('patterns');
const startSection = getSection('start');

/* ==========================================================================
   FEATURE 1: Getting Started — Introduction (#overview)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F1-T1-01]: Overview section contains semantic HTML and accessibility landmark', () => {
  assert.ok(overviewSection.includes('<section data-view="overview" aria-label="Overview">'), 'Overview landmark missing');
  assert.ok(/<h1[^>]*tabindex="-1">Magical components/.test(overviewSection), 'Heading with negative tabindex missing');
  assert.ok(overviewSection.includes('class="magic-text-gradient"'), 'Gradient styling hook missing');
});

test('E2E [F1-T1-02]: Overview hero copy declares zero dependencies and token interoperability', () => {
  assert.ok(overviewSection.includes('0 Runtime Dependencies'), 'Zero runtime dependencies claim missing');
  assert.ok(overviewSection.includes('TypeScript Included'), 'TypeScript support badge missing');
  assert.ok(overviewSection.includes('Standard CSS Variables'), 'Standard CSS variables indicator missing');
  assert.ok(overviewSection.includes('Complete cross-UI design token interoperability'), 'Token interoperability missing');
});

test('E2E [F1-T1-03]: Overview features interactive theme switch and palette swatches', () => {
  assert.ok(/id="hero-theme"/.test(overviewSection), 'Hero theme input switch missing');
  assert.ok(/data-theme-switch/.test(overviewSection), 'data-theme-switch hook missing');
  for (const hex of ['#178BFF', '#5B3DF5', '#A020FF', '#00E5FF']) {
    assert.ok(overviewSection.includes(`--swatch:${hex}`), `Swatch ${hex} missing`);
    assert.ok(overviewSection.includes(`data-copy-value="${hex}"`), `Copy action for ${hex} missing`);
  }
});

test('E2E [F1-T1-04]: Overview showcases system stats with valid deep links', () => {
  assert.ok(/href="#foundations"><strong>(?:277|319)<span> \/ tokens<\/span><\/strong>/.test(overviewSection), 'Foundations stat link missing');
  assert.ok(/href="#components"><strong>120<span> \/ components<\/span><\/strong>/.test(overviewSection), 'Components stat link missing');
  assert.ok(/href="#foundations\/colors"><strong>02<span> \/ themes<\/span><\/strong>/.test(overviewSection), 'Themes stat link missing');
  assert.ok(/href="#start"><strong>00<span> \/ dependencies<\/span><\/strong>/.test(overviewSection), 'Dependencies stat link missing');
});

test('E2E [F1-T1-05]: Overview interactive preview tiles link to concrete components', () => {
  assert.ok(overviewSection.includes('href="#components/Button"'), 'Button preview link missing');
  assert.ok(overviewSection.includes('href="#components/Input"'), 'Input preview link missing');
  assert.ok(overviewSection.includes('href="#components/Badge"'), 'Badge preview link missing');
  assert.ok(/data-favorite aria-pressed="false"/.test(overviewSection), 'Favorite preview button missing');
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F1-T2-01]: Overview stage decorative layers have aria-hidden presentation', () => {
  assert.ok(overviewSection.includes('<div class="stage-grid" aria-hidden="true"></div>'), 'Stage grid aria-hidden missing');
  assert.ok(overviewSection.includes('<div class="stage-orbit" aria-hidden="true"></div>'), 'Stage orbit aria-hidden missing');
  assert.ok(siteHtml.includes('<div class="subtle-ambient-mesh" aria-hidden="true"></div>'), 'Ambient mesh aria-hidden missing');
});

test('E2E [F1-T2-02]: Overview interactive triggers possess explicit accessible names', () => {
  const matches = [...overviewSection.matchAll(/<button[^>]*aria-label="([^"]+)"/g)].map(m => m[1]);
  assert.ok(matches.length >= 5, 'Overview contains multiple labeled accessible buttons');
  assert.ok(matches.some(l => l.includes('Copy color #178BFF')), 'Color swatch accessible name missing');
  assert.ok(matches.some(l => l.includes('Favorite this preview')), 'Favorite button accessible name missing');
});

test('E2E [F1-T2-03]: Overview hero stage contains valid SVG icons without empty viewBox', () => {
  const svgs = [...overviewSection.matchAll(/<svg[^>]*viewBox="([^"]+)"/g)].map(m => m[1]);
  assert.ok(svgs.length > 0, 'Overview contains SVG icons');
  for (const vb of svgs) {
    assert.ok(/^[\d.]+\s+[\d.]+\s+[\d.]+\s+[\d.]+$/.test(vb), `Invalid viewBox format: ${vb}`);
  }
});

test('E2E [F1-T2-04]: Overview links avoid broken javascript: or javascript-injection protocols', () => {
  const hrefs = [...overviewSection.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  for (const h of hrefs) {
    assert.ok(!h.toLowerCase().startsWith('javascript:'), `Prohibited protocol found in href: ${h}`);
    assert.ok(!h.toLowerCase().startsWith('data:'), `Prohibited data URI found in href: ${h}`);
  }
});

test('E2E [F1-T2-05]: Overview ID uniqueness prevents collision within landmark regions', () => {
  const ids = [...overviewSection.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
  const counts = {};
  for (const id of ids) {
    counts[id] = (counts[id] || 0) + 1;
  }
  const duplicates = Object.entries(counts).filter(([_, count]) => count > 1).map(([id]) => id);
  assert.deepEqual(duplicates, [], `Found duplicate IDs within overview landmark: ${duplicates.join(', ')}`);
});


/* ==========================================================================
   FEATURE 2: Getting Started — Installation (#start)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F2-T1-01]: Installation section contains landmark with breadcrumbs and copy action', () => {
  assert.ok(startSection.includes('<section data-view="start" hidden aria-label="Get started">'), 'Start landmark missing');
  assert.ok(startSection.includes('<nav class="detail-breadcrumbs" aria-label="Breadcrumb">'), 'Breadcrumbs missing');
  assert.ok(/<button[^>]*data-copy-page="true"/.test(startSection), 'Copy page button missing');
});

test('E2E [F2-T1-02]: Installation provides complete setup examples for JS, React, and Vue', () => {
  assert.ok(typeof setupExamples.JavaScript === 'string' && setupExamples.JavaScript.length > 50);
  assert.ok(typeof setupExamples.React === 'string' && setupExamples.React.length > 50);
  assert.ok(typeof setupExamples.Vue === 'string' && setupExamples.Vue.length > 50);

  // JS example imports
  assert.ok(setupExamples.JavaScript.includes("import 'sarahui/css'"), 'JS css import missing');
  assert.ok(setupExamples.JavaScript.includes('enhanceUI(app)'), 'JS enhanceUI call missing');

  // React example
  assert.ok(setupExamples.React.includes('useEffect'), 'React hook missing');
  assert.ok(setupExamples.React.includes('enhanceUI(containerRef.current)'), 'React enhanceUI missing');

  // Vue example
  assert.ok(setupExamples.Vue.includes('onMounted'), 'Vue hook missing');
  assert.ok(setupExamples.Vue.includes('enhanceUI'), 'Vue enhanceUI missing');
});

test('E2E [F2-T1-03]: Package installation commands cover pnpm, npm, yarn, and bun', () => {
  const renderedCmd = String(installCommand());
  assert.ok(renderedCmd.includes('npm install sarahui'), 'Install command text missing');
  for (const pm of ['pnpm', 'npm', 'yarn', 'bun']) {
    assert.ok(startSection.includes(`id="install-${pm}"`), `Install snippet for ${pm} missing`);
  }
});

test('E2E [F2-T1-04]: Event documentation table enumerates sarah:* custom events', () => {
  for (const evt of ['sarah:themechange', 'sarah:tabchange', 'sarah:selectionchange', 'sarah:sortchange']) {
    assert.ok(startSection.includes(`<code>${evt}</code>`), `Event ${evt} missing in start docs`);
  }
});

test('E2E [F2-T1-05]: Version tag matches package.json distribution version', () => {
  const pkg = JSON.parse(fs.readFileSync(new URL('../../packages/ui/package.json', import.meta.url), 'utf8'));
  assert.equal(version, pkg.version);
  assert.ok(siteHtml.includes(`<span class="version-tag">${pkg.version.slice(0, 3)}</span>`), 'Version tag prefix missing');
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F2-T2-01]: Code blocks have tabindex="0" for keyboard scroll accessibility', () => {
  const codeBlocks = [...startSection.matchAll(/<pre[^>]*id="([^"]+)"[^>]*>/g)].map(m => m[0]);
  assert.ok(codeBlocks.length >= 3, 'Start section must have at least 3 pre code blocks');
  for (const block of codeBlocks) {
    assert.ok(block.includes('tabindex="0"'), 'Pre block must be keyboard focusable');
  }
});

test('E2E [F2-T2-02]: Copy command buttons carry data-copy-id referencing rendered code blocks', () => {
  const copyButtons = [...startSection.matchAll(/<button[^>]*data-copy-id="([^"]+)"/g)].map(m => m[1]);
  assert.ok(copyButtons.length >= 3, 'Copy buttons present in start section');
  for (const targetId of copyButtons) {
    assert.ok(startSection.includes(`id="${targetId}"`), `Copy button target #${targetId} must exist in start section`);
  }
});

test('E2E [F2-T2-03]: Quick start steps contain ordered sequential indicators', () => {
  assert.ok(startSection.includes('<div class="docs-step-badge">1</div>'), 'Step 1 badge missing');
  assert.ok(startSection.includes('<div class="docs-step-badge">2</div>'), 'Step 2 badge missing');
  assert.ok(startSection.includes('<div class="docs-step-badge">3</div>'), 'Step 3 badge missing');
});

test('E2E [F2-T2-04]: Framework integration tabs have accessible role="tab" and roving index', () => {
  assert.ok(startSection.includes('role="tablist"'), 'Tablist missing in start section');
  assert.ok(/role="tab"[^>]*aria-selected="true"/.test(startSection), 'Active tab missing aria-selected');
  assert.ok(startSection.includes('role="tabpanel"'), 'Tabpanel missing in start section');
});

test('E2E [F2-T2-05]: Package manager tabs possess unique panel IDs linked via aria-controls', () => {
  const tabs = [...startSection.matchAll(/<button[^>]*role="tab"[^>]*aria-controls="([^"]+)"/g)].map(m => m[1]);
  assert.ok(tabs.length >= 4, 'At least 4 package manager tabs present');
  for (const panelId of tabs) {
    assert.ok(startSection.includes(`id="${panelId}"`), `Tab aria-controls target #${panelId} must exist`);
  }
});


/* ==========================================================================
   FEATURE 3: Getting Started — Foundations (#foundations)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F3-T1-01]: Foundations section contains local nav with all 5 core pillars', () => {
  assert.ok(foundationsSection.includes('<section data-view="foundations" hidden aria-label="Foundations">'), 'Foundations landmark missing');
  for (const pillar of ['colors', 'typography', 'spacing', 'shape', 'motion']) {
    assert.ok(foundationsSection.includes(`href="#foundations/${pillar}"`), `Pillar link ${pillar} missing`);
  }
});

test('E2E [F3-T1-02]: Color foundations render all standard palette groups', () => {
  for (const palette of ['Neutral', 'Blue', 'Indigo', 'Violet', 'Emerald', 'Amber', 'Red', 'Alpha']) {
    assert.ok(foundationsSection.includes(`<h3>${palette}</h3>`), `Palette title ${palette} missing`);
    assert.ok(foundationsSection.includes(`role="region" aria-label="${palette.toLowerCase()} palette"`), `Accessible scale ${palette} missing`);
  }
});

test('E2E [F3-T1-03]: Typography foundations display font scales and local family declarations', () => {
  assert.ok(foundationsSection.includes('id="foundation-typography"'), 'Typography section missing');
  assert.ok(foundationsSection.includes('Poppins'), 'Poppins reference missing');
  assert.ok(foundationsSection.includes('Inter'), 'Inter reference missing');
  assert.ok(foundationsSection.includes('Roboto Mono'), 'Roboto Mono reference missing');
  assert.ok(foundationsSection.includes('NOTO SANS BENGALI'), 'Bengali font reference missing');
  assert.ok(foundationsSection.includes('NOTO SANS ARABIC'), 'Arabic font reference missing');
});

test('E2E [F3-T1-04]: Spacing foundations visualize pixel scale and rem dimensions', () => {
  assert.ok(foundationsSection.includes('id="foundation-spacing"'), 'Spacing section missing');
  assert.ok(foundationsSection.includes('spacing-board'), 'Spacing board container missing');
  assert.ok(/var\(--s-spacing-16\)/.test(foundationsSection), 'Spacing token variable missing');
  assert.ok(foundationsSection.includes('12 columns'), 'Column layout note missing');
  assert.ok(foundationsSection.includes('24px gutters'), 'Gutter note missing');
});

test('E2E [F3-T1-05]: Motion foundations illustrate easing and duration curves', () => {
  assert.ok(foundationsSection.includes('id="foundation-motion"'), 'Motion section missing');
  assert.ok(foundationsSection.includes('motion-board'), 'Motion board container missing');
  assert.ok(/data-motion-replay/.test(foundationsSection), 'Replay transition trigger missing');
  assert.ok(foundationsSection.includes('180ms · cubic-bezier(.2, .8, .2, 1)'), 'Easing definition missing');
  assert.ok(foundationsSection.includes('0ms'), 'Reduced motion duration note missing');
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F3-T2-01]: Color swatches contain valid hex/rgba values and CSS variables', () => {
  const swatches = [...foundationsSection.matchAll(/style="--swatch:([^"]+)"/g)].map(m => m[1]);
  assert.ok(swatches.length >= 50, 'Must contain at least 50 token color swatches');
  for (const s of swatches) {
    assert.ok(/^(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|transparent)$/.test(s), `Invalid swatch color format: ${s}`);
  }
});

test('E2E [F3-T2-02]: Palette color scales are keyboard navigable regions', () => {
  const scaleRegions = [...foundationsSection.matchAll(/class="color-scale"[^>]*tabindex="0"[^>]*role="region"/g)];
  assert.ok(scaleRegions.length >= 8, 'All 8 color scales must be keyboard focusable regions');
});

test('E2E [F3-T2-03]: Typography sample texts are localized and render cleanly', () => {
  assert.ok(foundationsSection.includes('সুন্দর কিছু তৈরি হোক।'), 'Bengali sample text missing');
  assert.ok(foundationsSection.includes('لنصنع شيئًا جميلًا.'), 'Arabic sample text missing');
  assert.ok(foundationsSection.includes('lang="bn"'), 'Bengali lang attribute missing');
  assert.ok(foundationsSection.includes('lang="ar" dir="rtl"'), 'Arabic rtl attribute missing');
});

test('E2E [F3-T2-04]: Shape tokens document radius values from none to full pill', () => {
  assert.ok(foundationsSection.includes('id="foundation-shape"'), 'Shape section missing');
  assert.ok(/var\(--s-radius-sm\)/.test(foundationsSection), 'Radius sm token missing');
  assert.ok(/var\(--s-radius-md\)/.test(foundationsSection), 'Radius md token missing');
  assert.ok(/var\(--s-radius-full\)/.test(foundationsSection), 'Radius full token missing');
  assert.ok(/var\(--s-shadow-subtle\)/.test(foundationsSection), 'Shadow elevation subtle token missing');
});

test('E2E [F3-T2-05]: Motion section documents prefers-reduced-motion fallback behavior', () => {
  assert.ok(foundationsSection.includes('With reduced motion'), 'Reduced motion notice missing in motion board');
  assert.ok(foundationsSection.includes('Care for the person using it.'), 'Accessibility alert title missing');
});


/* ==========================================================================
   FEATURE 4: Getting Started — Patterns (#patterns)
   ========================================================================== */

// --- Tier 1: Feature Coverage (>=5 test cases) ---

test('E2E [F4-T1-01]: Patterns section exposes workspace studio header and metrics', () => {
  assert.ok(patternsSection.includes('<section data-view="patterns" hidden aria-label="Patterns">'), 'Patterns landmark missing');
  assert.ok(patternsSection.includes('<strong id="metric-projects">8</strong>'), 'Projects metric missing');
  assert.ok(patternsSection.includes('<strong id="metric-active">3</strong>'), 'Active metric missing');
  assert.ok(patternsSection.includes('<strong id="metric-complete">1</strong>'), 'Complete metric missing');
});

test('E2E [F4-T1-02]: Patterns projects panel includes search and status filters', () => {
  assert.ok(/id="project-search"/.test(patternsSection), 'Project search ID missing');
  assert.ok(/data-project-search/.test(patternsSection), 'Project search data hook missing');
  assert.ok(/id="project-status"/.test(patternsSection), 'Project status ID missing');
  assert.ok(/data-project-status/.test(patternsSection), 'Project status data hook missing');
});

test('E2E [F4-T1-03]: Patterns projects table provides live summary and selection bar', () => {
  assert.ok(patternsSection.includes('id="projects-table"'), 'Projects table placeholder missing');
  assert.ok(patternsSection.includes('id="projects-summary" aria-live="polite"'), 'Projects summary polite aria-live missing');
  assert.ok(patternsSection.includes('id="selection-bar" class="selection-bar" hidden'), 'Hidden selection bar missing');
  assert.ok(/data-clear-selection/.test(patternsSection), 'Clear selection data hook missing');
});

test('E2E [F4-T1-04]: Patterns settings form includes accessible profile, inputs, and textareas', () => {
  assert.ok(patternsSection.includes('<form id="settings-form" class="settings-form">'), 'Settings form tag missing');
  assert.ok(/id="settings-name"/.test(patternsSection), 'Settings name field missing');
  assert.ok(/id="settings-email"/.test(patternsSection), 'Settings email field missing');
  assert.ok(/id="settings-bio"/.test(patternsSection), 'Settings bio textarea missing');
});

test('E2E [F4-T1-05]: Patterns settings form has live status announcement and submit action', () => {
  assert.ok(patternsSection.includes('id="settings-status" aria-live="polite"'), 'Settings live status missing');
  assert.ok(/type="submit"/.test(patternsSection), 'Submit button missing');
});

// --- Tier 2: Boundary & Corner Cases (>=5 test cases) ---

test('E2E [F4-T2-01]: Settings form fields have strict HTML5 validation attributes', () => {
  // Regex matches input tag containing id="settings-name" and required
  const nameInput = patternsSection.match(/<input[^>]*id="settings-name"[^>]*>/)?.[0] || '';
  assert.ok(/\brequired\b/.test(nameInput), 'settings-name missing required attribute');

  const emailInput = patternsSection.match(/<input[^>]*id="settings-email"[^>]*>/)?.[0] || '';
  assert.ok(/\brequired\b/.test(emailInput), 'settings-email missing required attribute');
  assert.ok(/type="email"/.test(emailInput), 'settings-email missing type="email"');

  const bioTextarea = patternsSection.match(/<textarea[^>]*id="settings-bio"[^>]*>/)?.[0] || '';
  assert.ok(/maxlength="240"/.test(bioTextarea), 'settings-bio missing maxlength="240"');
});

test('E2E [F4-T2-02]: Form fields include standard autocomplete tokens for password managers', () => {
  const nameInput = patternsSection.match(/<input[^>]*id="settings-name"[^>]*>/)?.[0] || '';
  assert.ok(/autocomplete="name"/.test(nameInput), 'settings-name missing autocomplete="name"');

  const emailInput = patternsSection.match(/<input[^>]*id="settings-email"[^>]*>/)?.[0] || '';
  assert.ok(/autocomplete="email"/.test(emailInput), 'settings-email missing autocomplete="email"');
});

test('E2E [F4-T2-03]: Settings language selector provides internationalization options', () => {
  assert.ok(/id="settings-language"/.test(patternsSection), 'Language select missing');
  assert.ok(/<option[^>]*>English<\/option>/.test(patternsSection), 'English option missing');
  assert.ok(/<option[^>]*>বাংলা<\/option>/.test(patternsSection), 'Bengali option missing');
  assert.ok(/<option[^>]*>العربية<\/option>/.test(patternsSection), 'Arabic option missing');
});

test('E2E [F4-T2-04]: Modal project creation form includes autofocus and length bounds', () => {
  assert.ok(siteHtml.includes('id="create-project-form"'), 'create-project-form missing');
  const projectInput = siteHtml.match(/<input[^>]*id="new-project-name"[^>]*>/)?.[0] || '';
  assert.ok(/\brequired\b/.test(projectInput), 'new-project-name missing required');
  assert.ok(/minlength="2"/.test(projectInput), 'new-project-name missing minlength="2"');
  assert.ok(/maxlength="60"/.test(projectInput), 'new-project-name missing maxlength="60"');
  assert.ok(/data-s-autofocus/.test(projectInput), 'new-project-name missing data-s-autofocus');
});

test('E2E [F4-T2-05]: Selection bar is initially hidden and does not interfere with accessibility tree', () => {
  assert.ok(patternsSection.includes('id="selection-bar" class="selection-bar" hidden'), 'Selection bar must have hidden attribute');
});
