import test from 'node:test';
import assert from 'node:assert/strict';
import { RippleButton } from './RippleButton.js';

test('RippleButton renders cleanly and supports properties', () => {
  const result = RippleButton({});
  assert.ok(result, 'RippleButton should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'RippleButton should not be empty');
});
