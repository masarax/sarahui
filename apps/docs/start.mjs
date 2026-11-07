import fs from 'node:fs';
import {html,Icon,Tabs,Alert,Accordion,Button} from '../../packages/ui/src/templates.js';
export const version=JSON.parse(fs.readFileSync(new URL('../../packages/ui/package.json',import.meta.url),'utf8')).version;

export const setupExamples={
  JavaScript:`import 'sarahui/css';
import { Card, Button, render, enhanceUI, toast } from 'sarahui';

const app = document.querySelector('#app');
app.innerHTML = render(
  Card({
    title: 'Welcome to sarahUI',
    description: '120 free and open-source animated components, effects, and widgets.',
    footer: Button({
      label: 'Get Started',
      tone: 'primary',
      attrs: { id: 'hello-button' }
    })
  })
);

const cleanup = enhanceUI(app);
document.querySelector('#hello-button').addEventListener('click', () => {
  toast('Welcome to sarahUI! 120 components ready.');
});
// Call cleanup() when tearing down the container`,
  React:`import 'sarahui/css';
import { useEffect, useRef } from 'react';
import { enhanceUI } from 'sarahui';

export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      return enhanceUI(containerRef.current);
    }
  }, []);

  return (
    <main className="s-ui min-h-screen flex items-center justify-center">
      <button
        type="button"
        className="s-button s-button--primary s-button--md"
        onClick={() => console.log('Action triggered')}
      >
        <span>Explore Components</span>
      </button>
    </main>
  );
}`,
  Vue:`<script setup>
import 'sarahui/css';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { enhanceUI } from 'sarahui';

const root = ref(null);
const enabled = ref(true);
let cleanup = () => {};

onMounted(() => {
  if (root.value) cleanup = enhanceUI(root.value);
});
onBeforeUnmount(() => cleanup());
</script>

<template>
  <main ref="root" class="s-ui">
    <label class="s-choice">
      <input v-model="enabled" type="checkbox"
        class="s-choice-input s-switch" role="switch">
      <span>Enable ambient motion</span>
    </label>
  </main>
</template>`,
  Laravel:`// resources/js/app.js — imported through your Vite pipeline
import 'sarahui/css';
import { enhanceUI } from 'sarahui';

enhanceUI(document);

// In your Blade layout:
// @vite(['resources/js/app.js'])
//
// <main class="s-ui">
//   <button type="button" class="s-button s-button--primary s-button--md">
//     <span>Deploy Application</span>
//   </button>
// </main>`
};

export function installCommand(){
  return html`<button type="button" class="install-command" data-copy-value="npm install sarahui" aria-label="Copy npm install sarahui"><span class="install-prompt">$</span><code>npm install sarahui</code>${Icon({name:'copy',size:15})}</button>`;
}

export function startPage({heading,code,link}){
  const managers={
    pnpm:'pnpm add sarahui',
    npm:'npm install sarahui',
    yarn:'yarn add sarahui',
    bun:'bun add sarahui'
  };

  const features=[
    {icon:'check',title:'0 Runtime Dependencies',text:'Pure vanilla ES modules, native CSS variables, and standard Web APIs.'},
    {icon:'layers',title:'120+ Components',text:'Special effects, text animations, device mocks, backgrounds, and layout frames.'},
    {icon:'code',title:'Full TypeScript Support',text:'Complete type definitions (.d.ts) bundled with zero compilation warnings.'},
    {icon:'palette',title:'Comprehensive Tokens',text:'319 design tokens benchmarked against Adobe Spectrum Design Data.'}
  ];

  const events=[
    ['sarah:themechange','preference, theme','Triggered when theme changes between light and dark'],
    ['sarah:tabchange','index, id','Triggered when an active tab changes'],
    ['sarah:selectionchange','selected, count','Triggered when a table row is selected or deselected'],
    ['sarah:sortchange','key, direction','Triggered when a table sort control is activated'],
    ['sarah:pagechange','page, pages','Triggered when a pagination item is clicked'],
    ['sarah:chipremove','label','Triggered when a removable chip is dismissed'],
    ['sarah:menuaction','value','Triggered when a menu item is selected'],
    ['sarah:command','href, label','Triggered when a command palette item is activated']
  ];

  return html`<section data-view="start" hidden aria-label="Get started">
    <div class="component-detail-breadcrumbs-bar" style="display:flex">
      <nav class="detail-breadcrumbs" aria-label="Breadcrumb">
        <a href="#overview" class="detail-back-link">Docs</a>
        <span class="breadcrumb-slash">/</span>
        <span class="detail-current-name">Installation</span>
      </nav>
      <div class="detail-header-nav-actions">
        <button type="button" class="copy-page-btn" data-copy-page="true">${Icon({name:'copy',size:13})} <span>Copy page</span></button>
      </div>
    </div>
    <header class="page-heading" style="padding-top:8px">
      <h1 tabindex="-1">Installation</h1>
      <p>How to install dependencies, configure your application, and start building with 120 free components.</p>
    </header>

    <div class="installation-note-callout">
      <strong>Note:</strong> sarahUI has zero external runtime dependencies. Compatible with all modern bundlers, React, Vue, Vite, and vanilla ES modules.
    </div>

    <div class="getting-started-features-grid">
      ${features.map(f=>html`
        <div class="getting-started-feature-card">
          <div class="feature-icon-wrapper">${Icon({name:f.icon,size:18})}</div>
          <div>
            <h3>${f.title}</h3>
            <p>${f.text}</p>
          </div>
        </div>
      `)}
    </div>

    <div class="docs-steps">
      <div class="docs-step-item" id="step-install">
        <div class="docs-step-badge">1</div>
        <div class="docs-step-content">
          <h2>Install the package</h2>
          <p>Add individual components via CLI (<code>npx sarahui add &lt;component&gt;</code>) or install the complete <code>sarahui</code> package using your preferred package manager. No external peer dependencies are required.</p>
          <div class="setup-install-terminal">
            ${Tabs({id:'package-manager',label:'Package manager',variant:'pill',items:Object.entries(managers).map(([label,value])=>({label,content:code('install-'+label.toLowerCase(),value,'Terminal')}))})}
          </div>
        </div>
      </div>

      <div class="docs-step-item" id="step-styles">
        <div class="docs-step-badge">2</div>
        <div class="docs-step-content">
          <h2>Import the stylesheet</h2>
          <p>Import <code>sarahui/css</code> once at the root of your application. This includes all design tokens, animation keyframes, and bundled local fonts.</p>
          ${code('setup-css-import',"import 'sarahui/css';",'JavaScript')}
        </div>
      </div>

      <div class="docs-step-item" id="step-usage">
        <div class="docs-step-badge">3</div>
        <div class="docs-step-content">
          <h2>Render your first component</h2>
          <p>Import components and call <code>render()</code> to generate safe, escaped HTML markup. Call <code>enhanceUI(root)</code> to attach interactive behaviors.</p>
          ${code('setup-first-component',setupExamples.JavaScript,'src/main.js')}
        </div>
      </div>

      <div class="docs-step-item" id="step-frameworks">
        <div class="docs-step-badge">4</div>
        <div class="docs-step-content">
          <h2>Framework integrations</h2>
          <p>sarahUI works seamlessly across modern front-end frameworks and full-stack setups. Select your stack below:</p>
          ${Tabs({
            id:'integration-stack',
            label:'Framework integration',
            variant:'pill',
            items:Object.entries(setupExamples).map(([label,example])=>({
              label,
              content:html`${code('framework-'+label.toLowerCase(),example,label)}<p class="setup-framework-note">${label==='JavaScript'?'Templates return escaped HTML. Run enhanceUI after mounting and dispose before unmounting.':'Use your framework to own application state. The template functions are not framework-specific components.'}</p>`
            }))
          })}
        </div>
      </div>

      <div class="docs-step-item" id="start-theming">
        <div class="docs-step-badge">5</div>
        <div class="docs-step-content">
          <h2>Theming & custom tokens</h2>
          <p>Toggle light and dark with <code>setTheme()</code>. Choose an accent, radius, border, shadow, or density with scoped attributes — put them on <code>&lt;html&gt;</code> for a global theme, or on any section for a local theme:</p>
          <div class="theming-code-grid">
            ${code('setup-theming-html',"<html\n  data-theme=\"dark\"\n  data-s-accent=\"violet\"\n  data-s-radius=\"lg\"\n  data-s-card-radius=\"full\"\n  data-s-border=\"subtle\"\n  data-s-shadow=\"lg\"\n  data-s-density=\"compact\"\n>\n  <section data-s-accent=\"emerald\" data-s-card-radius=\"sm\">\n    <article class=\"s-card\">Local emerald card</article>\n  </section>\n</html>",'HTML')}
            ${code('setup-theming-js',"import { setTheme, setThemeOptions } from 'sarahui';\n\nsetTheme('dark', {\n  accent: 'violet',\n  radius: 'lg',\n  cardRadius: 'full',\n  border: 'subtle',\n  shadow: 'lg',\n  density: 'compact'\n});\n\n// Scope a style to one section without persisting it.\nsetThemeOptions({ accent: 'emerald' }, { root: section, persist: false });",'JavaScript')}
            ${code('setup-theming-css',":root {\n  --s-action-primary: #5B3DF5;\n  --s-card-radius: 16px;\n}\n\n/* Scoped custom token override */\n.my-section {\n  --s-card-padding: 32px;\n}",'CSS')}
          </div>
          <p class=\"setup-framework-note\">Accents: indigo, violet, blue, emerald, amber, red. Radius: none, sm, md, lg, xl, full. Border: none, subtle, default, strong. Shadow: none, sm, md, lg. Density: compact, comfortable, spacious.</p>
        </div>
      </div>
    </div>

    <article class="doc-section" id="start-events">
      <div class="section-title">
        <div>
          <p class="eyebrow">SYSTEM EVENTS</p>
          <h2>Connect data and user actions</h2>
          <p>Components emit standard bubbling CustomEvents that you can listen for anywhere in your DOM hierarchy.</p>
        </div>
      </div>
      <div class="semantic-table-wrap" tabindex="0" role="region" aria-label="Component events">
        <table class="semantic-table">
          <thead>
            <tr>
              <th scope="col">Event</th>
              <th scope="col">event.detail</th>
              <th scope="col">Trigger Condition</th>
            </tr>
          </thead>
          <tbody>
            ${events.map(([name,detail,when])=>html`<tr><td><code>${name}</code></td><td><code>${detail}</code></td><td>${when}</td></tr>`)}
          </tbody>
        </table>
      </div>
    </article>

    <article class="doc-section" id="start-help">
      <div class="section-title">
        <div>
          <p class="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
          <h2>Good answers, close at hand</h2>
        </div>
      </div>
      ${Accordion({items:[
        {title:'Why does my component look unstyled?',content:"Make sure to import 'sarahui/css' once at your entry point and wrap components in an element with class=\"s-ui\". Bundlers will automatically resolve and copy the local variable fonts."},
        {title:'How do animations and effects work without React or Framer Motion?',content:'All 120 components are powered by pure hardware-accelerated CSS keyframes, Canvas 2D/WebGL math, and native browser Web APIs. They deliver smooth 60fps performance with zero runtime overhead.'},
        {title:'Can I customize the colors, radii, and fonts?',content:'Yes. sarahUI exports standard CSS variables for easy customization. You can override any token in your stylesheet or inline on an element.'},
        {title:'Are all 120 components free for commercial use?',content:'Yes. sarahUI is 100% free and open-source under the MIT license. You can use it freely in personal, commercial, and client projects.'}
      ]})}
    </article>

    <div class="start-links">
      <a href="https://github.com/masarax/sarahui" target="_blank" rel="noreferrer">
        <span class="start-link-icon">${Icon({name:'code',size:22})}</span>
        <div>
          <strong>Explore GitHub Repository</strong>
          <span>Source code, tests, recipes, and token definitions</span>
        </div>
        ${Icon({name:'arrow',size:16})}
      </a>
      <a href="https://www.npmjs.com/package/sarahui" target="_blank" rel="noreferrer">
        <span class="start-link-icon">${Icon({name:'layers',size:22})}</span>
        <div>
          <strong>View on npm Registry</strong>
          <span>npm install sarahui</span>
        </div>
        ${Icon({name:'arrow',size:16})}
      </a>
    </div>
  </section>`;
}
