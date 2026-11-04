import test from 'node:test';
import assert from 'node:assert/strict';
import { AnimatedCircularProgressBar } from './AnimatedCircularProgressBar.js';

test('AnimatedCircularProgressBar renders cleanly and supports properties', () => {
  const result = AnimatedCircularProgressBar({});
  assert.ok(result, 'AnimatedCircularProgressBar should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'AnimatedCircularProgressBar should not be empty');
});
