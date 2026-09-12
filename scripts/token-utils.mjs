export const cssName = name => '--s-' + name.replaceAll('/','-');
export const resolveTheme = (spec,theme) => Object.fromEntries(Object.entries(spec.colors[theme]).map(([name,ref])=>[name,spec.primitives[ref]]));
export function countTokens(s) {
  return ['primitives','layout','typography','motion','layers','grid','componentTokens'].reduce((n,k)=>n+Object.keys(s[k]).length,0)+Object.values(s.colors).reduce((n,v)=>n+Object.keys(v).length,0);
}
export function validateTokens(s) {
  if(s.name!=='sarahUI')throw new Error('Expected sarahUI branding');
  const base = {...s.layout,...s.typography,...s.motion,...s.layers,...s.grid};
  const names=[...Object.keys(s.primitives).map(k=>'primitive/'+k),...Object.keys(base),...Object.keys(s.componentTokens),...Object.keys(s.colors.light)].map(cssName);
  if(new Set(names).size!==names.length)throw new Error('Duplicate CSS variable');
  for(const [k,v] of Object.entries(s.primitives))if(!/^#([\da-f]{6}|[\da-f]{8})$/i.test(v))throw new Error('Invalid color: '+k);
  if(JSON.stringify(Object.keys(s.colors.light).sort())!==JSON.stringify(Object.keys(s.colors.dark).sort()))throw new Error('Theme roles must match');
  for(const roles of Object.values(s.colors))for(const ref of Object.values(roles))if(!Object.hasOwn(s.primitives,ref))throw new Error('Unresolved color alias: '+ref);
  for(const [key,t] of Object.entries(base)) {
    if(!['px','ms',''].includes(t.unit))throw new Error('Invalid unit: '+key);
    if(typeof t.value==='number'&&(!Number.isFinite(t.value)||t.value<0))throw new Error('Invalid number: '+key);
    if(typeof t.value==='string'&&/[;{}<>]/.test(t.value))throw new Error('Unsafe token value: '+key);
  }
  for(const ref of Object.values(s.componentTokens))if(!Object.hasOwn(base,ref))throw new Error('Unresolved component alias: '+ref);
  return true;
}
export function contrast(a,b) {
  const lum = hex => {
    if(!/^#[\da-f]{6}$/i.test(hex))throw new Error('Contrast requires opaque colors');
    const v=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);
    return v[0]*.2126+v[1]*.7152+v[2]*.0722;
  };
  const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
