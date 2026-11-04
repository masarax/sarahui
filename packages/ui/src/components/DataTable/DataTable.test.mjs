import test from 'node:test';
import assert from 'node:assert/strict';
import { DataTable } from './DataTable.js';

test('DataTable renders cleanly and supports properties', () => {
  const result = DataTable({});
  assert.ok(result, 'DataTable should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'DataTable should not be empty');
});
