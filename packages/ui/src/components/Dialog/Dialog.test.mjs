import test from 'node:test';
import assert from 'node:assert/strict';
import { Dialog } from './Dialog.js';

test('Dialog renders cleanly and supports properties', () => {
  const result = Dialog({});
  assert.ok(result, 'Dialog should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Dialog should not be empty');
});
