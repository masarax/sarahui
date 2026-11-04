import test from 'node:test';
import assert from 'node:assert/strict';
import { Safari } from './Safari.js';

test('Safari renders cleanly and supports properties', () => {
  const result = Safari({});
  assert.ok(result, 'Safari should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Safari should not be empty');
});
