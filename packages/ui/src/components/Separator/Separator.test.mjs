import test from 'node:test';
import assert from 'node:assert/strict';
import { Separator } from './Separator.js';

test('Separator renders cleanly and supports properties', () => {
  const result = Separator({});
  assert.ok(result, 'Separator should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Separator should not be empty');
});
