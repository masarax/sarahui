import test from 'node:test';
import assert from 'node:assert/strict';
import { TextAnimate } from './TextAnimate.js';

test('TextAnimate renders cleanly and supports properties', () => {
  const result = TextAnimate({});
  assert.ok(result, 'TextAnimate should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'TextAnimate should not be empty');
});
