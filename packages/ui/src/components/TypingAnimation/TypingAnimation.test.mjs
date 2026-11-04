import test from 'node:test';
import assert from 'node:assert/strict';
import { TypingAnimation } from './TypingAnimation.js';

test('TypingAnimation renders cleanly and supports properties', () => {
  const result = TypingAnimation({});
  assert.ok(result, 'TypingAnimation should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'TypingAnimation should not be empty');
});
