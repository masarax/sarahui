/**
 * Native HTML templates. Interpolated strings are escaped; compose markup with
 * html tagged templates. Never put untrusted values in literal markup.
 */
export const escapeText = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
class Markup { constructor(value){this.value=value;} toString(){return this.value;} }
export const raw = value => new Markup(value);
export const render = value => value instanceof Markup?value.value:Array.isArray(value)?value.map(render).join(''):escapeText(value);
export const html = (parts,...values) => raw(parts.reduce((s,p,i)=>s+p+(i<values.length?render(values[i]):''),''));
export function safeHref(value='#') {
  const text=String(value).trim();
  try{return ['http:','https:','mailto:','tel:'].includes(new URL(text,'https://sarahui.invalid/').protocol)?text:'#';}catch{return '#';}
}
const allowed = new Set('id class name title type value placeholder required disabled checked min max step autocomplete rows role tabindex href download target rel selected hidden open multiple pattern minlength maxlength form inputmode readonly for autofocus cols wrap dir lang accept list size'.split(' '));
export function attributes(props={}) {
  return Object.entries(props).map(([key,value])=>{
    if((!allowed.has(key)&&!/^(aria|data)-[a-z0-9-]+$/.test(key))||value==null||(value===false&&!key.startsWith('aria-')))return '';
    if(key==='href')value=safeHref(value);
    return value===true&&!key.startsWith('aria-')?' '+key:' '+key+'="'+escapeText(value)+'"';
  }).join('');
}
let counter=0;
const uid=(name,id)=>id||'s-'+name+'-'+(++counter);
const choice=(v,options,fallback)=>options.includes(v)?v:fallback;
export const ICONS={
  arrow:'M5 12h14m-6-6 6 6-6 6',chevron:'m8 4 8 8-8 8',down:'m5 9 7 7 7-7',check:'m4 12 5 5L20 6',plus:'M12 5v14M5 12h14',close:'m6 6 12 12M18 6 6 18',
  search:'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Zm4.7-1.8L21 21',
  moon:'M20.5 14A8.6 8.6 0 0 1 10 3.5 8.6 8.6 0 1 0 20.5 14Z',sun:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5',
  grid:'M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z',layers:'m12 3 10 5-10 5L2 8Zm-9 9 9 5 9-5m-18 5 9 5 9-5',type:'M3 5h18M12 5v15M8 20h8',
  palette:'M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1.4-3.4 1.7 1.7 0 0 1 1.2-2.9H18a3 3 0 0 0 3-3.1A9 9 0 0 0 12 3ZM7 10h.01M10 6.5h.01M15 6.5h.01M18 10h.01',
  code:'m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18',copy:'M9 8h12v13H9Zm-6 8V3h12',download:'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  globe:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z',
  shield:'m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Zm-5 9 3 3 7-7',spark:'m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z',
  settings:'M4 6h16M4 18h16M8 3v6m8 6v6M4 12h16M15 9v6',menu:'M4 6h16M4 12h16M4 18h16',mail:'M3 5h18v14H3Zm0 0 9 8 9-8',
  info:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 11v6M12 7h.01',alert:'m12 3 10 18H2Zm0 6v5m0 3h.01',
  bell:'M5 17h14l-2-3V9a5 5 0 0 0-10 0v5Zm5 3h4',folder:'M3 6h7l2 3h9v12H3Zm0 0V3h7l2 3h9v3',
  link:'m9 15 6-6M7 13l-2 2a3.5 3.5 0 0 0 5 5l3-3m-2-10 2-2a3.5 3.5 0 0 1 5 5l-3 3',heart:'M12 21 3.5 12.5a5.3 5.3 0 0 1 7.5-7.5l1 1 1-1a5.3 5.3 0 0 1 7.5 7.5Z',
  more:'M5 12h.01M12 12h.01M19 12h.01',user:'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 21v-3a8 8 0 0 1 16 0v3',calendar:'M4 5h16v16H4ZM8 2v6m8-6v6M4 11h16',trash:'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',clock:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 7v6l4 2',
  refresh:'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M3 21v-5h5'
};
export function Icon({name='spark',size=20,label=''}={}) {
  const n=Math.max(12,Math.min(64,Number(size)||20));
  return raw('<svg class="s-icon" width="'+n+'" height="'+n+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"'+(label?' role="img" aria-label="'+escapeText(label)+'"':' aria-hidden="true"')+'><path d="'+(Object.hasOwn(ICONS,name)?ICONS[name]:ICONS.spark)+'"/></svg>');
}
export function Logo({compact=false}={}) {return raw('<span class="s-logo"><svg width="38" height="38" viewBox="0 0 40 40" fill="none" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#5B3DF5"/><path d="M28 11H18a6 6 0 0 0 0 12h4a3 3 0 0 1 0 6H12M12 29h10a6 6 0 0 0 0-12h-4a3 3 0 0 1 0-6h10" stroke="white" stroke-width="3.6" stroke-linecap="round"/></svg>'+(compact?'':'<span>sarah<span class="s-text-brand">UI</span></span>')+'</span>');}
export function Spinner({label='Loading',decorative=false}={}) {return raw('<span class="s-spinner"'+(decorative?' aria-hidden="true"':' role="status" aria-label="'+escapeText(label)+'"')+'></span>');}
export function Button({label='Continue',variant='primary',size='md',icon='',trailing='',disabled=false,loading=false,attrs={},className=''}={}) {
  return raw('<button'+attributes({type:'button',...attrs,class:'s-button s-button--'+choice(variant,['primary','secondary','outline','ghost','danger'],'primary')+' s-button--'+choice(size,['sm','md','lg'],'md')+' '+className,disabled:disabled||loading,'aria-busy':loading?'true':null})+'>'+(loading?render(Spinner({decorative:true})):icon?render(Icon({name:icon})): '')+'<span>'+escapeText(label)+'</span>'+(trailing?render(Icon({name:trailing})): '')+'</button>');
}
export function IconButton({icon='plus',label='Add item',variant='outline',size='md',attrs={},disabled=false,className=''}={}) {
  const customClass = [attrs.class, className].filter(Boolean).join(' ');
  const {class: _c, ...restAttrs} = attrs;
  return raw('<button'+attributes({type:'button',...restAttrs,class:('s-button s-icon-button s-button--'+choice(variant,['primary','secondary','outline','ghost','danger'],'outline')+' s-button--'+choice(size,['sm','md','lg'],'md')+(customClass?' '+customClass:'')).trim(),'aria-label':label,disabled})+'>'+render(Icon({name:icon}))+'</button>');
}
export const ButtonGroup=({label='Actions',children=[]}={})=>html`<div class="s-button-group" role="group" aria-label="${label}">${children}</div>`;
const fieldLabel=(id,label,required)=>'<label class="s-label" for="'+escapeText(id)+'">'+escapeText(label)+(required?' <span class="s-required" aria-hidden="true">*</span>':'')+'</label>';
const fieldHelp=(id,helper,error)=>helper||error?'<p id="'+escapeText(id)+'-help" class="s-field-help'+(error?' s-field-error':'')+'">'+escapeText(error||helper)+'</p>':'';
export function Input({id,label='Email address',helper='',error='',icon='',type='text',required,attrs={}}={}) {
  id=uid('input',id);type=choice(type,['text','email','password','number','search','tel','url','date','time'],'text');
  const isReq=required??attrs.required??false;
  return raw('<div class="s-field">'+fieldLabel(id,label,isReq)+'<div class="s-input-wrap">'+(icon?render(Icon({name:icon})): '')+'<input'+attributes({...attrs,id,type,required:isReq||null,class:'s-input'+(icon?' s-input--icon':''),'aria-invalid':error?'true':null,'aria-describedby':helper||error?id+'-help':null})+'></div>'+fieldHelp(id,helper,error)+'</div>');
}
export function Textarea({id,label='Description',helper='',error='',value='',required,attrs={}}={}) {
  id=uid('textarea',id);const isReq=required??attrs.required??false;
  return raw('<div class="s-field">'+fieldLabel(id,label,isReq)+'<textarea'+attributes({rows:3,...attrs,id,required:isReq||null,class:'s-input s-textarea','aria-invalid':error?'true':null,'aria-describedby':helper||error?id+'-help':null})+'>'+escapeText(value)+'</textarea>'+fieldHelp(id,helper,error)+'</div>');
}
export function Select({id,label='Workspace',options=['Personal','Team'],value,helper='',error='',required,attrs={}}={}) {
  id=uid('select',id);const isReq=required??attrs.required??false;
  return raw('<div class="s-field">'+fieldLabel(id,label,isReq)+'<div class="s-select-wrap"><select'+attributes({...attrs,id,required:isReq||null,class:'s-input s-select','aria-invalid':error?'true':null,'aria-describedby':helper||error?id+'-help':null})+'>'+options.map(o=>{o=typeof o==='string'?{label:o,value:o}:o;return '<option'+attributes({value:o.value,selected:String(o.value)===String(value),disabled:o.disabled})+'>'+escapeText(o.label)+'</option>';}).join('')+'</select>'+render(Icon({name:'down',size:16}))+'</div>'+fieldHelp(id,helper,error)+'</div>');
}
function toggle(kind,{id,label='Keep me updated',description='',checked=false,disabled=false,attrs={}}={}) {
  id=uid(kind,id);return raw('<label class="s-choice s-choice--'+kind+'" for="'+escapeText(id)+'"><input'+attributes({...attrs,id,type:kind==='radio'?'radio':'checkbox',class:'s-choice-input s-'+kind,role:kind==='switch'?'switch':null,checked,disabled,'aria-describedby':description?id+'-description':null})+'><span class="s-choice-copy"><span>'+escapeText(label)+'</span>'+(description?'<small id="'+escapeText(id)+'-description">'+escapeText(description)+'</small>':'')+'</span></label>');
}
export const Checkbox=p=>toggle('checkbox',p);
export const Radio=p=>toggle('radio',p);
export const Switch=p=>toggle('switch',p);
export function Slider({id,label='Volume',value=64,min=0,max=100,step=1,attrs={}}={}) {
  id=uid('slider',id);const n=Math.max(min,Math.min(max,Number(value)||0));
  return raw('<div class="s-field s-slider-field"><div class="s-between">'+fieldLabel(id,label,false)+'<output for="'+escapeText(id)+'">'+n+'</output></div><input'+attributes({...attrs,id,type:'range',class:'s-slider',value:n,min,max,step,'data-s-slider':true})+'></div>');
}
export function Badge({label='Active',tone='success',dot=true}={}) {return html`<span class="s-badge s-tone-${choice(tone,['success','warning','danger','info','brand','neutral'],'neutral')}">${dot?html`<i class="s-status-dot" aria-hidden="true"></i>`:''}${label}</span>`;}
export function Chip({label='Design',removable=false,selected=false}={}) {return html`<span class="s-chip ${selected?'s-chip--selected':''}">${label}${removable?IconButton({icon:'close',label:'Remove '+label,size:'sm',variant:'ghost',attrs:{'data-s-chip-remove':true}}):''}</span>`;}
export function Avatar({name='Sarah Khan',initials='',size='md',tone='brand',status=false,src=''}={}) {const letters=initials||name.trim().split(/\s+/).map(s=>Array.from(s)[0]||'').slice(0,2).join('').toUpperCase();const img=src?raw('<img class="s-avatar-img" src="'+safeHref(src)+'" alt="'+escapeText(name)+'" onerror="this.remove()">'):'';return html`<span class="s-avatar s-avatar--${choice(size,['sm','md','lg'],'md')} s-tone-${choice(tone,['brand','info','success','warning'],'brand')}" role="img" aria-label="${name+(status?' · Online':'')}">${img}${letters}${status?html`<i class="s-avatar-status" aria-hidden="true"></i>`:''}</span>`;}
export const Card=({title='',description='',children='',footer='',className=''}={})=>html`<article class="s-card ${className}">${title?html`<header class="s-card-header"><h3>${title}</h3><p>${description}</p></header>`:''}<div class="s-card-body">${children}</div>${footer?html`<footer class="s-card-footer">${footer}</footer>`:''}</article>`;
export function Alert({title='All changes saved',description='Your workspace is up to date.',tone='success',live=false,dismissible=false,icon=''}={}) {tone=choice(tone,['success','warning','danger','info'],'info');const roleAttr=live?(tone==='danger'?' role="alert"':' role="status"'):'';const iconName=icon||(tone==='success'?'check':tone==='info'?'info':'alert');const closeBtn=dismissible?'<button type="button" class="s-alert-close" data-s-alert-close aria-label="Dismiss alert">'+render(Icon({name:'close',size:16}))+'</button>':'';return raw('<div class="s-alert s-tone-'+tone+'"'+roleAttr+'>'+render(Icon({name:iconName}))+'<div><strong>'+escapeText(title)+'</strong><p>'+escapeText(description)+'</p></div>'+closeBtn+'</div>');}
export function Tabs({id,label='Project details',items=[{label:'Overview',content:'Overview content'},{label:'Activity',content:'Activity content'}],active=0,variant='line'}={}) {
  id=uid('tabs',id);active=Math.max(0,Math.min(items.length-1,active));if(items[active]?.disabled)active=items.findIndex(i=>!i.disabled);
  return raw('<div class="s-tabs s-tabs--'+choice(variant,['line','pill'],'line')+'" data-s-tabs><div class="s-tab-list" role="tablist" aria-label="'+escapeText(label)+'">'+items.map((item,i)=>'<button'+attributes({type:'button',class:'s-tab',id:id+'-tab-'+i,role:'tab','aria-selected':String(i===active),'aria-controls':id+'-panel-'+i,tabindex:i===active?0:-1,disabled:item.disabled})+'>'+escapeText(item.label)+'</button>').join('')+'</div>'+items.map((item,i)=>'<div'+attributes({class:'s-tab-panel',id:id+'-panel-'+i,role:'tabpanel','aria-labelledby':id+'-tab-'+i,tabindex:0,hidden:i!==active})+'>'+render(item.content)+'</div>').join('')+'</div>');
}
export const Breadcrumb=({items=[{label:'Workspace',href:'#patterns'},{label:'Design system'}],label='Breadcrumb'}={})=>html`<nav class="s-breadcrumb" aria-label="${label}"><ol>${items.map((item,i)=>html`<li>${i?Icon({name:'chevron',size:13}):''}${i===items.length-1?html`<span aria-current="page">${item.label}</span>`:html`<a href="${safeHref(item.href)}">${item.label}</a>`}</li>`)}</ol></nav>`;
export function Pagination({pages=5,current=1,label='Pagination'}={}) {
  pages=Math.max(1,Math.min(20,Math.floor(Number(pages)||1)));current=Math.max(1,Math.min(pages,Math.floor(Number(current)||1)));
  return raw('<nav class="s-pagination" data-s-pagination data-pages="'+pages+'" data-current="'+current+'" aria-label="'+escapeText(label)+'">'+render(IconButton({icon:'chevron',label:'Previous page',size:'sm',disabled:current===1,attrs:{'data-page':'prev','data-direction':'back'}}))+Array.from({length:pages},(_,i)=>'<button'+attributes({type:'button',class:'s-page','data-page':i+1,'aria-label':'Page '+(i+1),'aria-current':i+1===current?'page':null})+'>'+(i+1)+'</button>').join('')+render(IconButton({icon:'chevron',label:'Next page',size:'sm',disabled:current===pages,attrs:{'data-page':'next'}}))+'</nav>');
}
export const NavItem=({label='Overview',href='#overview',icon='grid',active=false,badge=''}={})=>raw('<a'+attributes({class:'s-nav-item',href,'aria-current':active?'page':null})+'>'+(icon?render(Icon({name:icon,size:19})): '')+'<span>'+escapeText(label)+'</span>'+(badge?'<small>'+escapeText(badge)+'</small>':'')+'</a>');
export function DataTable({id,caption='Projects',columns=[{key:'name',label:'Project'},{key:'status',label:'Status'}],rows=[],selectable=false}={}) {
  id=uid('table',id);
  return raw('<div class="s-table-scroll" tabindex="0" role="region" aria-label="'+escapeText(caption)+' table"><table class="s-table" id="'+escapeText(id)+'" data-s-table><caption class="s-sr-only">'+escapeText(caption)+'</caption><thead><tr>'+(selectable?'<th scope="col">'+render(Checkbox({id:id+'-all',label:'Select all rows',attrs:{'data-s-select-all':true}}))+'</th>':'')+columns.map(c=>'<th scope="col">'+(c.sortable?'<button type="button" data-s-sort="'+escapeText(c.key)+'">'+escapeText(c.label)+render(Icon({name:'down',size:14}))+'</button>':escapeText(c.label))+'</th>').join('')+'</tr></thead><tbody>'+rows.map((row,i)=>'<tr data-row="'+escapeText(row.id??i)+'">'+(selectable?'<td>'+render(Checkbox({id:id+'-row-'+i,label:'Select '+String(row.name??'row '+(i+1)),attrs:{'data-s-row-select':true}}))+'</td>':'')+columns.map(c=>'<td'+attributes({'data-column':c.key,'data-sort':typeof row[c.key]==='string'||typeof row[c.key]==='number'?row[c.key]:null})+'>'+render(row[c.key])+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>');
}
export const Accordion=({items=[{title:'Can I customize the tokens?',content:'Yes. Change the source tokens and rebuild.'}]}={})=>raw('<div class="s-accordion">'+items.map(item=>'<details'+attributes({open:item.open})+'><summary>'+escapeText(item.title)+render(Icon({name:'plus',size:18}))+'</summary><div>'+render(item.content)+'</div></details>').join('')+'</div>');
export function Dialog({id,title='Create a project',description='Give your next idea a place to grow.',children='',footer=''}={}) {
  id=uid('dialog',id);return raw('<dialog'+attributes({id,class:'s-dialog','aria-labelledby':id+'-title','aria-describedby':description?id+'-description':null})+'><header class="s-dialog-header"><div><h2 id="'+escapeText(id)+'-title">'+escapeText(title)+'</h2>'+(description?'<p id="'+escapeText(id)+'-description">'+escapeText(description)+'</p>':'')+'</div>'+render(IconButton({icon:'close',label:'Close dialog',variant:'ghost',attrs:{'data-s-dialog-close':true}}))+'</header><div class="s-dialog-body">'+render(children)+'</div>'+(footer?'<footer class="s-dialog-footer">'+render(footer)+'</footer>':'')+'</dialog>');
}
export function Tooltip({id,label='More information',text='A little context, right where you need it.',icon='info'}={}) {id=uid('tooltip',id);return html`<span class="s-tooltip" data-s-tooltip>${IconButton({icon,label,variant:'ghost',attrs:{'aria-describedby':id}})}<span class="s-tooltip-bubble" id="${id}" role="tooltip">${text}</span></span>`;}
export function Progress({value=68,label='Project progress',showLabel=true}={}) {value=Math.max(0,Math.min(100,Number(value)||0));return html`<div class="s-progress-wrap">${showLabel?html`<div class="s-between s-small"><span>${label}</span><strong>${value}%</strong></div>`:''}<progress class="s-progress" value="${value}" max="100" aria-label="${label}">${value}%</progress></div>`;}
export function Skeleton({lines=3,label='Loading content'}={}) {return html`<div class="s-skeleton-group" role="status" aria-label="${label}">${Array.from({length:Math.max(1,Math.min(10,Math.floor(Number(lines)||3)))},()=>html`<span class="s-skeleton" aria-hidden="true"></span>`)}</div>`;}
export const EmptyState=({title='Make room for your next idea',description='Create your first project to bring everything together.',action='',icon='folder'}={})=>html`<div class="s-empty-state"><span>${Icon({name:icon,size:27})}</span><h3>${title}</h3><p>${description}</p>${action}</div>`;
export const Separator=({label=''}={})=>label?html`<div class="s-separator-label"><span>${label}</span></div>`:html`<hr class="s-separator">`;
export const Toast=({title='Saved successfully',description='Your changes are ready.',tone='success'}={})=>html`<div class="s-toast s-tone-${choice(tone,['success','info','warning','danger'],'success')}">${Icon({name:tone==='success'?'check':'info'})}<div><strong>${title}</strong><p>${description}</p></div>${IconButton({icon:'close',label:'Dismiss notification',size:'sm',variant:'ghost',attrs:{'data-s-toast-close':true}})}</div>`;
export function Menu({id,label='Project actions',items=[{label:'View project',icon:'folder',value:'view'},{label:'Copy link',icon:'link',value:'copy'}]}={}) {
  id=uid('menu',id);return raw('<div class="s-menu" data-s-menu>'+render(Button({label,variant:'outline',trailing:'down',attrs:{'data-s-menu-trigger':true,'aria-haspopup':'menu','aria-expanded':'false','aria-controls':id}}))+'<div class="s-menu-panel" role="menu" id="'+escapeText(id)+'" aria-label="'+escapeText(label)+'" hidden>'+items.map(item=>'<button'+attributes({type:'button',role:'menuitem',class:'s-menu-item'+(item.danger?' s-menu-danger':''),tabindex:-1,'data-value':item.value,disabled:item.disabled})+'>'+render(Icon({name:item.icon||'arrow',size:17}))+escapeText(item.label)+'</button>').join('')+'</div></div>');
}
export function CommandPalette({id='s-command',title='Search the library',items=[]}={}) {
  return html`<dialog id="${id}" class="s-dialog s-command" data-s-command aria-label="${title}"><div class="s-command-search">${Icon({name:'search',size:22})}<input type="search" role="combobox" aria-label="${title}" aria-expanded="true" aria-autocomplete="list" aria-controls="${id}-results" data-s-command-input data-s-autofocus placeholder="What are you looking for?" autocomplete="off">${IconButton({icon:'close',label:'Close search',variant:'ghost',attrs:{'data-s-dialog-close':true}})}</div><div class="s-command-list" id="${id}-results" role="listbox" aria-label="Results">${items.map((item,i)=>html`<div role="option" aria-selected="false" id="${id}-option-${i}" data-href="${safeHref(item.href)}" data-keywords="${item.keywords||item.label}">${Icon({name:item.icon||'layers',size:19})}<span>${item.label}</span>${Icon({name:'arrow',size:15})}</div>`)}</div><p data-s-command-empty hidden>No results. Try a different search.</p><footer><span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span><span><kbd>↵</kbd> to open</span><span><kbd>esc</kbd> to close</span></footer></dialog>`;
}
export function Toggle({label='Toggle',icon='',pressed=false,size='md',attrs={}}={}) {
  const isPressed=Boolean(pressed);
  return raw('<button'+attributes({type:'button',class:'s-toggle s-toggle--'+choice(size,['sm','md','lg'],'md'),'aria-pressed':String(isPressed),'data-s-toggle':true,...attrs})+'>'+(icon?render(Icon({name:icon,size:size==='sm'?14:16})): '')+'<span>'+escapeText(label)+'</span></button>');
}
export function ToggleGroup({label='Toggle group',items=[],type='single',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-toggle-group',role:'group','aria-label':label,'data-s-toggle-group':type,...attrs})+'>'+items.map(item=>render(Toggle(item))).join('')+'</div>');
}
export function Kbd({keys=[],label='',size='md',attrs={}}={}) {
  const kList=Array.isArray(keys)&&keys.length?keys:(label?[label]:['⌘','K']);
  return raw('<span'+attributes({class:'s-kbd s-kbd--'+choice(size,['sm','md','lg'],'md'),...attrs})+'>'+kList.map(k=>'<kbd>'+escapeText(k)+'</kbd>').join('')+'</span>');
}
export function AspectRatio({ratio='16/9',children='',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-aspect-ratio',style:'aspect-ratio:'+escapeText(ratio),...attrs})+'>'+render(children)+'</div>');
}
export function BentoGrid({children='',columns=3,attrs={}}={}) {
  return raw('<div'+attributes({class:'s-bento-grid',style:'--bento-cols:'+Number(columns||3),...attrs})+'>'+render(children)+'</div>');
}
export function BentoCard({title='Feature Title',description='Feature description detail.',graphic='',icon='spark',cta='Learn more',href='#',attrs={}}={}) {
  return raw('<article'+attributes({class:'s-bento-card',...attrs})+'><div class="s-bento-card-header">'+(icon?render(Icon({name:icon,size:20})):'')+'<h3>'+escapeText(title)+'</h3><p>'+escapeText(description)+'</p></div>'+(graphic?'<div class="s-bento-card-graphic">'+render(graphic)+'</div>':'')+(cta?'<div class="s-bento-card-footer"><a class="s-text-link" href="'+safeHref(href)+'"><span>'+escapeText(cta)+'</span> '+render(Icon({name:'arrow',size:14}))+'</a></div>':'')+'</article>');
}
export function Drawer({id,title='Side Panel',description='Slide-over drawer content.',children='',position='right',attrs={}}={}) {
  id=uid('drawer',id);
  return raw('<dialog'+attributes({id,class:'s-drawer s-drawer--'+choice(position,['right','left','bottom'],'right'),'aria-labelledby':id+'-title','aria-describedby':description?id+'-description':null,...attrs})+'><header class="s-dialog-header"><div><h2 id="'+escapeText(id)+'-title">'+escapeText(title)+'</h2>'+(description?'<p id="'+escapeText(id)+'-description">'+escapeText(description)+'</p>':'')+'</div>'+render(IconButton({icon:'close',label:'Close drawer',variant:'ghost',attrs:{'data-s-dialog-close':true}}))+'</header><div class="s-dialog-body">'+render(children)+'</div></dialog>');
}
export function Popover({id,trigger=Button({label:'Open popover'}),content='Popover content',attrs={}}={}) {
  id=uid('popover',id);
  return raw('<div'+attributes({class:'s-popover',id,'data-s-popover':true,...attrs})+'>'+render(trigger)+'<div class="s-popover-content" role="region" aria-label="Popover panel" hidden>'+render(content)+'</div></div>');
}
export function Marquee({children='',direction='horizontal',reverse=false,pauseOnHover=true,speed=24,vertical=false,attrs={}}={}) {
  const isVert=vertical||direction==='vertical';
  const vertClass=isVert?' s-marquee--vertical':'';
  const revClass=reverse?' s-marquee--reverse':'';
  const pauseClass=pauseOnHover?' s-marquee--pause':'';
  const content=render(children);
  return raw('<div'+attributes({class:'s-marquee'+vertClass+revClass+pauseClass,'data-s-marquee':true,...attrs})+'><div class="s-marquee-track">'+content+'</div><div class="s-marquee-track" aria-hidden="true">'+content+'</div></div>');
}
export function BorderBeam({size=200,duration=10,colorFrom='',colorTo='',reverse=false,attrs={}}={}) {
  const style=(size?`--size:${size}px;`:'')+(duration?`--duration:${duration}s;`:'');
  const revClass=reverse?' s-border-beam--reverse':'';
  return raw('<div'+attributes({class:'s-border-beam'+revClass,style:style||null,'aria-hidden':'true',...attrs})+'></div>');
}
export function AnimatedShinyText({text='Shimmering text animation',shimmerWidth=100,attrs={}}={}) {
  return raw('<span'+attributes({class:'s-shiny-text',style:shimmerWidth?`--shimmer-width:${shimmerWidth}px`:null,...attrs})+'>'+escapeText(text)+'</span>');
}
export function NumberTicker({value=100,direction='up',delay=0,decimalPlaces=0,attrs={}}={}) {
  return raw('<span'+attributes({class:'s-number-ticker','data-s-number-ticker':String(value),'data-direction':direction,'data-delay':String(delay),'data-decimals':String(decimalPlaces),...attrs})+'>'+Number(value).toFixed(decimalPlaces)+'</span>');
}
export function Ripple({mainCircleSize=210,numCircles=5,attrs={}}={}) {
  const circles=Array.from({length:Math.max(1,Math.min(8,Number(numCircles)||5))},(_,i)=>{
    const size=mainCircleSize+i*45;
    const delay=(i*0.4).toFixed(1);
    return `<div class="s-ripple-circle" style="width:${size}px;height:${size}px;animation-delay:${delay}s"></div>`;
  }).join('');
  return raw('<div'+attributes({class:'s-ripple','aria-hidden':'true',...attrs})+'>'+circles+'</div>');
}
export function RetroGrid({angle=65,attrs={}}={}) {
  return raw('<div'+attributes({class:'s-retro-grid','aria-hidden':'true',...attrs})+'><div class="s-retro-grid-plane" style="transform:rotateX('+Number(angle||65)+'deg)"></div></div>');
}
export function ShineBorder({children='',borderWidth=1,duration=6,color='',attrs={}}={}) {
  const style=(borderWidth?`border-width:${borderWidth}px;`:'')+(duration?`--shine-duration:${duration}s;`:'')+(color?`--shine-color:${color};`:'');
  return raw('<div'+attributes({class:'s-shine-border',style:style||null,...attrs})+'><div class="s-shine-border-inner">'+render(children)+'</div></div>');
}
export function Meteors({number=12,attrs={}}={}) {
  const meteors=Array.from({length:Math.max(1,Math.min(30,Number(number)||12))},(_,i)=>{
    const left=Math.floor((i/12)*100);
    const delay=((i%5)*0.4).toFixed(1);
    const duration=(4+(i%4)*0.8).toFixed(1);
    return `<span class="s-meteor" style="top:0;left:${left}%;animation-delay:${delay}s;animation-duration:${duration}s;"></span>`;
  }).join('');
  return raw('<div'+attributes({class:'s-meteors','aria-hidden':'true',...attrs})+'>'+meteors+'</div>');
}
export function Particles({quantity=30,staticity=50,ease=50,color='',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-particles','data-s-particles':String(quantity),'data-color':color||'',...attrs})+'><canvas class="s-particles-canvas"></canvas></div>');
}
export function Confetti({label='Celebrate',icon='spark',attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-button s-button--primary s-confetti-btn','data-s-confetti':true,...attrs})+'>'+(icon?render(Icon({name:icon,size:16})):'')+'<span>'+escapeText(label)+'</span></button>');
}
export function MagicCard({children='',gradientColor='',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-magic-card','data-s-magic-card':true,style:gradientColor?`--magic-color:${gradientColor};`:null,...attrs})+'>'+render(children)+'</div>');
}
export function TypingAnimation({text='Thoughtful design system',duration=100,delay=0,attrs={}}={}) {
  return raw('<span'+attributes({class:'s-typing-animation','data-s-typing':escapeText(text),'data-duration':String(duration),'data-delay':String(delay),...attrs})+'>'+escapeText(text)+'<span class="s-typing-cursor" aria-hidden="true"></span></span>');
}
export function WordRotate({words=['Components','Motion','Design','Craft'],duration=2500,attrs={}}={}) {
  const arr=Array.isArray(words)&&words.length?words:['Components','Motion','Design'];
  return raw('<span'+attributes({class:'s-word-rotate','data-s-word-rotate':JSON.stringify(arr),'data-duration':String(duration),...attrs})+'><span class="s-word-rotate-item">'+escapeText(arr[0])+'</span></span>');
}
export function BlurFade({children='',delay=0,duration=0.6,yOffset=12,blur=8,attrs={}}={}) {
  const style=`animation-delay:${Number(delay||0)}s;animation-duration:${Number(duration||0.6)}s;`;
  return raw('<div'+attributes({class:'s-blur-fade',style,...attrs})+'>'+render(children)+'</div>');
}
export function ShimmerButton({label='Shimmer Action',icon='',trailing='',attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-shimmer-button',...attrs})+'>'+(icon?render(Icon({name:icon,size:16}))+' ':'')+'<span>'+escapeText(label)+'</span>'+(trailing?' '+render(Icon({name:trailing,size:14})):'')+'</button>');
}
export function RainbowButton({label='Rainbow Action',icon='',trailing='',attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-rainbow-button',...attrs})+'><span class="s-rainbow-button-inner">'+(icon?render(Icon({name:icon,size:16}))+' ':'')+'<span>'+escapeText(label)+'</span>'+(trailing?' '+render(Icon({name:trailing,size:14})):'')+'</span></button>');
}
export function Dock({items=[{icon:'spark',label:'Spark'},{icon:'layers',label:'Layers'},{icon:'grid',label:'Grid'},{icon:'settings',label:'Settings'}],attrs={}}={}) {
  const list=(Array.isArray(items)?items:[]).map(item=>`<button type="button" class="s-dock-icon" title="${escapeText(item.label||'')}">${render(Icon({name:item.icon||'spark',size:20}))}</button>`).join('');
  return raw('<nav'+attributes({class:'s-dock','data-s-dock':true,'aria-label':'Quick tools',...attrs})+'>'+list+'</nav>');
}
export function AvatarCircles({numPeople=4,avatars=['SK','AM','JK','MR'],attrs={}}={}) {
  const list=(Array.isArray(avatars)?avatars:['SK','AM','JK']).map(initials=>`<div class="s-avatar s-avatar--sm"><span class="s-avatar-initials">${escapeText(initials)}</span></div>`).join('');
  const extra=Number(numPeople)>avatars.length?`<span class="s-avatar-circles-count">+${Number(numPeople)-avatars.length}</span>`:'';
  return raw('<div'+attributes({class:'s-avatar-circles',...attrs})+'>'+list+extra+'</div>');
}
export function AnimatedBeam({duration=3,delay=0,attrs={}}={}) {
  const id=uid('beam');
  return raw('<svg'+attributes({class:'s-animated-beam',style:`--beam-duration:${duration}s;--beam-delay:${delay}s;`,...attrs})+'><defs><linearGradient id="'+id+'" class="s-beam-gradient" gradientUnits="userSpaceOnUse"><stop stop-color="#18CCFC" stop-opacity="0"></stop><stop stop-color="#18CCFC"></stop><stop offset="32.5%" stop-color="#6344F5"></stop><stop offset="100%" stop-color="#AE48FF" stop-opacity="0"></stop></linearGradient></defs><path class="s-beam-path-bg" d="M 20 60 C 120 10, 200 110, 300 60" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none"></path><path class="s-beam-path" d="M 20 60 C 120 10, 200 110, 300 60" stroke="url(#'+id+')" stroke-width="2.5" fill="none"></path></svg>');
}
export function Terminal({children='',command='npx sarahui@latest init',steps=[
  '✔ Preflight checks.',
  '✔ Verifying framework.',
  '✔ Validating Tailwind CSS preset.',
  '✔ Initializing sarahui components.',
  '✔ Installing dependencies.'
],output='Success! Project initialization completed.',attrs={}}={}) {
  const stepsData = Array.isArray(steps) && steps.length ? JSON.stringify(steps) : '';
  return raw('<div'+attributes({class:'s-terminal','data-s-terminal':true,'data-command':command,'data-steps':stepsData||null,'data-output':output||null,...attrs})+'><div class="s-terminal-header"><div class="s-terminal-dots"><span class="s-dot-red"></span><span class="s-dot-yellow"></span><span class="s-dot-green"></span></div><span class="s-terminal-title">bash</span><button type="button" class="s-terminal-copy" data-copy-value="'+escapeText(command)+'" aria-label="Copy command">'+render(Icon({name:'copy',size:13}))+'</button></div><div class="s-terminal-body"><div class="s-terminal-prompt"><span class="s-terminal-dollar">$</span> <span class="s-terminal-cmd"></span><span class="s-terminal-cursor"></span></div><div class="s-terminal-steps"></div>'+(output?`<div class="s-terminal-output" style="display:none;">${escapeText(output)}</div>`:'')+(children?`<div class="s-terminal-custom">${render(children)}</div>`:'')+'</div></div>');
}
export function OrbitingCircles({children='',radius=100,duration=20,delay=0,reverse=false,path=true,iconSize=36,items=[],attrs={}}={}) {
  const r = Number(radius) || 100;
  const d = Number(duration) || 20;
  const childArray = Array.isArray(items) && items.length ? items : (Array.isArray(children) && children.length ? children : (children ? [children] : [Icon({name:'spark',size:18}), Icon({name:'layers',size:18}), Icon({name:'grid',size:18})]));
  const count = Math.max(1, childArray.length);
  const pathSvg = path ? `<svg class="s-orbit-circle-path" viewBox="0 0 ${r*2+40} ${r*2+40}"><circle cx="50%" cy="50%" r="${r}" fill="none" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/></svg>` : '';
  const renderedItems = childArray.map((child, idx) => {
    const angle = (360 / count) * idx;
    const style = `--radius:${r};--duration:${d};--angle:${angle};--icon-size:${iconSize}px;`;
    return `<div class="s-orbit-item${reverse ? ' s-orbit-reverse' : ''}" style="${style}">${render(child)}</div>`;
  }).join('');
  return raw('<div'+attributes({class:'s-orbiting-circles'+(reverse?' s-orbit-reverse':''),style:`min-height:${r*2+40}px;`,...attrs})+'>'+pathSvg+renderedItems+'</div>');
}
export function Globe({size=300,attrs={}}={}) {
  const n=Math.max(160,Math.min(600,Number(size)||300));
  return raw('<div'+attributes({class:'s-globe-container',style:`width:${n}px;height:${n}px;`,...attrs})+'><canvas class="s-globe-canvas" data-s-globe width="'+(n*2)+'" height="'+(n*2)+'"></canvas><div class="s-globe-glow"></div></div>');
}
export function AnimatedList({items=[],delay=1200,attrs={}}={}) {
  const arr = Array.isArray(items) && items.length ? items : [
    html`<div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);"><span style="font-size:20px;">⚡</span><div><strong style="display:block;font-size:13px;">Instant Build Complete</strong><span class="s-small s-muted">Bundled in 42ms with zero errors</span></div></div>`,
    html`<div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);"><span style="font-size:20px;">🎨</span><div><strong style="display:block;font-size:13px;">New Theme Applied</strong><span class="s-small s-muted">Custom glassmorphism palette active</span></div></div>`,
    html`<div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);"><span style="font-size:20px;">🚀</span><div><strong style="display:block;font-size:13px;">Components Deployed</strong><span class="s-small s-muted">120 items synced to sarahui registry</span></div></div>`,
    html`<div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);"><span style="font-size:20px;">🔒</span><div><strong style="display:block;font-size:13px;">Security Audit Passed</strong><span class="s-small s-muted">Zero external dependencies verified</span></div></div>`
  ];
  const initial = arr.slice(0, 3).map(item => `<div class="s-animated-list-item">${render(item)}</div>`).join('');
  return raw('<div'+attributes({class:'s-animated-list','data-s-animated-list':true,'data-delay':String(delay),'data-items':JSON.stringify(arr),...attrs})+'>'+initial+'</div>');
}
export function InteractiveHoverButton({label='Get Started',icon='arrow',attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-interactive-hover-btn',...attrs})+'><span class="s-interactive-hover-text">'+escapeText(label)+'</span><div class="s-interactive-hover-dot"></div><div class="s-interactive-hover-arrow">'+render(Icon({name:icon,size:15}))+'</div></button>');
}
export function PulsatingButton({label='Explore Components',pulseColor='#5B3DF5',attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-pulsating-button',style:pulseColor?`--pulse-color:${pulseColor};`:null,...attrs})+'><div class="s-pulse-ring"></div><span>'+escapeText(label)+'</span></button>');
}
export function SparklesText({text='Sparkles Magic',sparklesCount=6,attrs={}}={}) {
  const stars=Array.from({length:sparklesCount},(_,i)=>`<span class="s-sparkle-star s-sparkle-${i%3}" style="top:${(15+i*14)%80}%;left:${(10+i*22)%90}%;animation-delay:${(i*0.25).toFixed(2)}s;"></span>`).join('');
  return raw('<span'+attributes({class:'s-sparkles-text',...attrs})+'>'+stars+'<span class="s-sparkles-content">'+escapeText(text)+'</span></span>');
}
export function TextReveal({text='Magical web components built with pure CSS and zero runtime dependencies.',attrs={}}={}) {
  const words=String(text).split(' ').map((word,i)=>`<span class="s-reveal-word" style="--word-index:${i}">${escapeText(word)}&nbsp;</span>`).join('');
  return raw('<div'+attributes({class:'s-text-reveal',...attrs})+'>'+words+'</div>');
}
export function GridPattern({width=40,height=40,x=0,y=0,squares=[[1,1],[3,2],[5,1]],attrs={}}={}) {
  const id=uid('grid');
  const sq=(Array.isArray(squares)?squares:[]).map(([sx,sy])=>`<rect x="${sx*width+1}" y="${sy*height+1}" width="${width-1}" height="${height-1}" class="s-grid-fill"/>`).join('');
  return raw('<svg'+attributes({class:'s-grid-pattern','aria-hidden':'true',...attrs})+'><defs><pattern id="'+id+'" width="'+width+'" height="'+height+'" patternUnits="userSpaceOnUse" x="'+x+'" y="'+y+'"><path d="M.5 '+height+'V.5H'+width+'" fill="none" stroke="currentColor" stroke-dasharray="0"></path></pattern></defs><rect width="100%" height="100%" stroke-width="0" fill="url(#'+id+')"></rect><svg x="'+x+'" y="'+y+'" class="s-grid-squares">'+sq+'</svg></svg>');
}
export function DotPattern({width=20,height=20,cr=1,attrs={}}={}) {
  const id=uid('dots');
  return raw('<svg'+attributes({class:'s-dot-pattern','aria-hidden':'true',...attrs})+'><defs><pattern id="'+id+'" width="'+width+'" height="'+height+'" patternUnits="userSpaceOnUse"><circle cx="'+cr+'" cy="'+cr+'" r="'+cr+'" fill="currentColor"></circle></pattern></defs><rect width="100%" height="100%" stroke-width="0" fill="url(#'+id+')"></rect></svg>');
}
export function AnimatedGridPattern({width=30,height=30,numSquares=20,maxOpacity=0.5,attrs={}}={}) {
  const id=uid('animgrid');
  const squares=Array.from({length:numSquares},(_,i)=>`<rect width="${width-1}" height="${height-1}" x="${(i*37)%18*width+1}" y="${(i*19)%12*height+1}" class="s-anim-grid-sq" style="animation-delay:${(i*0.3).toFixed(1)}s;--max-opacity:${maxOpacity};"></rect>`).join('');
  return raw('<svg'+attributes({class:'s-animated-grid-pattern','aria-hidden':'true',...attrs})+'><defs><pattern id="'+id+'" width="'+width+'" height="'+height+'" patternUnits="userSpaceOnUse"><path d="M '+width+' 0 L 0 0 0 '+height+'" fill="none" stroke="currentColor" stroke-width="0.5"></path></pattern></defs><rect width="100%" height="100%" fill="url(#'+id+')"></rect><svg class="s-anim-grid-squares">'+squares+'</svg></svg>');
}
export function FlickeringGrid({squareSize=4,gridGap=6,flickerChance=0.3,color='#5B3DF5',maxOpacity=0.5,attrs={}}={}) {
  return raw('<div'+attributes({class:'s-flickering-grid',style:`--fg-color:${color};--fg-opacity:${maxOpacity};`,'aria-hidden':'true',...attrs})+'><canvas class="s-flickering-canvas" data-s-flickering data-square-size="'+squareSize+'" data-grid-gap="'+gridGap+'" data-flicker-chance="'+flickerChance+'"></canvas></div>');
}
export function WarpBackground({children='',beams=6,attrs={}}={}) {
  const beamElements=Array.from({length:beams},(_,i)=>`<div class="s-warp-beam" style="--warp-i:${i};"></div>`).join('');
  return raw('<div'+attributes({class:'s-warp-container',...attrs})+'><div class="s-warp-perspective">'+beamElements+'</div><div class="s-warp-content">'+render(children)+'</div></div>');
}
export function NeonGradientCard({children='',neonColors={firstColor:'#178BFF',secondColor:'#A020FF'},borderRadius=16,borderSize=2,attrs={}}={}) {
  const style=`--neon-first:${neonColors.firstColor||'#178BFF'};--neon-second:${neonColors.secondColor||'#A020FF'};--neon-radius:${borderRadius}px;--neon-border:${borderSize}px;`;
  return raw('<div'+attributes({class:'s-neon-card',style,...attrs})+'><div class="s-neon-card-glow"></div><div class="s-neon-card-inner">'+render(children)+'</div></div>');
}
export function CoolMode({children='',particle='spark',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-cool-mode','data-s-cool-mode':particle||'spark',...attrs})+'>'+render(children)+'</div>');
}
export function ScrollProgress({height=3,color='#5B3DF5',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-scroll-progress',style:`height:${height}px;--scroll-color:${color};`,'aria-hidden':'true',...attrs})+'><div class="s-scroll-progress-bar" data-s-scroll-progress></div></div>');
}
export function ProgressiveBlur({direction='bottom',blurLevels=[0.5,1,2,4,8,16,32,64],height='35%',attrs={}}={}) {
  const dir = choice(direction,['top','bottom'],'bottom');
  const layers = blurLevels.map((lvl, idx) => {
    const start = (idx * 12.5).toFixed(1);
    const mid = ((idx + 1) * 12.5).toFixed(1);
    const end = ((idx + 2) * 12.5).toFixed(1);
    const mask = dir === 'bottom'
      ? `linear-gradient(to bottom, rgba(0,0,0,0) ${start}%, rgba(0,0,0,1) ${mid}%, rgba(0,0,0,1) ${end}%, rgba(0,0,0,0) ${(Number(end)+12.5).toFixed(1)}%)`
      : `linear-gradient(to top, rgba(0,0,0,0) ${start}%, rgba(0,0,0,1) ${mid}%, rgba(0,0,0,1) ${end}%, rgba(0,0,0,0) ${(Number(end)+12.5).toFixed(1)}%)`;
    return `<div class="s-progressive-blur-layer" style="backdrop-filter:blur(${lvl}px);-webkit-backdrop-filter:blur(${lvl}px);mask-image:${mask};-webkit-mask-image:${mask};z-index:${idx+1};"></div>`;
  }).join('');
  return raw('<div'+attributes({class:'s-progressive-blur s-progressive-blur--'+dir,style:`--blur-height:${height};`,'aria-hidden':'true',...attrs})+'>'+layers+'</div>');
}
export function HyperText({text='SARAHUI DESIGN',duration=800,attrs={}}={}) {
  return raw('<span'+attributes({class:'s-hyper-text','data-s-hyper-text':escapeText(text),'data-duration':String(duration),...attrs})+'>'+escapeText(text)+'</span>');
}
export function MorphingText({texts=['DESIGN','ENGINEER','EXPERIENCE','CRAFT'],attrs={}}={}) {
  const arr=Array.isArray(texts)&&texts.length?texts:['SARAH','MODERN','UI'];
  const id=uid('morph');
  return raw('<div'+attributes({class:'s-morphing-text-wrap',...attrs})+'><svg class="s-morphing-svg" aria-hidden="true"><defs><filter id="'+id+'"><feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"></feGaussianBlur><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" result="goo"></feColorMatrix><feBlend in="SourceGraphic" in2="goo"></feBlend></filter></defs></svg><span class="s-morphing-text" style="filter:url(#'+id+');" data-s-morphing-text="'+escapeText(JSON.stringify(arr))+'"><span class="s-morph-current">'+escapeText(arr[0])+'</span></span></div>');
}
export function AnimatedGradientText({text='Introducing Magic Gradient Text',attrs={}}={}) {
  return raw('<span'+attributes({class:'s-anim-gradient-text',...attrs})+'>'+escapeText(text)+'</span>');
}
export function LineShadowText({text='SHADOW TEXT',shadowColor='#5B3DF5',attrs={}}={}) {
  return raw('<span'+attributes({class:'s-line-shadow-text','data-text':text,style:shadowColor?`--shadow-color:${shadowColor};`:null,...attrs})+'>'+escapeText(text)+'</span>');
}
export function AuroraText({text='Aurora Borealis',attrs={}}={}) {
  return raw('<span'+attributes({class:'s-aurora-text',...attrs})+'>'+escapeText(text)+'</span>');
}
export function Sheet({id,title='Navigation Sheet',description='',position='right',children='',footer='',attrs={}}={}) {
  id=uid('sheet',id);position=choice(position,['right','left','top','bottom'],'right');
  return raw('<dialog'+attributes({id,class:'s-dialog s-sheet s-sheet--'+position,'aria-labelledby':id+'-title','aria-describedby':description?id+'-desc':null,...attrs})+'><div class="s-dialog-backdrop" aria-hidden="true"></div><div class="s-sheet-card"><header class="s-dialog-header"><div><h2 id="'+id+'-title" class="s-dialog-title">'+escapeText(title)+'</h2>'+(description?'<p id="'+id+'-desc" class="s-dialog-description">'+escapeText(description)+'</p>':'')+'</div><button type="button" class="s-button s-icon-button s-button--ghost s-button--sm" data-s-dialog-close aria-label="Close sheet">'+render(Icon({name:'close',size:16}))+'</button></header><div class="s-sheet-body">'+render(children)+'</div>'+(footer?'<footer class="s-dialog-footer">'+render(footer)+'</footer>':'')+'</div></dialog>');
}
export function ContextMenu({id,items=[],trigger='',attrs={}}={}) {
  id=uid('ctxmenu',id);
  const list=(Array.isArray(items)?items:[]).map(item=>`<button type="button" class="s-menu-item${item.danger?' s-menu-item--danger':''}" role="menuitem" data-value="${escapeText(item.value||item.label)}">${item.icon?render(Icon({name:item.icon,size:15}))+' ':''}<span>${escapeText(item.label)}</span></button>`).join('');
  return raw('<div'+attributes({class:'s-context-menu-wrap','data-s-context-menu':id,...attrs})+'>'+render(trigger)+'<div id="'+id+'" class="s-menu s-context-menu-panel" role="menu" hidden>'+list+'</div></div>');
}
export function HoverCard({trigger='',content='',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-hover-card-wrap','data-s-hover-card':true,...attrs})+'><div class="s-hover-card-trigger">'+render(trigger)+'</div><div class="s-hover-card-content" hidden>'+render(content)+'</div></div>');
}
export function Collapsible({title='Can I use this with any framework?',content='',open=false,attrs={}}={}) {
  return raw('<details'+attributes({class:'s-collapsible',open:open||null,...attrs})+'><summary class="s-collapsible-trigger"><span>'+escapeText(title)+'</span>'+render(Icon({name:'chevron',size:16}))+'</summary><div class="s-collapsible-content"><div class="s-collapsible-inner">'+render(content)+'</div></div></details>');
}

export function Android({width=300,height=600,src='',videoSrc='',attrs={}}={}) {
  const media = videoSrc
    ? `<div class="s-device-screen"><video src="${safeHref(videoSrc)}" class="s-device-video" autoplay loop muted playsinline></video></div>`
    : (src ? `<div class="s-device-screen"><img src="${safeHref(src)}" alt="Android screen" class="s-device-img"></div>` : `<div class="s-device-screen s-device-screen--placeholder"><div class="s-device-placeholder-content"><div class="s-device-app-bar"><span>9:41</span><div class="s-device-icons"><span>●●●</span></div></div><div class="s-device-body-demo"><div class="s-device-card-demo"></div><div class="s-device-card-demo"></div></div></div></div>`);
  return raw('<div'+attributes({class:'s-android-mockup',style:`--device-w:${width}px;--device-h:${height}px;`,...attrs})+'><div class="s-android-frame"><div class="s-android-notch"><span class="s-android-camera"></span></div>'+media+'</div></div>');
}

export function Iphone({width=300,height=600,src='',videoSrc='',attrs={}}={}) {
  const media = videoSrc
    ? `<div class="s-device-screen"><video src="${safeHref(videoSrc)}" class="s-device-video" autoplay loop muted playsinline></video></div>`
    : (src ? `<div class="s-device-screen"><img src="${safeHref(src)}" alt="iPhone screen" class="s-device-img"></div>` : `<div class="s-device-screen s-device-screen--placeholder"><div class="s-device-island"></div><div class="s-device-placeholder-content"><div class="s-device-app-bar"><span>9:41</span><div class="s-device-icons"><span>⚡️ 5G</span></div></div><div class="s-device-body-demo"><div class="s-device-card-demo"></div><div class="s-device-card-demo"></div></div></div></div>`);
  return raw('<div'+attributes({class:'s-iphone-mockup',style:`--device-w:${width}px;--device-h:${height}px;`,...attrs})+'><div class="s-iphone-frame"><div class="s-iphone-speaker"></div><div class="s-iphone-dynamic-island"></div>'+media+'<div class="s-iphone-home-bar"></div></div></div>');
}

export function Safari({url='https://sarahui.dev',imageSrc='',videoSrc='',mode='default',children='',attrs={}}={}) {
  const media = videoSrc
    ? `<video src="${safeHref(videoSrc)}" class="s-safari-video" autoplay loop muted playsinline></video>`
    : (imageSrc ? `<img src="${safeHref(imageSrc)}" alt="Safari viewport" class="s-safari-img">` : (children ? render(children) : `<div class="s-safari-placeholder"><div class="s-safari-content-hero"><div class="s-safari-badge">sarahUI v1.0</div><h2>Modern Design System</h2><p>Zero dependencies, pure CSS tokens & accessible primitives.</p></div></div>`));
  return raw('<div'+attributes({class:'s-safari-mockup s-safari--'+choice(mode,['default','simple'],'default'),...attrs})+'><div class="s-safari-header"><div class="s-safari-traffic-lights"><span class="s-safari-dot s-dot-red"></span><span class="s-safari-dot s-dot-yellow"></span><span class="s-safari-dot s-dot-green"></span></div><div class="s-safari-address-bar"><svg class="s-safari-lock" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg><span class="s-safari-url">'+escapeText(url)+'</span><button type="button" class="s-safari-reload" aria-label="Reload page">'+render(Icon({name:'refresh',size:12}))+'</button></div><div class="s-safari-actions"><button type="button" aria-label="Share">'+render(Icon({name:'link',size:13}))+'</button></div></div><div class="s-safari-viewport">'+media+'</div></div>');
}

export function GlareHover({children='',color='#ffffff',opacity=0.35,angle=-45,size=250,duration=650,playOnce=false,className='',attrs={}}={}) {
  const style=`--gh-angle:${angle}deg;--gh-duration:${duration}ms;--gh-size:${size}%;--gh-color:${color};--gh-opacity:${opacity};`;
  return raw('<div'+attributes({class:'s-glare-hover'+(playOnce?' s-glare-hover--once':'')+' '+(className||''),style,...attrs})+'><div class="s-glare-hover-surface">'+render(children)+'</div><div class="s-glare-hover-glare" aria-hidden="true"></div></div>');
}

export function Backlight({children='',blur=20,attrs={}}={}) {
  const id=uid('backlight');
  return raw('<div'+attributes({class:'s-backlight-wrap',...attrs})+'><svg class="s-backlight-filter" width="0" height="0" aria-hidden="true"><defs><filter id="'+id+'" y="-50%" x="-50%" width="200%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="'+blur+'" result="blurred"></feGaussianBlur><feColorMatrix type="saturate" in="blurred" values="4"></feColorMatrix><feComposite in="SourceGraphic" operator="over"></feComposite></filter></defs></svg><div class="s-backlight-content" style="filter:url(#'+id+');">'+render(children)+'</div></div>');
}

export function Floating3DParticles({quantity=120,color='#8B5CF6',size=4,opacity=0.35,drift=0.8,depth=0.5,attrs={}}={}) {
  return raw('<div'+attributes({class:'s-floating-3d-particles','aria-hidden':'true',...attrs})+'><canvas class="s-floating-particles-canvas" data-s-floating-particles data-quantity="'+quantity+'" data-color="'+escapeText(color)+'" data-size="'+size+'" data-opacity="'+opacity+'" data-drift="'+drift+'" data-depth="'+depth+'"></canvas></div>');
}

export function LightRays({count=7,color='rgba(160, 210, 255, 0.2)',blur=36,speed=14,length='70vh',attrs={}}={}) {
  const rays=Array.from({length:count},(_,i)=>{
    const left=10+((i*83)%80);
    const rotate=-25+((i*17)%50);
    const width=140+((i*29)%140);
    const duration=speed*(0.8+((i*0.1)%0.5));
    const delay=(i*0.7)%speed;
    return `<div class="s-light-ray" style="--ray-left:${left}%;--ray-rot:${rotate}deg;--ray-width:${width}px;--ray-dur:${duration.toFixed(1)}s;--ray-delay:${delay.toFixed(1)}s;"></div>`;
  }).join('');
  return raw('<div'+attributes({class:'s-light-rays',style:`--light-rays-color:${color};--light-rays-blur:${blur}px;--light-rays-length:${length};`,'aria-hidden':'true',...attrs})+'><div class="s-light-rays-glow"></div>'+rays+'</div>');
}

export function AnimatedThemeToggler({variant='circle',duration=400,fromCenter=false,attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-animated-theme-toggler s-button s-icon-button s-button--outline s-button--md','data-s-theme-toggler':variant,'data-duration':String(duration),'data-from-center':fromCenter?'true':'false','aria-label':'Toggle theme',...attrs})+'><span class="s-theme-icon-sun">'+render(Icon({name:'sun',size:18}))+'</span><span class="s-theme-icon-moon">'+render(Icon({name:'moon',size:18}))+'</span></button>');
}

export function ComicText({text='BOOM!',fontSize=3.5,dotColor='#EF4444',backgroundColor='#FACC15',attrs={}}={}) {
  const style=`--comic-font-size:${fontSize}rem;--comic-dot-color:${dotColor};--comic-bg-color:${backgroundColor};`;
  return raw('<div'+attributes({class:'s-comic-text',style,...attrs})+'>'+escapeText(text)+'</div>');
}

export function KineticText({text='KINETIC',as='h2',attrs={}}={}) {
  const letters=String(text).split('').map(char=>`<span class="s-kinetic-char" aria-hidden="true">${char===' '?'&nbsp;':escapeText(char)}</span>`).join('');
  return raw('<'+as+attributes({class:'s-kinetic-text',...attrs})+'>'+letters+'<span class="s-sr-only">'+escapeText(text)+'</span></'+as+'>');
}

export function DiaTextReveal({text='DYNAMIC REVEAL',colors=['#c679c4', '#fa3d1d', '#ffb005', '#e1e1fe', '#0358f7'],duration=1.5,repeat=false,attrs={}}={}) {
  const texts=Array.isArray(text)?text:[text];
  const colorStr=(Array.isArray(colors)?colors:['#c679c4','#fa3d1d','#ffb005','#e1e1fe','#0358f7']).join(',');
  return raw('<span'+attributes({class:'s-dia-text-reveal','data-s-dia-reveal':escapeText(JSON.stringify(texts)),'data-colors':escapeText(colorStr),'data-duration':String(duration),'data-repeat':repeat?'true':'false',...attrs})+'>'+escapeText(texts[0])+'</span>');
}

export function SpinningText({text='SARAHUI • CREATIVE • ANIMATIONS • ',duration=10,reverse=false,radius=5,attrs={}}={}) {
  const letters=String(text).split('');
  const total=letters.length;
  const spans=letters.map((char,i)=>`<span class="s-spinning-char" aria-hidden="true" style="--index:${i};--total:${total};--radius:${radius};">${char===' '?'&nbsp;':escapeText(char)}</span>`).join('');
  return raw('<div'+attributes({class:'s-spinning-text'+(reverse?' s-spinning-reverse':''),style:`--spin-dur:${duration}s;`,...attrs})+'>'+spans+'<span class="s-sr-only">'+escapeText(text)+'</span></div>');
}

export function Text3DFlip({text='FLIP 3D EFFECT',rotateDirection='right',attrs={}}={}) {
  const words=String(text).split(' ');
  let charIdx=0;
  const wordSpans=words.map((word,wIdx)=>{
    const charElements=word.split('').map(c=>{
      const elem=`<span class="s-flip-char-box" style="--char-i:${charIdx};"><span class="s-flip-front">${escapeText(c)}</span><span class="s-flip-back">${escapeText(c)}</span></span>`;
      charIdx++;
      return elem;
    }).join('');
    return `<span class="s-flip-word">${charElements}</span>`+(wIdx<words.length-1?'<span class="s-flip-space">&nbsp;</span>':'');
  }).join('');
  return raw('<div'+attributes({class:'s-text-3d-flip s-flip--'+choice(rotateDirection,['right','left','top','bottom'],'right'),'data-s-text-flip':true,...attrs})+'>'+wordSpans+'<span class="s-sr-only">'+escapeText(text)+'</span></div>');
}

export function TextAnimate({text='Modern Animated Typography',animation='blurInUp',by='word',duration=0.6,delay=0,attrs={}}={}) {
  const anim=choice(animation,['fadeIn','blurIn','blurInUp','blurInDown','slideUp','slideDown','slideLeft','slideRight','scaleUp','scaleDown'],'blurInUp');
  const splitBy=choice(by,['word','character','line','text'],'word');
  let segments=[];
  if(splitBy==='word') segments=String(text).split(/(\s+)/);
  else if(splitBy==='character') segments=String(text).split('');
  else if(splitBy==='line') segments=String(text).split('\n');
  else segments=[text];

  const count=segments.length;
  const spans=segments.map((seg,i)=>{
    const d=delay+(i*(duration/Math.max(1,count)));
    return `<span class="s-anim-segment s-anim-${anim}" style="animation-delay:${d.toFixed(2)}s;animation-duration:${(duration*0.8).toFixed(2)}s;" aria-hidden="true">${seg===' '?'&nbsp;':escapeText(seg)}</span>`;
  }).join('');

  return raw('<div'+attributes({class:'s-text-animate s-text-animate--'+splitBy,...attrs})+'>'+spans+'<span class="s-sr-only">'+escapeText(text)+'</span></div>');
}

export function VideoText({text='SARAHUI',src='https://cdn.magicui.design/ocean-small.webm',fontSize=12,attrs={}}={}) {
  const safeSrc = safeHref(src);
  const svgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1000 300'><text x='50%' y='50%' font-size='180' font-weight='900' font-family='system-ui, -apple-system, sans-serif' text-anchor='middle' dominant-baseline='middle' fill='%23000'>${escapeText(text)}</text></svg>`;
  const maskUri = `url("data:image/svg+xml;utf8,${svgMask}")`;
  const style = `mask-image:${maskUri};-webkit-mask-image:${maskUri};mask-size:contain;mask-repeat:no-repeat;mask-position:center;-webkit-mask-size:contain;-webkit-mask-repeat:no-repeat;-webkit-mask-position:center;`;
  return raw('<div'+attributes({class:'s-video-text',...attrs})+'><video class="s-video-text-bg" src="'+safeSrc+'" style="'+style+'" autoplay loop muted playsinline aria-label="'+escapeText(text)+'"></video></div>');
}

export function Highlighter({text='innovative design systems',action='highlight',color='#ffd1dc',strokeWidth=2,attrs={}}={}) {
  const act=choice(action,['highlight','underline','box','circle','strike-through','bracket'],'highlight');
  return raw('<span'+attributes({class:'s-highlighter s-highlighter--'+act,style:`--highlight-color:${color};--highlight-stroke:${strokeWidth}px;`,'data-s-highlighter':act,...attrs})+'><span class="s-highlighter-content">'+escapeText(text)+'</span><svg class="s-highlighter-svg" aria-hidden="true"><path class="s-highlighter-path" fill="none"></path></svg></span>');
}

export function ScrollBasedVelocity({text='SARAHUI ZERO DEPENDENCIES HIGH PERFORMANCE',images=[],baseVelocity=5,direction=1,attrs={}}={}) {
  let row1, row2;
  if(Array.isArray(images) && images.length){
    const imgs1 = images.slice(0, Math.ceil(images.length/2));
    const imgs2 = images.slice(Math.ceil(images.length/2));
    const renderImgs = arr => arr.map(src=>`<img src="${safeHref(src)}" alt="Velocity item" class="s-velocity-img-item" loading="lazy">`).join('');
    row1 = renderImgs(imgs1.concat(imgs1));
    row2 = renderImgs(imgs2.concat(imgs2));
  } else {
    row1=Array.from({length:4},()=>`<span class="s-velocity-item">${escapeText(text)}&nbsp;·&nbsp;</span>`).join('');
    row2=Array.from({length:4},()=>`<span class="s-velocity-item">${escapeText(text)}&nbsp;·&nbsp;</span>`).join('');
  }
  return raw('<div'+attributes({class:'s-scroll-velocity','data-s-scroll-velocity':true,'data-base-velocity':String(baseVelocity),'data-direction':String(direction),...attrs})+'><div class="s-velocity-track s-velocity-track-1"><div class="s-velocity-slide">'+row1+'</div><div class="s-velocity-slide" aria-hidden="true">'+row1+'</div></div><div class="s-velocity-track s-velocity-track-2"><div class="s-velocity-slide">'+row2+'</div><div class="s-velocity-slide" aria-hidden="true">'+row2+'</div></div></div>');
}

export function AnimatedSubscribeButton({initialText='Subscribe',subscribedText='Subscribed',isSubscribed=false,attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-animated-subscribe-btn'+(isSubscribed?' s-subscribed':''),'data-s-subscribe-btn':true,'aria-pressed':isSubscribed?'true':'false',...attrs})+'><span class="s-subscribe-initial"><span class="s-sub-icon">'+render(Icon({name:'bell',size:15}))+'</span><span>'+escapeText(initialText)+'</span></span><span class="s-subscribe-active"><span class="s-sub-icon">'+render(Icon({name:'check',size:15}))+'</span><span>'+escapeText(subscribedText)+'</span></span></button>');
}

export function ShinyButton({label='Shiny Action',icon='',trailing='',attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-shiny-button',...attrs})+'><span class="s-shiny-button-content">'+(icon?render(Icon({name:icon,size:16}))+' ':'')+'<span>'+escapeText(label)+'</span>'+(trailing?' '+render(Icon({name:trailing,size:14})):'')+'</span><span class="s-shiny-button-sweep" aria-hidden="true"></span></button>');
}

export function RippleButton({label='Click For Ripple',rippleColor='rgba(255,255,255,0.4)',duration='600ms',icon='',attrs={}}={}) {
  return raw('<button type="button"'+attributes({class:'s-ripple-button','data-s-ripple':true,style:`--ripple-color:${rippleColor};--ripple-duration:${duration};`,...attrs})+'><span class="s-ripple-button-label">'+(icon?render(Icon({name:icon,size:16}))+' ':'')+escapeText(label)+'</span><span class="s-ripple-surface" aria-hidden="true"></span></button>');
}

export function CodeComparison({filename='Component.js',beforeCode='// Before\nconst btn = document.querySelector("button");\nbtn.onclick = () => doWork();',afterCode='// After with sarahUI\nimport { Button } from "sarahui";\nrender(Button({ label: "Action" }));',language='javascript',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-code-comparison',...attrs})+'><div class="s-comparison-grid"><div class="s-comparison-side s-comparison-left"><div class="s-comparison-header">'+render(Icon({name:'code',size:14}))+'<span class="s-comparison-filename">'+escapeText(filename)+'</span><span class="s-comparison-tag">before</span></div><div class="s-comparison-body"><pre class="s-comparison-pre"><code>'+escapeText(beforeCode)+'</code></pre></div></div><div class="s-comparison-side s-comparison-right"><div class="s-comparison-header">'+render(Icon({name:'code',size:14}))+'<span class="s-comparison-filename">'+escapeText(filename)+'</span><span class="s-comparison-tag s-tag-after">after</span></div><div class="s-comparison-body"><pre class="s-comparison-pre"><code>'+escapeText(afterCode)+'</code></pre></div></div></div><div class="s-comparison-badge" aria-hidden="true">VS</div></div>');
}

export function FileTree({elements=[{id:'src',name:'src',type:'folder',children:[{id:'index',name:'index.js',type:'file'},{id:'styles',name:'styles.css',type:'file'},{id:'components',name:'components',type:'folder',children:[{id:'Button',name:'Button.js',type:'file'},{id:'Card',name:'Card.js',type:'file'}]}]}],initialExpanded=['src','components'],attrs={}}={}) {
  function renderTree(nodes,level=0) {
    return (Array.isArray(nodes)?nodes:[]).map(node=>{
      if(node.type==='folder') {
        const isExp=initialExpanded.includes(node.id);
        const childrenMarkup=node.children?renderTree(node.children,level+1):'';
        return `<div class="s-tree-folder${isExp?' s-tree-folder--open':''}" data-tree-id="${escapeText(node.id)}"><button type="button" class="s-tree-trigger" data-s-tree-folder><span class="s-tree-icon s-folder-icon">${render(Icon({name:'folder',size:15}))}</span><span class="s-tree-name">${escapeText(node.name)}</span></button><div class="s-tree-children" role="group">${childrenMarkup}</div></div>`;
      }
      return `<div class="s-tree-file" data-tree-id="${escapeText(node.id)}"><button type="button" class="s-tree-trigger" data-s-tree-file><span class="s-tree-icon s-file-icon">${render(Icon({name:'code',size:14}))}</span><span class="s-tree-name">${escapeText(node.name)}</span></button></div>`;
    }).join('');
  }
  return raw('<div'+attributes({class:'s-file-tree','data-s-file-tree':true,...attrs})+'><div class="s-file-tree-actions"><button type="button" class="s-tree-toggle-all" data-s-tree-toggle-all><span>Expand / Collapse All</span></button></div><div class="s-file-tree-content" role="tree">'+renderTree(elements)+'</div></div>');
}

export function HeroVideoDialog({videoSrc='https://www.youtube.com/embed/dQw4w9WgXcQ',thumbnailSrc='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',thumbnailAlt='Video thumbnail',animationStyle='from-center',attrs={}}={}) {
  const id=uid('videodialog');
  return raw('<div'+attributes({class:'s-hero-video-wrap',...attrs})+'><button type="button" class="s-hero-video-thumbnail" data-s-video-open="'+id+'" aria-label="Play video"><img src="'+safeHref(thumbnailSrc)+'" alt="'+escapeText(thumbnailAlt)+'" class="s-hero-video-img"><div class="s-hero-video-play-backdrop"><div class="s-hero-video-play-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div></button><dialog id="'+id+'" class="s-dialog s-video-modal s-video-anim--'+choice(animationStyle,['from-center','from-bottom','from-top','fade'],'from-center')+'" data-video-src="'+safeHref(videoSrc)+'"><div class="s-dialog-backdrop" data-s-dialog-close aria-hidden="true"></div><div class="s-video-modal-content"><button type="button" class="s-video-modal-close" data-s-dialog-close aria-label="Close video">'+render(Icon({name:'close',size:18}))+'</button><div class="s-video-modal-frame"><iframe src="" title="Video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div></dialog></div>');
}

export function IconCloud({icons=['spark','layers','grid','code','settings','globe','shield','palette','bell','heart','mail','user','search','check','plus'],images=[],size=320,showControl=true,attrs={}}={}) {
  const n=Math.max(160,Math.min(600,Number(size)||320));
  return raw('<div'+attributes({class:'s-icon-cloud-wrap',style:`width:${n}px;height:${n}px;`,...attrs})+'><canvas class="s-icon-cloud-canvas" data-s-icon-cloud data-icons="'+escapeText(JSON.stringify(icons))+'" data-images="'+escapeText(JSON.stringify(images))+'" width="'+(n*2)+'" height="'+(n*2)+'"></canvas>'+(showControl?`<button type="button" class="s-icon-cloud-ctrl" data-s-cloud-toggle aria-label="Pause icon cloud animation">${render(Icon({name:'spark',size:14}))}</button>`:'')+'</div>');
}

export function Lens({children='',zoomFactor=1.4,lensSize=160,lensColor='black',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-lens-container','data-s-lens':true,'data-zoom':String(zoomFactor),'data-size':String(lensSize),'data-color':lensColor,...attrs})+'><div class="s-lens-target">'+render(children)+'</div><div class="s-lens-overlay" aria-hidden="true"><div class="s-lens-zoomed">'+render(children)+'</div></div><div class="s-lens-loupe" aria-hidden="true"></div></div>');
}

export function PixelImage({src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',grid='6x4',grayscaleAnimation=true,attrs={}}={}) {
  const [cols,rows]=grid==='8x8'?[8,8]:grid==='4x6'?[4,6]:grid==='8x3'?[8,3]:[6,4];
  const total=cols*rows;
  const pieces=Array.from({length:total},(_,i)=>{
    const r=Math.floor(i/cols);
    const c=i%cols;
    const clip=`polygon(${c*(100/cols)}% ${r*(100/rows)}%, ${(c+1)*(100/cols)}% ${r*(100/rows)}%, ${(c+1)*(100/cols)}% ${(r+1)*(100/rows)}%, ${c*(100/cols)}% ${(r+1)*(100/rows)}%)`;
    const delay=Math.random()*800;
    return `<div class="s-pixel-piece" style="clip-path:${clip};animation-delay:${delay.toFixed(0)}ms;"><img src="${safeHref(src)}" alt="Pixel piece" class="s-pixel-img${grayscaleAnimation?' s-pixel-gray':''}"></div>`;
  }).join('');
  return raw('<div'+attributes({class:'s-pixel-image-wrap',...attrs})+'>'+pieces+'</div>');
}

export function GlyphMatrix({glyphs='01·•+*/\\<>=',cellSize=14,mutationRate=0.04,interval=90,color='#6B7280',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-glyph-matrix-wrap','aria-hidden':'true',...attrs})+'><canvas class="s-glyph-matrix-canvas" data-s-glyph-matrix data-glyphs="'+escapeText(glyphs)+'" data-cell-size="'+cellSize+'" data-mutation-rate="'+mutationRate+'" data-interval="'+interval+'" data-color="'+escapeText(color)+'"></canvas></div>');
}

export function DottedMap({width=800,height=400,dotColor='rgba(156,163,175,0.4)',markerColor='#FF6900',markers=[
  {x:180,y:140,label:'NYC',country:'us',pulse:true},
  {x:390,y:115,label:'London',country:'gb',pulse:true},
  {x:680,y:145,label:'Tokyo',country:'jp',pulse:true},
  {x:645,y:140,label:'Seoul',country:'kr',pulse:true}
],attrs={}}={}) {
  const dots=[];
  const cols=64;
  const rows=32;
  const dx=width/cols;
  const dy=height/rows;

  function isLand(c,r){
    if(c>=4 && c<=24 && r>=3 && r<=10) return true;
    if(c>=8 && c<=25 && r>=10 && r<=15) return !(c<=11 && r>=13);
    if(c>=9 && c<=17 && r>=15 && r<=18) return true;
    if(c>=16 && c<=25 && r>=18 && r<=24) return true;
    if(c>=18 && c<=23 && r>=24 && r<=29) return true;
    if(c>=28 && c<=34 && r>=4 && r<=9) return true;
    if(c>=29 && c<=42 && r>=9 && r<=14) return true;
    if(c>=28 && c<=43 && r>=15 && r<=20) return true;
    if(c>=32 && c<=43 && r>=20 && r<=25) return true;
    if(c>=34 && c<=40 && r>=25 && r<=29) return true;
    if(c===42 && r>=24 && r<=26) return true;
    if(c>=42 && c<=61 && r>=4 && r<=11) return true;
    if(c>=38 && c<=45 && r>=13 && r<=18) return true;
    if(c>=46 && c<=52 && r>=15 && r<=21) return true;
    if(c>=48 && c<=60 && r>=11 && r<=18) return true;
    if(c>=58 && c<=61 && r>=12 && r<=16) return true;
    if(c>=50 && c<=57 && r>=19 && r<=24) return true;
    if(c>=53 && c<=61 && r>=24 && r<=29) return true;
    if(c>=61 && c<=63 && r>=28 && r<=30) return true;
    return false;
  }

  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      if(isLand(c,r)){
        const cx=(c*dx+dx/2).toFixed(1);
        const cy=(r*dy+dy/2).toFixed(1);
        dots.push(`<circle cx="${cx}" cy="${cy}" r="2" fill="${dotColor}"/>`);
      }
    }
  }

  const markerElems=(Array.isArray(markers)?markers:[]).map((m,i)=>{
    const px=Number(m.x)||200;
    const py=Number(m.y)||100;
    const lbl=m.label?String(m.label):'';
    const pillW=lbl ? lbl.length*7 + 16 : 0;
    return `<g class="s-map-marker" data-marker-i="${i}">
      <circle cx="${px}" cy="${py}" r="3.5" fill="${markerColor}"/>
      <circle cx="${px}" cy="${py}" r="4" fill="none" stroke="${markerColor}" stroke-width="1.2" opacity="0.9">
        <animate attributeName="r" values="3.5;14" dur="1.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.9;0" dur="1.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="${px}" cy="${py}" r="4" fill="none" stroke="${markerColor}" stroke-width="1" opacity="0.7">
        <animate attributeName="r" values="3.5;14" dur="1.6s" begin="0.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0" dur="1.6s" begin="0.8s" repeatCount="indefinite"/>
      </circle>
      ${lbl ? `<rect x="${px+8}" y="${py-10}" width="${pillW}" height="20" rx="10" fill="rgba(15,23,42,0.75)" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
      <text x="${px+8+pillW/2}" y="${py+4}" font-size="10" font-family="system-ui, sans-serif" font-weight="600" fill="#ffffff" text-anchor="middle">${escapeText(lbl)}</text>` : ''}
    </g>`;
  }).join('');

  return raw('<svg'+attributes({class:'s-dotted-map',viewBox:`0 0 ${width} ${height}`,width:'100%',height:'100%','aria-hidden':'true',...attrs})+'><g class="s-map-dots">'+dots.join('')+'</g><g class="s-map-markers">'+markerElems+'</g></svg>');
}

export function Pointer({name='',color='#5B3DF5',children='',attrs={}}={}) {
  return raw('<div'+attributes({class:'s-custom-pointer-wrap','data-s-pointer':true,...attrs})+'><div class="s-pointer-glyph" aria-hidden="true">'+(children?render(children):`<svg class="s-pointer-cursor" width="22" height="22" viewBox="0 0 16 16" fill="${color}"><path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/></svg>`+(name?`<div class="s-pointer-badge" style="background:${color};"><span>${escapeText(name)}</span></div>`:''))+'</div></div>');
}

export function SmoothCursor({attrs={}}={}) {
  return raw('<div'+attributes({class:'s-smooth-cursor-container','data-s-smooth-cursor':true,'aria-hidden':'true',...attrs})+'><div class="s-smooth-cursor-follower"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="36" viewBox="0 0 50 54" fill="none"><path d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z" fill="#5B3DF5"/><path d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z" stroke="white" stroke-width="2.5"/></svg></div></div>');
}

export function TweetCard({authorName='Sarah Khan',handle='sarahkhan',avatar='https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',verified=true,text='Building lightning-fast, zero-dependency interfaces with @sarahui! The animation system is pure magic. ✨🚀',timestamp='10:30 AM · Sep 19, 2026',likes='1.4K',retweets='320',mediaUrl='',attrs={}}={}) {
  return raw('<article'+attributes({class:'s-tweet-card',...attrs})+'><header class="s-tweet-header"><div class="s-tweet-author"><img src="'+safeHref(avatar)+'" alt="'+escapeText(authorName)+'" class="s-tweet-avatar"><div><div class="s-tweet-name-row"><strong class="s-tweet-name">'+escapeText(authorName)+'</strong>'+(verified?'<svg class="s-tweet-verified" width="16" height="16" viewBox="0 0 24 24" fill="#1D9BF0"><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/></svg>':'')+'</div><span class="s-tweet-handle">@'+escapeText(handle)+'</span></div></div><svg class="s-tweet-logo" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></header><div class="s-tweet-body"><p>'+escapeText(text)+'</p>'+(mediaUrl?`<div class="s-tweet-media"><img src="${safeHref(mediaUrl)}" alt="Tweet media" class="s-tweet-media-img"></div>`:'')+'</div><footer class="s-tweet-footer"><time class="s-tweet-time">'+escapeText(timestamp)+'</time><div class="s-tweet-metrics"><span><strong>'+escapeText(retweets)+'</strong> Retweets</span><span><strong>'+escapeText(likes)+'</strong> Likes</span></div></footer></article>');
}

export function AnimatedCircularProgressBar({value=72,min=0,max=100,gaugePrimaryColor='#5B3DF5',gaugeSecondaryColor='rgba(255,255,255,0.1)',attrs={}}={}) {
  const circumference=2*Math.PI*45;
  const currentPercent=Math.round(((value-min)/(max-min))*100);
  const strokeDashoffset=circumference-((currentPercent/100)*circumference);
  return raw('<div'+attributes({class:'s-circular-progress-wrap',style:`--circle-val:${currentPercent};`,...attrs})+'><svg class="s-circular-progress-svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" class="s-circular-progress-bg" stroke="'+escapeText(gaugeSecondaryColor)+'" stroke-width="8" fill="none"/><circle cx="50" cy="50" r="45" class="s-circular-progress-bar" stroke="'+escapeText(gaugePrimaryColor)+'" stroke-width="8" stroke-dasharray="'+circumference.toFixed(2)+'" stroke-dashoffset="'+strokeDashoffset.toFixed(2)+'" stroke-linecap="round" fill="none"/></svg><span class="s-circular-progress-text">'+currentPercent+'%</span></div>');
}

export function HexagonPattern({radius=30,gap=4,strokeDasharray='0',direction='horizontal',hexagons=[[1,1],[3,2]],attrs={}}={}) {
  const id=uid('hex');
  const sqrt3=Math.sqrt(3);
  const colStep=direction==='horizontal'?(3*radius)/2+(sqrt3*gap)/2:sqrt3*radius+gap;
  const rowStep=direction==='horizontal'?sqrt3*radius+gap:(3*radius)/2+(sqrt3*gap)/2;
  const tileW=direction==='horizontal'?colStep*2:colStep;
  const tileH=direction==='horizontal'?rowStep:rowStep*2;

  function hexPts(cx,cy,r) {
    return Array.from({length:6},(_,i)=>{
      const a=((i*60)*(Math.PI))/180;
      return `${(cx+r*Math.cos(a)).toFixed(1)},${(cy+r*Math.sin(a)).toFixed(1)}`;
    }).join(' ');
  }

  const hexList=[[colStep/2,rowStep/2],[colStep*1.5,rowStep]].map(([cx,cy])=>`<polygon class="s-hex-poly" points="${hexPts(cx,cy,radius)}" stroke-dasharray="${strokeDasharray}"/>`).join('');
  const filledHex=(Array.isArray(hexagons)?hexagons:[]).map(([c,r])=>`<polygon class="s-hex-fill" points="${hexPts(c*colStep+colStep/2,r*rowStep+rowStep/2,radius-1)}"/>`).join('');

  return raw('<svg'+attributes({class:'s-hexagon-pattern','aria-hidden':'true',...attrs})+'><defs><pattern id="'+id+'" width="'+tileW.toFixed(1)+'" height="'+tileH.toFixed(1)+'" patternUnits="userSpaceOnUse">'+hexList+'</pattern></defs><rect width="100%" height="100%" fill="url(#'+id+')"/><svg class="s-hex-highlighted">'+filledHex+'</svg></svg>');
}

export function StripedPattern({direction='left',width=12,height=12,attrs={}}={}) {
  const id=uid('stripe');
  const w=Number(width)||12;
  const h=Number(height)||12;
  const lines=direction==='left'
    ? `<line x1="0" y1="${h}" x2="${w}" y2="0" stroke="currentColor"/><line x1="${-w}" y1="${h}" x2="0" y2="0" stroke="currentColor"/><line x1="${w}" y1="${h}" x2="${w*2}" y2="0" stroke="currentColor"/>`
    : `<line x1="0" y1="0" x2="${w}" y2="${h}" stroke="currentColor"/><line x1="${-w}" y1="0" x2="0" y2="${h}" stroke="currentColor"/><line x1="${w}" y1="0" x2="${w*2}" y2="${h}" stroke="currentColor"/>`;
  return raw('<svg'+attributes({class:'s-striped-pattern','aria-hidden':'true',...attrs})+'><defs><pattern id="'+id+'" width="'+w+'" height="'+h+'" patternUnits="userSpaceOnUse">'+lines+'</pattern></defs><rect width="100%" height="100%" fill="url(#'+id+')"/></svg>');
}

export function InteractiveGridPattern({width=32,height=32,squares=[12,8],attrs={}}={}) {
  const [cols,rows]=Array.isArray(squares)?squares:[12,8];
  const rects=Array.from({length:cols*rows},(_,i)=>{
    const x=(i%cols)*width;
    const y=Math.floor(i/cols)*height;
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" class="s-interactive-grid-rect" data-grid-i="${i}"/>`;
  }).join('');
  return raw('<svg'+attributes({class:'s-interactive-grid-pattern','data-s-interactive-grid':true,viewBox:`0 0 ${cols*width} ${rows*height}`,...attrs})+'>'+rects+'</svg>');
}

export function NoiseTexture({frequency=0.4,octaves=5,slope=0.15,noiseOpacity=0.6,attrs={}}={}) {
  const id=uid('noise');
  return raw('<svg'+attributes({class:'s-noise-texture','aria-hidden':'true',...attrs})+'><defs><filter id="'+id+'"><feTurbulence type="fractalNoise" baseFrequency="'+frequency+'" numOctaves="'+octaves+'" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope="'+slope+'"/><feFuncG type="linear" slope="'+slope+'"/><feFuncB type="linear" slope="'+slope+'"/></feComponentTransfer></filter></defs><rect width="100%" height="100%" filter="url(#'+id+')" opacity="'+noiseOpacity+'"/></svg>');
}



