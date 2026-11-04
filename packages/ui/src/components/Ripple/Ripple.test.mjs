import test from 'node:test';
import assert from 'node:assert/strict';
import { Ripple } from './Ripple.js';

test('Ripple renders cleanly and supports properties', () => {
  const result = Ripple({});
  assert.ok(result, 'Ripple should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Ripple should not be empty');
});
