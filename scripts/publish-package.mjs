import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
const directory=path.resolve('artifacts/npm');
const manifest=JSON.parse(fs.readFileSync(path.join(directory,'package-manifest.json'),'utf8'));
const pkg=JSON.parse(fs.readFileSync('packages/ui/package.json','utf8'));
assert.equal(manifest.name,'sarahui');assert.equal(manifest.version,pkg.version);
assert.match(manifest.filename,/^sarahui-\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?\.tgz$/);
const tarball=path.join(directory,manifest.filename);
const integrity='sha512-'+createHash('sha512').update(fs.readFileSync(tarball)).digest('base64');
assert.equal(integrity,manifest.integrity,'The artifact must match the tested tarball.');
assert(process.env.npm_execpath,'Run through npm run publish:verified.');
const run=(args,cwd=process.cwd())=>{
  const result=spawnSync(process.execPath,[process.env.npm_execpath,...args],{cwd,stdio:'inherit',env:process.env});
  if(result.status!==0)throw new Error('npm command failed with exit status '+result.status);
};
const registry='https://registry.npmjs.org/sarahui/'+encodeURIComponent(manifest.version);
const lookup=async()=>{
  const response=await fetch(registry,{signal:AbortSignal.timeout(20000)});
  if(response.status===404)return null;
  if(!response.ok)throw new Error('Registry lookup failed: HTTP '+response.status);
  return response.json();
};
let published=await lookup();
if(published){
  assert.equal(published.dist.integrity,integrity,'This version already contains different files. Increase packages/ui/package.json version before publishing changes.');
  console.log('The exact sarahui@'+manifest.version+' tarball is already published.');
}else{
  assert(process.env.NODE_AUTH_TOKEN,'Add the NPM_TOKEN repository secret with permission to publish sarahui.');
  run(['publish',tarball,'--access','public','--provenance','--ignore-scripts']);
  for(let attempt=0;attempt<6;attempt++){
    published=await lookup();if(published)break;
    await new Promise(resolve=>setTimeout(resolve,3000));
  }
  assert(published,'Publication completed but public registry verification is still unavailable.');
  assert.equal(published.dist.integrity,integrity);
}
const fixture=fs.mkdtempSync(path.join(os.tmpdir(),'sarahui-registry-'));
try{
  fs.writeFileSync(path.join(fixture,'package.json'),JSON.stringify({name:'sarahui-public-install-check',private:true,type:'module'}));
  run(['install','sarahui@'+manifest.version,'--registry=https://registry.npmjs.org/','--ignore-scripts','--no-audit','--no-fund','--package-lock=false'],fixture);
  fs.writeFileSync(path.join(fixture,'verify.mjs'),"import assert from 'node:assert/strict';import{Button,render}from'sarahui';assert.match(render(Button({label:'npm install sarahui works'})),/npm install sarahui works/);console.log('Public npm installation verified.');");
  const test=spawnSync(process.execPath,['verify.mjs'],{cwd:fixture,stdio:'inherit'});
  assert.equal(test.status,0);
}finally{fs.rmSync(fixture,{recursive:true,force:true});}
if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,'## sarahui@'+manifest.version+'\n\nPublished artifact verified against its SHA-512 integrity and installed from the public npm registry.\n\nInstall: `npm install sarahui`\n\n[Open npm package](https://www.npmjs.com/package/sarahui)\n');
