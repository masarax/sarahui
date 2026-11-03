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

  BentoGrid:()=>html`<div style="width:100%;max-width:860px;">
    ${U.BentoGrid({
      children: html`
        ${U.BentoCard({
          colSpan: 1,
          icon: 'folder',
          name: 'Save your files',
          description: 'We automatically save your files as you type.',
          href: '#components',
          cta: 'Learn more',
          background: html`
            <div style="position:absolute;top:16px;inset-inline:0;height:120px;mask-image:linear-gradient(to top,transparent 5%,#000 100%);-webkit-mask-image:linear-gradient(to top,transparent 5%,#000 100%);overflow:hidden;">
              ${U.Marquee({
                pauseOnHover: true,
                speed: 20,
                children: html`
                  <div style="display:flex;gap:8px;">
                    ${[
                      { name: 'bitcoin.pdf', body: 'Bitcoin cryptocurrency whitepaper by Satoshi Nakamoto.' },
                      { name: 'finances.xlsx', body: 'Spreadsheet for calculating financial metrics and balance sheets.' },
                      { name: 'logo.svg', body: 'Scalable Vector Graphics vector brand assets.' },
                      { name: 'keys.gpg', body: 'Encrypted GPG key pairs for secure authentication.' },
                      { name: 'seed.txt', body: 'Cryptographic recovery phrase backed up securely.' }
                    ].map(f => html`
                      <figure style="width:125px;padding:8px 10px;border-radius:10px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);font-size:11px;filter:blur(0.5px);transition:filter 0.2s;" onmouseenter="this.style.filter='none'" onmouseleave="this.style.filter='blur(0.5px)'">
                        <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">
                          <strong style="font-size:11px;color:var(--s-text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${f.name}</strong>
                        </div>
                        <p class="s-small s-muted" style="font-size:9.5px;line-height:1.3;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${f.body}</p>
                      </figure>
                    `)}
                  </div>
                `
              })}
            </div>
          `
        })}

        ${U.BentoCard({
          colSpan: 2,
          icon: 'bell',
          name: 'Notifications',
          description: 'Get notified when something happens.',
          href: '#components',
          cta: 'Learn more',
          background: html`
            <div style="position:absolute;top:16px;right:16px;width:calc(100% - 32px);max-width:320px;height:180px;mask-image:linear-gradient(to top,transparent 5%,#000 100%);-webkit-mask-image:linear-gradient(to top,transparent 5%,#000 100%);overflow:hidden;">
              ${U.AnimatedList({
                delay: 1500,
                items: [
                  html`<div class="s-anim-list-card" style="padding:8px 12px;border-radius:10px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;gap:10px;width:100%;">
                    <div style="width:28px;height:28px;border-radius:8px;background:color-mix(in srgb, #FFB800 15%, transparent);color:#FFB800;display:grid;place-items:center;font-size:13px;">👤</div>
                    <div style="flex:1;min-width:0;"><div style="font-size:11.5px;font-weight:600;color:var(--s-text-primary);">User signed up <span class="s-small s-muted">· 10m ago</span></div><div class="s-small s-muted" style="font-size:10px;">sarahUI platform</div></div>
                  </div>`,
                  html`<div class="s-anim-list-card" style="padding:8px 12px;border-radius:10px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;gap:10px;width:100%;">
                    <div style="width:28px;height:28px;border-radius:8px;background:color-mix(in srgb, var(--s-status-success-text) 15%, transparent);color:var(--s-status-success-text);display:grid;place-items:center;font-size:13px;">💸</div>
                    <div style="flex:1;min-width:0;"><div style="font-size:11.5px;font-weight:600;color:var(--s-text-primary);">Payment received <span class="s-small s-muted">· 15m ago</span></div><div class="s-small s-muted" style="font-size:10px;">sarahUI store · $450.00</div></div>
                  </div>`,
                  html`<div class="s-anim-list-card" style="padding:8px 12px;border-radius:10px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;gap:10px;width:100%;">
                    <div style="width:28px;height:28px;border-radius:8px;background:color-mix(in srgb, #FF3D71 15%, transparent);color:#FF3D71;display:grid;place-items:center;font-size:13px;">💬</div>
                    <div style="flex:1;min-width:0;"><div style="font-size:11.5px;font-weight:600;color:var(--s-text-primary);">New message <span class="s-small s-muted">· 5m ago</span></div><div class="s-small s-muted" style="font-size:10px;">Can we update the theme token?</div></div>
                  </div>`,
                  html`<div class="s-anim-list-card" style="padding:8px 12px;border-radius:10px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;gap:10px;width:100%;">
                    <div style="width:28px;height:28px;border-radius:8px;background:color-mix(in srgb, #1E86FF 15%, transparent);color:#1E86FF;display:grid;place-items:center;font-size:13px;">🗞️</div>
                    <div style="flex:1;min-width:0;"><div style="font-size:11.5px;font-weight:600;color:var(--s-text-primary);">New event <span class="s-small s-muted">· 2m ago</span></div><div class="s-small s-muted" style="font-size:10px;">Community meetup scheduled</div></div>
                  </div>`
                ]
              })}
            </div>
          `
        })}

        ${U.BentoCard({
          colSpan: 2,
          icon: 'layers',
          name: 'Integrations',
          description: 'Supports 100+ integrations and counting.',
          href: '#components',
          cta: 'Learn more',
          background: html`
            <div style="position:absolute;top:10px;inset-inline:0;height:140px;mask-image:linear-gradient(to top,transparent 5%,#000 100%);-webkit-mask-image:linear-gradient(to top,transparent 5%,#000 100%);overflow:visible;">
              <svg viewBox="0 0 400 140" style="position:absolute;inset:0;width:100%;height:100%;" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="s-bento-beam-1" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="0">
                    <stop offset="0%" stop-color="#18CCFC" stop-opacity="0"></stop>
                    <stop offset="50%" stop-color="#6344F5"></stop>
                    <stop offset="100%" stop-color="#AE48FF" stop-opacity="0"></stop>
                  </linearGradient>
                  <linearGradient id="s-bento-beam-2" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="0">
                    <stop offset="0%" stop-color="#10B981" stop-opacity="0"></stop>
                    <stop offset="50%" stop-color="#3B82F6"></stop>
                    <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0"></stop>
                  </linearGradient>
                </defs>
                <!-- Background static tracks -->
                <path class="s-beam-track" d="M 50 30 C 130 30, 140 70, 200 70"></path>
                <path class="s-beam-track" d="M 50 70 C 130 70, 140 70, 200 70"></path>
                <path class="s-beam-track" d="M 50 110 C 130 110, 140 70, 200 70"></path>
                <path class="s-beam-track" d="M 200 70 C 260 70, 270 45, 350 45"></path>
                <path class="s-beam-track" d="M 200 70 C 260 70, 270 95, 350 95"></path>

                <!-- Animated flowing beams -->
                <path class="s-anim-beam-line" stroke="url(#s-bento-beam-1)" stroke-width="2.5" stroke-linecap="round" d="M 50 30 C 130 30, 140 70, 200 70"></path>
                <path class="s-anim-beam-line--alt" stroke="url(#s-bento-beam-2)" stroke-width="2.5" stroke-linecap="round" d="M 50 70 C 130 70, 140 70, 200 70"></path>
                <path class="s-anim-beam-line" stroke="url(#s-bento-beam-1)" stroke-width="2.5" stroke-linecap="round" d="M 50 110 C 130 110, 140 70, 200 70"></path>
                <path class="s-anim-beam-line--alt" stroke="url(#s-bento-beam-2)" stroke-width="2.5" stroke-linecap="round" d="M 200 70 C 260 70, 270 45, 350 45"></path>
                <path class="s-anim-beam-line" stroke="url(#s-bento-beam-1)" stroke-width="2.5" stroke-linecap="round" d="M 200 70 C 260 70, 270 95, 350 95"></path>
              </svg>

              <!-- Connected circular nodes -->
              <div class="s-beam-node" style="left:12.5%;top:21%;">🌐</div>
              <div class="s-beam-node" style="left:12.5%;top:50%;">📁</div>
              <div class="s-beam-node" style="left:12.5%;top:79%;">💻</div>
              <div class="s-beam-node s-beam-node--center" style="left:50%;top:50%;">${Icon({name:'spark',size:22})}</div>
              <div class="s-beam-node" style="left:87.5%;top:32%;">⚡</div>
              <div class="s-beam-node" style="left:87.5%;top:68%;">💬</div>
            </div>
          `
        })}

        ${U.BentoCard({
          colSpan: 1,
          icon: 'calendar',
          name: 'Calendar',
          description: 'Use the calendar to filter your files by date.',
          href: '#components',
          cta: 'Learn more',
          background: html`
            <div style="position:absolute;top:16px;right:16px;mask-image:linear-gradient(to top,transparent 5%,#000 100%);-webkit-mask-image:linear-gradient(to top,transparent 5%,#000 100%);">
              <div style="padding:8px 12px;border-radius:10px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);font-size:10px;text-align:center;">
                <strong style="display:block;font-size:11px;margin-bottom:4px;color:var(--s-text-primary);">September 2026</strong>
                <div style="display:grid;grid-template-columns:repeat(7,14px);gap:2px;font-size:8.5px;color:var(--s-text-muted);">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                  <span style="opacity:0.3;">30</span><span style="opacity:0.3;">31</span><span style="font-weight:700;color:var(--s-text-brand);background:color-mix(in srgb,var(--s-brand-indigo) 20%, transparent);border-radius:50%;">1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                </div>
              </div>
            </div>
          `
        })}
      `
    })}
  </div>`,

  Drawer:()=>html`<div class="s-stack">${Button({label:'Open side drawer',icon:'arrow',attrs:{'data-s-drawer-open':'demo-drawer'}})}${U.Drawer({id:'demo-drawer',title:'Workspace Drawer',description:'Slide-over panel for rich configuration.',children:html`<div class="s-stack"><p class="s-small s-muted">Custom drawer content with native focus containment.</p>${Button({label:'Close drawer',variant:'outline',attrs:{'data-s-dialog-close':true}})}</div>`})}</div>`,

  Popover:()=>U.Popover({id:'demo-popover',trigger:Button({label:'Open popover',variant:'outline',trailing:'down'}),content:html`<div class="s-stack"><strong style="font-size:13px;">Quick Settings</strong><p class="s-small s-muted" style="margin:4px 0 10px;">Adjust contextual workspace preferences.</p>${Button({label:'Confirm preferences',size:'sm'})}</div>`}),

  Marquee:()=>{
    const reviews = [
      {name:'Jack',username:'@jack',body:"I've never seen anything like this before. It's amazing. I love it.",avatar:'https://avatar.vercel.sh/jack'},
      {name:'Jill',username:'@jill',body:"I don't know what to say. I'm speechless. This is amazing.",avatar:'https://avatar.vercel.sh/jill'},
      {name:'John',username:'@john',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/john'},
      {name:'Jane',username:'@jane',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/jane'},
      {name:'Jenny',username:'@jenny',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/jenny'},
      {name:'James',username:'@james',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/james'}
    ];
    const firstRow = reviews.slice(0, 3);
    const secondRow = reviews.slice(3);
    const renderCard = (r) => html`
      <figure class="s-review-card">
        <div style="display:flex;flex-direction:row;align-items:center;gap:8px;">
          <img class="s-review-card-avatar" width="32" height="32" alt="${r.name}" src="${r.avatar}"/>
          <div style="display:flex;flex-direction:column;">
            <figcaption class="s-review-card-name">${r.name}</figcaption>
            <p class="s-review-card-username">${r.username}</p>
          </div>
        </div>
        <blockquote class="s-review-card-body">${r.body}</blockquote>
      </figure>
    `;
    return html`
      <div style="position:relative;display:flex;width:100%;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;padding:16px 0;">
        ${U.Marquee({
          pauseOnHover: true,
          speed: 20,
          children: firstRow.map(renderCard)
        })}
        ${U.Marquee({
          reverse: true,
          pauseOnHover: true,
          speed: 20,
          children: secondRow.map(renderCard)
        })}
        <div style="pointer-events:none;position:absolute;inset-block:0;left:0;width:25%;background:linear-gradient(to right, var(--s-bg-canvas, var(--s-bg-surface)), transparent);z-index:2;"></div>
        <div style="pointer-events:none;position:absolute;inset-block:0;right:0;width:25%;background:linear-gradient(to left, var(--s-bg-canvas, var(--s-bg-surface)), transparent);z-index:2;"></div>
      </div>
    `;
  },

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

  NumberTicker:()=>html`<div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:240px;"><span style="font-size:clamp(5rem,15vw,8rem);font-weight:500;letter-spacing:-0.05em;color:var(--s-text-primary);line-height:1;">${U.NumberTicker({value:100})}</span></div>`,

  Ripple:()=>html`<div style="position:relative;height:500px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">${U.Ripple({numCircles:8})}<p style="position:relative;z-index:2;font-size:clamp(2rem,5vw,3rem);font-weight:500;letter-spacing:-0.05em;color:#fff;margin:0;">Ripple</p></div>`,

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
    <div data-s-confetti="basic" data-confetti-hover style="position:relative;display:flex;height:400px;width:100%;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);cursor:pointer;">
      <span style="pointer-events:none;white-space:pre-wrap;background:linear-gradient(to bottom, var(--s-text-primary), color-mix(in srgb, var(--s-text-muted) 30%, transparent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(4rem, 10vw, 7rem);font-weight:800;line-height:1;letter-spacing:-0.05em;user-select:none;">
        Confetti
      </span>
    </div>
  `,

  MagicCard:()=>html`
    <div style="display:flex;justify-content:center;align-items:center;width:100%;padding:16px 0;">
      <div style="width:100%;max-width:380px;">
        ${U.MagicCard({
          gradientColor: 'rgba(255,255,255,0.08)',
          className: 'magic-card-login-demo',
          children: html`
            <div style="border-bottom:1px solid var(--s-border-default);padding:20px 24px;">
              <h3 style="font-size:18px;font-weight:700;color:var(--s-text-primary);margin:0 0 4px 0;">Login</h3>
              <p class="s-small s-muted" style="margin:0;">Enter your credentials to access your account</p>
            </div>
            <div style="padding:20px 24px;display:flex;flex-direction:column;gap:14px;">
              <div style="display:flex;flex-direction:column;gap:6px;">
                <label for="magic-card-email" style="font-size:13px;font-weight:600;color:var(--s-text-primary);">Email</label>
                <input id="magic-card-email" type="email" placeholder="name@example.com" class="s-input" style="width:100%;box-sizing:border-box;" />
              </div>
              <div style="display:flex;flex-direction:column;gap:6px;">
                <label for="magic-card-password" style="font-size:13px;font-weight:600;color:var(--s-text-primary);">Password</label>
                <input id="magic-card-password" type="password" placeholder="••••••••" class="s-input" style="width:100%;box-sizing:border-box;" />
              </div>
            </div>
            <div style="border-top:1px solid var(--s-border-default);padding:16px 24px;">
              <button type="button" class="s-button s-button--primary" style="width:100%;justify-content:center;">
                <span>Sign In</span>
              </button>
            </div>
          `
        })}
      </div>
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
    <div class="dock-demo-stage" style="position:relative;width:100%;min-height:220px;display:flex;align-items:center;justify-content:center;border-radius:var(--s-radius-lg,16px);background:var(--s-bg-surface);border:var(--s-border-width-default,1px) solid var(--s-border-default);overflow:hidden;padding:var(--s-spacing-32) var(--s-spacing-16);">
      <div style="position:relative;z-index:var(--s-layer-raised, 2);">
        ${U.Dock({items:[
          {icon:'home',label:'Home'},
          {icon:'pencil',label:'Blog'},
          {separator:true},
          {icon:'github',label:'GitHub'},
          {icon:'linkedin',label:'LinkedIn'},
          {icon:'x',label:'X'},
          {icon:'mail',label:'Send Email'}
        ]})}
      </div>
    </div>
  `,

  AvatarCircles:()=>html`
    <div class="demo-wrap" style="align-items:center;justify-content:center;padding:32px 16px;">
      ${U.AvatarCircles({
        numPeople: 99,
        avatarUrls: [
          'https://avatars.githubusercontent.com/u/55315718',
          'https://avatars.githubusercontent.com/u/20110627',
          'https://avatars.githubusercontent.com/u/106103625',
          'https://avatars.githubusercontent.com/u/59228569'
        ]
      })}
    </div>
  `,

  AnimatedBeam:(id='beam-demo')=>html`<div class="animated-beam-demo-container" data-s-beam-container style="position:relative;display:flex;height:300px;width:100%;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:40px;">
    <div style="display:flex;width:100%;max-width:512px;height:100%;max-height:200px;flex-direction:row;align-items:stretch;justify-content:space-between;position:relative;z-index:2;">
      <!-- Left Column (Inputs) -->
      <div style="display:flex;flex-direction:column;justify-content:space-between;align-items:center;">
        <div id="${id}-drive" class="beam-circle-node" title="Google Drive">${Icon({name:'drive',size:24})}</div>
        <div id="${id}-notion" class="beam-circle-node" title="Notion">${Icon({name:'notion',size:24})}</div>
        <div id="${id}-whatsapp" class="beam-circle-node" title="WhatsApp">${Icon({name:'whatsapp',size:24})}</div>
      </div>
      <!-- Center Column (AI Hub) -->
      <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
        <div id="${id}-openai" class="beam-circle-node beam-circle-hub" title="OpenAI">${Icon({name:'openai',size:32})}</div>
      </div>
      <!-- Right Column (Outputs) -->
      <div style="display:flex;flex-direction:column;justify-content:space-between;align-items:center;">
        <div id="${id}-docs" class="beam-circle-node" title="Google Docs">${Icon({name:'docs',size:24})}</div>
        <div id="${id}-zapier" class="beam-circle-node" title="Zapier">${Icon({name:'zapier',size:24})}</div>
        <div id="${id}-messenger" class="beam-circle-node" title="Messenger">${Icon({name:'messenger',size:24})}</div>
      </div>
    </div>
    <svg class="beam-svg-overlay" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;" aria-hidden="true">
      <defs>
        <linearGradient id="${id}-grad-drive" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop>
          <stop offset="0%" stop-color="#ffaa40"></stop>
          <stop offset="32.5%" stop-color="#9c40ff"></stop>
          <stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop>
        </linearGradient>
        <linearGradient id="${id}-grad-notion" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop>
          <stop offset="0%" stop-color="#ffaa40"></stop>
          <stop offset="32.5%" stop-color="#9c40ff"></stop>
          <stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop>
        </linearGradient>
        <linearGradient id="${id}-grad-whatsapp" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop>
          <stop offset="0%" stop-color="#ffaa40"></stop>
          <stop offset="32.5%" stop-color="#9c40ff"></stop>
          <stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop>
        </linearGradient>
        <linearGradient id="${id}-grad-docs" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop>
          <stop offset="0%" stop-color="#ffaa40"></stop>
          <stop offset="32.5%" stop-color="#9c40ff"></stop>
          <stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop>
        </linearGradient>
        <linearGradient id="${id}-grad-zapier" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop>
          <stop offset="0%" stop-color="#ffaa40"></stop>
          <stop offset="32.5%" stop-color="#9c40ff"></stop>
          <stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop>
        </linearGradient>
        <linearGradient id="${id}-grad-messenger" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop>
          <stop offset="0%" stop-color="#ffaa40"></stop>
          <stop offset="32.5%" stop-color="#9c40ff"></stop>
          <stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop>
        </linearGradient>
      </defs>

      <!-- Background Static Paths -->
      <path class="s-beam-path-bg" data-bg-for="${id}-p-drive" />
      <path class="s-beam-path-bg" data-bg-for="${id}-p-notion" />
      <path class="s-beam-path-bg" data-bg-for="${id}-p-whatsapp" />
      <path class="s-beam-path-bg" data-bg-for="${id}-p-docs" />
      <path class="s-beam-path-bg" data-bg-for="${id}-p-zapier" />
      <path class="s-beam-path-bg" data-bg-for="${id}-p-messenger" />

      <!-- Animated Beam Flow Paths (Exact Magic UI animated-beam-demo parity) -->
      <path class="s-beam-path" id="${id}-p-drive" data-from="#${id}-drive" data-to="#${id}-openai" data-curvature="-75" data-end-y-offset="-10" stroke="url(#${id}-grad-drive)" />
      <path class="s-beam-path" id="${id}-p-notion" data-from="#${id}-notion" data-to="#${id}-openai" stroke="url(#${id}-grad-notion)" />
      <path class="s-beam-path" id="${id}-p-whatsapp" data-from="#${id}-whatsapp" data-to="#${id}-openai" data-curvature="75" data-end-y-offset="10" stroke="url(#${id}-grad-whatsapp)" />
      <path class="s-beam-path s-beam-path--reverse" id="${id}-p-docs" data-from="#${id}-docs" data-to="#${id}-openai" data-curvature="-75" data-end-y-offset="-10" data-reverse="true" stroke="url(#${id}-grad-docs)" />
      <path class="s-beam-path s-beam-path--reverse" id="${id}-p-zapier" data-from="#${id}-zapier" data-to="#${id}-openai" data-reverse="true" stroke="url(#${id}-grad-zapier)" />
      <path class="s-beam-path s-beam-path--reverse" id="${id}-p-messenger" data-from="#${id}-messenger" data-to="#${id}-openai" data-curvature="75" data-end-y-offset="10" data-reverse="true" stroke="url(#${id}-grad-messenger)" />
    </svg>
  </div>`,

  Terminal:()=>html`
    <div style="display:flex;justify-content:center;width:100%;">
      ${U.Terminal({
        children: html`
          ${U.TypingAnimation({ text: '> pnpm dlx sarahui@latest init' })}
          ${U.AnimatedSpan({ className: 's-terminal-span--success', children: '✔ Preflight checks.' })}
          ${U.AnimatedSpan({ className: 's-terminal-span--success', children: '✔ Verifying framework. Found Next.js.' })}
          ${U.AnimatedSpan({ className: 's-terminal-span--success', children: '✔ Validating Tailwind CSS.' })}
          ${U.AnimatedSpan({ className: 's-terminal-span--success', children: '✔ Validating import alias.' })}
          ${U.AnimatedSpan({ className: 's-terminal-span--success', children: '✔ Writing components.json.' })}
          ${U.AnimatedSpan({ className: 's-terminal-span--success', children: '✔ Checking registry.' })}
          ${U.AnimatedSpan({ className: 's-terminal-span--success', children: '✔ Updating tailwind.config.ts' })}
          ${U.AnimatedSpan({ className: 's-terminal-span--success', children: '✔ Updating app/globals.css' })}
          ${U.AnimatedSpan({ className: 's-terminal-span--success', children: '✔ Installing dependencies.' })}
          ${U.AnimatedSpan({ className: 's-terminal-span--info', children: html`<span>ℹ Updated 1 file:</span><span style="padding-left:8px;">- lib/utils.ts</span>` })}
          ${U.TypingAnimation({ className: 'is-muted', text: 'Success! Project initialization completed.' })}
          ${U.TypingAnimation({ className: 'is-muted', text: 'You may now add components.' })}
        `
      })}
    </div>
  `,

  OrbitingCircles:()=>html`
    <div style="position:relative;display:flex;height:500px;width:100%;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;">
      ${U.OrbitingCircles({
        iconSize: 40,
        icons: ['whatsapp', 'notion', 'openai', 'drive', 'github']
      })}
      ${U.OrbitingCircles({
        iconSize: 30,
        radius: 100,
        reverse: true,
        speed: 2,
        icons: ['whatsapp', 'notion', 'openai', 'drive']
      })}
    </div>
  `,

              Globe:()=>html`
    <div class="globe-demo-stage" style="position:relative;display:flex;height:440px;width:100%;max-width:620px;flex-direction:column;align-items:center;justify-content:flex-start;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);margin:0 auto;padding-top:36px;">
      <span style="pointer-events:none;z-index:10;background:linear-gradient(180deg, var(--s-text-primary) 0%, color-mix(in srgb, var(--s-text-muted) 35%, transparent) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(4.5rem, 11vw, 6rem);font-weight:700;line-height:1;letter-spacing:-0.04em;user-select:none;">
        Globe
      </span>
      <div style="position:absolute;top:160px;left:50%;transform:translateX(-50%);width:640px;height:640px;max-width:none;display:flex;align-items:center;justify-content:center;z-index:2;">
        ${U.Globe({size:640})}
      </div>
      <div class="globe-stage-shadow"></div>
    </div>
  `,

  AnimatedList:()=>html`
    <div style="position:relative;display:flex;height:440px;width:100%;flex-direction:column;overflow:hidden;padding:16px;align-items:center;justify-content:flex-start;">
      ${U.AnimatedList({
        delay: 1200,
        items: [
          html`<figure style="position:relative;margin:0 auto;width:100%;max-width:400px;cursor:pointer;overflow:hidden;border-radius:16px;padding:14px 16px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);"><div style="display:flex;flex-direction:row;align-items:center;gap:12px;"><div style="display:flex;width:40px;height:40px;align-items:center;justify-content:center;border-radius:14px;background-color:#00C9A7;font-size:18px;">💸</div><div style="display:flex;flex-direction:column;overflow:hidden;"><figcaption style="display:flex;flex-direction:row;align-items:center;font-size:14px;font-weight:600;color:var(--s-text-primary);"><span>Payment received</span><span style="margin:0 4px;color:var(--s-text-muted);">·</span><span style="font-size:12px;font-weight:400;color:var(--s-text-muted);">15m ago</span></figcaption><p style="font-size:13px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">sarahUI Studio · $450.00</p></div></div></figure>`,
          html`<figure style="position:relative;margin:0 auto;width:100%;max-width:400px;cursor:pointer;overflow:hidden;border-radius:16px;padding:14px 16px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);"><div style="display:flex;flex-direction:row;align-items:center;gap:12px;"><div style="display:flex;width:40px;height:40px;align-items:center;justify-content:center;border-radius:14px;background-color:#FFB800;font-size:18px;">👤</div><div style="display:flex;flex-direction:column;overflow:hidden;"><figcaption style="display:flex;flex-direction:row;align-items:center;font-size:14px;font-weight:600;color:var(--s-text-primary);"><span>User signed up</span><span style="margin:0 4px;color:var(--s-text-muted);">·</span><span style="font-size:12px;font-weight:400;color:var(--s-text-muted);">10m ago</span></figcaption><p style="font-size:13px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">Sarah Khan joined workspace</p></div></div></figure>`,
          html`<figure style="position:relative;margin:0 auto;width:100%;max-width:400px;cursor:pointer;overflow:hidden;border-radius:16px;padding:14px 16px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);"><div style="display:flex;flex-direction:row;align-items:center;gap:12px;"><div style="display:flex;width:40px;height:40px;align-items:center;justify-content:center;border-radius:14px;background-color:#FF3D71;font-size:18px;">💬</div><div style="display:flex;flex-direction:column;overflow:hidden;"><figcaption style="display:flex;flex-direction:row;align-items:center;font-size:14px;font-weight:600;color:var(--s-text-primary);"><span>New message</span><span style="margin:0 4px;color:var(--s-text-muted);">·</span><span style="font-size:12px;font-weight:400;color:var(--s-text-muted);">5m ago</span></figcaption><p style="font-size:13px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">Can we update the theme token?</p></div></div></figure>`,
          html`<figure style="position:relative;margin:0 auto;width:100%;max-width:400px;cursor:pointer;overflow:hidden;border-radius:16px;padding:14px 16px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);"><div style="display:flex;flex-direction:row;align-items:center;gap:12px;"><div style="display:flex;width:40px;height:40px;align-items:center;justify-content:center;border-radius:14px;background-color:#1E86FF;font-size:18px;">🗞️</div><div style="display:flex;flex-direction:column;overflow:hidden;"><figcaption style="display:flex;flex-direction:row;align-items:center;font-size:14px;font-weight:600;color:var(--s-text-primary);"><span>New event</span><span style="margin:0 4px;color:var(--s-text-muted);">·</span><span style="font-size:12px;font-weight:400;color:var(--s-text-muted);">2m ago</span></figcaption><p style="font-size:13px;font-weight:400;color:var(--s-text-secondary);margin:2px 0 0;">Community meetup scheduled</p></div></div></figure>`
        ]
      })}
      <div style="pointer-events:none;position:absolute;inset:auto 0 0 0;height:25%;background:linear-gradient(to top,var(--s-bg-canvas),transparent);"></div>
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
      <p style="position:relative;z-index:2;font-size:clamp(2rem,5vw,3rem);font-weight:500;letter-spacing:-0.05em;color:var(--s-text-primary);margin:0;">Grid Pattern</p>
    </div>
  `,

  DotPattern:()=>html`
    <div style="position:relative;height:380px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;align-items:center;justify-content:center;">
      ${U.DotPattern({width:20,height:20,cr:1.2})}
      <p style="position:relative;z-index:2;font-size:clamp(2rem,5vw,3rem);font-weight:500;letter-spacing:-0.05em;color:var(--s-text-primary);margin:0;">Dot Pattern</p>
    </div>
  `,

  AnimatedGridPattern:()=>html`
    <div style="position:relative;height:380px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;align-items:center;justify-content:center;">
      ${U.AnimatedGridPattern({numSquares:30,duration:3})}
      <p style="position:relative;z-index:2;font-size:clamp(2rem,5vw,3rem);font-weight:500;letter-spacing:-0.05em;color:var(--s-text-primary);margin:0;">Animated Grid</p>
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

  ScrollProgress:()=>html`
    <div style="position:relative;width:100%;height:300px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;display:flex;flex-direction:column;">
      ${U.ScrollProgress()}
      <div data-scroll-content style="flex:1;overflow-y:auto;padding:20px;">
        <h4 style="margin:0 0 6px;">Scroll Progress Indicator</h4>
        <p class="s-small s-muted" style="margin-bottom:14px;">Scroll inside this panel to see the reactive top progress bar track your scroll depth.</p>
        ${[1,2,3,4,5,6].map(i=>html`
          <div style="padding:12px 14px;border-radius:8px;background:var(--s-bg-subtle);margin-bottom:8px;border:1px solid var(--s-border-default);">
            <strong style="font-size:13px;display:block;">Section ${i}: Design Token Parity</strong>
            <p class="s-small s-muted" style="margin:4px 0 0;">Engineered with native browser APIs and zero external runtime dependencies.</p>
          </div>
        `)}
      </div>
    </div>
  `,

  ProgressiveBlur: () => {
    const feedItems = [
      { icon: 'spark', color: '#8b5cf6', title: 'Edge Deployment Complete', desc: 'Production v2.4.0 active in 12 global regions.', time: 'Just now' },
      { icon: 'check', color: '#10b981', title: 'Payment Confirmed', desc: 'Enterprise annual plan renewed via Stripe ($2,400.00).', time: '4m ago' },
      { icon: 'heart', color: '#ec4899', title: 'New GitHub Star', desc: 'sarahUI reached 22,350+ GitHub stars worldwide.', time: '18m ago' },
      { icon: 'settings', color: '#06b6d4', title: 'Performance Benchmark', desc: 'LCP latency dropped to 0.38s across all core vitals.', time: '42m ago' },
      { icon: 'folder', color: '#f59e0b', title: 'Database Backup Synced', desc: 'Multi-region Postgres snapshot created in eu-central-1.', time: '1h ago' },
      { icon: 'spark', color: '#6366f1', title: 'SSL Certificate Renewed', desc: 'Wildcard TLS automated encryption renewed successfully.', time: '2h ago' },
      { icon: 'check', color: '#10b981', title: 'Security Policy Passed', desc: 'Zero vulnerabilities reported across 75 unit audits.', time: '4h ago' },
      { icon: 'folder', color: '#3b82f6', title: 'CDN Cache Purged', desc: 'Global edge cache refreshed in 45ms across 180 POPS.', time: '6h ago' }
    ];

    return html`
      <div style="position:relative;height:380px;width:100%;max-width:460px;margin:0 auto;border-radius:18px;border:1px solid var(--s-glass-border, var(--s-border-default));background:var(--s-glass-bg, var(--s-bg-surface));backdrop-filter:var(--s-glass-blur, blur(16px));-webkit-backdrop-filter:var(--s-glass-blur, blur(16px));overflow:hidden;display:flex;flex-direction:column;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 18px;border-bottom:1px solid var(--s-glass-border, var(--s-border-default));background:var(--s-glass-bg-subtle, var(--s-bg-subtle));z-index:20;flex-shrink:0;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981;box-shadow:0 0 8px rgba(16,185,129,0.6);"></span>
            <strong style="font-size:13px;font-weight:600;color:var(--s-text-primary);">Real-time Activity Stream</strong>
          </div>
          <span style="font:10px var(--s-font-mono),monospace;color:var(--s-text-muted);background:var(--s-glass-bg, var(--s-bg-surface));border:1px solid var(--s-glass-border, var(--s-border-default));padding:2px 7px;border-radius:6px;">Live</span>
        </div>
        <div style="overflow-y:auto;flex:1;padding:16px 14px;display:flex;flex-direction:column;gap:10px;">
          ${feedItems.map(item => html`
            <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:12px;background:var(--s-glass-bg, var(--s-bg-subtle));border:1px solid var(--s-glass-border, var(--s-border-default));transition:transform var(--s-duration-fast);box-sizing:border-box;">
              <div style="width:32px;height:32px;border-radius:9px;background:color-mix(in srgb, ${item.color} 15%, transparent);color:${item.color};display:grid;place-items:center;flex-shrink:0;border:1px solid color-mix(in srgb, ${item.color} 30%, transparent);">
                ${U.Icon({name:item.icon,size:15})}
              </div>
              <div style="flex:1;min-width:0;">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:2px;">
                  <strong style="font-size:12.5px;font-weight:600;color:var(--s-text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.title}</strong>
                  <span style="font-size:11px;color:var(--s-text-muted);white-space:nowrap;flex-shrink:0;">${item.time}</span>
                </div>
                <p style="font-size:11.5px;color:var(--s-text-muted);margin:0;line-height:1.45;">${item.desc}</p>
              </div>
            </div>
          `)}
        </div>
        ${U.ProgressiveBlur({position:'both',height:'28%'})}
      </div>
    `;
  },

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

  KineticText:()=>html`<div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:220px;background:var(--s-bg-surface);border-radius:12px;border:1px solid var(--s-border-default);overflow:hidden;">${U.KineticText({text:'KINETIC'})}</div>`,

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
    <div style="display:flex;justify-content:center;align-items:center;padding:48px 16px;min-height:300px;background:var(--s-bg-surface);border-radius:12px;border:1px solid var(--s-border-default);">
      ${U.VideoText({src:'https://cdn.magicui.design/ocean-small.webm',text:'OCEAN',fontSize:20})}
    </div>
  `,

  Highlighter:()=>html`
    <div style="font-size:clamp(1.25rem, 3vw, 1.75rem);font-weight:600;line-height:1.8;padding:48px 16px;max-width:640px;margin:0 auto;text-align:center;color:var(--s-text-primary);">
      The ${U.Highlighter({action:'underline',color:'#FF9800',text:'sarahUI Highlighter'})} makes important ${U.Highlighter({action:'highlight',color:'#87CEFA',text:'text stand out'})} effortlessly.
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
    <div style="max-width:340px;width:100%;margin:0 auto;">
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

  IconCloud:()=>html`<div style="display:flex;justify-content:center;align-items:center;width:100%;">${U.IconCloud({
    iconSlugs: [
      "typescript", "javascript", "dart", "react", "flutter", "android",
      "html5", "css", "nodedotjs", "express", "nextdotjs", "prisma",
      "postgresql", "firebase", "nginx", "vercel", "testinglibrary", "jest", "cypress",
      "docker", "git", "jira", "github", "gitlab", "androidstudio",
      "figma", "tailwindcss", "python", "graphql", "mongodb"
    ]
  })}</div>`,

  Lens:()=>html`
    <div style="display:flex;justify-content:center;width:100%;padding:24px 0;">
      <div style="max-width:380px;width:100%;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
        <div style="padding:16px 16px 0;">
          ${U.Lens({
            zoomFactor:2,
            lensSize:150,
            ariaLabel:"Zoom Area",
            children:html`<img src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop" alt="Camp destination" style="width:100%;height:220px;object-fit:cover;display:block;border-radius:10px;">`
          })}
        </div>
        <div style="padding:16px 20px 20px;">
          <h4 style="font-size:18px;font-weight:700;margin:0 0 6px;color:var(--s-text-primary);">Your next camp</h4>
          <p class="s-small s-muted" style="margin:0 0 16px;line-height:1.5;">See our latest and best camp destinations all across the five continents of the globe.</p>
          <div style="display:flex;gap:10px;">
            <button type="button" class="demo-login-btn-primary" style="padding:8px 16px;font-size:13px;border-radius:8px;">Let's go</button>
            <button type="button" class="demo-login-btn-outline" style="padding:8px 16px;font-size:13px;border-radius:8px;">Another time</button>
          </div>
        </div>
      </div>
    </div>
  `,

  PixelImage:()=>html`<div style="display:flex;justify-content:center;width:100%;">${U.PixelImage({width:280,height:180,pixelSize:8})}</div>`,

  GlyphMatrix:()=>html`<div style="position:relative;height:180px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:grid;place-items:center;">${U.GlyphMatrix()}<span style="position:relative;z-index:2;font-weight:700;font-size:14px;letter-spacing:2px;color:var(--s-text-primary);">SARAHUI CYPHER</span></div>`,

  DottedMap: () => html`
    <div style="position:relative;width:100%;max-width:820px;height:420px;margin:0 auto;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);box-shadow:var(--s-shadow-sm, 0 4px 12px rgba(0,0,0,0.05));">
      ${U.DottedMap({
        lines: [
          { from: { lat: 37.7749, lng: -122.4194 }, to: { lat: 51.5074, lng: -0.1278 } },
          { from: { lat: 51.5074, lng: -0.1278 }, to: { lat: 25.2048, lng: 55.2708 } },
          { from: { lat: 25.2048, lng: 55.2708 }, to: { lat: 23.8103, lng: 90.4125 } },
          { from: { lat: 23.8103, lng: 90.4125 }, to: { lat: 1.3521, lng: 103.8198 } },
          { from: { lat: 1.3521, lng: 103.8198 }, to: { lat: -33.8688, lng: 151.2093 } },
          { from: { lat: 51.5074, lng: -0.1278 }, to: { lat: 35.6762, lng: 139.6503 } },
          { from: { lat: 35.6762, lng: 139.6503 }, to: { lat: 37.7749, lng: -122.4194 } }
        ]
      })}
    </div>
  `,

  Pointer:()=>html`
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;width:100%;max-width:580px;margin:0 auto;">
      ${U.Pointer({color:'#EC4899',cursor:html`<svg width="24" height="24" viewBox="0 0 24 24" fill="#EC4899" style="animation:s-pulse-heart 1.2s ease-in-out infinite;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,content:html`<div style="position:relative;height:140px;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;flex-direction:column;align-items:center;justify-content:center;"><strong style="font-size:14px;">Animated Pointer</strong><span class="s-small s-muted" style="margin-top:2px;">Heart cursor</span></div>`})}
      ${U.Pointer({color:'#3B82F6',content:html`<div style="position:relative;height:140px;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;flex-direction:column;align-items:center;justify-content:center;"><strong style="font-size:14px;">Colored Pointer</strong><span class="s-small s-muted" style="margin-top:2px;">Default blue pointer</span></div>`})}
      ${U.Pointer({color:'#8B5CF6',cursor:html`<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="none" stroke="#8B5CF6" stroke-width="2"/><circle cx="10" cy="10" r="3" fill="#8B5CF6"/></svg>`,content:html`<div style="position:relative;height:140px;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;flex-direction:column;align-items:center;justify-content:center;"><strong style="font-size:14px;">Custom Shape</strong><span class="s-small s-muted" style="margin-top:2px;">Target circle cursor</span></div>`})}
      ${U.Pointer({cursor:html`<span style="font-size:24px;line-height:1;">👆</span>`,content:html`<div style="position:relative;height:140px;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;flex-direction:column;align-items:center;justify-content:center;"><strong style="font-size:14px;">Emoji Pointer</strong><span class="s-small s-muted" style="margin-top:2px;">Finger emoji cursor</span></div>`})}
    </div>
  `,

  SmoothCursor:()=>html`
    <div class="s-smooth-cursor-box">
      <span class="s-smooth-cursor-desktop-text">Move your mouse around</span>
      <span class="s-smooth-cursor-touch-text">SmoothCursor is disabled on touch devices</span>
      ${U.SmoothCursor()}
    </div>
  `,

  TweetCard:()=>html`
    <div style="max-width:480px;width:100%;margin:0 auto;">
      ${U.TweetCard({ id: '2095541863956742174' })}
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
      description: 'Display an infinite vertical ticker with smooth continuous translation and edge fades.',
      preview: () => {
        const reviews = [
          {name:'Jack',username:'@jack',body:"I've never seen anything like this before. It's amazing. I love it.",avatar:'https://avatar.vercel.sh/jack'},
          {name:'Jill',username:'@jill',body:"I don't know what to say. I'm speechless. This is amazing.",avatar:'https://avatar.vercel.sh/jill'},
          {name:'John',username:'@john',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/john'},
          {name:'Jane',username:'@jane',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/jane'},
          {name:'Jenny',username:'@jenny',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/jenny'},
          {name:'James',username:'@james',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/james'}
        ];
        const firstRow = reviews.slice(0, 3);
        const secondRow = reviews.slice(3);
        const renderCard = (r) => html`
          <figure class="s-review-card s-review-card--compact">
            <div style="display:flex;flex-direction:row;align-items:center;gap:8px;">
              <img class="s-review-card-avatar" width="32" height="32" src="${r.avatar}" alt="${r.name}"/>
              <div style="display:flex;flex-direction:column;">
                <figcaption class="s-review-card-name">${r.name}</figcaption>
                <p class="s-review-card-username">${r.username}</p>
              </div>
            </div>
            <blockquote class="s-review-card-body">${r.body}</blockquote>
          </figure>
        `;
        return html`
          <div style="position:relative;display:flex;height:500px;width:100%;flex-direction:row;align-items:center;justify-content:center;overflow:hidden;padding:16px 0;">
            ${U.Marquee({
              vertical: true,
              pauseOnHover: true,
              speed: 20,
              children: firstRow.map(renderCard)
            })}
            ${U.Marquee({
              vertical: true,
              reverse: true,
              pauseOnHover: true,
              speed: 20,
              children: secondRow.map(renderCard)
            })}
            <div style="pointer-events:none;position:absolute;inset-inline:0;top:0;height:25%;background:linear-gradient(to bottom, var(--s-bg-canvas, var(--s-bg-surface)), transparent);z-index:2;"></div>
            <div style="pointer-events:none;position:absolute;inset-inline:0;bottom:0;height:25%;background:linear-gradient(to top, var(--s-bg-canvas, var(--s-bg-surface)), transparent);z-index:2;"></div>
          </div>
        `;
      },
      code: `import { Marquee } from "@/components/sarahui/marquee";

export function MarqueeDemoVertical() {
  return (
    <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden">
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
      <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b"></div>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
    </div>
  );
}`
    },
    {
      title: '3D',
      description: 'Rotate and pitch vertical tickers with 3D perspective depth transforms.',
      preview: () => {
        const reviews = [
          {name:'Jack',username:'@jack',body:"I've never seen anything like this before. It's amazing. I love it.",avatar:'https://avatar.vercel.sh/jack'},
          {name:'Jill',username:'@jill',body:"I don't know what to say. I'm speechless. This is amazing.",avatar:'https://avatar.vercel.sh/jill'},
          {name:'John',username:'@john',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/john'},
          {name:'Jane',username:'@jane',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/jane'},
          {name:'Jenny',username:'@jenny',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/jenny'},
          {name:'James',username:'@james',body:"I'm at a loss for words. This is amazing. I love it.",avatar:'https://avatar.vercel.sh/james'}
        ];
        const firstRow = reviews.slice(0, 3);
        const secondRow = reviews.slice(3);
        const renderCard = (r) => html`
          <figure class="s-review-card s-review-card--compact">
            <div style="display:flex;flex-direction:row;align-items:center;gap:8px;">
              <img class="s-review-card-avatar" width="32" height="32" src="${r.avatar}" alt="${r.name}"/>
              <div style="display:flex;flex-direction:column;">
                <figcaption class="s-review-card-name">${r.name}</figcaption>
                <p class="s-review-card-username">${r.username}</p>
              </div>
            </div>
            <blockquote class="s-review-card-body">${r.body}</blockquote>
          </figure>
        `;
        return html`
          <div style="position:relative;display:flex;height:384px;width:100%;flex-direction:row;align-items:center;justify-content:center;gap:16px;overflow:hidden;perspective:300px;">
            <div style="display:flex;gap:16px;transform:translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg);">
              ${U.Marquee({
                vertical: true,
                pauseOnHover: true,
                speed: 20,
                children: firstRow.map(renderCard)
              })}
              ${U.Marquee({
                vertical: true,
                reverse: true,
                pauseOnHover: true,
                speed: 20,
                children: secondRow.map(renderCard)
              })}
              ${U.Marquee({
                vertical: true,
                reverse: true,
                pauseOnHover: true,
                speed: 20,
                children: firstRow.map(renderCard)
              })}
              ${U.Marquee({
                vertical: true,
                pauseOnHover: true,
                speed: 20,
                children: secondRow.map(renderCard)
              })}
            </div>
            <div style="pointer-events:none;position:absolute;inset-inline:0;top:0;height:25%;background:linear-gradient(to bottom, var(--s-bg-canvas, var(--s-bg-surface)), transparent);z-index:2;"></div>
            <div style="pointer-events:none;position:absolute;inset-inline:0;bottom:0;height:25%;background:linear-gradient(to top, var(--s-bg-canvas, var(--s-bg-surface)), transparent);z-index:2;"></div>
            <div style="pointer-events:none;position:absolute;inset-block:0;left:0;width:25%;background:linear-gradient(to right, var(--s-bg-canvas, var(--s-bg-surface)), transparent);z-index:2;"></div>
            <div style="pointer-events:none;position:absolute;inset-block:0;right:0;width:25%;background:linear-gradient(to left, var(--s-bg-canvas, var(--s-bg-surface)), transparent);z-index:2;"></div>
          </div>
        `;
      },
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
        <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
          {thirdRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {fourthRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
      <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b"></div>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  );
}`
    }
  ],

    // 2. Terminal - Parity with Magic UI (Custom Delays & Multi-Command)
  Terminal: [
    {
      title: 'Custom Delays',
      preview: () => html`
        <div style="display:flex;justify-content:center;width:100%;">
          ${U.Terminal({
            children: html`
              ${U.TypingAnimation({ delay: 0, text: '$ ls' })}
              ${U.AnimatedSpan({ delay: 800, className: 's-terminal-span--info', children: 'Documents Downloads Pictures' })}
              ${U.TypingAnimation({ delay: 1600, text: '$ cd Documents' })}
              ${U.TypingAnimation({ delay: 2400, text: '$ pwd' })}
              ${U.AnimatedSpan({ delay: 3200, className: 's-terminal-span--success', children: '/home/user/Documents' })}
            `
          })}
        </div>
      `,
      code: `import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/sarahui/terminal";

export function TerminalCustomDelays() {
  return (
    <Terminal>
      <TypingAnimation delay={0}>$ ls</TypingAnimation>
      <AnimatedSpan delay={800} className="text-blue-500">
        Documents Downloads Pictures
      </AnimatedSpan>
      <TypingAnimation delay={1600}>$ cd Documents</TypingAnimation>
      <TypingAnimation delay={2400}>$ pwd</TypingAnimation>
      <AnimatedSpan delay={3200} className="text-green-500">
        /home/user/Documents
      </AnimatedSpan>
    </Terminal>
  );
}`
    },
    {
      title: 'Multi-Command',
      preview: () => html`
        <div style="display:flex;justify-content:center;width:100%;">
          ${U.Terminal({
            children: html`
              ${U.TypingAnimation({ text: '$ git status' })}
              ${U.AnimatedSpan({ className: 's-terminal-span--info', children: 'On branch main. Changes not staged for commit:' })}
              ${U.AnimatedSpan({ className: 's-terminal-span--muted', children: '  modified: packages/ui/src/terminal.tsx' })}
              ${U.TypingAnimation({ text: '$ git commit -m "feat: magic terminal"' })}
              ${U.AnimatedSpan({ className: 's-terminal-span--success', children: '[main 9b8c12a] feat: magic terminal' })}
              ${U.AnimatedSpan({ className: 's-terminal-span--success', children: ' 1 file changed, 24 insertions(+)' })}
            `
          })}
        </div>
      `,
      code: `import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/sarahui/terminal";

export function TerminalMultiCommand() {
  return (
    <Terminal>
      <TypingAnimation>$ git status</TypingAnimation>
      <AnimatedSpan className="text-blue-500">On branch main. Changes not staged for commit:</AnimatedSpan>
      <AnimatedSpan className="text-muted-foreground">  modified: packages/ui/src/terminal.tsx</AnimatedSpan>
      <TypingAnimation>$ git commit -m "feat: magic terminal"</TypingAnimation>
      <AnimatedSpan className="text-green-500">[main 9b8c12a] feat: magic terminal</AnimatedSpan>
      <AnimatedSpan className="text-green-500"> 1 file changed, 24 insertions(+)</AnimatedSpan>
    </Terminal>
  );
}`
    }
  ],

  // 3. HeroVideoDialog - Parity with Magic UI (Top-in-bottom-out, From Bottom)
  HeroVideoDialog: [
    {
      title: 'Top-in-bottom-out',
      preview: () => html`<div style="width:100%;max-width:680px;margin:0 auto;">${U.HeroVideoDialog({animationStyle:'top-in-bottom-out',videoSrc:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',thumbnailAlt:'sarahUI Top In Lightbox'})}</div>`,
      code: `import { HeroVideoDialog } from "@/components/sarahui/hero-video-dialog";

export function HeroVideoDialogTopIn() {
  return (
    <HeroVideoDialog
      animationStyle="top-in-bottom-out"
      videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
      thumbnailSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
      thumbnailAlt="Platform Overview"
    />
  );
}`
    },
    {
      title: 'From Bottom',
      preview: () => html`<div style="width:100%;max-width:680px;margin:0 auto;">${U.HeroVideoDialog({animationStyle:'from-bottom',videoSrc:'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',thumbnailAlt:'sarahUI From Bottom Lightbox'})}</div>`,
      code: `import { HeroVideoDialog } from "@/components/sarahui/hero-video-dialog";

export function HeroVideoDialogFromBottom() {
  return (
    <HeroVideoDialog
      animationStyle="from-bottom"
      videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
      thumbnailSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
      thumbnailAlt="Platform Overview"
    />
  );
}`
    }
  ],

  // 4. BentoGrid - Parity with Magic UI (Vertical, Three Columns)
  BentoGrid: [
    {
      title: 'Vertical',
      preview: () => html`
        <div style="width:100%;max-width:860px;">
          ${U.BentoGrid({
            className: 'lg:grid-rows-3',
            children: html`
              ${U.BentoCard({
                colSpan: 1,
                rowSpan: 2,
                className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
                icon: 'search',
                name: 'Full text search',
                description: 'Search through all your files in one place.',
                href: '#components',
                cta: 'Learn more',
                background: html`
                  <div style="position:absolute;top:14px;inset-inline:14px;padding:8px 12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);border-radius:10px;display:flex;align-items:center;gap:8px;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                    ${Icon({name:'search',size:14})}
                    <span class="s-small s-muted" style="font-size:11px;">Search documents...</span>
                    <kbd style="margin-left:auto;font-size:9.5px;padding:2px 5px;background:var(--s-bg-subtle);border-radius:4px;border:1px solid var(--s-border-default);color:var(--s-text-muted);">⌘K</kbd>
                  </div>
                `
              })}
              ${U.BentoCard({
                colSpan: 1,
                rowSpan: 3,
                className: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
                icon: 'folder',
                name: 'Save your files',
                description: 'We automatically save your files as you type.',
                href: '#components',
                cta: 'Learn more',
                background: html`
                  <div style="position:absolute;top:8px;inset-inline:0;mask-image:linear-gradient(to top,transparent 15%,#000 100%);-webkit-mask-image:linear-gradient(to top,transparent 15%,#000 100%);">
                    ${U.Marquee({
                      pauseOnHover: true,
                      speed: 20,
                      children: html`
                        <div style="display:flex;gap:8px;">
                          ${[
                            { name: 'bitcoin.pdf', body: 'Bitcoin cryptocurrency whitepaper by Satoshi Nakamoto.' },
                            { name: 'finances.xlsx', body: 'Spreadsheet for calculating financial metrics and balance sheets.' },
                            { name: 'logo.svg', body: 'Scalable Vector Graphics vector brand assets.' },
                            { name: 'keys.gpg', body: 'Encrypted GPG key pairs for secure authentication.' },
                            { name: 'seed.txt', body: 'Cryptographic recovery phrase backed up securely.' }
                          ].map(f => html`
                            <figure style="width:115px;padding:8px 10px;border-radius:10px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);font-size:11px;filter:blur(0.5px);transition:filter 0.2s;" onmouseenter="this.style.filter='none'" onmouseleave="this.style.filter='blur(0.5px)'">
                              <strong style="font-size:11px;color:var(--s-text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;">${f.name}</strong>
                              <p class="s-small s-muted" style="font-size:9px;line-height:1.3;margin:2px 0 0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${f.body}</p>
                            </figure>
                          `)}
                        </div>
                      `
                    })}
                  </div>
                `
              })}
              ${U.BentoCard({
                colSpan: 1,
                rowSpan: 1,
                className: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
                icon: 'globe',
                name: 'Multilingual',
                description: 'Supports 100+ languages and counting.',
                href: '#components',
                cta: 'Learn more',
                background: html`
                  <div style="position:absolute;top:-10px;right:-10px;width:110px;height:110px;opacity:0.18;mask-image:linear-gradient(to top,transparent 10%,#000 100%);-webkit-mask-image:linear-gradient(to top,transparent 10%,#000 100%);pointer-events:none;">
                    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      <path d="M2 12h20"></path>
                    </svg>
                  </div>
                `
              })}
              ${U.BentoCard({
                colSpan: 1,
                rowSpan: 1,
                className: 'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2',
                icon: 'calendar',
                name: 'Calendar',
                description: 'Use the calendar to filter your files by date.',
                href: '#components',
                cta: 'Learn more',
                background: html`
                  <div style="position:absolute;top:6px;right:10px;mask-image:linear-gradient(to top,transparent 15%,#000 100%);-webkit-mask-image:linear-gradient(to top,transparent 15%,#000 100%);">
                    <div style="padding:5px 7px;border-radius:8px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);font-size:9px;text-align:center;">
                      <strong style="display:block;font-size:9.5px;margin-bottom:2px;color:var(--s-text-primary);">Sep 2026</strong>
                      <div style="display:grid;grid-template-columns:repeat(7,11px);gap:1.5px;font-size:7.5px;color:var(--s-text-muted);">
                        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                        <span style="opacity:0.3;">31</span><span style="font-weight:700;color:var(--s-text-brand);background:color-mix(in srgb,var(--s-brand-indigo) 20%, transparent);border-radius:50%;">1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
                      </div>
                    </div>
                  </div>
                `
              })}
              ${U.BentoCard({
                colSpan: 1,
                rowSpan: 2,
                className: 'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4',
                icon: 'bell',
                name: 'Notifications',
                description: 'Get notified when someone shares a file or mentions you in a comment.',
                href: '#components',
                cta: 'Learn more',
                background: html`
                  <div style="position:absolute;top:8px;right:8px;width:calc(100% - 16px);max-width:260px;height:190px;mask-image:linear-gradient(to top,transparent 10%,#000 100%);-webkit-mask-image:linear-gradient(to top,transparent 10%,#000 100%);overflow:hidden;">
                    ${U.AnimatedList({
                      delay: 1500,
                      items: [
                        html`<div class="s-anim-list-card" style="padding:6px 9px;border-radius:8px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;gap:8px;width:100%;">
                          <div style="width:22px;height:22px;border-radius:6px;background:color-mix(in srgb, #FFB800 15%, transparent);color:#FFB800;display:grid;place-items:center;font-size:10.5px;">👤</div>
                          <div style="flex:1;min-width:0;"><div style="font-size:10px;font-weight:600;color:var(--s-text-primary);">User signed up</div><div class="s-small s-muted" style="font-size:8.5px;">Sarah Khan joined</div></div>
                        </div>`,
                        html`<div class="s-anim-list-card" style="padding:6px 9px;border-radius:8px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;gap:8px;width:100%;">
                          <div style="width:22px;height:22px;border-radius:6px;background:color-mix(in srgb, var(--s-status-success-text) 15%, transparent);color:var(--s-status-success-text);display:grid;place-items:center;font-size:10.5px;">💸</div>
                          <div style="flex:1;min-width:0;"><div style="font-size:10px;font-weight:600;color:var(--s-text-primary);">Payment received</div><div class="s-small s-muted" style="font-size:8.5px;">sarahUI · $450.00</div></div>
                        </div>`,
                        html`<div class="s-anim-list-card" style="padding:6px 9px;border-radius:8px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;gap:8px;width:100%;">
                          <div style="width:22px;height:22px;border-radius:6px;background:color-mix(in srgb, #FF3D71 15%, transparent);color:#FF3D71;display:grid;place-items:center;font-size:10.5px;">💬</div>
                          <div style="flex:1;min-width:0;"><div style="font-size:10px;font-weight:600;color:var(--s-text-primary);">New comment</div><div class="s-small s-muted" style="font-size:8.5px;">Check out the latest updates</div></div>
                        </div>`
                      ]
                    })}
                  </div>
                `
              })}
            `
          })}
        </div>
      `,
      code: `import { BentoCard, BentoGrid } from "@/components/sarahui/bento-grid";

export function BentoDemoVertical() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}`
    },
    {
      title: 'Three Columns',
      preview: () => html`
        <div style="width:100%;max-width:860px;">
          ${U.BentoGrid({
            className: 'grid-cols-3',
            children: html`
              ${U.BentoCard({
                colSpan: 1,
                icon: 'folder',
                name: 'Save your files',
                description: 'We automatically save your files as you type.',
                href: '#components',
                cta: 'Learn more',
                background: html`
                  <div style="position:absolute;top:10px;inset-inline:0;mask-image:linear-gradient(to top,transparent 15%,#000 100%);-webkit-mask-image:linear-gradient(to top,transparent 15%,#000 100%);">
                    ${U.Marquee({
                      pauseOnHover: true,
                      speed: 20,
                      children: html`
                        <div style="display:flex;gap:6px;">
                          ${['react.tsx', 'tokens.json', 'styles.css'].map(name => html`
                            <figure style="padding:5px 8px;border-radius:8px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);font-size:10px;font-weight:600;">
                              ${name}
                            </figure>
                          `)}
                        </div>
                      `
                    })}
                  </div>
                `
              })}
              ${U.BentoCard({
                colSpan: 1,
                icon: 'bell',
                name: 'Notifications',
                description: 'Real-time notification stream.',
                href: '#components',
                cta: 'Learn more',
                background: html`
                  <div style="position:absolute;top:10px;right:10px;width:calc(100% - 20px);max-width:240px;height:180px;mask-image:linear-gradient(to top,transparent 10%,#000 100%);-webkit-mask-image:linear-gradient(to top,transparent 10%,#000 100%);overflow:hidden;">
                    ${U.AnimatedList({
                      delay: 1500,
                      items: [
                        html`<div class="s-anim-list-card" style="padding:6px 10px;border-radius:8px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;gap:8px;width:100%;">
                          <div style="width:20px;height:20px;border-radius:6px;background:color-mix(in srgb, #FFB800 15%, transparent);color:#FFB800;display:grid;place-items:center;font-size:10px;">👤</div>
                          <div style="flex:1;min-width:0;"><div style="font-size:10px;font-weight:600;color:var(--s-text-primary);">User signed up</div></div>
                        </div>`,
                        html`<div class="s-anim-list-card" style="padding:6px 10px;border-radius:8px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;gap:8px;width:100%;">
                          <div style="width:20px;height:20px;border-radius:6px;background:color-mix(in srgb, var(--s-status-success-text) 15%, transparent);color:var(--s-status-success-text);display:grid;place-items:center;font-size:10px;">💸</div>
                          <div style="flex:1;min-width:0;"><div style="font-size:10px;font-weight:600;color:var(--s-text-primary);">Payment received</div></div>
                        </div>`
                      ]
                    })}
                  </div>
                `
              })}
              ${U.BentoCard({
                colSpan: 1,
                icon: 'spark',
                name: 'AI Automation',
                description: 'Autonomous workflows out of the box.',
                href: '#components',
                cta: 'Learn more',
                background: html`
                  <div style="position:absolute;top:10px;inset-inline:0;height:120px;display:flex;align-items:center;justify-content:center;mask-image:linear-gradient(to top,transparent 10%,#000 100%);-webkit-mask-image:linear-gradient(to top,transparent 10%,#000 100%);">
                    <div style="width:40px;height:40px;border-radius:50%;background:var(--s-bg-surface);border:2px solid var(--s-border-brand);display:grid;place-items:center;color:var(--s-text-brand);box-shadow:0 0 16px color-mix(in srgb, var(--s-border-brand) 30%, transparent);">
                      ${Icon({name:'spark',size:20})}
                    </div>
                  </div>
                `
              })}
            `
          })}
        </div>
      `,
      code: `import { BentoCard, BentoGrid } from "@/components/sarahui/bento-grid";

export function BentoGridThreeColumns() {
  return (
    <BentoGrid className="grid-cols-3">
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
      title: 'Security Feed',
      preview: () => html`
        <div style="position:relative;display:flex;height:380px;width:100%;flex-direction:column;overflow:hidden;padding:16px;align-items:center;justify-content:flex-start;">
          ${U.AnimatedList({
            delay: 1400,
            items: [
              html`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);width:100%;max-width:380px;"><span style="width:8px;height:8px;border-radius:50%;background:#10B981;flex-shrink:0;"></span><div style="flex:1;"><strong style="font-size:13px;display:block;">SSL Certificate Renewed</strong><span class="s-small s-muted">Automatic Let's Encrypt renewal · 2m ago</span></div></div>`,
              html`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);width:100%;max-width:380px;"><span style="width:8px;height:8px;border-radius:50%;background:#3B82F6;flex-shrink:0;"></span><div style="flex:1;"><strong style="font-size:13px;display:block;">API Token Generated</strong><span class="s-small s-muted">Key prod-sec-01 created by Admin · 8m ago</span></div></div>`,
              html`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);width:100%;max-width:380px;"><span style="width:8px;height:8px;border-radius:50%;background:#A855F7;flex-shrink:0;"></span><div style="flex:1;"><strong style="font-size:13px;display:block;">Database Backup Completed</strong><span class="s-small s-muted">Daily snapshot verified · 15m ago</span></div></div>`,
              html`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);width:100%;max-width:380px;"><span style="width:8px;height:8px;border-radius:50%;background:#F59E0B;flex-shrink:0;"></span><div style="flex:1;"><strong style="font-size:13px;display:block;">Firewall Rule Updated</strong><span class="s-small s-muted">Blocked 142 suspicious requests · 22m ago</span></div></div>`
            ]
          })}
          <div style="pointer-events:none;position:absolute;inset:auto 0 0 0;height:25%;background:linear-gradient(to top,var(--s-bg-canvas),transparent);"></div>
        </div>
      `,
      code: `import { AnimatedList } from "@/components/sarahui/animated-list";

export function AnimatedListAuditFeed() {
  return (
    <AnimatedList delay={1400}>
      {auditLogs.map((log) => (
        <AuditRow key={log.id} log={log} />
      ))}
    </AnimatedList>
  );
}`
    },
    {
      title: 'Team Activity',
      preview: () => html`
        <div style="position:relative;display:flex;height:380px;width:100%;flex-direction:column;overflow:hidden;padding:16px;align-items:center;justify-content:flex-start;">
          ${U.AnimatedList({
            delay: 1300,
            items: [
              html`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);width:100%;max-width:380px;"><div style="width:34px;height:34px;border-radius:50%;background:#5B3DF5;color:#fff;display:grid;place-items:center;font-size:13px;font-weight:700;">AK</div><div style="flex:1;"><strong style="font-size:13px;display:block;">Alex Khan pushed 3 commits</strong><span class="s-small s-muted">feat: optimize canvas particle pipeline</span></div></div>`,
              html`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);width:100%;max-width:380px;"><div style="width:34px;height:34px;border-radius:50%;background:#EC4899;color:#fff;display:grid;place-items:center;font-size:13px;font-weight:700;">MR</div><div style="flex:1;"><strong style="font-size:13px;display:block;">Maya Rahman opened PR #142</strong><span class="s-small s-muted">docs: add interactive preview guidelines</span></div></div>`,
              html`<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);width:100%;max-width:380px;"><div style="width:34px;height:34px;border-radius:50%;background:#10B981;color:#fff;display:grid;place-items:center;font-size:13px;font-weight:700;">SN</div><div style="flex:1;"><strong style="font-size:13px;display:block;">Sara Naz approved release</strong><span class="s-small s-muted">v2.4 ready for edge deployment</span></div></div>`
            ]
          })}
          <div style="pointer-events:none;position:absolute;inset:auto 0 0 0;height:25%;background:linear-gradient(to top,var(--s-bg-canvas),transparent);"></div>
        </div>
      `,
      code: `import { AnimatedList } from "@/components/sarahui/animated-list";

export function AnimatedListTeamFeed() {
  return (
    <AnimatedList delay={1300}>
      {teamActivity.map((activity) => (
        <ActivityCard key={activity.id} {...activity} />
      ))}
    </AnimatedList>
  );
}`
    }
  ],

// 6. Dock - Parity with Magic UI (Custom Direction, Custom Magnification)
  Dock: [
    {
      title: 'Direction',
      description: 'Default dock with navigation items and social links separated by a divider, matching macOS-style dock.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;padding:var(--s-spacing-24);width:100%;">
          ${U.Dock({items:[
            {icon:'home',label:'Home'},
            {icon:'pencil',label:'Blog'},
            {separator:true},
            {icon:'github',label:'GitHub'},
            {icon:'linkedin',label:'LinkedIn'},
            {icon:'x',label:'X'},
            {icon:'mail',label:'Send Email'}
          ]})}
        </div>
      `,
      code: `import { Dock, DockIcon, Separator } from "@/components/sarahui/dock";

export function DockDemo() {
  return (
    <Dock>
      <DockIcon><HomeIcon /></DockIcon>
      <DockIcon><BlogIcon /></DockIcon>
      <Separator />
      <DockIcon><GitHubIcon /></DockIcon>
      <DockIcon><LinkedInIcon /></DockIcon>
      <DockIcon><XIcon /></DockIcon>
      <DockIcon><MailIcon /></DockIcon>
    </Dock>
  );
}`
    },
    {
      title: 'Custom Direction',
      description: 'Minimal app-icon-only dock with four application shortcuts, no text labels.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;padding:var(--s-spacing-24);width:100%;">
          ${U.Dock({items:[
            {icon:'github',label:'GitHub'},
            {icon:'drive',label:'Google Drive'},
            {icon:'notion',label:'Notion'},
            {icon:'whatsapp',label:'WhatsApp'}
          ]})}
        </div>
      `,
      code: `import { Dock, DockIcon } from "@/components/sarahui/dock";

export function DockDemo2() {
  return (
    <Dock direction="middle">
      <DockIcon><GitHubIcon /></DockIcon>
      <DockIcon><GoogleDriveIcon /></DockIcon>
      <DockIcon><NotionIcon /></DockIcon>
      <DockIcon><WhatsAppIcon /></DockIcon>
    </Dock>
  );
}`
    },
    {
      title: 'Custom Magnification',
      description: 'Same app icons with higher magnification and circular icon backgrounds for a polished look.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;padding:var(--s-spacing-24);width:100%;">
          ${U.Dock({
            iconMagnification: 60,
            iconDistance: 100,
            items:[
              {icon:'github',label:'GitHub',className:'s-dock-icon--subtle'},
              {icon:'drive',label:'Google Drive',className:'s-dock-icon--subtle'},
              {icon:'notion',label:'Notion',className:'s-dock-icon--subtle'},
              {icon:'whatsapp',label:'WhatsApp',className:'s-dock-icon--subtle'}
            ]
          })}
        </div>
      `,
      code: `import { Dock, DockIcon } from "@/components/sarahui/dock";

export function DockDemo3() {
  return (
    <Dock iconMagnification={60} iconDistance={100}>
      <DockIcon className="bg-black/10 dark:bg-white/10 rounded-full">
        <GitHubIcon />
      </DockIcon>
      <DockIcon className="bg-black/10 dark:bg-white/10 rounded-full">
        <GoogleDriveIcon />
      </DockIcon>
      <DockIcon className="bg-black/10 dark:bg-white/10 rounded-full">
        <NotionIcon />
      </DockIcon>
      <DockIcon className="bg-black/10 dark:bg-white/10 rounded-full">
        <WhatsAppIcon />
      </DockIcon>
    </Dock>
  );
}`
    }
  ],

              // 7. Globe
  Globe: [
    {
      title: 'Interactive',
      description: 'Autorotating 3D globe with interactive mouse and touch drag controls and live location beacons.',
      preview: () => html`
        <div style="position:relative;display:flex;height:440px;width:100%;max-width:620px;flex-direction:column;align-items:center;justify-content:flex-start;overflow:hidden;border-radius:16px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);margin:0 auto;padding-top:36px;">
          <span style="pointer-events:none;z-index:10;background:linear-gradient(180deg, var(--s-text-primary) 0%, color-mix(in srgb, var(--s-text-muted) 35%, transparent) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(4.5rem, 11vw, 6rem);font-weight:700;line-height:1;letter-spacing:-0.04em;user-select:none;">
            Globe
          </span>
          <div style="position:absolute;top:160px;left:50%;transform:translateX(-50%);width:640px;height:640px;max-width:none;display:flex;align-items:center;justify-content:center;z-index:2;">
            ${U.Globe({size:640})}
          </div>
          <div class="globe-stage-shadow"></div>
        </div>
      `,
      code: `import { Globe } from "@/components/sarahui/globe";

export function GlobeInteractive() {
  return (
    <div className="relative flex h-[440px] w-full max-w-xl items-center justify-center overflow-hidden rounded-xl border bg-background pt-8 pb-40">
      <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Globe
      </span>
      <Globe className="top-28" />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  );
}`
    },
    {
      title: 'Custom Configuration',
      description: 'Compact atmospheric globe customized for dense dashboard cards or sidebar displays.',
      preview: () => html`
        <div style="position:relative;display:flex;height:380px;width:100%;max-width:560px;flex-direction:column;align-items:center;justify-content:flex-start;overflow:hidden;border-radius:16px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);margin:0 auto;padding-top:28px;">
          <span style="pointer-events:none;z-index:10;background:linear-gradient(180deg, var(--s-text-primary) 0%, color-mix(in srgb, var(--s-text-muted) 35%, transparent) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(3.5rem, 8vw, 4.75rem);font-weight:700;line-height:1;letter-spacing:-0.04em;user-select:none;">
            World
          </span>
          <div style="position:absolute;top:130px;left:50%;transform:translateX(-50%);width:540px;height:540px;max-width:none;display:flex;align-items:center;justify-content:center;z-index:2;">
            ${U.Globe({size:540})}
          </div>
          <div class="globe-stage-shadow"></div>
        </div>
      `,
      code: `import { Globe } from "@/components/sarahui/globe";

export function GlobeCompact() {
  return (
    <div className="relative flex h-[380px] w-full max-w-lg items-center justify-center overflow-hidden rounded-xl border bg-background pt-6 pb-32">
      <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        World
      </span>
      <Globe className="top-24" />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  );
}`
    }
  ],

  // 8. TweetCard - Parity with Magic UI (Image Carousel, Meta URL Preview)
  TweetCard: [
    {
      title: 'Image Carousel',
      description: 'Tweet card showcasing embedded image and animated media attachments from official posts.',
      preview: () => html`
        <div style="max-width:480px;width:100%;margin:0 auto;">
          ${U.TweetCard({ id: '2103111024257954291' })}
        </div>
      `,
      code: `import { TweetCard } from "@/components/sarahui/tweet-card";

export function TweetCardImagesDemo() {
  return (
    <TweetCard
      id="2103111024257954291"
      className="shadow-2xl"
    />
  );
}`
    },
    {
      title: 'Meta URL Preview',
      description: 'Tweet card displaying an OpenGraph rich metadata card preview for external links.',
      preview: () => html`
        <div style="max-width:480px;width:100%;margin:0 auto;">
          ${U.TweetCard({ id: '2103155873623540169' })}
        </div>
      `,
      code: `import { TweetCard } from "@/components/sarahui/tweet-card";

export function TweetCardMetaDemo() {
  return (
    <TweetCard
      id="2103155873623540169"
      className="shadow-2xl"
    />
  );
}`
    }
  ],



  // 9. OrbitingCircles
  OrbitingCircles: [
    {
      title: 'Concentric Orbits',
      description: 'Multiple orbiting tracks rotating in synchronized opposite directions.',
      preview: () => demos.OrbitingCircles(),
      code: `import { OrbitingCircles } from "@/components/sarahui/orbiting-circles";
import { Icons } from "@/components/icons";

export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <OrbitingCircles iconSize={40}>
        <Icons.whatsapp />
        <Icons.notion />
        <Icons.openai />
        <Icons.googleDrive />
        <Icons.gitHub />
      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
        <Icons.whatsapp />
        <Icons.notion />
        <Icons.openai />
        <Icons.googleDrive />
      </OrbitingCircles>
    </div>
  );
}`
    },
    {
      title: 'Single Orbit',
      description: 'A single orbit of icons rotating at custom radius and speed.',
      preview: () => html`
        <div style="position:relative;display:flex;height:400px;width:100%;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;">
          ${U.OrbitingCircles({
            iconSize: 40,
            radius: 120,
            icons: ['whatsapp', 'notion', 'openai', 'drive']
          })}
        </div>
      `,
      code: `import { OrbitingCircles } from "@/components/sarahui/orbiting-circles";
import { Icons } from "@/components/icons";

export function OrbitingCirclesSingle() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden">
      <OrbitingCircles iconSize={40} radius={120}>
        <Icons.whatsapp />
        <Icons.notion />
        <Icons.openai />
        <Icons.googleDrive />
      </OrbitingCircles>
    </div>
  );
}`
    }
  ],

  // 10. AvatarCircles
  AvatarCircles: [
    {
      title: 'Default Showcase',
      description: 'Overlapping avatar circles with overflow counter badge.',
      preview: () => demos.AvatarCircles(),
      code: `import { AvatarCircles } from "@/components/sarahui/avatar-circles";

const avatarUrls = [
  "https://avatars.githubusercontent.com/u/55315718",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
];

export function AvatarCirclesDemo() {
  return <AvatarCircles numPeople={99} avatarUrls={avatarUrls} />;
}`
    },
    {
      title: 'Small Cluster',
      description: 'Compact 3-member team cluster with exact member count display.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;padding:32px 16px;">
          ${U.AvatarCircles({
            numPeople: 42,
            avatarUrls: [
              "https://avatars.githubusercontent.com/u/55315718",
              "https://avatars.githubusercontent.com/u/20110627",
              "https://avatars.githubusercontent.com/u/106103625"
            ]
          })}
        </div>
      `,
      code: `import { AvatarCircles } from "@/components/sarahui/avatar-circles";

const avatarUrls = [
  "https://avatars.githubusercontent.com/u/55315718",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
];

export function AvatarCirclesSmall() {
  return <AvatarCircles numPeople={42} avatarUrls={avatarUrls} />;
}`
    }
  ],

  // 11. IconCloud
  IconCloud: [
    {
      title: 'Interactive 3D Tech Cloud',
      description: 'Interactive 3D Fibonacci sphere rotating tech stack brand icons with interactive mouse drag and trackball rotation.',
      preview: () => demos.IconCloud(),
      code: `import { IconCloud } from "@/components/sarahui/icon-cloud";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "react",
  "flutter",
  "android",
  "html5",
  "css",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "androidstudio",
  "figma",
  "tailwindcss",
  "python",
  "graphql",
  "mongodb",
];

export function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}`
    },
    {
      title: 'With Images',
      description: 'Interactive 3D tag cloud rendering circular profile and photography image assets.',
      preview: () => html`
        <div style="position:relative;display:flex;width:100%;align-items:center;justify-content:center;overflow:hidden;">
          ${U.IconCloud({
            images: [
              "https://images.unsplash.com/photo-1720048171230-c60d162f93a0?q=80&w=200&auto=format&fit=crop",
              "https://plus.unsplash.com/premium_photo-1675553988173-a5249b5815fe?q=80&w=200&auto=format&fit=crop",
              "https://plus.unsplash.com/premium_photo-1675297844586-534b030564e0?q=80&w=200&auto=format&fit=crop",
              "https://plus.unsplash.com/premium_photo-1675555581018-7f1a352ff9a6?q=80&w=200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1719937050517-68d4e2a1702e?q=80&w=200&auto=format&fit=crop",
              "https://avatars.githubusercontent.com/u/16860528",
              "https://avatars.githubusercontent.com/u/20110627",
              "https://avatars.githubusercontent.com/u/106103625",
              "https://avatars.githubusercontent.com/u/59228569",
              "https://avatars.githubusercontent.com/u/59442788"
            ]
          })}
        </div>
      `,
      code: `import { IconCloud } from "@/components/sarahui/icon-cloud";

const images = [
  "https://images.unsplash.com/photo-1720048171230-c60d162f93a0?q=80&w=200&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1675553988173-a5249b5815fe?q=80&w=200&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1675297844586-534b030564e0?q=80&w=200&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1675555581018-7f1a352ff9a6?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1719937050517-68d4e2a1702e?q=80&w=200&auto=format&fit=crop",
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569"
];

export function IconCloudImagesDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background">
      <IconCloud images={images} />
    </div>
  );
}`
    }
  ],

// 12. Lens - Parity with Magic UI
  Lens: [
    {
      title: 'Default',
      description: 'Interactive cursor-following magnifying lens revealing sharp details on hover.',
      preview: () => demos.Lens(),
      code: `import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Lens } from "@/components/sarahui/lens"

export function LensDemo() {
  return (
    <Card className="relative max-w-md shadow-none">
      <CardHeader>
        <Lens
          zoomFactor={2}
          lensSize={150}
          isStatic={false}
          ariaLabel="Zoom Area"
        >
          <img
            src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop"
            alt="image placeholder"
            width={500}
            height={500}
          />
        </Lens>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl">Your next camp</CardTitle>
        <CardDescription>
          See our latest and best camp destinations all across the five
          continents of the globe.
        </CardDescription>
      </CardContent>
      <CardFooter className="space-x-4">
        <Button>Let's go</Button>
        <Button variant="secondary">Another time</Button>
      </CardFooter>
    </Card>
  )
}`
    },
    {
      title: 'Static Lens',
      description: 'Pinned magnifying loupe highlighting a critical focal area continuously.',
      preview: () => html`
        <div style="display:flex;justify-content:center;width:100%;padding:24px 0;">
          <div style="max-width:380px;width:100%;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
            <div style="padding:16px 16px 0;">
              ${U.Lens({
                isStatic: true,
                position: { x: 230, y: 110 },
                zoomFactor: 2,
                lensSize: 150,
                ariaLabel: "Static Zoom Area",
                children: html`<img src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop" alt="Camp destination" style="width:100%;height:220px;object-fit:cover;display:block;border-radius:10px;">`
              })}
            </div>
            <div style="padding:16px 20px 20px;">
              <h4 style="font-size:18px;font-weight:700;margin:0 0 6px;color:var(--s-text-primary);">Your next camp</h4>
              <p class="s-small s-muted" style="margin:0 0 16px;line-height:1.5;">See our latest and best camp destinations all across the five continents of the globe.</p>
              <div style="display:flex;gap:10px;">
                <button type="button" class="demo-login-btn-primary" style="padding:8px 16px;font-size:13px;border-radius:8px;">Let's go</button>
                <button type="button" class="demo-login-btn-outline" style="padding:8px 16px;font-size:13px;border-radius:8px;">Another time</button>
              </div>
            </div>
          </div>
        </div>
      `,
      code: `import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Lens } from "@/components/sarahui/lens"

export function LensStatic() {
  return (
    <Card className="relative max-w-md shadow-none">
      <CardHeader>
        <Lens isStatic position={{ x: 260, y: 150 }} zoomFactor={2} lensSize={150}>
          <img
            src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop"
            alt="image placeholder"
            width={500}
            height={500}
          />
        </Lens>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl">Your next camp</CardTitle>
        <CardDescription>
          See our latest and best camp destinations all across the five
          continents of the globe.
        </CardDescription>
      </CardContent>
      <CardFooter className="space-x-4">
        <Button>Let's go</Button>
        <Button variant="secondary">Another time</Button>
      </CardFooter>
    </Card>
  )
}`
    },
    {
      title: 'Lens with a Default Position',
      description: 'Lens that rests at a preset coordinate and smoothly tracks pointer upon hover.',
      preview: () => html`
        <div style="display:flex;justify-content:center;width:100%;padding:24px 0;">
          <div style="max-width:380px;width:100%;border-radius:16px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
            <div style="padding:16px 16px 0;">
              ${U.Lens({
                defaultPosition: { x: 200, y: 110 },
                zoomFactor: 2,
                lensSize: 150,
                ariaLabel: "Resting Zoom Area",
                children: html`<img src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop" alt="Camp destination" style="width:100%;height:220px;object-fit:cover;display:block;border-radius:10px;">`
              })}
            </div>
            <div style="padding:16px 20px 20px;">
              <h4 style="font-size:18px;font-weight:700;margin:0 0 6px;color:var(--s-text-primary);">Your next camp</h4>
              <p class="s-small s-muted" style="margin:0 0 16px;line-height:1.5;">See our latest and best camp destinations all across the five continents of the globe.</p>
              <div style="display:flex;gap:10px;">
                <button type="button" class="demo-login-btn-primary" style="padding:8px 16px;font-size:13px;border-radius:8px;">Let's go</button>
                <button type="button" class="demo-login-btn-outline" style="padding:8px 16px;font-size:13px;border-radius:8px;">Another time</button>
              </div>
            </div>
          </div>
        </div>
      `,
      code: `import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Lens } from "@/components/sarahui/lens"

export function LensDefaultPosition() {
  return (
    <Card className="relative max-w-md shadow-none">
      <CardHeader>
        <Lens defaultPosition={{ x: 260, y: 150 }} zoomFactor={2} lensSize={150}>
          <img
            src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop"
            alt="image placeholder"
            width={500}
            height={500}
          />
        </Lens>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl">Your next camp</CardTitle>
        <CardDescription>
          See our latest and best camp destinations all across the five
          continents of the globe.
        </CardDescription>
      </CardContent>
      <CardFooter className="space-x-4">
        <Button>Let's go</Button>
        <Button variant="secondary">Another time</Button>
      </CardFooter>
    </Card>
  )
}`
    }
  ],

  // 13. Pointer
  Pointer: [
    {
      title: 'Multiplayer',
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
      title: 'Custom Cursor',
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
      title: 'Default',
      description: 'A customizable, physics-based smooth cursor animation component with spring animations and rotation effects.',
      preview: () => demos.SmoothCursor(),
      code: `import { SmoothCursor } from "@/components/sarahui/smooth-cursor";

export default function SmoothCursorDemo() {
  return (
    <>
      <span className="hidden md:block">Move your mouse around</span>
      <span className="block md:hidden">
        SmoothCursor is disabled on touch devices
      </span>
      <SmoothCursor />
    </>
  );
}`
    }
  ],

  // 15. ProgressiveBlur
ProgressiveBlur: [
    {
      title: 'Bottom Blur',
      description: 'Progressive multi-stop gradient blur overlay positioned at the bottom of a scrollable feed.',
      preview: () => {
        const items = Array.from({length: 12}).map((_, i) => ({
          title: `Project Activity #${i + 1}`,
          desc: `Automated background pipeline executed step ${i + 1} successfully.`,
          time: `${(i + 1) * 3}m ago`
        }));
        return html`
          <div style="position:relative;height:320px;width:100%;max-width:440px;margin:0 auto;overflow:hidden;border-radius:14px;border:1px solid var(--s-glass-border, var(--s-border-default));background:var(--s-glass-bg, var(--s-bg-surface));">
            <div style="overflow-y:auto;height:100%;padding:14px;display:flex;flex-direction:column;gap:8px;box-sizing:border-box;">
              ${items.map(item => html`
                <div style="padding:10px 14px;border-radius:10px;background:var(--s-glass-bg-subtle, var(--s-bg-subtle));border:1px solid var(--s-glass-border, var(--s-border-default));display:flex;justify-content:space-between;align-items:center;">
                  <div>
                    <strong style="font-size:12px;color:var(--s-text-primary);">${item.title}</strong>
                    <p style="font-size:11px;color:var(--s-text-muted);margin:2px 0 0;">${item.desc}</p>
                  </div>
                  <span style="font-size:10px;color:var(--s-text-muted);white-space:nowrap;margin-left:8px;">${item.time}</span>
                </div>
              `)}
            </div>
            ${U.ProgressiveBlur({position:'bottom',height:'36%'})}
          </div>
        `;
      },
      code: `import { ProgressiveBlur } from "@/components/sarahui/progressive-blur";

export function ProgressiveBlurDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-xl border">
      <div className="h-full overflow-y-auto p-4 space-y-2">
        {/* Scrollable feed items */}
      </div>
      <ProgressiveBlur position="bottom" height="35%" />
    </div>
  );
}`
    },
    {
      title: 'Dual-Edge Fade',
      description: 'Dual top and bottom progressive blur dissolving content smoothly at both container boundaries.',
      preview: () => {
        const logs = [
          'Initializing edge worker cluster...',
          'Loading WebKit backdrop-filter shaders',
          'Computing 8-layer Gaussian blur stops',
          'Connecting to Redis memory broker',
          'Compiling TypeScript declarations',
          'Bundling CSS variable stylesheets',
          'Running 75 automated safety audits',
          'Publishing package to npm registry',
          'Health check passed: 100% operational'
        ];
        return html`
          <div style="position:relative;height:300px;width:100%;max-width:440px;margin:0 auto;overflow:hidden;border-radius:14px;border:1px solid var(--s-glass-border, var(--s-border-default));background:var(--s-glass-bg, var(--s-bg-surface));">
            <div style="overflow-y:auto;height:100%;padding:18px 16px;display:flex;flex-direction:column;gap:8px;font-family:var(--s-font-mono),monospace;box-sizing:border-box;">
              ${logs.map((log, i) => html`
                <div style="font-size:11.5px;color:var(--s-text-secondary);padding:6px 10px;border-radius:6px;background:var(--s-glass-bg-subtle, var(--s-bg-subtle));display:flex;align-items:center;gap:8px;">
                  <span style="color:var(--s-text-brand);font-weight:700;">$</span>
                  <span>${log}</span>
                </div>
              `)}
            </div>
            ${U.ProgressiveBlur({position:'both',height:'28%'})}
          </div>
        `;
      },
      code: `import { ProgressiveBlur } from "@/components/sarahui/progressive-blur";

export function ProgressiveBlurDual() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl border">
      <div className="h-full overflow-y-auto p-4 space-y-2">
        {/* Terminal logs or feed */}
      </div>
      <ProgressiveBlur position="both" height="28%" />
    </div>
  );
}`
    },
    {
      title: 'Hero Surface Vignette',
      description: 'Optical gradient blur overlay creating a seamless transition from rich graphics into content surfaces.',
      preview: () => html`
        <div style="position:relative;height:320px;width:100%;max-width:440px;margin:0 auto;overflow:hidden;border-radius:14px;border:1px solid var(--s-glass-border, var(--s-border-default));background:radial-gradient(circle at 50% 20%, rgba(91,61,245,0.35) 0%, rgba(217,70,239,0.2) 50%, transparent 80%), var(--s-bg-surface);display:flex;align-items:flex-end;padding:20px;box-sizing:border-box;">
          <div style="position:relative;z-index:2;width:100%;">
            <div style="padding:14px 18px;border-radius:12px;background:var(--s-glass-bg, var(--s-bg-surface));border:1px solid var(--s-glass-border, var(--s-border-default));backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                <span style="font-size:13px;">✨</span>
                <strong style="font-size:13px;color:var(--s-text-primary);">Liquid Glassmorphism</strong>
              </div>
              <p style="font-size:11.5px;color:var(--s-text-muted);margin:0;line-height:1.5;">Multi-stop optical gradient blur dissolving into high-contrast surface text.</p>
            </div>
          </div>
          ${U.ProgressiveBlur({position:'bottom',height:'55%'})}
        </div>
      `,
      code: `import { ProgressiveBlur } from "@/components/sarahui/progressive-blur";

export function ProgressiveBlurHero() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-xl border bg-gradient-to-br from-indigo-500/30 to-purple-500/20 p-6 flex items-end">
      <div className="relative z-10 w-full p-4 rounded-xl bg-background/80 border backdrop-blur-md">
        <h4 className="font-semibold text-sm">Liquid Glassmorphism</h4>
        <p className="text-xs text-muted-foreground">Smooth optical blur overlay.</p>
      </div>
      <ProgressiveBlur position="bottom" height="55%" />
    </div>
  );
}`
    }
  ],

// 16. DottedMap - Parity with Magic UI (Interactive Pulse Markers & Flight Routes)
DottedMap: [
    {
      title: 'Global Presence & Routes',
      description: 'Interactive SVG dotted world map displaying global presence pins, country flags, and animated flight paths.',
      preview: () => demos.DottedMap(),
      code: `import { DottedMap } from "@/components/sarahui/dotted-map";

export function DottedMapDemo() {
  const markers = [
    { lat: 37.7749, lng: -122.4194, label: "San Francisco", country: "us", pulse: true },
    { lat: 40.7128, lng: -74.0060, label: "New York", country: "us", pulse: true },
    { lat: 51.5074, lng: -0.1278, label: "London", country: "gb", pulse: true },
    { lat: 25.2048, lng: 55.2708, label: "Dubai", country: "ae", pulse: true },
    { lat: 23.8103, lng: 90.4125, label: "Dhaka", country: "bd", pulse: true },
    { lat: 35.6762, lng: 139.6503, label: "Tokyo", country: "jp", pulse: true },
    { lat: 1.3521, lng: 103.8198, label: "Singapore", country: "sg", pulse: true },
    { lat: -33.8688, lng: 151.2093, label: "Sydney", country: "au", pulse: true }
  ];

  const lines = [
    { from: { lat: 37.7749, lng: -122.4194 }, to: { lat: 51.5074, lng: -0.1278 } },
    { from: { lat: 51.5074, lng: -0.1278 }, to: { lat: 25.2048, lng: 55.2708 } },
    { from: { lat: 25.2048, lng: 55.2708 }, to: { lat: 23.8103, lng: 90.4125 } },
    { from: { lat: 23.8103, lng: 90.4125 }, to: { lat: 1.3521, lng: 103.8198 } },
    { from: { lat: 1.3521, lng: 103.8198 }, to: { lat: -33.8688, lng: 151.2093 } },
    { from: { lat: 51.5074, lng: -0.1278 }, to: { lat: 35.6762, lng: 139.6503 } },
    { from: { lat: 35.6762, lng: 139.6503 }, to: { lat: 37.7749, lng: -122.4194 } }
  ];

  return (
    <div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background">
      <DottedMap markers={markers} lines={lines} />
    </div>
  );
}`
    },
    {
      title: 'Minimal Pulse Markers',
      description: 'Clean pulsating radar beacons highlighting live edge server infrastructure.',
      preview: () => html`
        <div style="position:relative;display:flex;height:380px;width:100%;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:24px;">
          ${U.DottedMap({
            markers: [
              { lat: 37.7749, lng: -122.4194, size: 3.5, pulse: true, color: '#3B82F6' },
              { lat: 51.5074, lng: -0.1278, size: 3.5, pulse: true, color: '#10B981' },
              { lat: 35.6762, lng: 139.6503, size: 3.5, pulse: true, color: '#F59E0B' },
              { lat: -33.8688, lng: 151.2093, size: 3.5, pulse: true, color: '#EC4899' },
              { lat: 23.8103, lng: 90.4125, size: 3.5, pulse: true, color: '#8B5CF6' }
            ]
          })}
        </div>
      `,
      code: `import { DottedMap } from "@/components/sarahui/dotted-map";

export function DottedMapPulse() {
  const markers = [
    { lat: 37.7749, lng: -122.4194, size: 3.5, pulse: true, color: "#3B82F6" },
    { lat: 51.5074, lng: -0.1278, size: 3.5, pulse: true, color: "#10B981" },
    { lat: 35.6762, lng: 139.6503, size: 3.5, pulse: true, color: "#F59E0B" },
    { lat: -33.8688, lng: 151.2093, size: 3.5, pulse: true, color: "#EC4899" },
    { lat: 23.8103, lng: 90.4125, size: 3.5, pulse: true, color: "#8B5CF6" }
  ];

  return <DottedMap markers={markers} />;
}`
    },
    {
      title: 'Refined Dot Matrix',
      description: 'High-density micro-dot matrix with custom color and dot size.',
      preview: () => html`
        <div style="position:relative;display:flex;height:380px;width:100%;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:24px;">
          ${U.DottedMap({
            dotRadius: 1.2,
            dotColor: 'var(--s-color-brand-500, #5B3DF5)',
            markerColor: '#10B981',
            markers: [
              { lat: 40.7128, lng: -74.0060, label: 'US-East', pulse: true },
              { lat: 50.1109, lng: 8.6821, label: 'EU-Central', pulse: true },
              { lat: 1.3521, lng: 103.8198, label: 'AP-Southeast', pulse: true }
            ]
          })}
        </div>
      `,
      code: `import { DottedMap } from "@/components/sarahui/dotted-map";

export function DottedMapMatrix() {
  return (
    <DottedMap
      dotRadius={1.2}
      dotColor="#5B3DF5"
      markerColor="#10B981"
      markers={[
        { lat: 40.7128, lng: -74.0060, label: "US-East", pulse: true },
        { lat: 50.1109, lng: 8.6821, label: "EU-Central", pulse: true },
        { lat: 1.3521, lng: 103.8198, label: "AP-Southeast", pulse: true }
      ]}
    />
  );
}`
    }
  ],

// 17. AnimatedBeam - Parity with Magic UI (Bi-Directional, Multiple Inputs, Multiple Outputs)
AnimatedBeam: [
    {
      title: 'Uni-Directional',
      description: 'Smooth SVG beam connecting user to destination node with radiant gradient flow.',
      preview: () => html`
        <div style="display:flex;justify-content:center;width:100%;">
          <div class="animated-beam-demo-container" data-s-beam-container style="position:relative;display:flex;height:160px;width:100%;max-width:500px;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:40px;">
            <div style="display:flex;width:100%;align-items:center;justify-content:space-between;position:relative;z-index:2;">
              <div id="v-uni-user" class="beam-circle-node" title="User">${Icon({name:'user',size:24})}</div>
              <div id="v-uni-openai" class="beam-circle-node" title="OpenAI">${Icon({name:'openai',size:24})}</div>
            </div>
            <svg class="beam-svg-overlay" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;">
              <defs>
                <linearGradient id="beam-uni-grad" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop>
                  <stop offset="0%" stop-color="#ffaa40"></stop>
                  <stop offset="32.5%" stop-color="#9c40ff"></stop>
                  <stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop>
                </linearGradient>
              </defs>
              <path class="s-beam-path-bg" data-bg-for="v-uni-path" />
              <path class="s-beam-path" id="v-uni-path" data-from="#v-uni-user" data-to="#v-uni-openai" data-duration="3" stroke="url(#beam-uni-grad)" />
            </svg>
          </div>
        </div>
      `,
      code: `import React, { forwardRef, useRef } from "react";
import { AnimatedBeam } from "@/components/sarahui/animated-beam";
import { UserIcon, OpenAIIcon } from "sarahui/icons";

export function AnimatedBeamUniDirectionalDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[340px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background p-10"
      ref={containerRef}
    >
      <div className="flex w-full max-w-sm items-center justify-between">
        <div ref={fromRef} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
          <UserIcon className="size-6" />
        </div>
        <div ref={toRef} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
          <OpenAIIcon className="size-6" />
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef}
        toRef={toRef}
        duration={3}
      />
    </div>
  );
}`
    },
    {
      title: 'Bi-Directional',
      description: 'Simultaneous two-way continuous packet transfer between services.',
      preview: () => html`
        <div style="display:flex;justify-content:center;width:100%;">
          <div class="animated-beam-demo-container" data-s-beam-container style="position:relative;display:flex;height:160px;width:100%;max-width:500px;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:40px;">
            <div style="display:flex;width:100%;align-items:center;justify-content:space-between;position:relative;z-index:2;">
              <div id="v-bi-user" class="beam-circle-node" title="User">${Icon({name:'user',size:24})}</div>
              <div id="v-bi-openai" class="beam-circle-node" title="OpenAI">${Icon({name:'openai',size:24})}</div>
            </div>
            <svg class="beam-svg-overlay" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;">
              <defs>
                <linearGradient id="beam-bi-1" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop>
                  <stop offset="0%" stop-color="#ffaa40"></stop>
                  <stop offset="32.5%" stop-color="#9c40ff"></stop>
                  <stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop>
                </linearGradient>
                <linearGradient id="beam-bi-2" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop>
                  <stop offset="0%" stop-color="#ffaa40"></stop>
                  <stop offset="32.5%" stop-color="#9c40ff"></stop>
                  <stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop>
                </linearGradient>
              </defs>
              <path class="s-beam-path-bg" data-bg-for="v-bi-p1" />
              <path class="s-beam-path-bg" data-bg-for="v-bi-p2" />
              <path class="s-beam-path" id="v-bi-p1" data-from="#v-bi-user" data-to="#v-bi-openai" data-curvature="-20" data-start-y-offset="10" data-end-y-offset="10" stroke="url(#beam-bi-1)" />
              <path class="s-beam-path s-beam-path--reverse" id="v-bi-p2" data-from="#v-bi-user" data-to="#v-bi-openai" data-curvature="20" data-start-y-offset="-10" data-end-y-offset="-10" data-reverse="true" stroke="url(#beam-bi-2)" />
            </svg>
          </div>
        </div>
      `,
      code: `import React, { useRef } from "react";
import { AnimatedBeam } from "@/components/sarahui/animated-beam";
import { UserIcon, OpenAIIcon } from "sarahui/icons";

export function AnimatedBeamBiDirectionalDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[340px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background p-10"
      ref={containerRef}
    >
      <div className="flex w-full max-w-sm items-center justify-between">
        <div ref={div1Ref} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
          <UserIcon className="size-6" />
        </div>
        <div ref={div2Ref} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
          <OpenAIIcon className="size-6" />
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        curvature={50}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div1Ref}
        curvature={-50}
        duration={3}
        reverse
      />
    </div>
  );
}`
    },
    {
      title: 'Multiple Inputs',
      description: 'Multiple input sources converging onto a central database architecture.',
      preview: () => html`
        <div class="animated-beam-demo-container" data-s-beam-container style="position:relative;display:flex;height:500px;width:100%;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:40px;">
          <div style="display:flex;width:100%;max-width:512px;height:100%;flex-direction:row;align-items:stretch;justify-content:space-between;position:relative;z-index:2;">
            <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px;">
              <div id="v-mi-1" class="beam-circle-node" title="Google Drive">${Icon({name:'drive',size:22})}</div>
              <div id="v-mi-2" class="beam-circle-node" title="Google Docs">${Icon({name:'docs',size:22})}</div>
              <div id="v-mi-3" class="beam-circle-node" title="WhatsApp">${Icon({name:'whatsapp',size:22})}</div>
              <div id="v-mi-4" class="beam-circle-node" title="Messenger">${Icon({name:'messenger',size:22})}</div>
              <div id="v-mi-5" class="beam-circle-node" title="Notion">${Icon({name:'notion',size:22})}</div>
            </div>
            <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
              <div id="v-mi-hub" class="beam-circle-node beam-circle-hub" title="OpenAI Hub">${Icon({name:'openai',size:32})}</div>
            </div>
            <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
              <div id="v-mi-user" class="beam-circle-node" title="User">${Icon({name:'user',size:24})}</div>
            </div>
          </div>
          <svg class="beam-svg-overlay" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;">
            <defs>
              <linearGradient id="beam-mi-g1" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop><stop offset="0%" stop-color="#ffaa40"></stop><stop offset="32.5%" stop-color="#9c40ff"></stop><stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop></linearGradient>
              <linearGradient id="beam-mi-g2" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop><stop offset="0%" stop-color="#ffaa40"></stop><stop offset="32.5%" stop-color="#9c40ff"></stop><stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop></linearGradient>
              <linearGradient id="beam-mi-g3" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop><stop offset="0%" stop-color="#ffaa40"></stop><stop offset="32.5%" stop-color="#9c40ff"></stop><stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop></linearGradient>
              <linearGradient id="beam-mi-g4" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop><stop offset="0%" stop-color="#ffaa40"></stop><stop offset="32.5%" stop-color="#9c40ff"></stop><stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop></linearGradient>
              <linearGradient id="beam-mi-g5" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop><stop offset="0%" stop-color="#ffaa40"></stop><stop offset="32.5%" stop-color="#9c40ff"></stop><stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop></linearGradient>
              <linearGradient id="beam-mi-g6" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop><stop offset="0%" stop-color="#ffaa40"></stop><stop offset="32.5%" stop-color="#9c40ff"></stop><stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop></linearGradient>
            </defs>
            <path class="s-beam-path-bg" data-bg-for="v-mi-p1" />
            <path class="s-beam-path-bg" data-bg-for="v-mi-p2" />
            <path class="s-beam-path-bg" data-bg-for="v-mi-p3" />
            <path class="s-beam-path-bg" data-bg-for="v-mi-p4" />
            <path class="s-beam-path-bg" data-bg-for="v-mi-p5" />
            <path class="s-beam-path-bg" data-bg-for="v-mi-p6" />

            <path class="s-beam-path" id="v-mi-p1" data-from="#v-mi-1" data-to="#v-mi-hub" stroke="url(#beam-mi-g1)" />
            <path class="s-beam-path" id="v-mi-p2" data-from="#v-mi-2" data-to="#v-mi-hub" stroke="url(#beam-mi-g2)" />
            <path class="s-beam-path" id="v-mi-p3" data-from="#v-mi-3" data-to="#v-mi-hub" stroke="url(#beam-mi-g3)" />
            <path class="s-beam-path" id="v-mi-p4" data-from="#v-mi-4" data-to="#v-mi-hub" stroke="url(#beam-mi-g4)" />
            <path class="s-beam-path" id="v-mi-p5" data-from="#v-mi-5" data-to="#v-mi-hub" stroke="url(#beam-mi-g5)" />
            <path class="s-beam-path" id="v-mi-p6" data-from="#v-mi-hub" data-to="#v-mi-user" stroke="url(#beam-mi-g6)" />
          </svg>
        </div>
      `,
      code: `import React, { useRef } from "react";
import { AnimatedBeam } from "@/components/sarahui/animated-beam";
import { GoogleDriveIcon, GoogleDocsIcon, WhatsAppIcon, MessengerIcon, NotionIcon, OpenAIIcon, UserIcon } from "sarahui/icons";

export function AnimatedBeamMultipleInputsDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const outRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center gap-2">
          <div ref={div1Ref} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
            <GoogleDriveIcon className="size-5" />
          </div>
          <div ref={div2Ref} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
            <GoogleDocsIcon className="size-5" />
          </div>
          <div ref={div3Ref} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
            <WhatsAppIcon className="size-5" />
          </div>
          <div ref={div4Ref} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
            <MessengerIcon className="size-5" />
          </div>
          <div ref={div5Ref} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
            <NotionIcon className="size-5" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div ref={hubRef} className="z-10 flex size-16 items-center justify-center rounded-full border-2 border-primary bg-white dark:bg-zinc-900 shadow-lg">
            <OpenAIIcon className="size-8" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div ref={outRef} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
            <UserIcon className="size-6" />
          </div>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={hubRef} />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={hubRef} />
      <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={hubRef} />
      <AnimatedBeam containerRef={containerRef} fromRef={div4Ref} toRef={hubRef} />
      <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={hubRef} />
      <AnimatedBeam containerRef={containerRef} fromRef={hubRef} toRef={outRef} />
    </div>
  );
}`
    },
    {
      title: 'Multiple Outputs',
      description: 'Central event distributor dispatching simultaneous payloads to external services.',
      preview: () => html`
        <div class="animated-beam-demo-container" data-s-beam-container style="position:relative;display:flex;height:500px;width:100%;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:40px;">
          <div style="display:flex;width:100%;max-width:512px;height:100%;flex-direction:row;align-items:stretch;justify-content:space-between;position:relative;z-index:2;">
            <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
              <div id="v-mo-user" class="beam-circle-node" title="User">${Icon({name:'user',size:24})}</div>
            </div>
            <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
              <div id="v-mo-hub" class="beam-circle-node beam-circle-hub" title="OpenAI Hub">${Icon({name:'openai',size:32})}</div>
            </div>
            <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px;">
              <div id="v-mo-1" class="beam-circle-node" title="Google Drive">${Icon({name:'drive',size:22})}</div>
              <div id="v-mo-2" class="beam-circle-node" title="Google Docs">${Icon({name:'docs',size:22})}</div>
              <div id="v-mo-3" class="beam-circle-node" title="WhatsApp">${Icon({name:'whatsapp',size:22})}</div>
              <div id="v-mo-4" class="beam-circle-node" title="Messenger">${Icon({name:'messenger',size:22})}</div>
              <div id="v-mo-5" class="beam-circle-node" title="Notion">${Icon({name:'notion',size:22})}</div>
            </div>
          </div>
          <svg class="beam-svg-overlay" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;">
            <defs>
              <linearGradient id="beam-mo-g1" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop><stop offset="0%" stop-color="#ffaa40"></stop><stop offset="32.5%" stop-color="#9c40ff"></stop><stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop></linearGradient>
              <linearGradient id="beam-mo-g2" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop><stop offset="0%" stop-color="#ffaa40"></stop><stop offset="32.5%" stop-color="#9c40ff"></stop><stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop></linearGradient>
              <linearGradient id="beam-mo-g3" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop><stop offset="0%" stop-color="#ffaa40"></stop><stop offset="32.5%" stop-color="#9c40ff"></stop><stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop></linearGradient>
              <linearGradient id="beam-mo-g4" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop><stop offset="0%" stop-color="#ffaa40"></stop><stop offset="32.5%" stop-color="#9c40ff"></stop><stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop></linearGradient>
              <linearGradient id="beam-mo-g5" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop><stop offset="0%" stop-color="#ffaa40"></stop><stop offset="32.5%" stop-color="#9c40ff"></stop><stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop></linearGradient>
              <linearGradient id="beam-mo-g6" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ffaa40" stop-opacity="0"></stop><stop offset="0%" stop-color="#ffaa40"></stop><stop offset="32.5%" stop-color="#9c40ff"></stop><stop offset="100%" stop-color="#9c40ff" stop-opacity="0"></stop></linearGradient>
            </defs>
            <path class="s-beam-path-bg" data-bg-for="v-mo-p1" />
            <path class="s-beam-path-bg" data-bg-for="v-mo-p2" />
            <path class="s-beam-path-bg" data-bg-for="v-mo-p3" />
            <path class="s-beam-path-bg" data-bg-for="v-mo-p4" />
            <path class="s-beam-path-bg" data-bg-for="v-mo-p5" />
            <path class="s-beam-path-bg" data-bg-for="v-mo-p6" />

            <path class="s-beam-path" id="v-mo-p1" data-from="#v-mo-1" data-to="#v-mo-hub" data-duration="3" stroke="url(#beam-mo-g1)" />
            <path class="s-beam-path" id="v-mo-p2" data-from="#v-mo-2" data-to="#v-mo-hub" data-duration="3" stroke="url(#beam-mo-g2)" />
            <path class="s-beam-path" id="v-mo-p3" data-from="#v-mo-3" data-to="#v-mo-hub" data-duration="3" stroke="url(#beam-mo-g3)" />
            <path class="s-beam-path" id="v-mo-p4" data-from="#v-mo-4" data-to="#v-mo-hub" data-duration="3" stroke="url(#beam-mo-g4)" />
            <path class="s-beam-path" id="v-mo-p5" data-from="#v-mo-5" data-to="#v-mo-hub" data-duration="3" stroke="url(#beam-mo-g5)" />
            <path class="s-beam-path" id="v-mo-p6" data-from="#v-mo-hub" data-to="#v-mo-user" data-duration="3" stroke="url(#beam-mo-g6)" />
          </svg>
        </div>
      `,
      code: `import React, { useRef } from "react";
import { AnimatedBeam } from "@/components/sarahui/animated-beam";
import { GoogleDriveIcon, GoogleDocsIcon, WhatsAppIcon, MessengerIcon, NotionIcon, OpenAIIcon, UserIcon } from "sarahui/icons";

export function AnimatedBeamMultipleOutputsDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center">
          <div ref={userRef} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
            <UserIcon className="size-6" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div ref={hubRef} className="z-10 flex size-16 items-center justify-center rounded-full border-2 border-primary bg-white dark:bg-zinc-900 shadow-lg">
            <OpenAIIcon className="size-8" />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <div ref={div1Ref} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
            <GoogleDriveIcon className="size-5" />
          </div>
          <div ref={div2Ref} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
            <GoogleDocsIcon className="size-5" />
          </div>
          <div ref={div3Ref} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
            <WhatsAppIcon className="size-5" />
          </div>
          <div ref={div4Ref} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
            <MessengerIcon className="size-5" />
          </div>
          <div ref={div5Ref} className="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-zinc-900 shadow-md">
            <NotionIcon className="size-5" />
          </div>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={hubRef} duration={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={hubRef} duration={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={hubRef} duration={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={div4Ref} toRef={hubRef} duration={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={hubRef} duration={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={hubRef} toRef={userRef} duration={3} />
    </div>
  );
}`
    }
  ],

// 18. BorderBeam - Parity with Magic UI (2 Border Beams, Reverse, Spring Animation)
  BorderBeam: [
    {
      title: '2 Border Beams',
      description: 'Two synchronized border beams with offset delay traveling around the card perimeter.',
      preview: () => html`
        <div class="demo-login-card" style="width:100%;max-width:350px;">
          <div style="margin-bottom:16px;">
            <h3>Now Playing</h3>
            <p style="margin:0;">Stairway to Heaven - Led Zeppelin</p>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px;">
            <div style="height:192px;width:192px;border-radius:8px;background:linear-gradient(to bottom right, #a855f7, #ec4899);"></div>
            <div style="background:var(--s-bg-subtle, rgba(255,255,255,0.1));height:4px;width:100%;border-radius:9999px;overflow:hidden;">
              <div style="background:var(--s-action-primary, #6366f1);height:100%;width:33.33%;border-radius:9999px;"></div>
            </div>
            <div style="display:flex;width:100%;justify-content:space-between;font-size:13px;color:var(--s-text-muted);">
              <span>2:45</span>
              <span>8:02</span>
            </div>
          </div>
          <div style="display:flex;justify-content:center;gap:16px;margin-top:20px;">
            <button type="button" class="demo-login-btn-outline" style="width:36px;height:36px;padding:0;display:inline-flex;align-items:center;justify-content:center;border-radius:9999px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
            </button>
            <button type="button" class="demo-login-btn-primary" style="width:36px;height:36px;padding:0;display:inline-flex;align-items:center;justify-content:center;border-radius:9999px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </button>
            <button type="button" class="demo-login-btn-outline" style="width:36px;height:36px;padding:0;display:inline-flex;align-items:center;justify-content:center;border-radius:9999px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
            </button>
          </div>
          ${U.BorderBeam({duration:6,size:400,className:'s-border-beam--red'})}
          ${U.BorderBeam({duration:6,delay:3,size:400,borderWidth:2,className:'s-border-beam--blue'})}
        </div>
      `,
      code: `import { Play, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BorderBeam } from "@/components/sarahui/border-beam";

export function BorderBeamDual() {
  return (
    <Card className="relative w-[350px] overflow-hidden">
      <CardHeader>
        <CardTitle>Now Playing</CardTitle>
        <CardDescription>Stairway to Heaven - Led Zeppelin</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="h-48 w-48 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" />
          <div className="bg-secondary h-1 w-full rounded-full">
            <div className="bg-primary h-full w-1/3 rounded-full" />
          </div>
          <div className="text-muted-foreground flex w-full justify-between text-sm">
            <span>2:45</span>
            <span>8:02</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full">
          <SkipBack className="size-4" />
        </Button>
        <Button size="icon" className="rounded-full">
          <Play className="size-4" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full">
          <SkipForward className="size-4" />
        </Button>
      </CardFooter>
      <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-red-500 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={400}
        borderWidth={2}
        className="from-transparent via-blue-500 to-transparent"
      />
    </Card>
  );
}`
    },
    {
      title: 'Reverse',
      description: 'Invert beam trajectory direction counter-clockwise around the perimeter.',
      preview: () => html`
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
          ${U.BorderBeam({duration:4,size:300,reverse:true,className:'s-border-beam--green'})}
        </div>
      `,
      code: `import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/sarahui/border-beam";

export function BorderBeamReverse() {
  return (
    <Card className="relative w-[350px] overflow-hidden">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Register</Button>
        <Button>Login</Button>
      </CardFooter>
      <BorderBeam
        duration={4}
        size={300}
        reverse
        className="from-transparent via-green-500 to-transparent"
      />
    </Card>
  );
}`
    },
    {
      title: 'Spring Animation',
      description: 'Border beam animation wrapped on an outline action button.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;padding:40px 16px;">
          <button type="button" class="demo-login-btn-outline" style="position:relative;overflow:hidden;padding:12px 32px;font-size:15px;font-weight:600;border-radius:8px;">
            Buy Now
            ${U.BorderBeam({size:40,initialOffset:20,className:'s-border-beam--yellow'})}
          </button>
        </div>
      `,
      code: `import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/sarahui/border-beam";

export function BorderBeamButton() {
  return (
    <Button className="relative overflow-hidden" size="lg" variant="outline">
      Buy Now
      <BorderBeam
        size={40}
        initialOffset={20}
        className="from-transparent via-yellow-500 to-transparent"
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 20,
        }}
      />
    </Button>
  );
}`
    }
  ],

  // 19. ShineBorder - Parity with Magic UI (Monotone)
  ShineBorder: [
    {
      title: 'Custom Colors',
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
      title: 'Speed Control',
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
      title: 'Orb',
      description: 'MASARA X developer profile card with glowing spring-animated ambient orb.',
      preview: () => html`
        <div style="display:flex;justify-content:center;align-items:center;width:100%;padding:16px 0;">
          <div style="width:100%;max-width:380px;">
            ${U.MagicCard({
              mode: 'orb',
              glowFrom: '#ee4f27',
              glowTo: '#6b21ef',
              glowSize: 340,
              glowBlur: 65,
              glowOpacity: 0.35,
              className: 'magic-card-orb-demo',
              children: html`
                <div style="border-bottom:1px solid var(--s-border-default);padding:20px 24px;">
                  <div style="display:flex;align-items:center;gap:14px;">
                    <div style="width:46px;height:46px;border-radius:50%;overflow:hidden;border:1.5px solid var(--s-border-default);flex-shrink:0;">
                      <img src="https://github.com/masarax.png" alt="MASARA X" style="width:100%;height:100%;object-fit:cover;" onerror="this.onerror=null;this.src='https://avatars.githubusercontent.com/u/106103625';" />
                    </div>
                    <div style="flex:1;min-width:0;">
                      <h3 style="font-size:17px;font-weight:700;color:var(--s-text-primary);margin:0 0 2px 0;letter-spacing:-0.01em;">MASARA X</h3>
                      <p class="s-small s-muted" style="margin:0;font-weight:500;">Creator of sarahUI</p>
                    </div>
                  </div>
                </div>
                <div style="padding:20px 24px;display:flex;flex-direction:column;gap:10px;">
                  <p style="font-size:14px;font-weight:600;color:var(--s-text-primary);margin:0;">
                    Design Engineer focused on Thoughtful UI &amp; Performance
                  </p>
                  <p class="s-small s-muted" style="margin:0;line-height:1.55;">
                    Passionate about thoughtful design systems, fluid web animations, and zero-dependency modern UI.
                  </p>
                </div>
                <div style="border-top:1px solid var(--s-border-default);padding:16px 24px;">
                  <a href="https://github.com/masarax" target="_blank" rel="noopener noreferrer" class="s-button s-button--outline" style="width:100%;justify-content:center;text-decoration:none;gap:8px;">
                    ${U.Icon({name:'github',size:16})} <span>View on GitHub</span>
                  </a>
                </div>
              `
            })}
          </div>
        </div>
      `,
      code: `import { useTheme } from "next-themes";
import { Button } from "@/components/sarahui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/sarahui/card";
import { AvatarCircles } from "@/components/sarahui/avatar-circles";
import { MagicCard } from "sarahui";

export function MagicCardOrbDemo() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Card className="w-full max-w-sm border-none p-0 shadow-none">
      <MagicCard
        mode="orb"
        glowFrom={isDark ? "#ee4f27" : "#E9D5FF"}
        glowTo={isDark ? "#6b21ef" : "#FBCFE8"}
        className="p-0"
      >
        <CardHeader className="border-border border-b p-4 [.border-b]:pb-4">
          <div className="flex items-center gap-3">
            <AvatarCircles
              avatarUrls={[
                {
                  imageUrl: "https://github.com/masarax.png",
                  profileUrl: "https://github.com/masarax",
                },
              ]}
            />
            <div className="flex-1">
              <CardTitle>MASARA X</CardTitle>
              <CardDescription className="mt-1">
                Creator of sarahUI
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          <p className="text-sm font-medium">
            Design Engineer focused on Thoughtful UI &amp; Performance
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Passionate about thoughtful design systems, fluid web animations,
            and zero-dependency modern UI.
          </p>
        </CardContent>
        <CardFooter className="border-border border-t p-4 [.border-t]:pt-4">
          <Button asChild className="w-full">
            <a
              href="https://github.com/masarax"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              View on GitHub
            </a>
          </Button>
        </CardFooter>
      </MagicCard>
    </Card>
  );
}`
    }
  ],

  // 21. GlareHover
  GlareHover: [
    {
      title: 'Holographic',
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
      title: 'Call to Action',
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
      title: 'Custom Angle',
      description: 'Atmospheric shooting star particles descending across canvas backgrounds.',
      preview: () => demos.Meteors(),
      code: `import { Meteors } from "@/components/sarahui/meteors";

export function MeteorsDemo() {
  return <Meteors number={16} />;
}`
    },
    {
      title: 'Subtle Trail',
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
      title: 'Brand Accent',
      description: 'Smooth ambient particle field rendered on high-performance canvas.',
      preview: () => demos.Particles(),
      code: `import { Particles } from "@/components/sarahui/particles";

export function ParticlesDemo() {
  return <Particles quantity={40} />;
}`
    },
    {
      title: 'Brand Accent',
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
      description: 'Square polygon clip-path expanding outward across the screen.',
      preview: () => html`
        <div class="demo-wrap" style="padding:40px;justify-content:center;">
          ${U.AnimatedThemeToggler({variant:'square',attrs:{'data-s-theme-toggler':'square'}})}
        </div>
      `,
      code: `import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";

export function AnimatedThemeTogglerSquare() {
  return <AnimatedThemeToggler variant="square" />;
}`
    },
    {
      title: 'Diamond',
      description: 'Rotated 45-degree diamond polygon expanding across viewport.',
      preview: () => html`
        <div class="demo-wrap" style="padding:40px;justify-content:center;">
          ${U.AnimatedThemeToggler({variant:'diamond',attrs:{'data-s-theme-toggler':'diamond'}})}
        </div>
      `,
      code: `import { AnimatedThemeToggler } from "@/components/sarahui/animated-theme-toggler";

export function AnimatedThemeTogglerDiamond() {
  return <AnimatedThemeToggler variant="diamond" />;
}`
    }
  ],

// 26. BlurFade
  BlurFade: [
    {
      title: 'Staggered',
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
      title: 'Hero Header',
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
      description: 'Entire text block fading in with progressive optical blur reduction.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;padding:24px;">
          ${U.TextAnimate({text:'Thoughtful Motion Design',animation:'blurIn'})}
        </div>
      `,
      code: `import { TextAnimate } from "@/components/sarahui/text-animate";

export function TextAnimateBlurIn() {
  return <TextAnimate animation="blurIn" by="text">Thoughtful Motion Design</TextAnimate>;
}`
    },
    {
      title: 'Slide Up by Word',
      description: 'Individual words sliding upward with staggered spring physics.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;padding:24px;">
          ${U.TextAnimate({text:'Next Generation Web Primitives',animation:'slideUp',by:'word'})}
        </div>
      `,
      code: `import { TextAnimate } from "@/components/sarahui/text-animate";

export function TextAnimateSlideUp() {
  return <TextAnimate animation="slideUp" by="word">Next Generation Web Primitives</TextAnimate>;
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
      title: 'Shadow Color',
      description: 'Crisp isometric extruded shadow lines projected behind bold typography.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;padding:24px;">
          ${U.LineShadowText({text:'Isometric',shadowColor:'rgba(91,61,245,0.85)'})}
        </div>
      `,
      code: `import { LineShadowText } from "@/components/sarahui/line-shadow-text";

export function LineShadowTextDemo() {
  return <LineShadowText shadowColor="#5B3DF5">Isometric</LineShadowText>;
}`
    },
    {
      title: 'Compact Shadow',
      description: 'High-contrast step shadow with rose magenta projection.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;padding:24px;">
          ${U.LineShadowText({text:'Velocity',shadowColor:'#FF2E93'})}
        </div>
      `,
      code: `import { LineShadowText } from "@/components/sarahui/line-shadow-text";

export function LineShadowTextRose() {
  return <LineShadowText shadowColor="#FF2E93">Velocity</LineShadowText>;
}`
    }
  ],

// 30. AuroraText
AuroraText: [
    {
      title: 'Sunset Horizon',
      description: 'Fluid flowing iridescent aurora borealis gradient sweeping across headline.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;padding:24px;">
          ${U.AuroraText({text:'Ship Beautiful Apps',colors:['#FF0080', '#7928CA', '#0070F3', '#38bdf8']})}
        </div>
      `,
      code: `import { AuroraText } from "@/components/sarahui/aurora-text";

export function AuroraTextDemo() {
  return (
    <h1 className="text-4xl font-bold">
      Ship <AuroraText>Beautiful Apps</AuroraText>
    </h1>
  );
}`
    },
    {
      title: 'Sunset Horizon',
      description: 'Warm solar sunset gradient flowing continuously across typography.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;padding:24px;">
          ${U.AuroraText({text:'Golden Horizon',colors:['#FF4E50', '#F9D423', '#FF6B6B', '#FFA07A']})}
        </div>
      `,
      code: `import { AuroraText } from "@/components/sarahui/aurora-text";

export function AuroraTextSunset() {
  return <AuroraText colors={["#FF4E50", "#F9D423", "#FF6B6B"]}>Golden Horizon</AuroraText>;
}`
    }
  ],

// 31. VideoText
VideoText: [
    {
      title: 'Condensed Font',
      description: 'Bold headline typography masked with an interactive ambient looping video stream.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:260px;text-align:center;overflow:hidden;border-radius:12px;background:#000;border:1px solid var(--s-border-default);">
          ${U.VideoText({text:'CREATIVE',videoSrc:'https://cdn.pixabay.com/video/2019/04/23/23011-332483109_tiny.mp4'})}
        </div>
      `,
      code: `import { VideoText } from "@/components/sarahui/video-text";

export function VideoTextDemo() {
  return <VideoText text="CREATIVE" videoSrc="/ambient.mp4" />;
}`
    },
    {
      title: 'Condensed Font',
      description: 'Ultra-bold condensed font masked over vibrant dynamic video motion.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:260px;text-align:center;overflow:hidden;border-radius:12px;background:#000;border:1px solid var(--s-border-default);">
          ${U.VideoText({text:'FUTURE',videoSrc:'https://cdn.pixabay.com/video/2019/04/23/23011-332483109_tiny.mp4',fontSize:'4.5rem'})}
        </div>
      `,
      code: `import { VideoText } from "@/components/sarahui/video-text";

export function VideoTextFuture() {
  return <VideoText text="FUTURE" videoSrc="/future.mp4" fontSize="4.5rem" />;
}`
    }
  ],

// 32. NumberTicker
  NumberTicker: [
    {
      title: 'Direction',
      description: 'Smooth count-up from 0 to target value on mount.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:200px;">
          <span style="font-size:clamp(5rem,15vw,8rem);font-weight:500;letter-spacing:-0.05em;color:var(--s-text-primary);line-height:1;">${U.NumberTicker({value:100})}</span>
        </div>
      `,
      code: `import { NumberTicker } from "@/components/sarahui/number-ticker";

export function NumberTickerDemo() {
  return <NumberTicker value={100} />;
}`
    },
    {
      title: 'Custom Start Value',
      description: 'Count-up starting from a custom value instead of zero.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:200px;">
          <span style="font-size:clamp(5rem,15vw,8rem);font-weight:500;letter-spacing:-0.05em;color:var(--s-text-primary);line-height:1;">${U.NumberTicker({value:100,startValue:80})}</span>
        </div>
      `,
      code: `import { NumberTicker } from "@/components/sarahui/number-ticker";

export function NumberTickerDemo2() {
  return <NumberTicker value={100} startValue={80} />;
}`
    },
    {
      title: 'Decimal Places',
      description: 'Counter with decimal precision for fractional values.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;padding:48px 16px;min-height:200px;">
          <span style="font-size:clamp(5rem,15vw,8rem);font-weight:500;letter-spacing:-0.05em;color:var(--s-text-primary);line-height:1;">${U.NumberTicker({value:5.67,decimals:2})}</span>
        </div>
      `,
      code: `import { NumberTicker } from "@/components/sarahui/number-ticker";

export function NumberTickerDecimalDemo() {
  return <NumberTicker value={5.67} decimalPlaces={2} />;
}`
    }
  ],

  // 33. AnimatedShinyText
AnimatedShinyText: [
    {
      title: 'Brand Accent',
      description: 'Continuous specular sheen pass sweeping smoothly across metallic badge text.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:999px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">
            ${U.AnimatedShinyText({text:'✨ Introducing SarahUI Pro',shimmerWidth:120})}
          </div>
        </div>
      `,
      code: `import { AnimatedShinyText } from "@/components/sarahui/animated-shiny-text";

export function AnimatedShinyTextDemo() {
  return (
    <div className="rounded-full border bg-neutral-100 px-4 py-1.5 dark:bg-neutral-900">
      <AnimatedShinyText>✨ Introducing SarahUI Pro</AnimatedShinyText>
    </div>
  );
}`
    },
    {
      title: 'Brand Accent',
      description: 'Electric brand accent shimmer highlighting milestone accomplishments.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:999px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">
            ${U.AnimatedShinyText({text:'🚀 120 Interactive Components',shimmerWidth:160})}
          </div>
        </div>
      `,
      code: `import { AnimatedShinyText } from "@/components/sarahui/animated-shiny-text";

export function AnimatedShinyTextMilestone() {
  return <AnimatedShinyText>🚀 120 Interactive Components</AnimatedShinyText>;
}`
    }
  ],

// 34. AnimatedGradientText - Parity with Magic UI (Custom Speed)
AnimatedGradientText: [
    {
      title: 'Color Shift',
      description: 'Harmonic multi-stop gradient wave animating seamlessly across text elements.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          ${U.AnimatedGradientText({text:'🎉 50k+ Developers',colorFrom:'#ffaa40',colorTo:'#9c40ff'})}
        </div>
      `,
      code: `import { AnimatedGradientText } from "@/components/sarahui/animated-gradient-text";

export function AnimatedGradientTextDemo() {
  return (
    <AnimatedGradientText colorFrom="#ffaa40" colorTo="#9c40ff">
      🎉 50k+ Developers
    </AnimatedGradientText>
  );
}`
    },
    {
      title: 'Custom Speed',
      description: 'Fast energetic emerald to cyan gradient wave for real-time telemetry.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          ${U.AnimatedGradientText({text:'⚡ Realtime Sync Active',colorFrom:'#00E5FF',colorTo:'#10B981',speed:2})}
        </div>
      `,
      code: `import { AnimatedGradientText } from "@/components/sarahui/animated-gradient-text";

export function AnimatedGradientTextFast() {
  return <AnimatedGradientText colorFrom="#00E5FF" colorTo="#10B981" speed={2}>⚡ Realtime Sync Active</AnimatedGradientText>;
}`
    }
  ],

// 35. TextReveal
TextReveal: [
    {
      title: 'Instant View',
      description: 'Scroll-linked progressive word opacity reveal highlighting narrative copy.',
      preview: () => html`
        <div style="padding:32px 24px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          ${U.TextReveal({text:'sarahUI brings pure CSS tokens and native browser primitives together in perfect harmony.'})}
        </div>
      `,
      code: `import { TextReveal } from "@/components/sarahui/text-reveal";

export function TextRevealDemo() {
  return (
    <TextReveal text="sarahUI brings pure CSS tokens and native browser primitives together in perfect harmony." />
  );
}`
    },
    {
      title: 'Instant View',
      description: 'Fast entrance reveal for hero section statements and keynotes.',
      preview: () => html`
        <div style="padding:32px 24px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          ${U.TextReveal({text:'Design without compromise. 120 components crafted for modern web experiences.'})}
        </div>
      `,
      code: `import { TextReveal } from "@/components/sarahui/text-reveal";

export function TextRevealHero() {
  return (
    <TextReveal text="Design without compromise. 120 components crafted for modern web experiences." />
  );
}`
    }
  ],

// 36. DiaTextReveal - Parity with Magic UI (Custom gradient)
DiaTextReveal: [
    {
      title: 'Repeat Animation',
      description: 'Dynamic 45-degree angle diagonal mask sweep revealing typography.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          ${U.DiaTextReveal({text:'Uncompromising Quality'})}
        </div>
      `,
      code: `import { DiaTextReveal } from "@/components/sarahui/dia-text-reveal";

export function DiaTextRevealDemo() {
  return <DiaTextReveal text="Uncompromising Quality" />;
}`
    },
    {
      title: 'Custom Gradient',
      description: 'Diagonal sweep reveal combined with electric cyan to rose gradient.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          ${U.DiaTextReveal({text:'Next Level Motion',gradient:'linear-gradient(135deg, #00E5FF, #FF0055)'})}
        </div>
      `,
      code: `import { DiaTextReveal } from "@/components/sarahui/dia-text-reveal";

export function DiaTextRevealGradient() {
  return <DiaTextReveal text="Next Level Motion" gradient="linear-gradient(135deg, #00E5FF, #FF0055)" />;
}`
    }
  ],

// 37. HyperText
HyperText: [
    {
      title: 'Auto-Decoding',
      description: 'Interactive character scrambling deciphering on hover and interaction.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          ${U.HyperText({text:'HACK THE MATRIX',duration:800})}
        </div>
      `,
      code: `import { HyperText } from "@/components/sarahui/hyper-text";

export function HyperTextDemo() {
  return <HyperText text="HACK THE MATRIX" duration={800} />;
}`
    },
    {
      title: 'Auto-Decoding',
      description: 'Decodes system readiness status string on viewport entrance.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          ${U.HyperText({text:'SARAH_UI_SYSTEM_READY',duration:1200})}
        </div>
      `,
      code: `import { HyperText } from "@/components/sarahui/hyper-text";

export function HyperTextSystem() {
  return <HyperText text="SARAH_UI_SYSTEM_READY" duration={1200} />;
}`
    }
  ],

// 38. WordRotate - Parity with Magic UI (Snappy Cycling)
  WordRotate: [
    {
      title: 'Fast Rotation',
      description: 'Continuous rotating word switcher with smooth vertical transition.',
      preview: () => demos.WordRotate(),
      code: `import { WordRotate } from "@/components/sarahui/word-rotate";

export function WordRotateDemo() {
  return <WordRotate words={["Design", "Build", "Ship", "Delight"]} />;
}`
    },
    {
      title: 'Fast Rotation',
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
      title: 'Reverse Direction',
      description: 'Multi-line typography ticker that accelerates with user page scroll speed.',
      preview: () => html`
        <div style="position:relative;height:260px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;">
          ${U.ScrollBasedVelocity({text:'SARAHUI • ACCESSIBLE • LIGHTWEIGHT • ZERO RUNTIME DEPS •',defaultVelocity:3})}
        </div>
      `,
      code: `import { ScrollBasedVelocity } from "@/components/sarahui/scroll-based-velocity";

export function ScrollBasedVelocityDemo() {
  return <ScrollBasedVelocity text="SARAHUI • ACCESSIBLE • LIGHTWEIGHT • ZERO RUNTIME DEPS •" defaultVelocity={3} />;
}`
    },
    {
      title: 'Reverse Direction',
      description: 'Opposite velocity scrolling marquee ticker accelerating dynamically.',
      preview: () => html`
        <div style="position:relative;height:260px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;">
          ${U.ScrollBasedVelocity({text:'• REVERSE VELOCITY • ACCELERATED SCROLL • SMOOTH PHYSICS •',defaultVelocity:-4})}
        </div>
      `,
      code: `import { ScrollBasedVelocity } from "@/components/sarahui/scroll-based-velocity";

export function ScrollBasedVelocityReverse() {
  return <ScrollBasedVelocity text="• REVERSE VELOCITY • ACCELERATED SCROLL • SMOOTH PHYSICS •" defaultVelocity={-4} />;
}`
    }
  ],

// 40. SparklesText
SparklesText: [
    {
      title: 'Golden Sparkles',
      description: 'Twinkling golden star sparkles animating dynamically around headline text.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          ${U.SparklesText({text:'Magical Components',sparklesCount:12})}
        </div>
      `,
      code: `import { SparklesText } from "@/components/sarahui/sparkles-text";

export function SparklesTextDemo() {
  return <SparklesText text="Magical Components" />;
}`
    },
    {
      title: 'Golden Sparkles',
      description: 'Warm golden sparkle stars framing premium design system features.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          ${U.SparklesText({text:'Premium Design System',sparklesCount:16,colors:{first:'#FFD700',second:'#FFA500'}})}
        </div>
      `,
      code: `import { SparklesText } from "@/components/sarahui/sparkles-text";

export function SparklesTextGold() {
  return <SparklesText text="Premium Design System" colors={{ first: "#FFD700", second: "#FFA500" }} />;
}`
    }
  ],

// 41. MorphingText
  MorphingText: [
    {
      title: 'Fast Cadence',
      description: 'Smooth liquid text morphing transitions between phrases.',
      preview: () => demos.MorphingText(),
      code: `import { MorphingText } from "@/components/sarahui/morphing-text";

export function MorphingTextDemo() {
  return <MorphingText texts={["DESIGN", "ENGINEER", "DELIGHT"]} />;
}`
    },
    {
      title: 'Fast Cadence',
      description: 'Quick 2-second fluid dissolve between technical capabilities.',
      preview: () => html`<div style="text-align:center;padding:24px;">${U.MorphingText({texts:['SPEED','SAFETY','SCALE']})}</div>`,
      code: `import { MorphingText } from "@/components/sarahui/morphing-text";

export function MorphingTextFast() {
  return <MorphingText texts={["SPEED", "SAFETY", "SCALE"]} morphTime={1} cooldownTime={0.5} />;
}`
    }
  ],

  // 42. SpinningText - Parity with Magic UI (Reverse)
SpinningText: [
    {
      title: 'Reverse Direction',
      description: 'Continuous circular orbiting text banner spinning around a central anchor icon.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:280px;">
          ${U.SpinningText({text:'• SARAHUI • MODERN DESIGN • ZERO DEPS ',radius:64,duration:10})}
        </div>
      `,
      code: `import { SpinningText } from "@/components/sarahui/spinning-text";

export function SpinningTextDemo() {
  return <SpinningText radius={64} duration={10}>• SARAHUI • MODERN DESIGN • ZERO DEPS </SpinningText>;
}`
    },
    {
      title: 'Reverse',
      description: 'Counter-clockwise rotating typography with wider orbital radius.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:280px;">
          ${U.SpinningText({text:'• REVERSE ROTATION • 60FPS MOTION ',radius:80,duration:8,reverse:true})}
        </div>
      `,
      code: `import { SpinningText } from "@/components/sarahui/spinning-text";

export function SpinningTextReverse() {
  return <SpinningText radius={80} duration={8} reverse>• REVERSE ROTATION • 60FPS MOTION </SpinningText>;
}`
    }
  ],

// 43. Highlighter
Highlighter: [
    {
      title: 'Underline Stroke',
      description: 'Natural hand-drawn marker highlight stroke animating beneath text.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          ${U.Highlighter({text:'Thoughtful Design Systems',color:'rgba(91,61,245,0.35)'})}
        </div>
      `,
      code: `import { Highlighter } from "@/components/sarahui/highlighter";

export function HighlighterDemo() {
  return <Highlighter color="rgba(91,61,245,0.35)">Thoughtful Design Systems</Highlighter>;
}`
    },
    {
      title: 'Underline Stroke',
      description: 'Double underline marker stroke drawing under key takeaway terms.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          ${U.Highlighter({text:'Underline Stroke Accent',color:'rgba(255,46,147,0.4)',type:'underline'})}
        </div>
      `,
      code: `import { Highlighter } from "@/components/sarahui/highlighter";

export function HighlighterUnderline() {
  return <Highlighter type="underline" color="rgba(255,46,147,0.4)">Underline Stroke Accent</Highlighter>;
}`
    }
  ],

// 44. Text3DFlip - Parity with Magic UI (Stagger from center)
Text3DFlip: [
    {
      title: 'Stagger from Center',
      description: 'Isometric 3D perspective flip between dynamic feature adjectives.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          ${U.Text3DFlip({words:['Modern', 'Accessible', 'Lightweight', 'Powerful']})}
        </div>
      `,
      code: `import { Text3DFlip } from "@/components/sarahui/text-3d-flip";

export function Text3DFlipDemo() {
  return <Text3DFlip words={["Modern", "Accessible", "Lightweight", "Powerful"]} />;
}`
    },
    {
      title: 'Stagger from Center',
      description: 'Word transitions flipping with accelerated interval timing.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          ${U.Text3DFlip({words:['Faster', 'Smoother', 'Cleaner', 'Better'],delay:1600})}
        </div>
      `,
      code: `import { Text3DFlip } from "@/components/sarahui/text-3d-flip";

export function Text3DFlipCenter() {
  return <Text3DFlip words={["Faster", "Smoother", "Cleaner", "Better"]} delay={1600} />;
}`
    }
  ],

// 45. Safari - Parity with Magic UI (With Image, With Video, Simple Mode)
Safari: [
    {
      title: 'With Image',
      description: 'Realistic Safari browser mockup framing an application screenshot.',
      preview: () => html`
        <div style="width:100%;max-width:540px;margin:0 auto;">
          ${U.Safari({url:'sarahui.dev',imageSrc:'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'})}
        </div>
      `,
      code: `import { Safari } from "@/components/sarahui/safari";

export function SafariDemoImage() {
  return <Safari url="sarahui.dev" imageSrc="https://example.com/screenshot.png" />;
}`
    },
    {
      title: 'With Video',
      description: 'Safari browser window mockup framing an interactive looping video stream.',
      preview: () => html`
        <div style="width:100%;max-width:540px;margin:0 auto;">
          ${U.Safari({url:'sarahui.dev',videoSrc:'https://cdn.pixabay.com/video/2019/04/23/23011-332483109_tiny.mp4'})}
        </div>
      `,
      code: `import { Safari } from "@/components/sarahui/safari";

export function SafariDemoVideo() {
  return <Safari url="sarahui.dev" videoSrc="https://example.com/stream.mp4" />;
}`
    },
    {
      title: 'Simple Mode',
      description: 'Streamlined browser mockup without address bar for clean hero mockups.',
      preview: () => html`
        <div style="width:100%;max-width:540px;margin:0 auto;">
          ${U.Safari({mode:'simple',children:html`<div style="padding:48px 24px;text-align:center;background:var(--s-bg-surface);"><h3 style="margin:0 0 8px;">Simple Safari Mockup</h3><p class="s-small s-muted">Clean macOS frame with traffic light controls.</p></div>`})}
        </div>
      `,
      code: `import { Safari } from "@/components/sarahui/safari";

export function SafariSimple() {
  return <Safari mode="simple" />;
}`
    }
  ],

// 46. Iphone - Parity with Magic UI (With Image, With Video)
Iphone: [
    {
      title: 'With Image',
      description: 'iPhone hardware mockup framing a mobile application design screenshot.',
      preview: () => html`
        <div style="display:flex;justify-content:center;width:100%;">
          ${U.Iphone({src:'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=600&q=80'})}
        </div>
      `,
      code: `import { Iphone } from "@/components/sarahui/iphone";

export function IphoneImage() {
  return <Iphone src="https://example.com/mobile-app.png" />;
}`
    },
    {
      title: 'With Video',
      description: 'iPhone hardware mockup rendering an interactive looping mobile video.',
      preview: () => html`
        <div style="display:flex;justify-content:center;width:100%;">
          ${U.Iphone({videoSrc:'https://cdn.pixabay.com/video/2019/04/23/23011-332483109_tiny.mp4'})}
        </div>
      `,
      code: `import { Iphone } from "@/components/sarahui/iphone";

export function IphoneVideo() {
  return <Iphone videoSrc="https://example.com/mobile-video.mp4" />;
}`
    }
  ],

// 47. Android - Parity with Magic UI (With Image, With Video)
Android: [
    {
      title: 'With Image',
      description: 'Android hardware mockup framing an Android app screenshot.',
      preview: () => html`
        <div style="display:flex;justify-content:center;width:100%;">
          ${U.Android({src:'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=600&q=80'})}
        </div>
      `,
      code: `import { Android } from "@/components/sarahui/android";

export function AndroidImage() {
  return <Android src="https://example.com/android-app.png" />;
}`
    },
    {
      title: 'With Video',
      description: 'Android hardware frame displaying a live mobile interaction video.',
      preview: () => html`
        <div style="display:flex;justify-content:center;width:100%;">
          ${U.Android({videoSrc:'https://cdn.pixabay.com/video/2019/04/23/23011-332483109_tiny.mp4'})}
        </div>
      `,
      code: `import { Android } from "@/components/sarahui/android";

export function AndroidVideo() {
  return <Android videoSrc="https://example.com/android-video.mp4" />;
}`
    }
  ],

// 48. RainbowButton - Parity with Magic UI (Outline Variant)
  RainbowButton: [
    {
      title: 'Outline Variant',
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
      title: 'Trailing Icon',
      description: 'Pulsing luminous light band rotating around the button rim.',
      preview: () => demos.ShimmerButton(),
      code: `import { ShimmerButton } from "@/components/sarahui/shimmer-button";

export function ShimmerButtonDemo() {
  return <ShimmerButton label="Get Started Now" icon="spark" />;
}`
    },
    {
      title: 'Trailing Icon',
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
      title: 'Centered Pulse',
      description: 'Generates expanding dynamic concentric ripples from the exact click coordinate.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          ${U.RippleButton({label:'Click for Waves',variant:'primary'})}
        </div>
      `,
      code: `import { RippleButton } from "@/components/sarahui/ripple-button";

export function RippleButtonDemo() {
  return <RippleButton>Click for Waves</RippleButton>;
}`
    },
    {
      title: 'Centered Pulse',
      description: 'Outline styled action button with subtle lavender ripple waves.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          ${U.RippleButton({label:'Outline Ripple Action',variant:'outline',rippleColor:'rgba(91,61,245,0.3)'})}
        </div>
      `,
      code: `import { RippleButton } from "@/components/sarahui/ripple-button";

export function RippleButtonOutline() {
  return <RippleButton variant="outline" rippleColor="rgba(91,61,245,0.3)">Outline Action</RippleButton>;
}`
    }
  ],

// 51. FlickeringGrid - Parity with Magic UI (Rounded)
FlickeringGrid: [
    {
      title: 'Dense Grid',
      description: 'Randomized square opacity flicker across a high-density grid background.',
      preview: () => html`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          ${U.FlickeringGrid({squareSize:4,gridGap:6,flickerChance:0.3})}
        </div>
      `,
      code: `import { FlickeringGrid } from "@/components/sarahui/flickering-grid";

export function FlickeringGridDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-lg border">
      <FlickeringGrid squareSize={4} gridGap={6} flickerChance={0.3} />
    </div>
  );
}`
    },
    {
      title: 'Rounded',
      description: 'Cyan tinted high-density matrix with larger squares and rapid flicker rate.',
      preview: () => html`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          ${U.FlickeringGrid({squareSize:6,gridGap:8,flickerChance:0.45,color:'#00E5FF'})}
        </div>
      `,
      code: `import { FlickeringGrid } from "@/components/sarahui/flickering-grid";

export function FlickeringGridRounded() {
  return <FlickeringGrid squareSize={6} gridGap={8} flickerChance={0.45} color="#00E5FF" />;
}`
    }
  ],

// 52. AnimatedGridPattern
  AnimatedGridPattern: [
    {
      title: 'Dense Matrix',
      description: 'Background grid with randomly shimmering matrix squares.',
      preview: () => demos.AnimatedGridPattern(),
      code: `import { AnimatedGridPattern } from "@/components/sarahui/animated-grid-pattern";

export function AnimatedGridPatternDemo() {
  return <AnimatedGridPattern numSquares={24} maxOpacity={0.5} />;
}`
    },
    {
      title: 'Dense Matrix',
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
      title: 'Inverted Horizon',
      description: 'Synthwave 3D perspective infinite floor grid with horizon fade.',
      preview: () => html`
        <div style="position:relative;height:360px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <span style="pointer-events:none;z-index:10;background:linear-gradient(to bottom, #ffd319, #ff2975, #8c1eff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(3rem, 7vw, 4.5rem);line-height:1;font-weight:800;letter-spacing:-0.05em;">
            Retro Grid
          </span>
          ${U.RetroGrid({angle:65})}
        </div>
      `,
      code: `import { RetroGrid } from "@/components/sarahui/retro-grid";

export function RetroGridDemo() {
  return (
    <div className="relative flex h-[360px] w-full items-center justify-center overflow-hidden rounded-xl border">
      <RetroGrid angle={65} />
    </div>
  );
}`
    },
    {
      title: 'Inverted Horizon',
      description: 'Inverted perspective grid ceiling projecting neon cyan horizon lines.',
      preview: () => html`
        <div style="position:relative;height:360px;width:100%;overflow:hidden;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <span style="pointer-events:none;z-index:10;background:linear-gradient(to bottom, #00E5FF, #5B3DF5);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-size:clamp(3rem, 7vw, 4.5rem);line-height:1;font-weight:800;letter-spacing:-0.05em;">
            Inverted Horizon
          </span>
          ${U.RetroGrid({angle:115,opacity:0.65})}
        </div>
      `,
      code: `import { RetroGrid } from "@/components/sarahui/retro-grid";

export function RetroGridInverted() {
  return <RetroGrid angle={115} opacity={0.65} />;
}`
    }
  ],

// 54. Ripple
  Ripple: [
    {
      title: 'Compact Waves',
      description: 'Pulsing ambient wave circles emanating outward from a focal point.',
      preview: () => demos.Ripple(),
      code: `import { Ripple } from "@/components/sarahui/ripple";

export function RippleDemo() {
  return <Ripple numCircles={5} mainCircleSize={210} />;
}`
    },
    {
      title: 'Compact Waves',
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
      title: 'Glow Effect',
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
      title: 'Dashed Stroke',
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
      title: 'To Right',
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
      title: 'Colorful',
      description: 'Interactive grid pattern whose cells dynamically illuminate on cursor proximity.',
      preview: () => html`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          ${U.InteractiveGridPattern({width:36,height:36,numSquares:24})}
        </div>
      `,
      code: `import { InteractiveGridPattern } from "@/components/sarahui/interactive-grid-pattern";

export function InteractiveGridPatternDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-xl border">
      <InteractiveGridPattern width={36} height={36} numSquares={24} />
    </div>
  );
}`
    },
    {
      title: 'Colorful',
      description: 'Denser interactive grid featuring dashed outline stroke styling.',
      preview: () => html`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          ${U.InteractiveGridPattern({width:24,height:24,numSquares:48,strokeDasharray:'4 4'})}
        </div>
      `,
      code: `import { InteractiveGridPattern } from "@/components/sarahui/interactive-grid-pattern";

export function InteractiveGridPatternColorful() {
  return <InteractiveGridPattern width={24} height={24} numSquares={48} strokeDasharray="4 4" />;
}`
    }
  ],

// 60. LightRays
LightRays: [
    {
      title: 'Subtle Ambient',
      description: 'Atmospheric volumetric lighting beams radiating down from source coordinate.',
      preview: () => html`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:#050508;border:1px solid var(--s-border-default);">
          ${U.LightRays({intensity:0.7,count:5})}
        </div>
      `,
      code: `import { LightRays } from "@/components/sarahui/light-rays";

export function LightRaysDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-xl border bg-black">
      <LightRays intensity={0.7} count={5} />
    </div>
  );
}`
    },
    {
      title: 'Subtle Ambient',
      description: 'Soft swinging ambient lighting rays creating cinematic backdrop depth.',
      preview: () => html`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:#050508;border:1px solid var(--s-border-default);">
          ${U.LightRays({intensity:0.4,count:8,speed:12})}
        </div>
      `,
      code: `import { LightRays } from "@/components/sarahui/light-rays";

export function LightRaysAmbient() {
  return <LightRays intensity={0.4} count={8} speed={12} />;
}`
    }
  ],

// 61. NoiseTexture - Parity with Magic UI (Newsletter digest, Button)
  NoiseTexture: [
    {
      title: 'Newsletter Digest',
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
      title: 'Button Overlay',
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
      title: 'Plain Background',
      description: 'Parallax floating particle field with perspective 3D depth.',
      preview: () => html`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          ${U.Floating3DParticles({count:40,size:3})}
        </div>
      `,
      code: `import { Floating3DParticles } from "@/components/sarahui/floating-3d-particles";

export function Floating3DParticlesDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-xl border">
      <Floating3DParticles count={40} size={3} />
    </div>
  );
}`
    },
    {
      title: 'Plain Background',
      description: 'High-density electric cyan particle constellation.',
      preview: () => html`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);">
          ${U.Floating3DParticles({count:60,size:2,color:'#00E5FF'})}
        </div>
      `,
      code: `import { Floating3DParticles } from "@/components/sarahui/floating-3d-particles";

export function Floating3DParticlesCyan() {
  return <Floating3DParticles count={60} size={2} color="#00E5FF" />;
}`
    }
  ],

// 63. ShinyButton
ShinyButton: [
    {
      title: 'Compact Sheen',
      description: 'Interactive button with continuous specular light reflection sweep.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          ${U.ShinyButton({label:'Get Unlimited Access'})}
        </div>
      `,
      code: `import { ShinyButton } from "@/components/sarahui/shiny-button";

export function ShinyButtonDemo() {
  return <ShinyButton label="Get Unlimited Access" />;
}`
    },
    {
      title: 'Compact Sheen',
      description: 'Compact action button designed for toolbars and cards.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          ${U.ShinyButton({label:'Quick Action',size:'sm'})}
        </div>
      `,
      code: `import { ShinyButton } from "@/components/sarahui/shiny-button";

export function ShinyButtonCompact() {
  return <ShinyButton size="sm" label="Quick Action" />;
}`
    }
  ],

// 64. FileTree
  FileTree: [
    {
      title: 'Multi-Level',
      description: 'Hierarchical file tree with folder toggle disclosure and file icon mapping.',
      preview: () => html`
        <div class="s-file-tree" data-s-file-tree style="width:100%;max-width:320px;padding:16px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);font-size:13px;font-family:var(--s-font-mono);">
          <div class="s-tree-folder" aria-expanded="true" style="cursor:pointer;font-weight:600;display:flex;align-items:center;gap:6px;">📁 src</div>
          <div class="s-tree-children" style="padding-left:20px;display:flex;flex-direction:column;gap:4px;margin-top:4px;">
            <div class="s-tree-folder" aria-expanded="true" style="cursor:pointer;font-weight:600;display:flex;align-items:center;gap:6px;">📁 components</div>
            <div class="s-tree-children" style="padding-left:20px;display:flex;flex-direction:column;gap:4px;margin-top:4px;">
              <div style="display:flex;align-items:center;gap:6px;">📄 button.tsx</div>
              <div style="display:flex;align-items:center;gap:6px;">📄 dialog.tsx</div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;">📄 index.ts</div>
            <div style="display:flex;align-items:center;gap:6px;">📄 styles.css</div>
          </div>
        </div>
      `,
      code: `import { FileTree, Folder, File } from "@/components/sarahui/file-tree";

export function FileTreeDemo() {
  return (
    <FileTree>
      <Folder name="src">
        <Folder name="components">
          <File name="button.tsx" />
          <File name="dialog.tsx" />
        </Folder>
        <File name="index.ts" />
        <File name="styles.css" />
      </Folder>
    </FileTree>
  );
}`
    },
    {
      title: 'Multi-Level',
      description: 'Complex nested multi-package workspace folder structure.',
      preview: () => html`
        <div class="s-file-tree" data-s-file-tree style="width:100%;max-width:320px;padding:16px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);font-size:13px;font-family:var(--s-font-mono);">
          <div class="s-tree-folder" aria-expanded="true" style="cursor:pointer;font-weight:600;display:flex;align-items:center;gap:6px;">📁 apps/web</div>
          <div class="s-tree-children" style="padding-left:20px;display:flex;flex-direction:column;gap:4px;margin-top:4px;">
            <div class="s-tree-folder" aria-expanded="true" style="cursor:pointer;font-weight:600;display:flex;align-items:center;gap:6px;">📁 app/(dashboard)</div>
            <div class="s-tree-children" style="padding-left:20px;display:flex;flex-direction:column;gap:4px;margin-top:4px;">
              <div style="display:flex;align-items:center;gap:6px;">📄 page.tsx</div>
              <div style="display:flex;align-items:center;gap:6px;">📄 layout.tsx</div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;">📄 next.config.mjs</div>
            <div style="display:flex;align-items:center;gap:6px;">📄 package.json</div>
          </div>
        </div>
      `,
      code: `import { FileTree, Folder, File } from "@/components/sarahui/file-tree";

export function FileTreeNested() {
  return (
    <FileTree>
      <Folder name="apps/web">
        <Folder name="app/(dashboard)">
          <File name="page.tsx" />
          <File name="layout.tsx" />
        </Folder>
        <File name="next.config.mjs" />
        <File name="package.json" />
      </Folder>
    </FileTree>
  );
}`
    }
  ],

  // 65. CodeComparison
CodeComparison: [
    {
      title: 'TypeScript vs JavaScript',
      description: 'Structured comparison container displaying before and after code side by side.',
      preview: () => U.CodeComparison({
        beforeCode: "const legacy = true;\nconst slow = true;",
        afterCode: "import { Button } from 'sarahui';\n// Fast & zero-deps!",
        beforeTitle: "Legacy Code",
        afterTitle: "sarahUI"
      }),
      code: `import { CodeComparison } from "@/components/sarahui/code-comparison";

export function CodeComparisonDemo() {
  return (
    <CodeComparison
      beforeCode="const legacy = true;"
      afterCode="import { Button } from 'sarahui';"
      beforeTitle="Legacy Code"
      afterTitle="sarahUI"
    />
  );
}`
    },
    {
      title: 'TypeScript vs JavaScript',
      description: 'Direct comparison demonstrating type safety definitions.',
      preview: () => U.CodeComparison({
        beforeCode: "function greet(user) {\n  return 'Hello, ' + user.name;\n}",
        afterCode: "interface User { name: string; }\nfunction greet(user: User): string {\n  return `Hello, ${user.name}`;\n}",
        beforeTitle: "JavaScript",
        afterTitle: "TypeScript"
      }),
      code: `import { CodeComparison } from "@/components/sarahui/code-comparison";

export function CodeComparisonTypes() {
  return (
    <CodeComparison
      beforeCode="function greet(user) {}"
      afterCode="function greet(user: User): string {}"
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
      title: 'Bottom Pinned',
      description: 'Top pinned responsive indicator bar visualizing page reading progress.',
      preview: () => html`
        <div style="position:relative;height:180px;width:100%;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;padding:24px;">
          ${U.ScrollProgress({position:'top',height:3})}
          <p class="s-small s-muted" style="margin-top:20px;">Top-pinned reading progress indicator bar.</p>
        </div>
      `,
      code: `import { ScrollProgress } from "@/components/sarahui/scroll-progress";

export function ScrollProgressDemo() {
  return <ScrollProgress position="top" height={3} />;
}`
    },
    {
      title: 'Bottom Pinned',
      description: 'Bottom pinned progress indicator designed for documentation articles.',
      preview: () => html`
        <div style="position:relative;height:180px;width:100%;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;padding:24px;">
          <p class="s-small s-muted">Bottom-pinned reading progress indicator bar.</p>
          ${U.ScrollProgress({position:'bottom',height:4})}
        </div>
      `,
      code: `import { ScrollProgress } from "@/components/sarahui/scroll-progress";

export function ScrollProgressBottom() {
  return <ScrollProgress position="bottom" height={4} />;
}`
    }
  ],

// 67. NeonGradientCard
NeonGradientCard: [
    {
      title: 'Chromatic Glow',
      description: 'Card enclosed by a high-intensity dual-tone chromatic neon aura.',
      preview: () => html`
        <div style="display:flex;justify-content:center;padding:32px;">
          ${U.NeonGradientCard({
            title:'Pro Workspace',
            description:'Access 120 components with zero dependencies.',
            neonColors:{firstColor:'#5B3DF5',secondColor:'#FF2E93'}
          })}
        </div>
      `,
      code: `import { NeonGradientCard } from "@/components/sarahui/neon-gradient-card";

export function NeonGradientCardDemo() {
  return (
    <NeonGradientCard
      neonColors={{ firstColor: "#5B3DF5", secondColor: "#FF2E93" }}
    >
      <h3>Pro Workspace</h3>
    </NeonGradientCard>
  );
}`
    },
    {
      title: 'Emerald Cyber',
      description: 'Gentle ambient cyber emerald glow border.',
      preview: () => html`
        <div style="display:flex;justify-content:center;padding:32px;">
          ${U.NeonGradientCard({
            title:'Production Edge',
            description:'Optimized for ultra-low latency CDN deployments.',
            neonColors:{firstColor:'#10B981',secondColor:'#00E5FF'},
            borderSize:1.5
          })}
        </div>
      `,
      code: `import { NeonGradientCard } from "@/components/sarahui/neon-gradient-card";

export function NeonGradientCardEmerald() {
  return (
    <NeonGradientCard
      neonColors={{ firstColor: "#10B981", secondColor: "#00E5FF" }}
      borderSize={1.5}
    >
      <h3>Production Edge</h3>
    </NeonGradientCard>
  );
}`
    }
  ],

// 68. ComicText
ComicText: [
    {
      title: 'Action Slogan',
      description: 'Dynamic pop-art comic title with halftone texture and offset drop shadow.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          ${U.ComicText({text:'BOOM!',color:'#FF3366'})}
        </div>
      `,
      code: `import { ComicText } from "@/components/sarahui/comic-text";

export function ComicTextDemo() {
  return <ComicText text="BOOM!" color="#FF3366" />;
}`
    },
    {
      title: 'Action Slogan',
      description: 'Vibrant yellow and red action slogan typography.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;text-align:center;">
          ${U.ComicText({text:'SUPERCHARGED!',color:'#FFB800'})}
        </div>
      `,
      code: `import { ComicText } from "@/components/sarahui/comic-text";

export function ComicTextAction() {
  return <ComicText text="SUPERCHARGED!" color="#FFB800" />;
}`
    }
  ],

// 69. KineticText
KineticText: [
    {
      title: 'Bold Headline',
      description: 'Kinetic typography loop with velocity physics that responds to cursor drag.',
      preview: () => html`
        <div style="position:relative;height:240px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;">
          ${U.KineticText({text:'VELOCITY TYPOGRAPHY • ACCELERATED DESIGN • '})}
        </div>
      `,
      code: `import { KineticText } from "@/components/sarahui/kinetic-text";

export function KineticTextDemo() {
  return <KineticText text="VELOCITY TYPOGRAPHY • ACCELERATED DESIGN • " />;
}`
    },
    {
      title: 'Bold Headline',
      description: 'High speed bold headline ticker for product launch presentations.',
      preview: () => html`
        <div style="position:relative;height:240px;width:100%;overflow:hidden;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);display:flex;align-items:center;">
          ${U.KineticText({text:'HIGH SPEED DESIGN • MAXIMUM QUALITY • ',speed:1.8})}
        </div>
      `,
      code: `import { KineticText } from "@/components/sarahui/kinetic-text";

export function KineticTextFast() {
  return <KineticText text="HIGH SPEED DESIGN • MAXIMUM QUALITY • " speed={1.8} />;
}`
    }
  ],

// 70. CoolMode - Parity with Magic UI (Custom Particle)
CoolMode: [
    {
      title: 'Custom Particle',
      description: 'Spawns a festive burst of colorful particles radiating outward on click.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          ${U.CoolMode({label:'Celebrate Release 🎉',variant:'primary'})}
        </div>
      `,
      code: `import { CoolMode } from "@/components/sarahui/cool-mode";

export function CoolModeDemo() {
  return (
    <CoolMode>
      <Button>Celebrate Release 🎉</Button>
    </CoolMode>
  );
}`
    },
    {
      title: 'Custom Particle',
      description: 'Shoots custom star and spark shapes celebrating milestone achievements.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          ${U.CoolMode({label:'Super Star ⭐',variant:'outline',particle:'stars'})}
        </div>
      `,
      code: `import { CoolMode } from "@/components/sarahui/cool-mode";

export function CoolModeCustom() {
  return (
    <CoolMode particle="stars">
      <Button variant="outline">Super Star ⭐</Button>
    </CoolMode>
  );
}`
    }
  ],

// 71. PixelImage
  PixelImage: [
    {
      title: 'Fine Grain',
      description: 'Dynamic canvas-rendered retro pixelation filter for graphic image reveals.',
      preview: () => demos.PixelImage(),
      code: `import { PixelImage } from "@/components/sarahui/pixel-image";

export function PixelImageDemo() {
  return <PixelImage pixelSize={8} width={280} height={180} />;
}`
    },
    {
      title: 'Fine Grain',
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
      title: 'Ripple Glow',
      description: 'Solid call-to-action button encircled by a breathing harmonic glow aura.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          ${U.PulsatingButton({label:'Join Live Stream',pulseColor:'#5B3DF5'})}
        </div>
      `,
      code: `import { PulsatingButton } from "@/components/sarahui/pulsating-button";

export function PulsatingButtonDemo() {
  return <PulsatingButton pulseColor="#5B3DF5">Join Live Stream</PulsatingButton>;
}`
    },
    {
      title: 'Ripple Glow',
      description: 'Outward expanding radar ping pulses emphasizing critical action buttons.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          ${U.PulsatingButton({label:'Emergency Alert',pulseColor:'#FF3366',variant:'ripple'})}
        </div>
      `,
      code: `import { PulsatingButton } from "@/components/sarahui/pulsating-button";

export function PulsatingButtonRipple() {
  return <PulsatingButton variant="ripple" pulseColor="#FF3366">Emergency Alert</PulsatingButton>;
}`
    }
  ],

// 73. WarpBackground
WarpBackground: [
    {
      title: 'Deep Space',
      description: 'Hyperdrive warp tunnel background simulation with perspective depth travel.',
      preview: () => html`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:#000;border:1px solid var(--s-border-default);">
          ${U.WarpBackground({perspective:120,gridColor:'rgba(91,61,245,0.45)'})}
        </div>
      `,
      code: `import { WarpBackground } from "@/components/sarahui/warp-background";

export function WarpBackgroundDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-xl bg-black">
      <WarpBackground perspective={120} />
    </div>
  );
}`
    },
    {
      title: 'Deep Space',
      description: 'High velocity cyan warp tunnel for futuristic web landing heroes.',
      preview: () => html`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:#000;border:1px solid var(--s-border-default);">
          ${U.WarpBackground({perspective:80,gridColor:'rgba(0,229,255,0.35)',speed:2})}
        </div>
      `,
      code: `import { WarpBackground } from "@/components/sarahui/warp-background";

export function WarpBackgroundDeep() {
  return <WarpBackground perspective={80} gridColor="rgba(0,229,255,0.35)" speed={2} />;
}`
    }
  ],

// 74. InteractiveHoverButton
InteractiveHoverButton: [
    {
      title: 'Inverted Fill',
      description: 'Pill button featuring a circle dot that smoothly expands to fill the background while translating the arrow.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          ${U.InteractiveHoverButton({text:'Get Started'})}
        </div>
      `,
      code: `import { InteractiveHoverButton } from "@/components/sarahui/interactive-hover-button";

export function InteractiveHoverButtonDemo() {
  return <InteractiveHoverButton text="Get Started" />;
}`
    },
    {
      title: 'Inverted Fill',
      description: 'Dark contrast action button with white circle expand and text reveal.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          ${U.InteractiveHoverButton({text:'Explore Library'})}
        </div>
      `,
      code: `import { InteractiveHoverButton } from "@/components/sarahui/interactive-hover-button";

export function InteractiveHoverButtonExplore() {
  return <InteractiveHoverButton text="Explore Library" />;
}`
    }
  ],

// 75. AnimatedCircularProgressBar
AnimatedCircularProgressBar: [
    {
      title: 'High Value',
      description: 'Animated SVG circular progress gauge with dynamic value percentage.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;">
          ${U.AnimatedCircularProgressBar({value:72,max:100,gaugePrimaryColor:'#5B3DF5',gaugeSecondaryColor:'rgba(91,61,245,0.15)'})}
        </div>
      `,
      code: `import { AnimatedCircularProgressBar } from "@/components/sarahui/animated-circular-progress-bar";

export function AnimatedCircularProgressBarDemo() {
  return (
    <AnimatedCircularProgressBar
      max={100}
      min={0}
      value={72}
      gaugePrimaryColor="#5B3DF5"
      gaugeSecondaryColor="rgba(91,61,245,0.15)"
    />
  );
}`
    },
    {
      title: 'High Value',
      description: 'Emerald radial meter highlighting near-complete milestones.',
      preview: () => html`
        <div style="display:flex;align-items:center;justify-content:center;height:240px;">
          ${U.AnimatedCircularProgressBar({value:98,max:100,gaugePrimaryColor:'#10B981',gaugeSecondaryColor:'rgba(16,185,129,0.15)'})}
        </div>
      `,
      code: `import { AnimatedCircularProgressBar } from "@/components/sarahui/animated-circular-progress-bar";

export function AnimatedCircularProgressBarTarget() {
  return (
    <AnimatedCircularProgressBar
      max={100}
      min={0}
      value={98}
      gaugePrimaryColor="#10B981"
      gaugeSecondaryColor="rgba(16,185,129,0.15)"
    />
  );
}`
    }
  ],

// 76. Backlight - Parity with Magic UI (Image, SVG)
  Backlight: [
    {
      title: 'Image Backdrop',
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
      title: 'SVG Filter',
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
      title: 'Violet Stream',
      description: 'Falling digital rain cypher code streams rendered on performant canvas.',
      preview: () => html`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:#050508;border:1px solid var(--s-border-default);">
          ${U.GlyphMatrix({color:'#00FF66',speed:1})}
        </div>
      `,
      code: `import { GlyphMatrix } from "@/components/sarahui/glyph-matrix";

export function GlyphMatrixDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-xl bg-black">
      <GlyphMatrix color="#00FF66" />
    </div>
  );
}`
    },
    {
      title: 'Violet Stream',
      description: 'Electric violet digital glyph streams for high-tech aesthetic hero sections.',
      preview: () => html`
        <div style="position:relative;height:340px;width:100%;overflow:hidden;border-radius:12px;background:#050508;border:1px solid var(--s-border-default);">
          ${U.GlyphMatrix({color:'#A855F7',speed:1.5})}
        </div>
      `,
      code: `import { GlyphMatrix } from "@/components/sarahui/glyph-matrix";

export function GlyphMatrixViolet() {
  return <GlyphMatrix color="#A855F7" speed={1.5} />;
}`
    }
  ],

// 78. AnimatedSubscribeButton
AnimatedSubscribeButton: [
    {
      title: 'Mute Notifications',
      description: 'Smooth morphing button transitioning from Subscribe to Subscribed state with icon checkmark.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          ${U.AnimatedSubscribeButton({initialText:'Subscribe',subscribedText:'Subscribed'})}
        </div>
      `,
      code: `import { AnimatedSubscribeButton } from "@/components/sarahui/animated-subscribe-button";

export function AnimatedSubscribeButtonDemo() {
  return (
    <AnimatedSubscribeButton
      initialText="Subscribe"
      subscribedText="Subscribed"
    />
  );
}`
    },
    {
      title: 'Mute Notifications',
      description: 'Two-stage bookmark action saving and unsaving items from workspaces.',
      preview: () => html`
        <div class="demo-wrap" style="justify-content:center;padding:40px;">
          ${U.AnimatedSubscribeButton({initialText:'Save to Library',subscribedText:'Saved in Library'})}
        </div>
      `,
      code: `import { AnimatedSubscribeButton } from "@/components/sarahui/animated-subscribe-button";

export function AnimatedBookmark() {
  return (
    <AnimatedSubscribeButton
      initialText="Save to Library"
      subscribedText="Saved in Library"
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
      title: 'Secondary',
      description: 'The default high-emphasis brand action used for primary user goals.',
      preview: () => Button({label:'Create project',icon:'plus',attrs:{'data-s-dialog-open':'create-project'}}),
      code: `import { Button } from "@/components/sarahui/button";

export function ButtonPrimary() {
  return <Button variant="primary">Create project</Button>;
}`
    },
    {
      title: 'Secondary',
      description: 'Medium-emphasis action that complements primary calls to action.',
      preview: () => Button({label:'Secondary action',variant:'secondary'}),
      code: `import { Button } from "@/components/sarahui/button";

export function ButtonSecondary() {
  return <Button variant="secondary">Secondary action</Button>;
}`
    },
    {
      title: 'Outline',
      description: 'Bordered button with transparent fill for quiet surfaces.',
      preview: () => Button({label:'Outline action',variant:'outline'}),
      code: `import { Button } from "@/components/sarahui/button";

export function ButtonOutline() {
  return <Button variant="outline">Outline action</Button>;
}`
    },
    {
      title: 'Ghost',
      description: 'Minimal action with zero border, ideal for toolbars and table rows.',
      preview: () => Button({label:'Ghost action',variant:'ghost'}),
      code: `import { Button } from "@/components/sarahui/button";

export function ButtonGhost() {
  return <Button variant="ghost">Ghost action</Button>;
}`
    },
    {
      title: 'Destructive',
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
      title: 'Favorite Toggle',
      description: 'High emphasis square icon action.',
      preview: () => IconButton({icon:'plus',label:'Create project',variant:'primary'}),
      code: `import { IconButton } from "@/components/sarahui/icon-button";

export function IconButtonPrimary() {
  return <IconButton icon="plus" label="Create project" variant="primary" />;
}`
    },
    {
      title: 'Favorite Toggle',
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
      title: 'Icon Toolbar',
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
      title: 'Icon Toolbar',
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
      title: 'Dot Indicator',
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
      title: 'Dot Indicator',
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
      title: 'Selection Pills',
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
      title: 'Presence Dot',
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
      title: 'Interactive Clickable',
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
      title: 'Interactive Clickable',
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
      title: 'Selectable Rows',
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
      title: 'Selectable Rows',
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
      title: 'Multiple Expandable',
      description: 'Only allows one accordion item open at a time, smoothly collapsing previous items.',
      preview: () => U.Accordion({
        items: [
          { title: 'Can I customize source tokens?', content: 'Yes! Customize all tokens in src/styles.css and rebuild instantly.', open: true },
          { title: 'Does it support TypeScript?', content: '100% typed components with zero external dependencies.' },
          { title: 'Is it framework agnostic?', content: 'Yes! Works with React, Vue, Next.js, Vite, and plain vanilla HTML.' }
        ]
      }),
      code: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/sarahui/accordion";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I customize source tokens?</AccordionTrigger>
        <AccordionContent>Yes! Customize all tokens in src/styles.css.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`
    },
    {
      title: 'Multiple Expandable',
      description: 'Allows multiple accordion sections to remain expanded simultaneously.',
      preview: () => U.Accordion({
        items: [
          { title: 'Section 1: Architecture', content: 'Modern token-driven architecture with zero npm dependencies.', open: true },
          { title: 'Section 2: Accessibility', content: 'WCAG 2.1 AAA contrast compliant with full ARIA semantics.', open: true }
        ]
      }),
      code: `import { Accordion } from "@/components/sarahui/accordion";

export function AccordionMultiple() {
  return <Accordion type="multiple" items={items} />;
}`
    }
  ],

// 89. Progress
  Progress: [
    {
      title: 'Indeterminate',
      description: 'Progress bar displaying precise percentage completion.',
      preview: () => demos.Progress(),
      code: `import { Progress } from "@/components/sarahui/progress";

export function ProgressDemo() {
  return <Progress value={72} label="Uploading assets" />;
}`
    },
    {
      title: 'Indeterminate',
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
      title: 'Card Placeholder',
      description: 'Staggered skeleton pulse lines simulating body copy loading.',
      preview: () => demos.Skeleton(),
      code: `import { Skeleton } from "@/components/sarahui/skeleton";

export function SkeletonDemo() {
  return <Skeleton lines={4} />;
}`
    },
    {
      title: 'Card Placeholder',
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
      title: 'No Search Results',
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
      title: 'No Search Results',
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
      title: 'Labeled Center',
      description: 'Thin horizontal divider separating related content sections.',
      preview: () => demos.Separator(),
      code: `import { Separator } from "@/components/sarahui/separator";

export function SeparatorDemo() {
  return <Separator />;
}`
    },
    {
      title: 'Labeled Center',
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
      title: 'Size Variants',
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
      title: 'Size Variants',
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
      title: 'Mute Notifications',
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
      title: 'Multi-Select',
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
      title: 'Multi-Select',
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
      title: 'Escape Key',
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
      title: '1:1 Square',
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
      title: '1:1 Square',
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
      title: 'Nested Disclosure',
      description: 'Collapsible container with smooth expand and collapse transition and rotating chevron.',
      preview: () => html`
        <div class="s-stack">
          ${U.Collapsible({title:'What is SarahUI?',content:'SarahUI is a modern, zero-dependency design system combining the best of MagicUI and Shadcn.',open:true})}
        </div>
      `,
      code: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/sarahui/collapsible";

export function CollapsibleDemo() {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>What is SarahUI?</CollapsibleTrigger>
      <CollapsibleContent>SarahUI is a modern design system.</CollapsibleContent>
    </Collapsible>
  );
}`
    },
    {
      title: 'Nested Disclosure',
      description: 'Multiple collapsible items organized into a clean FAQ structure.',
      preview: () => html`
        <div class="s-stack">
          ${U.Collapsible({title:'Is it compatible with Next.js & Vite?',content:'Yes! Works out of the box with React, Next.js, Vite, Astro, and plain HTML.',open:false})}
          ${U.Collapsible({title:'Are there any external dependencies?',content:'Zero runtime dependencies. Pure CSS variables and native browser APIs.',open:false})}
        </div>
      `,
      code: `import { Collapsible } from "@/components/sarahui/collapsible";

export function CollapsibleNested() {
  return (
    <div className="space-y-2">
      <Collapsible title="Is it compatible with Next.js?" />
      <Collapsible title="Are there any dependencies?" />
    </div>
  );
}`
    }
  ],

// 99. Checkbox
  Checkbox: [
    {
      title: 'Validation Error',
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
      title: 'Error State',
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
      title: 'Disabled Option',
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
      title: 'With Icon',
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
      title: 'Error State',
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
      title: 'Disabled',
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
      title: 'Disabled',
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
      title: 'Disabled',
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
      title: 'Disabled',
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
      title: 'Disabled',
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
      title: 'Unchecked',
      description: 'Immediate on state with active accent fill.',
      preview: () => Switch({id:'var-switch-on',label:'Real-time sync',description:'Updates stream instantly.',checked:true}),
      code: `import { Switch } from "@/components/sarahui/switch";

export function SwitchChecked() {
  return <Switch label="Real-time sync" defaultChecked />;
}`
    },
    {
      title: 'Unchecked',
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
      title: 'Stepped Interval',
      description: 'Standard smooth range track slider for audio volume or brightness.',
      preview: () => html`
        <div style="width:100%;max-width:320px;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:500;">
            <span>Master Volume</span>
            <span style="color:var(--s-text-muted);">75%</span>
          </div>
          <input type="range" class="s-slider" min="0" max="100" value="75" style="width:100%;accent-color:var(--s-action-primary);" />
        </div>
      `,
      code: `import { Slider } from "@/components/sarahui/slider";

export function SliderDemo() {
  return <Slider defaultValue={[75]} max={100} step={1} />;
}`
    },
    {
      title: 'Stepped Interval',
      description: 'Discrete interval ticks for stepped quantization levels.',
      preview: () => html`
        <div style="width:100%;max-width:320px;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:500;">
            <span>Compression Level</span>
            <span style="color:var(--s-text-muted);">Level 3 of 5</span>
          </div>
          <input type="range" class="s-slider" min="1" max="5" step="1" value="3" style="width:100%;accent-color:var(--s-brand-blue,#5B3DF5);" />
        </div>
      `,
      code: `import { Slider } from "@/components/sarahui/slider";

export function SliderStepped() {
  return <Slider defaultValue={[3]} min={1} max={5} step={1} />;
}`
    }
  ],

  // 106. Tabs
  Tabs: [
    {
      title: 'Segmented Pill',
      description: 'Underline navigation tabs with smooth active border indicator.',
      preview: () => html`
        <div class="s-tabs" data-s-tabs style="width:100%;max-width:400px;">
          <div role="tablist" style="display:flex;border-bottom:1px solid var(--s-border-default);gap:16px;">
            <button role="tab" aria-selected="true" class="s-tab-btn" style="padding:8px 0;font-size:14px;font-weight:600;border:none;background:none;color:var(--s-action-primary);border-bottom:2px solid var(--s-action-primary);">Account</button>
            <button role="tab" aria-selected="false" class="s-tab-btn" style="padding:8px 0;font-size:14px;font-weight:500;border:none;background:none;color:var(--s-text-muted);">Password</button>
            <button role="tab" aria-selected="false" class="s-tab-btn" style="padding:8px 0;font-size:14px;font-weight:500;border:none;background:none;color:var(--s-text-muted);">Notifications</button>
          </div>
          <div style="padding:16px 0;font-size:13.5px;color:var(--s-text-secondary);">Manage your profile details, contact preferences, and public bio.</div>
        </div>
      `,
      code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/sarahui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
    </Tabs>
  );
}`
    },
    {
      title: 'Segmented Pill',
      description: 'Enclosed pill background tab switcher for compact state toggling.',
      preview: () => html`
        <div class="s-tabs s-tabs--pill" data-s-tabs style="width:100%;max-width:400px;">
          <div role="tablist" style="display:inline-flex;padding:4px;border-radius:10px;background:var(--s-bg-subtle);border:1px solid var(--s-border-default);gap:4px;">
            <button role="tab" aria-selected="true" style="padding:6px 14px;font-size:13px;font-weight:600;border-radius:7px;border:none;background:var(--s-bg-surface);color:var(--s-text-primary);box-shadow:none;">Monthly</button>
            <button role="tab" aria-selected="false" style="padding:6px 14px;font-size:13px;font-weight:500;border-radius:7px;border:none;background:none;color:var(--s-text-muted);">Quarterly</button>
            <button role="tab" aria-selected="false" style="padding:6px 14px;font-size:13px;font-weight:500;border-radius:7px;border:none;background:none;color:var(--s-text-muted);">Annual (Save 20%)</button>
          </div>
          <div style="padding:16px 0;font-size:13.5px;color:var(--s-text-secondary);">],9/month billed annually. Cancel anytime with no penalties.</div>
        </div>
      `,
      code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/sarahui/tabs";

export function TabsPill() {
  return (
    <Tabs defaultValue="monthly" variant="pill">
      <TabsList>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="annual">Annual</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}`
    }
  ],

  // 107. Breadcrumb
Breadcrumb: [
    {
      title: 'Chevron Arrow',
      description: 'Hierarchical navigation path with clean slash dividers.',
      preview: () => U.Breadcrumb({
        items: [
          { label: 'Workspace', href: '#patterns' },
          { label: 'Projects', href: '#patterns' },
          { label: 'Design System' }
        ]
      }),
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
      title: 'Chevron Arrow',
      description: 'Directional chevron indicators linking ancestors.',
      preview: () => html`
        <nav aria-label="Breadcrumb" class="s-breadcrumb s-breadcrumb--chevron">
          <ol style="display:flex;align-items:center;gap:8px;list-style:none;padding:0;margin:0;font-size:13px;">
            <li><a href="#overview" style="color:var(--s-text-muted);text-decoration:none;">Docs</a></li>
            <li style="color:var(--s-text-muted);opacity:0.5;">›</li>
            <li><a href="#components" style="color:var(--s-text-muted);text-decoration:none;">Components</a></li>
            <li style="color:var(--s-text-muted);opacity:0.5;">›</li>
            <li style="font-weight:600;color:var(--s-text-primary);" aria-current="page">Breadcrumb</li>
          </ol>
        </nav>
      `,
      code: `import { Breadcrumb } from "@/components/sarahui/breadcrumb";

export function BreadcrumbChevron() {
  return <Breadcrumb separator="chevron" items={items} />;
}`
    }
  ],

// 108. Pagination
  Pagination: [
    {
      title: 'Compact Previous / Next',
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
      title: 'Active Pill',
      description: 'Navigation link displaying active record counter badge.',
      preview: () => html`
        <nav aria-label="Example navigation" class="demo-nav">
          ${U.NavItem({label:'Components',href:'#components',icon:'layers',badge:'120'})}
        </nav>
      `,
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
      title: 'Active Pill',
      description: 'Prominent highlighted surface for current route navigation.',
      preview: () => html`
        <nav aria-label="Example navigation" class="demo-nav">
          ${U.NavItem({active:true,label:'Active Route',icon:'grid'})}
        </nav>
      `,
      code: `import { NavItem } from "@/components/sarahui/nav-item";

export function NavItemActive() {
  return <NavItem active href="#overview" icon="grid">Overview</NavItem>;
}`
    }
  ],

// 110. Menu
  Menu: [
    {
      title: 'Destructive Action',
      description: 'Standard popover action list with dividers and destructive actions.',
      preview: () => html`
        <div class="s-menu-panel" style="width:200px;border-radius:10px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:6px;display:flex;flex-direction:column;gap:2px;box-shadow:none;">
          <button type="button" style="display:flex;align-items:center;gap:8px;padding:8px 10px;font-size:13px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;text-align:left;">✏️ Edit Profile</button>
          <button type="button" style="display:flex;align-items:center;gap:8px;padding:8px 10px;font-size:13px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;text-align:left;">📋 Duplicate View</button>
          <div style="height:1px;background:var(--s-border-default);margin:4px 0;"></div>
          <button type="button" style="display:flex;align-items:center;gap:8px;padding:8px 10px;font-size:13px;border-radius:6px;border:none;background:none;color:var(--s-status-danger-text,#EF4444);cursor:pointer;width:100%;text-align:left;">🗑️ Delete Item</button>
        </div>
      `,
      code: `import { Menu, MenuItem, MenuSeparator } from "@/components/sarahui/menu";

export function MenuDemo() {
  return (
    <Menu>
      <MenuItem>Edit Profile</MenuItem>
      <MenuItem>Duplicate View</MenuItem>
      <MenuSeparator />
      <MenuItem destructive>Delete Item</MenuItem>
    </Menu>
  );
}`
    },
    {
      title: 'Destructive Action',
      description: 'Export and sharing operations menu.',
      preview: () => html`
        <div class="s-menu-panel" style="width:200px;border-radius:10px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:6px;display:flex;flex-direction:column;gap:2px;box-shadow:none;">
          <button type="button" style="display:flex;align-items:center;gap:8px;padding:8px 10px;font-size:13px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;text-align:left;">🔗 Copy Link</button>
          <button type="button" style="display:flex;align-items:center;gap:8px;padding:8px 10px;font-size:13px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;text-align:left;">📤 Export CSV</button>
          <button type="button" style="display:flex;align-items:center;gap:8px;padding:8px 10px;font-size:13px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;text-align:left;">📄 Export PDF</button>
        </div>
      `,
      code: `import { Menu, MenuItem } from "@/components/sarahui/menu";

export function MenuExport() {
  return (
    <Menu>
      <MenuItem>Copy Link</MenuItem>
      <MenuItem>Export CSV</MenuItem>
      <MenuItem>Export PDF</MenuItem>
    </Menu>
  );
}`
    }
  ],

  // 111. CommandPalette
CommandPalette: [
    {
      title: 'Pre-Filtered Group',
      description: 'Fast fuzzy search palette opened with Cmd+K or Ctrl+K.',
      preview: () => html`
        <div class="demo-wrap">
          ${Button({label:'Open Command Palette (⌘K)',icon:'spark',attrs:{'data-s-dialog-open':'demo-cmd-p1'}})}
          ${U.CommandPalette({id:'demo-cmd-p1',placeholder:'Type a command or search documentation...'})}
        </div>
      `,
      code: `import { CommandPalette } from "@/components/sarahui/command-palette";

export function CommandPaletteDemo() {
  return (
    <CommandPalette shortcut="⌘K" placeholder="Search documentation..." />
  );
}`
    },
    {
      title: 'Pre-Filtered Group',
      description: 'Command palette grouping actions into Navigation, Actions, and Settings.',
      preview: () => html`
        <div class="demo-wrap">
          ${Button({label:'Quick File Search (⌘P)',icon:'folder',variant:'outline',attrs:{'data-s-dialog-open':'demo-cmd-p2'}})}
          ${U.CommandPalette({
            id:'demo-cmd-p2',
            placeholder:'Search project files...',
            items:[
              {label:'src/index.ts',href:'#patterns'},
              {label:'src/styles.css',href:'#foundations'},
              {label:'package.json',href:'#start'}
            ]
          })}
        </div>
      `,
      code: `import { CommandPalette } from "@/components/sarahui/command-palette";

export function CommandPaletteGrouped() {
  return <CommandPalette groups={commandGroups} />;
}`
    }
  ],

// 112. Alert
  Alert: [
    {
      title: 'Warning',
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
      title: 'Warning',
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
      title: 'Danger',
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
      title: 'Form Modal',
      description: 'Native modal dialog with focus trap and backdrop dismissal.',
      preview: () => html`
        <div class="demo-wrap">
          ${Button({ label: 'Create a project', icon: 'plus', attrs: { 'data-s-dialog-open': 'create-project' } })}
        </div>
      `,
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
      title: 'Form Modal',
      description: 'Modal housing a structured form with submission buttons.',
      preview: () => html`
        <div class="demo-wrap">
          ${Button({ label: 'Quick Settings', icon: 'settings', variant: 'outline', attrs: { 'data-s-dialog-open': 'demo-settings-modal' } })}
          <dialog id="demo-settings-modal" class="s-dialog" style="max-width:440px;padding:24px;border-radius:14px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);">
            <h3 style="margin:0 0 6px;">Workspace Preferences</h3>
            <p class="s-small s-muted" style="margin:0 0 16px;">Configure your development environment defaults.</p>
            <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">
              ${Input({ id: 'pref-name', label: 'Display Name', attrs: { value: 'Sarah Khan' } })}
              ${Switch({ id: 'pref-notif', label: 'Push Notifications', checked: true })}
            </div>
            <div style="display:flex;justify-content:flex-end;gap:8px;">
              ${Button({ label: 'Cancel', variant: 'ghost', size: 'sm', attrs: { 'data-s-dialog-close': true } })}
              ${Button({ label: 'Save Changes', variant: 'primary', size: 'sm', attrs: { 'data-s-dialog-close': true } })}
            </div>
          </dialog>
        </div>
      `,
      code: `import { Dialog } from "@/components/sarahui/dialog";

export function DialogForm() {
  return <Dialog title="Workspace Preferences" formAction="/api/settings" />;
}`
    }
  ],

// 114. Tooltip
  Tooltip: [
    {
      title: 'Shortcut Tooltip',
      description: 'Informational floating hint explaining interactive control behavior.',
      preview: () => html`
        <div style="display:inline-flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="padding:6px 12px;border-radius:8px;background:var(--s-text-primary);color:var(--s-bg-canvas);font-size:12px;font-weight:500;">Add to personal workspace</div>
          <button type="button" class="s-button s-button--secondary" style="font-size:13px;">Hover Trigger</button>
        </div>
      `,
      code: `import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/sarahui/tooltip";

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild><Button variant="secondary">Hover Trigger</Button></TooltipTrigger>
      <TooltipContent>Add to personal workspace</TooltipContent>
    </Tooltip>
  );
}`
    },
    {
      title: 'Shortcut Tooltip',
      description: 'Paired action tooltip displaying shortcut modifier key sequence.',
      preview: () => html`
        <div style="display:inline-flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:8px;background:var(--s-text-primary);color:var(--s-bg-canvas);font-size:12px;font-weight:500;">
            <span>Command Palette</span>
            <kbd style="padding:1px 5px;border-radius:4px;background:rgba(255,255,255,0.2);font-size:11px;font-family:var(--s-font-mono);">⌘K</kbd>
          </div>
          <button type="button" class="s-button s-button--outline" style="font-size:13px;">Search Shortcut</button>
        </div>
      `,
      code: `import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/sarahui/tooltip";

export function TooltipShortcut() {
  return (
    <Tooltip>
      <TooltipTrigger asChild><Button variant="outline">Search Shortcut</Button></TooltipTrigger>
      <TooltipContent>Command Palette <kbd>⌘K</kbd></TooltipContent>
    </Tooltip>
  );
}`
    }
  ],

  // 115. Toast
Toast: [
    {
      title: 'Warning Alert',
      description: 'Polite announcement toast with automatic pause on hover or focus.',
      preview: () => html`
        <div class="demo-wrap">
          ${Button({ label: 'Publish Changes', icon: 'spark', variant: 'primary', attrs: { 'data-feedback': 'Changes published live on edge!' } })}
        </div>
      `,
      code: `import { toast } from "sarahui";

export function ToastSuccess() {
  return (
    <button onClick={() => toast("Changes published live on edge!", { title: "Success" })}>
      Publish Changes
    </button>
  );
}`
    },
    {
      title: 'Warning Alert',
      description: 'Notice toast alerting users to non-critical updates or latency.',
      preview: () => html`
        <div class="demo-wrap">
          ${Button({ label: 'Simulate Warning', variant: 'outline', attrs: { 'data-feedback': 'Network latency detected. Reconnecting...' } })}
        </div>
      `,
      code: `import { toast } from "sarahui";

export function ToastWarning() {
  return (
    <button onClick={() => toast("Network latency detected.", { title: "Warning", tone: "warning" })}>
      Simulate Warning
    </button>
  );
}`
    }
  ],

// 116. Drawer
  Drawer: [
    {
      title: 'Bottom Sheet',
      description: 'Side overlay drawer panel for extended settings forms and inspector panels.',
      preview: () => html`
        <div style="position:relative;height:240px;width:100%;max-width:400px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;box-shadow:none;">
          <div style="position:absolute;top:0;right:0;width:65%;height:100%;border-left:1px solid var(--s-border-default);background:var(--s-bg-canvas);padding:16px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <h4 style="font-size:14px;font-weight:700;margin:0 0 4px;">Edit Profile</h4>
              <p style="font-size:12px;color:var(--s-text-muted);margin:0;">Make changes to your account settings.</p>
            </div>
            <button type="button" class="s-button s-button--primary" style="width:100%;font-size:12.5px;">Save changes</button>
          </div>
        </div>
      `,
      code: `import { Drawer, DrawerTrigger, DrawerContent } from "@/components/sarahui/drawer";

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild><Button>Open Drawer</Button></DrawerTrigger>
      <DrawerContent>
        <h3>Edit Profile</h3>
      </DrawerContent>
    </Drawer>
  );
}`
    },
    {
      title: 'Bottom Sheet',
      description: 'Bottom sheet modal for mobile actions.',
      preview: () => html`
        <div style="position:relative;height:240px;width:100%;max-width:400px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;box-shadow:none;">
          <div style="position:absolute;bottom:0;inset-x:0;height:65%;border-top:1px solid var(--s-border-default);background:var(--s-bg-canvas);padding:16px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="width:36px;height:4px;border-radius:2px;background:var(--s-border-strong);margin:0 auto 12px;"></div>
              <h4 style="font-size:14px;font-weight:700;margin:0 0 4px;">Payment Method</h4>
              <p style="font-size:12px;color:var(--s-text-muted);margin:0;">Select default card for checkout.</p>
            </div>
            <button type="button" class="s-button s-button--primary" style="width:100%;font-size:12.5px;">Confirm Payment</button>
          </div>
        </div>
      `,
      code: `import { Drawer, DrawerContent } from "@/components/sarahui/drawer";

export function DrawerBottom() {
  return <Drawer side="bottom"><DrawerContent>Payment Method</DrawerContent></Drawer>;
}`
    }
  ],

  // 117. Popover
  Popover: [
    {
      title: 'Form Popover',
      description: 'Form panel floating popover anchored to a trigger.',
      preview: () => html`
        <div class="s-popover-content" style="width:240px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:16px;display:flex;flex-direction:column;gap:10px;box-shadow:none;">
          <h4 style="font-size:14px;font-weight:600;margin:0;">Dimensions</h4>
          <div>
            <label style="font-size:12px;color:var(--s-text-muted);">Width</label>
            <input type="text" class="s-input" value="100%" style="width:100%;margin-top:2px;padding:4px 8px;font-size:12px;" />
          </div>
          <div>
            <label style="font-size:12px;color:var(--s-text-muted);">Height</label>
            <input type="text" class="s-input" value="240px" style="width:100%;margin-top:2px;padding:4px 8px;font-size:12px;" />
          </div>
        </div>
      `,
      code: `import { Popover, PopoverTrigger, PopoverContent } from "@/components/sarahui/popover";

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild><Button variant="outline">Dimensions</Button></PopoverTrigger>
      <PopoverContent>Width & Height controls</PopoverContent>
    </Popover>
  );
}`
    },
    {
      title: 'Form Popover',
      description: 'Status badge and quick profile summary popover.',
      preview: () => html`
        <div class="s-popover-content" style="width:240px;border-radius:12px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:16px;display:flex;flex-direction:column;gap:8px;box-shadow:none;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="width:10px;height:10px;border-radius:50%;background:#10B981;"></span>
            <strong style="font-size:13px;">Online & Available</strong>
          </div>
          <p style="font-size:12px;color:var(--s-text-muted);margin:0;">Focus mode is disabled. Accepting pairing invites.</p>
        </div>
      `,
      code: `import { Popover, PopoverContent } from "@/components/sarahui/popover";

export function PopoverStatus() {
  return <Popover><PopoverContent>Online & Available</PopoverContent></Popover>;
}`
    }
  ],

  // 118. Sheet
  Sheet: [
    {
      title: 'Left Navigation',
      description: 'Right-side sheet panel for filters and multi-step data entry.',
      preview: () => html`
        <div style="position:relative;height:240px;width:100%;max-width:380px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;box-shadow:none;">
          <div style="position:absolute;top:0;right:0;width:70%;height:100%;border-left:1px solid var(--s-border-default);background:var(--s-bg-canvas);padding:16px;">
            <h4 style="font-size:14px;font-weight:700;margin:0 0 6px;">Filters</h4>
            <div style="display:flex;flex-direction:column;gap:8px;font-size:12.5px;">
              <label style="display:flex;align-items:center;gap:6px;"><input type="checkbox" checked /> Design Tokens</label>
              <label style="display:flex;align-items:center;gap:6px;"><input type="checkbox" checked /> Components</label>
              <label style="display:flex;align-items:center;gap:6px;"><input type="checkbox" /> Layouts</label>
            </div>
          </div>
        </div>
      `,
      code: `import { Sheet, SheetTrigger, SheetContent } from "@/components/sarahui/sheet";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild><Button>Open Filters</Button></SheetTrigger>
      <SheetContent side="right">Filters checklist</SheetContent>
    </Sheet>
  );
}`
    },
    {
      title: 'Left Navigation',
      description: 'Left drawer sheet for mobile sidebar navigation.',
      preview: () => html`
        <div style="position:relative;height:240px;width:100%;max-width:380px;border-radius:12px;border:1px solid var(--s-border-default);background:var(--s-bg-surface);overflow:hidden;box-shadow:none;">
          <div style="position:absolute;top:0;left:0;width:70%;height:100%;border-right:1px solid var(--s-border-default);background:var(--s-bg-canvas);padding:16px;">
            <h4 style="font-size:14px;font-weight:700;margin:0 0 8px;">Navigation</h4>
            <div style="display:flex;flex-direction:column;gap:6px;font-size:12.5px;">
              <a href="#overview" style="color:var(--s-text-primary);text-decoration:none;">Overview</a>
              <a href="#foundations" style="color:var(--s-text-primary);text-decoration:none;">Foundations</a>
              <a href="#components" style="color:var(--s-text-primary);text-decoration:none;">Components</a>
            </div>
          </div>
        </div>
      `,
      code: `import { Sheet, SheetContent } from "@/components/sarahui/sheet";

export function SheetLeft() {
  return <Sheet><SheetContent side="left">Navigation menu</SheetContent></Sheet>;
}`
    }
  ],

  // 119. ContextMenu
  ContextMenu: [
    {
      title: 'Destructive Action',
      description: 'Browser-style navigation and action context menu.',
      preview: () => html`
        <div class="s-context-menu-panel" style="width:190px;border-radius:10px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:6px;display:flex;flex-direction:column;gap:2px;box-shadow:none;">
          <button type="button" style="display:flex;justify-content:space-between;padding:7px 10px;font-size:12.5px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;"><span>Back</span><span style="color:var(--s-text-muted);">⌘[</span></button>
          <button type="button" style="display:flex;justify-content:space-between;padding:7px 10px;font-size:12.5px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;"><span>Forward</span><span style="color:var(--s-text-muted);">⌘]</span></button>
          <button type="button" style="display:flex;justify-content:space-between;padding:7px 10px;font-size:12.5px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;"><span>Reload</span><span style="color:var(--s-text-muted);">⌘R</span></button>
        </div>
      `,
      code: `import { ContextMenu, ContextMenuItem } from "@/components/sarahui/context-menu";

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuItem>Back</ContextMenuItem>
      <ContextMenuItem>Forward</ContextMenuItem>
      <ContextMenuItem>Reload</ContextMenuItem>
    </ContextMenu>
  );
}`
    },
    {
      title: 'Destructive Action',
      description: 'File operations context menu with cut, copy, and delete.',
      preview: () => html`
        <div class="s-context-menu-panel" style="width:190px;border-radius:10px;background:var(--s-bg-surface);border:1px solid var(--s-border-default);padding:6px;display:flex;flex-direction:column;gap:2px;box-shadow:none;">
          <button type="button" style="display:flex;justify-content:space-between;padding:7px 10px;font-size:12.5px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;"><span>Cut</span><span style="color:var(--s-text-muted);">⌘X</span></button>
          <button type="button" style="display:flex;justify-content:space-between;padding:7px 10px;font-size:12.5px;border-radius:6px;border:none;background:none;color:var(--s-text-primary);cursor:pointer;width:100%;"><span>Copy</span><span style="color:var(--s-text-muted);">⌘C</span></button>
          <div style="height:1px;background:var(--s-border-default);margin:3px 0;"></div>
          <button type="button" style="display:flex;justify-content:space-between;padding:7px 10px;font-size:12.5px;border-radius:6px;border:none;background:none;color:var(--s-status-danger-text,#EF4444);cursor:pointer;width:100%;"><span>Delete</span><span style="color:var(--s-status-danger-text,#EF4444);">⌫</span></button>
        </div>
      `,
      code: `import { ContextMenu, ContextMenuItem } from "@/components/sarahui/context-menu";

export function ContextMenuFile() {
  return (
    <ContextMenu>
      <ContextMenuItem>Cut</ContextMenuItem>
      <ContextMenuItem>Copy</ContextMenuItem>
      <ContextMenuItem destructive>Delete</ContextMenuItem>
    </ContextMenu>
  );
}`
    }
  ],

  // 120. HoverCard
HoverCard: [
    {
      title: 'Link Preview',
      description: 'Rich popover card appearing smoothly when hovering over user mention links.',
      preview: () => demos.HoverCard(),
      code: `import { HoverCard } from "@/components/sarahui/hover-card";

export function HoverCardUser() {
  return (
    <HoverCard trigger="@sarahui">
      <UserProfile name="Sarah Khan" role="Lead Designer" />
    </HoverCard>
  );
}`
    },
    {
      title: 'Link Preview',
      description: 'Hover card displaying summary preview of external links and repositories.',
      preview: () => html`
        <div class="demo-wrap">
          ${U.HoverCard({
            trigger: Button({ label: 'github.com/sarahui', variant: 'ghost', size: 'sm', icon: 'link' }),
            content: html`
              <div style="padding:4px;max-width:260px;">
                <strong style="font-size:13px;display:block;margin-bottom:4px;">masarax/sarahui</strong>
                <p class="s-small s-muted" style="margin:0 0 8px;">120 components, 277 design tokens, 0 runtime dependencies.</p>
                <span class="s-small" style="color:var(--s-brand-indigo);">★ 4.9k stars on GitHub</span>
              </div>
            `
          })}
        </div>
      `,
      code: `import { HoverCard } from "@/components/sarahui/hover-card";

export function HoverCardLink() {
  return (
    <HoverCard trigger="github.com/sarahui">
      <RepoSummary name="masarax/sarahui" stars={4900} />
    </HoverCard>
  );
}`
    }
  ],

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
  Slider:['Forms & Inputs','A continuous or discrete range control for numeric values.'],

  // Base UI - Navigation
  Tabs:['Navigation','Connected views, keyboard navigation, and consistent focus.'],
  Breadcrumb:['Navigation','A clear path back, with an explicitly announced current page.'],
  Pagination:['Navigation','Previous, next, and current page. Connect events to your data.'],
  NavItem:['Navigation','Consistent navigation, optional counts, and active states.'],
  Menu:['Navigation','A list of actions, keyboard navigation, and menu items.'],
  CommandPalette:['Navigation','Search, filter, and navigate without leaving the keyboard.'],

  // Base UI - Feedback & Overlays
  Alert:['Feedback & Overlays','Contextual feedback with a title, detail, and supporting icon.'],
  Dialog:['Feedback & Overlays','Native modal focus containment, Escape, and focus restoration.'],
  Tooltip:['Feedback & Overlays','Short helper text on hover or focus, without obscuring content.'],
  Toast:['Feedback & Overlays','Polite announcements; the timer pauses on hover or focus.'],
  Drawer:['Feedback & Overlays','A sliding panel from the viewport edge for secondary content.'],
  Popover:['Feedback & Overlays','Rich interactive content anchored directly to a trigger element.'],
  Sheet:['Feedback & Overlays','Extended side panel overlay for complex filtering and configuration.'],
  ContextMenu:['Feedback & Overlays','Context-sensitive action menu triggered on secondary click.'],
  HoverCard:['Feedback & Overlays','Rich contextual preview popover appearing on element hover.'],

  // Animated Components
  Marquee:['Components','Infinite smooth auto-scrolling marquee ticker with hover pause.'],
  Terminal:['Components','Interactive macOS styled code terminal with typing command execution.'],
  HeroVideoDialog:['Components','Hero video thumbnail trigger with pulsing play button and accessible modal lightbox.'],
  BentoGrid:['Components','Responsive Bento-box grid layout with hover elevation and contextual cards.'],
  AnimatedList:['Components','Staggered animated notification stack with smooth entrance physics.'],
  Dock:['Components','macOS styled magnifying dock container with smooth spring cursor physics.'],
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
  GlareHover:['Special Effects','A diagonal light glare on hover using a pseudo-element gradient, CSS variables, and smooth transition.'],
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
  FileTree:['Community','Hierarchical file tree with folder disclosure and file icon mapping.'],
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



