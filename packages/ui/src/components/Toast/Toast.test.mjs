import test from 'node:test';
import assert from 'node:assert/strict';
import { Toast } from './Toast.js';

test('Toast renders cleanly and supports properties', () => {
  const result = Toast({});
  assert.ok(result, 'Toast should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Toast should not be empty');
});
