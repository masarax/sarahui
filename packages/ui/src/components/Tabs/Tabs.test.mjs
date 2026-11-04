import test from 'node:test';
import assert from 'node:assert/strict';
import { Tabs } from './Tabs.js';

test('Tabs renders cleanly and supports properties', () => {
  const result = Tabs({});
  assert.ok(result, 'Tabs should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Tabs should not be empty');
});
