/**
 * SarahUI E2E Test Suite - System Integration (Tiers 1 & 2)
 * Features 26-29:
 *   - Feature 26: Design Tokens & Token Compiler (tokens/sarah.tokens.json, scripts/build-tokens.mjs, generated CSS/TS)
 *   - Feature 27: Dynamic Tailwind CSS Preset (packages/ui/src/tailwind-preset.js)
 *   - Feature 28: Component Registry Architecture (apps/docs/registry-data.mjs, sanitization, schemas)
 *   - Feature 29: WCAG 2.1 AA & Accessibility Standards (Contrast, ARIA contracts, Reduced Motion)
 *
 * Requirements: PROJECT.md § Feature Inventory (Items 2, 3, 4, 30, 34, 35) & AUDIT_REPORT.md § 3, 4, 5
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as UI from '../../packages/ui/src/templates.js';
import { getComponentProps, getComponentTsx, sanitizeTsx, toKebab } from '../../apps/docs/registry-data.mjs';
import { validateTokens, resolveTheme, countTokens, contrast, cssName } from '../../scripts/token-utils.mjs';

const S = (markup) => String(markup);
const repoRoot = path.resolve(fileURLToPath(import.meta.url), '../../../');

let tailwindPreset = null;
let presetImportError = null;
try {
  const mod = await import('../../packages/ui/src/tailwind-preset.js');
  tailwindPreset = mod.default;
} catch (err) {
  presetImportError = err;
}

describe('Feature 26: Design Tokens & Token Compiler', () => {
  const tokensPath = path.join(repoRoot, 'tokens/sarah.tokens.json');
  const tokensRaw = fs.readFileSync(tokensPath, 'utf8');
  const tokens = JSON.parse(tokensRaw);

  test('source tokens file exists and passes token schema validation', () => {
    assert.equal(validateTokens(tokens), true);
    assert.ok(countTokens(tokens) >= 300, `Expected at least 300 tokens, got ${countTokens(tokens)}`);
    assert.equal(tokens.name, 'sarahUI');
  });

  test('defines componentTokens for all 21 audited components', () => {
    const requiredAuditedComponents = [
      'marquee/duration', 'marquee/gap',
      'terminal/radius', 'terminal/padding', 'terminal/bg', 'terminal/border',
      'hero-video/radius', 'hero-video/halo-size',
      'bento/radius', 'bento/gap', 'bento/padding',
      'animated-list/radius', 'animated-list/gap',
      'dock/radius', 'dock/size', 'dock/gap', 'dock/padding',
      'globe/radius',
      'tweet-card/radius', 'tweet-card/padding',
      'orbit/icon-size', 'orbit/path-border',
      'avatar-circles/size', 'avatar-circles/overlap',
      'icon-cloud/size',
      'lens/radius', 'lens/loupe-border',
      'pointer/badge-radius',
      'smooth-cursor/size',
      'progressive-blur/height',
      'dotted-map/dot-size',
      'animated-beam/stroke-width', 'animated-beam/color-from', 'animated-beam/color-to',
      'border-beam/width', 'border-beam/color-from', 'border-beam/color-to',
      'shine-border/width', 'shine-border/radius',
      'magic-card/radius', 'magic-card/gradient-size',
      'glare-hover/radius'
    ];

    assert.ok(tokens.componentTokens, 'componentTokens property must exist');
    for (const key of requiredAuditedComponents) {
      assert.ok(
        tokens.componentTokens[key],
        `Missing componentToken: "${key}" in tokens/sarah.tokens.json`
      );
    }
  });

  test('spectrumComponentTaxonomy contains structured 7-part Spectrum entries', () => {
    assert.ok(Array.isArray(tokens.spectrumComponentTaxonomy), 'spectrumComponentTaxonomy must be an array');
    assert.ok(tokens.spectrumComponentTaxonomy.length >= 21, 'Must have taxonomy entries for audited components');

    for (const item of tokens.spectrumComponentTaxonomy) {
      assert.ok(item.token, 'Taxonomy item must have a token name');
      assert.ok(item.cssVariable, 'Taxonomy item must have a cssVariable');
      assert.ok(item.cssVariable.startsWith('--s-'), `cssVariable ${item.cssVariable} must start with --s-`);
      assert.ok(item.alias, 'Taxonomy item must have an alias reference');
      assert.ok(item.name, 'Taxonomy item must have structured name object');

      const { component, structure, property, intent, state, colorScheme, scale } = item.name;
      assert.ok(component, `Taxonomy item ${item.token} missing component`);
      assert.ok(structure, `Taxonomy item ${item.token} missing structure`);
      assert.ok(property, `Taxonomy item ${item.token} missing property`);
      assert.ok(intent, `Taxonomy item ${item.token} missing intent`);
      assert.ok(state, `Taxonomy item ${item.token} missing state`);
      assert.ok(colorScheme, `Taxonomy item ${item.token} missing colorScheme`);
      assert.ok(scale, `Taxonomy item ${item.token} missing scale`);
    }
  });

  test('generated CSS file exists and contains compiled --s- custom properties', () => {
    const cssPath = path.join(repoRoot, 'tokens/generated/sarah.css');
    assert.ok(fs.existsSync(cssPath), 'tokens/generated/sarah.css must exist');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Check key CSS variables
    assert.match(cssContent, /--s-bg-canvas:/);
    assert.match(cssContent, /--s-bg-surface:/);
    assert.match(cssContent, /--s-brand-indigo:/);
    assert.match(cssContent, /--s-marquee-duration:/);
    assert.match(cssContent, /--s-terminal-radius:/);
    assert.match(cssContent, /--s-border-beam-width:/);
    assert.match(cssContent, /--s-shine-border-width:/);
    assert.match(cssContent, /--s-magic-card-radius:/);
    assert.match(cssContent, /--s-glare-hover-radius:/);
    assert.match(cssContent, /@media \(prefers-reduced-motion: reduce\)/);
  });

  test('generated TypeScript definitions file exports types and token objects', () => {
    const tsPath = path.join(repoRoot, 'tokens/generated/sarah.tokens.ts');
    assert.ok(fs.existsSync(tsPath), 'tokens/generated/sarah.tokens.ts must exist');
    const tsContent = fs.readFileSync(tsPath, 'utf8');

    assert.match(tsContent, /export const sarahTokens =/);
    assert.match(tsContent, /export type SarahColorToken =/);
    assert.match(tsContent, /export type SarahComponentToken =/);
  });
});

describe('Feature 27: Dynamic Tailwind CSS Preset', () => {
  test('preset file is syntactically valid and loads without syntax errors', () => {
    if (presetImportError) {
      assert.fail(`packages/ui/src/tailwind-preset.js failed to import due to syntax error: ${presetImportError.message}`);
    }
    assert.ok(tailwindPreset, 'Preset must be loaded');
  });

  test('preset exports valid Tailwind theme extension object', () => {
    assert.ok(!presetImportError, `Preset import failed: ${presetImportError?.message}`);
    assert.ok(tailwindPreset, 'Preset must be exported');
    assert.ok(tailwindPreset.theme, 'Preset must define theme');
    assert.ok(tailwindPreset.theme.extend, 'Preset must extend theme');
  });

  test('maps SarahUI semantic colors to CSS variables', () => {
    assert.ok(!presetImportError, `Preset import failed: ${presetImportError?.message}`);
    const colors = tailwindPreset.theme.extend.colors.sarah;
    assert.ok(colors, 'sarah color palette must be defined');

    assert.match(colors.canvas, /var\(--s-bg-canvas/);
    assert.match(colors.surface, /var\(--s-bg-surface/);
    assert.match(colors.border, /var\(--s-border-default/);
    assert.match(colors['border-focus'], /var\(--s-border-focus/);
    assert.match(colors.brand, /var\(--s-brand-indigo/);
    assert.match(colors['text-primary'], /var\(--s-text-primary/);
    assert.match(colors['text-secondary'], /var\(--s-text-secondary/);
    assert.match(colors['text-muted'], /var\(--s-text-muted/);
    assert.match(colors['action-primary'], /var\(--s-action-primary/);
  });

  test('maps border radius tokens to --s-radius variables', () => {
    assert.ok(!presetImportError, `Preset import failed: ${presetImportError?.message}`);
    const radii = tailwindPreset.theme.extend.borderRadius;
    assert.ok(radii, 'borderRadius must be defined');

    assert.match(radii['s-sm'], /var\(--s-radius-sm/);
    assert.match(radii['s-md'], /var\(--s-radius-md/);
    assert.match(radii['s-lg'], /var\(--s-radius-lg/);
    assert.match(radii['s-xl'], /var\(--s-radius-xl/);
    assert.match(radii['s-full'], /var\(--s-radius-full/);
  });

  test('defines animations and keyframes for audited components', () => {
    assert.ok(!presetImportError, `Preset import failed: ${presetImportError?.message}`);
    const anim = tailwindPreset.theme.extend.animation;
    const kf = tailwindPreset.theme.extend.keyframes;

    // Animations
    assert.ok(anim.marquee, 'animation.marquee must be defined');
    assert.ok(anim['border-beam'], 'animation.border-beam must be defined');
    assert.ok(anim.shine, 'animation.shine must be defined');
    assert.ok(anim.orbit, 'animation.orbit must be defined');
    assert.ok(anim.beam, 'animation.beam must be defined');
    assert.ok(anim.glare, 'animation.glare must be defined');
    assert.ok(anim['terminal-blink'], 'animation.terminal-blink must be defined');
    assert.ok(anim.ripple, 'animation.ripple must be defined');

    // Keyframes
    assert.ok(kf.marquee, 'keyframes.marquee must be defined');
    assert.ok(kf['s-border-beam'], 'keyframes.s-border-beam must be defined');
    assert.ok(kf.shine, 'keyframes.shine must be defined');
    assert.ok(kf.orbit, 'keyframes.orbit must be defined');
    assert.ok(kf['s-animated-beam'], 'keyframes.s-animated-beam must be defined');
    assert.ok(kf['s-glare'], 'keyframes.s-glare must be defined');
    assert.ok(kf['s-terminal-blink'], 'keyframes.s-terminal-blink must be defined');
    assert.ok(kf['s-ripple'], 'keyframes.s-ripple must be defined');
  });

  test('preserves dynamic utility classes without destructive overrides', () => {
    // Audit Requirement: Tailwind preset extends, does not delete standard utilities
    assert.ok(!presetImportError, `Preset import failed: ${presetImportError?.message}`);
    assert.ok(!tailwindPreset.theme.colors, 'Must extend colors, not replace global colors object');
    assert.ok(!tailwindPreset.theme.borderRadius, 'Must extend borderRadius, not replace global borderRadius');
  });
});

describe('Feature 28: Component Registry Architecture', () => {
  const tokensPath = path.join(repoRoot, 'tokens/sarah.tokens.json');
  const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

  test('registry covers at least 120 components in tokens manifest', () => {
    assert.ok(Array.isArray(tokens.components), 'tokens.components must be an array');
    assert.ok(tokens.components.length >= 120, `Expected at least 120 components, got ${tokens.components.length}`);
  });

  test('getComponentProps returns structured props table for components', () => {
    const beamProps = getComponentProps('AnimatedBeam');
    assert.ok(Array.isArray(beamProps), 'Props must be an array of table groups');
    assert.ok(beamProps.length > 0, 'Must have at least one props table');
    assert.ok(beamProps[0].rows && beamProps[0].rows.length > 0, 'Must have rows');

    const curvatureProp = beamProps[0].rows.find(r => r.prop === 'curvature');
    assert.ok(curvatureProp, 'Must document curvature prop');
    assert.equal(curvatureProp.type, 'number');
  });

  test('getComponentTsx generates valid, sanitized TSX demo code', () => {
    const code = getComponentTsx('BorderBeam');
    assert.ok(typeof code === 'string' && code.length > 0, 'Must return TSX code string');
    assert.match(code, /BorderBeam/);
    assert.doesNotMatch(code, /magicui/i, 'Sanitized code must have zero magicui mentions');
    assert.doesNotMatch(code, /read_ui/i, 'Sanitized code must have zero read_ui mentions');
  });

  test('sanitizeTsx cleans foreign imports, paths, and domains', () => {
    const dirty = `
      import { Button } from "@/registry/magicui/button";
      import { RocketIcon } from "@radix-ui/react-icons";
      import { cn } from "@/lib/utils";
      // Visit magicui.design for more Magic UI components
    `;
    const clean = sanitizeTsx(dirty);
    assert.doesNotMatch(clean, /@\/registry\/magicui/);
    assert.doesNotMatch(clean, /@radix-ui\/react-icons/);
    assert.doesNotMatch(clean, /magicui\.design/);
    assert.doesNotMatch(clean, /Magic UI/);
    assert.match(clean, /@\/components\/sarahui/);
    assert.match(clean, /sarahui\/icons/);
    assert.match(clean, /sarahui\.dev/);
    assert.match(clean, /sarahUI/);
  });

  test('toKebab handles standard camelCase and special slugs', () => {
    assert.equal(toKebab('Marquee'), 'marquee');
    assert.equal(toKebab('BentoGrid'), 'bento-grid');
    assert.equal(toKebab('HeroVideoDialog'), 'hero-video-dialog');
    assert.equal(toKebab('Floating3DParticles'), 'floating-3d-particles');
  });
});

describe('Feature 29: WCAG 2.1 AA & Accessibility Standards', () => {
  const tokensPath = path.join(repoRoot, 'tokens/sarah.tokens.json');
  const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

  test('WCAG 2.1 AA text contrast ratio (>= 4.5:1) in light theme', () => {
    const lightColors = resolveTheme(tokens, 'light');
    const textTokens = ['text/primary', 'text/secondary', 'text/muted', 'text/brand', 'text/link'];
    const bgTokens = ['bg/surface', 'bg/canvas', 'bg/subtle'];

    for (const fg of textTokens) {
      for (const bg of bgTokens) {
        const ratio = contrast(lightColors[fg], lightColors[bg]);
        assert.ok(
          ratio >= 4.5,
          `Light theme contrast failed for ${fg} on ${bg}: ${ratio.toFixed(2)} < 4.5`
        );
      }
    }
  });

  test('WCAG 2.1 AA text contrast ratio (>= 4.5:1) in dark theme', () => {
    const darkColors = resolveTheme(tokens, 'dark');
    const textTokens = ['text/primary', 'text/secondary', 'text/muted', 'text/brand', 'text/link'];
    const bgTokens = ['bg/surface', 'bg/canvas', 'bg/subtle'];

    for (const fg of textTokens) {
      for (const bg of bgTokens) {
        const ratio = contrast(darkColors[fg], darkColors[bg]);
        assert.ok(
          ratio >= 4.5,
          `Dark theme contrast failed for ${fg} on ${bg}: ${ratio.toFixed(2)} < 4.5`
        );
      }
    }
  });

  test('WCAG 2.1 AA action button contrast (>= 4.5:1) across themes', () => {
    for (const theme of ['light', 'dark']) {
      const colors = resolveTheme(tokens, theme);
      const primaryRatio = contrast(colors['action/on-primary'], colors['action/primary']);
      assert.ok(
        primaryRatio >= 4.5,
        `${theme} action/on-primary on action/primary failed: ${primaryRatio.toFixed(2)} < 4.5`
      );

      const dangerRatio = contrast(colors['action/on-danger'], colors['action/danger']);
      assert.ok(
        dangerRatio >= 4.5,
        `${theme} action/on-danger on action/danger failed: ${dangerRatio.toFixed(2)} < 4.5`
      );
    }
  });

  test('WCAG 2.1 AA UI component focus and border contrast (>= 3.0:1)', () => {
    for (const theme of ['light', 'dark']) {
      const colors = resolveTheme(tokens, theme);
      const focusRatio = contrast(colors['border/focus'], colors['bg/surface']);
      assert.ok(
        focusRatio >= 3.0,
        `${theme} border/focus on bg/surface failed: ${focusRatio.toFixed(2)} < 3.0`
      );
    }
  });

  test('decorative layers carry aria-hidden="true" across visual FX components', () => {
    const borderBeam = S(UI.BorderBeam());
    assert.match(borderBeam, /aria-hidden="true"/, 'BorderBeam must have aria-hidden="true"');

    const animatedBeam = S(UI.AnimatedBeam());
    assert.match(animatedBeam, /aria-hidden="true"/, 'AnimatedBeam must have aria-hidden="true"');

    const glareHover = S(UI.GlareHover());
    assert.match(glareHover, /<div class="s-glare-hover-glare" aria-hidden="true"/, 'GlareHover sheen must be aria-hidden');

    const progressiveBlur = S(UI.ProgressiveBlur());
    assert.match(progressiveBlur, /aria-hidden="true"/, 'ProgressiveBlur layers must be aria-hidden');

    const retroGrid = S(UI.RetroGrid());
    assert.match(retroGrid, /aria-hidden="true"/, 'RetroGrid must have aria-hidden');

    const ripple = S(UI.Ripple());
    assert.match(ripple, /aria-hidden="true"/, 'Ripple must have aria-hidden');

    const meteors = S(UI.Meteors());
    assert.match(meteors, /aria-hidden="true"/, 'Meteors must have aria-hidden');
  });

  test('interactive components declare required ARIA roles and live regions', () => {
    const terminal = S(UI.Terminal());
    assert.match(terminal, /role="region"/, 'Terminal must have role="region"');
    assert.match(terminal, /aria-live="polite"/, 'Terminal must have aria-live="polite"');

    const animatedList = S(UI.AnimatedList());
    assert.match(animatedList, /role="log"/, 'AnimatedList must have role="log"');
    assert.match(animatedList, /aria-live="polite"/, 'AnimatedList must have aria-live="polite"');

    const dock = S(UI.Dock({ items: [{ icon: 'home', label: 'Home' }] }));
    assert.match(dock, /role="toolbar"/, 'Dock must have role="toolbar"');
    assert.match(dock, /aria-label="Quick tools"/, 'Dock must have aria-label');

    const heroDialog = S(UI.HeroVideoDialog({ triggerLabel: 'Play video', videoSrc: 'https://example.com' }));
    assert.match(heroDialog, /aria-haspopup="dialog"/, 'HeroVideoDialog must have aria-haspopup="dialog"');
  });

  test('styles.css declares prefers-reduced-motion queries for dynamic animations', () => {
    const stylesPath = path.join(repoRoot, 'packages/ui/src/styles.css');
    const styles = fs.readFileSync(stylesPath, 'utf8');

    assert.match(
      styles,
      /@media\s*\(prefers-reduced-motion:\s*reduce\)/,
      'styles.css must declare @media (prefers-reduced-motion: reduce)'
    );
  });
});
