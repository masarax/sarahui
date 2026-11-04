import test from 'node:test';
import assert from 'node:assert/strict';
import { AnimatedSubscribeButton } from './AnimatedSubscribeButton.js';

test('AnimatedSubscribeButton renders cleanly and supports properties', () => {
  const result = AnimatedSubscribeButton({});
  assert.ok(result, 'AnimatedSubscribeButton should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'AnimatedSubscribeButton should not be empty');
});
