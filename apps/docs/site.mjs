import fs from 'node:fs';
import * as U from '../../packages/ui/src/templates.js';
import {catalog,categories,demos,componentVariants,componentBadges} from './catalog.mjs';
import {startPage,installCommand} from './start.mjs';
import {properties,recipe,usageNote,getComponentTsx,getComponentUsage,extraAfterUsage,extraAfterProps} from './recipes.mjs';
import {highlightCode} from './highlighter.mjs';
const {html,render,raw,Icon,Logo,Button,Input,Select,Textarea,Switch,Badge,Avatar,Progress,Dialog,CommandPalette,IconButton,formatComponentName}=U;
const spec=JSON.parse(fs.readFileSync(new URL('../../tokens/sarah.tokens.json',import.meta.url),'utf8'));
const navItems=[{label:'Overview',href:'#overview',icon:'grid'},{label:'Foundations',href:'#foundations',icon:'palette',badge:'277'},{label:'Components',href:'#components',icon:'layers',badge:String(catalog.length)},{label:'Patterns',href:'#patterns',icon:'folder'},{label:'Get started',href:'#start',icon:'code'}];
const nav=()=>html`<nav class="docs-nav" aria-label="Documentation">${navItems.map(U.NavItem)}</nav>`;
const componentNav=()=>html`<div class="sidebar-components-nav">
  <div class="sidebar-components-heading"><span>COMPONENTS</span><span class="sidebar-counter">${catalog.length}</span></div>
  ${categories.slice(1).map(cat=>html`<div class="sidebar-cat-group"><span class="sidebar-cat-title">${cat}</span><ul class="sidebar-cat-list">${catalog.filter(c=>c.group===cat).map(c=>{
    const b=componentBadges[c.name];
    return html`<li><a href="#components/${c.name}" class="sidebar-comp-link" data-component-nav="${c.name}"><span>${formatComponentName(c.name)}</span>${b?html`<span class="sidebar-badge sidebar-badge--${b.toLowerCase()}">${b}</span>`:''}</a></li>`;
  })}</ul></div>`)}
</div>`;
const link=(label,href,variant='primary',icon='arrow')=>html`<a class="s-button s-button--${variant} s-button--md" href="${href}"><span>${label}</span>${icon?Icon({name:icon,size:18}):''}</a>`;
const eyebrow=text=>html`<p class="eyebrow">${text}</p>`;
const heading=(label,title,description)=>html`<header class="page-heading">${eyebrow(label)}<h1 tabindex="-1">${title}</h1><p>${description}</p></header>`;
const code=(id,text,label='JavaScript')=>html`<div class="code-block"><div class="code-block-header"><span>${label}</span>${Button({label:'Copy',icon:'copy',variant:'ghost',size:'sm',attrs:{'data-copy-id':id}})}</div><pre id="${id}" tabindex="0"><code class="token-code">${raw(highlightCode(text,label))}</code></pre></div>`;
function overview(){
  return html`<section data-view="overview" aria-label="Overview">
    <div class="release-banner"><span class="pill-sparkle">✨</span><span>Introducing sarahUI · ${catalog.length} Components & Magical Effects</span><a href="#components">Browse components ${Icon({name:'arrow',size:14})}</a></div>
    <div class="hero">
      <div class="hero-copy">
        <p class="hero-eyebrow">${Icon({name:'spark',size:15})} UI LIBRARY FOR DESIGN ENGINEERS</p>
        <h1 tabindex="-1">Magical components<br>built for the<br><span class="magic-text-gradient">modern web.</span></h1>
        <p class="hero-description"><strong>${catalog.length} free and production-grade</strong> components, special effects, and animations built with pure CSS and zero runtime dependencies. Complete cross-UI design token interoperability.</p>
        <div class="hero-actions">${link('Explore '+catalog.length+' components','#components','primary','arrow')}${link('Get started','#start','outline','')}</div>
        <div class="hero-trust"><span>${Icon({name:'check',size:14})} 0 Runtime Dependencies</span><span>${Icon({name:'check',size:14})} TypeScript Included</span><span>${Icon({name:'check',size:14})} Standard CSS Variables</span><span>${Icon({name:'check',size:14})} Pure CSS & Web APIs</span></div>
        ${installCommand()}
      </div>
      <div class="hero-stage" aria-label="Interactive component preview">
        <div class="stage-grid" aria-hidden="true"></div><div class="stage-orbit" aria-hidden="true"></div>
        <div class="floating-note"><span class="note-check">${Icon({name:'check',size:17})}</span><div><strong>${catalog.length} Components Ready</strong><span>ShineBorder, Dock, Meteors, BentoGrid & more.</span></div><i></i></div>
        <article class="hero-project"><div class="s-between"><span class="project-icon">${Icon({name:'layers',size:26})}</span>${Badge({label:catalog.length+' components',tone:'brand'})}</div><h2>Build with confidence.</h2><p>Zero dependencies. Drop-in shadcn variable interop.</p><div class="project-divider"></div>${Progress({value:100,label:'Production ready'})}<div class="project-footer"><div class="avatar-stack">${Avatar({name:'Sarah Khan',size:'sm'})}${Avatar({name:'Alex Morgan',size:'sm',tone:'info'})}${Avatar({name:'Jamie Kim',size:'sm',tone:'success'})}<span>+${catalog.length-3}</span></div><small>All ${catalog.length} exported</small></div>${Button({label:'Create something good',icon:'plus',attrs:{'data-s-dialog-open':'create-project'}})}</article>
        <div class="floating-colors"><span>THE SARAH PALETTE</span><div>${['#178BFF','#5B3DF5','#A020FF','#00E5FF'].map(v=>html`<button style="--swatch:${v}" data-copy-value="${v}" aria-label="Copy color ${v}"></button>`)}</div></div>
        <div class="floating-mode">${Switch({id:'hero-theme',label:'Appearance mode',attrs:{'data-theme-switch':true}})}<span>Light & Dark synchronized.</span></div>
        <span class="stage-caption">CRAFTED FOR SPEED AND ELEGANCE.</span>
      </div>
    </div>
    <div class="system-stats">${[['277','tokens','One connected foundation','#foundations'],[String(catalog.length),'components','Considered down to the last detail','#components'],['02','themes','Beautiful in a different light','#foundations/colors'],['00','dependencies','At runtime. Simply yours.','#start']].map(([value,label,desc,href])=>html`<a href="${href}"><strong>${value}<span> / ${label}</span></strong><p>${desc}</p></a>`)}</div>
    <div class="section-title"><div>${eyebrow('THE BUILDING BLOCKS')}<h2>Small pieces. Endless possibilities.</h2><p>Familiar patterns, with a little more care.</p></div><a class="text-link" href="#components">All ${catalog.length} components ${Icon({name:'arrow',size:17})}</a></div>
    <div class="preview-grid">
      <article class="preview-tile"><div class="preview-canvas centered">${Button({label:'Make it happen',trailing:'arrow',attrs:{'data-s-dialog-open':'create-project'}})}<div class="s-row">${Button({label:'Take a look',variant:'outline',size:'sm',attrs:{'data-go':'#components/Button'}})}${IconButton({icon:'heart',label:'Favorite this preview',size:'sm',attrs:{'data-favorite':true,'aria-pressed':'false'}})}</div></div><a href="#components/Button"><div><h3>Actions with intention</h3><p>Buttons & interactions</p></div>${Icon({name:'arrow',size:18})}</a></article>
      <article class="preview-tile"><div class="preview-canvas">${Input({id:'overview-email',label:'A good place to start',type:'email',icon:'mail',attrs:{placeholder:'hello@yourstudio.com'}})}${Switch({id:'overview-updates',label:'Keep the good things coming',checked:true})}</div><a href="#components/Input"><div><h3>Details that feel right</h3><p>Forms & controls</p></div>${Icon({name:'arrow',size:18})}</a></article>
      <article class="preview-tile"><div class="preview-canvas"><div class="demo-wrap">${Badge({label:'All systems go'})}${Badge({label:'In progress',tone:'brand'})}</div><div class="s-row">${Avatar({name:'Sarah Khan',status:true})}${Avatar({name:'Alex Morgan',tone:'info'})}${Avatar({name:'Jamie Kim',tone:'warning'})}</div>${Progress({value:72,label:'A work in progress'})}</div><a href="#components/Badge"><div><h3>Clarity at a glance</h3><p>Status & feedback</p></div>${Icon({name:'arrow',size:18})}</a></article>
    </div>
    <div class="foundation-callout"><span>${Icon({name:'palette',size:38})}</span><div>${eyebrow('CONSISTENT BY NATURE')}<h2>A system, from the ground up.</h2><p>Color, type, space, and motion. Every decision has a place.<br>Change a token. Bring everything along.</p></div>${link('Explore foundations','#foundations','outline')}</div>
    <div class="principle-grid">${[{icon:'shield',title:'Care is in the details',text:'Visible focus, native controls, readable contrast, and reduced motion preferences.'},{icon:'globe',title:'A little more inclusive',text:'Local fonts for English, বাংলা, and العربية. Logical spacing for right-to-left layouts.'},{icon:'code',title:'Yours to build with',text:'Plain HTML, CSS variables, and ES modules. Bring your favorite stack.'}].map(i=>html`<div>${Icon({name:i.icon,size:23})}<h3>${i.title}</h3><p>${i.text}</p></div>`)}</div>
  </section>`;
}
function foundations(){
  return html`<section data-view="foundations" hidden aria-label="Foundations">
    ${heading('01 / THE FOUNDATION','Good design starts here.','A shared language for every surface, every state, and every little detail.')}
    <nav class="local-nav" aria-label="Foundation sections">${['Colors','Typography','Spacing','Shape','Motion'].map(n=>html`<a href="#foundations/${n.toLowerCase()}">${n}</a>`)}</nav>
    <article class="doc-section" id="foundation-colors"><div class="section-title"><div><h2>Color, with a purpose.</h2><p>85 primitives. 48 semantic roles per theme. One consistent visual language.</p></div><button type="button" class="install-command" data-copy-value="npm i sarahui" aria-label="Copy npm install sarahui"><span aria-hidden="true">$</span><code>npm i sarahui</code>${Icon({name:'copy',size:15})}</button></div>
      <div class="brand-spectrum"><div><span>THE SARAH SIGNATURE</span><h3>Optimism. Clarity.<br>A little imagination.</h3><p>Blue / Indigo / Violet</p></div><div class="spectrum-values"><span>#178BFF</span><span>#5B3DF5</span><span>#A020FF</span></div></div>
      <div class="palette-list">${['neutral','blue','indigo','violet','emerald','amber','red','alpha'].map(name=>html`<div class="palette-row"><h3>${name[0].toUpperCase()+name.slice(1)}</h3><div class="color-scale" tabindex="0" role="region" aria-label="${name} palette">${Object.entries(spec.primitives).filter(([k])=>k.startsWith(name+'/')).map(([key,value])=>html`<button class="color-swatch" data-copy-value="${value}" aria-label="Copy ${key}: ${value}"><span style="--swatch:${value}"></span><strong>${key.split('/')[1]}</strong><code>${value}</code></button>`)}</div></div>`)}</div>
      <div class="subsection-heading"><h3>Use roles, keep the meaning.</h3><p>Components consume semantic aliases. Change a theme without rewriting a component.</p></div>
      <div class="semantic-table-wrap" tabindex="0" role="region" aria-label="Semantic color mappings"><table class="semantic-table"><caption class="s-sr-only">Light and dark semantic color mappings</caption><thead><tr><th scope="col">Semantic role</th><th scope="col">Light</th><th scope="col">Dark</th><th scope="col"><span class="s-sr-only">Copy</span></th></tr></thead><tbody>${Object.keys(spec.colors.light).map(role=>html`<tr><th scope="row"><code>${'--s-'+role.replaceAll('/','-')}</code></th>${['light','dark'].map(theme=>{const v=spec.primitives[spec.colors[theme][role]];return html`<td><i style="--swatch:${v}"></i><code>${v}</code></td>`;})}<td>${IconButton({icon:'copy',label:'Copy '+role+' variable',variant:'ghost',size:'sm',attrs:{'data-copy-value':'var(--s-'+role.replaceAll('/','-')+')'}})}</td></tr>`)}</tbody></table></div>
    </article>
    <article class="doc-section" id="foundation-typography"><div class="section-title"><div><h2>A voice with a point of view.</h2><p>Poppins for expression. Inter for clarity. Roboto Mono for precision.</p></div>${Badge({label:'15 text styles',tone:'neutral',dot:false})}</div>
      <div class="type-hero"><div><span>DISPLAY / POPPINS</span><p>Aa<span>.</span></p><small>Confident. Considered. A little character.</small></div><div><span>INTERFACE / INTER</span><p>Aa<span>.</span></p><small>Clarity in every character.</small></div></div>
      <div class="type-list">${spec.textStyles.filter(t=>!t.name.startsWith('Locale')).map(t=>html`<div class="type-row"><div><code>${t.name}</code><span>${t.size} / ${t.lineHeight} · ${t.weight}</span></div><p class="s-type-${t.name.toLowerCase().replaceAll('/','-')}">${t.family==='mono'?'const possibilities = endless;':t.size>=40?'Make good things.':'A little thought goes a long way.'}</p></div>`)}</div>
      <div class="locale-grid"><article lang="bn"><span class="eyebrow">বাংলা / NOTO SANS BENGALI</span><h3>সুন্দর কিছু তৈরি হোক।</h3><p>প্রতিটি ছোট বিবরণে থাকুক যত্ন ও নিজস্বতা।</p></article><article lang="ar" dir="rtl"><span class="eyebrow">العربية / NOTO SANS ARABIC</span><h3>لنصنع شيئًا جميلًا.</h3><p>كل تفصيل صغير يصنع تجربة أفضل.</p></article></div>
    </article>
    <article class="doc-section" id="foundation-spacing"><div class="section-title"><div><h2>Room to breathe.</h2><p>An 8-based rhythm, with 2 and 4 for the smaller details.</p></div></div><div class="spacing-board">${Object.entries(spec.layout).filter(([k])=>k.startsWith('spacing/')).map(([key,t])=>html`<button class="spacing-row" data-copy-value="${'var(--s-'+key.replace('/','-')+')'}"><code>${key}</code><span class="spacing-track"><i style="width:${t.value}px"></i></span><strong>${t.value}px</strong>${Icon({name:'copy',size:15})}</button>`)}</div><div class="layout-notes">${[['12 columns','Responsive content grid'],['24px gutters','Space between ideas'],['1200px maximum','A comfortable canvas'],['40 / 48 / 56px','Small, medium, large controls']].map(([a,b])=>html`<div><strong>${a}</strong><span>${b}</span></div>`)}</div></article>
    <article class="doc-section" id="foundation-shape"><div class="section-title"><div><h2>Soft edges. Clear structure.</h2><p>A considered radius scale and three levels of elevation.</p></div></div><div class="radius-grid">${Object.entries(spec.layout).filter(([key])=>key.startsWith('radius/')).map(([key,t])=>html`<button data-copy-value="${'var(--s-'+key.replace('/','-')+')'}"><span style="border-radius:${t.value}px"></span><strong>${key.split('/')[1]}</strong><code>${t.value}px</code></button>`)}</div><div class="elevation-grid">${spec.effects.map(e=>html`<button style="box-shadow:var(--s-shadow-${e.name.toLowerCase()})" data-copy-value="${'var(--s-shadow-'+e.name.toLowerCase()+')'}">${Icon({name:'layers',size:25})}<strong>${e.name}</strong><span>${e.y}px offset · ${e.blur}px blur</span></button>`)}</div></article>
    <article class="doc-section" id="foundation-motion"><div class="section-title"><div><h2>Motion with meaning.</h2><p>Quick feedback, gentle transitions, and respect for reduced motion.</p></div></div><div class="motion-board"><div class="motion-track"><span></span></div><div><h3>A change you can feel.</h3><p>180ms · cubic-bezier(.2, .8, .2, 1)</p>${Button({label:'Replay transition',icon:'arrow',variant:'outline',attrs:{'data-motion-replay':true}})}</div></div><div class="layout-notes">${[['120ms','Immediate feedback'],['180ms','State transitions'],['280ms','Surface entrances'],['0ms','With reduced motion']].map(([a,b])=>html`<div><strong>${a}</strong><span>${b}</span></div>`)}</div>
      ${U.Alert({title:'Care for the person using it.',description:'The foundation checks body and status contrast at 4.5:1 and focus at 3:1. Native controls, visible focus, reduced motion, and forced colors support accessible composition. Test your own product’s content and assistive technology experience too.',tone:'info'})}
    </article>
  </section>`;
}
function components(){
  return html`<section data-view="components" hidden aria-label="Components">
    <div class="component-catalog-header">
      ${heading('02 / THE COMPONENTS','Made to work together.',String(catalog.length)+' considered building blocks. Real interactions, meaningful states, and a shared foundation.')}
      <div class="component-tools">${Input({id:'component-search',label:'Find a component',type:'search',icon:'search',attrs:{placeholder:'Search buttons, motion, forms, navigation…','data-component-search':true}})}<span id="component-count" aria-live="polite">${catalog.length} components</span></div>
      <div class="filter-chips" role="group" aria-label="Component category">${categories.map((c,i)=>html`<button type="button" data-component-group="${c}" aria-pressed="${i===0}">${c}</button>`)}</div>
    </div>
    <div class="component-layout-row">
      <div class="component-grid">${catalog.map((item,i)=>{
        const demo=item.demo('demo-'+item.name.toLowerCase());
        const variants=componentVariants[item.name]||[{title:'Default State',description:item.description,preview:()=>demo,code:recipe(item.name)}];
        const prevItem=catalog[i===0?catalog.length-1:i-1];
        const nextItem=catalog[i===catalog.length-1?0:i+1];
        const kebabName=item.name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        const npmCmd=`npx sarahui add ${kebabName}`;
        const pnpmCmd=`pnpm dlx sarahui add ${kebabName}`;
        const yarnCmd=`npx sarahui add ${kebabName}`;
        const bunCmd=`bunx --bun sarahui add ${kebabName}`;
        return html`<article class="component-card ${item.name==='DataTable'||item.name==='BentoGrid'?'wide':''}" id="component-${item.name.toLowerCase()}" data-component-name="${item.name}" data-component-category="${item.group}" data-component-description="${item.description}">
          <div class="component-detail-breadcrumbs-bar">
            <nav class="detail-breadcrumbs" aria-label="Breadcrumb">
              <a href="#components" class="detail-back-link">Docs</a>
              <span class="breadcrumb-slash">/</span>
              <span class="detail-cat-link">${item.group}</span>
              <span class="breadcrumb-slash">/</span>
              <span class="detail-current-name">${formatComponentName(item.name)}</span>
            </nav>
            <div class="detail-header-nav-actions">
              <a href="#components/${prevItem.name}" class="nav-arrow-btn" aria-label="Previous component" title="Previous: ${formatComponentName(prevItem.name)}">${Icon({name:'chevron',size:13,style:'transform:rotate(180deg);'})}</a>
              <a href="#components/${nextItem.name}" class="nav-arrow-btn" aria-label="Next component" title="Next: ${formatComponentName(nextItem.name)}">${Icon({name:'chevron',size:13})}</a>
              <button type="button" class="copy-page-btn" data-copy-page="true">${Icon({name:'copy',size:13})} <span>Copy page</span></button>
            </div>
          </div>
          <header id="sec-${item.name.toLowerCase()}-overview" class="component-card-top">
            <div class="component-card-top-left">
              <div class="component-title-row">
                <h2>${formatComponentName(item.name)}</h2>
                ${componentBadges[item.name]?html`<span class="component-header-badge badge-${componentBadges[item.name].toLowerCase()}">${componentBadges[item.name]}</span>`:''}
              </div>
              <p class="component-lead">${item.description}</p>
            </div>
          </header>
          <div class="component-preview-box" id="sec-${item.name.toLowerCase()}-preview">
            <div class="component-preview-header">
              <div class="preview-tabs">
                <button type="button" class="preview-tab active" data-preview-tab="preview">${Icon({name:'spark',size:13})} <span>Preview</span></button>
                <button type="button" class="preview-tab" data-preview-tab="code">${Icon({name:'code',size:13})} <span>Code</span></button>
              </div>
              <div class="preview-header-actions">
                <button type="button" class="preview-tool-btn preview-open-code-btn" data-preview-open-code title="View source code">${Icon({name:'code',size:13})} <span>Open in Code</span></button>
                <button type="button" class="preview-tool-btn" data-replay-component="${item.name}" title="Restart animation">${Icon({name:'refresh',size:14})}</button>
                <button type="button" class="preview-tool-btn" data-copy-snippet="${encodeURIComponent(getComponentTsx(item.name))}" title="Copy code">${Icon({name:'copy',size:14})} <span>Copy</span></button>
              </div>
            </div>
            <div class="component-demo tab-panel-preview" id="preview-canvas-${item.name.toLowerCase()}">
              ${demo}
            </div>
            <div class="component-code-panel tab-panel-code" hidden>
              <div class="code-preview-inner">
                <div class="code-preview-bar">
                  <span>${item.name}.tsx</span>
                  <button type="button" class="variant-snippet-copy" data-copy-snippet="${encodeURIComponent(getComponentTsx(item.name))}" aria-label="Copy code">
                    ${Icon({name:'copy',size:13})} <span>Copy code</span>
                  </button>
                </div>
                <pre tabindex="0"><code class="token-code">${raw(highlightCode(getComponentTsx(item.name),'typescript',{showLineNumbers:true}))}</code></pre>
              </div>
            </div>
          </div>
          <div class="component-detail-sections">
            <section class="detail-section" id="sec-${item.name.toLowerCase()}-installation">
              <div class="detail-section-title">
                <div>
                  <h3>Installation</h3>
                  <p>Add <code>${item.name}</code> to your project.</p>
                </div>
              </div>
              <div class="install-terminal-box">
                <div class="install-terminal-header">
                  <div class="install-terminal-tabs">
                    <button type="button" class="install-term-tab active" data-term-cmd="${npmCmd}">npm</button>
                    <button type="button" class="install-term-tab" data-term-cmd="${pnpmCmd}">pnpm</button>
                    <button type="button" class="install-term-tab" data-term-cmd="${yarnCmd}">yarn</button>
                    <button type="button" class="install-term-tab" data-term-cmd="${bunCmd}">bun</button>
                  </div>
                  <button type="button" class="install-term-copy-btn" data-copy-value="${npmCmd}" aria-label="Copy command">
                    ${Icon({name:'copy',size:13})} <span>Copy</span>
                  </button>
                </div>
                <div class="install-terminal-body">
                  <code><span class="term-prompt">$</span> <span class="term-command-text">${npmCmd}</span></code>
                </div>
              </div>
            </section>

            <section class="detail-section" id="sec-${item.name.toLowerCase()}-usage">
              <div class="detail-section-title">
                <div>
                  <h3>Usage</h3>
                </div>
              </div>
              <div class="usage-code-blocks" style="display:flex;flex-direction:column;gap:16px;">
                <div class="usage-code-box">
                  <div class="code-preview-bar">
                    <span style="opacity:0.6;">import</span>
                    <button type="button" class="variant-snippet-copy" data-copy-snippet="${encodeURIComponent(getComponentUsage(item.name).import)}" aria-label="Copy import statement">
                      ${Icon({name:'copy',size:13})} <span>Copy</span>
                    </button>
                  </div>
                  <pre tabindex="0"><code class="token-code">${raw(highlightCode(getComponentUsage(item.name).import, 'typescript', {showLineNumbers:true}))}</code></pre>
                </div>
                <div class="usage-code-box">
                  <div class="code-preview-bar">
                    <span style="opacity:0.6;">usage.tsx</span>
                    <button type="button" class="variant-snippet-copy" data-copy-snippet="${encodeURIComponent(getComponentUsage(item.name).usage)}" aria-label="Copy usage snippet">
                      ${Icon({name:'copy',size:13})} <span>Copy</span>
                    </button>
                  </div>
                  <pre tabindex="0"><code class="token-code">${raw(highlightCode(getComponentUsage(item.name).usage, 'typescript', {showLineNumbers:true}))}</code></pre>
                </div>
              </div>
            </section>

            ${extraAfterUsage ? extraAfterUsage(item.name, highlightCode) : ''}

            <section class="detail-section" id="sec-${item.name.toLowerCase()}-examples" aria-label="${item.name} examples">
              <div class="detail-section-title">
                <div>
                  <h3>Examples</h3>
                </div>
              </div>
              <div class="examples-list">
                ${variants.map((v,vi)=>html`
                  <div class="example-item" id="specimen-${item.name.toLowerCase()}-${vi}">
                    <div class="example-item-header">
                      <h4 class="example-title">${v.title}</h4>
                    </div>
                    <div class="component-preview-box">
                      <div class="component-preview-header">
                        <div class="preview-tabs">
                          <button type="button" class="preview-tab active" data-preview-tab="preview">${Icon({name:'spark',size:13})} <span>Preview</span></button>
                          <button type="button" class="preview-tab" data-preview-tab="code">${Icon({name:'code',size:13})} <span>Code</span></button>
                        </div>
                        <div class="preview-header-actions">
                          <button type="button" class="preview-tool-btn" data-replay-component="${item.name}" title="Restart animation">${Icon({name:'refresh',size:14})}</button>
                          <button type="button" class="preview-tool-btn" data-copy-snippet="${encodeURIComponent(v.code)}" title="Copy code">${Icon({name:'copy',size:14})} <span>Copy</span></button>
                        </div>
                      </div>
                      <div class="component-demo tab-panel-preview">
                        ${v.preview ? v.preview() : ''}
                      </div>
                      <div class="component-code-panel tab-panel-code" hidden>
                        <div class="code-preview-inner">
                          <div class="code-preview-bar">
                            <span>${item.name}.tsx</span>
                            <button type="button" class="variant-snippet-copy" data-copy-snippet="${encodeURIComponent(v.code)}" aria-label="Copy code">
                              ${Icon({name:'copy',size:13})} <span>Copy code</span>
                            </button>
                          </div>
                          <pre tabindex="0"><code class="token-code">${raw(highlightCode(v.code, 'typescript', {showLineNumbers:true}))}</code></pre>
                        </div>
                      </div>
                    </div>
                  </div>
                `)}
              </div>
            </section>

            <section class="detail-section" id="sec-${item.name.toLowerCase()}-props">
              <div class="detail-section-title">
                <div>
                  <h3>Props</h3>
                  <p>Configuration parameters and properties for <code>${item.name}</code>.</p>
                </div>
              </div>
              ${properties(item.name)}
              ${usageNote(item.name)?html`<p class="component-usage-note" style="margin-top:16px;">${usageNote(item.name)}</p>`:''}
            </section>

            ${extraAfterProps ? extraAfterProps(item.name, highlightCode) : ''}
          </div>
          <nav class="detail-nav-footer" aria-label="Component page navigation">
            <a href="#components/${prevItem.name}" class="detail-nav-footer-btn" aria-label="Previous component: ${formatComponentName(prevItem.name)}">
              ${Icon({name:'arrow',size:13,style:'transform:rotate(180deg);'})}
              <div class="detail-nav-footer-copy">
                <small>PREVIOUS COMPONENT</small>
                <strong>${formatComponentName(prevItem.name)}</strong>
              </div>
            </a>
            <a href="#components" class="detail-nav-footer-center" aria-label="Back to component directory">
              ${Icon({name:'grid',size:14})} <span>All ${catalog.length} components</span>
            </a>
            <a href="#components/${nextItem.name}" class="detail-nav-footer-btn next" aria-label="Next component: ${formatComponentName(nextItem.name)}">
              <div class="detail-nav-footer-copy">
                <small>NEXT COMPONENT</small>
                <strong>${formatComponentName(nextItem.name)}</strong>
              </div>
              ${Icon({name:'arrow',size:13})}
            </a>
          </nav>
          <footer class="catalog-card-footer">
            <div class="card-footer-tags">
              <span>${Icon({name:'check',size:14})} Light & dark</span>
              <span class="card-tag-pill">Accessible</span>
              <a href="#components/${item.name}" class="explore-variants-link">Explore all ${variants.length} variants →</a>
            </div>
            <button type="button" data-code-toggle aria-expanded="false" aria-controls="source-${item.name}">${Icon({name:'code',size:16})} View code</button>
          </footer>
          <div id="source-${item.name}" class="component-source" hidden>
            <h3>Use with npm</h3>
            <p>Add <code>&lt;div id="app"&gt;&lt;/div&gt;</code> to your HTML, then use this JavaScript entry.</p>
            ${code('npm-'+item.name,recipe(item.name),'JavaScript / npm')}
            <h3>Properties</h3>
            <p class="component-properties-note">Complete parameters detailed in <a href="#sec-${item.name.toLowerCase()}-props">Props</a>.</p>
            ${usageNote(item.name)?html`<p class="component-usage">${usageNote(item.name)}</p>`:''}
            <details class="markup-details">
              <summary>View rendered HTML</summary>
              ${code('html-'+item.name,render(demo),'HTML')}
            </details>
            <p><a href="#start">Installation and framework guide →</a></p>
          </div>
        </article>`;
      })}</div>
      <aside class="docs-toc" id="detail-toc" aria-label="Table of contents" hidden>
        <div class="docs-toc-sticky">
          <p class="docs-toc-title">ON THIS PAGE</p>
          <nav class="docs-toc-nav" id="toc-nav-list">
            <a href="#overview" class="docs-toc-link active" data-toc="overview">Overview</a>
            <a href="#preview" class="docs-toc-link" data-toc="preview">Interactive Preview</a>
            <a href="#installation" class="docs-toc-link" data-toc="installation">Installation</a>
            <a href="#usage" class="docs-toc-link" data-toc="usage">Usage</a>
            <a href="#examples" class="docs-toc-link" data-toc="examples">Examples</a>
            <div class="docs-toc-sublinks" id="toc-examples-sublinks"></div>
            <a href="#props" class="docs-toc-link" data-toc="props">Props</a>
          </nav>
          <div class="docs-toc-divider"></div>
          <div class="docs-toc-community">
            <span class="docs-toc-subtitle">CONTRIBUTE</span>
            <a href="https://github.com/masarax/sarahui/issues/new" target="_blank" rel="noreferrer" class="docs-toc-action-link">${Icon({name:'alert',size:13})} <span>Report an issue</span></a>
            <a href="https://github.com/masarax/sarahui/discussions/new" target="_blank" rel="noreferrer" class="docs-toc-action-link">${Icon({name:'spark',size:13})} <span>Request a feature</span></a>
            <a href="https://github.com/masarax/sarahui" target="_blank" rel="noreferrer" class="docs-toc-action-link">${Icon({name:'code',size:13})} <span>Edit this page</span></a>
          </div>
          <div class="docs-toc-divider"></div>
          <div class="community-promo-card">
            <div class="community-promo-sparkle">★</div>
            <strong>100% Free & Open Source</strong>
            <p>120+ free animated components, special effects, and landing page blocks. Star on GitHub!</p>
            <a href="https://github.com/masarax/sarahui" target="_blank" rel="noreferrer" class="community-promo-btn">Star on GitHub →</a>
          </div>
        </div>
      </aside>
    </div>
    <div id="component-empty" class="no-results" hidden>${Icon({name:'search',size:30})}<h2>No components found</h2><p>Try another name or show all categories.</p>${Button({label:'Clear filters',variant:'outline',attrs:{'data-clear-filters':true}})}</div>
  </section>`;
}
function patterns(){
  return html`<section data-view="patterns" hidden aria-label="Patterns">${heading('03 / IN GOOD COMPANY','See the pieces come together.','Thoughtful starting points for real interfaces. Explore a workspace and a settings experience.')}<p class="demo-notice">${Icon({name:'info',size:16})} Interactive examples with sample data. Changes stay in this browser session.</p>
    <div class="workspace-example"><header class="workspace-top"><div class="s-row"><span class="workspace-mark">${Icon({name:'spark',size:22})}</span><div><strong>Sarah’s studio</strong><span>Good things are happening.</span></div></div>${Avatar({name:'Sarah Khan',status:true})}</header><div class="workspace-content"><div class="workspace-title"><div>${eyebrow('YOUR WORKSPACE')}<h2>A little focus. A lot of possibility.</h2><p>Here’s what’s taking shape in your studio.</p></div>${Button({label:'New project',icon:'plus',attrs:{'data-s-dialog-open':'create-project'}})}</div><div class="workspace-metrics">${[['All projects','projects','8','Ideas finding their shape','folder'],['In progress','active','3','One good step at a time','clock'],['Completed','complete','1','Worth a little celebration','check']].map(([title,id,value,text,icon])=>html`<article><span>${title}${Icon({name:icon,size:17})}</span><strong id="metric-${id}">${value}</strong><small>${text}</small></article>`)}</div><section class="projects-panel" aria-labelledby="projects-title"><header><h3 id="projects-title">Your projects</h3><div class="project-filters">${Input({id:'project-search',label:'Search projects',type:'search',icon:'search',attrs:{placeholder:'Search projects…','data-project-search':true}})}${Select({id:'project-status',label:'Project status',options:['All statuses','Planning','In progress','In review','Complete'],attrs:{'data-project-status':true}})}</div></header><div id="projects-table"></div><div class="projects-bottom"><span id="projects-summary" aria-live="polite"></span><div id="projects-pagination"></div></div><div id="selection-bar" class="selection-bar" hidden><span id="selection-count"></span>${Button({label:'Clear selection',variant:'ghost',size:'sm',attrs:{'data-clear-selection':true}})}</div></section></div></div>
    <div class="section-title"><div><h2>Settings, without the friction.</h2><p>A comfortable form that helps people feel in control.</p></div></div>
    <div class="settings-example"><div class="settings-intro">${Icon({name:'settings',size:30})}<h3>Your space.<br>Your preferences.</h3><p>Small choices that make your workspace feel like you.</p>${Badge({label:'Account settings',tone:'brand',dot:false})}</div><form id="settings-form" class="settings-form"><div class="settings-profile">${Avatar({name:'Sarah Khan',size:'lg',status:true})}<div><strong>Sarah Khan</strong><p>Personalize the everyday.</p></div></div><div class="form-grid">${Input({id:'settings-name',label:'Full name',attrs:{name:'fullName',value:'Sarah Khan',required:true,autocomplete:'name'}})}${Input({id:'settings-email',label:'Email address',type:'email',attrs:{name:'email',value:'sarah@example.com',required:true,autocomplete:'email'}})}</div>${Textarea({id:'settings-bio',label:'A little about you',value:'Making thoughtful things for people.',attrs:{name:'bio',rows:2,maxlength:240}})}<div class="form-grid">${Select({id:'settings-language',label:'Preferred language',options:['English','বাংলা','العربية'],attrs:{name:'language'}})}${Select({id:'settings-theme',label:'Appearance',options:[{label:'Follow system',value:'system'},{label:'Light',value:'light'},{label:'Dark',value:'dark'}],attrs:{name:'theme'}})}</div>${U.Separator()}${Switch({id:'settings-notifications',label:'Email notifications',description:'Only the updates you care about.',checked:true,attrs:{name:'notifications'}})}<footer><p id="settings-status" aria-live="polite">Your preferences, your way.</p>${Button({label:'Save preferences',attrs:{type:'submit'}})}</footer></form></div>
  </section>`;
}
function start(){return startPage({heading,code,link});}
export function buildSite(){
  const createForm=html`<form id="create-project-form" class="s-stack">${Input({id:'new-project-name',label:'Project name',helper:'Give your idea a name. You can refine it later.',attrs:{name:'name',placeholder:'Something good',required:true,minlength:2,maxlength:60,'data-s-autofocus':true}})}${Select({id:'new-project-category',label:'Category',options:['Design system','Product','Branding','Development'],attrs:{name:'category'}})}${Textarea({id:'new-project-description',label:'A little context',attrs:{name:'description',placeholder:'What would you like to make?',rows:2,maxlength:300}})}<p class="s-small s-muted">This sample project stays in your current browser session.</p><div class="dialog-actions">${Button({label:'Cancel',variant:'outline',attrs:{'data-s-dialog-close':true}})}${Button({label:'Create project',icon:'plus',attrs:{type:'submit'}})}</div></form>`;
  return '<!doctype html>\n'+render(html`<html lang="en" data-theme="light"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="sarahUI by MASARA X. A thoughtful design system with 277 tokens, 120 components, light and dark themes, and no runtime dependencies."><meta name="theme-color" content="#5B3DF5"><title>sarahUI — Thoughtful by design</title><link rel="icon" href="./assets/sarah-mark.svg" type="image/svg+xml"><link rel="preload" href="./assets/fonts/inter-variable.woff" as="font" type="font/woff" crossorigin><link rel="preload" href="./assets/fonts/poppins-semibold.woff" as="font" type="font/woff" crossorigin><link rel="stylesheet" href="./ui/fonts.css"><link rel="stylesheet" href="./ui/tokens.css"><link rel="stylesheet" href="./ui/styles.css"><link rel="stylesheet" href="./app.css"><script>try{const p=localStorage.getItem('sarah-theme')||'system';document.documentElement.dataset.theme=p==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;}catch{}</script></head><body class="s-ui">
    <div class="subtle-ambient-mesh" aria-hidden="true"></div>
    <a class="skip-link" href="#main-content">Skip to content</a>
    <aside class="top-announcement-banner" aria-label="Announcement">
      <a href="#components" class="announcement-inner">
        <span class="announcement-sparkle">✨</span>
        <span class="announcement-text">Introducing <strong>sarahUI</strong> — 120+ free & open-source animated components & effects for the modern web</span>
        <span class="announcement-arrow">→</span>
      </a>
    </aside>
    <header class="topbar">
      <div class="topbar-inner">
        <div class="topbar-brand-section">
          ${IconButton({icon:'menu',label:'Open navigation',variant:'ghost',size:'sm',attrs:{'data-s-dialog-open':'mobile-navigation',class:'mobile-nav-trigger'}})}
          <a href="#overview" class="brand-home" aria-label="sarahUI home">${Logo()}<span class="version-tag">0.1</span></a>
          <span id="route-name" class="s-sr-only">Overview</span>
          <nav class="topbar-nav" aria-label="Main navigation">
            <a href="#components" class="topbar-link" data-topbar-link="components">Components</a>
            <a href="#foundations" class="topbar-link" data-topbar-link="foundations">Foundations</a>
            <a href="#patterns" class="topbar-link" data-topbar-link="patterns">Patterns</a>
            <a href="#start" class="topbar-link" data-topbar-link="start">Getting started</a>
          </nav>
        </div>
        <div class="topbar-actions">
          <button type="button" class="search-trigger" data-s-dialog-open="library-search">${Icon({name:'search',size:15})}<span>Search documentation…</span><kbd>⌘ K</kbd></button>
          <a class="topbar-gh-star" href="https://github.com/masarax/sarahui" target="_blank" rel="noreferrer" aria-label="GitHub Repository">
            <span class="gh-star-icon">★</span> <span>Star</span> <span class="gh-star-count">22,328</span>
          </a>
          <button type="button" class="theme-button" data-s-theme-toggle aria-label="Switch theme"><span data-theme-icon>${Icon({name:'moon',size:18})}</span></button>
        </div>
      </div>
    </header>
    <div class="docs-container">
      <aside class="sidebar">
        <div class="sidebar-scrollable">
          <div class="sidebar-group">
            <span class="sidebar-cat-title">Getting Started</span>
            <ul class="sidebar-cat-list">
              <li><a href="#overview" class="sidebar-comp-link" data-route-link="overview"><span>Introduction</span></a></li>
              <li><a href="#start" class="sidebar-comp-link" data-route-link="start"><span>Installation</span></a></li>
              <li><a href="#foundations" class="sidebar-comp-link" data-route-link="foundations"><span>Foundations</span></a></li>
              <li><a href="#patterns" class="sidebar-comp-link" data-route-link="patterns"><span>Patterns</span></a></li>
            </ul>
          </div>
          ${componentNav()}
          <div class="sidebar-note">
            <span>MADE WITH INTENTION</span>
            <p>A foundation for<br>your next good thing.</p>
            <a href="#start">Let’s build something ${Icon({name:'arrow',size:15})}</a>
            <div class="note-drawing" aria-hidden="true"><i></i><i></i><i></i></div>
          </div>
          <footer class="sidebar-footer">
            <span class="maker-avatar">M<span>×</span></span>
            <div><strong>By MASARA X</strong><span>Original, down to the details.</span></div>
          </footer>
        </div>
      </aside>
      <div class="app-shell">
        <main id="main-content" class="main-content" tabindex="-1">
          ${overview()}${foundations()}${components()}${patterns()}${start()}
          <footer class="docs-footer">
            <div>${Logo({compact:true})}<span>Thoughtful by design.</span></div>
            <p>sarahUI · An original by <strong>MASARA X</strong></p>
            <a href="#start">Built for what’s next. ${Icon({name:'arrow',size:15})}</a>
          </footer>
        </main>
      </div>
    </div>
    ${Dialog({id:'mobile-navigation',title:'Explore sarahUI',description:'',children:html`<div class="mobile-nav-scroll">${nav()}${componentNav()}</div>`})}
    ${Dialog({id:'create-project',title:'A new beginning.',description:'Give your next idea a place to grow.',children:createForm})}
    ${CommandPalette({id:'library-search',items:[...navItems,...catalog.map(c=>({label:formatComponentName(c.name),href:'#components/'+c.name,icon:c.group==='Forms'?'settings':'layers',keywords:c.name+' '+formatComponentName(c.name)+' '+c.group+' '+c.description}))]})}
    <script type="module" src="./app.js"></script></body></html>`);
}
