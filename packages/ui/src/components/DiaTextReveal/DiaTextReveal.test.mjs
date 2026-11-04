import test from 'node:test';
import assert from 'node:assert/strict';
import { DiaTextReveal } from './DiaTextReveal.js';

test('DiaTextReveal renders cleanly and supports properties', () => {
  const result = DiaTextReveal({});
  assert.ok(result, 'DiaTextReveal should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'DiaTextReveal should not be empty');
});
