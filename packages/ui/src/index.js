import {Icon,Toast,render} from './templates.js';
export * from './templates.js';
const installations=new WeakMap(),dialogTriggers=new WeakMap(),handled=new WeakSet();
const docOf=node=>node.nodeType===9?node:node.ownerDocument;
const emit=(node,name,detail)=>node.dispatchEvent(new (docOf(node).defaultView.CustomEvent)('sarah:'+name,{detail,bubbles:true}));
const closest=(event,selector)=>event.target?.closest?.(selector);
export function setTheme(preference='system',{root=globalThis.document?.documentElement,persist=true}={}) {
  if(!root)return preference;
  const doc=docOf(root),win=doc.defaultView;
  preference=['light','dark','system'].includes(preference)?preference:'system';
  const theme=preference==='system'?(win.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):preference;
  root.dataset.theme=theme;root.dataset.themePreference=preference;
  if(persist)try{win.localStorage.setItem('sarah-theme',preference);}catch{}
  doc.querySelectorAll('[data-s-theme-toggle]').forEach(button=>{
    button.setAttribute('aria-label','Switch to '+(theme==='dark'?'light':'dark')+' theme');
    const glyph=button.querySelector('[data-theme-icon]');if(glyph)glyph.innerHTML=render(Icon({name:theme==='dark'?'sun':'moon',size:18}));
  });
  emit(root,'themechange',{preference,theme});return theme;
}
export function openDialog(dialog,trigger) {
  if(!dialog||typeof dialog.showModal!=='function'||dialog.open)return;
  dialogTriggers.set(dialog,trigger||docOf(dialog).activeElement);dialog.showModal();
  (dialog.querySelector('[data-s-autofocus],[autofocus]')||dialog.querySelector('input:not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),[tabindex="0"]'))?.focus({preventScroll:true});
}
export const closeDialog=(dialog,value='')=>{if(dialog?.open)dialog.close(value);};
function activateTab(group,tab) {
  const tabs=[...group.querySelectorAll('[role=tab]')].filter(t=>t.closest('[data-s-tabs]')===group);
  if(!tabs.includes(tab)||tab.disabled)return;
  for(const t of tabs){const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;const panel=docOf(group).getElementById(t.getAttribute('aria-controls'));if(panel&&group.contains(panel))panel.hidden=!active;}
  tab.focus();emit(group,'tabchange',{index:tabs.indexOf(tab),id:tab.id});
}
function setMenu(menu,open,{last=false,restore=false}={}) {
  const panel=menu.querySelector('[role=menu]'),trigger=menu.querySelector('[data-s-menu-trigger]');
  panel.hidden=!open;trigger.setAttribute('aria-expanded',String(open));
  if(open){const items=[...panel.querySelectorAll('[role=menuitem]:not(:disabled)')];(last?items.at(-1):items[0])?.focus();}
  else if(restore)trigger.focus();
}
function tableSelection(table) {
  const rows=[...table.querySelectorAll('[data-s-row-select]:not(:disabled)')],selected=rows.filter(box=>box.checked),all=table.querySelector('[data-s-select-all]');
  if(all){all.checked=rows.length>0&&selected.length===rows.length;all.indeterminate=selected.length>0&&selected.length<rows.length;all.disabled=!rows.length;}
  emit(table,'selectionchange',{selected:selected.map(b=>b.closest('tr').dataset.row),count:selected.length});
}
function sortTable(button) {
  const table=button.closest('table'),key=button.dataset.sSort,th=button.closest('th'),ascending=th.getAttribute('aria-sort')!=='ascending';
  table.querySelectorAll('[aria-sort]').forEach(el=>el.removeAttribute('aria-sort'));th.setAttribute('aria-sort',ascending?'ascending':'descending');
  const value=row=>{const td=[...row.cells].find(td=>td.dataset.column===key);return td?.dataset.sort??td?.textContent.trim()??'';};
  const collator=new Intl.Collator(undefined,{numeric:true,sensitivity:'base'});
  [...table.tBodies[0].rows].sort((a,b)=>{const x=value(a),y=value(b);const n=x!==''&&y!==''&&Number.isFinite(Number(x))&&Number.isFinite(Number(y))?Number(x)-Number(y):collator.compare(x,y);return ascending?n:-n;}).forEach(row=>table.tBodies[0].append(row));
  emit(table,'sortchange',{key,direction:ascending?'ascending':'descending'});
}
function paginate(nav,value) {
  const max=Number(nav.dataset.pages)||1,current=Number(nav.dataset.current)||1,next=Math.min(max,Math.max(1,value==='prev'?current-1:value==='next'?current+1:Number(value)||1));
  nav.dataset.current=String(next);
  nav.querySelectorAll('[data-page]').forEach(b=>{const p=b.dataset.page;if(p==='prev'||p==='next')b.disabled=p==='prev'?next===1:next===max;else if(Number(p)===next)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  emit(nav,'pagechange',{page:next,pages:max});
}
const options=dialog=>[...dialog.querySelectorAll('[role=option]')].filter(item=>!item.hidden);
function selectCommand(dialog,index) {
  const choices=options(dialog),input=dialog.querySelector('[data-s-command-input]');
  dialog.querySelectorAll('[role=option]').forEach(o=>o.setAttribute('aria-selected','false'));
  if(!choices.length){input.removeAttribute('aria-activedescendant');return;}
  const item=choices[(index+choices.length)%choices.length];item.setAttribute('aria-selected','true');input.setAttribute('aria-activedescendant',item.id);if(dialog.open)item.scrollIntoView({block:'nearest'});
}
function filterCommand(dialog) {
  const query=dialog.querySelector('[data-s-command-input]').value.toLocaleLowerCase().trim();
  dialog.querySelectorAll('[role=option]').forEach(o=>{o.hidden=!(o.dataset.keywords||o.textContent).toLocaleLowerCase().includes(query);});
  dialog.querySelector('[data-s-command-empty]').hidden=options(dialog).length>0;selectCommand(dialog,0);
}
function chooseCommand(dialog,item) {
  if(!item||item.hidden)return;
  const href=item.dataset.href;closeDialog(dialog);if(href?.startsWith('#'))docOf(dialog).defaultView.location.hash=href.slice(1);
  emit(dialog,'command',{href,label:item.textContent.trim()});
}
/** Install delegated behaviors once; returned cleanup is also safe to call twice. */
export function enhanceUI(root=globalThis.document) {
  if(!root?.addEventListener)return ()=>{};
  if(installations.has(root))return installations.get(root);
  const doc=docOf(root),win=doc.defaultView,controller=new win.AbortController(),signal=controller.signal;
  const on=(node,name,callback,capture=false)=>node.addEventListener(name,callback,{signal,capture});
  root.querySelectorAll('[data-s-select-all]').forEach(b=>tableSelection(b.closest('table')));
  root.querySelectorAll('[data-s-command]').forEach(filterCommand);
  on(root,'click',event=>{
    if(handled.has(event))return;
    let b;
    if((b=closest(event,'[data-s-theme-toggle]'))){handled.add(event);setTheme(doc.documentElement.dataset.theme==='dark'?'light':'dark',{root:doc.documentElement});return;}
    if((b=closest(event,'[data-s-dialog-open]'))){handled.add(event);event.preventDefault();const d=doc.getElementById(b.dataset.sDialogOpen);openDialog(d,b);if(d?.matches('[data-s-command]'))filterCommand(d);return;}
    if((b=closest(event,'[data-s-dialog-close]'))){handled.add(event);closeDialog(b.closest('dialog'));return;}
    if(event.target.matches?.('dialog')){const d=event.target,r=d.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog(d);}
    if((b=closest(event,'[data-s-tabs] [role=tab]'))){handled.add(event);activateTab(b.closest('[data-s-tabs]'),b);return;}
    if((b=closest(event,'[data-s-pagination] [data-page]'))){handled.add(event);if(!b.disabled)paginate(b.closest('[data-s-pagination]'),b.dataset.page);return;}
    if((b=closest(event,'[data-s-sort]'))){handled.add(event);sortTable(b);return;}
    if((b=closest(event,'[data-s-chip-remove]'))){handled.add(event);const chip=b.closest('.s-chip'),parent=chip.parentElement,label=chip.textContent.trim(),neighbor=chip.nextElementSibling||chip.previousElementSibling;chip.remove();const focus=neighbor?.querySelector('button')||parent;if(!focus.hasAttribute('tabindex')&&focus===parent)focus.tabIndex=-1;focus.focus();emit(parent,'chipremove',{label});return;}
    if((b=closest(event,'[data-s-menu-trigger]'))){handled.add(event);setMenu(b.closest('[data-s-menu]'),b.getAttribute('aria-expanded')!=='true');return;}
    if((b=closest(event,'[data-s-menu] [role=menuitem]'))&&!b.disabled){handled.add(event);const menu=b.closest('[data-s-menu]');setMenu(menu,false,{restore:true});emit(menu,'menuaction',{value:b.dataset.value});return;}
    if((b=closest(event,'[data-s-command] [role=option]'))){handled.add(event);chooseCommand(b.closest('[data-s-command]'),b);}
  });
  on(doc,'click',event=>root.querySelectorAll('[data-s-menu]').forEach(menu=>{if(!menu.contains(event.target))setMenu(menu,false);}));
  on(root,'keydown',event=>{
    const dialog=closest(event,'dialog[open]');
    if(dialog&&event.key==='Tab'){
      const focusable=[...dialog.querySelectorAll('button,input,select,textarea,a[href],[tabindex],[contenteditable="true"]')].filter(el=>!el.disabled&&el.tabIndex>=0&&el.getClientRects().length&&win.getComputedStyle(el).visibility!=='hidden'&&!el.closest('[inert]'));
      const first=focusable[0],last=focusable.at(-1);
      if(first&&((event.shiftKey&&doc.activeElement===first)||(!event.shiftKey&&doc.activeElement===last))){event.preventDefault();(event.shiftKey?last:first).focus();return;}
    }
    const tab=closest(event,'[data-s-tabs] [role=tab]');
    if(tab&&['ArrowRight','ArrowLeft','Home','End'].includes(event.key)){
      event.preventDefault();const group=tab.closest('[data-s-tabs]'),tabs=[...group.querySelectorAll('[role=tab]:not(:disabled)')].filter(t=>t.closest('[data-s-tabs]')===group),rtl=win.getComputedStyle(group).direction==='rtl';let i=tabs.indexOf(tab);
      i=event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?(rtl?-1:1):(rtl?1:-1))+tabs.length)%tabs.length;activateTab(group,tabs[i]);return;
    }
    const menu=closest(event,'[data-s-menu]');
    if(menu) {
      if(closest(event,'[data-s-menu-trigger]')&&['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();setMenu(menu,true,{last:event.key==='ArrowUp'});return;}
      if(closest(event,'[role=menu]')){
        const items=[...menu.querySelectorAll('[role=menuitem]:not(:disabled)')],i=items.indexOf(closest(event,'[role=menuitem]'));
        if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();items[event.key==='Home'?0:event.key==='End'?items.length-1:(i+(event.key==='ArrowDown'?1:-1)+items.length)%items.length]?.focus();return;}
        if(event.key==='Escape'){event.preventDefault();event.stopPropagation();setMenu(menu,false,{restore:true});return;}
        if(event.key==='Tab')win.setTimeout(()=>setMenu(menu,false),0);
      }
    }
    const input=closest(event,'[data-s-command-input]');
    if(input){const d=input.closest('dialog'),list=options(d),i=list.findIndex(o=>o.getAttribute('aria-selected')==='true');if(event.key==='Escape'){event.preventDefault();event.stopPropagation();closeDialog(d);return;}if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();selectCommand(d,i+(event.key==='ArrowDown'?1:-1));return;}if(event.key==='Enter'){event.preventDefault();chooseCommand(d,list[Math.max(0,i)]);return;}}
    if(event.key==='Escape'){const tip=closest(event,'[data-s-tooltip]');if(tip)tip.dataset.dismissed='true';}
  });
  on(root,'input',event=>{const e=event.target;if(e.matches('[data-s-slider]'))e.closest('.s-slider-field').querySelector('output').value=e.value;if(e.matches('[data-s-command-input]'))filterCommand(e.closest('dialog'));});
  on(root,'change',event=>{const e=event.target;if(e.matches('[data-s-select-all]')){const table=e.closest('table');table.querySelectorAll('[data-s-row-select]:not(:disabled)').forEach(b=>{b.checked=e.checked;});tableSelection(table);}else if(e.matches('[data-s-row-select]'))tableSelection(e.closest('table'));});
  for(const type of ['focusin','pointerover'])on(root,type,event=>{const tip=closest(event,'[data-s-tooltip]');if(tip&&!tip.contains(event.relatedTarget))delete tip.dataset.dismissed;});
  on(root,'close',event=>{const d=event.target;if(!d.matches?.('dialog'))return;const trigger=dialogTriggers.get(d);if(trigger?.isConnected&&trigger.getClientRects().length)trigger.focus({preventScroll:true});dialogTriggers.delete(d);},true);
  on(win.matchMedia('(prefers-color-scheme: dark)'),'change',()=>{if(doc.documentElement.dataset.themePreference==='system')setTheme('system',{root:doc.documentElement,persist:false});});
  const dispose=()=>{controller.abort();root.querySelectorAll('[data-s-menu]').forEach(m=>setMenu(m,false));installations.delete(root);};installations.set(root,dispose);return dispose;
}
export function toast(description,{title='Saved successfully',tone='success',duration=6000,document:doc=globalThis.document}={}) {
  if(!doc)return ()=>{};
  let region=doc.querySelector('[data-s-toast-region]');
  if(!region){region=doc.createElement('div');region.className='s-toast-region';region.dataset.sToastRegion='';region.setAttribute('role','status');region.setAttribute('aria-live','polite');region.setAttribute('aria-relevant','additions');doc.body.append(region);}
  const template=doc.createElement('template');template.innerHTML=render(Toast({title,description,tone}));const node=template.content.firstElementChild,previous=doc.activeElement;region.append(node);
  const controller=new doc.defaultView.AbortController();let timer;
  const dismiss=()=>{clearTimeout(timer);controller.abort();if(node.contains(doc.activeElement)&&previous?.isConnected)previous.focus();node.remove();};
  const pause=()=>clearTimeout(timer),start=()=>{pause();if(node.isConnected&&duration>0&&!node.matches(':hover,:focus-within'))timer=setTimeout(dismiss,duration);};
  for(const name of ['pointerenter','focusin'])node.addEventListener(name,pause,{signal:controller.signal});
  for(const name of ['pointerleave','focusout'])node.addEventListener(name,()=>setTimeout(start,0),{signal:controller.signal});
  node.querySelector('[data-s-toast-close]').addEventListener('click',dismiss,{signal:controller.signal});start();return dismiss;
}
export async function copyText(value,doc=globalThis.document) {
  if(!doc)throw new Error('A document is required.');
  try{if(doc.defaultView.navigator.clipboard?.writeText){await doc.defaultView.navigator.clipboard.writeText(String(value));return true;}}catch{}
  const before=doc.activeElement,area=doc.createElement('textarea');area.value=String(value);area.className='s-sr-only';area.setAttribute('aria-hidden','true');doc.body.append(area);area.select();let ok;
  try{ok=doc.execCommand('copy');}finally{area.remove();before?.focus();}
  if(!ok)throw new Error('Select the code and copy it manually.');return true;
}
