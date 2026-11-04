import test from 'node:test';
import assert from 'node:assert/strict';
import { Floating3DParticles } from './Floating3DParticles.js';

test('Floating3DParticles renders cleanly and supports properties', () => {
  const result = Floating3DParticles({});
  assert.ok(result, 'Floating3DParticles should produce a render output');
  const rendered = String(result);
  assert.ok(rendered.length > 0, 'Floating3DParticles should not be empty');
});
