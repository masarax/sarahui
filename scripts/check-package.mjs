import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const npm=process.env.npm_execpath;
assert(npm,'Run this check through npm run test:package.');
const run=(args,cwd=root)=>{
  const result=spawnSync(process.execPath,args,{cwd,encoding:'utf8',env:process.env});
  if(result.status!==0)throw new Error(result.stderr||result.stdout||'Package check failed');
  return result.stdout;
};
const output=path.join(root,'artifacts/npm');fs.mkdirSync(output,{recursive:true});
for(const file of fs.readdirSync(output))if(file.endsWith('.tgz'))fs.unlinkSync(path.join(output,file));
const [packed]=JSON.parse(run([npm,'pack','./packages/ui','--pack-destination',output,'--json','--ignore-scripts']));
assert.equal(packed.name,'sarahui');
assert(packed.files.some(file=>file.path==='LICENSE'));
assert(packed.files.some(file=>file.path==='README.md'));
assert.equal(packed.files.filter(file=>file.path.endsWith('.woff')).length,6);
assert.equal(packed.files.filter(file=>file.path.endsWith('-OFL.txt')).length,5);
assert(!packed.files.some(file=>/(^|\/)(node_modules|tests|apps|\.git|\.npmrc|\.env)(\/|$)|\.b64$|\.tgz$/.test(file.path)));
const fixture=fs.mkdtempSync(path.join(os.tmpdir(),'sarahui-consumer-'));
try{
  fs.writeFileSync(path.join(fixture,'package.json'),JSON.stringify({name:'sarahui-consumer-check',private:true,type:'module'}));
  run([npm,'install',path.join(output,packed.filename),'--ignore-scripts','--no-audit','--no-fund','--package-lock=false'],fixture);
  const consumer=`import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as ui from 'sarahui';
import * as templates from 'sarahui/templates';
import {sarahTokens} from 'sarahui/tokens';
assert.equal(ui.render(ui.html\`<p>\${ '<unsafe>' }</p>\`),'<p>&lt;unsafe&gt;</p>');
assert.match(ui.render(ui.Button({label:'Installed correctly'})),/Installed correctly/);
assert.equal(typeof templates.Dialog,'function');
assert.equal('enhanceUI' in templates,false);
assert.equal(sarahTokens.count,277);
assert.equal(Object.keys(sarahTokens.light).length,48);
for(const name of ['css','fonts.css','tokens.css','styles.css','tokens.json','resolved-tokens.json']){
  assert(fs.statSync(fileURLToPath(import.meta.resolve('sarahui/'+name))).isFile(),name);
}
const css=fileURLToPath(import.meta.resolve('sarahui/fonts.css'));
for(const match of fs.readFileSync(css,'utf8').matchAll(/url\\('([^']+)'\\)/g)){
  assert(fs.statSync(path.resolve(path.dirname(css),match[1])).isFile(),match[1]);
}
const complete=fileURLToPath(import.meta.resolve('sarahui/css'));
for(const match of fs.readFileSync(complete,'utf8').matchAll(/@import "([^"]+)"/g)){
  assert(fs.statSync(path.resolve(path.dirname(complete),match[1])).isFile(),match[1]);
}
const metadata=JSON.parse(fs.readFileSync(fileURLToPath(import.meta.resolve('sarahui/package.json'))));
assert.equal(metadata.name,'sarahui');assert.notEqual(metadata.private,true);assert.equal(metadata.license,'MIT');
assert.equal(Object.keys(metadata.dependencies||{}).length,0);
console.log('Packed consumer: ESM, templates, tokens, CSS and six bundled fonts passed.');
`;
  fs.writeFileSync(path.join(fixture,'consumer.mjs'),consumer);
  console.log(run(['consumer.mjs'],fixture).trim());
  fs.writeFileSync(path.join(fixture,'consumer.ts'),`import { Button, Dialog, Input, DataTable, html, render, enhanceUI, setTheme, type Content, type SarahEvents } from 'sarahui';
import { Badge } from 'sarahui/templates';
import { sarahTokens, type SarahColorToken } from 'sarahui/tokens';
const token: SarahColorToken = 'text/primary';
const color: string = sarahTokens.light[token];
const content: Content = html\`<section>\${Button({label:'Create',variant:'primary'})}\${Badge({label:'Ready'})}</section>\`;
render(Dialog({id:'create',title:'Create project',children:Input({id:'name',label:'Name'})}));
render(DataTable({columns:[{key:'name',label:'Name'}],rows:[{name:content}]}));
const cleanup: () => void = enhanceUI(document);cleanup();setTheme('system');
const selection: SarahEvents['sarah:selectionchange'] = {selected:['a'],count:1};
console.log(color,selection);
// @ts-expect-error Invalid variants must be rejected.
Button({variant:'not-a-variant'});
// @ts-expect-error Token names must be checked.
const invalid: SarahColorToken = 'not/a/token';
`);
  run([path.join(root,'node_modules/typescript/bin/tsc'),'--noEmit','--strict','--target','ES2022','--module','NodeNext','--moduleResolution','NodeNext','--lib','ES2022,DOM','consumer.ts'],fixture);
  console.log('Packed consumer: strict TypeScript declarations passed.');
}finally{fs.rmSync(fixture,{recursive:true,force:true});}
fs.writeFileSync(path.join(output,'package-manifest.json'),JSON.stringify({name:packed.name,version:packed.version,filename:packed.filename,integrity:packed.integrity,shasum:packed.shasum,files:packed.files},null,2)+'\n');
console.log('Verified npm tarball: '+packed.filename+' ('+packed.size+' bytes).');
