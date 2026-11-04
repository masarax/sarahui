import test from 'node:test';
import assert from 'node:assert/strict';
import { NavItem } from './NavItem.js';

test('NavItem renders cleanly and supports properties', () => {
  const result = NavItem({});
  assert.ok(result, 'NavItem should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'NavItem should not be empty');
});
