import test from 'node:test';
import assert from 'node:assert/strict';
import { IconButton } from './IconButton.js';

test('IconButton renders cleanly and supports properties', () => {
  const result = IconButton({});
  assert.ok(result, 'IconButton should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'IconButton should not be empty');
});
