import fs from 'node:fs';
import {html,Icon,Tabs,Alert,Accordion,Button} from '../../packages/ui/src/templates.js';
export const version=JSON.parse(fs.readFileSync(new URL('../../packages/ui/package.json',import.meta.url),'utf8')).version;
export const setupExamples={
  JavaScript:`import 'sarahui/css';
import { Card, Button, render, enhanceUI, toast } from 'sarahui';

const app = document.querySelector('#app');
app.innerHTML = render(Card({
  title: 'A place for your next idea',
  description: 'Everything starts with a little possibility.',
  children: Button({
    label: 'Say hello',
    icon: 'spark',
    attrs: { id: 'hello-button' }
  })
}));
const cleanup = enhanceUI(app);
document.querySelector('#hello-button').addEventListener('click', () => {
  toast('Your first sarahUI component is ready.');
});
// Call cleanup() before unmounting this application.`,
  React:`import 'sarahui/css';

export function ProjectActions({ onCreate }) {
  return (
    <main className="s-ui">
      <button type="button"
        className="s-button s-button--primary s-button--md"
        onClick={onCreate}>
        Create project
      </button>
    </main>
  );
}
// Use React state for controlled inputs.
// For delegated widgets, call enhanceUI(root) in useEffect
// and return its cleanup function.`,
  Vue:`<script setup>
import 'sarahui/css';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { enhanceUI } from 'sarahui';

const root = ref(null);
const enabled = ref(true);
let cleanup = () => {};
onMounted(() => { cleanup = enhanceUI(root.value); });
onBeforeUnmount(() => cleanup());
</script>

<template>
  <main ref="root" class="s-ui">
    <label class="s-choice">
      <input v-model="enabled" type="checkbox"
        class="s-choice-input s-switch" role="switch">
      <span>Email notifications</span>
    </label>
  </main>
</template>`,
  Laravel:`// resources/js/app.js — import through your Vite entry
import 'sarahui/css';
import { enhanceUI } from 'sarahui';
enhanceUI(document);

// Your Blade layout:
// @vite(['resources/js/app.js'])
//
// <main class="s-ui">
//   <form method="POST" action="{{ route('projects.store') }}">
//     @csrf
//     <button type="submit"
//       class="s-button s-button--primary s-button--md">
//       Create project
//     </button>
//   </form>
// </main>
// Define your own routes, validation and persistence.`
};
export function installCommand(){
  return html`<button type="button" class="install-command" data-copy-value="npm install sarahui" aria-label="Copy npm install sarahui"><span aria-hidden="true">$</span><code>npm install sarahui</code>${Icon({name:'copy',size:16})}</button>`;
}
export function startPage({heading,code,link}){
  const managers={npm:'npm install sarahui',pnpm:'pnpm add sarahui',Yarn:'yarn add sarahui',Bun:'bun add sarahui'};
  const sections=[['Installation','installation'],['Quick start','quickstart'],['Your framework','frameworks'],['Theming','theming'],['Events & API','events'],['Help','help']];
  const events=[
    ['sarah:themechange','preference, theme','Document theme changes'],
    ['sarah:tabchange','index, id','Active tab changes'],
    ['sarah:selectionchange','selected, count','Table row selection changes'],
    ['sarah:sortchange','key, direction','A table sort control is selected'],
    ['sarah:pagechange','page, pages','A page is selected'],
    ['sarah:chipremove','label','A removable chip is dismissed'],
    ['sarah:menuaction','value','A menu item is chosen'],
    ['sarah:command','href, label','A command is chosen']
  ];
  return html`<section data-view="start" hidden aria-label="Get started">
    ${heading('04 / FROM IDEA TO INTERFACE','One install. A good beginning.','Bring sarahUI into your next project. Follow the setup below, choose your stack, and make the foundation yours.')}
    <nav class="local-nav" aria-label="Setup sections">${sections.map(([label,id])=>html`<a href="#start/${id}">${label}</a>`)}</nav>
    <article class="setup-install doc-section" id="start-installation">
      <div class="setup-install-copy"><p class="eyebrow">YOUR NEW BUILDING BLOCKS</p><h2>Small package.<br>Room for big ideas.</h2><p>Components, variables, themes and fonts—together in <strong>sarahui</strong>.</p><div class="setup-features"><span>${Icon({name:'check',size:15})} Zero runtime dependencies</span><span>${Icon({name:'check',size:15})} TypeScript definitions included</span><span>${Icon({name:'check',size:15})} MIT licensed</span></div></div>
      <div class="setup-install-terminal"><span class="setup-terminal-label">INSTALL / v${version}</span>${Tabs({id:'package-manager',label:'Package manager',variant:'pill',items:Object.entries(managers).map(([label,value])=>({label,content:code('install-'+label.toLowerCase(),value,'Terminal')}))})}<p>Works with Vite and other CSS-aware bundlers. Use Node.js 22+ for development.</p><a class="text-link" href="https://www.npmjs.com/package/sarahui">View package on npm ${Icon({name:'arrow',size:15})}</a></div>
    </article>
    <article class="doc-section" id="start-quickstart"><div class="section-title"><div><p class="eyebrow">01 / A WORKING FIRST COMPONENT</p><h2>Start with something real.</h2><p>Create a mount point, import the stylesheet, then render your first component.</p></div></div>
      <div class="setup-step-grid"><div><h3>A place to mount</h3><p>In your existing application's HTML:</p>${code('setup-mount','<div id="app" class="s-ui"></div>','HTML')}<div class="setup-tip">${Icon({name:'info',size:18})}<p><code>import 'sarahui/css'</code> includes fonts, tokens and component styles. Your bundler copies the packaged font assets automatically.</p></div><h3>Starting a new project?</h3>${code('setup-vite','npm create vite@latest my-sarah-app -- --template vanilla\\ncd my-sarah-app\\nnpm install\\nnpm install sarahui\\nnpm run dev'.replaceAll('\\n','\n'),'Terminal')}</div><div>${code('setup-javascript',setupExamples.JavaScript,'src/main.js')}</div></div>
    </article>
    <article class="doc-section" id="start-frameworks"><div class="section-title"><div><p class="eyebrow">02 / BRING YOUR STACK</p><h2>At home in your framework.</h2><p>Use CSS classes with native markup, or compose escaped HTML templates.</p></div></div>
      ${Tabs({id:'integration-stack',label:'Framework integration',variant:'pill',items:Object.entries(setupExamples).map(([label,example])=>({label,content:html`${code('framework-'+label.toLowerCase(),example,label)}<p class="setup-framework-note">${label==='JavaScript'?'Templates return escaped HTML. Run enhanceUI after mounting and dispose before unmounting.':'Use your framework to own application state. The template functions are not framework-specific components.'}</p>`}))})}
      <details class="setup-details"><summary>Plain HTML without a build tool</summary><p>Use a version-pinned CDN URL and include the same package assets. An internet connection is required for the CDN example.</p>${code('setup-cdn','<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sarahui@'+version+'/src/sarahui.css">\n<body class="s-ui">\n  <button class="s-button s-button--primary s-button--md">Continue</button>\n  <script type="module">\n    import { enhanceUI } from "https://cdn.jsdelivr.net/npm/sarahui@'+version+'/src/index.js";\n    enhanceUI(document);\n  </script>\n</body>\n</html>','HTML')}</details>
    </article>
    <article class="doc-section" id="start-theming"><div class="section-title"><div><p class="eyebrow">03 / MAKE IT YOURS</p><h2>A shared foundation. Your direction.</h2><p>Use semantic roles for colors and component aliases for shape and spacing.</p></div></div><div class="setup-step-grid">${code('setup-themes',"import { setTheme } from 'sarahui';\nimport { sarahTokens } from 'sarahui/tokens';\n\nsetTheme('dark');   // light | dark | system\nconsole.log(sarahTokens.light['text/primary']);\n\n// Give one area its own theme:\n// <section class=\"s-ui\" data-theme=\"dark\">...</section>",'JavaScript')}${code('setup-overrides','.my-workspace {\n  --s-card-radius: var(--s-radius-lg);\n  --s-button-radius: var(--s-radius-md);\n  --s-card-padding: var(--s-spacing-32);\n}\n\n/* Import individual layers if you bring your own fonts: */\n/* import "sarahui/tokens.css"; */\n/* import "sarahui/styles.css"; */','CSS')}</div><div class="download-links">${link('Explore all foundations','#foundations','outline','palette')}${link('Download token source','./tokens/sarah.tokens.json','outline','download')}</div></article>
    <article class="doc-section" id="start-events"><div class="section-title"><div><p class="eyebrow">04 / CONNECT THE BEHAVIOR</p><h2>Your data. Clear events.</h2><p>Events bubble from components. Connect them to your application's state and services.</p></div></div><div class="semantic-table-wrap" tabindex="0" role="region" aria-label="Component events"><table class="semantic-table"><thead><tr><th>Event</th><th>event.detail</th><th>When it happens</th></tr></thead><tbody>${events.map(([name,detail,when])=>html`<tr><td><code>${name}</code></td><td><code>${detail}</code></td><td>${when}</td></tr>`)}</tbody></table></div>${code('setup-events',"document.addEventListener('sarah:selectionchange', event => {\n  const { selected, count } = event.detail;\n  console.log('Selected row IDs', selected, count);\n});\n\n// Register once for each non-overlapping subtree.\nconst dispose = enhanceUI(document);\n// Call dispose() before unmounting.",'JavaScript')}<p class="setup-framework-note">Each component's <strong>View code</strong> panel includes an npm example, its properties, interaction guidance and HTML markup.</p>${link('Browse all 32 components','#components','outline')}</article>
    <article class="doc-section" id="start-help"><div class="section-title"><div><p class="eyebrow">A LITTLE HELP</p><h2>Good answers, close at hand.</h2></div></div>${Accordion({items:[
      {title:'Why does my component look unstyled?',content:"Import 'sarahui/css' once and place components inside an element with class=\"s-ui\". With a bundler, keep the font URLs that come with the CSS."},
      {title:'Why does a modal or menu not respond?',content:'Call enhanceUI after the markup is mounted. Include both the trigger and the related dialog or menu panel, using matching IDs.'},
      {title:'Can I use Button as a React JSX component?',content:'Button() returns escaped HTML markup. In React, use the documented CSS classes with JSX and React state; do not render the template function as <Button />.'},
      {title:'Where do my project data and form submissions go?',content:'sarahUI supplies interface building blocks. Your application handles validation, authentication, data fetching and storage. The documentation patterns use sample data.'},
      {title:'How do I host this documentation on cPanel?',content:html`Run <code>npm run build</code> and deploy <code>dist/</code> to your domain's document root. The repository includes an FTP workflow and a <a href="https://github.com/masarax/sarahui/blob/main/docs/deployment.md">step-by-step deployment guide</a>.`},
      {title:'How do I customize the full token source?',content:'Clone the repository, edit tokens/sarah.tokens.json, then run npm run tokens and npm run build. Recheck contrast after changing colors.'}
    ]})}</article>
    ${Alert({title:'Built for real applications',description:'Use stable IDs, connect your own data, and test your finished product with the browsers and assistive technology your audience uses.',tone:'info'})}
    <div class="start-links"><a href="https://github.com/masarax/sarahui">${Icon({name:'code',size:24})}<div><strong>Explore the source</strong><span>Components, tests and integration guides</span></div>${Icon({name:'arrow',size:18})}</a><a href="https://www.npmjs.com/package/sarahui">${Icon({name:'download',size:24})}<div><strong>Meet your new dependency</strong><span>npm install sarahui</span></div>${Icon({name:'arrow',size:18})}</a></div>
  </section>`;
}
