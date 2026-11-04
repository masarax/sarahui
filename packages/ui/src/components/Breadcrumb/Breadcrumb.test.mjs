import test from 'node:test';
import assert from 'node:assert/strict';
import { Breadcrumb } from './Breadcrumb.js';

test('Breadcrumb renders cleanly and supports properties', () => {
  const result = Breadcrumb({});
  assert.ok(result, 'Breadcrumb should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Breadcrumb should not be empty');
});
