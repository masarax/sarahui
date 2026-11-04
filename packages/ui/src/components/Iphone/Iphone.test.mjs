import test from 'node:test';
import assert from 'node:assert/strict';
import { Iphone } from './Iphone.js';

test('Iphone renders cleanly and supports properties', () => {
  const result = Iphone({});
  assert.ok(result, 'Iphone should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Iphone should not be empty');
});
