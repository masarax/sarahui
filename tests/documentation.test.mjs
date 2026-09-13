import test from 'node:test';
import assert from 'node:assert/strict';
import * as templates from '../packages/ui/src/templates.js';
import {catalog} from '../apps/docs/catalog.mjs';
import {expressions,recipe,properties} from '../apps/docs/recipes.mjs';
import {setupExamples} from '../apps/docs/start.mjs';
test('All 32 copyable npm recipes render and include complete widget relationships',()=>{
  assert.equal(Object.keys(expressions).length,catalog.length);
  for(const {name} of catalog){
    const mount={innerHTML:'',addEventListener(){}};
    const document={querySelector:()=>mount,addEventListener(){}};
    const UI={...templates,enhanceUI:()=>()=>{},toast(){}};
    // Compile only this repository's authored example source, never user input.
    const executable=recipe(name).replace(/^import .+;\n/gm,'');
    new Function('UI','document',executable)(UI,document);
    assert.match(mount.innerHTML,/class="s-ui"/,name);
    assert(templates.render(properties(name)).includes('<code>'),name+' properties');
    const ids=new Set([...mount.innerHTML.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
    for(const match of mount.innerHTML.matchAll(/(?:aria-controls|data-s-dialog-open)="([^"]+)"/g)){
      assert(ids.has(match[1]),name+' missing linked widget '+match[1]);
    }
  }
});
test('The first JavaScript setup example mounts a working action',()=>{
  const mount={innerHTML:''},listeners=[];
  const button={addEventListener:(type,fn)=>listeners.push({type,fn})};
  const document={querySelector:selector=>selector==='#app'?mount:button};
  let enhanced=false;
  const UI={...templates,enhanceUI:()=>{enhanced=true;return()=>{};},toast(){}};
  const source="const {Card,Button,render,enhanceUI,toast}=UI;\n"+setupExamples.JavaScript.replace(/^import .+;\n/gm,'');
  new Function('UI','document',source)(UI,document);
  assert.match(mount.innerHTML,/id="hello-button"/);
  assert(enhanced);assert.equal(listeners[0].type,'click');
  listeners[0].fn();
});
