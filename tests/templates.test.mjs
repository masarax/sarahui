import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as UI from '../packages/ui/src/index.js';
import {catalog} from '../apps/docs/catalog.mjs';
const {render,html}=UI;
test('Imports and enhancement are safe during server rendering',()=>{assert.equal(typeof UI.enhanceUI(),'function');assert.equal(UI.setTheme('dark'),'dark');});
test('Text, attributes and nested composition escape hostile input',()=>{
  const text='"><img src=x onerror=alert(1)>';
  const result=render(html`<section>${UI.Button({label:text,attrs:{title:text,onclick:'alert(2)',style:'display:none'}})}${[text,UI.Badge({label:text})]}</section>`);
  assert.ok(!result.includes('<img'));assert.ok(!result.includes(' onclick='));assert.ok(!result.includes(' style='));assert.ok(result.includes('&lt;img'));
});
test('Untrusted objects cannot masquerade as trusted markup',()=>assert.equal(render({value:'<script>alert(1)</script>'}),'[object Object]'));
test('Unsafe URL protocols are blocked',()=>{
  for(const url of ['javascript:alert(1)','java\tscript:alert(1)','data:text/html,<script>1</script>','vbscript:1'])assert.equal(UI.safeHref(url),'#');
  for(const url of ['#patterns','./guide','https://example.com','mailto:hello@example.com'])assert.equal(UI.safeHref(url),url);
});
test('Labeled fields expose errors and native form attributes',()=>{
  const result=render(UI.Input({id:'email',label:'Email',error:'Enter an email',type:'email',attrs:{required:true,name:'email'}}));
  assert.match(result,/for="email"/);assert.match(result,/aria-invalid="true"/);assert.match(result,/aria-describedby="email-help"/);assert.match(result,/type="email"/);assert.match(result,/ required/);
});
test('Loading buttons cannot resubmit a form',()=>{const text=render(UI.Button({loading:true,attrs:{type:'submit'}}));assert.match(text,/ disabled/);assert.match(text,/aria-busy="true"/);});
test('Tabs skip a disabled requested initial selection',()=>{const text=render(UI.Tabs({id:'t',active:0,items:[{label:'Disabled',content:'a',disabled:true},{label:'Enabled',content:'b'}]}));assert.match(text,/id="t-tab-1" role="tab" aria-selected="true"/);});
test('All 32 declared families have a concrete export and rendered demo',()=>{
  const s=JSON.parse(fs.readFileSync(new URL('../tokens/sarah.tokens.json',import.meta.url),'utf8'));assert.equal(catalog.length,32);assert.deepEqual(new Set(catalog.map(c=>c.name)),new Set(s.components));
  for(const item of catalog){assert.equal(typeof UI[item.name],'function');assert.ok(render(item.demo('test-'+item.name)).length>30);}
});
test('Generated field IDs are unique within the rendering process',()=>{const a=render(UI.Input()),b=render(UI.Input());assert.notEqual(a.match(/id="([^"]+)"/)[1],b.match(/id="([^"]+)"/)[1]);});
test('Table row IDs preserve application identity through sort',()=>{const text=render(UI.DataTable({rows:[{id:'stable-42',name:'Example'}],selectable:true}));assert.match(text,/data-row="stable-42"/);assert.match(text,/Select Example/);});
