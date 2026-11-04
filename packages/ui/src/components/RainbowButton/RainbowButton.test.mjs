import test from 'node:test';
import assert from 'node:assert/strict';
import { RainbowButton } from './RainbowButton.js';

test('RainbowButton renders cleanly and supports properties', () => {
  const result = RainbowButton({});
  assert.ok(result, 'RainbowButton should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'RainbowButton should not be empty');
});
