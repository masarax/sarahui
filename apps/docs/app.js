import {html,render,Icon,Badge,Avatar,DataTable,Pagination,Progress,EmptyState,Button,enhanceUI,setTheme,openDialog,closeDialog,toast,copyText} from './ui/index.js';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const projectData=[
  {id:'p1',name:'Brand refresh',category:'Branding',status:'In progress',owner:'Alex Morgan',progress:72},
  {id:'p2',name:'Studio website',category:'Development',status:'In review',owner:'Sarah Khan',progress:92},
  {id:'p3',name:'Mobile experience',category:'Product',status:'In progress',owner:'Jamie Kim',progress:48},
  {id:'p4',name:'Component library',category:'Design system',status:'Complete',owner:'Maya Rahman',progress:100},
  {id:'p5',name:'Welcome experience',category:'Product',status:'Planning',owner:'Alex Morgan',progress:16},
  {id:'p6',name:'Analytics dashboard',category:'Development',status:'In review',owner:'Sarah Khan',progress:88},
  {id:'p7',name:'Spring campaign',category:'Branding',status:'Planning',owner:'Jamie Kim',progress:24},
  {id:'p8',name:'Customer portal',category:'Development',status:'In progress',owner:'Maya Rahman',progress:56}
];
let category='All components',projectPage=1,sortKey='',sortDirection='ascending',projectSequence=8;
const PAGE_SIZE=4;
function filterComponents(){
  const query=$('#component-search').value.toLocaleLowerCase().trim();
  let visible=0;
  $$('[data-component-name]').forEach(card=>{
    card.hidden=!(category==='All components'||card.dataset.componentCategory===category)||!(card.dataset.componentName+' '+card.dataset.componentDescription).toLocaleLowerCase().includes(query);
    if(!card.hidden)visible++;
  });
  $('#component-count').textContent=visible+' component'+(visible===1?'':'s');
  $('#component-empty').hidden=visible!==0;
  $$('[data-component-group]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.componentGroup===category)));
}
const viewNames={overview:'Overview',foundations:'Foundations',components:'Components',patterns:'Patterns',start:'Get started'};
function route(initial=false){
  let fragment;try{fragment=decodeURIComponent(location.hash.slice(1));}catch{fragment='overview';}
  if(fragment==='main-content'){$('#main-content').focus();return;}
  const [requested,sub]=fragment.split('/'),view=Object.hasOwn(viewNames,requested)?requested:'overview';
  $$('[data-view]').forEach(section=>{section.hidden=section.dataset.view!==view;});
  $$('.docs-nav .s-nav-item').forEach(a=>{if(a.getAttribute('href')==='#'+view)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  $('#route-name').textContent=viewNames[view];document.title=viewNames[view]+' · sarahUI';
  closeDialog($('#mobile-navigation'));
  let target=$('[data-view="'+view+'"] h1');
  if(view==='components'){
    category='All components';$('#component-search').value='';filterComponents();
    if(sub){const card=$$('[data-component-name]').find(c=>c.dataset.componentName.toLowerCase()===sub.toLowerCase());if(card)target=card;}
  }
  if(view==='foundations'&&sub){const candidate=document.getElementById('foundation-'+sub.toLowerCase());if(candidate)target=candidate;}
  const ready=()=>{document.documentElement.dataset.route='#'+view+(sub?'/'+sub:'');};
  if(!initial||sub){requestAnimationFrame(()=>{if(target){if(!target.hasAttribute('tabindex'))target.tabIndex=-1;target.focus({preventScroll:true});if(sub)target.scrollIntoView({block:'start'});else window.scrollTo({top:0,behavior:'instant'});}ready();});}else ready();
}
function resetComponentRoute(){if(location.hash!=='#components')history.replaceState(null,'','#components');}
function filteredProjects(){
  const query=$('#project-search').value.trim().toLocaleLowerCase(),status=$('#project-status').value;
  const list=projectData.filter(p=>(status==='All statuses'||p.status===status)&&(p.name+' '+p.category).toLocaleLowerCase().includes(query));
  if(sortKey)list.sort((a,b)=>{const n=typeof a[sortKey]==='number'?a[sortKey]-b[sortKey]:String(a[sortKey]).localeCompare(String(b[sortKey]),undefined,{numeric:true});return sortDirection==='ascending'?n:-n;});
  return list;
}
function renderProjects({paginationOnly=false}={}){
  const list=filteredProjects(),pages=Math.max(1,Math.ceil(list.length/PAGE_SIZE));
  projectPage=Math.max(1,Math.min(pages,projectPage));const start=(projectPage-1)*PAGE_SIZE,shown=list.slice(start,start+PAGE_SIZE);
  const tones={'In progress':'brand','In review':'warning',Complete:'success',Planning:'neutral'};
  if(shown.length){
    const rows=shown.map(p=>({...p,status:Badge({label:p.status,tone:tones[p.status]}),owner:Avatar({name:p.owner,size:'sm',tone:p.owner.startsWith('Sarah')?'brand':'info'}),progress:html`<div class="table-progress">${Progress({value:p.progress,label:p.name+' progress',showLabel:false})}<span>${p.progress}%</span></div>`}));
    $('#projects-table').innerHTML=render(DataTable({id:'workspace-table',caption:'Studio projects',columns:[{key:'name',label:'Project name',sortable:true},{key:'category',label:'Category'},{key:'status',label:'Status'},{key:'owner',label:'Owner'},{key:'progress',label:'Progress',sortable:true}],rows,selectable:true}));
    shown.forEach((p,i)=>$('#workspace-table tbody').rows[i].querySelector('[data-column="progress"]').dataset.sort=p.progress);
    if(sortKey){const button=$$('[data-s-sort]',$('#workspace-table')).find(b=>b.dataset.sSort===sortKey);button?.closest('th').setAttribute('aria-sort',sortDirection);}
  }else $('#projects-table').innerHTML=render(EmptyState({title:'A little room for something new',description:'Try another search or create a project.',action:Button({label:'Clear filters',variant:'outline',size:'sm',attrs:{'data-clear-project-filters':true}})}));
  if(!paginationOnly)$('#projects-pagination').innerHTML=render(Pagination({pages,current:projectPage,label:'Project pages'}));
  $('#projects-summary').textContent=shown.length?'Showing '+(start+1)+'–'+(start+shown.length)+' of '+list.length+' projects':'No matching projects';
  $('#selection-bar').hidden=true;
  $('#metric-projects').textContent=projectData.length;
  $('#metric-active').textContent=projectData.filter(p=>p.status==='In progress').length;
  $('#metric-complete').textContent=projectData.filter(p=>p.status==='Complete').length;
}
async function copied(value){
  try{await copyText(value);toast('Ready to use in your next idea.',{title:'Copied to clipboard',duration:2800});}
  catch(error){toast(error.message,{title:'Copy manually',tone:'info',duration:7000});}
}
document.addEventListener('click',event=>{
  const target=event.target;let b;
  if((b=target.closest('[data-feedback]')))toast(b.dataset.feedback,{tone:b.dataset.tone||'success',title:b.dataset.tone==='info'?'A quick note':'Looking good'});
  if((b=target.closest('[data-favorite]'))){const saved=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(saved));toast(saved?'This preview is in your favorites.':'Removed from your favorites.',{title:saved?'A good choice':'Favorites updated',duration:2500});}
  if((b=target.closest('[data-go]')))location.hash=b.dataset.go.slice(1);
  if((b=target.closest('[data-copy-page]')))void copied(location.href);
  if((b=target.closest('[data-copy-value]')))void copied(b.dataset.copyValue);
  if((b=target.closest('[data-copy-id]'))){const el=document.getElementById(b.dataset.copyId);if(el)void copied(el.textContent);}
  if((b=target.closest('[data-code-toggle]'))){const el=document.getElementById(b.getAttribute('aria-controls'));el.hidden=!el.hidden;b.setAttribute('aria-expanded',String(!el.hidden));}
  if((b=target.closest('[data-component-group]'))){category=b.dataset.componentGroup;resetComponentRoute();filterComponents();}
  if(target.closest('[data-clear-filters]')){category='All components';$('#component-search').value='';resetComponentRoute();filterComponents();$('#component-search').focus();}
  if(target.closest('[data-clear-project-filters]')){$('#project-search').value='';$('#project-status').value='All statuses';projectPage=1;renderProjects();$('#project-search').focus();}
  if(target.closest('[data-clear-selection]')){const all=$('#workspace-table [data-s-select-all]');if(all){all.checked=false;all.dispatchEvent(new Event('change',{bubbles:true}));all.focus();}}
  if((b=target.closest('[data-motion-replay]'))){b.closest('.motion-board').toggleAttribute('data-play');}
});
document.addEventListener('input',event=>{
  if(event.target.matches('[data-component-search]')){resetComponentRoute();filterComponents();}
  if(event.target.matches('[data-project-search]')){projectPage=1;renderProjects();}
  if(event.target.id==='new-project-name')event.target.setCustomValidity('');
});
document.addEventListener('change',event=>{
  if(event.target.matches('[data-project-status]')){projectPage=1;renderProjects();}
  if(event.target.matches('[data-theme-switch]'))setTheme(event.target.checked?'dark':'light');
});
document.addEventListener('sarah:themechange',event=>{
  $$('[data-theme-switch]').forEach(box=>{box.checked=event.detail.theme==='dark';});
  $('#settings-theme').value=event.detail.preference;
});
document.addEventListener('sarah:selectionchange',event=>{
  if(event.target.id!=='workspace-table')return;
  $('#selection-bar').hidden=event.detail.count===0;$('#selection-count').textContent=event.detail.count+' project'+(event.detail.count===1?'':'s')+' selected on this page';
});
document.addEventListener('sarah:pagechange',event=>{
  if(event.target.closest('#projects-pagination')){projectPage=event.detail.page;renderProjects({paginationOnly:true});}
  else{const feedback=event.target.parentElement.querySelector('[data-page-feedback]');if(feedback)feedback.textContent='Page '+event.detail.page+' of '+event.detail.pages;}
});
document.addEventListener('sarah:sortchange',event=>{
  if(event.target.id==='workspace-table'){
    sortKey=event.detail.key;sortDirection=event.detail.direction;
    const key=sortKey;renderProjects({paginationOnly:true});
    $$('#workspace-table [data-s-sort]').find(b=>b.dataset.sSort===key)?.focus({preventScroll:true});
  }
});
document.addEventListener('sarah:menuaction',event=>{
  if(event.detail.value==='view')location.hash='patterns';
  if(event.detail.value==='copy')void copied(location.href);
  if(event.detail.value==='archive')toast('This is a visual preview. No project was archived.',{title:'Archive preview',tone:'info'});
});
document.addEventListener('keydown',event=>{
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){
    event.preventDefault();const other=$('dialog[open]');if(other&&other.id!=='library-search')closeDialog(other);
    openDialog($('#library-search'),$('.search-trigger'));$('#library-search input').dispatchEvent(new Event('input',{bubbles:true}));
  }
});
$('#create-project-form').addEventListener('submit',event=>{
  event.preventDefault();const form=event.currentTarget,input=$('#new-project-name'),name=input.value.trim();
  if(name.length<2){input.setCustomValidity('Use at least 2 non-space characters.');input.reportValidity();return;}
  const data=new FormData(form);projectData.unshift({id:'p'+(++projectSequence),name,category:String(data.get('category')),status:'Planning',owner:$('#settings-name').value.trim()||'Sarah Khan',progress:0,description:String(data.get('description'))});
  $('#project-search').value='';$('#project-status').value='All statuses';projectPage=1;sortKey='';renderProjects();
  closeDialog($('#create-project'));form.reset();toast(name+' is ready in your sample workspace.',{title:'A good beginning'});
});
$('#settings-form').addEventListener('submit',event=>{
  event.preventDefault();const data=new FormData(event.currentTarget),name=String(data.get('fullName')).trim();
  if(!name){$('#settings-name').setCustomValidity('Enter your name.');$('#settings-name').reportValidity();return;}
  setTheme(String(data.get('theme')));
  $('.settings-profile').innerHTML=render(html`${Avatar({name,size:'lg',status:true})}<div><strong>${name}</strong><p>Personalize the everyday.</p></div>`);
  $('#settings-status').textContent='Preferences saved for this session.';
  toast('Your sample preferences have been updated.',{title:'Feels a little more like you'});
});
$('#settings-name').addEventListener('input',event=>event.target.setCustomValidity(''));
window.addEventListener('hashchange',()=>route());
renderProjects();enhanceUI(document);
let preference='system';try{preference=localStorage.getItem('sarah-theme')||'system';}catch{}
setTheme(preference,{persist:false});route(true);
document.documentElement.dataset.ready='true';
