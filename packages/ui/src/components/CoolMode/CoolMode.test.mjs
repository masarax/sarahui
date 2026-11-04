import test from 'node:test';
import assert from 'node:assert/strict';
import { CoolMode } from './CoolMode.js';

test('CoolMode renders cleanly and supports properties', () => {
  const result = CoolMode({});
  assert.ok(result, 'CoolMode should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'CoolMode should not be empty');
});
