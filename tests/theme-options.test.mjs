import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {setThemeOptions, applyStoredThemeOptions} from '../packages/ui/src/index.js';

const rootDir=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');

function fakeRoot(){
  const store=new Map();
  const events=[];
  const root={
    nodeType:1,
    dataset:{},
    ownerDocument:{
      defaultView:{
        CustomEvent:class CustomEvent{constructor(type,init={}){this.type=type;this.detail=init.detail;this.bubbles=Boolean(init.bubbles);}},
        localStorage:{
          getItem:key=>store.get(key)??null,
          setItem:(key,value)=>store.set(key,String(value))
        }
      }
    },
    dispatchEvent:event=>{events.push(event);return true;}
  };
  return {root,store,events};
}

test('setThemeOptions writes scoped data attributes and persists the applied values',()=>{
  const {root,store,events}=fakeRoot();
  const applied=setThemeOptions({accent:'violet',radius:'sm',cardRadius:'full',border:'none',shadow:'none',density:'compact'},{root});
  assert.deepEqual(applied,{accent:'violet',radius:'sm',cardRadius:'full',border:'none',shadow:'none',density:'compact'});
  assert.equal(root.dataset.sAccent,'violet');
  assert.equal(root.dataset.sRadius,'sm');
  assert.equal(root.dataset.sCardRadius,'full');
  assert.equal(root.dataset.sBorder,'none');
  assert.equal(root.dataset.sShadow,'none');
  assert.equal(root.dataset.sDensity,'compact');
  assert.deepEqual(JSON.parse(store.get('sarah-theme-options')),applied);
  assert.equal(events[0].type,'sarah:stylechange');
});

test('setThemeOptions clears an option without affecting the others',()=>{
  const {root}=fakeRoot();
  setThemeOptions({accent:'emerald',radius:'lg'},{root});
  const applied=setThemeOptions({accent:null},{root});
  assert.deepEqual(applied,{accent:null});
  assert.equal(root.dataset.sAccent,undefined);
  assert.equal(root.dataset.sRadius,'lg');
});

test('applyStoredThemeOptions restores persisted styling onto a new root',()=>{
  const {root,store}=fakeRoot();
  store.set('sarah-theme-options',JSON.stringify({accent:'amber',border:'strong',density:'spacious'}));
  const applied=applyStoredThemeOptions(root);
  assert.deepEqual(applied,{accent:'amber',border:'strong',density:'spacious'});
  assert.equal(root.dataset.sAccent,'amber');
  assert.equal(root.dataset.sBorder,'strong');
  assert.equal(root.dataset.sDensity,'spacious');
});

test('themes.css exposes the documented scoped theme contract',()=>{
  const css=fs.readFileSync(path.join(rootDir,'packages/ui/src/themes.css'),'utf8');
  for(const name of ['indigo','violet','blue','emerald','amber','red'])assert.match(css,new RegExp(`\\[data-s-accent="${name}"\\]`));
  for(const name of ['none','sm','lg','xl','full'])assert.match(css,new RegExp(`\\[data-s-radius="${name}"\\]`));
  assert.match(css,/\[data-s-card-radius="full"\]/);
  assert.match(css,/\[data-s-border="strong"\]/);
  assert.match(css,/\[data-s-shadow="lg"\]/);
  assert.match(css,/\[data-s-density="compact"\]/);
  assert.match(css,/light-dark\(/);
});
