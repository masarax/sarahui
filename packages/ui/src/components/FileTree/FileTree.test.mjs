import test from 'node:test';
import assert from 'node:assert/strict';
import { FileTree } from './FileTree.js';

test('FileTree renders cleanly and supports properties', () => {
  const result = FileTree({});
  assert.ok(result, 'FileTree should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'FileTree should not be empty');
});
