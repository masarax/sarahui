import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import './build-tokens.mjs';
import './prepare-package.mjs';
import {buildSite} from '../apps/docs/site.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),dist=path.join(root,'dist');
fs.rmSync(dist,{recursive:true,force:true});
fs.mkdirSync(dist,{recursive:true});
fs.cpSync(path.join(root,'packages/ui/src'),path.join(dist,'ui'),{recursive:true});
fs.cpSync(path.join(root,'packages/ui/assets'),path.join(dist,'assets'),{recursive:true,filter:source=>!source.endsWith('.b64')&&!source.endsWith('.ttf')});
fs.mkdirSync(path.join(dist,'tokens'),{recursive:true});
for(const name of ['app.css','app.js','highlighter.mjs'])fs.copyFileSync(path.join(root,'apps/docs',name),path.join(dist,name));
for(const [source,name] of [['tokens/sarah.tokens.json','sarah.tokens.json'],['tokens/generated/sarah.resolved.json','sarah.resolved.json'],['tokens/generated/sarah.css','sarah.css']])fs.copyFileSync(path.join(root,source),path.join(dist,'tokens',name));
fs.writeFileSync(path.join(dist,'index.html'),buildSite());
fs.copyFileSync(path.join(root,'apps/docs/htaccess'),path.join(dist,'.htaccess'));
fs.writeFileSync(path.join(dist,'assets/sarah-mark.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="12" fill="#5B3DF5"/><path d="M28 11H18a6 6 0 0 0 0 12h4a3 3 0 0 1 0 6H12M12 29h10a6 6 0 0 0 0-12h-4a3 3 0 0 1 0-6h10" stroke="white" stroke-width="3.6" stroke-linecap="round" fill="none"/></svg>');
for(let i=1;i<=3;i++)fs.writeFileSync(path.join(dist,'assets','sample-'+i+'.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="Sample image '+i+'"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5B3DF5"/><stop offset="1" stop-color="#178BFF"/></linearGradient></defs><rect width="640" height="360" fill="url(#g)"/><text x="50%" y="50%" fill="white" font-family="system-ui, sans-serif" font-size="56" font-weight="700" text-anchor="middle" dominant-baseline="middle">Sample '+i+'</text></svg>');
const avatarInk=['#5B3DF5','#178BFF','#0EA5A4','#D946EF','#F97316','#10B981'];
const avatarNames={jack:'JA',jill:'JI',john:'JO',jane:'JN',jenny:'JE',james:'JM'};
for(const [name,initials] of Object.entries(avatarNames)){
  const color=avatarInk[Object.keys(avatarNames).indexOf(name)%avatarInk.length];
  fs.writeFileSync(path.join(dist,'assets','avatar-'+name+'.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" role="img" aria-label="Avatar '+name+'"><rect width="80" height="80" rx="40" fill="'+color+'"/><circle cx="40" cy="31" r="15" fill="rgba(255,255,255,.92)"/><path d="M12 76c3-17 14-26 28-26s25 9 28 26" fill="rgba(255,255,255,.92)"/><text x="62" y="27" fill="white" font-family="system-ui, sans-serif" font-size="15" font-weight="700" text-anchor="middle">'+initials+'</text></svg>');
}
for(let i=1;i<=6;i++){
  const color=avatarInk[(i-1)%avatarInk.length];
  fs.writeFileSync(path.join(dist,'assets','avatar-'+i+'.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" role="img" aria-label="Member avatar '+i+'"><rect width="80" height="80" rx="40" fill="'+color+'"/><circle cx="40" cy="31" r="15" fill="rgba(255,255,255,.92)"/><path d="M12 76c3-17 14-26 28-26s25 9 28 26" fill="rgba(255,255,255,.92)"/><text x="63" y="26" fill="white" font-family="system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle">'+i+'</text></svg>');
}
for(let i=1;i<=9;i++){
  const hue=(i*41)%360, sky='hsl('+hue+' 82% 72%)', deep='hsl('+((hue+40)%360)+' 70% 42%)', land='hsl('+((hue+180)%360)+' 38% 28%)';
  fs.writeFileSync(path.join(dist,'assets','photo-'+i+'.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" role="img" aria-label="Abstract landscape '+i+'"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+sky+'"/><stop offset="1" stop-color="'+deep+'"/></linearGradient></defs><rect width="640" height="420" fill="url(#sky)"/><circle cx="'+(120+i*42)%600+'" cy="92" r="48" fill="rgba(255,255,255,.72)"/><path d="M0 310 150 '+(150+i*8)+' 300 280 430 190 640 300V420H0Z" fill="'+land+'" opacity=".82"/><path d="M0 350 190 250 360 330 510 240 640 340V420H0Z" fill="rgba(12,24,48,.45)"/></svg>');
}
fs.writeFileSync(path.join(dist,'assets','video.html'),'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>sarahUI video placeholder</title><style>html,body{height:100%;margin:0}body{display:grid;place-items:center;background:linear-gradient(135deg,#5B3DF5,#178BFF);color:#fff;font:600 20px/1.5 system-ui,sans-serif;text-align:center}div{padding:32px}span{display:block;font-size:13px;font-weight:400;opacity:.8;margin-top:8px}</style><div>sarahUI showcase<span>Replace this local placeholder with your own video URL.</span></div></html>');
console.log('sarahUI: built documentation and distributable components in dist/.');
