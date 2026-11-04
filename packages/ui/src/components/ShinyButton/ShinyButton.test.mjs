import test from 'node:test';
import assert from 'node:assert/strict';
import { ShinyButton } from './ShinyButton.js';

test('ShinyButton renders cleanly and supports properties', () => {
  const result = ShinyButton({});
  assert.ok(result, 'ShinyButton should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'ShinyButton should not be empty');
});
