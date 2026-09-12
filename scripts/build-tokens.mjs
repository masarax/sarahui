import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {validateTokens,resolveTheme,cssName,countTokens} from './token-utils.mjs';
const root = new URL('../',import.meta.url);
const spec=JSON.parse(fs.readFileSync(new URL('tokens/sarah.tokens.json',root),'utf8'));
validateTokens(spec);
let css='/* Generated from tokens/sarah.tokens.json. Run npm run tokens. */\n:root {\n';
const line=(name,value)=>'  '+cssName(name)+': '+value+';\n';
for(const [key,v] of Object.entries(spec.primitives))css+=line('primitive/'+key,v);
for(const group of ['layout','typography','motion','layers','grid'])for(const [key,t] of Object.entries(spec[group]))css+=line(key,key.startsWith('font/')?JSON.stringify(t.value):String(t.value)+t.unit);
for(const [key,ref] of Object.entries(spec.componentTokens))css+=line(key,'var('+cssName(ref)+')');
css+=line('brand/gradient',spec.brand.gradient);
for(const e of spec.effects)css+=line('shadow/'+e.name.toLowerCase(),e.x+'px '+e.y+'px '+e.blur+'px '+e.spread+'px rgb(13 16 32 / '+e.alpha+')');
css+='}\n';
for(const theme of ['light','dark']) {
  css+=(theme==='light'?':root, ':'')+'[data-theme="'+theme+'"] {\n  color-scheme: '+theme+';\n';
  for(const [key,ref] of Object.entries(spec.colors[theme]))css+=line(key,'var('+cssName('primitive/'+ref)+')');
  css+='}\n';
}
css+='@media (prefers-reduced-motion: reduce) { :root { --s-duration-fast: 0ms; --s-duration-normal: 0ms; --s-duration-slow: 0ms; } }\n';
for(const t of spec.textStyles)css+='.s-type-'+t.name.toLowerCase().replaceAll('/','-')+' { font-family:var(--s-font-'+t.family+'),sans-serif; font-size:var(--s-font-size-'+t.size+'); line-height:var(--s-line-height-'+t.lineHeight+'); font-weight:'+t.weight+'; letter-spacing:'+t.tracking+'px; }\n';
const resolved={name:spec.name,version:spec.version,light:resolveTheme(spec,'light'),dark:resolveTheme(spec,'dark'),count:countTokens(spec)};
for(const [name,content] of Object.entries({
  'packages/ui/src/tokens.css':css,
  'tokens/generated/sarah.css':css,
  'tokens/generated/sarah.resolved.json':JSON.stringify(resolved,null,2)+'\n',
  'tokens/generated/sarah.tokens.ts':'// Generated. Edit tokens/sarah.tokens.json instead.\nexport const sarahTokens = '+JSON.stringify(resolved,null,2)+' as const;\nexport type SarahColorToken = keyof typeof sarahTokens.light;\n'
}))fs.writeFileSync(new URL(name,root),content);
console.log('sarahUI: generated '+countTokens(spec)+' token entries, 2 themes, 15 type styles.');
