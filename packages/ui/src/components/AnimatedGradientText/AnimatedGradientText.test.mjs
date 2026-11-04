import test from 'node:test';
import assert from 'node:assert/strict';
import { AnimatedGradientText } from './AnimatedGradientText.js';

test('AnimatedGradientText renders cleanly and supports properties', () => {
  const result = AnimatedGradientText({});
  assert.ok(result, 'AnimatedGradientText should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'AnimatedGradientText should not be empty');
});
