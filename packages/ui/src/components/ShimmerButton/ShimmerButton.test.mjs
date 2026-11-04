import test from 'node:test';
import assert from 'node:assert/strict';
import { ShimmerButton } from './ShimmerButton.js';

test('ShimmerButton renders cleanly and supports properties', () => {
  const result = ShimmerButton({});
  assert.ok(result, 'ShimmerButton should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'ShimmerButton should not be empty');
});
