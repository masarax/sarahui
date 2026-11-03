import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
if(!process.argv.includes('--no-build')){const result=spawnSync(process.execPath,[path.join(root,'scripts/build.mjs')],{stdio:'inherit'});if(result.status!==0)process.exit(result.status||1);}
const dist=path.join(root,'dist'),port=Number(process.env.PORT)||4173,host=process.env.SARAH_HOST||'127.0.0.1';
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.woff':'font/woff','.txt':'text/plain; charset=utf-8'};
const SECURITY_HEADERS={
  'Content-Security-Policy':"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; media-src 'self' data: https:; frame-src 'self' https:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
  'Strict-Transport-Security':'max-age=31536000; includeSubDomains; preload',
  'X-Frame-Options':'DENY',
  'X-Content-Type-Options':'nosniff',
  'X-XSS-Protection':'1; mode=block',
  'Referrer-Policy':'strict-origin-when-cross-origin',
  'Permissions-Policy':'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Opener-Policy':'same-origin',
  'Cross-Origin-Resource-Policy':'same-origin',
  'X-Permitted-Cross-Domain-Policies':'none'
};
export const server=http.createServer((req,res)=>{
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405,{Allow:'GET, HEAD',...SECURITY_HEADERS});res.end();return;}
  let decoded;try{decoded=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400,SECURITY_HEADERS);res.end('Bad request');return;}
  const target=path.resolve(dist,'.'+decoded+(decoded.endsWith('/')?'index.html':''));
  if(!target.startsWith(dist+path.sep)){res.writeHead(403,SECURITY_HEADERS);res.end('Forbidden');return;}
  try{
    const real=fs.realpathSync(target);if(!real.startsWith(dist+path.sep)||!fs.statSync(real).isFile())throw new Error('Invalid path');
    res.writeHead(200,{'Content-Type':types[path.extname(real)]||'application/octet-stream','Cache-Control':'no-cache',...SECURITY_HEADERS});
    if(req.method==='HEAD')res.end();else fs.createReadStream(real).pipe(res);
  }catch{
    if(!path.extname(decoded)||req.headers.accept?.includes('text/html')){
      const indexFile=path.join(dist,'index.html');
      if(fs.existsSync(indexFile)){
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache',...SECURITY_HEADERS});
        if(req.method==='HEAD')res.end();else fs.createReadStream(indexFile).pipe(res);
        return;
      }
    }
    res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8',...SECURITY_HEADERS});res.end('Not found');
  }
});
server.listen(port,host,()=>console.log('sarahUI ready at http://'+host+':'+port));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)));
