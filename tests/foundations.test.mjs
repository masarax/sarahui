import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateTokens,resolveTheme,countTokens,contrast} from '../scripts/token-utils.mjs';
const s=JSON.parse(fs.readFileSync(new URL('../tokens/sarah.tokens.json',import.meta.url),'utf8'));
test('Complete foundation resolves without duplicate or dangling aliases',()=>{assert.equal(validateTokens(s),true);assert.equal(countTokens(s),277);assert.equal(s.textStyles.length,15);});
test('Invalid aliases fail before output generation',()=>{const bad=structuredClone(s);bad.colors.light['text/primary']='missing/color';assert.throws(()=>validateTokens(bad),/alias/);});
test('Unsafe token values are rejected',()=>{const bad=structuredClone(s);bad.typography['font/body'].value='Inter; color:red';assert.throws(()=>validateTokens(bad),/Unsafe/);});
for(const theme of ['light','dark']) {
  const colors=resolveTheme(s,theme);
  const pairs=[];
  for(const fg of ['text/primary','text/secondary','text/muted','text/brand','text/link'])for(const bg of ['bg/surface','bg/canvas','bg/subtle'])pairs.push([fg,bg,4.5]);
  for(const bg of ['action/primary','action/primary-hover','action/primary-pressed'])pairs.push(['action/on-primary',bg,4.5]);
  for(const bg of ['action/danger','action/danger-hover'])pairs.push(['action/on-danger',bg,4.5]);
  for(const tone of ['success','warning','danger','info'])pairs.push(['status/'+tone+'-text','status/'+tone+'-bg',4.5]);
  for(const fg of ['border/focus','border/strong'])pairs.push([fg,'bg/surface',3]);
  for(const [fg,bg,min] of pairs)test(theme+' contrast '+fg+' / '+bg,()=>assert.ok(contrast(colors[fg],colors[bg])>=min,contrast(colors[fg],colors[bg]).toFixed(2)+' < '+min));
}
test('Control target and spacing scales are intentional',()=>{assert.deepEqual(['sm','md','lg'].map(k=>s.layout['size/control/'+k].value),[40,48,56]);assert.equal(s.layout['spacing/24'].value,24);});
