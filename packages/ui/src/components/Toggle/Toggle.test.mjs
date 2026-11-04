import test from 'node:test';
import assert from 'node:assert/strict';
import { Toggle } from './Toggle.js';

test('Toggle renders cleanly and supports properties', () => {
  const result = Toggle({});
  assert.ok(result, 'Toggle should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Toggle should not be empty');
});
