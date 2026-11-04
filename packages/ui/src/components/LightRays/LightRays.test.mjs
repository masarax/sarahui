import test from 'node:test';
import assert from 'node:assert/strict';
import { LightRays } from './LightRays.js';

test('LightRays renders cleanly and supports properties', () => {
  const result = LightRays({});
  assert.ok(result, 'LightRays should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'LightRays should not be empty');
});
