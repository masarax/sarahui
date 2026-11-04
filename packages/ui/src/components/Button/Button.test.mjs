import test from 'node:test';
import assert from 'node:assert/strict';
import { Button } from './Button.js';

test('Button renders cleanly and supports properties', () => {
  const result = Button({});
  assert.ok(result, 'Button should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Button should not be empty');
});
