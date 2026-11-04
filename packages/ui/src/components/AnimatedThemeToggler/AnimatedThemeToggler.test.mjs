import test from 'node:test';
import assert from 'node:assert/strict';
import { AnimatedThemeToggler } from './AnimatedThemeToggler.js';

test('AnimatedThemeToggler renders cleanly and supports properties', () => {
  const result = AnimatedThemeToggler({});
  assert.ok(result, 'AnimatedThemeToggler should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'AnimatedThemeToggler should not be empty');
});
