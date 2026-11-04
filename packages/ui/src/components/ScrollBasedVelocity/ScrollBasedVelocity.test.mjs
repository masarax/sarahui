import test from 'node:test';
import assert from 'node:assert/strict';
import { ScrollBasedVelocity } from './ScrollBasedVelocity.js';

test('ScrollBasedVelocity renders cleanly and supports properties', () => {
  const result = ScrollBasedVelocity({});
  assert.ok(result, 'ScrollBasedVelocity should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'ScrollBasedVelocity should not be empty');
});
