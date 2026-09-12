import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
if(!process.argv.includes('--no-build')){const result=spawnSync(process.execPath,[path.join(root,'scripts/build.mjs')],{stdio:'inherit'});if(result.status!==0)process.exit(result.status||1);}
const dist=path.join(root,'dist'),port=Number(process.env.PORT)||4173,host=process.env.SARAH_HOST||'127.0.0.1';
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.woff':'font/woff','.txt':'text/plain; charset=utf-8'};
export const server=http.createServer((req,res)=>{
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405,{Allow:'GET, HEAD'});res.end();return;}
  let decoded;try{decoded=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end('Bad request');return;}
  const target=path.resolve(dist,'.'+decoded+(decoded.endsWith('/')?'index.html':''));
  if(!target.startsWith(dist+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
  try{
    const real=fs.realpathSync(target);if(!real.startsWith(dist+path.sep)||!fs.statSync(real).isFile())throw new Error('Invalid path');
    res.writeHead(200,{'Content-Type':types[path.extname(real)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'});
    if(req.method==='HEAD')res.end();else fs.createReadStream(real).pipe(res);
  }catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}
});
server.listen(port,host,()=>console.log('sarahUI ready at http://'+host+':'+port));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)));
