import test from 'node:test';
import assert from 'node:assert/strict';
import { Android } from './Android.js';

test('Android renders cleanly and supports properties', () => {
  const result = Android({});
  assert.ok(result, 'Android should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Android should not be empty');
});
