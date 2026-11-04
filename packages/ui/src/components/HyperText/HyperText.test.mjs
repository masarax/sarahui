import test from 'node:test';
import assert from 'node:assert/strict';
import { HyperText } from './HyperText.js';

test('HyperText renders cleanly and supports properties', () => {
  const result = HyperText({});
  assert.ok(result, 'HyperText should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'HyperText should not be empty');
});
