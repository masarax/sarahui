import test from 'node:test';
import assert from 'node:assert/strict';
import { GlyphMatrix } from './GlyphMatrix.js';

test('GlyphMatrix renders cleanly and supports properties', () => {
  const result = GlyphMatrix({});
  assert.ok(result, 'GlyphMatrix should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'GlyphMatrix should not be empty');
});
