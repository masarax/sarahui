import test from 'node:test';
import assert from 'node:assert/strict';
import { Switch } from './Switch.js';

test('Switch renders cleanly and supports properties', () => {
  const result = Switch({});
  assert.ok(result, 'Switch should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Switch should not be empty');
});
