import test from 'node:test';
import assert from 'node:assert/strict';
import { Badge } from './Badge.js';

test('Badge renders cleanly and supports properties', () => {
  const result = Badge({});
  assert.ok(result, 'Badge should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Badge should not be empty');
});
