import * as U from '../../packages/ui/src/templates.js';
const {html,Button,Icon,IconButton,Input,Switch,Badge,Avatar,Progress}=U;
const act=text=>({'data-feedback':text});

export const demos={
  Icon:()=>html`<div class="icon-grid">${['spark','layers','palette','grid','globe','shield','heart','folder','mail','calendar','clock','settings'].map(name=>html`<span title="${name}">${Icon({name,size:24,label:name})}</span>`)}</div>`,

  Button:()=>html`<div class="demo-wrap">${Button({label:'Create project',icon:'plus',attrs:{'data-s-dialog-open':'create-project'}})}${Button({label:'Secondary',variant:'secondary',attrs:act('Secondary action selected.')})}${Button({label:'Outline',variant:'outline',attrs:act('Outline action selected.')})}${Button({label:'Ghost',variant:'ghost',attrs:act('Ghost action selected.')})}${Button({label:'Delete',variant:'danger',attrs:act('This is a visual demo. Nothing was deleted.')})}</div>`,

  IconButton:()=>html`<div class="demo-wrap">${IconButton({icon:'plus',label:'Create project',variant:'primary',attrs:{'data-s-dialog-open':'create-project'}})}${IconButton({icon:'heart',label:'Save to favorites',attrs:{'data-favorite':true,'aria-pressed':'false'}})}${IconButton({icon:'copy',label:'Copy page link',variant:'ghost',attrs:{'data-copy-page':true}})}${IconButton({icon:'trash',label:'Delete item',variant:'danger',attrs:act('Visual demo action.')})}</div>`,

  ButtonGroup:()=>U.ButtonGroup({label:'Editor actions',children:['Preview','Code','Share'].map((label,i)=>Button({label,icon:['grid','code','link'][i],variant:'outline',size:'sm',attrs:(i===2?{'data-copy-page':true}:act(`${label} selected.`))}))}),

  Input:id=>html`<div class="s-stack">${Input({id:id+'-email',label:'Email address',type:'email',icon:'mail',attrs:{placeholder:'hello@yourstudio.com'},helper:'A good place to stay connected.'})}${Input({id:id+'-error',label:'Workspace URL',error:'Use at least 3 characters.',attrs:{value:'ab'}})}</div>`,

  Textarea:id=>U.Textarea({id,label:'Project brief',helper:'A sentence or two is a great place to start.',attrs:{placeholder:'What are you creating?',maxlength:500}}),

  Select:id=>U.Select({id,label:'Workspace',options:['Sarah’s studio','Personal','Design team'],helper:'Choose where your project belongs.'}),

  Checkbox:id=>html`<div class="s-stack">${U.Checkbox({id:id+'-a',label:'Product updates',description:'A little inspiration, once in a while.',checked:true})}${U.Checkbox({id:id+'-b',label:'Community announcements',description:'News and insights from our team.'})}${U.Checkbox({id:id+'-c',label:'Workspace policy',checked:true,disabled:true,description:'Enforced by organization security.'})}</div>`,

  Radio:id=>html`<fieldset class="demo-fieldset"><legend>Billing cycle</legend>${U.Radio({id:id+'-a',label:'Monthly billing',description:'Flexible, month to month payment.',checked:true,attrs:{name:id,value:'monthly'}})}${U.Radio({id:id+'-b',label:'Yearly billing',description:'One simple payment for the full year (Save 20%).',attrs:{name:id,value:'yearly'}})}</fieldset>`,

  Switch:id=>html`<div class="s-stack">${Switch({id:id+'-a',label:'Email notifications',description:'Know when something needs your attention.',checked:true})}${Switch({id:id+'-b',label:'Weekly digest',description:'A concise recap sent every Monday morning.'})}</div>`,

  Slider:id=>U.Slider({id,label:'Interface density',value:64}),

  Badge:()=>html`<div class="demo-wrap">${['brand','info','success','warning','danger','neutral'].map((tone,i)=>Badge({tone,label:['New release','In progress','Operational','In review','Needs attention','Draft'][i]}))}</div>`,

  Chip:()=>html`<div class="demo-wrap" aria-label="Selected tags" tabindex="-1">${['Design system','Product','Engineering','Accessibility'].map((label,i)=>U.Chip({label,removable:true,selected:i===0}))}${U.Chip({label:'Read-only badge',removable:false})}</div>`,

  Avatar:()=>html`<div class="demo-wrap">${Avatar({name:'Sarah Khan',size:'lg',status:true})}${Avatar({name:'Alex Morgan',tone:'info',status:true})}${Avatar({name:'Jamie Kim',tone:'success'})}${Avatar({name:'Maya Rahman',tone:'warning',size:'sm'})}</div>`,

  Card:()=>U.Card({title:'A place for your ideas',description:'Bring your team and your next big thing together.',children:html`${Progress({value:72,label:'Workspace setup'})}<div class="s-row card-people">${Avatar({name:'Sarah Khan',size:'sm'})}${Avatar({name:'Alex Morgan',size:'sm',tone:'info'})}<span class="s-small s-muted">Made for working together</span></div>`,footer:Button({label:'Explore workspace',variant:'outline',trailing:'arrow',size:'sm',attrs:{'data-go':'#patterns'}})}),

  Alert:()=>html`<div class="s-stack">${U.Alert({title:'All systems operational',description:'Your workspace is synced and ready.'})}${U.Alert({title:'A little heads-up',description:'This is a sample notice for your workspace.',tone:'warning'})}</div>`,

  Tabs:id=>U.Tabs({id,label:'Workspace preview',items:[{label:'Overview',content:html`<div class="tab-example">${Icon({name:'layers',size:24})}<div><strong>Everything, in its place.</strong><p>Your workspace brings clarity to the everyday.</p></div></div>`},{label:'Activity',content:html`<div class="tab-example">${Icon({name:'clock',size:24})}<div><strong>You’re all caught up.</strong><p>Updates appear here as your team works.</p></div></div>`},{label:'Settings',content:Switch({id:id+'-settings',label:'Workspace notifications',checked:true})}]}),

  Breadcrumb:()=>U.Breadcrumb({items:[{label:'Workspace',href:'#patterns'},{label:'Projects',href:'#patterns'},{label:'Design system'}]}),

  Pagination:()=>html`<div class="s-stack">${U.Pagination({pages:5,current:2,label:'Component pagination demo'})}<p data-page-feedback class="s-small s-muted" aria-live="polite">Page 2 of 5</p></div>`,

  NavItem:()=>html`<nav aria-label="Example navigation" class="demo-nav">${U.NavItem({active:true})}${U.NavItem({label:'Foundations',href:'#foundations',icon:'palette'})}${U.NavItem({label:'Components',href:'#components',icon:'layers',badge:'32'})}</nav>`,

  DataTable:id=>U.DataTable({id,caption:'Example projects',columns:[{key:'name',label:'Project',sortable:true},{key:'status',label:'Status'},{key:'progress',label:'Progress (%)',sortable:true}],rows:[{name:'Studio website',status:Badge({label:'In review',tone:'warning'}),progress:92},{name:'Brand refresh',status:Badge({label:'Active'}),progress:72},{name:'Mobile experience',status:Badge({label:'Planning',tone:'info'}),progress:48}],selectable:true}),

  Accordion:()=>U.Accordion({items:[{title:'Can I make this my own?',content:'Adjust the source tokens, rebuild, and every component follows your direction.',open:true},{title:'Does it support dark mode?',content:'Every semantic color has an explicit light and dark alias.'},{title:'Do I need a framework?',content:'No. The core uses native HTML, CSS variables, and ES modules.'}]}),

  Dialog:()=>html`<div class="s-stack">${Button({label:'Create a project',icon:'plus',attrs:{'data-s-dialog-open':'create-project'}})}<p class="s-small s-muted">Your sample project appears in the Patterns workspace.</p></div>`,

  Tooltip:id=>html`<div class="s-row"><span class="s-small">A little help, close at hand</span>${U.Tooltip({id,label:'About tokens',text:'One change. A consistent system.'})}</div>`,

  Progress:()=>html`<div class="s-stack">${Progress({value:72,label:'Design system progress'})}${Progress({value:100,label:'Foundations complete'})}</div>`,

  Skeleton:()=>U.Skeleton({lines:4,label:'Loading project details'}),

  EmptyState:()=>U.EmptyState({title:'Your next idea starts here',description:'A blank canvas. A world of possibilities.',action:Button({label:'Create project',size:'sm',icon:'plus',attrs:{'data-s-dialog-open':'create-project'}})}),

  Separator:()=>html`<div class="s-stack"><p class="s-small s-muted">A little breathing room between ideas.</p>${U.Separator()}${U.Separator({label:'Or continue with'})}</div>`,

  Spinner:()=>html`<div class="s-row" style="gap:12px;align-items:center;">${U.Spinner({label:'Syncing workspace'})}<span class="s-small s-muted">Syncing your workspace…</span></div>`,

  Toast:()=>html`<div class="demo-wrap">${Button({label:'Show success',icon:'check',variant:'outline',attrs:act('Your changes are ready.')})}${Button({label:'Show notice',variant:'ghost',attrs:{'data-feedback':'This preview runs locally in your browser.','data-tone':'info'}})}</div>`,

  Menu:id=>U.Menu({id,label:'Project actions',items:[{label:'View workspace',icon:'folder',value:'view'},{label:'Copy page link',icon:'link',value:'copy'},{label:'Export unavailable',icon:'download',value:'export',disabled:true},{label:'Archive preview',icon:'trash',value:'archive',danger:true}]}),

  CommandPalette:()=>html`<div class="s-row" style="gap:12px;align-items:center;">${Button({label:'Search the library',icon:'search',variant:'outline',attrs:{'data-s-dialog-open':'library-search'}})}<span class="demo-shortcut"><kbd>⌘</kbd> <kbd>K</kbd></span></div>`,

  Toggle:()=>html`<div class="demo-wrap">${U.Toggle({label:'Bookmark',icon:'heart',pressed:true})}${U.Toggle({label:'Mute notifications',icon:'settings'})}</div>`,

  ToggleGroup:()=>U.ToggleGroup({label:'Alignment controls',items:[{label:'Left',icon:'arrow',pressed:true},{label:'Center',icon:'grid'},{label:'Right',icon:'arrow'}]}),

  Kbd:()=>html`<div class="demo-wrap" style="align-items:center;">${U.Kbd({keys:['⌘','K']})}${U.Kbd({keys:['Ctrl','Shift','P']})}${U.Kbd({keys:['Esc']})}</div>`,

  AspectRatio:()=>html`<div style="max-width:320px;width:100%;">${U.AspectRatio({ratio:'16/9',children:html`<div class="s-aspect-content" style="background:var(--s-bg-brand);color:var(--s-text-brand);display:grid;place-items:center;border-radius:8px;font-size:13px;font-weight:600;">16:9 Video Canvas</div>`})}</div>`,

  BentoGrid:()=>html`<div class="s-bento-grid" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;width:100%;max-width:860px;">
    <!-- Card 1: Save your files (col-span-1) -->
    <div class="s-bento-card" style="grid-column:span 1;padding:20px;border-radius:14px;border:1px solid var(--s-border-default);background:color-mix(in srgb,var(--s-bg-surface) 80%,transparent);-webkit-backdrop-filter:blur(16px) saturate(180%);backdrop-filter:blur(16px) saturate(180%);display:flex;flex-direction:column;justify-content:space-between;min-height:280px;position:relative;overflow:hidden;box-shadow:none;">
      <div style="position:relative;height:120px;overflow:hidden;mask-image:linear-gradient(to top, transparent 10%, #000 100%);-webkit-mask-image:linear-gradient(to top, transparent 10%, #000 100%);">
        <div style="display:flex;gap:10px;animation:s-marquee 12s linear infinite;">
          <div style="padding:8px 12px;border-radius:8px;background:var(--s-bg-subtle);border:1px solid var(--s-border-default);font-size:11px;min-width:110px;">
            <strong style="display:block;font-size:11px;">bitcoin.pdf</strong>
            <span class="s-small s-muted" style="font-size:10px;line-height:1.2;display:block;">Satoshi Nakamoto</span>
          </div>
          <div style="padding:8px 12px;border-radius:8px;background:var(--s-bg-subtle);border:1px solid var(--s-border-default);font-size:11px;min-width:110px;">
            <strong style="display:block;font-size:11px;">finances.xlsx</strong>
            <span class="s-small s-muted" style="font-size:10px;line-height:1.2;display:block;">Q3 balance sheet</span>
          </div>
          <div style="padding:8px 12px;border-radius:8px;background:var(--s-bg-subtle);border:1px solid var(--s-border-default);font-size:11px;min-width:110px;">
            <strong style="display:block;font-size:11px;">logo.svg</strong>
            <span class="s-small s-muted" style="font-size:10px;line-height:1.2;display:block;">Vector mark</span>
          </div>
        </div>
      </div>
      <div style="margin-top:auto;position:relative;z-index:2;">
        <div style="width:32px;height:32px;border-radius:8px;background:color-mix(in srgb, var(--s-brand-indigo) 12%, transparent);color:var(--s-brand-indigo);display:grid;place-items:center;margin-bottom:10px;">${Icon({name:'folder',size:18})}</div>
        <h4 style="font-size:15px;margin:0 0 4px;font-weight:600;">Save your files</h4>
        <p class="s-small s-muted" style="margin:0 0 12px;line-height:1.4;">We automatically save your files as you type.</p>
        <a href="#components" class="s-button s-button--ghost s-button--sm" style="padding-inline:0;"><span>Learn more</span> ${Icon({name:'arrow',size:12})}</a>
      </div>
    </div>

    <!-- Card 2: Notifications (col-span-2) -->
    <div class="s-bento-card" style="grid-column:span 2;padding:20px;border-radius:14px;border:1px solid var(--s-border-default);background:color-mix(in srgb,var(--s-bg-surface) 80%,transparent);-webkit-backdrop-filter:blur(16px) saturate(180%);backdrop-filter:blur(16px) saturate(180%);display:flex;flex-direction:column;justify-content:space-between;min-height:280px;position:relative;overflow:hidden;box-shadow:none;">
      <div style="position:relative;height:120px;overflow:hidden;mask-image:linear-gradient(to top, transparent 10%, #000 100%);-webkit-mask-image:linear-gradient(to top, transparent 10%, #000 100%);display:flex;flex-direction:column;gap:8px;">
        <div class="s-anim-list-item" style="padding:8px 12px;border-radius:10px;background:var(--s-bg-subtle);border:1px solid var(--s-border-default);display:flex;align-items:center;gap:10px;">
          <div style="width:28px;height:28px;border-radius:8px;background:color-mix(in srgb, #FFB800 15%, transparent);color:#FFB800;display:grid;place-items:center;font-size:13px;">👤</div>
          <div style="flex:1;"><span style="font-size:12px;font-weight:600;">User signed up</span> <span class="s-small s-muted">· 10m ago</span><div class="s-small s-muted" style="font-size:11px;">sarahUI</div></div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:10px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">
          <span style="font-size:16px;">💸</span>
          <div style="flex:1;"><span style="font-size:12px;font-weight:600;">Payment received</span> <span class="s-small s-muted">· 15m ago</span><div class="s-small s-muted" style="font-size:11px;">sarahUI</div></div>
        </div>
      </div>
      <div style="margin-top:auto;position:relative;z-index:2;">
        <div style="width:32px;height:32px;border-radius:8px;background:color-mix(in srgb, var(--s-status-success-text) 12%, transparent);color:var(--s-status-success-text);display:grid;place-items:center;margin-bottom:10px;">${Icon({name:'bell',size:18})}</div>
        <h4 style="font-size:15px;margin:0 0 4px;font-weight:600;">Notifications</h4>
        <p class="s-small s-muted" style="margin:0 0 12px;line-height:1.4;">Get notified when something happens.</p>
        <a href="#components" class="s-button s-button--ghost s-button--sm" style="padding-inline:0;"><span>Learn more</span> ${Icon({name:'arrow',size:12})}</a>
      </div>
    </div>

    <!-- Card 3: Integrations (col-span-2) -->
    <div class="s-bento-card" style="grid-column:span 2;padding:20px;border-radius:14px;border:1px solid var(--s-border-default);background:color-mix(in srgb,var(--s-bg-surface) 80%,transparent);-webkit-backdrop-filter:blur(16px) saturate(180%);backdrop-filter:blur(16px) saturate(180%);display:flex;flex-direction:column;justify-content:space-between;min-height:280px;position:relative;overflow:hidden;box-shadow:none;">
      <div style="position:relative;height:120px;display:flex;align-items:center;justify-content:space-around;mask-image:linear-gradient(to top, transparent 10%, #000 100%);-webkit-mask-image:linear-gradient(to top, transparent 10%, #000 100%);">
        <div class="beam-circle-node" style="width:36px;height:36px;font-size:16px;">👤</div>
        <div class="beam-circle-node beam-circle-center" style="width:44px;height:44px;box-shadow:none;border:1.5px solid var(--s-border-brand);">${Icon({name:'spark',size:22})}</div>
        <div style="display:flex;flex-direction:column;gap:6px;">
          <div class="beam-circle-node" style="width:30px;height:30px;font-size:13px;">📁</div>
          <div class="beam-circle-node" style="width:30px;height:30px;font-size:13px;">💬</div>
        </div>
      </div>
      <div style="margin-top:auto;position:relative;z-index:2;">
        <div style="width:32px;height:32px;border-radius:8px;background:color-mix(in srgb, var(--s-brand-blue) 12%, transparent);color:var(--s-brand-blue);display:grid;place-items:center;margin-bottom:10px;">${Icon({name:'layers',size:18})}</div>
        <h4 style="font-size:15px;margin:0 0 4px;font-weight:600;">Integrations</h4>
        <p class="s-small s-muted" style="margin:0 0 12px;line-height:1.4;">Supports 100+ integrations and counting.</p>
        <a href="#components" class="s-button s-button--ghost s-button--sm" style="padding-inline:0;"><span>Learn more</span> ${Icon({name:'arrow',size:12})}</a>
      </div>
    </div>

    <!-- Card 4: Calendar (col-span-1) -->
    <div class="s-bento-card" style="grid-column:span 1;padding:20px;border-radius:14px;border:1px solid var(--s-border-default);background:color-mix(in srgb,var(--s-bg-surface) 80%,transparent);-webkit-backdrop-filter:blur(16px) saturate(180%);backdrop-filter:blur(16px) saturate(180%);display:flex;flex-direction:column;justify-content:space-between;min-height:280px;position:relative;overflow:hidden;box-shadow:none;">
      <div style="position:relative;height:120px;display:flex;align-items:center;justify-content:center;mask-image:linear-gradient(to top, transparent 10%, #000 100%);-webkit-mask-image:linear-gradient(to top, transparent 10%, #000 100%);">
        <div style="padding:10px 14px;border-radius:10px;background:var(--s-bg-subtle);border:1px solid var(--s-border-default);font-size:11px;text-align:center;">
          <strong style="display:block;font-size:11px;margin-bottom:4px;">September 2026</strong>
          <div style="display:grid;grid-template-columns:repeat(7,16px);gap:3px;font-size:9px;color:var(--s-text-muted);">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            <span style="opacity:0.3;">30</span><span style="opacity:0.3;">31</span><span style="font-weight:700;color:var(--s-text-brand);background:color-mix(in srgb,var(--s-brand-indigo) 20%, transparent);border-radius:50%;">1</span><span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </div>
      </div>
      <div style="margin-top:auto;position:relative;z-index:2;">
        <div style="width:32px;height:32px;border-radius:8px;background:color-mix(in srgb, var(--s-status-warning-text) 12%, transparent);color:var(--s-status-warning-text);display:grid;place-items:center;margin-bottom:10px;">${Icon({name:'calendar',size:18})}</div>
        <h4 style="font-size:15px;margin:0 0 4px;font-weight:600;">Calendar</h4>
        <p class="s-small s-muted" style="margin:0 0 12px;line-height:1.4;">Use the calendar to filter your files by date.</p>
        <a href="#components" class="s-button s-button--ghost s-button--sm" style="padding-inline:0;"><span>Learn more</span> ${Icon({name:'arrow',size:12})}</a>
      </div>
    </div>
  </div>`,

  Drawer:()=>html`<div class="s-stack">${Button({label:'Open side drawer',icon:'arrow',attrs:{'data-s-drawer-open':'demo-drawer'}})}${U.Drawer({id:'demo-drawer',title:'Workspace Drawer',description:'Slide-over panel for rich configuration.',children:html`<div class="s-stack"><p class="s-small s-muted">Custom drawer content with native focus containment.</p>${Button({label:'Close drawer',variant:'outline',attrs:{'data-s-dialog-close':true}})}</div>`})}</div>`,

  Popover:()=>U.Popover({id:'demo-popover',trigger:Button({label:'Open popover',variant:'outline',trailing:'down'}),content:html`<div class="s-stack"><strong style="font-size:13px;">Quick Settings</strong><p class="s-small s-muted" style="margin:4px 0 10px;">Adjust contextual workspace preferences.</p>${Button({label:'Confirm preferences',size:'sm'})}</div>`}),

  Marquee:()=>html`
    <div style="position:relative;display:flex;width:100%;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;padding:24px 0;">
      ${U.Marquee({pauseOnHover:true,children:html`
        <div style="display:flex;gap:16px;padding-right:16px;">
          ${[
            {name:'Jack',username:'@jack',body:"I've never seen anything like this before. It's amazing. I love it.",avatar:'https://avatar.vercel.sh/jack'},
            {name:'Jill',username:'@jill',body:"I don't know what to say. I'm speechless. This is amazing.",avatar:'https://avatar.vercel.sh/jill'},
            {name:'John',username:'@john',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/john'}
          ].map(r=>html`
            <figure class="s-marquee-review-card" style="position:relative;height:100%;width:260px;cursor:pointer;overflow:hidden;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.04);">
              <div style="display:flex;flex-direction:row;align-items:center;gap:10px;">
                <img src="${r.avatar}" width="32" height="32" style="border-radius:50%;" alt="${r.name}"/>
                <div style="display:flex;flex-direction:column;">
                  <figcaption style="font-size:13px;font-weight:600;color:var(--s-text-primary);margin:0;">${r.name}</figcaption>
                  <p style="font-size:11px;color:var(--s-text-muted);margin:0;">${r.username}</p>
                </div>
              </div>
              <blockquote style="margin:10px 0 0;font-size:12.5px;line-height:1.5;color:var(--s-text-secondary);">${r.body}</blockquote>
            </figure>
          `)}
        </div>
      `})}
      ${U.Marquee({reverse:true,pauseOnHover:true,children:html`
        <div style="display:flex;gap:16px;padding-right:16px;margin-top:16px;">
          ${[
            {name:'Jane',username:'@jane',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/jane'},
            {name:'Jenny',username:'@jenny',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/jenny'},
            {name:'James',username:'@james',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/james'}
          ].map(r=>html`
            <figure class="s-marquee-review-card" style="position:relative;height:100%;width:260px;cursor:pointer;overflow:hidden;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.04);">
              <div style="display:flex;flex-direction:row;align-items:center;gap:10px;">
                <img src="${r.avatar}" width="32" height="32" style="border-radius:50%;" alt="${r.name}"/>
                <div style="display:flex;flex-direction:column;">
                  <figcaption style="font-size:13px;font-weight:600;color:var(--s-text-primary);margin:0;">${r.name}</figcaption>
                  <p style="font-size:11px;color:var(--s-text-muted);margin:0;">${r.username}</p>
                </div>
              </div>
              <blockquote style="margin:10px 0 0;font-size:12.5px;line-height:1.5;color:var(--s-text-secondary);">${r.body}</blockquote>
            </figure>
          `)}
        </div>
      `})}
      <div style="pointer-events:none;position:absolute;inset-block:0;left:0;width:25%;background:linear-gradient(to right, var(--s-bg-surface), transparent);"></div>
      <div style="pointer-events:none;position:absolute;inset-block:0;right:0;width:25%;background:linear-gradient(to left, var(--s-bg-surface), transparent);"></div>
    </div>
  `,

  BorderBeam:()=>html`
    <div class="demo-login-card">
      <div style="margin-bottom:20px;">
        <h3>Login</h3>
        <p>Enter your credentials to access your account.</p>
      </div>
      <form onsubmit="return false;">
        <div class="demo-login-field">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div class="demo-login-field">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <div class="demo-login-actions">
          <button type="button" class="demo-login-btn-outline">Register</button>
          <button type="button" class="demo-login-btn-primary">Login</button>
        </div>
      </form>
      ${U.BorderBeam({size:100,duration:8})}
    </div>
  `,

  AnimatedShinyText:()=>html`<div style="padding:20px;text-align:center;border-radius:10px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">${U.AnimatedShinyText({text:'✨ Introducing sarahUI Next-Gen Interface Components'})}</div>`,

  NumberTicker:()=>html`<div class="demo-wrap" style="align-items:center;gap:32px;"><div style="text-align:center;"><div style="font-size:32px;font-weight:700;color:var(--s-text-brand);">${U.NumberTicker({value:277})}</div><span class="s-small s-muted">Design Tokens</span></div><div style="text-align:center;"><div style="font-size:32px;font-weight:700;color:var(--s-text-brand);">${U.NumberTicker({value:45})}</div><span class="s-small s-muted">Components</span></div><div style="text-align:center;"><div style="font-size:32px;font-weight:700;color:var(--s-text-brand);">${U.NumberTicker({value:100})} %</div><span class="s-small s-muted">Test Pass Rate</span></div></div>`,

  Ripple:()=>html`<div style="position:relative;height:240px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">${U.Ripple({numCircles:5})}<span style="position:relative;z-index:2;font-weight:600;font-size:13px;color:var(--s-text-primary);">${Icon({name:'spark',size:28})}</span></div>`,

  RetroGrid:()=>html`
    <div style="position:relative;height:450px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;flex-direction:column;align-items:center;justify-content:center;">
      <span style="pointer-events:none;z-index:10;background:linear-gradient(to bottom, #ffd319, #ff2975, #8c1eff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(3rem, 7vw, 5rem);line-height:1;font-weight:800;letter-spacing:-0.05em;white-space:pre-wrap;">
        Retro Grid
      </span>
      ${U.RetroGrid({angle:65})}
    </div>
  `,

  ShineBorder:()=>html`
    <div class="demo-login-card">
      ${U.ShineBorder({shineColor:['#A07CFE','#FE8FB5','#FFBE7B']})}
      <div style="margin-bottom:20px;">
        <h3>Login</h3>
        <p>Enter your credentials to access your account</p>
      </div>
      <form onsubmit="return false;">
        <div class="demo-login-field">
          <label>Email</label>
          <input type="email" placeholder="name@example.com" />
        </div>
        <div class="demo-login-field">
          <label>Password</label>
          <input type="password" />
        </div>
        <div style="margin-top:20px;">
          <button type="button" class="demo-login-btn-primary-full">Sign In</button>
        </div>
      </form>
    </div>
  `,

  Meteors:()=>html`
    <div style="position:relative;display:flex;height:400px;width:100%;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">
      <span style="pointer-events:none;white-space:pre-wrap;background:linear-gradient(to bottom, var(--s-text-primary), color-mix(in srgb, var(--s-text-muted) 30%, transparent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(4rem, 10vw, 7rem);font-weight:800;line-height:1;letter-spacing:-0.05em;user-select:none;">
        Meteors
      </span>
      ${U.Meteors({number:24})}
    </div>
  `,

  Particles:()=>html`
    <div style="position:relative;display:flex;height:400px;width:100%;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">
      <span style="pointer-events:none;white-space:pre-wrap;background:linear-gradient(to bottom, var(--s-text-primary), color-mix(in srgb, var(--s-text-muted) 30%, transparent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(4rem, 10vw, 7rem);font-weight:800;line-height:1;letter-spacing:-0.05em;user-select:none;">
        Particles
      </span>
      ${U.Particles({quantity:60,staticity:30})}
    </div>
  `,

  Confetti:()=>html`
    <div class="confetti-demo-stage" style="position:relative;display:flex;height:400px;width:100%;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">
      <span style="pointer-events:none;white-space:pre-wrap;background:linear-gradient(to bottom, var(--s-text-primary), color-mix(in srgb, var(--s-text-muted) 30%, transparent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(4rem, 10vw, 7rem);font-weight:800;line-height:1;letter-spacing:-0.05em;user-select:none;">
        Confetti
      </span>
      <div style="position:absolute;bottom:24px;z-index:2;">
        ${U.Confetti({label:'Trigger Confetti',icon:'spark'})}
      </div>
    </div>
  `,

  MagicCard:()=>html`
    <div class="demo-login-card s-magic-card-host">
      ${U.MagicCard({gradientColor:'rgba(91,61,245,0.15)',children:html`
        <div style="margin-bottom:20px;">
          <h3>Login</h3>
          <p>Enter your credentials to access your account</p>
        </div>
        <form onsubmit="return false;">
          <div class="demo-login-field">
            <label>Email</label>
            <input type="email" placeholder="name@example.com" />
          </div>
          <div class="demo-login-field">
            <label>Password</label>
            <input type="password" />
          </div>
          <div style="margin-top:20px;">
            <button type="button" class="demo-login-btn-primary-full">Sign In</button>
          </div>
        </form>
      `})}
    </div>
  `,

  TypingAnimation:()=>html`
    <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:260px;">
      <h2 style="font-size:clamp(2rem, 5vw, 3rem);font-weight:700;letter-spacing:-0.03em;text-align:center;color:var(--s-text-primary);margin:0;">
        ${U.TypingAnimation({text:'Hello World! 👋'})}
      </h2>
    </div>
  `,

  WordRotate:()=>html`
    <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:260px;">
      <h2 style="font-size:clamp(2.5rem, 6vw, 4rem);font-weight:800;letter-spacing:-0.04em;text-align:center;color:var(--s-text-primary);margin:0;">
        ${U.WordRotate({words:['Word','Rotate']})}
      </h2>
    </div>
  `,

  BlurFade:()=>html`
    <div style="width:100%;max-width:560px;margin:0 auto;padding:16px 0;">
      <div style="columns:3;column-gap:12px;">
        ${[
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=220&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=360&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=380&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=240&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&auto=format&fit=crop&q=80'
        ].map((img,i)=>html`
          <div style="margin-bottom:12px;break-inside:avoid;">
            ${U.BlurFade({delay:0.12*i,children:html`<img src="${img}" alt="Stock photo ${i+1}" style="width:100%;display:block;border-radius:10px;object-fit:cover;box-shadow:0 1px 3px rgba(0,0,0,0.06);">`})}
          </div>
        `)}
      </div>
    </div>
  `,

  ShimmerButton:()=>html`<div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:220px;">${U.ShimmerButton({label:'Shimmer Button'})}</div>`,

  RainbowButton:()=>html`<div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:220px;">${U.RainbowButton({label:'Get Unlimited Access'})}</div>`,

  Dock:()=>html`
    <div class="dock-demo-stage" style="position:relative;width:100%;height:380px;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);overflow:hidden;">
      <span style="pointer-events:none;background:linear-gradient(to bottom, var(--s-text-primary), color-mix(in srgb, var(--s-text-muted) 30%, transparent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(4rem, 10vw, 7rem);line-height:1;font-weight:800;letter-spacing:-0.05em;margin-bottom:24px;user-select:none;">
        Dock
      </span>
      <div style="position:relative;z-index:2;">
        ${U.Dock({items:[
          {icon:'grid',label:'Home'},
          {icon:'spark',label:'Blog'},
          {icon:'code',label:'GitHub'},
          {icon:'globe',label:'LinkedIn'},
          {icon:'heart',label:'X'},
          {icon:'mail',label:'Send Email'}
        ]})}
      </div>
    </div>
  `,

  AvatarCircles:()=>html`
    <div class="demo-wrap" style="align-items:center;justify-content:center;padding:32px 16px;">
      ${U.AvatarCircles({
        numPeople:99,
        avatars:[
          'https://avatars.githubusercontent.com/u/16860528',
          'https://avatars.githubusercontent.com/u/20110627',
          'https://avatars.githubusercontent.com/u/106103625',
          'https://avatars.githubusercontent.com/u/59228569',
          'https://avatars.githubusercontent.com/u/59442788'
        ]
      })}
    </div>
  `,

  AnimatedBeam:(id='beam-demo')=>html`<div class="animated-beam-demo-container" style="position:relative;display:flex;height:440px;width:100%;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:24px;">
    <div style="display:flex;width:100%;max-width:520px;flex-direction:row;align-items:stretch;justify-content:space-between;gap:36px;position:relative;z-index:2;">
      <div style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;">
        <div class="beam-circle-node" title="Google Drive">${Icon({name:'folder',size:20})}</div>
        <div class="beam-circle-node" title="Google Docs">${Icon({name:'type',size:20})}</div>
        <div class="beam-circle-node" title="WhatsApp">${Icon({name:'mail',size:20})}</div>
        <div class="beam-circle-node" title="Messenger">${Icon({name:'spark',size:20})}</div>
        <div class="beam-circle-node" title="Notion">${Icon({name:'layers',size:20})}</div>
      </div>
      <div style="display:flex;flex-direction:column;justify-content:center;">
        <div class="beam-circle-node beam-circle-center" title="OpenAI Hub">${Icon({name:'spark',size:32})}</div>
      </div>
      <div style="display:flex;flex-direction:column;justify-content:center;">
        <div class="beam-circle-node" title="User">${Icon({name:'user',size:24})}</div>
      </div>
    </div>
    <svg class="beam-svg-overlay" viewBox="0 0 520 360" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;" aria-hidden="true">
      <defs>
        <linearGradient id="${id}-grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0"></stop>
          <stop offset="50%" stop-color="#6366f1"></stop>
          <stop offset="100%" stop-color="#a855f7" stop-opacity="0"></stop>
        </linearGradient>
        <linearGradient id="${id}-grad-right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#a855f7" stop-opacity="0"></stop>
          <stop offset="50%" stop-color="#ec4899"></stop>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"></stop>
        </linearGradient>
      </defs>
      <path d="M 68 52 C 160 52, 200 180, 260 180" class="s-beam-path-bg" stroke="currentColor" opacity="0.12" stroke-width="2" fill="none"/>
      <path d="M 68 116 C 160 116, 200 180, 260 180" class="s-beam-path-bg" stroke="currentColor" opacity="0.12" stroke-width="2" fill="none"/>
      <path d="M 68 180 C 160 180, 200 180, 260 180" class="s-beam-path-bg" stroke="currentColor" opacity="0.12" stroke-width="2" fill="none"/>
      <path d="M 68 244 C 160 244, 200 180, 260 180" class="s-beam-path-bg" stroke="currentColor" opacity="0.12" stroke-width="2" fill="none"/>
      <path d="M 68 308 C 160 308, 200 180, 260 180" class="s-beam-path-bg" stroke="currentColor" opacity="0.12" stroke-width="2" fill="none"/>
      <path d="M 260 180 C 320 180, 380 180, 452 180" class="s-beam-path-bg" stroke="currentColor" opacity="0.12" stroke-width="2" fill="none"/>

      <path d="M 68 52 C 160 52, 200 180, 260 180" class="s-beam-path" stroke="url(#${id}-grad-left)" stroke-width="2.5" fill="none" style="animation-delay: 0s;"/>
      <path d="M 68 116 C 160 116, 200 180, 260 180" class="s-beam-path" stroke="url(#${id}-grad-left)" stroke-width="2.5" fill="none" style="animation-delay: -0.6s;"/>
      <path d="M 68 180 C 160 180, 200 180, 260 180" class="s-beam-path" stroke="url(#${id}-grad-left)" stroke-width="2.5" fill="none" style="animation-delay: -1.2s;"/>
      <path d="M 68 244 C 160 244, 200 180, 260 180" class="s-beam-path" stroke="url(#${id}-grad-left)" stroke-width="2.5" fill="none" style="animation-delay: -1.8s;"/>
      <path d="M 68 308 C 160 308, 200 180, 260 180" class="s-beam-path" stroke="url(#${id}-grad-left)" stroke-width="2.5" fill="none" style="animation-delay: -2.4s;"/>
      <path d="M 260 180 C 320 180, 380 180, 452 180" class="s-beam-path" stroke="url(#${id}-grad-right)" stroke-width="2.5" fill="none" style="animation-delay: -1s;"/>
    </svg>
  </div>`,

  Terminal:()=>html`
    <div style="display:flex;justify-content:center;width:100%;">
      ${U.Terminal({
        command:'npx sarahui@latest init',
        output:'✔ Preflight checks.\n✔ Verifying framework. Found Modern Web / HTML5.\n✔ Validating CSS variables.\n✔ Installing 120+ components and 277 design tokens.\n✔ Zero runtime dependencies initialized.\nSuccess! Project initialization completed.\nYou may now use sarahUI.'
      })}
    </div>
  `,

  OrbitingCircles:()=>html`
    <div style="position:relative;height:320px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">
      <div style="width:48px;height:48px;border-radius:50%;background:var(--s-action-primary);display:grid;place-items:center;color:#fff;z-index:2;">
        ${Icon({name:'spark',size:24})}
      </div>
      ${U.OrbitingCircles({radius:65,duration:14,children:html`<div style="width:34px;height:34px;border-radius:50%;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:grid;place-items:center;box-shadow:0 1px 4px rgba(0,0,0,0.08);">${Icon({name:'layers',size:18})}</div>`})}
      ${U.OrbitingCircles({radius:115,duration:22,reverse:true,children:html`<div style="width:34px;height:34px;border-radius:50%;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:grid;place-items:center;box-shadow:0 1px 4px rgba(0,0,0,0.08);">${Icon({name:'globe',size:18})}</div>`})}
    </div>
  `,

  Globe:()=>html`
    <div class="globe-demo-stage" style="position:relative;display:flex;height:480px;width:100%;max-width:600px;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);margin:0 auto;">
      <span style="pointer-events:none;white-space:pre-wrap;background:linear-gradient(to bottom, var(--s-text-primary), color-mix(in srgb, var(--s-text-muted) 30%, transparent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(4rem, 10vw, 7rem);font-weight:800;line-height:1;letter-spacing:-0.05em;user-select:none;margin-top:20px;">
        Globe
      </span>
      <div style="position:relative;margin-top:-60px;">
        ${U.Globe({size:360})}
      </div>
    </div>
  `,

  AnimatedList:()=>html`
    <div style="position:relative;min-height:420px;width:100%;overflow:hidden;padding:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;">
      <div style="width:100%;max-width:400px;display:flex;flex-direction:column;gap:12px;">
        ${[
          {name:'Payment received',time:'15m ago',desc:'sarahUI',icon:'💸',color:'#00C9A7'},
          {name:'User signed up',time:'10m ago',desc:'sarahUI',icon:'👤',color:'#FFB800'},
          {name:'New message',time:'5m ago',desc:'sarahUI',icon:'💬',color:'#FF3D71'},
          {name:'New event',time:'2m ago',desc:'sarahUI',icon:'🗞️',color:'#1E86FF'}
        ].map(item=>html`
          <figure class="s-anim-list-item" style="position:relative;margin:0 auto;width:100%;cursor:pointer;overflow:hidden;border-radius:16px;padding:14px 16px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);box-shadow:0 0 0 1px rgba(0,0,0,0.03),0 2px 4px rgba(0,0,0,0.05),0 12px 24px rgba(0,0,0,0.05);transition:all 0.2s ease-in-out;">
            <div style="display:flex;flex-direction:row;align-items:center;gap:12px;">
              <div style="display:flex;width:40px;height:40px;align-items:center;justify-content:center;border-radius:14px;background-color:${item.color};font-size:18px;">
                ${item.icon}
              </div>
              <div style="display:flex;flex-direction:column;overflow:hidden;">
                <figcaption style="display:flex;flex-direction:row;align-items:center;font-size:14px;font-weight:600;color:var(--s-text-primary);">
                  <span>${item.name}</span>
                  <span style="margin:0 4px;color:var(--s-text-muted);">·</span>
                  <span style="font-size:12px;font-weight:400;color:var(--s-text-muted);">${item.time}</span>
                </figcaption>
                <p style="font-size:13px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">${item.desc}</p>
              </div>
            </div>
          </figure>
        `)}
      </div>
    </div>
  `,

  InteractiveHoverButton:()=>html`
    <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:220px;">
      ${U.InteractiveHoverButton({label:'Hover Me'})}
    </div>
  `,

  PulsatingButton:()=>html`
    <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:220px;">
      ${U.PulsatingButton({label:'Join Affiliate Program'})}
    </div>
  `,

  SparklesText:()=>html`
    <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:260px;">
      <h1 style="font-size:clamp(3rem, 7vw, 5rem);font-weight:800;letter-spacing:-0.04em;text-align:center;color:var(--s-text-primary);margin:0;">
        ${U.SparklesText({text:'sarahUI',sparklesCount:6})}
      </h1>
    </div>
  `,

  TextReveal:()=>html`
    <div style="display:flex;align-items:center;justify-content:center;padding:48px 24px;min-height:280px;text-align:center;">
      <h2 style="font-size:clamp(2rem, 5vw, 3.5rem);font-weight:800;letter-spacing:-0.03em;line-height:1.2;color:var(--s-text-primary);margin:0;max-width:700px;">
        ${U.TextReveal({text:'sarahUI will change the way you design.'})}
      </h2>
    </div>
  `,

  GridPattern:()=>html`
    <div style="position:relative;height:380px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;align-items:center;justify-content:center;">
      ${U.GridPattern({width:40,height:40,squares:[[4,4],[5,1],[8,2],[5,3],[5,5],[10,10],[12,15],[15,10],[10,15],[15,10],[10,15],[15,10]]})}
    </div>
  `,

  DotPattern:()=>html`
    <div style="position:relative;height:380px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;align-items:center;justify-content:center;">
      ${U.DotPattern({width:20,height:20,cr:1.2})}
    </div>
  `,

  AnimatedGridPattern:()=>html`
    <div style="position:relative;height:380px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;align-items:center;justify-content:center;">
      ${U.AnimatedGridPattern({numSquares:30,duration:3})}
    </div>
  `,

  FlickeringGrid:()=>html`
    <div style="position:relative;height:380px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;align-items:center;justify-content:center;">
      ${U.FlickeringGrid({squareSize:4,gridGap:6,color:'#6B7280',maxOpacity:0.5,flickerChance:0.1})}
    </div>
  `,

  WarpBackground:()=>html`
    <div style="position:relative;height:380px;width:100%;display:flex;align-items:center;justify-content:center;border-radius:12px;border:1px solid var(--s-border-default);overflow:hidden;background:var(--s-bg-surface);">
      ${U.WarpBackground({children:html`
        <div class="s-card" style="width:320px;padding:24px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);border-radius:14px;box-shadow:0 4px 12px rgba(0,0,0,0.06);text-align:left;position:relative;z-index:2;">
          <h4 style="margin:0 0 8px;font-size:16px;font-weight:600;color:var(--s-text-primary);">Congratulations on Your Promotion!</h4>
          <p class="s-small s-muted" style="margin:0;line-height:1.5;">Your hard work and dedication have paid off. We're thrilled to see you take this next step in your career. Keep up the fantastic work!</p>
        </div>
      `})}
    </div>
  `,

  NeonGradientCard:()=>html`
    <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:300px;">
      <div style="max-width:380px;width:100%;">
        ${U.NeonGradientCard({children:html`
          <div style="padding:28px 20px;text-align:center;">
            <span style="display:block;font-size:clamp(2rem, 5vw, 3rem);font-weight:800;line-height:1.1;letter-spacing:-0.03em;background:linear-gradient(135deg, #ff2975 35%, #00FFF1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
              Neon Gradient Card
            </span>
          </div>
        `})}
      </div>
    </div>
  `,

  CoolMode:()=>html`<div class="demo-wrap" style="align-items:center;justify-content:center;padding:32px 16px;">${U.CoolMode({children:Button({label:'Click for Particle Burst',icon:'spark'})})}</div>`,

  ScrollProgress:()=>html`<div style="position:relative;width:100%;padding:20px;border-radius:10px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);"><div style="height:4px;background:var(--s-bg-subtle);border-radius:2px;overflow:hidden;"><div style="width:65%;height:100%;background:var(--s-action-primary);"></div></div><p class="s-small s-muted" style="margin-top:8px;">Scroll-reactive progress indicator.</p></div>`,

  ProgressiveBlur:()=>html`
    <div style="position:relative;height:340px;width:100%;max-width:440px;margin:0 auto;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;padding:16px;display:flex;flex-direction:column;gap:12px;">
      <div style="overflow-y:auto;display:flex;flex-direction:column;gap:12px;height:100%;padding-bottom:60px;">
        ${[0,1,2,3,4,5].map(n=>html`
          <div style="padding:16px;border-radius:10px;border:1px solid var(--s-border-default);background:var(--s-bg-subtle);text-align:center;font-weight:600;font-size:15px;color:var(--s-text-primary);">
            ${n}
          </div>
        `)}
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;height:90px;pointer-events:none;background:linear-gradient(to bottom, transparent, var(--s-bg-surface));"></div>
    </div>
  `,

  HyperText:()=>html`
    <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:260px;">
      <h1 style="font-size:clamp(2.5rem, 6vw, 4rem);font-weight:800;letter-spacing:0.04em;text-align:center;color:var(--s-text-primary);margin:0;">
        ${U.HyperText({text:'HOVER ME !'})}
      </h1>
    </div>
  `,

  MorphingText:()=>html`<div style="text-align:center;padding:20px;display:flex;justify-content:center;">${U.MorphingText({texts:['INNOVATION','ELEGANCE','PERFORMANCE','DELIGHT']})}</div>`,

  AnimatedGradientText:()=>html`
    <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:220px;">
      <div class="s-anim-gradient-pill" style="display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:9999px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);box-shadow:0 1px 3px rgba(0,0,0,0.05);cursor:pointer;">
        <span>🎉</span>
        <span style="height:14px;width:1px;background:var(--s-border-default);"></span>
        ${U.AnimatedGradientText({text:'Introducing sarahUI'})}
        ${Icon({name:'arrow',size:13})}
      </div>
    </div>
  `,

  AnimatedShinyText:()=>html`
    <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:220px;">
      <div class="s-anim-shiny-pill" style="display:inline-flex;align-items:center;gap:6px;padding:6px 18px;border-radius:9999px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);box-shadow:0 1px 3px rgba(0,0,0,0.04);cursor:pointer;">
        <span>✨</span>
        ${U.AnimatedShinyText({text:'Introducing sarahUI'})}
        ${Icon({name:'arrow',size:13})}
      </div>
    </div>
  `,

  LineShadowText:()=>html`
    <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:260px;">
      <h1 style="font-size:clamp(3rem, 7vw, 5.5rem);font-weight:800;letter-spacing:-0.04em;text-align:center;color:var(--s-text-primary);margin:0;">
        Ship <span style="font-style:italic;">${U.LineShadowText({text:'Fast'})}</span>
      </h1>
    </div>
  `,

  AuroraText:()=>html`
    <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:260px;">
      <h1 style="font-size:clamp(2.5rem, 6vw, 4.5rem);font-weight:800;letter-spacing:-0.04em;line-height:1.1;text-align:center;color:var(--s-text-primary);margin:0;">
        Ship ${U.AuroraText({text:'beautiful'})}
      </h1>
    </div>
  `,

  Sheet:id=>html`<div class="demo-wrap">${Button({label:'Open Navigation Sheet',icon:'menu',attrs:{'data-s-dialog-open':id||'demo-sheet'}})}${U.Sheet({id:id||'demo-sheet',title:'Quick Navigation',description:'Slide-over panel for workspace navigation.',children:html`<div class="s-stack"><a href="#overview" class="s-button s-button--ghost s-button--md">Overview</a><a href="#components" class="s-button s-button--ghost s-button--md">Components</a><a href="#foundations" class="s-button s-button--ghost s-button--md">Foundations</a></div>`})}</div>`,

  ContextMenu:id=>html`<div style="width:100%;">${U.ContextMenu({id:id||'demo-ctx-menu',trigger:html`<div style="padding:32px;text-align:center;border:1px dashed var(--s-border-default);border-radius:10px;background:var(--s-bg-surface);"><p style="margin:0;font-weight:500;">Right-click anywhere in this box</p><span class="s-small s-muted">Displays native contextual actions.</span></div>`,items:[{label:'Copy link',icon:'link',value:'copy'},{label:'Save favorite',icon:'heart',value:'fav'},{label:'Delete item',icon:'trash',value:'del',danger:true}]})}</div>`,

  HoverCard:()=>html`<div class="demo-wrap">${U.HoverCard({trigger:Button({label:'@sarahui',variant:'outline',size:'sm'}),content:html`<div style="display:flex;gap:12px;align-items:flex-start;">${Avatar({name:'Sarah Khan',size:'md',status:true})}<div><strong style="font-size:13px;">sarahUI</strong><p class="s-small s-muted" style="margin:2px 0 6px;">Thoughtful design system by MASARA X.</p><span class="s-small">120 components · 0 deps</span></div></div>`})}</div>`,

  Collapsible:()=>html`<div class="s-stack">${U.Collapsible({title:'Can I use sarahUI with React, Vue, or Next.js?',content:'Yes! sarahUI uses standard Web APIs and plain HTML templates, making it 100% compatible with any frontend framework.',open:true})}${U.Collapsible({title:'Are there any external dependencies?',content:'Zero runtime dependencies. Pure CSS variables and native browser APIs.'})}</div>`,

  Android:()=>html`<div style="display:flex;justify-content:center;width:100%;">${U.Android({children:html`<div style="background:var(--s-bg-surface);padding:24px;text-align:center;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;">${Icon({name:'spark',size:32})}<h4 style="margin:8px 0 4px;">Android App</h4><p class="s-small s-muted">Pixel-perfect device mock.</p></div>`})}</div>`,

  Iphone:()=>html`<div style="display:flex;justify-content:center;width:100%;">${U.Iphone({children:html`<div style="background:var(--s-bg-surface);padding:24px;text-align:center;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;">${Icon({name:'spark',size:32})}<h4 style="margin:8px 0 4px;">iOS Experience</h4><p class="s-small s-muted">Native hardware bezel & notch.</p></div>`})}</div>`,

  Safari:()=>html`<div style="width:100%;max-width:540px;margin:0 auto;">${U.Safari({url:'sarahui.masarax.com',children:html`<div style="background:var(--s-bg-surface);padding:40px 20px;text-align:center;"><h3 style="margin:0 0 8px;">Safari Browser Mock</h3><p class="s-small s-muted">Realistic macOS window frame with native traffic lights.</p></div>`})}</div>`,

  GlareHover:()=>html`
    <div style="display:flex;align-items:center;justify-content:center;padding:40px 16px;min-height:360px;">
      <div style="width:100%;max-width:340px;">
        ${U.GlareHover({children:html`
          <div style="padding:24px;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);box-shadow:0 4px 16px rgba(0,0,0,0.06);text-align:left;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
              <h3 style="font-size:18px;font-weight:700;margin:0;">Pro</h3>
              ${Badge({label:'Popular',tone:'brand'})}
            </div>
            <p class="s-small s-muted" style="margin:0 0 16px;">For teams that need more.</p>
            <div style="display:flex;align-items:baseline;gap:4px;margin-bottom:20px;">
              <span style="font-size:36px;font-weight:800;letter-spacing:-0.03em;color:var(--s-text-primary);">$49</span>
              <span class="s-small s-muted">/mo</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;font-size:13px;">
              <div style="display:flex;align-items:center;gap:8px;">${Icon({name:'check',size:15})} <span>Unlimited projects</span></div>
              <div style="display:flex;align-items:center;gap:8px;">${Icon({name:'check',size:15})} <span>Team collaboration</span></div>
              <div style="display:flex;align-items:center;gap:8px;">${Icon({name:'check',size:15})} <span>Advanced analytics</span></div>
              <div style="display:flex;align-items:center;gap:8px;color:var(--s-text-muted);"><span style="width:15px;text-align:center;">•</span> <span>SSO (coming soon)</span></div>
            </div>
            <button type="button" class="demo-login-btn-primary-full">Get started</button>
          </div>
        `})}
      </div>
    </div>
  `,

  Backlight:()=>html`<div style="padding:20px 0;display:flex;justify-content:center;width:100%;">${U.Backlight({color:'rgba(91,61,245,0.4)',children:html`<div style="padding:24px 32px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);border-radius:12px;text-align:center;"><strong>Ambient Backlight Glow</strong><p class="s-small s-muted" style="margin:4px 0 0;">Soft diffuse radiant backdrop aura.</p></div>`})}</div>`,

  Floating3DParticles:()=>html`<div style="position:relative;height:200px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">${U.Floating3DParticles({count:45})}<span style="position:relative;z-index:2;font-weight:600;font-size:13px;">3D Perspective Floating Particles</span></div>`,

  LightRays:()=>html`<div style="position:relative;height:200px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">${U.LightRays({count:7,intensity:0.6})}<span style="position:relative;z-index:2;font-weight:600;font-size:13px;">God Rays Volumetric Lighting</span></div>`,

  AnimatedThemeToggler:()=>html`<div class="demo-wrap" style="align-items:center;gap:16px;">${U.AnimatedThemeToggler()}<span class="s-small s-muted">Click to toggle dark/light mode with circular ripple transition</span></div>`,

  ComicText:()=>html`<div style="padding:24px;text-align:center;">${U.ComicText({text:'POW! BOOM! SARAHUI'})}</div>`,

  KineticText:()=>html`<div style="padding:20px;text-align:center;overflow:hidden;">${U.KineticText({text:'KINETIC MOTION VELOCITY SYSTEM'})}</div>`,

  DiaTextReveal:()=>html`<div style="padding:24px;text-align:center;">${U.DiaTextReveal({text:'DIAGONAL MASK SWEEP REVEAL'})}</div>`,

  SpinningText:()=>html`<div style="display:flex;justify-content:center;padding:24px;">${U.SpinningText({text:'SARAHUI • MASARA X • DESIGN SYSTEM • '})}</div>`,

  Text3DFlip:()=>html`
    <div style="display:flex;justify-content:center;align-items:center;padding:48px 16px;min-height:240px;">
      <h2 style="font-size:clamp(2rem, 5vw, 3.5rem);font-weight:800;letter-spacing:-0.03em;text-align:center;color:var(--s-text-primary);margin:0;">
        ${U.Text3DFlip({frontText:'Stay hungry, stay foolish',backText:'Stay foolish, stay hungry'})}
      </h2>
    </div>
  `,

  TextAnimate:()=>html`<div style="font-size:22px;font-weight:700;text-align:center;padding:24px;">${U.TextAnimate({text:'Fluid Staggered Letter Animations'})}</div>`,

  VideoText:()=>html`
    <div style="display:flex;justify-content:center;align-items:center;padding:48px 16px;min-height:240px;">
      <h1 style="font-size:clamp(4rem, 12vw, 8rem);font-weight:900;letter-spacing:0.04em;text-align:center;margin:0;background:linear-gradient(135deg,#0284c7,#0d9488,#1e293b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
        OCEAN
      </h1>
    </div>
  `,

  Highlighter:()=>html`
    <div style="font-size:clamp(1.25rem, 3vw, 1.75rem);font-weight:600;line-height:1.6;padding:32px 16px;max-width:640px;margin:0 auto;text-align:center;color:var(--s-text-primary);">
      The <span style="text-decoration:underline;text-decoration-color:#FF9800;text-decoration-thickness:3px;text-underline-offset:4px;">sarahUI Highlighter</span> makes important <span style="background:rgba(56,189,248,0.3);padding:2px 6px;border-radius:4px;">text stand out</span> effortlessly.
    </div>
  `,

  ScrollBasedVelocity:()=>html`<div style="width:100%;overflow:hidden;padding:16px 0;">${U.ScrollBasedVelocity({text:'SARAHUI ACCESSIBLE DESIGN SYSTEM'})}</div>`,

  AnimatedSubscribeButton:()=>html`<div class="demo-wrap">${U.AnimatedSubscribeButton({initialText:'Subscribe',subscribedText:'Subscribed'})}</div>`,

  ShinyButton:()=>html`
    <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:220px;">
      ${U.ShinyButton({label:'Shiny Button'})}
    </div>
  `,

  RippleButton:()=>html`
    <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:220px;">
      ${U.RippleButton({label:'Click me'})}
    </div>
  `,

  CodeComparison:()=>html`
    <div style="width:100%;max-width:760px;margin:0 auto;">
      ${U.CodeComparison({
        filename:'middleware.ts',
        beforeCode:`import { NextRequest } from 'next/server';

export const middleware = async (req: NextRequest) => {
  let user = undefined;
  let team = undefined;
  const token = req.headers.get('token'); 

  if(req.nextUrl.pathname.startsWith('/auth')) {
    user = await getUserByToken(token);

    if(!user) {
      return NextResponse.redirect('/login');
    }
  }

  if(req.nextUrl.pathname.startsWith('/team')) {
    user = await getUserByToken(token);

    if(!user) {
      return NextResponse.redirect('/login');
    }

    const slug = req.nextUrl.query.slug;
    team = await getTeamBySlug(slug);

    if(!team) {
      return NextResponse.redirect('/');
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)'],
};`,
        afterCode:`import { createMiddleware } from '@app/(auth)/auth/_middleware';
import { auth } from '@/app/(auth)/auth/_middleware';
import { team } from '@/app/(team)/team/_middleware';

const middlewares = {
  '/auth{/:path?}': auth,
  '/team{/:slug?}': [ auth, team ],
};

export const middleware = createMiddleware(middlewares);

export const config = {
  matcher: ['/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)'],
};`
      })}
    </div>
  `,

  FileTree:()=>html`
    <div style="max-width:340px;width:100%;margin:0 auto;padding:12px;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);box-shadow:0 1px 3px rgba(0,0,0,0.04);">
      ${U.FileTree({
        elements:[
          {
            id:'src',name:'src',type:'folder',
            children:[
              {
                id:'app',name:'app',type:'folder',
                children:[
                  {id:'layout',name:'layout.tsx',type:'file'},
                  {id:'page',name:'page.tsx',type:'file'}
                ]
              },
              {
                id:'components',name:'components',type:'folder',
                children:[
                  {
                    id:'ui',name:'ui',type:'folder',
                    children:[{id:'button',name:'button.tsx',type:'file'}]
                  },
                  {id:'footer',name:'footer.tsx',type:'file'},
                  {id:'header',name:'header.tsx',type:'file'}
                ]
              },
              {
                id:'lib',name:'lib',type:'folder',
                children:[{id:'utils',name:'utils.ts',type:'file'}]
              }
            ]
          }
        ],
        initialExpanded:['src','app','components','ui','lib']
      })}
    </div>
  `,

  HeroVideoDialog:()=>html`<div style="width:100%;max-width:480px;margin:0 auto;">${U.HeroVideoDialog({videoSrc:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',thumbnailAlt:'sarahUI Showcase Walkthrough'})}</div>`,

  IconCloud:()=>html`<div style="display:flex;justify-content:center;width:100%;">${U.IconCloud({icons:['spark','layers','palette','grid','globe','shield','heart','folder','mail','calendar','clock','settings'],size:280})}</div>`,

  Lens:()=>html`
    <div style="display:flex;justify-content:center;width:100%;padding:24px 0;">
      <div style="max-width:380px;width:100%;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
        ${U.Lens({
          zoomFactor:1.6,
          lensSize:140,
          children:html`<img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80" alt="Mountain camp" style="width:100%;height:220px;object-fit:cover;display:block;">`
        })}
        <div style="padding:20px;">
          <h4 style="font-size:16px;font-weight:700;margin:0 0 6px;color:var(--s-text-primary);">Your next camp</h4>
          <p class="s-small s-muted" style="margin:0 0 16px;line-height:1.4;">See our latest and best camp destinations all across the five continents of the globe.</p>
          <div style="display:flex;gap:10px;">
            <button type="button" class="demo-login-btn-primary" style="padding:8px 16px;font-size:13px;">Let's go</button>
            <button type="button" class="demo-login-btn-outline" style="padding:8px 16px;font-size:13px;">Another time</button>
          </div>
        </div>
      </div>
    </div>
  `,

  PixelImage:()=>html`<div style="display:flex;justify-content:center;width:100%;">${U.PixelImage({width:280,height:180,pixelSize:8})}</div>`,

  GlyphMatrix:()=>html`<div style="position:relative;height:180px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">${U.GlyphMatrix()}<span style="position:relative;z-index:2;font-weight:700;font-size:14px;letter-spacing:2px;color:var(--s-text-primary);">SARAHUI CYPHER</span></div>`,

  DottedMap:()=>html`<div style="width:100%;max-width:540px;margin:0 auto;">${U.DottedMap({points:[{x:25,y:35,label:'San Francisco'},{x:48,y:30,label:'London'},{x:78,y:42,label:'Tokyo'},{x:72,y:58,label:'Dhaka'}]})}</div>`,

  Pointer:()=>html`
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;width:100%;max-width:580px;margin:0 auto;">
      <div style="position:relative;height:140px;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 1px 3px rgba(0,0,0,0.04);cursor:pointer;">
        <strong style="font-size:14px;">Animated Pointer</strong>
        <span class="s-small s-muted" style="margin-top:2px;">Animated pointer</span>
        <span style="font-size:16px;margin-top:8px;">❤️</span>
      </div>
      <div style="position:relative;height:140px;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 1px 3px rgba(0,0,0,0.04);cursor:pointer;">
        <strong style="font-size:14px;">Colored Pointer</strong>
        <span class="s-small s-muted" style="margin-top:2px;">A custom pointer with different color</span>
      </div>
      <div style="position:relative;height:140px;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 1px 3px rgba(0,0,0,0.04);cursor:pointer;">
        <strong style="font-size:14px;">Custom Shape</strong>
        <span class="s-small s-muted" style="margin-top:2px;">A pointer with a custom SVG shape</span>
      </div>
      <div style="position:relative;height:140px;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 1px 3px rgba(0,0,0,0.04);cursor:pointer;">
        <strong style="font-size:14px;">Emoji Pointer</strong>
        <span class="s-small s-muted" style="margin-top:2px;">Using an emoji as a custom pointer</span>
      </div>
    </div>
  `,

  SmoothCursor:()=>html`<div class="demo-wrap">${U.SmoothCursor({color:'#5B3DF5'})}<p class="s-small s-muted">Move mouse cursor across this area to see spring-smoothed trailing cursor physics.</p></div>`,

  TweetCard:()=>html`
    <div style="max-width:480px;width:100%;margin:0 auto;">
      ${U.TweetCard({
        authorName:'Dillion',
        handle:'dillionverma',
        avatar:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        verified:true,
        text:'Companies spend $30,000+ and several weeks to build beautiful landing pages like @linear, @wopehq and @reflectnotes ✨ I built @reactjs + @tailwindcss components for you to do the same in hours, starting at just $29 Pre-order link + demo below 👇 #buildinpublic @buildspace',
        timestamp:'10:30 AM · Sep 19, 2026',
        likes:'1.4K',
        retweets:'320',
        mediaUrl:'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
      })}
    </div>
  `,

  AnimatedCircularProgressBar:()=>html`<div class="demo-wrap" style="align-items:center;gap:32px;">${U.AnimatedCircularProgressBar({value:75,gaugePrimaryColor:'#5B3DF5'})}${U.AnimatedCircularProgressBar({value:100,gaugePrimaryColor:'#10B981'})}</div>`,

  HexagonPattern:()=>html`<div style="position:relative;height:180px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">${U.HexagonPattern({size:36})}<span style="position:relative;z-index:2;font-weight:600;font-size:13px;">Honeycomb Hexagon Pattern</span></div>`,

  StripedPattern:()=>html`<div style="position:relative;height:180px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">${U.StripedPattern({angle:45,width:24,height:24})}<span style="position:relative;z-index:2;font-weight:600;font-size:13px;">Diagonal Striped Pattern</span></div>`,

  InteractiveGridPattern:()=>html`<div style="position:relative;height:180px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">${U.InteractiveGridPattern({width:32,height:32})}<span style="position:relative;z-index:2;font-weight:600;font-size:13px;">Interactive Hover Grid Cells</span></div>`,

  NoiseTexture:()=>html`<div style="position:relative;height:180px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:linear-gradient(135deg,#5B3DF5,#178BFF);display:grid;place-items:center;color:#fff;">${U.NoiseTexture({opacity:0.2})}<span style="position:relative;z-index:2;font-weight:700;font-size:14px;">Subtle Noise Texture Filter</span></div>`
};

export const componentVariants = {
  // 1. Marquee - Parity with Magic UI (Vertical, 3D)
  Marquee: [
    {
      title: 'Vertical',
      description: 'Display an infinite vertical ticker with smooth continuous translation.',
      preview: () => html`
        <div style="position:relative;display:flex;height:340px;width:100%;flex-direction:row;align-items:center;justify-content:center;gap:16px;overflow:hidden;padding:16px 0;">
          ${U.Marquee({vertical:true,pauseOnHover:true,children:html`
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${[
                {name:'Jack',username:'@jack',body:"I've never seen anything like this before. It's amazing. I love it."},
                {name:'Jill',username:'@jill',body:"I don't know what to say. I'm speechless. This is amazing."},
                {name:'John',username:'@john',body:"I'm at a loss for words. This is amazing. I love it."}
              ].map(r=>html`
                <figure class="s-marquee-review-card" style="width:220px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:12px;box-shadow:none;">
                  <strong style="font-size:12px;display:block;">${r.name}</strong>
                  <small class="s-small s-muted" style="font-size:10.5px;">${r.username}</small>
                  <p style="margin:6px 0 0;font-size:11.5px;line-height:1.4;">${r.body}</p>
                </figure>
              `)}
            </div>
          `})}
          ${U.Marquee({vertical:true,reverse:true,pauseOnHover:true,children:html`
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${[
                {name:'Jane',username:'@jane',body:"Clean, fluid vertical motion. Fits sidebars and widgets perfectly."},
                {name:'Jenny',username:'@jenny',body:"Seamless looping with zero lag or frame drops."},
                {name:'James',username:'@james',body:"Pure CSS animation with native pause on hover."}
              ].map(r=>html`
                <figure class="s-marquee-review-card" style="width:220px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:12px;box-shadow:none;">
                  <strong style="font-size:12px;display:block;">${r.name}</strong>
                  <small class="s-small s-muted" style="font-size:10.5px;">${r.username}</small>
                  <p style="margin:6px 0 0;font-size:11.5px;line-height:1.4;">${r.body}</p>
                </figure>
              `)}
            </div>
          `})}
        </div>
      `,
      code: `import { Marquee } from "@/components/sarahui/marquee";

export function MarqueeDemoVertical() {
  return (
    <div className="relative flex h-[340px] w-full flex-row items-center justify-center gap-4 overflow-hidden">
      <Marquee pauseOnHover vertical className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  );
}`
    },
    {
      title: '3D',
      description: 'Rotate and pitch vertical tickers with 3D perspective depth transforms.',
      preview: () => html`
        <div style="position:relative;display:flex;height:340px;width:100%;flex-direction:row;align-items:center;justify-content:center;gap:16px;overflow:hidden;perspective:320px;">
          <div style="display:flex;gap:16px;transform:translateX(-40px) translateY(0px) translateZ(-60px) rotateX(20deg) rotateY(-10deg) rotateZ(16deg);">
            ${U.Marquee({vertical:true,pauseOnHover:true,children:html`
              <div style="display:flex;flex-direction:column;gap:12px;">
                ${[
                  {name:'Jack',username:'@jack',body:"Stunning 3D perspective layout."},
                  {name:'Jill',username:'@jill',body:"Looks gorgeous in light and dark mode."}
                ].map(r=>html`
                  <figure class="s-marquee-review-card" style="width:200px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:12px;box-shadow:none;">
                    <strong style="font-size:12px;display:block;">${r.name}</strong>
                    <small class="s-small s-muted" style="font-size:10.5px;">${r.username}</small>
                    <p style="margin:6px 0 0;font-size:11.5px;line-height:1.4;">${r.body}</p>
                  </figure>
                `)}
              </div>
            `})}
            ${U.Marquee({vertical:true,reverse:true,pauseOnHover:true,children:html`
              <div style="display:flex;flex-direction:column;gap:12px;">
                ${[
                  {name:'Jane',username:'@jane',body:"Zero external dependencies or overhead."},
                  {name:'Jenny',username:'@jenny',body:"Hardware accelerated CSS transforms."}
                ].map(r=>html`
                  <figure class="s-marquee-review-card" style="width:200px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:12px;box-shadow:none;">
                    <strong style="font-size:12px;display:block;">${r.name}</strong>
                    <small class="s-small s-muted" style="font-size:10.5px;">${r.username}</small>
                    <p style="margin:6px 0 0;font-size:11.5px;line-height:1.4;">${r.body}</p>
                  </figure>
                `)}
              </div>
            `})}
          </div>
        </div>
      `,
      code: `import { Marquee } from "@/components/sarahui/marquee";

export function Marquee3D() {
  return (
    <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform: "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}`
    }
  ],

  // 2. Terminal - Parity with Magic UI (Custom Delays)
  Terminal: [
    {
      title: 'Interactive Command Execution',
      description: 'macOS styled terminal window with step-by-step typing animation.',
      preview: () => demos.Terminal(),
      code: `import { Terminal } from "@/components/sarahui/terminal";

export function TerminalDemo() {
  return (
    <Terminal command="npm install sarahui" output="Added 120 components." />
  );
}`
    },
    {
      title: 'Custom Delays',
      description: 'Simulated multi-step build pipeline with custom step latency.',
      preview: () => U.Terminal({
        command: 'sarahui add button marquee',
        output: '✔ Resolving packages... (120ms)\n✔ Generating TypeScript tokens... (340ms)\n✔ Installed @/components/sarahui/button.tsx\n✔ Installed @/components/sarahui/marquee.tsx'
      }),
      code: `import { Terminal } from "@/components/sarahui/terminal";

export function TerminalCustomDelays() {
  return (
    <Terminal
      command="sarahui add button marquee"
      output="✔ Resolving packages... (120ms)\n✔ Installed @/components/sarahui/button.tsx"
      delay={500}
    />
  );
}`
    }
  ],

  // 3. HeroVideoDialog - Parity with Magic UI (Top-in-bottom-out)
  HeroVideoDialog: [
    {
      title: 'Center Fade Modal',
      description: 'Hero thumbnail preview with glowing play button opening focus-trapped video lightbox.',
      preview: () => demos.HeroVideoDialog(),
      code: `import { HeroVideoDialog } from "@/components/sarahui/hero-video-dialog";

export function HeroVideoDialogDemo() {
  return (
    <HeroVideoDialog
      videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
      thumbnailSrc="/hero-thumbnail.png"
      thumbnailAlt="Platform Overview"
    />
  );
}`
    },
    {
      title: 'Top-in-bottom-out',
      description: 'Video lightbox slides down smoothly from the top and dismisses down through the bottom.',
      preview: () => demos.HeroVideoDialog(),
      code: `import { HeroVideoDialog } from "@/components/sarahui/hero-video-dialog";

export function HeroVideoDialogTopIn() {
  return (
    <HeroVideoDialog
      animationStyle="top-in-bottom-out"
      videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
      thumbnailSrc="/hero-thumbnail.png"
      thumbnailAlt="Platform Overview"
    />
  );
}`
    }
  ],

  // 4. BentoGrid - Parity with Magic UI (Vertical)
  BentoGrid: [
    {
      title: 'Bento Box Layout',
      description: 'Structured multi-column grid tiles presenting product capabilities.',
      preview: () => demos.BentoGrid(),
      code: `import { BentoCard, BentoGrid } from "@/components/sarahui/bento-grid";

export function BentoGridDemo() {
  return (
    <BentoGrid className="grid-cols-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}`
    },
    {
      title: 'Vertical',
      description: 'Single-column vertical bento cards stacked for compact mobile layouts.',
      preview: () => html`
        <div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:440px;">
          <div style="padding:16px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);box-shadow:none;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
              <div style="width:28px;height:28px;border-radius:6px;background:var(--s-bg-brand);color:var(--s-text-brand);display:grid;place-items:center;">${Icon({name:'folder',size:16})}</div>
              <strong style="font-size:13px;">Automatic Backups</strong>
            </div>
            <p class="s-small s-muted" style="margin:0;">Files snapshot continuously as you write code.</p>
          </div>
          <div style="padding:16px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);box-shadow:none;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
              <div style="width:28px;height:28px;border-radius:6px;background:var(--s-bg-brand);color:var(--s-text-brand);display:grid;place-items:center;">${Icon({name:'spark',size:16})}</div>
              <strong style="font-size:13px;">Instant Deployment</strong>
            </div>
            <p class="s-small s-muted" style="margin:0;">Edge builds distribute globally in under 2 seconds.</p>
          </div>
        </div>
      `,
      code: `import { BentoCard, BentoGrid } from "@/components/sarahui/bento-grid";

export function BentoDemoVertical() {
  return (
    <BentoGrid className="grid-cols-1 max-w-md mx-auto">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}`
    }
  ],

  // 5. AnimatedList
  AnimatedList: [
    {
      title: 'Notification Item Stack',
      description: 'Staggered animated notification stack cascading new items into view.',
      preview: () => demos.AnimatedList(),
      code: `import { AnimatedList } from "@/components/sarahui/animated-list";

export function AnimatedListDemo() {
  return (
    <AnimatedList delay={1500}>
      {notifications.map((item, idx) => (
        <NotificationCard key={idx} {...item} />
      ))}
    </AnimatedList>
  );
}`
    },
    {
      title: 'Compact Audit Feed',
      description: 'Streamlined real-time activity log feed for system administrative dashboards.',
      preview: () => html`
        <div style="width:100%;max-width:380px;display:flex;flex-direction:column;gap:8px;">
          ${['SSL Certificate renewed', 'API key generated: prod-sec-01', 'Database backup completed'].map((msg, i) => html`
            <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:8px;background:var(--s-bg-subtle);border:1px solid var(--s-border-default);font-size:12px;">
              <span style="width:6px;height:6px;border-radius:50%;background:var(--s-color-emerald-500);"></span>
              <span>${msg}</span>
            </div>
          `)}
        </div>
      `,
      code: `import { AnimatedList } from "@/components/sarahui/animated-list";

export function AnimatedListAuditFeed() {
  return (
    <AnimatedList className="space-y-2">
      {auditLogs.map((log) => (
        <AuditRow key={log.id} log={log} />
      ))}
    </AnimatedList>
  );
}`
    }
  ],

  // 6. Dock - Parity with Magic UI (Custom Direction, Custom Magnification)
  Dock: [
    {
      title: 'Centered Bottom Dock',
      description: 'Mac-style floating dock with fluid icon magnification on cursor hover.',
      preview: () => demos.Dock(),
      code: `import { Dock, DockIcon } from "@/components/sarahui/dock";

export function DockDemo() {
  return (
    <Dock direction="middle">
      <DockIcon><FileIcon /></DockIcon>
      <DockIcon><MailIcon /></DockIcon>
      <DockIcon><SettingsIcon /></DockIcon>
    </Dock>
  );
}`
    },
    {
      title: 'Custom Direction',
      description: 'Vertical orientation docked to the left or right edge of the screen.',
      preview: () => html`
        <div style="display:flex;flex-direction:column;align-items:center;padding:12px;border-radius:16px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);gap:8px;width:fit-content;box-shadow:none;">
          ${['folder', 'mail', 'calendar', 'settings'].map(icon => html`
            <button type="button" class="dock-item" style="width:40px;height:40px;border-radius:10px;border:1px solid var(--s-border-default);background:var(--s-bg-subtle);display:grid;place-items:center;cursor:pointer;">
              ${Icon({name:icon,size:18})}
            </button>
          `)}
        </div>
      `,
      code: `import { Dock, DockIcon } from "@/components/sarahui/dock";

export function DockVertical() {
  return (
    <Dock direction="left" className="flex-col">
      <DockIcon><FileIcon /></DockIcon>
      <DockIcon><MailIcon /></DockIcon>
      <DockIcon><SettingsIcon /></DockIcon>
    </Dock>
  );
}`
    },
    {
      title: 'Custom Magnification',
      description: 'Fine-tuned magnification scale factor and responsive proximity distance.',
      preview: () => demos.Dock(),
      code: `import { Dock, DockIcon } from "@/components/sarahui/dock";

export function DockMagnified() {
  return (
    <Dock magnification={80} distance={140}>
      <DockIcon><SparkIcon /></DockIcon>
      <DockIcon><LayersIcon /></DockIcon>
    </Dock>
  );
}`
    }
  ],

  // 7. Globe
  Globe: [
    {
      title: '3D Vector Spinning Globe',
      description: 'Interactive canvas-rendered 3D wireframe globe with atmospheric glow.',
      preview: () => demos.Globe(),
      code: `import { Globe } from "@/components/sarahui/globe";

export function GlobeDemo() {
  return (
    <div className="relative flex h-[360px] w-full items-center justify-center overflow-hidden">
      <Globe size={280} />
    </div>
  );
}`
    },
    {
      title: 'Minimal Latitude Ring Globe',
      description: 'Lightweight concentric orbital ring globe for minimal aesthetic backdrops.',
      preview: () => html`
        <div style="position:relative;height:240px;width:100%;display:grid;place-items:center;overflow:hidden;">
          <div style="width:160px;height:160px;border-radius:50%;border:1.5px dashed var(--s-border-brand);display:grid;place-items:center;animation:s-spin 20s linear infinite;">
            <div style="width:110px;height:110px;border-radius:50%;border:1.5px solid var(--s-border-default);display:grid;place-items:center;">
              <span style="font-size:11px;font-weight:700;color:var(--s-text-brand);letter-spacing:1px;">EARTH</span>
            </div>
          </div>
        </div>
      `,
      code: `import { Globe } from "@/components/sarahui/globe";

export function GlobeMinimal() {
  return (
    <Globe size={180} minimal ringsOnly />
  );
}`
    }
  ],

  // 8. TweetCard - Parity with Magic UI (Image Carousel, Meta URL Preview)
  TweetCard: [
    {
      title: 'Social Post Status Card',
      description: 'High-fidelity social feed preview card complete with metrics and verified badge.',
      preview: () => demos.TweetCard(),
      code: `import { TweetCard } from "@/components/sarahui/tweet-card";

export function TweetCardDemo() {
  return (
    <TweetCard
      name="Sarah Khan"
      handle="sarahkhan"
      avatar="/sarah.jpg"
      content="Building with sarahUI is pure joy. 120 components, zero runtime bloat!"
      verified
      likes={1420}
      retweets={280}
    />
  );
}`
    },
    {
      title: 'Tweet Card With Image Carousel',
      description: 'Social post card featuring embedded image media and carousel indicators.',
      preview: () => html`
        <article class="s-tweet-card" style="width:100%;max-width:440px;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:16px;box-shadow:none;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <div style="width:36px;height:36px;border-radius:50%;background:var(--s-brand-indigo);color:#fff;display:grid;place-items:center;font-weight:700;font-size:12px;">SK</div>
            <div>
              <strong style="font-size:13px;display:block;">Sarah Khan <span style="color:var(--s-brand-indigo);">✔</span></strong>
              <span class="s-small s-muted" style="font-size:11px;">@sarahkhan</span>
            </div>
          </div>
          <p style="font-size:13px;line-height:1.5;margin:0 0 12px;">Shipped our updated component preview dashboard today! 🚀</p>
          <div style="height:140px;border-radius:10px;background:var(--s-bg-subtle);border:1px solid var(--s-border-default);display:grid;place-items:center;font-size:12px;color:var(--s-text-muted);">
            <span>🖼️ Image Carousel Media (1/3)</span>
          </div>
        </article>
      `,
      code: `import { TweetCard } from "@/components/sarahui/tweet-card";

export function TweetCardCarousel() {
  return (
    <TweetCard
      name="Sarah Khan"
      handle="sarahkhan"
      content="Shipped our updated component preview dashboard today! 🚀"
      verified
      images={["/preview-1.png", "/preview-2.png"]}
    />
  );
}`
    },
    {
      title: 'Tweet Card With Meta URL Preview',
      description: 'Social card featuring an OpenGraph rich URL preview link attachment.',
      preview: () => html`
        <article class="s-tweet-card" style="width:100%;max-width:440px;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:16px;box-shadow:none;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <div style="width:36px;height:36px;border-radius:50%;background:var(--s-brand-indigo);color:#fff;display:grid;place-items:center;font-weight:700;font-size:12px;">SK</div>
            <div>
              <strong style="font-size:13px;display:block;">Sarah Khan <span style="color:var(--s-brand-indigo);">✔</span></strong>
              <span class="s-small s-muted" style="font-size:11px;">@sarahkhan</span>
            </div>
          </div>
          <p style="font-size:13px;line-height:1.5;margin:0 0 12px;">Explore the new documentation guide on GitHub.</p>
          <div style="border-radius:10px;background:var(--s-bg-subtle);border:1px solid var(--s-border-default);padding:10px 12px;">
            <span class="s-small s-muted" style="font-size:10.5px;text-transform:uppercase;">github.com</span>
            <strong style="display:block;font-size:12px;margin:2px 0;">masarax/sarahui: Thoughtful Design System</strong>
            <p class="s-small s-muted" style="margin:0;font-size:11px;">120 components, 277 tokens, zero runtime dependencies.</p>
          </div>
        </article>
      `,
      code: `import { TweetCard } from "@/components/sarahui/tweet-card";

export function TweetCardMeta() {
  return (
    <TweetCard
      name="Sarah Khan"
      handle="sarahkhan"
      content="Explore the new documentation guide on GitHub."
      verified
      urlPreview={{
        domain: "github.com",
        title: "masarax/sarahui: Thoughtful Design System",
        description: "120 components, 277 tokens, zero dependencies."
      }}
    />
  );
}`
    }
  ],

  // 9. OrbitingCircles
  OrbitingCircles: [
    {
      title: 'Nested Concentric Orbits',
      description: 'Multiple orbiting tracks rotating in synchronized opposite directions.',
      preview: () => demos.OrbitingCircles(),
      code: `import { OrbitingCircles } from "@/components/sarahui/orbiting-circles";

export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[320px] w-full items-center justify-center overflow-hidden">
      <OrbitingCircles radius={80} duration={20}>
        <SparkIcon />
      </OrbitingCircles>
      <OrbitingCircles radius={130} duration={25} reverse>
        <LayersIcon />
      </OrbitingCircles>
    </div>
  );
}`
    },
    {
      title: 'Single Fast Orbit',
      description: 'Fast satellite orbit with accent badge highlighting central node.',
      preview: () => U.OrbitingCircles({radius:60,duration:8,children:Icon({name:'palette',size:20})}),
      code: `import { OrbitingCircles } from "@/components/sarahui/orbiting-circles";

export function OrbitingCirclesFast() {
  return (
    <OrbitingCircles radius={60} duration={8}>
      <PaletteIcon />
    </OrbitingCircles>
  );
}`
    }
  ],

  // 10. AvatarCircles
  AvatarCircles: [
    {
      title: 'Stacked Avatar Overlap',
      description: 'Overlapping avatar circles with overflow counter badge.',
      preview: () => demos.AvatarCircles(),
      code: `import { AvatarCircles } from "@/components/sarahui/avatar-circles";

export function AvatarCirclesDemo() {
  return (
    <AvatarCircles
      numPeople={99}
      avatarUrls={[
        "/avatars/alex.png",
        "/avatars/sarah.png",
        "/avatars/jamie.png"
      ]}
    />
  );
}`
    },
    {
      title: 'Small Team Cluster',
      description: 'Compact 3-member team cluster with exact member count display.',
      preview: () => U.AvatarCircles({numPeople:3,avatars:['SK','AM','JK']}),
      code: `import { AvatarCircles } from "@/components/sarahui/avatar-circles";

export function AvatarCirclesSmall() {
  return (
    <AvatarCircles
      numPeople={3}
      avatarUrls={["/sk.png", "/am.png", "/jk.png"]}
    />
  );
}`
    }
  ],

  // 11. IconCloud
  IconCloud: [
    {
      title: '3D Fibonacci Interactive Sphere',
      description: 'Interactive 3D icon cloud distributed along Fibonacci sphere with drag physics.',
      preview: () => demos.IconCloud(),
      code: `import { IconCloud } from "@/components/sarahui/icon-cloud";

export function IconCloudDemo() {
  return (
    <IconCloud iconSlugs={["typescript", "react", "html5", "css3", "nodedotjs"]} />
  );
}`
    },
    {
      title: 'Brand Ecosystem Cloud',
      description: 'Continuous gentle auto-rotating 3D sphere of brand design tools.',
      preview: () => demos.IconCloud(),
      code: `import { IconCloud } from "@/components/sarahui/icon-cloud";

export function IconCloudAutoRotate() {
  return (
    <IconCloud iconSlugs={["figma", "github", "docker", "tailwindcss"]} />
  );
}`
    }
  ],

  // 12. Lens - Parity with Magic UI (Static Lens)
  Lens: [
    {
      title: 'Cursor Tracking Magnifier',
      description: 'Dynamic cursor-following magnifying lens revealing sharp details on hover.',
      preview: () => demos.Lens(),
      code: `import { Lens } from "@/components/sarahui/lens";

export function LensDemo() {
  return (
    <Lens zoom={1.8} lensSize={140}>
      <img src="/sample-diagram.png" alt="Architecture Diagram" />
    </Lens>
  );
}`
    },
    {
      title: 'Static Lens',
      description: 'Pinned magnifying loupe highlighting a critical focal area continuously.',
      preview: () => html`
        <div style="position:relative;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);padding:24px;text-align:center;box-shadow:none;">
          <div style="display:inline-flex;align-items:center;gap:12px;padding:8px 16px;border-radius:8px;background:var(--s-bg-subtle);border:1px solid var(--s-border-brand);">
            <span style="font-size:18px;">🔍</span>
            <span style="font-size:13px;font-weight:600;">Static Pinned Inspection Focus</span>
          </div>
        </div>
      `,
      code: `import { Lens } from "@/components/sarahui/lens";

export function LensStatic() {
  return (
    <Lens isStatic position={{ x: 120, y: 80 }} zoom={2}>
      <img src="/sample-diagram.png" alt="Inspection View" />
    </Lens>
  );
}`
    }
  ],

  // 13. Pointer
  Pointer: [
    {
      title: 'Multiplayer Real-Time Cursor',
      description: 'Multiplayer user presence indicator with customizable name tag and brand accent.',
      preview: () => demos.Pointer(),
      code: `import { Pointer } from "@/components/sarahui/pointer";

export function PointerDemo() {
  return (
    <div className="relative h-64 w-full border rounded-xl">
      <Pointer name="Sarah Khan" color="#5B3DF5" />
    </div>
  );
}`
    },
    {
      title: 'Co-Editing Presence',
      description: 'Multiple active concurrent user pointers in an active workspace.',
      preview: () => html`
        <div style="position:relative;height:160px;width:100%;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;box-shadow:none;">
          <div style="position:absolute;top:30px;left:40px;display:flex;align-items:center;gap:6px;">
            <span style="color:#5B3DF5;font-size:16px;">↖</span>
            <span style="padding:2px 6px;border-radius:4px;background:#5B3DF5;color:#fff;font-size:10px;font-weight:600;">Alex</span>
          </div>
          <div style="position:absolute;top:80px;left:180px;display:flex;align-items:center;gap:6px;">
            <span style="color:#10B981;font-size:16px;">↖</span>
            <span style="padding:2px 6px;border-radius:4px;background:#10B981;color:#fff;font-size:10px;font-weight:600;">Jamie</span>
          </div>
        </div>
      `,
      code: `import { Pointer } from "@/components/sarahui/pointer";

export function PointerMultiplayer() {
  return (
    <div className="relative h-64 w-full">
      <Pointer name="Alex" color="#5B3DF5" x={40} y={30} />
      <Pointer name="Jamie" color="#10B981" x={180} y={80} />
    </div>
  );
}`
    }
  ],

  // 14. SmoothCursor
  SmoothCursor: [
    {
      title: 'Spring-Smoothed Mouse Follower',
      description: 'Fluid spring physics cursor dot providing organic follower motion on desktop.',
      preview: () => demos.SmoothCursor(),
      code: `import { SmoothCursor } from "@/components/sarahui/smooth-cursor";

export function SmoothCursorDemo() {
  return <SmoothCursor color="#5B3DF5" size={16} />;
}`
    },
    {
      title: 'Accent Ring Follower',
      description: 'Expanding circular follower ring with smooth magnetic easing.',
      preview: () => html`
        <div style="height:140px;width:100%;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;box-shadow:none;">
          <div style="width:36px;height:36px;border-radius:50%;border:2px solid var(--s-brand-indigo);animation:s-pulse 2s infinite;"></div>
        </div>
      `,
      code: `import { SmoothCursor } from "@/components/sarahui/smooth-cursor";

export function SmoothCursorRing() {
  return <SmoothCursor variant="ring" size={32} />;
}`
    }
  ],

  // 15. ProgressiveBlur
  ProgressiveBlur: [
    {
      title: 'Multi-Stop Gradient Blur',
      description: 'Smooth progressive gradient backdrop blur overlay pinned to bottom.',
      preview: () => demos.ProgressiveBlur(),
      code: `import { ProgressiveBlur } from "@/components/sarahui/progressive-blur";

export function ProgressiveBlurDemo() {
  return <ProgressiveBlur direction="bottom" blurAmount={8} />;
}`
    },
    {
      title: 'Top Header Vignette',
      description: 'Atmospheric progressive blur fanning out from the top navigation boundary.',
      preview: () => demos.ProgressiveBlur(),
      code: `import { ProgressiveBlur } from "@/components/sarahui/progressive-blur";

export function ProgressiveBlurTop() {
  return <ProgressiveBlur direction="top" blurAmount={12} />;
}`
    }
  ],

  // 16. DottedMap - Parity with Magic UI (Smaller Dots, PulseMarker)
  DottedMap: [
    {
      title: 'World Coordinates Vector Map',
      description: 'Minimalist dotted vector map with pulsating geographical beacon markers.',
      preview: () => demos.DottedMap(),
      code: `import { DottedMap } from "@/components/sarahui/dotted-map";

export function DottedMapDemo() {
  return (
    <DottedMap
      points={[
        { x: 25, y: 35, label: "San Francisco" },
        { x: 72, y: 58, label: "Dhaka" }
      ]}
    />
  );
}`
    },
    {
      title: 'Smaller Dots',
      description: 'High-density dot matrix representation with fine spatial granularity.',
      preview: () => demos.DottedMap(),
      code: `import { DottedMap } from "@/components/sarahui/dotted-map";

export function DottedMapDense() {
  return (
    <DottedMap dotSize={1.5} dotGap={3} />
  );
}`
    },
    {
      title: 'PulseMarker',
      description: 'Live expanding pulse markers indicating active server regions.',
      preview: () => demos.DottedMap(),
      code: `import { DottedMap } from "@/components/sarahui/dotted-map";

export function DottedMapPulse() {
  return (
    <DottedMap pulseMarkers />
  );
}`
    }
  ],

  // 17. AnimatedBeam - Parity with Magic UI (Bi-Directional, Multiple Inputs)
  AnimatedBeam: [
    {
      title: 'Animated Beam Uni-Directional',
      description: 'Smooth SVG beam connecting two nodes with animated gradient flow.',
      preview: () => demos.AnimatedBeam('beam-specimen'),
      code: `import { AnimatedBeam } from "@/components/sarahui/animated-beam";

export function AnimatedBeamDemo() {
  return (
    <AnimatedBeam
      fromRef={containerRef}
      toRef={destRef}
      duration={3}
    />
  );
}`
    },
    {
      title: 'Animated Beam Bi-Directional',
      description: 'Simultaneous two-way continuous packet transfer between services.',
      preview: () => demos.AnimatedBeam('beam-specimen-bi'),
      code: `import { AnimatedBeam } from "@/components/sarahui/animated-beam";

export function AnimatedBeamBiDirectional() {
  return (
    <AnimatedBeam
      bidirectional
      fromRef={nodeARef}
      toRef={nodeBRef}
      duration={3}
    />
  );
}`
    },
    {
      title: 'Animated Beam Multiple Inputs',
      description: 'Multiple input sources converging onto a central database architecture.',
      preview: () => demos.AnimatedBeam('beam-specimen-multi'),
      code: `import { AnimatedBeam } from "@/components/sarahui/animated-beam";

export function AnimatedBeamMultipleInputs() {
  return (
    <>
      <AnimatedBeam fromRef={input1Ref} toRef={hubRef} />
      <AnimatedBeam fromRef={input2Ref} toRef={hubRef} />
      <AnimatedBeam fromRef={input3Ref} toRef={hubRef} />
    </>
  );
}`
    }
  ],

  // 18. BorderBeam - Parity with Magic UI (2 Border Beams, Reverse)
  BorderBeam: [
    {
      title: '2 Border Beams',
      description: 'Two synchronized border beams traveling offset across the card perimeter.',
      preview: () => html`
        <div style="position:relative;padding:28px 20px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;text-align:center;box-shadow:none;">
          ${U.BorderBeam({size:120,duration:8})}
          ${U.BorderBeam({size:120,duration:8,attrs:{style:'--size:120px;--duration:8s;animation-delay:-4s;'}})}
          <strong style="font-size:13px;">Dual Border Beams</strong>
          <p class="s-small s-muted" style="margin:4px 0 0;">Two concurrent offset luminous beams.</p>
        </div>
      `,
      code: `import { BorderBeam } from "@/components/sarahui/border-beam";

export function BorderBeamDual() {
  return (
    <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-background">
      <span className="text-sm font-semibold">Dual Border Beams</span>
      <BorderBeam size={120} duration={8} />
      <BorderBeam size={120} duration={8} delay={4} />
    </div>
  );
}`
    },
    {
      title: 'Reverse',
      description: 'Invert beam trajectory direction counter-clockwise around the perimeter.',
      preview: () => html`
        <div style="position:relative;padding:28px 20px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;text-align:center;box-shadow:none;">
          ${U.BorderBeam({size:140,duration:8,reverse:true})}
          <strong style="font-size:13px;">Reverse Direction</strong>
          <p class="s-small s-muted" style="margin:4px 0 0;">Counter-clockwise perimeter motion.</p>
        </div>
      `,
      code: `import { BorderBeam } from "@/components/sarahui/border-beam";

export function BorderBeamReverse() {
  return (
    <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-background">
      <span className="text-sm font-semibold">Reversed Beam</span>
      <BorderBeam size={140} duration={8} reverse />
    </div>
  );
}`
    }
  ],

  // 19. ShineBorder - Parity with Magic UI (Monotone)
  ShineBorder: [
    {
      title: 'Dynamic Gradient Perimeter',
      description: 'Animated multi-stop gradient border rotating continuously.',
      preview: () => demos.ShineBorder(),
      code: `import { ShineBorder } from "@/components/sarahui/shine-border";

export function ShineBorderDemo() {
  return (
    <ShineBorder borderWidth={1} duration={6}>
      <div className="p-4">Content</div>
    </ShineBorder>
  );
}`
    },
    {
      title: 'Monotone',
      description: 'Clean monochrome single-color metallic shine for understated elegance.',
      preview: () => U.ShineBorder({color:'var(--s-border-strong)',children:html`<div style="padding:20px;text-align:center;">Monochrome Shine</div>`}),
      code: `import { ShineBorder } from "@/components/sarahui/shine-border";

export function ShineBorderMonotone() {
  return (
    <ShineBorder color={["#A1A1AA"]} duration={8}>
      <div className="p-4">Monotone Shine</div>
    </ShineBorder>
  );
}`
    }
  ],

  // 20. MagicCard - Parity with Magic UI (Orb)
  MagicCard: [
    {
      title: 'Spotlight Cursor Tracking',
      description: 'Dynamic radial gradient following the mouse pointer across the card surface.',
      preview: () => demos.MagicCard(),
      code: `import { MagicCard } from "@/components/sarahui/magic-card";

export function MagicCardDemo() {
  return (
    <MagicCard className="p-6">
      <h3>Interactive Spotlight Card</h3>
    </MagicCard>
  );
}`
    },
    {
      title: 'Orb',
      description: 'Central illuminated ambient orb with soft backdrop diffusion.',
      preview: () => html`
        <div style="position:relative;padding:24px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;box-shadow:none;">
          <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:120px;height:120px;border-radius:50%;background:color-mix(in srgb,var(--s-brand-indigo) 25%,transparent);filter:blur(30px);"></div>
          <div style="position:relative;z-index:2;text-align:center;">
            <strong style="font-size:13px;">Ambient Orb Card</strong>
            <p class="s-small s-muted" style="margin:4px 0 0;">Glowing focal core.</p>
          </div>
        </div>
      `,
      code: `import { MagicCard } from "@/components/sarahui/magic-card";

export function MagicCardOrb() {
  return (
    <MagicCard variant="orb">
      <h3>Ambient Orb Highlight</h3>
    </MagicCard>
  );
}`
    }
  ],

  // 21. GlareHover - Parity with Magic UI (CTA, Alerts)
  GlareHover: [
    {
      title: 'Holographic Glare Reflection',
      description: 'Dynamic specular glare sheen passing across surface responding to pointer movement.',
      preview: () => demos.GlareHover(),
      code: `import { GlareHover } from "@/components/sarahui/glare-hover";

export function GlareHoverDemo() {
  return (
    <GlareHover>
      <div>Interactive Glare Surface</div>
    </GlareHover>
  );
}`
    },
    {
      title: 'CTA',
      description: 'Specular call-to-action button highlighting with interactive sheen.',
      preview: () => html`
        <div class="demo-wrap">
          <button class="s-button s-button--primary" style="position:relative;overflow:hidden;">
            <span>Get Started with Glare</span>
          </button>
        </div>
      `,
      code: `import { GlareHover } from "@/components/sarahui/glare-hover";

export function GlareHoverCTA() {
  return (
    <GlareHover className="rounded-lg">
      <button className="btn-primary">Get Started</button>
    </GlareHover>
  );
}`
    }
  ],

  // 22. Meteors
  Meteors: [
    {
      title: 'Meteor Streaks',
      description: 'Atmospheric shooting star particles descending across canvas backgrounds.',
      preview: () => demos.Meteors(),
      code: `import { Meteors } from "@/components/sarahui/meteors";

export function MeteorsDemo() {
  return <Meteors number={16} />;
}`
    },
    {
      title: 'Subtle Background Trail',
      description: 'Lightweight meteor density for quiet backdrops.',
      preview: () => html`<div style="position:relative;height:120px;overflow:hidden;border-radius:8px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);box-shadow:none;">${U.Meteors({number:6})}</div>`,
      code: `import { Meteors } from "@/components/sarahui/meteors";

export function MeteorsSubtle() {
  return <Meteors number={6} />;
}`
    }
  ],

  // 23. Confetti - Parity with Magic UI (Fireworks, Side Cannons)
  Confetti: [
    {
      title: 'Fireworks',
      description: 'Continuous synchronized fireworks bursts celebrating user milestones.',
      preview: () => demos.Confetti(),
      code: `import { Confetti } from "@/components/sarahui/confetti";

export function ConfettiFireworks() {
  const launch = () => {
    Confetti.fireworks();
  };
  return <button onClick={launch}>Launch Fireworks</button>;
}`
    },
    {
      title: 'Side Cannons',
      description: 'Opposing confetti cannons firing inward from the left and right edges.',
      preview: () => html`
        <div class="demo-wrap">
          ${U.Confetti({label:'Side Cannons',icon:'spark'})}
        </div>
      `,
      code: `import { Confetti } from "@/components/sarahui/confetti";

export function ConfettiSideCannons() {
  const trigger = () => {
    Confetti.sideCannons();
  };
  return <button onClick={trigger}>Trigger Side Cannons</button>;
}`
    }
  ],

  // 24. Particles
  Particles: [
    {
      title: 'Dynamic Particle Field',
      description: 'Smooth ambient particle field rendered on high-performance canvas.',
      preview: () => demos.Particles(),
      code: `import { Particles } from "@/components/sarahui/particles";

export function ParticlesDemo() {
  return <Particles quantity={40} />;
}`
    },
    {
      title: 'Brand Accent Particles',
      description: 'Custom particle coloration matching active brand color schemes.',
      preview: () => html`<div style="position:relative;height:120px;overflow:hidden;border-radius:8px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);box-shadow:none;">${U.Particles({quantity:25,color:'var(--s-color-brand-500)'})}</div>`,
      code: `import { Particles } from "@/components/sarahui/particles";

export function ParticlesAccent() {
  return <Particles quantity={25} color="#5B3DF5" />;
}`
    }
  ],

  // 25. AnimatedThemeToggler - Parity with Magic UI (Square, Diamond)
  AnimatedThemeToggler: [
    {
      title: 'Square',
      description: 'Smooth rectangular wipe reveal animation via native View Transitions API.',
      preview: () => demos.AnimatedThemeToggler(),
      code: `import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";

export function ThemeTogglerSquare() {
  return <AnimatedThemeToggler shape="square" />;
}`
    },
    {
      title: 'Diamond',
      description: '45-degree diamond expansion mask transition for theme switches.',
      preview: () => demos.AnimatedThemeToggler(),
      code: `import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";

export function ThemeTogglerDiamond() {
  return <AnimatedThemeToggler shape="diamond" />;
}`
    }
  ],

  // 26. BlurFade
  BlurFade: [
    {
      title: 'Staggered Blur Fade Entrance',
      description: 'Progressive blur reduction and upward translation on element arrival.',
      preview: () => demos.BlurFade(),
      code: `import { BlurFade } from "@/components/sarahui/blur-fade";

export function BlurFadeDemo() {
  return (
    <BlurFade delay={0.2}>
      <h3>Smooth Content Entrance</h3>
    </BlurFade>
  );
}`
    },
    {
      title: 'Hero Header Entrance',
      description: 'Rapid 0.1s de-blurring entrance designed for top hero statements.',
      preview: () => U.BlurFade({delay:0.1,children:html`<h3 style="margin:0;">Welcome to sarahUI</h3>`}),
      code: `import { BlurFade } from "@/components/sarahui/blur-fade";

export function BlurFadeHero() {
  return (
    <BlurFade delay={0.1}>
      <h1>Welcome to sarahUI</h1>
    </BlurFade>
  );
}`
    }
  ],

  // 27. TextAnimate - Parity with Magic UI (Blur In by Text, Slide Up by Word)
  TextAnimate: [
    {
      title: 'Blur In by Text',
      description: 'Unblurs entire sentences smoothly as a unified typography block.',
      preview: () => demos.TextAnimate(),
      code: `import { TextAnimate } from "@/components/sarahui/text-animate";

export function TextAnimateBlurIn() {
  return (
    <TextAnimate animation="blurIn" by="text">
      Fluid Staggered Letter Animations
    </TextAnimate>
  );
}`
    },
    {
      title: 'Slide Up by Word',
      description: 'Staggered upward slide for each individual word in the sentence.',
      preview: () => demos.TextAnimate(),
      code: `import { TextAnimate } from "@/components/sarahui/text-animate";

export function TextAnimateSlideUp() {
  return (
    <TextAnimate animation="slideUp" by="word">
      Fluid Staggered Letter Animations
    </TextAnimate>
  );
}`
    }
  ],

  // 28. TypingAnimation - Parity with Magic UI (Multiple Words with Loop, Custom Speed)
  TypingAnimation: [
    {
      title: 'Multiple Words with Loop',
      description: 'Cycles sequentially through an array of phrases with smooth cursor typing.',
      preview: () => demos.TypingAnimation(),
      code: `import { TypingAnimation } from "@/components/sarahui/typing-animation";

export function TypingAnimationLoop() {
  return (
    <TypingAnimation
      words={["Design systems", "Accessible patterns", "Zero dependencies"]}
      loop
    />
  );
}`
    },
    {
      title: 'Custom Speed',
      description: 'Accelerated 40ms typing cadence for fast, punchy slogans.',
      preview: () => U.TypingAnimation({text:'Speed. Precision. Zero bloat.',duration:40}),
      code: `import { TypingAnimation } from "@/components/sarahui/typing-animation";

export function TypingAnimationFast() {
  return (
    <TypingAnimation
      text="Speed. Precision. Zero bloat."
      duration={40}
    />
  );
}`
    }
  ],

  // 29. LineShadowText
  LineShadowText: [
    {
      title: '3D Isometric Cast Shadow',
      description: 'Text with sharp layered 3D isometric shadow steps.',
      preview: () => demos.LineShadowText(),
      code: `import { LineShadowText } from "@/components/sarahui/line-shadow-text";

export function LineShadowTextDemo() {
  return <LineShadowText shadowColor="#5B3DF5">3D SHADOW</LineShadowText>;
}`
    },
    {
      title: 'Compact Step Shadow',
      description: 'Tight 2-step isometric shadow for smaller subheadings.',
      preview: () => demos.LineShadowText(),
      code: `import { LineShadowText } from "@/components/sarahui/line-shadow-text";

export function LineShadowTextCompact() {
  return <LineShadowText shadowColor="#10B981" depth={4}>COMPACT SHADOW</LineShadowText>;
}`
    }
  ],

  // 30. AuroraText
  AuroraText: [
    {
      title: 'Aurora Borealis Gradient Text',
      description: 'Northern lights multi-color ambient flowing wave across typography.',
      preview: () => demos.AuroraText(),
      code: `import { AuroraText } from "@/components/sarahui/aurora-text";

export function AuroraTextDemo() {
  return <AuroraText>Aurora Borealis Wave</AuroraText>;
}`
    },
    {
      title: 'Warm Sunset Horizon',
      description: 'Flowing amber, magenta, and coral gradient wave.',
      preview: () => demos.AuroraText(),
      code: `import { AuroraText } from "@/components/sarahui/aurora-text";

export function AuroraTextWarm() {
  return (
    <AuroraText colors={["#F59E0B", "#EC4899", "#8B5CF6"]}>
      Sunset Horizon Wave
    </AuroraText>
  );
}`
    }
  ],

  // 31. VideoText
  VideoText: [
    {
      title: 'Video Masked Headline',
      description: 'SVG clip-path masked headline over an ambient looping video.',
      preview: () => demos.VideoText(),
      code: `import { VideoText } from "@/components/sarahui/video-text";

export function VideoTextDemo() {
  return <VideoText text="CREATIVE" videoSrc="/ambient.mp4" />;
}`
    },
    {
      title: 'Condensed Font Mask',
      description: 'High-impact condensed typography mask maximizing video visible area.',
      preview: () => demos.VideoText(),
      code: `import { VideoText } from "@/components/sarahui/video-text";

export function VideoTextCondensed() {
  return <VideoText text="FUTURE" videoSrc="/matrix.mp4" className="font-black" />;
}`
    }
  ],

  // 32. NumberTicker
  NumberTicker: [
    {
      title: 'Smooth Counter Animation',
      description: 'Count-up animation triggered when the element scrolls into view.',
      preview: () => demos.NumberTicker(),
      code: `import { NumberTicker } from "@/components/sarahui/number-ticker";

export function NumberTickerDemo() {
  return <NumberTicker value={277} />;
}`
    },
    {
      title: 'Currency Formatted Counter',
      description: 'Metric counter displaying currency formatted monetary sums.',
      preview: () => html`
        <div style="font-size:28px;font-weight:700;color:var(--s-text-brand);">$ ${U.NumberTicker({value:9850})}</div>
      `,
      code: `import { NumberTicker } from "@/components/sarahui/number-ticker";

export function NumberTickerCurrency() {
  return <div>$ <NumberTicker value={9850} /></div>;
}`
    }
  ],

  // 33. AnimatedShinyText
  AnimatedShinyText: [
    {
      title: 'Metallic Shimmer Sweep',
      description: 'Luminous metallic text sheen passing continuously across characters.',
      preview: () => demos.AnimatedShinyText(),
      code: `import { AnimatedShinyText } from "@/components/sarahui/animated-shiny-text";

export function ShinyTextDemo() {
  return <AnimatedShinyText text="✨ Introducing sarahUI Components" />;
}`
    },
    {
      title: 'Brand Accent Shimmer',
      description: 'Violet-tinted metallic sheen designed for release announcements.',
      preview: () => demos.AnimatedShinyText(),
      code: `import { AnimatedShinyText } from "@/components/sarahui/animated-shiny-text";

export function ShinyTextBrand() {
  return <AnimatedShinyText text="⚡ Zero Runtime Dependencies" shimmerWidth={120} />;
}`
    }
  ],

  // 34. AnimatedGradientText - Parity with Magic UI (Custom Speed)
  AnimatedGradientText: [
    {
      title: 'Radiant Wave Gradient Text',
      description: 'Flowing multi-stop gradient wave animating continuously across text.',
      preview: () => demos.AnimatedGradientText(),
      code: `import { AnimatedGradientText } from "@/components/sarahui/animated-gradient-text";

export function GradientTextDemo() {
  return <AnimatedGradientText text="✨ Introducing Gradient Text" />;
}`
    },
    {
      title: 'Custom Speed',
      description: 'Accelerated 1.5s fluid oscillation for prominent hero titles.',
      preview: () => demos.AnimatedGradientText(),
      code: `import { AnimatedGradientText } from "@/components/sarahui/animated-gradient-text";

export function GradientTextFast() {
  return <AnimatedGradientText text="⚡ Accelerated Wave" speed={1.5} />;
}`
    }
  ],

  // 35. TextReveal
  TextReveal: [
    {
      title: 'Gradient Mask Text Reveal',
      description: 'Scroll and view-triggered progressive gradient typography reveal.',
      preview: () => demos.TextReveal(),
      code: `import { TextReveal } from "@/components/sarahui/text-reveal";

export function TextRevealDemo() {
  return <TextReveal text="High-contrast, accessible design system." />;
}`
    },
    {
      title: 'Instant View Entrance',
      description: 'Fast opacity sweep reveal for editorial copy sections.',
      preview: () => demos.TextReveal(),
      code: `import { TextReveal } from "@/components/sarahui/text-reveal";

export function TextRevealFast() {
  return <TextReveal text="Crafted with care for every screen." duration={0.8} />;
}`
    }
  ],

  // 36. DiaTextReveal - Parity with Magic UI (Custom gradient)
  DiaTextReveal: [
    {
      title: 'Diagonal Mask Sweep Reveal',
      description: 'Striking diagonal gradient sweep uncovering typography with high-contrast motion.',
      preview: () => demos.DiaTextReveal(),
      code: `import { DiaTextReveal } from "@/components/sarahui/dia-text-reveal";

export function DiaTextRevealDemo() {
  return <DiaTextReveal text="DIAGONAL MASK SWEEP REVEAL" />;
}`
    },
    {
      title: 'Custom Gradient',
      description: 'Two-tone brand colored diagonal gradient wipe across headlines.',
      preview: () => demos.DiaTextReveal(),
      code: `import { DiaTextReveal } from "@/components/sarahui/dia-text-reveal";

export function DiaTextRevealCustom() {
  return <DiaTextReveal text="BRAND REVEAL" gradient="linear-gradient(45deg, #178BFF, #5B3DF5)" />;
}`
    }
  ],

  // 37. HyperText
  HyperText: [
    {
      title: 'Scrambling Character Decoding',
      description: 'Matrix-style random character scrambling on hover.',
      preview: () => demos.HyperText(),
      code: `import { HyperText } from "@/components/sarahui/hyper-text";

export function HyperTextDemo() {
  return <HyperText text="SARAHUI PRO SYSTEM" />;
}`
    },
    {
      title: 'Auto-Decoding Entrance',
      description: 'Automatically un-scrambles random glyphs upon initial viewport entrance.',
      preview: () => demos.HyperText(),
      code: `import { HyperText } from "@/components/sarahui/hyper-text";

export function HyperTextAuto() {
  return <HyperText text="DECRYPTED MESSAGE" trigger="auto" />;
}`
    }
  ],

  // 38. WordRotate - Parity with Magic UI (Snappy Cycling)
  WordRotate: [
    {
      title: 'Cycling Text Carousel',
      description: 'Continuous rotating word switcher with smooth vertical transition.',
      preview: () => demos.WordRotate(),
      code: `import { WordRotate } from "@/components/sarahui/word-rotate";

export function WordRotateDemo() {
  return <WordRotate words={["Design", "Build", "Ship", "Delight"]} />;
}`
    },
    {
      title: 'Snappy Cycling',
      description: 'Accelerated 1.5s snappy word rotation for dynamic hero taglines.',
      preview: () => U.WordRotate({words:['Accessible','Responsive','Performant','Lightweight'],duration:1500}),
      code: `import { WordRotate } from "@/components/sarahui/word-rotate";

export function WordRotateSnappy() {
  return (
    <WordRotate
      words={["Accessible", "Responsive", "Performant", "Lightweight"]}
      duration={1500}
    />
  );
}`
    }
  ],

  // 39. ScrollBasedVelocity
  ScrollBasedVelocity: [
    {
      title: 'Scroll-Accelerated Velocity Marquee',
      description: 'Continuous ticker whose scrolling velocity increases responsively during page scrolling.',
      preview: () => demos.ScrollBasedVelocity(),
      code: `import { ScrollBasedVelocity } from "@/components/sarahui/scroll-based-velocity";

export function ScrollVelocityDemo() {
  return <ScrollBasedVelocity text="SARAHUI ACCESSIBLE DESIGN SYSTEM" defaultVelocity={3} />;
}`
    },
    {
      title: 'Reverse Direction Velocity',
      description: 'Opposite horizontal scrolling orientation responding to scroll motion.',
      preview: () => demos.ScrollBasedVelocity(),
      code: `import { ScrollBasedVelocity } from "@/components/sarahui/scroll-based-velocity";

export function ScrollVelocityReverse() {
  return <ScrollBasedVelocity text="FAST COMPLIANT LIGHTWEIGHT" defaultVelocity={-3} />;
}`
    }
  ],

  // 40. SparklesText
  SparklesText: [
    {
      title: 'Glittering Star Sparkles',
      description: 'Heading text with animated shimmering star particles.',
      preview: () => demos.SparklesText(),
      code: `import { SparklesText } from "@/components/sarahui/sparkles-text";

export function SparklesTextDemo() {
  return <SparklesText text="Magical Interface Components" sparklesCount={6} />;
}`
    },
    {
      title: 'Golden Sparkles',
      description: 'Warm amber star sparkles for premium feature banners.',
      preview: () => demos.SparklesText(),
      code: `import { SparklesText } from "@/components/sarahui/sparkles-text";

export function SparklesTextGold() {
  return <SparklesText text="Gold Membership Tier" colors={{ first: "#FFD700", second: "#FFA500" }} />;
}`
    }
  ],

  // 41. MorphingText
  MorphingText: [
    {
      title: 'SVG Goo Filter Morphing',
      description: 'Smooth liquid text morphing transitions between phrases.',
      preview: () => demos.MorphingText(),
      code: `import { MorphingText } from "@/components/sarahui/morphing-text";

export function MorphingTextDemo() {
  return <MorphingText texts={["DESIGN", "ENGINEER", "DELIGHT"]} />;
}`
    },
    {
      title: 'Fast Cadence Morphing',
      description: 'Quick 2-second fluid dissolve between technical capabilities.',
      preview: () => demos.MorphingText(),
      code: `import { MorphingText } from "@/components/sarahui/morphing-text";

export function MorphingTextFast() {
  return <MorphingText texts={["SPEED", "SAFETY", "SCALE"]} morphTime={1} cooldownTime={0.5} />;
}`
    }
  ],

  // 42. SpinningText - Parity with Magic UI (Reverse)
  SpinningText: [
    {
      title: 'Circular Orbiting Typography',
      description: 'Curved typography spinning continuously around an SVG circular perimeter.',
      preview: () => demos.SpinningText(),
      code: `import { SpinningText } from "@/components/sarahui/spinning-text";

export function SpinningTextDemo() {
  return <SpinningText text="SARAHUI • MASARA X • DESIGN SYSTEM • " />;
}`
    },
    {
      title: 'Reverse',
      description: 'Counter-clockwise spinning circular typography seal.',
      preview: () => demos.SpinningText(),
      code: `import { SpinningText } from "@/components/sarahui/spinning-text";

export function SpinningTextReverse() {
  return <SpinningText reverse text="VERIFIED SECURE • ENTERPRISE READY • " />;
}`
    }
  ],

  // 43. Highlighter
  Highlighter: [
    {
      title: 'Hand-Drawn Marker Highlighter',
      description: 'Animated SVG marker stroke highlighting key terms in body passages.',
      preview: () => demos.Highlighter(),
      code: `import { Highlighter } from "@/components/sarahui/highlighter";

export function HighlighterDemo() {
  return (
    <p>
      Build interfaces with{" "}
      <Highlighter action="highlight">expressive motion</Highlighter>.
    </p>
  );
}`
    },
    {
      title: 'Underline Stroke',
      description: 'Hand-drawn marker underline emphasizing key metrics.',
      preview: () => demos.Highlighter(),
      code: `import { Highlighter } from "@/components/sarahui/highlighter";

export function HighlighterUnderline() {
  return (
    <p>
      Over <Highlighter action="underline">120 components</Highlighter> ready to deploy.
    </p>
  );
}`
    }
  ],

  // 44. Text3DFlip - Parity with Magic UI (Stagger from center)
  Text3DFlip: [
    {
      title: '3D Perspective Word Flip',
      description: 'Perspective 3D text flip toggling smoothly between front and back statements on hover.',
      preview: () => demos.Text3DFlip(),
      code: `import { Text3DFlip } from "@/components/sarahui/text-3d-flip";

export function Text3DFlipDemo() {
  return <Text3DFlip frontText="HOVER ME" backText="FLIPPED" />;
}`
    },
    {
      title: 'Stagger from center',
      description: 'Individual letters flip outward progressively starting from the center.',
      preview: () => demos.Text3DFlip(),
      code: `import { Text3DFlip } from "@/components/sarahui/text-3d-flip";

export function Text3DFlipStagger() {
  return <Text3DFlip stagger="center" frontText="CENTER OUT" backText="TRANSFORM" />;
}`
    }
  ],

  // 45. Safari - Parity with Magic UI (With Image, With Video, Simple Mode)
  Safari: [
    {
      title: 'With Image',
      description: 'Realistic Safari browser mockup framing an application screenshot.',
      preview: () => demos.Safari(),
      code: `import { Safari } from "@/components/sarahui/safari";

export function SafariImage() {
  return (
    <Safari
      url="sarahui.masarax.com"
      imageSrc="/dashboard-preview.png"
    />
  );
}`
    },
    {
      title: 'With Video',
      description: 'Safari browser window mockup framing an interactive looping video stream.',
      preview: () => demos.Safari(),
      code: `import { Safari } from "@/components/sarahui/safari";

export function SafariVideo() {
  return (
    <Safari
      url="sarahui.masarax.com"
      videoSrc="/demo-recording.mp4"
    />
  );
}`
    },
    {
      title: 'Simple Mode',
      description: 'Streamlined browser mockup without address bar for clean hero mockups.',
      preview: () => demos.Safari(),
      code: `import { Safari } from "@/components/sarahui/safari";

export function SafariSimple() {
  return (
    <Safari mode="simple" imageSrc="/hero.png" />
  );
}`
    }
  ],

  // 46. Iphone - Parity with Magic UI (With Image, With Video)
  Iphone: [
    {
      title: 'With Image',
      description: 'High-fidelity iPhone device frame displaying a mobile application screenshot.',
      preview: () => demos.Iphone(),
      code: `import { Iphone } from "@/components/sarahui/iphone";

export function IphoneImage() {
  return <Iphone imgSrc="/mobile-screen.png" />;
}`
    },
    {
      title: 'With Video',
      description: 'iPhone device mockup displaying a looping mobile video walkthrough.',
      preview: () => demos.Iphone(),
      code: `import { Iphone } from "@/components/sarahui/iphone";

export function IphoneVideo() {
  return <Iphone videoSrc="/mobile-walkthrough.mp4" />;
}`
    }
  ],

  // 47. Android - Parity with Magic UI (With Image, With Video)
  Android: [
    {
      title: 'With Image',
      description: 'High-precision Android device bezel framing a mobile application view.',
      preview: () => demos.Android(),
      code: `import { Android } from "@/components/sarahui/android";

export function AndroidImage() {
  return <Android imgSrc="/android-screen.png" />;
}`
    },
    {
      title: 'With Video',
      description: 'Android device frame running a looping mobile walkthrough video.',
      preview: () => demos.Android(),
      code: `import { Android } from "@/components/sarahui/android";

export function AndroidVideo() {
  return <Android videoSrc="/android-demo.mp4" />;
}`
    }
  ],

  // 48. RainbowButton - Parity with Magic UI (Outline Variant)
  RainbowButton: [
    {
      title: 'Chromatic Rainbow Gradient',
      description: 'Smooth full-spectrum rainbow gradient animated continuously.',
      preview: () => demos.RainbowButton(),
      code: `import { RainbowButton } from "@/components/sarahui/rainbow-button";

export function RainbowButtonDemo() {
  return (
    <RainbowButton>Access Pro Features</RainbowButton>
  );
}`
    },
    {
      title: 'Outline Variant',
      description: 'Chromatic rainbow animated border with transparent surface fill.',
      preview: () => html`
        <div class="demo-wrap">
          <button class="s-button s-rainbow-btn" style="background:var(--s-bg-surface);color:var(--s-text-primary);box-shadow:none;border:1px solid transparent;background-clip:padding-box;">
            <span>Outline Chromatic Button</span>
          </button>
        </div>
      `,
      code: `import { RainbowButton } from "@/components/sarahui/rainbow-button";

export function RainbowButtonOutline() {
  return (
    <RainbowButton variant="outline">
      Outline Chromatic Action
    </RainbowButton>
  );
}`
    }
  ],

  // 49. ShimmerButton
  ShimmerButton: [
    {
      title: 'Shimmer Border Action',
      description: 'Pulsing luminous light band rotating around the button rim.',
      preview: () => demos.ShimmerButton(),
      code: `import { ShimmerButton } from "@/components/sarahui/shimmer-button";

export function ShimmerButtonDemo() {
  return <ShimmerButton label="Get Started Now" icon="spark" />;
}`
    },
    {
      title: 'Action with Trailing Icon',
      description: 'Directional call to action with animated edge shimmer.',
      preview: () => U.ShimmerButton({label:'Continue to Docs',trailing:'arrow'}),
      code: `import { ShimmerButton } from "@/components/sarahui/shimmer-button";

export function ShimmerButtonTrailing() {
  return <ShimmerButton label="Continue to Docs" trailing="arrow" />;
}`
    }
  ],

  // 50. RippleButton
  RippleButton: [
    {
      title: 'Wave Ripple Click Button',
      description: 'Action button generating expanding concentric waves from click location.',
      preview: () => demos.RippleButton(),
      code: `import { RippleButton } from "@/components/sarahui/ripple-button";

export function RippleButtonDemo() {
  return <RippleButton label="Click for Ripple" icon="spark" />;
}`
    },
    {
      title: 'Centered Pulse Action',
      description: 'Ripple emanating symmetrically from button center.',
      preview: () => demos.RippleButton(),
      code: `import { RippleButton } from "@/components/sarahui/ripple-button";

export function RippleButtonCenter() {
  return <RippleButton rippleColor="#5B3DF5" centered label="Confirm Action" />;
}`
    }
  ],

  // 51. FlickeringGrid - Parity with Magic UI (Rounded)
  FlickeringGrid: [
    {
      title: 'Interactive Canvas Matrix',
      description: 'High-performance flickering pixel matrix background rendered on canvas.',
      preview: () => demos.FlickeringGrid(),
      code: `import { FlickeringGrid } from "@/components/sarahui/flickering-grid";

export function FlickeringGridDemo() {
  return <FlickeringGrid squareSize={4} gridGap={6} color="#5B3DF5" />;
}`
    },
    {
      title: 'Rounded',
      description: 'Rounded flickering cell squares for a softer, organic grid feel.',
      preview: () => demos.FlickeringGrid(),
      code: `import { FlickeringGrid } from "@/components/sarahui/flickering-grid";

export function FlickeringGridRounded() {
  return <FlickeringGrid squareSize={5} gridGap={8} rounded color="#10B981" />;
}`
    }
  ],

  // 52. AnimatedGridPattern
  AnimatedGridPattern: [
    {
      title: 'Flickering Matrix Grid',
      description: 'Background grid with randomly shimmering matrix squares.',
      preview: () => demos.AnimatedGridPattern(),
      code: `import { AnimatedGridPattern } from "@/components/sarahui/animated-grid-pattern";

export function AnimatedGridPatternDemo() {
  return <AnimatedGridPattern numSquares={24} maxOpacity={0.5} />;
}`
    },
    {
      title: 'Dense Matrix Grid',
      description: 'High-density active matrix squares for dense hero backgrounds.',
      preview: () => demos.AnimatedGridPattern(),
      code: `import { AnimatedGridPattern } from "@/components/sarahui/animated-grid-pattern";

export function AnimatedGridPatternDense() {
  return <AnimatedGridPattern numSquares={48} maxOpacity={0.8} duration={2} />;
}`
    }
  ],

  // 53. RetroGrid
  RetroGrid: [
    {
      title: '3D Perspective Grid Floor',
      description: 'Infinite scrolling perspective grid with atmospheric horizon fading.',
      preview: () => demos.RetroGrid(),
      code: `import { RetroGrid } from "@/components/sarahui/retro-grid";

export function RetroGridDemo() {
  return <RetroGrid angle={65} />;
}`
    },
    {
      title: 'Inverted Horizon Ceiling',
      description: 'Perspective ceiling grid orientation for dramatic top hero sections.',
      preview: () => demos.RetroGrid(),
      code: `import { RetroGrid } from "@/components/sarahui/retro-grid";

export function RetroGridInverted() {
  return <RetroGrid angle={-65} />;
}`
    }
  ],

  // 54. Ripple
  Ripple: [
    {
      title: 'Concentric Pulse Waves',
      description: 'Pulsing ambient wave circles emanating outward from a focal point.',
      preview: () => demos.Ripple(),
      code: `import { Ripple } from "@/components/sarahui/ripple";

export function RippleDemo() {
  return <Ripple numCircles={5} mainCircleSize={210} />;
}`
    },
    {
      title: 'Compact Wave Pulse',
      description: 'Tight 3-circle pulse wave tailored for small avatar hubs.',
      preview: () => U.Ripple({numCircles:3,mainCircleSize:120}),
      code: `import { Ripple } from "@/components/sarahui/ripple";

export function RippleCompact() {
  return <Ripple numCircles={3} mainCircleSize={120} />;
}`
    }
  ],

  // 55. DotPattern - Parity with Magic UI (Linear Gradient, With Glow Effect)
  DotPattern: [
    {
      title: 'Linear Gradient',
      description: 'Dotted matrix background pattern with linear mask falloff.',
      preview: () => demos.DotPattern(),
      code: `import { DotPattern } from "@/components/sarahui/dot-pattern";

export function DotPatternLinearGradient() {
  return (
    <DotPattern
      width={20}
      height={20}
      cr={1}
      className="[mask-image:linear-gradient(to_bottom_white,transparent)]"
    />
  );
}`
    },
    {
      title: 'With Glow Effect',
      description: 'Subtle radial glowing aura projecting behind the dot matrix grid.',
      preview: () => html`
        <div style="position:relative;height:160px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;box-shadow:none;">
          <div style="position:absolute;width:180px;height:180px;border-radius:50%;background:color-mix(in srgb,var(--s-brand-indigo) 20%,transparent);filter:blur(40px);"></div>
          ${U.DotPattern({width:16,height:16,cr:1})}
        </div>
      `,
      code: `import { DotPattern } from "@/components/sarahui/dot-pattern";

export function DotPatternGlow() {
  return <DotPattern glow glowColor="#5B3DF5" />;
}`
    }
  ],

  // 56. GridPattern - Parity with Magic UI (Linear Gradient, Dashed Stroke)
  GridPattern: [
    {
      title: 'Linear Gradient',
      description: 'Configurable geometric grid background with linear mask falloff.',
      preview: () => demos.GridPattern(),
      code: `import { GridPattern } from "@/components/sarahui/grid-pattern";

export function GridPatternLinear() {
  return (
    <GridPattern
      width={40}
      height={40}
      className="[mask-image:linear-gradient(to_bottom_white,transparent)]"
    />
  );
}`
    },
    {
      title: 'Dashed Stroke',
      description: 'Architectural blueprint style dashed stroke grid pattern.',
      preview: () => demos.GridPattern(),
      code: `import { GridPattern } from "@/components/sarahui/grid-pattern";

export function GridPatternDashed() {
  return (
    <GridPattern
      width={32}
      height={32}
      strokeDasharray="4 2"
    />
  );
}`
    }
  ],

  // 57. HexagonPattern - Parity with Magic UI (Linear Gradient, Dashed Stroke)
  HexagonPattern: [
    {
      title: 'Linear Gradient',
      description: 'Honeycomb hexagonal tessellation with directional gradient mask.',
      preview: () => demos.HexagonPattern(),
      code: `import { HexagonPattern } from "@/components/sarahui/hexagon-pattern";

export function HexagonPatternLinear() {
  return (
    <HexagonPattern
      size={36}
      className="[mask-image:linear-gradient(to_bottom_white,transparent)]"
    />
  );
}`
    },
    {
      title: 'Dashed Stroke',
      description: 'Honeycomb vector grid with fine dashed stroke lines.',
      preview: () => demos.HexagonPattern(),
      code: `import { HexagonPattern } from "@/components/sarahui/hexagon-pattern";

export function HexagonPatternDashed() {
  return (
    <HexagonPattern size={32} strokeDasharray="3 3" />
  );
}`
    }
  ],

  // 58. StripedPattern - Parity with Magic UI (Striped Pattern with a dashed stroke, Striped Pattern To Right)
  StripedPattern: [
    {
      title: 'Striped Pattern with a dashed stroke',
      description: 'Diagonal vector pinstripe background featuring dashed stroke rendering.',
      preview: () => demos.StripedPattern(),
      code: `import { StripedPattern } from "@/components/sarahui/striped-pattern";

export function StripedPatternDashed() {
  return (
    <StripedPattern
      angle={45}
      width={24}
      height={24}
      strokeDasharray="4 4"
    />
  );
}`
    },
    {
      title: 'Striped Pattern To Right',
      description: 'Horizontal pinstripe orientation creating modern scanning lines.',
      preview: () => demos.StripedPattern(),
      code: `import { StripedPattern } from "@/components/sarahui/striped-pattern";

export function StripedPatternHorizontal() {
  return (
    <StripedPattern direction="right" width={16} height={16} />
  );
}`
    }
  ],

  // 59. InteractiveGridPattern - Parity with Magic UI (Colorful)
  InteractiveGridPattern: [
    {
      title: 'Cursor Proximity Illuminating Grid',
      description: 'Vector grid pattern whose individual cell coordinates illuminate on cursor hover.',
      preview: () => demos.InteractiveGridPattern(),
      code: `import { InteractiveGridPattern } from "@/components/sarahui/interactive-grid-pattern";

export function InteractiveGridPatternDemo() {
  return <InteractiveGridPattern width={32} height={32} />;
}`
    },
    {
      title: 'Colorful',
      description: 'Multi-color illuminated cell responses shifting through spectral highlights.',
      preview: () => demos.InteractiveGridPattern(),
      code: `import { InteractiveGridPattern } from "@/components/sarahui/interactive-grid-pattern";

export function InteractiveGridPatternColorful() {
  return (
    <InteractiveGridPattern
      width={32}
      height={32}
      colors={["#178BFF", "#5B3DF5", "#A020FF", "#00E5FF"]}
    />
  );
}`
    }
  ],

  // 60. LightRays
  LightRays: [
    {
      title: 'Volumetric God Rays Lighting',
      description: 'Atmospheric volumetric light beams fanning across backgrounds.',
      preview: () => demos.LightRays(),
      code: `import { LightRays } from "@/components/sarahui/light-rays";

export function LightRaysDemo() {
  return <LightRays count={7} intensity={0.6} />;
}`
    },
    {
      title: 'Subtle Ambient Beams',
      description: 'Gentle low-intensity illumination for dark background depth.',
      preview: () => demos.LightRays(),
      code: `import { LightRays } from "@/components/sarahui/light-rays";

export function LightRaysSubtle() {
  return <LightRays count={4} intensity={0.3} />;
}`
    }
  ],

  // 61. NoiseTexture - Parity with Magic UI (Newsletter digest, Button)
  NoiseTexture: [
    {
      title: 'Newsletter digest',
      description: 'Grain-textured subscription card providing organic tactile feel.',
      preview: () => demos.NoiseTexture(),
      code: `import { NoiseTexture } from "@/components/sarahui/noise-texture";

export function NoiseTextureDigest() {
  return (
    <div className="relative p-6 border rounded-xl overflow-hidden">
      <NoiseTexture opacity={0.25} />
      <h3>Subscribe to Newsletter</h3>
    </div>
  );
}`
    },
    {
      title: 'Button',
      description: 'Subtle film grain noise overlay applied directly to a button surface.',
      preview: () => html`
        <div class="demo-wrap">
          <button class="s-button s-button--primary" style="position:relative;overflow:hidden;">
            <span>Tactile Grain Action</span>
          </button>
        </div>
      `,
      code: `import { NoiseTexture } from "@/components/sarahui/noise-texture";

export function NoiseTextureButton() {
  return (
    <button className="relative overflow-hidden btn-primary">
      <NoiseTexture opacity={0.3} />
      <span>Tactile Button</span>
    </button>
  );
}`
    }
  ],

  // 62. Floating3DParticles - Parity with Magic UI (Plain Background)
  Floating3DParticles: [
    {
      title: '3D Perspective Floating Particles',
      description: '3D depth-projected floating particle field rendered on high-performance canvas.',
      preview: () => demos.Floating3DParticles(),
      code: `import { Floating3DParticles } from "@/components/sarahui/floating-3d-particles";

export function FloatingParticlesDemo() {
  return <Floating3DParticles count={45} fov={60} />;
}`
    },
    {
      title: 'Plain Background',
      description: 'Minimalist flat surface with deep, slow-drifting dust motes.',
      preview: () => demos.Floating3DParticles(),
      code: `import { Floating3DParticles } from "@/components/sarahui/floating-3d-particles";

export function FloatingParticlesPlain() {
  return <Floating3DParticles count={25} speed={0.4} />;
}`
    }
  ],

  // 63. ShinyButton
  ShinyButton: [
    {
      title: 'Continuous Sheen Action Button',
      description: 'High-emphasis CTA button with animated sweeping specular sheen highlights.',
      preview: () => demos.ShinyButton(),
      code: `import { ShinyButton } from "@/components/sarahui/shiny-button";

export function ShinyButtonDemo() {
  return <ShinyButton label="Get SarahUI Pro" icon="spark" />;
}`
    },
    {
      title: 'Compact Sheen Button',
      description: 'Small ergonomic action button with subtle highlight sweep.',
      preview: () => demos.ShinyButton(),
      code: `import { ShinyButton } from "@/components/sarahui/shiny-button";

export function ShinyButtonCompact() {
  return <ShinyButton size="sm" label="Quick Action" />;
}`
    }
  ],

  // 64. FileTree
  FileTree: [
    {
      title: 'Collapsible Project Directory',
      description: 'Hierarchical folder and file tree with expand, collapse, and keyboard navigation.',
      code: `import { FileTree, Folder, File } from "@/components/sarahui/file-tree";

export function FileTreeDemo() {
  return (
    <FileTree>
      <Folder name="src">
        <File name="index.ts" />
        <File name="styles.css" />
      </Folder>
    </FileTree>
  );
}`
    },
    {
      title: 'Multi-Level Architecture',
      description: 'Deep file structure showing components, hooks, and configuration files.',
      code: `import { FileTree } from "@/components/sarahui/file-tree";

export function FileTreeDeep() {
  return <FileTree defaultExpanded={["components", "ui"]} />;
}`
    }
  ],

  // 65. CodeComparison
  CodeComparison: [
    {
      title: 'Side-by-Side Code Diff',
      description: 'Structured comparison container displaying before and after code side by side.',
      preview: () => demos.CodeComparison(),
      code: `import { CodeComparison } from "@/components/sarahui/code-comparison";

export function CodeComparisonDemo() {
  return (
    <CodeComparison
      beforeCode="const legacy = 1;"
      afterCode="const modern = 2;"
      beforeTitle="Legacy Code"
      afterTitle="sarahUI"
    />
  );
}`
    },
    {
      title: 'TypeScript vs JavaScript',
      description: 'Direct comparison demonstrating type annotations and ergonomics.',
      preview: () => demos.CodeComparison(),
      code: `import { CodeComparison } from "@/components/sarahui/code-comparison";

export function CodeComparisonLang() {
  return (
    <CodeComparison
      beforeCode="function sum(a, b) { return a + b; }"
      afterCode="function sum(a: number, b: number): number { return a + b; }"
      beforeTitle="JavaScript"
      afterTitle="TypeScript"
    />
  );
}`
    }
  ],

  // 66. ScrollProgress
  ScrollProgress: [
    {
      title: 'Page Scroll Progress',
      description: 'Pinned scrollbar tracking current page scroll depth.',
      preview: () => demos.ScrollProgress(),
      code: `import { ScrollProgress } from "@/components/sarahui/scroll-progress";

export function ScrollProgressDemo() {
  return <ScrollProgress height={3} color="#5B3DF5" />;
}`
    },
    {
      title: 'Bottom Pinned Bar',
      description: 'Bottom-docked reading progress bar for long-form editorial articles.',
      preview: () => demos.ScrollProgress(),
      code: `import { ScrollProgress } from "@/components/sarahui/scroll-progress";

export function ScrollProgressBottom() {
  return <ScrollProgress position="bottom" height={4} />;
}`
    }
  ],

  // 67. NeonGradientCard
  NeonGradientCard: [
    {
      title: 'High-Intensity Neon Glow',
      description: 'Card with vibrant rotating multi-stop neon gradient rim.',
      preview: () => demos.NeonGradientCard(),
      code: `import { NeonGradientCard } from "@/components/sarahui/neon-gradient-card";

export function NeonCardDemo() {
  return (
    <NeonGradientCard>
      <h3>Neon Glow Card</h3>
    </NeonGradientCard>
  );
}`
    },
    {
      title: 'Subtle Neon Glow',
      description: 'Gentle low-intensity neon glow for quiet dashboard cards.',
      preview: () => demos.NeonGradientCard(),
      code: `import { NeonGradientCard } from "@/components/sarahui/neon-gradient-card";

export function NeonCardSubtle() {
  return (
    <NeonGradientCard intensity={0.4}>
      <h3>Subtle Neon Accent</h3>
    </NeonGradientCard>
  );
}`
    }
  ],

  // 68. ComicText
  ComicText: [
    {
      title: 'Pop-Art Halftone Comic Text',
      description: 'Retro comic typography featuring bold multi-layer strokes and rhythmic pop animation.',
      preview: () => demos.ComicText(),
      code: `import { ComicText } from "@/components/sarahui/comic-text";

export function ComicTextDemo() {
  return <ComicText text="POW! BOOM! SARAHUI" />;
}`
    },
    {
      title: 'Action Slogan',
      description: 'Punchy action slogan with high-contrast comic drop shadow.',
      preview: () => demos.ComicText(),
      code: `import { ComicText } from "@/components/sarahui/comic-text";

export function ComicTextSlogan() {
  return <ComicText text="NEXT GEN" fontSize={48} />;
}`
    }
  ],

  // 69. KineticText
  KineticText: [
    {
      title: 'Kinetic Velocity Typography',
      description: 'Fluid kinetic velocity text animating horizontally across viewports.',
      preview: () => demos.KineticText(),
      code: `import { KineticText } from "@/components/sarahui/kinetic-text";

export function KineticTextDemo() {
  return <KineticText text="KINETIC MOTION VELOCITY" />;
}`
    },
    {
      title: 'Bold Headline Loop',
      description: 'High-contrast looped kinetic statement for stage announcements.',
      preview: () => demos.KineticText(),
      code: `import { KineticText } from "@/components/sarahui/kinetic-text";

export function KineticTextLoop() {
  return <KineticText text="DESIGN • ENGINEER • DELIGHT" speed={4} />;
}`
    }
  ],

  // 70. CoolMode - Parity with Magic UI (Custom Particle)
  CoolMode: [
    {
      title: 'Click Particle Celebration',
      description: 'Interactive particle burst radiating outward on click.',
      preview: () => demos.CoolMode(),
      code: `import { CoolMode } from "@/components/sarahui/cool-mode";

export function CoolModeDemo() {
  return (
    <CoolMode>
      <button className="btn-primary">Click Me</button>
    </CoolMode>
  );
}`
    },
    {
      title: 'Custom Particle',
      description: 'Custom emoji, heart, or star bursts radiating from button clicks.',
      preview: () => demos.CoolMode(),
      code: `import { CoolMode } from "@/components/sarahui/cool-mode";

export function CoolModeCustom() {
  return (
    <CoolMode particle="⭐">
      <button className="btn-primary">Star Burst</button>
    </CoolMode>
  );
}`
    }
  ],

  // 71. PixelImage
  PixelImage: [
    {
      title: 'Retro Pixel Distortion Filter',
      description: 'Dynamic canvas-rendered retro pixelation filter for graphic image reveals.',
      preview: () => demos.PixelImage(),
      code: `import { PixelImage } from "@/components/sarahui/pixel-image";

export function PixelImageDemo() {
  return <PixelImage pixelSize={8} width={280} height={180} />;
}`
    },
    {
      title: 'Fine Grain Pixelation',
      description: 'Fine 4px pixel filter creating subtle mosaic rendering.',
      preview: () => demos.PixelImage(),
      code: `import { PixelImage } from "@/components/sarahui/pixel-image";

export function PixelImageFine() {
  return <PixelImage pixelSize={4} width={280} height={180} />;
}`
    }
  ],

  // 72. PulsatingButton - Parity with Magic UI (Ripple Variant)
  PulsatingButton: [
    {
      title: 'Pulsing Harmonic Glow',
      description: 'Action button with expanding ambient pulse rings.',
      preview: () => demos.PulsatingButton(),
      code: `import { PulsatingButton } from "@/components/sarahui/pulsating-button";

export function PulsatingButtonDemo() {
  return (
    <PulsatingButton pulseColor="#5B3DF5">
      Explore Components
    </PulsatingButton>
  );
}`
    },
    {
      title: 'Ripple Variant',
      description: 'Multiple successive expanding pulse rings emanating continuously.',
      preview: () => demos.PulsatingButton(),
      code: `import { PulsatingButton } from "@/components/sarahui/pulsating-button";

export function PulsatingButtonRipple() {
  return (
    <PulsatingButton variant="ripple" pulseColor="#10B981">
      Live System Active
    </PulsatingButton>
  );
}`
    }
  ],

  // 73. WarpBackground
  WarpBackground: [
    {
      title: '3D Perspective Warp Tunnel',
      description: 'Hyperspace warp tunnel perspective background animation.',
      preview: () => demos.WarpBackground(),
      code: `import { WarpBackground } from "@/components/sarahui/warp-background";

export function WarpBackgroundDemo() {
  return (
    <WarpBackground>
      <h3>Hyperspace Horizon</h3>
    </WarpBackground>
  );
}`
    },
    {
      title: 'Deep Space Warp',
      description: 'Slow cosmic starfield perspective acceleration.',
      preview: () => demos.WarpBackground(),
      code: `import { WarpBackground } from "@/components/sarahui/warp-background";

export function WarpBackgroundDeep() {
  return (
    <WarpBackground speed={0.5}>
      <h3>Deep Space Voyage</h3>
    </WarpBackground>
  );
}`
    }
  ],

  // 74. InteractiveHoverButton
  InteractiveHoverButton: [
    {
      title: 'Expanding Hover Circle',
      description: 'Button with expanding circle background and sliding arrow transition.',
      preview: () => demos.InteractiveHoverButton(),
      code: `import { InteractiveHoverButton } from "@/components/sarahui/interactive-hover-button";

export function InteractiveHoverButtonDemo() {
  return <InteractiveHoverButton label="Get Started Now" />;
}`
    },
    {
      title: 'Inverted Circle Fill',
      description: 'Action button expanding brand colored fill on cursor entry.',
      preview: () => demos.InteractiveHoverButton(),
      code: `import { InteractiveHoverButton } from "@/components/sarahui/interactive-hover-button";

export function InteractiveHoverButtonInverted() {
  return <InteractiveHoverButton variant="brand" label="Deploy Project" />;
}`
    }
  ],

  // 75. AnimatedCircularProgressBar
  AnimatedCircularProgressBar: [
    {
      title: 'Radial Gauge Meter',
      description: 'Animated SVG radial gauge with continuous gradient stroke and centered percentage.',
      preview: () => demos.AnimatedCircularProgressBar(),
      code: `import { AnimatedCircularProgressBar } from "@/components/sarahui/animated-circular-progress-bar";

export function CircularProgressDemo() {
  return <AnimatedCircularProgressBar value={75} gaugePrimaryColor="#5B3DF5" />;
}`
    },
    {
      title: 'High-Value Target',
      description: 'Completion gauge with dual progress track rings.',
      preview: () => demos.AnimatedCircularProgressBar(),
      code: `import { AnimatedCircularProgressBar } from "@/components/sarahui/animated-circular-progress-bar";

export function CircularProgressComplete() {
  return <AnimatedCircularProgressBar value={100} gaugePrimaryColor="#10B981" />;
}`
    }
  ],

  // 76. Backlight - Parity with Magic UI (Image, SVG)
  Backlight: [
    {
      title: 'Image',
      description: 'Soft diffuse colored light aura projecting behind hero photography.',
      preview: () => demos.Backlight(),
      code: `import { Backlight } from "@/components/sarahui/backlight";

export function BacklightImage() {
  return (
    <Backlight color="rgba(91, 61, 245, 0.4)">
      <img src="/hero-preview.png" alt="Hero" />
    </Backlight>
  );
}`
    },
    {
      title: 'SVG',
      description: 'Luminous glowing aura projecting behind vector marks and icons.',
      preview: () => demos.Backlight(),
      code: `import { Backlight } from "@/components/sarahui/backlight";

export function BacklightSVG() {
  return (
    <Backlight color="rgba(0, 229, 255, 0.5)">
      <BrandLogo />
    </Backlight>
  );
}`
    }
  ],

  // 77. GlyphMatrix
  GlyphMatrix: [
    {
      title: 'Cypher Character Matrix Rain',
      description: 'Hacker cypher stream with randomized character mutation and luminous lead glyphs.',
      preview: () => demos.GlyphMatrix(),
      code: `import { GlyphMatrix } from "@/components/sarahui/glyph-matrix";

export function GlyphMatrixDemo() {
  return <GlyphMatrix color="#5B3DF5" speed={1} />;
}`
    },
    {
      title: 'Violet Cyber Stream',
      description: 'Brand violet tinted matrix character rain stream.',
      preview: () => demos.GlyphMatrix(),
      code: `import { GlyphMatrix } from "@/components/sarahui/glyph-matrix";

export function GlyphMatrixViolet() {
  return <GlyphMatrix color="#A020FF" speed={1.5} />;
}`
    }
  ],

  // 78. AnimatedSubscribeButton
  AnimatedSubscribeButton: [
    {
      title: 'Morphing State Subscribe Action',
      description: 'Stateful button morphing between initial CTA and confirmed checkmark status.',
      preview: () => demos.AnimatedSubscribeButton(),
      code: `import { AnimatedSubscribeButton } from "@/components/sarahui/animated-subscribe-button";

export function SubscribeButtonDemo() {
  return (
    <AnimatedSubscribeButton
      initialText="Subscribe"
      subscribedText="Subscribed ✔"
    />
  );
}`
    },
    {
      title: 'Bookmark Toggle Action',
      description: 'Stateful toggle morphing between Bookmark and Bookmarked.',
      preview: () => demos.AnimatedSubscribeButton(),
      code: `import { AnimatedSubscribeButton } from "@/components/sarahui/animated-subscribe-button";

export function SubscribeButtonBookmark() {
  return (
    <AnimatedSubscribeButton
      initialText="Bookmark"
      subscribedText="Saved ✔"
    />
  );
}`
    }
  ],

  // 79. Icon
  Icon: [
    {
      title: 'Symbol Grid',
      description: 'Consistent 24px icon stroke system across semantic primitives.',
      preview: () => demos.Icon(),
      code: `import { Icon } from "@/components/sarahui/icon";

export function IconGrid() {
  return (
    <div>
      <Icon name="spark" size={24} />
      <Icon name="layers" size={24} />
      <Icon name="globe" size={24} />
    </div>
  );
}`
    },
    {
      title: 'Scales Comparison',
      description: 'Standardized ergonomic scales: 16px, 20px, 24px, and 32px.',
      preview: () => html`<div class="demo-wrap" style="align-items:center;">${Icon({name:'spark',size:16,label:'16px'})}${Icon({name:'spark',size:20,label:'20px'})}${Icon({name:'spark',size:24,label:'24px'})}${Icon({name:'spark',size:32,label:'32px'})}</div>`,
      code: `import { Icon } from "@/components/sarahui/icon";

export function IconSizes() {
  return (
    <>
      <Icon name="spark" size={16} />
      <Icon name="spark" size={20} />
      <Icon name="spark" size={24} />
      <Icon name="spark" size={32} />
    </>
  );
}`
    }
  ],

  // 80. Button
  Button: [
    {
      title: 'Primary Action',
      description: 'The default high-emphasis brand action used for primary user goals.',
      preview: () => Button({label:'Create project',icon:'plus',attrs:{'data-s-dialog-open':'create-project'}}),
      code: `import { Button } from "@/components/sarahui/button";

export function ButtonPrimary() {
  return <Button variant="primary">Create project</Button>;
}`
    },
    {
      title: 'Secondary Action',
      description: 'Medium-emphasis action that complements primary calls to action.',
      preview: () => Button({label:'Secondary action',variant:'secondary'}),
      code: `import { Button } from "@/components/sarahui/button";

export function ButtonSecondary() {
  return <Button variant="secondary">Secondary action</Button>;
}`
    },
    {
      title: 'Outline Action',
      description: 'Bordered button with transparent fill for quiet surfaces.',
      preview: () => Button({label:'Outline action',variant:'outline'}),
      code: `import { Button } from "@/components/sarahui/button";

export function ButtonOutline() {
  return <Button variant="outline">Outline action</Button>;
}`
    },
    {
      title: 'Ghost Action',
      description: 'Minimal action with zero border, ideal for toolbars and table rows.',
      preview: () => Button({label:'Ghost action',variant:'ghost'}),
      code: `import { Button } from "@/components/sarahui/button";

export function ButtonGhost() {
  return <Button variant="ghost">Ghost action</Button>;
}`
    },
    {
      title: 'Danger / Destructive',
      description: 'Communicates destructive or irreversible actions such as deletion.',
      preview: () => Button({label:'Delete item',variant:'danger'}),
      code: `import { Button } from "@/components/sarahui/button";

export function ButtonDanger() {
  return <Button variant="danger">Delete item</Button>;
}`
    }
  ],

  // 81. IconButton
  IconButton: [
    {
      title: 'Primary Icon Action',
      description: 'High emphasis square icon action.',
      preview: () => IconButton({icon:'plus',label:'Create project',variant:'primary'}),
      code: `import { IconButton } from "@/components/sarahui/icon-button";

export function IconButtonPrimary() {
  return <IconButton icon="plus" label="Create project" variant="primary" />;
}`
    },
    {
      title: 'Interactive Favorite Toggle',
      description: 'Accessible toggle exposing aria-pressed.',
      preview: () => IconButton({icon:'heart',label:'Save to favorites',attrs:{'data-favorite':true,'aria-pressed':'false'}}),
      code: `import { IconButton } from "@/components/sarahui/icon-button";

export function IconButtonFavorite() {
  return <IconButton icon="heart" label="Save to favorites" aria-pressed={false} />;
}`
    }
  ],

  // 82. ButtonGroup
  ButtonGroup: [
    {
      title: 'Segmented Action Group',
      description: 'Grouped related buttons with connected borders.',
      preview: () => U.ButtonGroup({label:'Editor actions',children:['Preview','Code','Share'].map((label,i)=>Button({label,icon:['grid','code','link'][i],variant:'outline',size:'sm'}))}),
      code: `import { ButtonGroup, Button } from "@/components/sarahui/button";

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">Preview</Button>
      <Button variant="outline">Code</Button>
      <Button variant="outline">Share</Button>
    </ButtonGroup>
  );
}`
    },
    {
      title: 'Icon Action Toolbar',
      description: 'Compact icon button toolbar for media or formatting controls.',
      preview: () => U.ButtonGroup({label:'Format actions',children:[IconButton({icon:'grid',label:'Grid',variant:'outline',size:'sm'}),IconButton({icon:'spark',label:'Spark',variant:'outline',size:'sm'}),IconButton({icon:'settings',label:'Settings',variant:'outline',size:'sm'})]}),
      code: `import { ButtonGroup, IconButton } from "@/components/sarahui/button";

export function ButtonGroupIcons() {
  return (
    <ButtonGroup>
      <IconButton icon="grid" label="Grid" />
      <IconButton icon="spark" label="Spark" />
      <IconButton icon="settings" label="Settings" />
    </ButtonGroup>
  );
}`
    }
  ],

  // 83. Badge
  Badge: [
    {
      title: 'Semantic Tone Showcase',
      description: 'Status badge variations across brand, success, warning, danger, and neutral tones.',
      preview: () => html`<div class="demo-wrap">${['brand','success','warning','danger','neutral'].map(tone=>Badge({tone,label:tone[0].toUpperCase()+tone.slice(1)}))}</div>`,
      code: `import { Badge } from "@/components/sarahui/badge";

export function BadgeTones() {
  return (
    <>
      <Badge tone="brand">Brand</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="danger">Danger</Badge>
    </>
  );
}`
    },
    {
      title: 'Dot Status Indicator',
      description: 'Compact status badge with pulsing operational indicator dot.',
      preview: () => html`<div class="demo-wrap">${Badge({label:'Operational',tone:'success',dot:true})}${Badge({label:'Degraded',tone:'warning',dot:true})}</div>`,
      code: `import { Badge } from "@/components/sarahui/badge";

export function BadgeDot() {
  return <Badge tone="success" dot>Operational</Badge>;
}`
    }
  ],

  // 84. Chip
  Chip: [
    {
      title: 'Removable Filter Tags',
      description: 'Interactive selection chips with dismissal remove button.',
      preview: () => html`<div class="demo-wrap">${['Design Systems','Accessibility','TypeScript'].map((label,i)=>U.Chip({label,removable:true,selected:i===0}))}</div>`,
      code: `import { Chip } from "@/components/sarahui/chip";

export function ChipFilters() {
  return (
    <div className="flex gap-2">
      <Chip label="Design Systems" removable />
      <Chip label="Accessibility" removable />
    </div>
  );
}`
    },
    {
      title: 'Selection Pills',
      description: 'Non-removable toggle chips for category filters.',
      preview: () => html`<div class="demo-wrap">${U.Chip({label:'Active Category',selected:true})}${U.Chip({label:'Inactive'})}</div>`,
      code: `import { Chip } from "@/components/sarahui/chip";

export function ChipSelection() {
  return <Chip label="Selected Pill" selected />;
}`
    }
  ],

  // 85. Avatar
  Avatar: [
    {
      title: 'Online Presence Indicator',
      description: 'Avatar with active real-time presence beacon.',
      preview: () => html`<div class="demo-wrap">${Avatar({name:'Sarah Khan',size:'lg',status:true})}${Avatar({name:'Alex Morgan',tone:'info',status:true})}</div>`,
      code: `import { Avatar } from "@/components/sarahui/avatar";

export function AvatarStatus() {
  return <Avatar name="Sarah Khan" status />;
}`
    },
    {
      title: 'Scales Comparison',
      description: 'Standardized avatar scales: sm (32px), md (40px), and lg (48px).',
      preview: () => html`<div class="demo-wrap" style="align-items:center;">${Avatar({name:'Sarah Khan',size:'sm'})}${Avatar({name:'Sarah Khan',size:'md'})}${Avatar({name:'Sarah Khan',size:'lg'})}</div>`,
      code: `import { Avatar } from "@/components/sarahui/avatar";

export function AvatarSizes() {
  return (
    <>
      <Avatar name="Sarah Khan" size="sm" />
      <Avatar name="Sarah Khan" size="md" />
      <Avatar name="Sarah Khan" size="lg" />
    </>
  );
}`
    }
  ],

  // 86. Card
  Card: [
    {
      title: 'Standard Content Card',
      description: 'Elevated surface container grouping related contextual actions.',
      preview: () => demos.Card(),
      code: `import { Card } from "@/components/sarahui/card";

export function CardDemo() {
  return (
    <Card title="Workspace Overview" description="Manage your team.">
      <p>Card Body</p>
    </Card>
  );
}`
    },
    {
      title: 'Interactive Clickable Card',
      description: 'Card acting as an interactive link with smooth border highlight.',
      preview: () => html`
        <div style="padding:20px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);cursor:pointer;box-shadow:none;transition:border-color 0.2s;">
          <strong style="font-size:14px;display:block;">Explore Analytics →</strong>
          <p class="s-small s-muted" style="margin:4px 0 0;">Review throughput and performance metrics.</p>
        </div>
      `,
      code: `import { Card } from "@/components/sarahui/card";

export function CardClickable() {
  return (
    <Card isInteractive href="/analytics" title="Explore Analytics">
      <p>Review metrics.</p>
    </Card>
  );
}`
    }
  ],

  // 87. DataTable
  DataTable: [
    {
      title: 'Sortable Columns Table',
      description: 'Data table supporting interactive column header sorting.',
      preview: () => demos.DataTable('table-specimen-1'),
      code: `import { DataTable } from "@/components/sarahui/data-table";

export function DataTableDemo() {
  return (
    <DataTable
      columns={[
        { key: "name", label: "Project", sortable: true },
        { key: "status", label: "Status" }
      ]}
      rows={projects}
    />
  );
}`
    },
    {
      title: 'Selectable Row Table',
      description: 'Data table supporting multi-row selection with shift-click support.',
      preview: () => demos.DataTable('table-specimen-2'),
      code: `import { DataTable } from "@/components/sarahui/data-table";

export function DataTableSelectable() {
  return <DataTable selectable columns={cols} rows={data} />;
}`
    }
  ],

  // 88. Accordion
  Accordion: [
    {
      title: 'Single Open Disclosure',
      description: 'Accordion allowing only one open panel at a time.',
      preview: () => demos.Accordion(),
      code: `import { Accordion, AccordionItem } from "@/components/sarahui/accordion";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem title="Can I customize tokens?">
        Yes! All 277 design tokens can be adjusted.
      </AccordionItem>
    </Accordion>
  );
}`
    },
    {
      title: 'Multiple Concurrent Expansion',
      description: 'Accordion allowing multiple sections to remain expanded simultaneously.',
      preview: () => demos.Accordion(),
      code: `import { Accordion, AccordionItem } from "@/components/sarahui/accordion";

export function AccordionMultiple() {
  return (
    <Accordion type="multiple">
      <AccordionItem title="Section One">Content One</AccordionItem>
      <AccordionItem title="Section Two">Content Two</AccordionItem>
    </Accordion>
  );
}`
    }
  ],

  // 89. Progress
  Progress: [
    {
      title: 'Determinate Progress',
      description: 'Progress bar displaying precise percentage completion.',
      preview: () => demos.Progress(),
      code: `import { Progress } from "@/components/sarahui/progress";

export function ProgressDemo() {
  return <Progress value={72} label="Uploading assets" />;
}`
    },
    {
      title: 'Indeterminate Progress',
      description: 'Continuous gradient sweep for unknown completion durations.',
      preview: () => html`<div style="width:100%;max-width:320px;">${Progress({value:null,label:'Processing query'})}</div>`,
      code: `import { Progress } from "@/components/sarahui/progress";

export function ProgressIndeterminate() {
  return <Progress indeterminate label="Processing query" />;
}`
    }
  ],

  // 90. Skeleton
  Skeleton: [
    {
      title: 'Paragraph Loading Lines',
      description: 'Staggered skeleton pulse lines simulating body copy loading.',
      preview: () => demos.Skeleton(),
      code: `import { Skeleton } from "@/components/sarahui/skeleton";

export function SkeletonDemo() {
  return <Skeleton lines={4} />;
}`
    },
    {
      title: 'Card Loading Placeholder',
      description: 'Composite skeleton placeholder framing avatar and header.',
      preview: () => html`
        <div style="width:100%;max-width:320px;display:flex;gap:12px;align-items:center;">
          <div style="width:40px;height:40px;border-radius:50%;background:var(--s-bg-subtle);"></div>
          <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
            <div style="height:12px;width:70%;border-radius:4px;background:var(--s-bg-subtle);"></div>
            <div style="height:10px;width:45%;border-radius:4px;background:var(--s-bg-subtle);"></div>
          </div>
        </div>
      `,
      code: `import { Skeleton } from "@/components/sarahui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex gap-3 items-center">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-2 w-1/2" />
      </div>
    </div>
  );
}`
    }
  ],

  // 91. EmptyState
  EmptyState: [
    {
      title: 'First-Time User Experience',
      description: 'Welcoming empty state prompting the user to create their first project.',
      preview: () => demos.EmptyState(),
      code: `import { EmptyState } from "@/components/sarahui/empty-state";

export function EmptyStateDemo() {
  return (
    <EmptyState
      title="Your next idea starts here"
      description="Create a project to begin."
      actionLabel="Create project"
    />
  );
}`
    },
    {
      title: 'No Search Results Found',
      description: 'Helpful empty state when filters or queries yield zero records.',
      preview: () => html`
        <div style="text-align:center;padding:24px;">
          <strong style="font-size:14px;display:block;">No records found</strong>
          <p class="s-small s-muted" style="margin:4px 0 12px;">Try clearing your active filters or searching another keyword.</p>
          ${Button({label:'Clear filters',size:'sm',variant:'outline'})}
        </div>
      `,
      code: `import { EmptyState } from "@/components/sarahui/empty-state";

export function EmptyStateSearch() {
  return (
    <EmptyState
      title="No records found"
      description="Try clearing your active search filter."
      actionLabel="Clear filters"
    />
  );
}`
    }
  ],

  // 92. Separator
  Separator: [
    {
      title: 'Subtle Content Divider',
      description: 'Thin horizontal divider separating related content sections.',
      preview: () => demos.Separator(),
      code: `import { Separator } from "@/components/sarahui/separator";

export function SeparatorDemo() {
  return <Separator />;
}`
    },
    {
      title: 'Labeled Center Divider',
      description: 'Divider with centered badge text for alternative action options.',
      preview: () => U.Separator({label:'OR CONTINUE WITH'}),
      code: `import { Separator } from "@/components/sarahui/separator";

export function SeparatorLabeled() {
  return <Separator label="OR CONTINUE WITH" />;
}`
    }
  ],

  // 93. Spinner
  Spinner: [
    {
      title: 'Size Variants (Small, Medium, Large)',
      description: 'Standardized spinner sizes matching buttons and cards.',
      preview: () => html`
        <div class="demo-wrap" style="align-items:center;gap:16px;">
          ${U.Spinner({label:'Loading',size:'sm'})}
          ${U.Spinner({label:'Loading',size:'md'})}
          ${U.Spinner({label:'Loading',size:'lg'})}
        </div>
      `,
      code: `import { Spinner } from "@/components/sarahui/spinner";

export function SpinnerSizes() {
  return (
    <>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </>
  );
}`
    },
    {
      title: 'Accessible Indeterminate Indicator',
      description: 'Spinner paired with polite screen reader status announcement.',
      preview: () => demos.Spinner(),
      code: `import { Spinner } from "@/components/sarahui/spinner";

export function SpinnerAccessible() {
  return <Spinner label="Syncing workspace..." />;
}`
    }
  ],

  // 94. Toggle
  Toggle: [
    {
      title: 'Bookmark Toggle',
      description: 'Two-state button with pressed state indication.',
      preview: () => demos.Toggle(),
      code: `import { Toggle } from "@/components/sarahui/toggle";

export function ToggleDemo() {
  return <Toggle icon="heart" label="Bookmark" defaultPressed />;
}`
    },
    {
      title: 'Mute Notifications',
      description: 'Toggle button controlling audio or notification states.',
      preview: () => U.Toggle({label:'Mute notifications',icon:'settings'}),
      code: `import { Toggle } from "@/components/sarahui/toggle";

export function ToggleMute() {
  return <Toggle icon="settings" label="Mute notifications" />;
}`
    }
  ],

  // 95. ToggleGroup
  ToggleGroup: [
    {
      title: 'Single Select Alignment Group',
      description: 'Group of toggles allowing mutually exclusive option selection.',
      preview: () => demos.ToggleGroup(),
      code: `import { ToggleGroup, ToggleGroupItem } from "@/components/sarahui/toggle-group";

export function ToggleGroupDemo() {
  return (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}`
    },
    {
      title: 'Multi-Select Text Formatting',
      description: 'Toggle group allowing multiple concurrent active options (e.g. bold, italic).',
      preview: () => U.ToggleGroup({label:'Formatting',items:[{label:'Bold',pressed:true},{label:'Italic',pressed:true},{label:'Underline'}]}),
      code: `import { ToggleGroup, ToggleGroupItem } from "@/components/sarahui/toggle-group";

export function ToggleGroupMultiple() {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
    </ToggleGroup>
  );
}`
    }
  ],

  // 96. Kbd
  Kbd: [
    {
      title: 'Shortcut Key Combination',
      description: 'Keyboard key symbol display representing hotkey combinations.',
      preview: () => demos.Kbd(),
      code: `import { Kbd } from "@/components/sarahui/kbd";

export function KbdDemo() {
  return (
    <div className="flex gap-1">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  );
}`
    },
    {
      title: 'Escape Key',
      description: 'Single key indication for dialog or menu dismissal.',
      preview: () => U.Kbd({keys:['Esc']}),
      code: `import { Kbd } from "@/components/sarahui/kbd";

export function KbdEscape() {
  return <Kbd>Esc</Kbd>;
}`
    }
  ],

  // 97. AspectRatio
  AspectRatio: [
    {
      title: '16:9 Video Canvas',
      description: 'Locks 16:9 widescreen aspect ratio across responsive viewports.',
      preview: () => demos.AspectRatio(),
      code: `import { AspectRatio } from "@/components/sarahui/aspect-ratio";

export function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9}>
      <img src="/hero.jpg" alt="Hero" className="object-cover w-full h-full" />
    </AspectRatio>
  );
}`
    },
    {
      title: '1:1 Square Thumbnail',
      description: 'Maintains exact 1:1 square ratio for avatar or photo galleries.',
      preview: () => html`<div style="max-width:140px;width:100%;">${U.AspectRatio({ratio:'1/1',children:html`<div style="background:var(--s-bg-brand);color:var(--s-text-brand);display:grid;place-items:center;height:100%;border-radius:8px;font-size:11px;font-weight:600;">1:1 Square</div>`})}</div>`,
      code: `import { AspectRatio } from "@/components/sarahui/aspect-ratio";

export function AspectRatioSquare() {
  return (
    <AspectRatio ratio={1 / 1}>
      <img src="/avatar.jpg" alt="Profile" className="object-cover" />
    </AspectRatio>
  );
}`
    }
  ],

  // 98. Collapsible
  Collapsible: [
    {
      title: 'Smooth Expandable Section',
      description: 'Smooth disclosure container with accessible expanded state.',
      preview: () => demos.Collapsible(),
      code: `import { Collapsible } from "@/components/sarahui/collapsible";

export function CollapsibleDemo() {
  return (
    <Collapsible
      title="Can I use this with any framework?"
      content="Yes! sarahUI works with React, Next.js, and pure HTML."
    />
  );
}`
    },
    {
      title: 'Nested Disclosure',
      description: 'Collapsible panel embedded inside a card for secondary parameters.',
      preview: () => demos.Collapsible(),
      code: `import { Collapsible } from "@/components/sarahui/collapsible";

export function CollapsibleNested() {
  return (
    <Collapsible title="Advanced Network Settings" defaultOpen={false}>
      <p>Configure custom DNS and HTTP proxy endpoints.</p>
    </Collapsible>
  );
}`
    }
  ],

  // 99. Checkbox
  Checkbox: [
    {
      title: 'Interactive Selection',
      description: 'Independent selection control supporting checked, unchecked, and disabled.',
      preview: () => demos.Checkbox('chk-specimen'),
      code: `import { Checkbox } from "@/components/sarahui/checkbox";

export function CheckboxDemo() {
  return (
    <div className="space-y-2">
      <Checkbox label="Product updates" defaultChecked />
      <Checkbox label="Community newsletter" />
      <Checkbox label="Organization security" disabled defaultChecked />
    </div>
  );
}`
    },
    {
      title: 'Validation Error State',
      description: 'Checkbox highlighting required policy agreement before proceeding.',
      preview: () => html`
        <div style="display:flex;align-items:center;gap:8px;">
          <input type="checkbox" style="accent-color:var(--s-color-red-500);" />
          <span style="font-size:13px;color:var(--s-color-red-500);">You must accept the terms to continue</span>
        </div>
      `,
      code: `import { Checkbox } from "@/components/sarahui/checkbox";

export function CheckboxError() {
  return <Checkbox label="Accept terms" required error="Required field" />;
}`
    }
  ],

  // 100. Radio
  Radio: [
    {
      title: 'Radio Group',
      description: 'Mutually exclusive choices with keyboard navigation support.',
      preview: () => demos.Radio('rad-specimen'),
      code: `import { RadioGroup, Radio } from "@/components/sarahui/radio";

export function RadioDemo() {
  return (
    <RadioGroup name="billing" defaultValue="monthly">
      <Radio value="monthly" label="Monthly billing" />
      <Radio value="yearly" label="Yearly billing (Save 20%)" />
    </RadioGroup>
  );
}`
    },
    {
      title: 'Disabled Option',
      description: 'Radio group featuring locked or unavailable plan tiers.',
      preview: () => html`
        <div style="display:flex;gap:16px;">
          <label style="font-size:13px;display:flex;align-items:center;gap:6px;"><input type="radio" name="plan" checked /> Standard</label>
          <label style="font-size:13px;display:flex;align-items:center;gap:6px;opacity:0.5;"><input type="radio" name="plan" disabled /> Enterprise (Waitlist)</label>
        </div>
      `,
      code: `import { RadioGroup, Radio } from "@/components/sarahui/radio";

export function RadioDisabled() {
  return (
    <RadioGroup name="plan" defaultValue="std">
      <Radio value="std" label="Standard" />
      <Radio value="ent" label="Enterprise (Waitlist)" disabled />
    </RadioGroup>
  );
}`
    }
  ],

  // 101. Input
  Input: [
    {
      title: 'Default with Leading Icon',
      description: 'Text input with leading icon, label, and contextual helper text.',
      preview: () => Input({id:'variant-input-email',label:'Email address',type:'email',icon:'mail',attrs:{placeholder:'hello@yourstudio.com'},helper:'A good place to stay connected.'}),
      code: `import { Input } from "@/components/sarahui/input";

export function InputDemo() {
  return (
    <Input
      label="Email address"
      type="email"
      icon="mail"
      placeholder="hello@yourstudio.com"
      helper="A good place to stay connected."
    />
  );
}`
    },
    {
      title: 'Validation Error State',
      description: 'Exposes aria-invalid="true" with visual red indicator and error text.',
      preview: () => Input({id:'variant-input-error',label:'Workspace URL',error:'Use at least 3 characters.',attrs:{value:'ab'}}),
      code: `import { Input } from "@/components/sarahui/input";

export function InputError() {
  return (
    <Input
      label="Workspace URL"
      error="Use at least 3 characters."
      defaultValue="ab"
    />
  );
}`
    },
    {
      title: 'Disabled State',
      description: 'Non-editable input with muted visual appearance.',
      preview: () => Input({id:'variant-input-disabled',label:'Organization ID',attrs:{value:'ORG-98214-X',disabled:true}}),
      code: `import { Input } from "@/components/sarahui/input";

export function InputDisabled() {
  return <Input label="Organization ID" defaultValue="ORG-98214-X" disabled />;
}`
    }
  ],

  // 102. Textarea
  Textarea: [
    {
      title: 'Standard Multiline Input',
      description: 'Multiline text input with label and character limit counter.',
      preview: () => U.Textarea({id:'var-textarea-1',label:'Project brief',helper:'A sentence or two is a great place to start.',attrs:{placeholder:'What are you creating?',maxlength:500}}),
      code: `import { Textarea } from "@/components/sarahui/textarea";

export function TextareaDemo() {
  return (
    <Textarea
      label="Project brief"
      placeholder="What are you creating?"
      helper="A sentence or two is a great place to start."
    />
  );
}`
    },
    {
      title: 'Disabled Multiline Input',
      description: 'Read-only textarea for displaying system logs or licenses.',
      preview: () => U.Textarea({id:'var-textarea-2',label:'System logs',value:'Audit log recorded at 10:24:00 AM UTC.\nIntegrity verified: OK',attrs:{disabled:true,rows:3}}),
      code: `import { Textarea } from "@/components/sarahui/textarea";

export function TextareaDisabled() {
  return <Textarea label="System logs" defaultValue="Audit log verified: OK" disabled />;
}`
    }
  ],

  // 103. Select
  Select: [
    {
      title: 'Workspace Selector',
      description: 'Accessible native select with custom styling.',
      preview: () => U.Select({id:'var-select-1',label:'Workspace',options:['Sarah’s studio','Personal','Design team'],helper:'Choose where your project belongs.'}),
      code: `import { Select } from "@/components/sarahui/select";

export function SelectDemo() {
  return (
    <Select
      label="Workspace"
      options={["Sarah's studio", "Personal", "Design team"]}
    />
  );
}`
    },
    {
      title: 'Disabled Select',
      description: 'Disabled state for read-only configurations.',
      preview: () => U.Select({id:'var-select-2',label:'Region',options:['us-east-1 (Locked)'],attrs:{disabled:true}}),
      code: `import { Select } from "@/components/sarahui/select";

export function SelectDisabled() {
  return <Select label="Region" options={["us-east-1 (Locked)"]} disabled />;
}`
    }
  ],

  // 104. Switch
  Switch: [
    {
      title: 'Checked Toggle',
      description: 'Immediate on state with active accent fill.',
      preview: () => Switch({id:'var-switch-on',label:'Real-time sync',description:'Updates stream instantly.',checked:true}),
      code: `import { Switch } from "@/components/sarahui/switch";

export function SwitchChecked() {
  return <Switch label="Real-time sync" defaultChecked />;
}`
    },
    {
      title: 'Unchecked Toggle',
      description: 'Default off state.',
      preview: () => Switch({id:'var-switch-off',label:'Weekly digest',description:'A summary sent Mondays.'}),
      code: `import { Switch } from "@/components/sarahui/switch";

export function SwitchUnchecked() {
  return <Switch label="Weekly digest" defaultChecked={false} />;
}`
    }
  ],

  // 105. Slider
  Slider: [
    {
      title: 'Continuous Value Slider',
      description: 'Interactive slider with live output value synchronization.',
      code: `import { Slider } from "@/components/sarahui/slider";

export function SliderDemo() {
  return <Slider label="Interface density" defaultValue={64} />;
}`
    },
    {
      title: 'Stepped Interval Range',
      description: 'Discrete stepping intervals for calibrated tuning.',
      code: `import { Slider } from "@/components/sarahui/slider";

export function SliderStepped() {
  return <Slider label="Step interval" defaultValue={50} step={10} />;
}`
    }
  ],

  // 106. Tabs
  Tabs: [
    {
      title: 'Horizontal Tabs',
      description: 'Accessible tab switcher with keyboard arrow navigation.',
      code: `import { Tabs, TabList, TabTrigger, TabContent } from "@/components/sarahui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabList>
        <TabTrigger value="overview">Overview</TabTrigger>
        <TabTrigger value="activity">Activity</TabTrigger>
      </TabList>
      <TabContent value="overview">Overview Content</TabContent>
      <TabContent value="activity">Activity Content</TabContent>
    </Tabs>
  );
}`
    },
    {
      title: 'Segmented Pill Tabs',
      description: 'Pill styled tab bar for high-contrast view switching.',
      code: `import { Tabs } from "@/components/sarahui/tabs";

export function TabsPill() {
  return <Tabs variant="pill" defaultValue="preview" />;
}`
    }
  ],

  // 107. Breadcrumb
  Breadcrumb: [
    {
      title: 'Slash Separator',
      description: 'Hierarchical navigation path with clean slash dividers.',
      preview: () => demos.Breadcrumb(),
      code: `import { Breadcrumb, BreadcrumbItem } from "@/components/sarahui/breadcrumb";

export function BreadcrumbDemo() {
  return (
    <Breadcrumb separator="/">
      <BreadcrumbItem href="/workspace">Workspace</BreadcrumbItem>
      <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
      <BreadcrumbItem active>Design System</BreadcrumbItem>
    </Breadcrumb>
  );
}`
    },
    {
      title: 'Chevron Arrow Separator',
      description: 'Directional chevron indicators linking ancestors.',
      preview: () => demos.Breadcrumb(),
      code: `import { Breadcrumb } from "@/components/sarahui/breadcrumb";

export function BreadcrumbChevron() {
  return <Breadcrumb separator="chevron" items={items} />;
}`
    }
  ],

  // 108. Pagination
  Pagination: [
    {
      title: 'Standard Page Numbers',
      description: 'Numeric pagination bar with current page focus state.',
      preview: () => demos.Pagination(),
      code: `import { Pagination } from "@/components/sarahui/pagination";

export function PaginationDemo() {
  return <Pagination totalPages={5} currentPage={2} />;
}`
    },
    {
      title: 'Compact Previous / Next',
      description: 'Streamlined pagination for mobile tables and feeds.',
      preview: () => html`
        <div style="display:flex;align-items:center;gap:12px;">
          ${Button({label:'← Previous',variant:'outline',size:'sm'})}
          <span class="s-small s-muted">Page 2 of 10</span>
          ${Button({label:'Next →',variant:'outline',size:'sm'})}
        </div>
      `,
      code: `import { Pagination } from "@/components/sarahui/pagination";

export function PaginationCompact() {
  return <Pagination variant="compact" totalPages={10} currentPage={2} />;
}`
    }
  ],

  // 109. NavItem
  NavItem: [
    {
      title: 'With Badge Counter',
      description: 'Navigation link displaying active record counter badge.',
      preview: () => demos.NavItem(),
      code: `import { NavItem } from "@/components/sarahui/nav-item";

export function NavItemDemo() {
  return (
    <NavItem href="#components" icon="layers" badge="120">
      Components
    </NavItem>
  );
}`
    },
    {
      title: 'Active Pill State',
      description: 'Prominent highlighted surface for current route navigation.',
      preview: () => demos.NavItem(),
      code: `import { NavItem } from "@/components/sarahui/nav-item";

export function NavItemActive() {
  return <NavItem active href="#overview" icon="grid">Overview</NavItem>;
}`
    }
  ],

  // 110. Menu
  Menu: [
    {
      title: 'Contextual Action Menu',
      description: 'Floating dropdown menu with action items and keyboard navigation.',
      code: `import { Menu, MenuItem } from "@/components/sarahui/menu";

export function MenuDemo() {
  return (
    <Menu trigger="Project actions">
      <MenuItem icon="folder">View workspace</MenuItem>
      <MenuItem icon="link">Copy page link</MenuItem>
    </Menu>
  );
}`
    },
    {
      title: 'Destructive Menu Item',
      description: 'Menu highlighting danger actions in semantic red.',
      code: `import { Menu, MenuItem } from "@/components/sarahui/menu";

export function MenuDanger() {
  return (
    <Menu trigger="Options">
      <MenuItem icon="trash" danger>Delete record</MenuItem>
    </Menu>
  );
}`
    }
  ],

  // 111. CommandPalette
  CommandPalette: [
    {
      title: 'Keyboard Shortcut Trigger',
      description: 'Fast fuzzy search palette opened with Cmd+K or Ctrl+K.',
      preview: () => demos.CommandPalette(),
      code: `import { CommandPalette } from "@/components/sarahui/command-palette";

export function CommandPaletteDemo() {
  return (
    <CommandPalette shortcut="⌘K" placeholder="Search documentation..." />
  );
}`
    },
    {
      title: 'Pre-Filtered Command Group',
      description: 'Command palette grouping actions into Navigation, Actions, and Settings.',
      preview: () => demos.CommandPalette(),
      code: `import { CommandPalette } from "@/components/sarahui/command-palette";

export function CommandPaletteGrouped() {
  return <CommandPalette groups={commandGroups} />;
}`
    }
  ],

  // 112. Alert
  Alert: [
    {
      title: 'Informational Notice',
      description: 'Polite system notice communicating operational status.',
      preview: () => U.Alert({title:'All systems operational',description:'Your workspace is synchronized.'}),
      code: `import { Alert } from "@/components/sarahui/alert";

export function AlertInfo() {
  return (
    <Alert tone="info" title="All systems operational">
      Your workspace is synchronized.
    </Alert>
  );
}`
    },
    {
      title: 'Warning Alert',
      description: 'Cautionary notice highlighting potential risks or action requirements.',
      preview: () => U.Alert({title:'Approaching storage quota',description:'Workspace is at 88% capacity.',tone:'warning'}),
      code: `import { Alert } from "@/components/sarahui/alert";

export function AlertWarning() {
  return (
    <Alert tone="warning" title="Approaching storage quota">
      Workspace is at 88% capacity.
    </Alert>
  );
}`
    },
    {
      title: 'Danger Alert',
      description: 'Urgent notice communicating errors or failed transactions.',
      preview: () => U.Alert({title:'Deployment failed',description:'Build error: syntax mismatch on line 42.',tone:'danger'}),
      code: `import { Alert } from "@/components/sarahui/alert";

export function AlertDanger() {
  return (
    <Alert tone="danger" title="Deployment failed">
      Build error encountered.
    </Alert>
  );
}`
    }
  ],

  // 113. Dialog
  Dialog: [
    {
      title: 'Confirmation Modal',
      description: 'Native modal dialog with focus trap and backdrop dismissal.',
      preview: () => demos.Dialog(),
      code: `import { Dialog, DialogContent } from "@/components/sarahui/dialog";

export function DialogDemo() {
  return (
    <Dialog trigger="Create project">
      <DialogContent title="New project">
        <p>Enter project details.</p>
      </DialogContent>
    </Dialog>
  );
}`
    },
    {
      title: 'Form Dialog Modal',
      description: 'Modal housing a structured form with submission buttons.',
      preview: () => demos.Dialog(),
      code: `import { Dialog } from "@/components/sarahui/dialog";

export function DialogForm() {
  return <Dialog title="Create Workspace" formAction="/api/create" />;
}`
    }
  ],

  // 114. Tooltip
  Tooltip: [
    {
      title: 'Supplementary Context',
      description: 'Appears on hover or keyboard focus; dismisses on Escape.',
      code: `import { Tooltip } from "@/components/sarahui/tooltip";

export function TooltipDemo() {
  return (
    <Tooltip text="One change. A consistent system.">
      <button>About tokens</button>
    </Tooltip>
  );
}`
    },
    {
      title: 'Keyboard Shortcut Tooltip',
      description: 'Displays contextual hotkey shortcuts in the tooltip popover.',
      code: `import { Tooltip } from "@/components/sarahui/tooltip";

export function TooltipShortcut() {
  return (
    <Tooltip text="Search library" shortcut="⌘K">
      <button>Search</button>
    </Tooltip>
  );
}`
    }
  ],

  // 115. Toast
  Toast: [
    {
      title: 'Success Notification',
      description: 'Polite announcement toast with automatic pause on hover or focus.',
      preview: () => demos.Toast(),
      code: `import { Toast } from "@/components/sarahui/toast";

export function ToastSuccess() {
  const notify = () => {
    Toast.success("Changes published live!");
  };
  return <button onClick={notify}>Publish</button>;
}`
    },
    {
      title: 'Warning Alert Toast',
      description: 'Notice toast alerting users to non-critical updates.',
      preview: () => demos.Toast(),
      code: `import { Toast } from "@/components/sarahui/toast";

export function ToastWarning() {
  const notify = () => {
    Toast.warning("Network latency detected.");
  };
  return <button onClick={notify}>Check Status</button>;
}`
    }
  ],

  // 116. Drawer
  Drawer: [
    {
      title: 'Slide-over Drawer Modal',
      description: 'Sliding modal drawer extending from viewport edge with backdrop blur.',
      code: `import { Drawer } from "@/components/sarahui/drawer";

export function DrawerDemo() {
  return (
    <Drawer title="Project Drawer" trigger="Open Drawer">
      <p>Drawer content panel with native focus containment.</p>
    </Drawer>
  );
}`
    },
    {
      title: 'Slide from Bottom',
      description: 'Mobile sheet style drawer sliding upward from screen bottom.',
      preview: () => html`<div class="demo-wrap">${Button({label:'Open Bottom Sheet',variant:'outline'})}</div>`,
      code: `import { Drawer } from "@/components/sarahui/drawer";

export function DrawerBottom() {
  return <Drawer position="bottom" title="Mobile Actions" />;
}`
    }
  ],

  // 117. Popover
  Popover: [
    {
      title: 'Anchored Floating Popover',
      description: 'Contextual popover anchored to a trigger button with dismissal.',
      code: `import { Popover } from "@/components/sarahui/popover";

export function PopoverDemo() {
  return (
    <Popover trigger="View options">
      <div className="p-4">
        <h4>Options</h4>
        <p>Adjust contextual preferences.</p>
      </div>
    </Popover>
  );
}`
    },
    {
      title: 'Form Popover',
      description: 'Popover housing quick inline inputs and action buttons.',
      code: `import { Popover } from "@/components/sarahui/popover";

export function PopoverForm() {
  return (
    <Popover trigger="Edit Name">
      <input placeholder="Enter new name" />
    </Popover>
  );
}`
    }
  ],

  // 118. Sheet
  Sheet: [
    {
      title: 'Slide-Out Sheet Drawer',
      description: 'Sliding modal sheet panel from right, left, top, or bottom edge.',
      code: `import { Sheet } from "@/components/sarahui/sheet";

export function SheetDemo() {
  return (
    <Sheet id="app-sheet" title="Quick Navigation" position="right">
      <p>Sheet body content.</p>
    </Sheet>
  );
}`
    },
    {
      title: 'Left Navigation Sheet',
      description: 'Mobile navigation drawer sliding in from the left edge.',
      code: `import { Sheet } from "@/components/sarahui/sheet";

export function SheetLeft() {
  return <Sheet position="left" title="Main Navigation" />;
}`
    }
  ],

  // 119. ContextMenu
  ContextMenu: [
    {
      title: 'Right-Click Context Menu',
      description: 'Contextual floating action menu positioned at cursor coordinates.',
      code: `import { ContextMenu } from "@/components/sarahui/context-menu";

export function ContextMenuDemo() {
  return (
    <ContextMenu trigger={<div>Right click me</div>}>
      <item>Copy</item>
      <item>Inspect</item>
    </ContextMenu>
  );
}`
    },
    {
      title: 'Menu with Danger Action',
      description: 'Context menu including a highlighted delete action.',
      code: `import { ContextMenu } from "@/components/sarahui/context-menu";

export function ContextMenuDanger() {
  return (
    <ContextMenu trigger={<div>Right click item</div>}>
      <item danger>Delete Item</item>
    </ContextMenu>
  );
}`
    }
  ],

  // 120. HoverCard
  HoverCard: [
    {
      title: 'User Profile Preview',
      description: 'Rich popover card appearing smoothly when hovering over elements.',
      preview: () => demos.HoverCard(),
      code: `import { HoverCard } from "@/components/sarahui/hover-card";

export function HoverCardDemo() {
  return (
    <HoverCard trigger={<a href="#profile">@sarahkhan</a>}>
      <div className="p-4">
        <h4>Sarah Khan</h4>
        <p>Design Engineer at MASARA X</p>
      </div>
    </HoverCard>
  );
}`
    },
    {
      title: 'Link OpenGraph Preview',
      description: 'Rich link preview card displaying destination page metadata on hover.',
      preview: () => demos.HoverCard(),
      code: `import { HoverCard } from "@/components/sarahui/hover-card";

export function HoverCardLink() {
  return (
    <HoverCard trigger={<a href="#docs">Documentation</a>}>
      <p>Explore 120 components and 277 design tokens.</p>
    </HoverCard>
  );
}`
    }
  ]
};

const info={
  // Base UI - Display & Layout
  Icon:['Layout & Display','A consistent stroke system. Decorative by default; name meaningful icons.'],
  Button:['Layout & Display','Five visual priorities, three sizes, and thoughtful loading states.'],
  IconButton:['Layout & Display','Compact actions, accessible names, and generous targets.'],
  ButtonGroup:['Layout & Display','Related actions grouped with individual focus and labels.'],
  Badge:['Layout & Display','Status communicated through text and color together.'],
  Chip:['Layout & Display','Selected filters, categories, and removable choices.'],
  Avatar:['Layout & Display','Privacy-friendly initials, sizes, and optional presence.'],
  Card:['Layout & Display','A quiet container with intentional spacing and hierarchy.'],
  DataTable:['Layout & Display','Semantic tables with numeric sorting and mixed row selection.'],
  Accordion:['Layout & Display','Progressive disclosure using native details and summary.'],
  Progress:['Layout & Display','Native determinate progress with a visible label and value.'],
  Skeleton:['Layout & Display','Calm loading placeholders that respect reduced motion.'],
  EmptyState:['Layout & Display','A helpful explanation and a useful next step.'],
  Separator:['Layout & Display','A subtle pause between groups, optionally labeled.'],
  Spinner:['Layout & Display','Named loading indicators and a decorative button option.'],
  Toggle:['Layout & Display','A two-state button communicating pressed states.'],
  ToggleGroup:['Layout & Display','Segmented group of two-state buttons for single or multiple choice.'],
  Kbd:['Layout & Display','Displays keyboard keys and shortcuts with physical keycap depth.'],
  AspectRatio:['Layout & Display','Guarantees responsive aspect ratios for media and interactive embeds.'],
  Collapsible:['Layout & Display','Smooth animated disclosure container with accessible state.'],

  // Base UI - Forms & Inputs
  Input:['Forms & Inputs','Visible labels, helpful context, and explicit error messages.'],
  Textarea:['Forms & Inputs','A little more room for detail. Resizable and ready for native forms.'],
  Select:['Forms & Inputs','Native keyboard, touch, and platform accessibility behavior.'],
  Checkbox:['Forms & Inputs','Independent choices with full labels and mixed selection support.'],
  Radio:['Forms & Inputs','One choice from a related group, with native arrow key navigation.'],
  Switch:['Forms & Inputs','An immediate on or off control, with native checkbox behavior.'],
  Slider:['Forms & Inputs','Numeric input with a visible output and keyboard control.'],

  // Base UI - Navigation
  Tabs:['Navigation','Linked panels with arrow keys, Home, End, and roving focus.'],
  Breadcrumb:['Navigation','A clear path back, with an explicitly announced current page.'],
  Pagination:['Navigation','Previous, next, and current page. Connect events to your data.'],
  NavItem:['Navigation','Consistent navigation, optional counts, and active states.'],
  Menu:['Navigation','Contextual actions, arrow keys, Escape, and outside dismissal.'],
  CommandPalette:['Navigation','Search, filter, and navigate without leaving the keyboard.'],

  // Base UI - Feedback & Overlays
  Alert:['Feedback & Overlays','Contextual feedback with a title, detail, and supporting icon.'],
  Dialog:['Feedback & Overlays','Native modal focus containment, Escape, and focus restoration.'],
  Drawer:['Feedback & Overlays','Sliding modal drawer with native focus trap and backdrop blur.'],
  Popover:['Feedback & Overlays','Floating, anchored content panel with outside click dismissal.'],
  Sheet:['Feedback & Overlays','Slide-out drawer panel from right, left, top, or bottom edges.'],
  Tooltip:['Feedback & Overlays','Supplementary context on hover or focus. Dismiss with Escape.'],
  Toast:['Feedback & Overlays','Polite announcements; the timer pauses on hover or focus.'],
  ContextMenu:['Feedback & Overlays','Right-click contextual floating action menu.'],
  HoverCard:['Feedback & Overlays','Rich contextual preview popover appearing on element hover.'],

  // Animated Components
  Marquee:['Components','Infinite smooth auto-scrolling marquee ticker with hover pause.'],
  Terminal:['Components','Interactive macOS styled code terminal with typing command execution.'],
  HeroVideoDialog:['Components','Hero video thumbnail trigger with pulsing play button and accessible modal lightbox.'],
  BentoGrid:['Components','Responsive Bento-box grid layout with hover elevation and contextual cards.'],
  AnimatedList:['Components','Staggered animated notification stack with smooth entrance physics.'],
  Dock:['Components','Mac-style floating dock with icon magnification on hover.'],
  Globe:['Components','Interactive canvas-rendered 3D wireframe vector spinning globe.'],
  TweetCard:['Components','High-fidelity social post card with engagement stats and verified badge.'],
  OrbitingCircles:['Components','Concentric orbital tracks rotating nested elements in 3D perspective.'],
  AvatarCircles:['Components','Overlapping avatar cluster displaying active members and excess counts.'],
  IconCloud:['Components','Interactive 3D Fibonacci sphere of rotating icons with mouse drag control.'],
  Lens:['Components','Interactive magnifying loupe that zooms in on high-detail card areas.'],
  Pointer:['Components','Multiplayer real-time live cursor badge with customizable name and color.'],
  SmoothCursor:['Components','Fluid spring-physics cursor follower creating a responsive pointer trail.'],
  ProgressiveBlur:['Components','Multi-stop progressive gradient backdrop blur filter.'],
  DottedMap:['Components','Minimalist dotted world vector map with pulsating geographic location markers.'],

  // Special Effects
  AnimatedBeam:['Special Effects','Animated curved SVG beam connecting nodes with radiant gradient flow.'],
  BorderBeam:['Special Effects','Luminous glowing gradient beam smoothly tracing around container borders.'],
  ShineBorder:['Special Effects','Animated multi-color gradient rim highlighting card borders.'],
  MagicCard:['Special Effects','Spotlight radial gradient following cursor movements across the surface.'],
  GlareHover:['Special Effects','Holographic specular glare reflection tracking cursor hover across card surfaces.'],
  Meteors:['Special Effects','Atmospheric meteor streaks showering through background surfaces.'],
  Confetti:['Special Effects','Interactive celebratory confetti particle burst on user click.'],
  Particles:['Special Effects','Interactive background particle field rendered on canvas.'],
  AnimatedThemeToggler:['Special Effects','Smooth circular mask view-transition theme switcher with sun and moon icons.'],

  // Animations
  BlurFade:['Animations','Smooth blur-to-focus entrance transition with gentle translation.'],

  // Text Animations
  TextAnimate:['Text Animations','Staggered fluid character entrance with configurable fade, slide, and blur effects.'],
  TypingAnimation:['Text Animations','Realistic typewriter animation with blinking cursor for engaging slogans.'],
  LineShadowText:['Text Animations','Layered 3D isometric sharp cast shadow typography.'],
  AuroraText:['Text Animations','Northern lights aurora borealis ambient color wave typography.'],
  VideoText:['Text Animations','High-impact headline typography filled dynamically with an underlying video texture.'],
  NumberTicker:['Text Animations','Fluid numeric counter animation that smoothly counts up to any target.'],
  AnimatedShinyText:['Text Animations','High-end shimmering metallic light beam sweeping across text.'],
  AnimatedGradientText:['Text Animations','Continuous multi-stop radiant chromatic wave across typography.'],
  TextReveal:['Text Animations','Progressive scroll and view-triggered gradient mask text reveal.'],
  DiaTextReveal:['Text Animations','High-impact diagonal gradient wipe transition revealing headline typography.'],
  HyperText:['Text Animations','Random character scrambling decoding animation on hover.'],
  WordRotate:['Text Animations','Smooth vertical text switcher cycling through key terms.'],
  ScrollBasedVelocity:['Text Animations','Scroll-accelerated marquee ticker whose speed scales with scroll velocity.'],
  SparklesText:['Text Animations','Heading typography decorated with glittering dynamic star sparkles.'],
  MorphingText:['Text Animations','Smooth SVG goo filter liquid text morphing transitions.'],
  SpinningText:['Text Animations','Circular rotating typography spinning continuously along an SVG orbital path.'],
  Highlighter:['Text Animations','Animated hand-drawn highlighter marker stroke emphasizing key phrases.'],
  Text3DFlip:['Text Animations','3D perspective card-flip animation alternating between front and back labels.'],

  // Device Mocks
  Safari:['Device Mocks','macOS Safari browser mockup window with realistic address bar and traffic lights.'],
  Iphone:['Device Mocks','High-fidelity iPhone device frame with dynamic island and sleek hardware bezel.'],
  Android:['Device Mocks','Pixel-accurate Android smartphone mockup frame with punch-hole camera.'],

  // Buttons
  RainbowButton:['Buttons','Continuous multi-color chromatic gradient button with smooth animation.'],
  ShimmerButton:['Buttons','Luminous shimmer beam gliding continuously around the button perimeter.'],
  RippleButton:['Buttons','Interactive button generating expanding wave ripples from user click coordinates.'],

  // Backgrounds
  FlickeringGrid:['Backgrounds','High-performance interactive flickering matrix grid rendered on canvas.'],
  AnimatedGridPattern:['Backgrounds','Animated matrix grid with randomly shimmering dynamic squares.'],
  RetroGrid:['Backgrounds','Perspective 3D retro grid floor with infinite scrolling lines.'],
  Ripple:['Backgrounds','Concentric ambient pulsing circle waves radiating outward.'],
  DotPattern:['Backgrounds','Dotted matrix background pattern with smooth radial falloff.'],
  GridPattern:['Backgrounds','Geometric SVG grid background pattern with customizable accent squares.'],
  HexagonPattern:['Backgrounds','Geometric honeycomb hexagonal tessellation vector background pattern.'],
  StripedPattern:['Backgrounds','Customizable angled linear striped pattern background.'],
  InteractiveGridPattern:['Backgrounds','Interactive vector grid pattern where individual cells illuminate on hover.'],
  LightRays:['Backgrounds','Volumetric atmospheric god rays oscillating smoothly across backgrounds.'],
  NoiseTexture:['Backgrounds','Tactile SVG fractal noise texture overlay adding physical depth to surfaces.'],
  Floating3DParticles:['Backgrounds','Depth-projected 3D perspective particle canvas with smooth orbital drift.'],

  // Community
  ShinyButton:['Community','Action button with continuous luminous sheen pass sweeping across its surface.'],
  FileTree:['Community','Interactive hierarchical file and folder directory tree with keyboard navigation.'],
  CodeComparison:['Community','Side-by-side or stacked code comparison container with syntax layout.'],
  ScrollProgress:['Community','Progress indicator pinned at top of viewport tracking scroll depth.'],
  NeonGradientCard:['Community','High-intensity chromatic neon glowing border card.'],
  ComicText:['Community','Retro pop-art comic book typography with halftone dot shading and bold outlines.'],
  KineticText:['Community','Dynamic kinetic typography flowing smoothly with momentum-reactive velocity.'],
  CoolMode:['Community','Celebratory multi-particle burst explosion on click.'],
  PixelImage:['Community','Retro pixel distortion canvas filter with interactive resolution calibration.'],
  PulsatingButton:['Community','Button with smooth continuous harmonic pulsating glow rings.'],
  WarpBackground:['Community','Hyperspace 3D perspective warp tunnel background.'],
  InteractiveHoverButton:['Community','Interactive button with expanding circle fill and sliding directional arrow.'],
  AnimatedCircularProgressBar:['Community','Animated radial gauge progress indicator with gradient stroke and centered value.'],
  GlyphMatrix:['Community','Hacker-style random character cypher stream with glowing lead glyphs.'],
  Backlight:['Community','Ambient colored light aura radiating softly behind foreground containers.'],
  AnimatedSubscribeButton:['Community','Morphing subscription button that smoothly transitions state with checkmark.']
};

export const catalogOrder = [
  // Components
  'Marquee', 'Terminal', 'HeroVideoDialog', 'BentoGrid', 'AnimatedList', 'Dock', 'Globe', 'TweetCard', 'OrbitingCircles', 'AvatarCircles', 'IconCloud', 'Lens', 'Pointer', 'SmoothCursor', 'ProgressiveBlur', 'DottedMap',
  // Special Effects
  'AnimatedBeam', 'BorderBeam', 'ShineBorder', 'MagicCard', 'GlareHover', 'Meteors', 'Confetti', 'Particles', 'AnimatedThemeToggler',
  // Animations
  'BlurFade',
  // Text Animations
  'TextAnimate', 'TypingAnimation', 'LineShadowText', 'AuroraText', 'VideoText', 'NumberTicker', 'AnimatedShinyText', 'AnimatedGradientText', 'TextReveal', 'DiaTextReveal', 'HyperText', 'WordRotate', 'ScrollBasedVelocity', 'SparklesText', 'MorphingText', 'SpinningText', 'Highlighter', 'Text3DFlip',
  // Device Mocks
  'Safari', 'Iphone', 'Android',
  // Buttons
  'RainbowButton', 'ShimmerButton', 'RippleButton',
  // Backgrounds
  'FlickeringGrid', 'AnimatedGridPattern', 'RetroGrid', 'Ripple', 'DotPattern', 'GridPattern', 'HexagonPattern', 'StripedPattern', 'InteractiveGridPattern', 'LightRays', 'NoiseTexture', 'Floating3DParticles',
  // Community
  'ShinyButton', 'FileTree', 'CodeComparison', 'ScrollProgress', 'NeonGradientCard', 'ComicText', 'KineticText', 'CoolMode', 'PixelImage', 'PulsatingButton', 'WarpBackground', 'InteractiveHoverButton', 'AnimatedCircularProgressBar', 'Backlight', 'GlyphMatrix', 'AnimatedSubscribeButton',
  // Forms & Inputs
  'Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Switch', 'Slider',
  // Navigation
  'Tabs', 'Breadcrumb', 'Pagination', 'NavItem', 'Menu', 'CommandPalette',
  // Feedback & Overlays
  'Alert', 'Dialog', 'Tooltip', 'Toast', 'Drawer', 'Popover', 'Sheet', 'ContextMenu', 'HoverCard',
  // Layout & Display
  'Icon', 'Button', 'IconButton', 'ButtonGroup', 'Badge', 'Chip', 'Avatar', 'Card', 'DataTable', 'Accordion', 'Progress', 'Skeleton', 'EmptyState', 'Separator', 'Spinner', 'Toggle', 'ToggleGroup', 'Kbd', 'AspectRatio', 'Collapsible'
];

export const catalog = catalogOrder.map(name => ({
  name,
  demo: demos[name],
  group: info[name][0],
  description: info[name][1]
}));
export const categories=[
  'All components',
  'Components',
  'Special Effects',
  'Animations',
  'Text Animations',
  'Device Mocks',
  'Buttons',
  'Backgrounds',
  'Community',
  'Forms & Inputs',
  'Navigation',
  'Feedback & Overlays',
  'Layout & Display'
];
export const componentBadges={
  AnimatedBeam:'New',
  RainbowButton:'New',
  WarpBackground:'New',
  BentoGrid:'New',
  Globe:'New',
  IconCloud:'New',
  CodeComparison:'New',
  FileTree:'New',
  InteractiveHoverButton:'New',
  PulsatingButton:'New',
  Terminal:'New',
  Dock:'New',
  ScrollProgress:'New',
  NeonGradientCard:'New',
  Backlight:'New',
  GlyphMatrix:'New',
  PixelImage:'New',
  AnimatedCircularProgressBar:'New',
  CoolMode:'New',
  InteractiveGridPattern:'New',
  NoiseTexture:'New',
  Lens:'New',
  TweetCard:'New',
  DottedMap:'New',
  SmoothCursor:'New',
  Pointer:'New'
};



