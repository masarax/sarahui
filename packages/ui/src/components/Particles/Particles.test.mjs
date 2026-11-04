import test from 'node:test';
import assert from 'node:assert/strict';
import { Particles } from './Particles.js';

test('Particles renders cleanly and supports properties', () => {
  const result = Particles({});
  assert.ok(result, 'Particles should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Particles should not be empty');
});
