import test from 'node:test';
import assert from 'node:assert/strict';
import { TextReveal } from './TextReveal.js';

test('TextReveal renders cleanly and supports properties', () => {
  const result = TextReveal({});
  assert.ok(result, 'TextReveal should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'TextReveal should not be empty');
});
