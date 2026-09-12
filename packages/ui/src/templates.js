/**
 * Native HTML templates. Interpolated strings are escaped; compose markup with
 * html tagged templates. Never put untrusted values in literal markup.
 */
export const escapeText = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
class Markup { constructor(value){this.value=value;} toString(){return this.value;} }
const raw = value => new Markup(value);
export const render = value => value instanceof Markup?value.value:Array.isArray(value)?value.map(render).join(''):escapeText(value);
export const html = (parts,...values) => raw(parts.reduce((s,p,i)=>s+p+(i<values.length?render(values[i]):''),''));
export function safeHref(value='#') {
  const text=String(value).trim();
  try{return ['http:','https:','mailto:','tel:'].includes(new URL(text,'https://sarahui.invalid/').protocol)?text:'#';}catch{return '#';}
}
const allowed = new Set('id class name title type value placeholder required disabled checked min max step autocomplete rows role tabindex href download target rel selected hidden open multiple pattern minlength maxlength form inputmode readonly'.split(' '));
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
  more:'M5 12h.01M12 12h.01M19 12h.01',user:'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 21v-3a8 8 0 0 1 16 0v3',calendar:'M4 5h16v16H4ZM8 2v6m8-6v6M4 11h16',trash:'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',clock:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 7v6l4 2'
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
export function IconButton({icon='plus',label='Add item',variant='outline',size='md',attrs={},disabled=false}={}) {return raw('<button'+attributes({type:'button',...attrs,class:'s-button s-icon-button s-button--'+choice(variant,['primary','secondary','outline','ghost','danger'],'outline')+' s-button--'+choice(size,['sm','md','lg'],'md'),'aria-label':label,disabled})+'>'+render(Icon({name:icon}))+'</button>');}
export const ButtonGroup=({label='Actions',children=[]}={})=>html`<div class="s-button-group" role="group" aria-label="${label}">${children}</div>`;
const fieldLabel=(id,label,required)=>'<label class="s-label" for="'+escapeText(id)+'">'+escapeText(label)+(required?' <span class="s-required" aria-hidden="true">*</span>':'')+'</label>';
const fieldHelp=(id,helper,error)=>helper||error?'<p id="'+escapeText(id)+'-help" class="s-field-help'+(error?' s-field-error':'')+'">'+escapeText(error||helper)+'</p>':'';
export function Input({id,label='Email address',helper='',error='',icon='',type='text',attrs={}}={}) {
  id=uid('input',id);type=choice(type,['text','email','password','number','search','tel','url','date','time'],'text');
  return raw('<div class="s-field">'+fieldLabel(id,label,attrs.required)+'<div class="s-input-wrap">'+(icon?render(Icon({name:icon})): '')+'<input'+attributes({...attrs,id,type,class:'s-input'+(icon?' s-input--icon':''),'aria-invalid':error?'true':null,'aria-describedby':helper||error?id+'-help':null})+'></div>'+fieldHelp(id,helper,error)+'</div>');
}
export function Textarea({id,label='Description',helper='',error='',value='',attrs={}}={}) {id=uid('textarea',id);return raw('<div class="s-field">'+fieldLabel(id,label,attrs.required)+'<textarea'+attributes({rows:3,...attrs,id,class:'s-input s-textarea','aria-invalid':error?'true':null,'aria-describedby':helper||error?id+'-help':null})+'>'+escapeText(value)+'</textarea>'+fieldHelp(id,helper,error)+'</div>');}
export function Select({id,label='Workspace',options=['Personal','Team'],value,helper='',attrs={}}={}) {
  id=uid('select',id);
  return raw('<div class="s-field">'+fieldLabel(id,label,attrs.required)+'<div class="s-select-wrap"><select'+attributes({...attrs,id,class:'s-input s-select','aria-describedby':helper?id+'-help':null})+'>'+options.map(o=>{o=typeof o==='string'?{label:o,value:o}:o;return '<option'+attributes({value:o.value,selected:String(o.value)===String(value),disabled:o.disabled})+'>'+escapeText(o.label)+'</option>';}).join('')+'</select>'+render(Icon({name:'down',size:16}))+'</div>'+fieldHelp(id,helper,'')+'</div>');
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
export function Avatar({name='Sarah Khan',initials='',size='md',tone='brand',status=false}={}) {const letters=initials||name.trim().split(/\s+/).map(s=>Array.from(s)[0]||'').slice(0,2).join('').toUpperCase();return html`<span class="s-avatar s-avatar--${choice(size,['sm','md','lg'],'md')} s-tone-${choice(tone,['brand','info','success','warning'],'brand')}" role="img" aria-label="${name+(status?' · Online':'')}">${letters}${status?html`<i class="s-avatar-status" aria-hidden="true"></i>`:''}</span>`;}
export const Card=({title='',description='',children='',footer='',className=''}={})=>html`<article class="s-card ${className}">${title?html`<header class="s-card-header"><h3>${title}</h3><p>${description}</p></header>`:''}<div class="s-card-body">${children}</div>${footer?html`<footer class="s-card-footer">${footer}</footer>`:''}</article>`;
export function Alert({title='All changes saved',description='Your workspace is up to date.',tone='success',live=false}={}) {tone=choice(tone,['success','warning','danger','info'],'info');return raw('<div class="s-alert s-tone-'+tone+'"'+(live?' role="status"':'')+'>'+render(Icon({name:tone==='success'?'check':tone==='info'?'info':'alert'}))+'<div><strong>'+escapeText(title)+'</strong><p>'+escapeText(description)+'</p></div></div>');}
export function Tabs({id,label='Project details',items=[{label:'Overview',content:'Overview content'},{label:'Activity',content:'Activity content'}],active=0,variant='line'}={}) {
  id=uid('tabs',id);active=Math.max(0,Math.min(items.length-1,active));if(items[active]?.disabled)active=items.findIndex(i=>!i.disabled);
  return raw('<div class="s-tabs s-tabs--'+choice(variant,['line','pill'],'line')+'" data-s-tabs><div class="s-tab-list" role="tablist" aria-label="'+escapeText(label)+'">'+items.map((item,i)=>'<button'+attributes({type:'button',class:'s-tab',id:id+'-tab-'+i,role:'tab','aria-selected':String(i===active),'aria-controls':id+'-panel-'+i,tabindex:i===active?0:-1,disabled:item.disabled})+'>'+escapeText(item.label)+'</button>').join('')+'</div>'+items.map((item,i)=>'<div'+attributes({class:'s-tab-panel',id:id+'-panel-'+i,role:'tabpanel','aria-labelledby':id+'-tab-'+i,tabindex:0,hidden:i!==active})+'>'+render(item.content)+'</div>').join('')+'</div>');
}
export const Breadcrumb=({items=[{label:'Workspace',href:'#patterns'},{label:'Design system'}],label='Breadcrumb'}={})=>html`<nav class="s-breadcrumb" aria-label="${label}"><ol>${items.map((item,i)=>html`<li>${i?Icon({name:'chevron',size:13}):''}${i===items.length-1?html`<span aria-current="page">${item.label}</span>`:html`<a href="${safeHref(item.href)}">${item.label}</a>`}</li>`)}</ol></nav>`;
export function Pagination({pages=5,current=1,label='Pagination'}={}) {
  pages=Math.max(1,Math.min(20,Math.floor(Number(pages)||1)));current=Math.max(1,Math.min(pages,Math.floor(Number(current)||1)));
  return raw('<nav class="s-pagination" data-s-pagination data-pages="'+pages+'" data-current="'+current+'" aria-label="'+escapeText(label)+'">'+render(IconButton({icon:'chevron',label:'Previous page',size:'sm',disabled:current===1,attrs:{'data-page':'prev','data-direction':'back'}}))+Array.from({length:pages},(_,i)=>'<button'+attributes({type:'button',class:'s-page','data-page':i+1,'aria-label':'Page '+(i+1),'aria-current':i+1===current?'page':null})+'>'+(i+1)+'</button>').join('')+render(IconButton({icon:'chevron',label:'Next page',size:'sm',disabled:current===pages,attrs:{'data-page':'next'}}))+'</nav>');
}
export const NavItem=({label='Overview',href='#overview',icon='grid',active=false,badge=''}={})=>raw('<a'+attributes({class:'s-nav-item',href,'aria-current':active?'page':null})+'>'+render(Icon({name:icon,size:19}))+'<span>'+escapeText(label)+'</span>'+(badge?'<small>'+escapeText(badge)+'</small>':'')+'</a>');
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
