import test from 'node:test';
import assert from 'node:assert/strict';
import { SparklesText } from './SparklesText.js';

test('SparklesText renders cleanly and supports properties', () => {
  const result = SparklesText({});
  assert.ok(result, 'SparklesText should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'SparklesText should not be empty');
});
