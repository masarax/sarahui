import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import preset, { sarahuiPreset } from '../packages/ui/src/tailwind-preset.js';

test('Tailwind preset imports cleanly as an ES module with default and named exports', () => {
  assert.ok(preset && typeof preset === 'object', 'Default export must be an object');
  assert.equal(preset, sarahuiPreset, 'Named export sarahuiPreset must match default export');
  assert.ok(preset.theme?.extend, 'Preset must define theme.extend');
});

test('Tailwind preset exports all required theme extension sections', () => {
  const extend = preset.theme.extend;
  const sections = ['colors', 'borderRadius', 'boxShadow', 'spacing', 'animation', 'keyframes'];
  for (const sec of sections) {
    assert.ok(extend[sec] && typeof extend[sec] === 'object', `Section theme.extend.${sec} must be defined`);
    assert.ok(Object.keys(extend[sec]).length > 0, `Section theme.extend.${sec} must not be empty`);
  }
});

test('Tailwind preset defines semantic colors for SarahUI', () => {
  const sarahColors = preset.theme.extend.colors.sarah;
  assert.ok(sarahColors && typeof sarahColors === 'object', 'preset.theme.extend.colors.sarah must exist');

  const requiredColors = [
    'canvas', 'surface', 'subtle', 'muted', 'border', 'border-strong', 'border-focus',
    'brand', 'brand-hover', 'brand-surface', 'brand-indigo', 'brand-violet', 'brand-blue',
    'text-primary', 'text-secondary', 'text-muted', 'text-inverse', 'text-brand', 'text-link',
    'action-primary', 'action-primary-hover', 'action-primary-pressed', 'action-on-primary',
    'action-danger', 'action-danger-hover', 'action-on-danger',
    'status-success-bg', 'status-success-text', 'status-success-border',
    'status-warning-bg', 'status-warning-text', 'status-warning-border',
    'status-danger-bg', 'status-danger-text', 'status-danger-border',
    'status-info-bg', 'status-info-text', 'status-info-border',
  ];

  for (const colorKey of requiredColors) {
    assert.ok(sarahColors[colorKey], `sarahColors.${colorKey} must be defined`);
    assert.match(sarahColors[colorKey], /var\(--s-[a-zA-Z0-9-]+/, `${colorKey} must reference a CSS variable`);
  }
});

test('Tailwind preset border radius keys avoid collision with logical start utilities', () => {
  const radii = preset.theme.extend.borderRadius;
  assert.ok(radii && typeof radii === 'object');

  // Enumerable keys should use sarah- prefix to avoid rounded-s-* collisions
  const ownKeys = Object.keys(radii);
  const colliding = ownKeys.filter(k => /^s-(none|sm|md|lg|xl|2xl|3xl|full)$/.test(k));
  assert.equal(colliding.length, 0, `No enumerable border radius keys may collide with rounded-s-*: ${colliding.join(', ')}`);

  // Verify sarah- keys exist
  assert.ok(radii['sarah-sm']);
  assert.ok(radii['sarah-md']);
  assert.ok(radii['sarah-lg']);
  assert.ok(radii['sarah-xl']);
  assert.ok(radii['sarah-full']);

  // Verify backward compatibility access for s- keys
  assert.match(radii['s-sm'], /var\(--s-radius-sm/);
  assert.match(radii['s-md'], /var\(--s-radius-md/);
  assert.match(radii['s-lg'], /var\(--s-radius-lg/);
  assert.match(radii['s-xl'], /var\(--s-radius-xl/);
  assert.match(radii['s-full'], /var\(--s-radius-full/);
});

test('Tailwind preset animation and keyframes match', () => {
  const animations = preset.theme.extend.animation;
  const keyframes = preset.theme.extend.keyframes;
  const declaredKeyframes = new Set(Object.keys(keyframes));

  for (const [animName, animDef] of Object.entries(animations)) {
    const keyframeRef = animDef.trim().split(/\s+/)[0];
    assert.ok(
      declaredKeyframes.has(keyframeRef),
      `Animation "${animName}" references defined keyframe "${keyframeRef}"`
    );
  }
});

test('Tailwind preset CSS custom properties all exist in tokens.css', () => {
  const cssPath = fileURLToPath(new URL('../packages/ui/src/tokens.css', import.meta.url));
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  function extractVars(obj) {
    let vars = [];
    for (const v of Object.values(obj)) {
      if (typeof v === 'string') {
        for (const m of v.matchAll(/var\((--s-[a-zA-Z0-9-]+)/g)) {
          vars.push(m[1]);
        }
      } else if (typeof v === 'object' && v !== null) {
        vars.push(...extractVars(v));
      }
    }
    return vars;
  }

  const referenced = extractVars(preset.theme.extend);
  const missing = referenced.filter(v => !cssContent.includes(v + ':'));
  assert.deepEqual(missing, [], 'Preset contains undeclared CSS variables: ' + missing.join(', '));
});

test('Tailwind preset extends theme without destructively replacing root scales', () => {
  assert.equal(preset.theme.colors, undefined, 'Must not override root theme.colors');
  assert.equal(preset.theme.borderRadius, undefined, 'Must not override root theme.borderRadius');
  assert.equal(preset.theme.spacing, undefined, 'Must not override root theme.spacing');
});
