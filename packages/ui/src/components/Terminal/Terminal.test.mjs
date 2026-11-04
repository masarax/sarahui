import test from 'node:test';
import assert from 'node:assert/strict';
import { Terminal, AnimatedSpan } from './Terminal.js';
import { raw } from '../../utilities/raw.js';

test('Terminal Pillar 1: renders window container with semantic status dots', () => {
  const html = String(Terminal());
  assert.ok(html.includes('class="s-terminal'), 'base class missing');
  assert.ok(html.includes('data-s-terminal'), 'data-s-terminal hook missing');
  assert.ok(html.includes('s-dot-red') && html.includes('s-dot-yellow') && html.includes('s-dot-green'), 'status dots missing');
  assert.ok(html.includes('<pre><code>'), 'pre/code tags missing');
});

test('Terminal Pillar 2: preserves dynamic classes, custom commands, and attrs', () => {
  const html = String(Terminal({
    className: 'rounded-2xl shadow-xl',
    command: 'npm run build',
    output: 'Build finished in 240ms',
    attrs: { 'data-testid': 'main-terminal' }
  }));
  assert.ok(html.includes('rounded-2xl shadow-xl'), 'custom class missing');
  assert.ok(html.includes('data-testid="main-terminal"'), 'attrs missing');
  assert.ok(html.includes('data-command="npm run build"'), 'custom command missing');
  assert.ok(html.includes('data-output="Build finished in 240ms"'), 'custom output missing');
});

test('Terminal Pillar 3: declares required WAI-ARIA role="region" and aria-label="Terminal"', () => {
  const html = String(Terminal());
  assert.match(html, /role="region"/, 'Terminal must have role="region"');
  assert.match(html, /aria-label="Terminal"/, 'Terminal must have aria-label="Terminal"');
});

test('Terminal Pillar 4: handles sequence mode, step serialization, and children markup', () => {
  const steps = ['Step 1: Init', 'Step 2: Install'];
  const html = String(Terminal({ steps, sequence: true }));
  assert.ok(html.includes('data-steps='), 'data-steps missing');

  const customChild = String(Terminal({ children: raw('<span class="custom-prompt">$</span>') }));
  assert.ok(customChild.includes('<span class="custom-prompt">$</span>'), 'children markup missing');

  const spanHtml = String(AnimatedSpan({ children: 'Loaded modules', delay: 200 }));
  assert.ok(spanHtml.includes('class="s-terminal-span'), 'AnimatedSpan base class missing');
  assert.ok(spanHtml.includes('data-delay="200"'), 'AnimatedSpan delay missing');
});
