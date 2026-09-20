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
  const rows=table.tBodies?.[0]?.rows;if(!rows||!rows.length)return;
  [...rows].sort((a,b)=>{const x=value(a),y=value(b);const n=x!==''&&y!==''&&Number.isFinite(Number(x))&&Number.isFinite(Number(y))?Number(x)-Number(y):collator.compare(x,y);return ascending?n:-n;}).forEach(row=>table.tBodies[0].append(row));
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
    if((b=closest(event,'[data-s-toggle]'))){handled.add(event);const pressed=b.getAttribute('aria-pressed')==='true';b.setAttribute('aria-pressed',String(!pressed));emit(b,'toggle',{pressed:!pressed});return;}
    if((b=closest(event,'[data-s-drawer-open]'))){handled.add(event);event.preventDefault();const d=doc.getElementById(b.dataset.sDrawerOpen);openDialog(d,b);return;}
    if((b=closest(event,'[data-s-popover] button'))){handled.add(event);const p=b.closest('[data-s-popover]'),content=p?.querySelector('.s-popover-content');if(content)content.hidden=!content.hidden;return;}
    if((b=closest(event,'[data-s-dialog-open]'))){handled.add(event);event.preventDefault();const d=doc.getElementById(b.dataset.sDialogOpen);openDialog(d,b);if(d?.matches('[data-s-command]'))filterCommand(d);return;}
    if((b=closest(event,'[data-s-dialog-close]'))){handled.add(event);closeDialog(b.closest('dialog'));return;}
    if(event.target.matches?.('dialog')){const d=event.target;if(d.hasAttribute('data-s-static'))return;const r=d.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog(d);}
    if((b=closest(event,'[data-s-alert-close]'))){handled.add(event);const a=b.closest('.s-alert');if(a)a.remove();return;}
    if((b=closest(event,'[data-s-tabs] [role=tab]'))){handled.add(event);activateTab(b.closest('[data-s-tabs]'),b);return;}
    if((b=closest(event,'[data-s-pagination] [data-page]'))){handled.add(event);if(!b.disabled)paginate(b.closest('[data-s-pagination]'),b.dataset.page);return;}
    if((b=closest(event,'[data-s-sort]'))){handled.add(event);sortTable(b);return;}
    if((b=closest(event,'[data-s-chip-remove]'))){handled.add(event);const chip=b.closest('.s-chip'),parent=chip.parentElement,label=chip.textContent.trim(),neighbor=chip.nextElementSibling||chip.previousElementSibling;chip.remove();const focus=neighbor?.querySelector('button')||parent;if(!focus.hasAttribute('tabindex')&&focus===parent)focus.tabIndex=-1;focus.focus();emit(parent,'chipremove',{label});return;}
    if((b=closest(event,'[data-s-menu-trigger]'))){handled.add(event);setMenu(b.closest('[data-s-menu]'),b.getAttribute('aria-expanded')!=='true');return;}
    if((b=closest(event,'[data-s-menu] [role=menuitem]'))&&!b.disabled){handled.add(event);const menu=b.closest('[data-s-menu]');setMenu(menu,false,{restore:true});emit(menu,'menuaction',{value:b.dataset.value});return;}
    if((b=closest(event,'[data-s-command] [role=option]'))){handled.add(event);chooseCommand(b.closest('[data-s-command]'),b);}
    if((b=closest(event,'[data-s-confetti]'))){
      handled.add(event);
      const mode=b.dataset.sConfetti||'basic';
      const colors=['#ff0055','#ffcc00','#33ccff','#33ff66','#cc33ff','#ff6600'];
      const fireBurst=(originX,originY,count=35,spreadAngle=null)=>{
        const container=doc.createElement('div');
        container.className='s-confetti-canvas';
        for(let i=0;i<count;i++){
          const p=doc.createElement('div');
          const color=colors[i%colors.length];
          const angle=spreadAngle!==null?(spreadAngle+(Math.random()-0.5)*0.8):(Math.random()*Math.PI*2);
          const dist=70+Math.random()*150;
          const dx=Math.cos(angle)*dist;
          const dy=Math.sin(angle)*dist-(spreadAngle!==null?50:30);
          p.style.cssText=`position:fixed;left:${originX}px;top:${originY}px;width:${6+Math.random()*4}px;height:${6+Math.random()*4}px;background:${color};border-radius:${Math.random()>0.5?'50%':'2px'};pointer-events:none;transition:all 0.9s cubic-bezier(0.15,0.85,0.25,1);opacity:1;transform:translate(0,0) scale(1) rotate(0deg);z-index:99999;`;
          container.append(p);
          win.setTimeout(()=>{
            p.style.transform=`translate(${dx}px,${dy}px) scale(0.4) rotate(${Math.random()*720}deg)`;
            p.style.opacity='0';
          },16);
        }
        doc.body.append(container);
        win.setTimeout(()=>container.remove(),1100);
      };
      const rect=b.getBoundingClientRect();
      const bx=rect.left+rect.width/2;
      const by=rect.top+rect.height/2;
      if(mode==='fireworks'){
        fireBurst(bx-120,by-60,30);
        win.setTimeout(()=>fireBurst(bx+120,by-80,30),200);
        win.setTimeout(()=>fireBurst(bx,by-120,45),400);
      }else if(mode==='side-cannons'){
        fireBurst(win.innerWidth*0.1,win.innerHeight*0.85,40,-Math.PI/3);
        fireBurst(win.innerWidth*0.9,win.innerHeight*0.85,40,-Math.PI*2/3);
      }else{
        fireBurst(bx,by,45);
      }
    }
    if((b=closest(event,'[data-s-cool-mode]'))){
      handled.add(event);
      const rect=b.getBoundingClientRect();
      const container=doc.createElement('div');
      container.className='s-cool-mode-canvas';
      for(let i=0;i<18;i++){
        const p=doc.createElement('div');
        const color=['#5B3DF5','#178BFF','#00E5FF','#A020FF','#FF3366','#FFCC00'][i%6];
        const angle=Math.random()*Math.PI*2;
        const dist=40+Math.random()*70;
        const dx=Math.cos(angle)*dist;
        const dy=Math.sin(angle)*dist;
        p.style.cssText=`position:fixed;left:${rect.left+rect.width/2}px;top:${rect.top+rect.height/2}px;width:6px;height:6px;background:${color};border-radius:50%;pointer-events:none;transition:all 0.6s cubic-bezier(0.2,0.8,0.2,1);opacity:1;transform:translate(0,0) scale(1);`;
        container.append(p);
        win.setTimeout(()=>{
          p.style.transform=`translate(${dx}px,${dy}px) scale(0)`;
          p.style.opacity='0';
        },16);
      }
      doc.body.append(container);
      win.setTimeout(()=>container.remove(),800);
    }
    if((b=closest(event,'[data-s-ripple]'))){
      const rect=b.getBoundingClientRect();
      const x=event.clientX-rect.left;
      const y=event.clientY-rect.top;
      const size=Math.max(rect.width,rect.height)*2;
      const surf=b.querySelector('.s-ripple-surface')||b;
      const r=doc.createElement('span');
      r.className='s-ripple-wave';
      r.style.cssText=`left:${x-size/2}px;top:${y-size/2}px;width:${size}px;height:${size}px;`;
      surf.append(r);
      win.setTimeout(()=>r.remove(),700);
    }
    if((b=closest(event,'[data-s-subscribe-btn]'))){
      handled.add(event);
      const isSub=b.classList.toggle('s-subscribed');
      b.setAttribute('aria-pressed',String(isSub));
      emit(b,'subscribechange',{subscribed:isSub});
      return;
    }
    if((b=closest(event,'[data-s-theme-toggler]'))){
      handled.add(event);
      const variant=b.dataset.sThemeToggler||'circle';
      const duration=Number(b.dataset.duration)||400;
      const rootEl=doc.documentElement;
      const isDark=rootEl.classList.contains('dark')||rootEl.dataset.theme==='dark';
      const toggleFn=()=>{
        const newDark=!isDark;
        rootEl.classList.toggle('dark',newDark);
        setTheme(newDark?'dark':'light',{root:rootEl});
      };
      if(doc.startViewTransition){
        const rect=b.getBoundingClientRect();
        const cx=rect.left+rect.width/2;
        const cy=rect.top+rect.height/2;
        const maxRadius=Math.hypot(Math.max(cx,win.innerWidth-cx),Math.max(cy,win.innerHeight-cy));
        const transition=doc.startViewTransition(toggleFn);
        transition.ready?.then?.(()=>{
          rootEl.animate({clipPath:[`circle(0% at ${cx}px ${cy}px)`,`circle(${maxRadius}px at ${cx}px ${cy}px)`]},{duration,easing:'ease-in-out',pseudoElement:'::view-transition-new(root)'});
        });
      } else {
        toggleFn();
      }
      return;
    }
    if((b=closest(event,'[data-s-video-open]'))){
      handled.add(event);
      const dialogId=b.dataset.sVideoOpen;
      const dialog=doc.getElementById(dialogId);
      if(dialog){
        const iframe=dialog.querySelector('iframe');
        if(iframe&&dialog.dataset.videoSrc)iframe.src=dialog.dataset.videoSrc;
        openDialog(dialog,b);
      }
      return;
    }
    if((b=closest(event,'[data-s-tree-folder]'))){
      handled.add(event);
      const folder=b.closest('.s-tree-folder');
      if(folder)folder.classList.toggle('s-tree-folder--open');
      return;
    }
    if((b=closest(event,'[data-s-tree-toggle-all]'))){
      handled.add(event);
      const tree=b.closest('[data-s-file-tree]');
      if(tree){
        const folders=tree.querySelectorAll('.s-tree-folder');
        const anyClosed=[...folders].some(f=>!f.classList.contains('s-tree-folder--open'));
        folders.forEach(f=>f.classList.toggle('s-tree-folder--open',anyClosed));
      }
      return;
    }
  });
  on(root,'contextmenu',event=>{
    const wrap=closest(event,'[data-s-context-menu]');
    if(wrap){
      event.preventDefault();
      const menuId=wrap.dataset.sContextMenu;
      const menu=doc.getElementById(menuId);
      if(menu){
        menu.hidden=false;
        menu.style.position='fixed';
        menu.style.left=Math.min(event.clientX,win.innerWidth-180)+'px';
        menu.style.top=Math.min(event.clientY,win.innerHeight-200)+'px';
        menu.style.zIndex='100';
      }
    }
  });
  on(root,'pointerover',event=>{
    const hc=closest(event,'[data-s-hover-card]');
    if(hc){
      const content=hc.querySelector('.s-hover-card-content');
      if(content)content.hidden=false;
    }
    const ht=closest(event,'[data-s-hyper-text]');
    if(ht&&!ht.dataset.hasTriggered){
      ht.dataset.hasTriggered='true';
      const targetText=ht.dataset.sHyperText||ht.textContent;
      const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      let iterations=0;
      const interval=win.setInterval(()=>{
        ht.textContent=targetText.split('').map((letter,index)=>{
          if(index<iterations)return targetText[index];
          return chars[Math.floor(Math.random()*chars.length)];
        }).join('');
        if(iterations>=targetText.length){win.clearInterval(interval);}
        iterations+=1/2;
      },30);
    }
    const gridPattern=closest(event,'[data-s-interactive-grid]');
    if(gridPattern){
      const rect=closest(event,'.s-interactive-grid-rect');
      if(rect){
        rect.classList.add('s-grid-hovered');
        win.setTimeout(()=>rect.classList.remove('s-grid-hovered'),600);
      }
    }
  });
  on(root,'pointerout',event=>{
    const hc=closest(event,'[data-s-hover-card]');
    if(hc&&!hc.contains(event.relatedTarget)){
      const content=hc.querySelector('.s-hover-card-content');
      if(content)content.hidden=true;
    }
    const ht=closest(event,'[data-s-hyper-text]');
    if(ht&&!ht.contains(event.relatedTarget)){
      delete ht.dataset.hasTriggered;
    }
    const ptr=closest(event,'[data-s-pointer]');
    if(ptr&&!ptr.contains(event.relatedTarget)){
      ptr.style.cursor='';
      const glyph=ptr.querySelector('.s-pointer-glyph');
      if(glyph)glyph.style.opacity='0';
    }
  });
  on(root,'pointermove',event=>{
    const card=closest(event,'[data-s-magic-card]');
    if(card){
      const rect=card.getBoundingClientRect();
      card.style.setProperty('--mouse-x',`${event.clientX-rect.left}px`);
      card.style.setProperty('--mouse-y',`${event.clientY-rect.top}px`);
    }
    const lens=closest(event,'[data-s-lens]');
    if(lens){
      const rect=lens.getBoundingClientRect();
      const x=event.clientX-rect.left;
      const y=event.clientY-rect.top;
      lens.style.setProperty('--lens-x',`${x}px`);
      lens.style.setProperty('--lens-y',`${y}px`);
    }
    const pointer=closest(event,'[data-s-pointer]');
    if(pointer){
      pointer.style.cursor='none';
      const glyph=pointer.querySelector('.s-pointer-glyph');
      if(glyph){glyph.style.left=`${event.clientX}px`;glyph.style.top=`${event.clientY}px`;glyph.style.opacity='1';}
    }
  });
  on(doc,'click',event=>{
    root.querySelectorAll('[data-s-menu]').forEach(menu=>{if(!menu.contains(event.target))setMenu(menu,false);});
    root.querySelectorAll('.s-context-menu-panel').forEach(menu=>{if(!menu.contains(event.target))menu.hidden=true;});
    root.querySelectorAll('[data-s-popover]').forEach(pop=>{if(!pop.contains(event.target)){const c=pop.querySelector('.s-popover-content');if(c)c.hidden=true;}});
  });
  let lastScrollY=win.scrollY,scrollVelocity=1,velocityDecayId;
  const decayVelocity=()=>{
    scrollVelocity+=(1-scrollVelocity)*0.04;
    if(Math.abs(scrollVelocity-1)>0.01){
      root.querySelectorAll('[data-s-scroll-velocity]').forEach(v=>{
        v.style.setProperty('--velocity-speed',scrollVelocity.toFixed(2));
      });
      velocityDecayId=win.requestAnimationFrame(decayVelocity);
    }else{
      scrollVelocity=1;
      root.querySelectorAll('[data-s-scroll-velocity]').forEach(v=>{v.style.setProperty('--velocity-speed','1');});
    }
  };
  on(win,'scroll',()=>{
    const sp=root.querySelector('[data-s-scroll-progress]');
    if(sp){
      const total=doc.documentElement.scrollHeight-win.innerHeight;
      const progress=total>0?Math.min(1,Math.max(0,win.scrollY/total)):0;
      sp.style.width=`${(progress*100).toFixed(1)}%`;
    }
    const vel=root.querySelectorAll('[data-s-scroll-velocity]');
    if(vel.length){
      const delta=Math.abs(win.scrollY-lastScrollY);
      lastScrollY=win.scrollY;
      const boost=Math.min(5,1+delta*0.06);
      scrollVelocity=Math.max(scrollVelocity,boost);
      vel.forEach(v=>{v.style.setProperty('--velocity-speed',scrollVelocity.toFixed(2));});
      win.cancelAnimationFrame(velocityDecayId);
      velocityDecayId=win.requestAnimationFrame(decayVelocity);
    }
  },{passive:true});
  root.querySelectorAll('canvas[data-s-globe]').forEach(canvas=>{
    const ctx=canvas.getContext?.('2d');if(!ctx)return;
    const numDots=650;
    const dots=[];
    for(let i=0;i<numDots;i++){
      const phi=Math.acos(1-(2*(i+0.5))/numDots);
      const theta=Math.PI*(1+Math.sqrt(5))*(i+0.5);
      dots.push({x:Math.sin(phi)*Math.cos(theta),y:Math.cos(phi),z:Math.sin(phi)*Math.sin(theta)});
    }
    let rotY=0,rotX=0.35,isDrag=false,lastX=0,lastY=0,animId;
    const renderGlobe=()=>{
      if(!canvas.isConnected)return;
      const w=canvas.width,h=canvas.height;
      ctx.clearRect(0,0,w,h);
      const cx=w/2,cy=h/2,r=w*0.38;
      if(!isDrag)rotY+=0.008;
      const cosY=Math.cos(rotY),sinY=Math.sin(rotY);
      const cosX=Math.cos(rotX),sinX=Math.sin(rotX);
      ctx.strokeStyle='rgba(91,61,245,0.25)';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();
      for(let i=0;i<dots.length;i++){
        const p=dots[i];
        const x1=p.x*cosY-p.z*sinY,z1=p.x*sinY+p.z*cosY;
        const y2=p.y*cosX-z1*sinX,z2=p.y*sinX+z1*cosX;
        const screenX=cx+x1*r,screenY=cy+y2*r;
        const alpha=Math.max(0.08,(z2+1)/2);
        const dotSize=z2>0?1.4+z2*1.8:0.9;
        ctx.fillStyle=z2>0?'#5B3DF5':'rgba(91,61,245,0.3)';
        ctx.globalAlpha=alpha;
        ctx.beginPath();ctx.arc(screenX,screenY,dotSize,0,Math.PI*2);ctx.fill();
      }
      ctx.globalAlpha=1;
      animId=win.requestAnimationFrame(renderGlobe);
    };
    canvas.addEventListener('mousedown',e=>{isDrag=true;lastX=e.clientX;lastY=e.clientY;});
    win.addEventListener('mousemove',e=>{
      if(isDrag){
        rotY+=(e.clientX-lastX)*0.008;
        rotX+=(e.clientY-lastY)*0.008;
        rotX=Math.max(-1,Math.min(1,rotX));
        lastX=e.clientX;lastY=e.clientY;
      }
    });
    win.addEventListener('mouseup',()=>{isDrag=false;});
    renderGlobe();
  });
  root.querySelectorAll('canvas[data-s-flickering]').forEach(canvas=>{
    const ctx=canvas.getContext?.('2d');if(!ctx)return;
    const parent=canvas.parentElement;
    if(!parent)return;
    const sz=Number(canvas.dataset.squareSize)||4,gap=Number(canvas.dataset.gridGap)||6,chance=Number(canvas.dataset.flickerChance)||0.3;
    let animId;
    const draw=()=>{
      canvas.width=parent.clientWidth||200;canvas.height=parent.clientHeight||150;
      const cols=Math.floor(canvas.width/(sz+gap)),rows=Math.floor(canvas.height/(sz+gap));
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i=0;i<cols;i++){
        for(let j=0;j<rows;j++){
          if(Math.random()<chance){
            const alpha=(Math.random()*0.4+0.1).toFixed(2);
            ctx.fillStyle=`rgba(91,61,245,${alpha})`;
            ctx.fillRect(i*(sz+gap),j*(sz+gap),sz,sz);
          }
        }
      }
      animId=win.setTimeout(draw,200);
    };
    draw();
  });
  root.querySelectorAll('canvas[data-s-floating-particles]').forEach(canvas=>{
    const ctx=canvas.getContext?.('2d');if(!ctx)return;
    const parent=canvas.parentElement;if(!parent)return;
    const count=Number(canvas.dataset.quantity)||80,color=canvas.dataset.color||'#8B5CF6',drift=Number(canvas.dataset.drift)||0.8;
    let animId;
    let w=canvas.width=parent.clientWidth||300,h=canvas.height=parent.clientHeight||200;
    const particles=Array.from({length:count},()=>({
      x:Math.random()*w,y:Math.random()*h,size:1+Math.random()*4,
      speedY:-drift*(0.3+Math.random()*0.7),opacity:0.1+Math.random()*0.4
    }));
    const render=()=>{
      if(!canvas.isConnected)return;
      if(parent.clientWidth&&(canvas.width!==parent.clientWidth||canvas.height!==parent.clientHeight)){
        w=canvas.width=parent.clientWidth;h=canvas.height=parent.clientHeight;
      }
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle=color;
      for(const p of particles){
        p.y+=p.speedY;
        if(p.y<0)p.y=h;
        ctx.globalAlpha=p.opacity;
        ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();
      }
      ctx.globalAlpha=1;
      animId=win.requestAnimationFrame(render);
    };
    render();
  });
  root.querySelectorAll('[data-s-particles]').forEach(container=>{
    const canvas=container.querySelector('canvas');if(!canvas)return;
    const ctx=canvas.getContext?.('2d');if(!ctx)return;
    const count=Number(container.dataset.sParticles)||50;
    const color=container.dataset.color||'#5B3DF5';
    let w=canvas.width=container.clientWidth||300,h=canvas.height=container.clientHeight||180;
    const particles=Array.from({length:count},()=>({
      x:Math.random()*w,y:Math.random()*h,
      vx:(Math.random()-0.5)*0.6,vy:(Math.random()-0.5)*0.6,
      size:1.2+Math.random()*2.2,alpha:0.25+Math.random()*0.65
    }));
    let mouseX=-1000,mouseY=-1000;
    container.addEventListener('mousemove',e=>{
      const rect=container.getBoundingClientRect();
      mouseX=e.clientX-rect.left;mouseY=e.clientY-rect.top;
    });
    container.addEventListener('mouseleave',()=>{mouseX=-1000;mouseY=-1000;});
    let animId;
    const render=()=>{
      if(!canvas.isConnected)return;
      if(container.clientWidth&&(canvas.width!==container.clientWidth||canvas.height!==container.clientHeight)){
        w=canvas.width=container.clientWidth;h=canvas.height=container.clientHeight;
      }
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle=color;
      for(let i=0;i<particles.length;i++){
        const p=particles[i];
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0)p.x=w;if(p.x>w)p.x=0;
        if(p.y<0)p.y=h;if(p.y>h)p.y=0;
        const dx=p.x-mouseX,dy=p.y-mouseY,dist=Math.hypot(dx,dy);
        if(dist<90&&dist>0){
          const force=(1-dist/90)*2.5;
          p.x+=(dx/dist)*force;p.y+=(dy/dist)*force;
        }
        ctx.globalAlpha=p.alpha;
        ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();
      }
      ctx.globalAlpha=1;
      animId=win.requestAnimationFrame(render);
    };
    render();
  });
  root.querySelectorAll('[data-s-typing]').forEach(el=>{
    if(el.dataset.typingActive)return;
    el.dataset.typingActive='true';
    const fullText=el.dataset.sTyping||el.textContent||'';
    const duration=Number(el.dataset.duration)||80;
    const delay=Number(el.dataset.delay)||300;
    const cursor=doc.createElement('span');
    cursor.className='s-typing-cursor';
    cursor.setAttribute('aria-hidden','true');
    let charIdx=0,isDeleting=false;
    el.textContent='';el.appendChild(cursor);
    const tick=()=>{
      if(!el.isConnected)return;
      if(!isDeleting){
        charIdx++;
        el.textContent=fullText.slice(0,charIdx);
        el.appendChild(cursor);
        if(charIdx>=fullText.length){
          isDeleting=true;
          win.setTimeout(tick,2200);
          return;
        }
        win.setTimeout(tick,duration);
      }else{
        charIdx--;
        el.textContent=fullText.slice(0,charIdx);
        el.appendChild(cursor);
        if(charIdx<=0){
          isDeleting=false;
          win.setTimeout(tick,600);
          return;
        }
        win.setTimeout(tick,Math.max(30,duration/2));
      }
    };
    win.setTimeout(tick,delay);
  });
  root.querySelectorAll('[data-s-word-rotate]').forEach(el=>{
    if(el.dataset.rotateActive)return;
    el.dataset.rotateActive='true';
    let words=[];
    try{words=JSON.parse(el.dataset.sWordRotate||'[]');}catch{}
    if(!words.length)return;
    const duration=Number(el.dataset.duration)||2500;
    let idx=0;
    const interval=win.setInterval(()=>{
      if(!el.isConnected){win.clearInterval(interval);return;}
      idx=(idx+1)%words.length;
      const item=doc.createElement('span');
      item.className='s-word-rotate-item';
      item.textContent=words[idx];
      el.replaceChildren(item);
    },duration);
  });
  root.querySelectorAll('[data-s-morphing-text]').forEach(el=>{
    if(el.dataset.morphActive)return;
    el.dataset.morphActive='true';
    let texts=[];
    try{texts=JSON.parse(el.dataset.sMorphingText||'[]');}catch{}
    if(!texts.length)return;
    let idx=0;
    let currentSpan=el.querySelector('.s-morph-current');
    if(!currentSpan){
      currentSpan=doc.createElement('span');
      currentSpan.className='s-morph-current';
      currentSpan.textContent=texts[0];
      el.replaceChildren(currentSpan);
    }
    const interval=win.setInterval(()=>{
      if(!el.isConnected){win.clearInterval(interval);return;}
      currentSpan.classList.add('is-morphing');
      win.setTimeout(()=>{
        idx=(idx+1)%texts.length;
        currentSpan.textContent=texts[idx];
        currentSpan.classList.remove('is-morphing');
      },400);
    },2800);
  });
  root.querySelectorAll('canvas[data-s-glyph-matrix]').forEach(canvas=>{
    const ctx=canvas.getContext?.('2d');if(!ctx)return;
    const parent=canvas.parentElement;if(!parent)return;
    const glyphs=canvas.dataset.glyphs||'01·•+*/\\<>=',cellSize=Number(canvas.dataset.cellSize)||14,interval=Number(canvas.dataset.interval)||90;
    let w=canvas.width=parent.clientWidth||300,h=canvas.height=parent.clientHeight||200;
    const cols=Math.ceil(w/cellSize),rows=Math.ceil(h/cellSize);
    const cells=Array.from({length:cols*rows},()=>glyphs[Math.floor(Math.random()*glyphs.length)]);
    let last=0;
    const draw=()=>{
      ctx.clearRect(0,0,w,h);
      ctx.font=`${cellSize-2}px monospace`;
      ctx.fillStyle='rgba(107,114,128,0.35)';
      ctx.textBaseline='top';
      for(let y=0;y<rows;y++){
        for(let x=0;x<cols;x++){
          ctx.fillText(cells[y*cols+x],x*cellSize,y*cellSize);
        }
      }
    };
    const tick=t=>{
      if(t-last>=interval){
        last=t;
        const total=cols*rows;
        for(let i=0;i<Math.max(1,Math.floor(total*0.05));i++){
          cells[Math.floor(Math.random()*total)]=glyphs[Math.floor(Math.random()*glyphs.length)];
        }
        draw();
      }
      win.requestAnimationFrame(tick);
    };
    draw();
    win.requestAnimationFrame(tick);
  });
  root.querySelectorAll('canvas[data-s-icon-cloud]').forEach(canvas=>{
    const ctx=canvas.getContext?.('2d');if(!ctx)return;
    let icons=[];let images=[];
    try{icons=JSON.parse(canvas.dataset.icons||'[]');}catch{}
    try{images=JSON.parse(canvas.dataset.images||'[]');}catch{}
    if(!icons.length&&!images.length)icons=['typescript','react','nextdotjs','nodedotjs','docker','git','figma','github','html5','css3','javascript','prisma'];
    const items=images.length?images:icons;
    const numIcons=items.length;
    const points=[];
    const offset=2/numIcons,increment=Math.PI*(3-Math.sqrt(5));
    for(let i=0;i<numIcons;i++){
      const y=i*offset-1+offset/2;
      const r=Math.sqrt(1-y*y);
      const phi=i*increment;
      const name=icons[i]||`item-${i}`;
      const imgSrc=images[i]||`https://cdn.simpleicons.org/${name}/${name}`;
      points.push({x:Math.cos(phi)*r*110,y:y*110,z:Math.sin(phi)*r*110,name,imgSrc});
    }
    const loadedImgs=new Map();
    points.forEach(p=>{
      const img=new Image();
      img.crossOrigin='anonymous';
      img.src=p.imgSrc;
      img.onload=()=>loadedImgs.set(p.imgSrc,img);
    });
    let rotX=0,rotY=0,isDrag=false,lastX=0,lastY=0;
    let animId;
    const render=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      const cx=canvas.width/2,cy=canvas.height/2;
      if(!isDrag){rotX+=0.003;rotY+=0.005;}
      const cosX=Math.cos(rotX),sinX=Math.sin(rotX);
      const cosY=Math.cos(rotY),sinY=Math.sin(rotY);
      points.forEach(p=>{
        const rx=p.x*cosY-p.z*sinY;
        const rz=p.x*sinY+p.z*cosY;
        const ry=p.y*cosX+rz*sinX;
        const scale=(rz+200)/300;
        const alpha=Math.max(0.25,Math.min(1,(rz+150)/200));
        ctx.save();
        ctx.translate(cx+rx,cy+ry);
        ctx.scale(scale,scale);
        ctx.globalAlpha=alpha;
        const img=loadedImgs.get(p.imgSrc);
        if(img&&img.complete&&img.naturalWidth){
          ctx.drawImage(img,-16,-16,32,32);
        }else{
          ctx.fillStyle='#5B3DF5';
          ctx.beginPath();ctx.arc(0,0,16,0,Math.PI*2);ctx.fill();
          ctx.fillStyle='#ffffff';
          ctx.font='bold 10px system-ui, sans-serif';
          ctx.textAlign='center';ctx.textBaseline='middle';
          ctx.fillText(p.name.slice(0,3).toUpperCase(),0,0);
        }
        ctx.restore();
      });
      animId=win.requestAnimationFrame(render);
    };
    canvas.addEventListener('mousedown',e=>{isDrag=true;lastX=e.clientX;lastY=e.clientY;});
    win.addEventListener('mousemove',e=>{if(isDrag){rotY+=(e.clientX-lastX)*0.01;rotX+=(e.clientY-lastY)*0.01;lastX=e.clientX;lastY=e.clientY;}});
    win.addEventListener('mouseup',()=>{isDrag=false;});
    render();
  });
  // Dock macOS distance wave magnification (cosine falloff)
  root.querySelectorAll('[data-s-dock]').forEach(dock=>{
    const icons=dock.querySelectorAll('.s-dock-icon');
    const distance=140,baseSize=40,maxSize=64;
    dock.addEventListener('mousemove',e=>{
      icons.forEach(icon=>{
        const rect=icon.getBoundingClientRect();
        const center=rect.left+rect.width/2;
        const d=Math.abs(e.clientX-center);
        if(d<distance){
          const progress=(1+Math.cos((d/distance)*Math.PI))/2;
          const size=baseSize+(maxSize-baseSize)*progress;
          icon.style.setProperty('--dock-size',`${size}px`);
          icon.style.width=`${size}px`;
          icon.style.height=`${size}px`;
          icon.style.transform=`translateY(-${progress*14}px)`;
        }else{
          icon.style.setProperty('--dock-size',`${baseSize}px`);
          icon.style.width=`${baseSize}px`;
          icon.style.height=`${baseSize}px`;
          icon.style.transform='none';
        }
      });
    });
    dock.addEventListener('mouseleave',()=>{
      icons.forEach(icon=>{
        icon.style.setProperty('--dock-size',`${baseSize}px`);
        icon.style.width=`${baseSize}px`;
        icon.style.height=`${baseSize}px`;
        icon.style.transform='none';
      });
    });
  });
  // Terminal character-by-character typewriter and sequential step reveal
  root.querySelectorAll('[data-s-terminal]').forEach(term=>{
    if(term.dataset.initialized)return;
    term.dataset.initialized='true';
    const cmd=term.dataset.command||'npx sarahui@latest init';
    let steps=[];
    try{steps=JSON.parse(term.dataset.steps||'[]');}catch{}
    const output=term.dataset.output||'';
    const cmdEl=term.querySelector('.s-terminal-cmd');
    const stepsEl=term.querySelector('.s-terminal-steps');
    const outEl=term.querySelector('.s-terminal-output');
    if(!cmdEl)return;
    let charIdx=0;
    const typeInterval=win.setInterval(()=>{
      if(charIdx<cmd.length){
        cmdEl.textContent+=cmd[charIdx];
        charIdx++;
      }else{
        win.clearInterval(typeInterval);
        if(steps&&steps.length&&stepsEl){
          steps.forEach((step,i)=>{
            win.setTimeout(()=>{
              const line=doc.createElement('div');
              line.className='s-terminal-line is-visible';
              line.innerHTML=`<span class="s-terminal-check" style="color:var(--s-status-success-text,#10B981);font-weight:bold;margin-right:6px;">✔</span> <span>${escapeText(step)}</span>`;
              stepsEl.appendChild(line);
              if(i===steps.length-1&&outEl&&output){
                win.setTimeout(()=>{
                  outEl.style.display='block';
                  outEl.className='s-terminal-output s-terminal-line is-visible';
                },300);
              }
            },300+i*350);
          });
        }else if(outEl&&output){
          win.setTimeout(()=>{
            outEl.style.display='block';
            outEl.className='s-terminal-output s-terminal-line is-visible';
          },300);
        }
      }
    },45);
  });
  // AnimatedList spring insertion queue
  root.querySelectorAll('[data-s-animated-list]').forEach(list=>{
    if(list.dataset.initialized)return;
    list.dataset.initialized='true';
    let items=[];
    try{items=JSON.parse(list.dataset.items||'[]');}catch{}
    if(!items.length)return;
    const delay=Number(list.dataset.delay)||1800;
    let idx=3%items.length;
    win.setInterval(()=>{
      const nextItemMarkup=items[idx];
      idx=(idx+1)%items.length;
      const wrapper=doc.createElement('div');
      wrapper.className='s-animated-list-item';
      wrapper.innerHTML=nextItemMarkup;
      list.prepend(wrapper);
      const children=list.querySelectorAll('.s-animated-list-item');
      if(children.length>4){
        const last=children[children.length-1];
        last.style.opacity='0';
        last.style.transform='scale(0.85)';
        win.setTimeout(()=>last.remove(),400);
      }
    },delay);
  });
  // SmoothCursor lerp follower with velocity tilt
  const scEl=root.querySelector?.('[data-s-smooth-cursor]');
  if(scEl){
    const follower=scEl.querySelector('.s-smooth-cursor-follower');
    if(follower){
      let mouseX=-100,mouseY=-100,currX=-100,currY=-100,prevX=-100,prevY=-100;
      let currentAngle=0,isVisible=false;
      win.addEventListener('mousemove',e=>{
        mouseX=e.clientX;mouseY=e.clientY;
        if(!isVisible){isVisible=true;currX=mouseX;currY=mouseY;follower.style.opacity='1';}
      });
      const updateCursor=()=>{
        if(isVisible){
          const vx=mouseX-currX,vy=mouseY-currY;
          currX+=vx*0.18;currY+=vy*0.18;
          const deltaX=currX-prevX,deltaY=currY-prevY;
          prevX=currX;prevY=currY;
          const speed=Math.hypot(deltaX,deltaY);
          if(speed>0.5){
            const targetAngle=Math.atan2(deltaY,deltaX)*(180/Math.PI)-90;
            let diff=(targetAngle-currentAngle)%360;
            if(diff>180)diff-=360;
            if(diff<-180)diff+=360;
            currentAngle+=diff*0.2;
          }
          follower.style.transform=`translate3d(${currX}px,${currY}px,0) rotate(${currentAngle}deg)`;
        }
        win.requestAnimationFrame(updateCursor);
      };
      updateCursor();
    }
  }
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
    if(event.key==='Escape'){
      const tip=closest(event,'[data-s-tooltip]');if(tip)tip.dataset.dismissed='true';
      root.querySelectorAll('.s-context-menu-panel').forEach(menu=>{menu.hidden=true;});
    }
  });
  on(root,'input',event=>{const e=event.target;if(e.matches('[data-s-slider]')){const out=e.closest('.s-slider-field')?.querySelector('output');if(out)out.value=e.value;}if(e.matches('[data-s-command-input]'))filterCommand(e.closest('dialog'));});
  on(root,'change',event=>{const e=event.target;if(e.matches('[data-s-select-all]')){const table=e.closest('table');table.querySelectorAll('[data-s-row-select]:not(:disabled)').forEach(b=>{b.checked=e.checked;});tableSelection(table);}else if(e.matches('[data-s-row-select]'))tableSelection(e.closest('table'));});
  const positionTooltip=tip=>{
    const bubble=tip.querySelector('[role=tooltip]');if(!bubble)return;
    bubble.style.setProperty('--s-tooltip-shift','0px');const rect=bubble.getBoundingClientRect();
    const shift=rect.left<12?12-rect.left:rect.right>win.innerWidth-12?win.innerWidth-12-rect.right:0;
    bubble.style.setProperty('--s-tooltip-shift',shift+'px');
  };
  for(const type of ['focusin','pointerover'])on(root,type,event=>{const tip=closest(event,'[data-s-tooltip]');if(tip&&!tip.contains(event.relatedTarget)){delete tip.dataset.dismissed;positionTooltip(tip);}});
  on(win,'resize',()=>root.querySelectorAll('[data-s-tooltip]:hover,[data-s-tooltip]:focus-within').forEach(positionTooltip));
  on(root,'close',event=>{const d=event.target;if(!d.matches?.('dialog'))return;const trigger=dialogTriggers.get(d);if(trigger?.isConnected&&trigger.getClientRects().length)trigger.focus({preventScroll:true});dialogTriggers.delete(d);},true);
  on(win.matchMedia('(prefers-color-scheme: dark)'),'change',()=>{if(doc.documentElement.dataset.themePreference==='system')setTheme('system',{root:doc.documentElement,persist:false});});
  if(win?.IntersectionObserver){
    const tickerObserver=new win.IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el=entry.target,targetVal=Number(el.dataset.sNumberTicker)||0,decimals=Number(el.dataset.decimals)||0;
          let startTime=null;
          const step=time=>{
            if(!startTime)startTime=time;
            const progress=Math.min(1,(time-startTime)/1500);
            el.textContent=(progress*targetVal).toFixed(decimals);
            if(progress<1)win.requestAnimationFrame(step);
          };
          win.requestAnimationFrame(step);
          tickerObserver.unobserve(el);
        }
      });
    },{threshold:0.1});
    root.querySelectorAll('[data-s-number-ticker]').forEach(el=>tickerObserver.observe(el));
  }
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
