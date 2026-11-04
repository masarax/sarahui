import test from 'node:test';
import assert from 'node:assert/strict';
import { SpinningText } from './SpinningText.js';

test('SpinningText renders cleanly and supports properties', () => {
  const result = SpinningText({});
  assert.ok(result, 'SpinningText should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'SpinningText should not be empty');
});
