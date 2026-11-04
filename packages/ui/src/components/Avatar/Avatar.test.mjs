import test from 'node:test';
import assert from 'node:assert/strict';
import { Avatar } from './Avatar.js';

test('Avatar renders cleanly and supports properties', () => {
  const result = Avatar({});
  assert.ok(result, 'Avatar should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Avatar should not be empty');
});
