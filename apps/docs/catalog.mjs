import * as U from '../../packages/ui/src/templates.js';
const {html,Button,Icon,IconButton,Input,Switch,Badge,Avatar,Progress}=U;
const act=text=>({'data-feedback':text});

export const demos={
  Icon:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Curated Stroke Grid</span><div class="icon-grid">${['spark','layers','palette','grid','globe','shield','heart','folder','mail','calendar','clock','settings'].map(name=>html`<span title="${name}">${Icon({name,size:24,label:name})}</span>`)}</div></div><div class="demo-variant-row"><span class="demo-variant-label">Scale Variations (16px · 20px · 24px)</span><div class="demo-wrap icon-scale-row"><span title="16px">${Icon({name:'spark',size:16,label:'Spark 16px'})}</span><span title="20px">${Icon({name:'layers',size:20,label:'Layers 20px'})}</span><span title="24px">${Icon({name:'shield',size:24,label:'Shield 24px'})}</span></div></div></div>`,

  Button:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Semantic Variants</span><div class="demo-wrap">${Button({label:'Create project',icon:'plus',attrs:{'data-s-dialog-open':'create-project'}})}${Button({label:'Secondary',variant:'secondary',attrs:act('Secondary action selected.')})}${Button({label:'Outline',variant:'outline',attrs:act('Outline action selected.')})}${Button({label:'Ghost',variant:'ghost',attrs:act('Ghost action selected.')})}${Button({label:'Delete',variant:'danger',attrs:act('This is a visual demo. Nothing was deleted.')})}</div></div><div class="demo-variant-row"><span class="demo-variant-label">Sizes & States</span><div class="demo-wrap">${Button({label:'Small action',size:'sm',icon:'spark'})}${Button({label:'Medium regular',size:'md'})}${Button({label:'Large action',size:'lg',trailing:'arrow'})}${Button({label:'Saving…',loading:true})}${Button({label:'Disabled',disabled:true})}</div></div></div>`,

  IconButton:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Variants & Micro-actions</span><div class="demo-wrap">${IconButton({icon:'plus',label:'Create project',variant:'primary',attrs:{'data-s-dialog-open':'create-project'}})}${IconButton({icon:'heart',label:'Save to favorites',attrs:{'data-favorite':true,'aria-pressed':'false'}})}${IconButton({icon:'copy',label:'Copy page link',variant:'ghost',attrs:{'data-copy-page':true}})}${IconButton({icon:'trash',label:'Delete item',variant:'danger',attrs:act('Visual demo action.')})}</div></div><div class="demo-variant-row"><span class="demo-variant-label">Sizes (sm · md · lg)</span><div class="demo-wrap">${IconButton({icon:'spark',label:'Small icon',size:'sm'})}${IconButton({icon:'spark',label:'Medium icon',size:'md'})}${IconButton({icon:'spark',label:'Large icon',size:'lg'})}</div></div></div>`,

  ButtonGroup:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Segmented Toolbar</span>${U.ButtonGroup({label:'Editor actions',children:['Preview','Code','Share'].map((label,i)=>Button({label,icon:['grid','code','link'][i],variant:'outline',size:'sm',attrs:i===2?{'data-copy-page':true}:act(label+' selected.')}))})}</div></div>`,

  Input:id=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Input States & Icons</span><div class="s-stack">${Input({id:id+'-email',label:'Email address',type:'email',icon:'mail',attrs:{placeholder:'hello@yourstudio.com'},helper:'A good place to stay connected.'})}${Input({id:id+'-error',label:'Workspace URL',error:'Use at least 3 characters.',attrs:{value:'ab'}})}</div></div></div>`,

  Textarea:id=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Multi-line Text Entry</span>${U.Textarea({id,label:'Project brief',helper:'A sentence or two is a great place to start.',attrs:{placeholder:'What are you creating?',maxlength:500}})}</div></div>`,

  Select:id=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Dropdown Menu Selection</span>${U.Select({id,label:'Workspace',options:['Sarah’s studio','Personal','Design team'],helper:'Choose where your project belongs.'})}</div></div>`,

  Checkbox:id=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Selection States</span><div class="s-stack">${U.Checkbox({id:id+'-a',label:'Product updates',description:'A little inspiration, once in a while.',checked:true})}${U.Checkbox({id:id+'-b',label:'Community announcements',description:'News and insights from our team.'})}${U.Checkbox({id:id+'-c',label:'Workspace policy',checked:true,disabled:true,description:'Enforced by organization security.'})}</div></div></div>`,

  Radio:id=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><fieldset class="demo-fieldset"><legend class="demo-variant-label">Billing cycle options</legend>${U.Radio({id:id+'-a',label:'Monthly billing',description:'Flexible, month to month payment.',checked:true,attrs:{name:id,value:'monthly'}})}${U.Radio({id:id+'-b',label:'Yearly billing',description:'One simple payment for the full year (Save 20%).',attrs:{name:id,value:'yearly'}})}</fieldset></div></div>`,

  Switch:id=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Immediate Toggles</span><div class="s-stack">${Switch({id:id+'-a',label:'Email notifications',description:'Know when something needs your attention.',checked:true})}${Switch({id:id+'-b',label:'Weekly digest',description:'A concise recap sent every Monday morning.'})}</div></div></div>`,

  Slider:id=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Continuous Value Range</span>${U.Slider({id,label:'Interface density',value:64})}</div></div>`,

  Badge:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Semantic Tones</span><div class="demo-wrap">${['brand','info','success','warning','danger','neutral'].map((tone,i)=>Badge({tone,label:['New release','In progress','Operational','In review','Needs attention','Draft'][i]}))}</div></div><div class="demo-variant-row"><span class="demo-variant-label">Presence Dots</span><div class="demo-wrap">${['brand','info','success','warning','danger','neutral'].map((tone,i)=>Badge({tone,dot:true,label:['Live','Syncing','Healthy','Warning','Degraded','Offline'][i]}))}</div></div></div>`,

  Chip:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Interactive Category Tags</span><div class="demo-wrap" aria-label="Selected tags" tabindex="-1">${['Design system','Product','Engineering','Accessibility'].map((label,i)=>U.Chip({label,removable:true,selected:i===0}))}${U.Chip({label:'Read-only badge',removable:false})}</div></div></div>`,

  Avatar:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Presence & Tones</span><div class="demo-wrap">${Avatar({name:'Sarah Khan',size:'lg',status:true})}${Avatar({name:'Alex Morgan',tone:'info',status:true})}${Avatar({name:'Jamie Kim',tone:'success'})}${Avatar({name:'Maya Rahman',tone:'warning',size:'sm'})}</div></div><div class="demo-variant-row"><span class="demo-variant-label">Collaborator Stack</span><div class="s-row card-people"><div class="avatar-stack">${Avatar({name:'Sarah Khan',size:'sm'})}${Avatar({name:'Alex Morgan',size:'sm',tone:'info'})}${Avatar({name:'Jamie Kim',size:'sm',tone:'success'})}<span>+3</span></div><span class="s-small s-muted">Active in workspace</span></div></div></div>`,

  Card:()=>U.Card({title:'A place for your ideas',description:'Bring your team and your next big thing together.',children:html`${Progress({value:72,label:'Workspace setup'})}<div class="s-row card-people">${Avatar({name:'Sarah Khan',size:'sm'})}${Avatar({name:'Alex Morgan',size:'sm',tone:'info'})}<span class="s-small s-muted">Made for working together</span></div>`,footer:Button({label:'Explore workspace',variant:'outline',trailing:'arrow',size:'sm',attrs:{'data-go':'#patterns'}})}),

  Alert:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Feedback Tones</span><div class="s-stack">${U.Alert({title:'All systems operational',description:'Your workspace is synced and ready.'})}${U.Alert({title:'A little heads-up',description:'This is a sample notice for your workspace.',tone:'warning'})}${U.Alert({title:'Security update applied',description:'Two-factor authentication is enabled.',tone:'info'})}</div></div></div>`,

  Tabs:id=>U.Tabs({id,label:'Workspace preview',items:[{label:'Overview',content:html`<div class="tab-example">${Icon({name:'layers',size:24})}<div><strong>Everything, in its place.</strong><p>Your workspace brings clarity to the everyday.</p></div></div>`},{label:'Activity',content:html`<div class="tab-example">${Icon({name:'clock',size:24})}<div><strong>You’re all caught up.</strong><p>Updates appear here as your team works.</p></div></div>`},{label:'Settings',content:Switch({id:id+'-settings',label:'Workspace notifications',checked:true})}]}),

  Breadcrumb:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Hierarchical Path</span>${U.Breadcrumb({items:[{label:'Workspace',href:'#patterns'},{label:'Projects',href:'#patterns'},{label:'Design system'}]})}</div></div>`,

  Pagination:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Page Navigation</span><div class="s-stack">${U.Pagination({pages:5,current:2,label:'Component pagination demo'})}<p data-page-feedback class="s-small s-muted" aria-live="polite">Page 2 of 5</p></div></div></div>`,

  NavItem:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Navigation Links & Badges</span><nav aria-label="Example navigation" class="demo-nav">${U.NavItem({active:true})}${U.NavItem({label:'Foundations',href:'#foundations',icon:'palette'})}${U.NavItem({label:'Components',href:'#components',icon:'layers',badge:'32'})}</nav></div></div>`,

  DataTable:id=>U.DataTable({id,caption:'Example projects',columns:[{key:'name',label:'Project',sortable:true},{key:'status',label:'Status'},{key:'progress',label:'Progress (%)',sortable:true}],rows:[{name:'Studio website',status:Badge({label:'In review',tone:'warning'}),progress:92},{name:'Brand refresh',status:Badge({label:'Active'}),progress:72},{name:'Mobile experience',status:Badge({label:'Planning',tone:'info'}),progress:48}],selectable:true}),

  Accordion:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Collapsible Details</span>${U.Accordion({items:[{title:'Can I make this my own?',content:'Adjust the source tokens, rebuild, and every component follows your direction.',open:true},{title:'Does it support dark mode?',content:'Every semantic color has an explicit light and dark alias.'},{title:'Do I need a framework?',content:'No. The core uses native HTML, CSS variables, and ES modules.'}]})}</div></div>`,

  Dialog:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Modal Surface</span><div class="s-stack">${Button({label:'Create a project',icon:'plus',attrs:{'data-s-dialog-open':'create-project'}})}<p class="s-small s-muted">Your sample project appears in the Patterns workspace with focus containment.</p></div></div></div>`,

  Tooltip:id=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Hover & Focus Context</span><div class="s-row"><span class="s-small">A little help, close at hand</span>${U.Tooltip({id,label:'About tokens',text:'One change. A consistent system.'})}</div></div></div>`,

  Progress:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Determinate Values</span><div class="s-stack">${Progress({value:72,label:'Design system progress'})}${Progress({value:100,label:'Foundations complete'})}${Progress({value:38,label:'Documentation audit'})}</div></div></div>`,

  Skeleton:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Calm Loading Pulse</span>${U.Skeleton({lines:4,label:'Loading project details'})}</div></div>`,

  EmptyState:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Zero Data Experience</span>${U.EmptyState({title:'Your next idea starts here',description:'A blank canvas. A world of possibilities.',action:Button({label:'Create project',size:'sm',icon:'plus',attrs:{'data-s-dialog-open':'create-project'}})})}</div></div>`,

  Separator:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Visual Boundaries</span><div class="s-stack"><p class="s-small s-muted">Content block A</p>${U.Separator()}<p class="s-small s-muted">Content block B</p>${U.Separator({label:'Or continue with'})}<p class="s-small s-muted">Alternative options</p></div></div></div>`,

  Spinner:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Activity Indicator</span><div class="s-row" style="gap:12px;align-items:center;">${U.Spinner({label:'Syncing workspace'})}<span class="s-small s-muted">Syncing your workspace…</span></div></div></div>`,

  Toast:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Interactive Dispatch</span><div class="demo-wrap">${Button({label:'Show success',icon:'check',variant:'outline',attrs:act('Your changes are ready.')})}${Button({label:'Show notice',variant:'ghost',attrs:{'data-feedback':'This preview runs locally in your browser.','data-tone':'info'}})}</div></div></div>`,

  Menu:id=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Contextual Menu</span>${U.Menu({id,label:'Project actions',items:[{label:'View workspace',icon:'folder',value:'view'},{label:'Copy page link',icon:'link',value:'copy'},{label:'Export unavailable',icon:'download',value:'export',disabled:true},{label:'Archive preview',icon:'trash',value:'archive',danger:true}]})}</div></div>`,

  CommandPalette:()=>html`<div class="demo-variants-stack"><div class="demo-variant-row"><span class="demo-variant-label">Keyboard Quick Action</span><div class="s-row" style="gap:12px;align-items:center;">${Button({label:'Search the library',icon:'search',variant:'outline',attrs:{'data-s-dialog-open':'library-search'}})}<span class="demo-shortcut"><kbd>⌘</kbd> <kbd>K</kbd></span></div></div></div>`
};

const info={
  Icon:['Display','A consistent stroke system. Decorative by default; name meaningful icons.'],
  Button:['Actions','Five visual priorities, three sizes, and thoughtful loading states.'],
  IconButton:['Actions','Compact actions, accessible names, and generous targets.'],
  ButtonGroup:['Actions','Related actions grouped with individual focus and labels.'],
  Input:['Forms','Visible labels, helpful context, and explicit error messages.'],
  Textarea:['Forms','A little more room for detail. Resizable and ready for native forms.'],
  Select:['Forms','Native keyboard, touch, and platform accessibility behavior.'],
  Checkbox:['Forms','Independent choices with full labels and mixed selection support.'],
  Radio:['Forms','One choice from a related group, with native arrow key navigation.'],
  Switch:['Forms','An immediate on or off control, with native checkbox behavior.'],
  Slider:['Forms','Numeric input with a visible output and keyboard control.'],
  Badge:['Display','Status communicated through text and color together.'],
  Chip:['Display','Selected filters, categories, and removable choices.'],
  Avatar:['Display','Privacy-friendly initials, sizes, and optional presence.'],
  Card:['Display','A quiet container with intentional spacing and hierarchy.'],
  Alert:['Feedback','Contextual feedback with a title, detail, and supporting icon.'],
  Tabs:['Navigation','Linked panels with arrow keys, Home, End, and roving focus.'],
  Breadcrumb:['Navigation','A clear path back, with an explicitly announced current page.'],
  Pagination:['Navigation','Previous, next, and current page. Connect events to your data.'],
  NavItem:['Navigation','Consistent navigation, optional counts, and active states.'],
  DataTable:['Display','Semantic tables with numeric sorting and mixed row selection.'],
  Accordion:['Navigation','Progressive disclosure using native details and summary.'],
  Dialog:['Feedback','Native modal focus containment, Escape, and focus restoration.'],
  Tooltip:['Feedback','Supplementary context on hover or focus. Dismiss with Escape.'],
  Progress:['Feedback','Native determinate progress with a visible label and value.'],
  Skeleton:['Feedback','Calm loading placeholders that respect reduced motion.'],
  EmptyState:['Feedback','A helpful explanation and a useful next step.'],
  Separator:['Display','A subtle pause between groups, optionally labeled.'],
  Spinner:['Feedback','Named loading indicators and a decorative button option.'],
  Toast:['Feedback','Polite announcements; the timer pauses on hover or focus.'],
  Menu:['Navigation','Contextual actions, arrow keys, Escape, and outside dismissal.'],
  CommandPalette:['Navigation','Search, filter, and navigate without leaving the keyboard.']
};

export const catalog=Object.entries(demos).map(([name,demo])=>({name,demo,group:info[name][0],description:info[name][1]}));
export const categories=['All components','Actions','Forms','Display','Navigation','Feedback'];
