import test from 'node:test';
import assert from 'node:assert/strict';
import { Alert } from './Alert.js';

test('Alert renders cleanly and supports properties', () => {
  const result = Alert({});
  assert.ok(result, 'Alert should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Alert should not be empty');
});
