import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
let playwright;
try{playwright=require('playwright');}catch{
  if(!process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES)throw new Error('Install the test dependency: npm install --no-save playwright@1.62.1');
  playwright=require(path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES,'playwright'));
}
const output=path.resolve('test-results');fs.mkdirSync(output,{recursive:true});
const server=process.env.BROWSER_URL?null:spawn(process.execPath,['scripts/serve.mjs','--no-build'],{env:{...process.env,PORT:'4179'},stdio:['ignore','pipe','inherit']});
let browser;
const results=[],errors=[];
try {
  if(server)await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Test server did not start')),15000);server.stdout.on('data',s=>{if(s.toString().includes('sarahUI ready')){clearTimeout(timer);resolve();}});server.on('error',reject);server.on('exit',code=>{if(code)reject(new Error('Server exited '+code));});});
  browser=await playwright.chromium.launch({headless:true,args:['--no-sandbox']});
  const context=await browser.newContext({viewport:{width:1440,height:1024},deviceScaleFactor:1,reducedMotion:'reduce',colorScheme:'light'});
  const page=await context.newPage();page.setDefaultTimeout(10000);
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  const base=process.env.BROWSER_URL||'http://127.0.0.1:4179';
  const goto=async hash=>{await page.goto(base+'/'+hash);await page.waitForSelector('html[data-ready=true]');await page.evaluate(()=>document.fonts.ready);};
  const check=async(name,fn)=>{try{await fn();results.push({name,passed:true});console.log('PASS '+name);}catch(error){results.push({name,passed:false,error:error.message});console.error('FAIL '+name+'\n'+error.stack);await page.screenshot({path:path.join(output,'failure-'+results.length+'.png'),fullPage:false}).catch(()=>{});await page.evaluate(()=>document.querySelectorAll('dialog[open]').forEach(d=>d.close()));}};
  const route=async hash=>{await page.evaluate(h=>{location.hash=h;},hash);await page.waitForFunction(h=>document.documentElement.dataset.route===h,hash);};
  const shot=async name=>{await page.evaluate(()=>document.activeElement?.blur());await page.screenshot({path:path.join(output,name+'.png'),fullPage:false,animations:'disabled'});};
  await goto('#overview');
  await check('All local fonts load and the component catalog is complete',async()=>{
    for(const family of ['Inter','Poppins','Roboto Mono','Noto Sans Bengali','Noto Sans Arabic'])assert.equal(await page.evaluate(async f=>{await document.fonts.load('600 16px "'+f+'"');return document.fonts.check('600 16px "'+f+'"');},family),true,family);
    assert.equal(await page.locator('[data-component-name]').count(),32);
    const broken=await page.evaluate(()=>[...document.querySelectorAll('[aria-controls],[aria-labelledby],[aria-describedby]')].flatMap(el=>['aria-controls','aria-labelledby','aria-describedby'].flatMap(attr=>(el.getAttribute(attr)||'').split(/\s+/).filter(Boolean).filter(id=>!document.getElementById(id)))));
    assert.deepEqual(broken,[]);
    const duplicates=await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return ids.filter((id,i)=>ids.indexOf(id)!==i);});assert.deepEqual(duplicates,[]);
  });
  await shot('overview-light');
  await check('Command search filters, keyboard selects, and routes to a component',async()=>{
    await page.keyboard.press('Control+k');await page.locator('#library-search').waitFor({state:'visible'});
    await page.locator('[data-s-command-input]').fill('Slider');await page.keyboard.press('Enter');
    await page.waitForFunction(()=>document.documentElement.dataset.route==='#components/Slider');assert.equal(await page.locator('#library-search').evaluate(d=>d.open),false);
    assert.equal(await page.locator('#component-slider').isVisible(),true);
  });
  await check('Search has a meaningful empty state and Escape restores focus',async()=>{
    await page.locator('.search-trigger').click();await page.locator('[data-s-command-input]').fill('nothing-will-match-8231');
    assert.equal(await page.locator('[data-s-command-empty]').isVisible(),true);await page.keyboard.press('Escape');
    await page.waitForFunction(()=>document.activeElement.matches('.search-trigger'));
    await page.locator('.search-trigger').click();await page.locator('[data-s-command-input]').fill('');await page.keyboard.press('Escape');
  });
  await route('#components');
  await check('Component search and category filters compose and clear',async()=>{
    await page.locator('#component-search').fill('Button');
    const matches=await page.locator('[data-component-name]:visible').evaluateAll(cards=>cards.map(c=>c.dataset.componentName));
    for(const name of ['Button','IconButton','ButtonGroup'])assert.ok(matches.includes(name));assert.ok(!matches.includes('Input'));
    await page.locator('[data-component-group="Forms"]').click();assert.equal(await page.locator('#component-empty').isVisible(),true);
    await page.locator('[data-clear-filters]').click();assert.equal(await page.locator('[data-component-name]:visible').count(),32);
    await page.locator('[data-component-group="Forms"]').click();assert.equal(await page.locator('[data-component-name]:visible').count(),7);
    await page.locator('[data-component-group="All components"]').click();
  });
  await check('Tabs support arrows, Home, End, and right-to-left navigation',async()=>{
    const group=page.locator('#component-tabs'),tabs=group.getByRole('tab');
    await tabs.nth(0).focus();await page.keyboard.press('ArrowRight');assert.equal(await tabs.nth(1).getAttribute('aria-selected'),'true');
    await page.keyboard.press('End');assert.equal(await tabs.nth(2).getAttribute('aria-selected'),'true');
    await page.keyboard.press('Home');assert.equal(await tabs.nth(0).getAttribute('aria-selected'),'true');
    await group.evaluate(el=>el.dir='rtl');await page.keyboard.press('ArrowLeft');assert.equal(await tabs.nth(1).getAttribute('aria-selected'),'true');await group.evaluate(el=>el.removeAttribute('dir'));
  });
  await check('Native range and switches expose real changing values',async()=>{
    const range=page.locator('#demo-slider');await range.focus();await page.keyboard.press('ArrowRight');assert.equal(await range.inputValue(),'65');assert.equal(await page.locator('#component-slider output').textContent(),'65');
    const toggle=page.locator('#demo-switch-a');await toggle.uncheck();assert.equal(await toggle.isChecked(),false);
    await toggle.check();assert.equal(await toggle.isChecked(),true);
  });
  await check('Tables sort numerically and announce partial selection',async()=>{
    const table=page.locator('#demo-datatable');await table.locator('[data-s-sort="progress"]').click();
    assert.equal(await table.locator('tbody tr').first().locator('[data-column=progress]').textContent(),'48');
    await table.locator('[data-s-row-select]').first().check();assert.equal(await table.locator('[data-s-select-all]').evaluate(el=>el.indeterminate),true);
    await table.locator('[data-s-select-all]').check();assert.equal(await table.locator('[data-s-row-select]:checked').count(),3);
  });
  await check('Menu arrows skip disabled options and Escape returns to trigger',async()=>{
    const menu=page.locator('#component-menu');const trigger=menu.locator('[data-s-menu-trigger]');await trigger.focus();await page.keyboard.press('ArrowDown');
    assert.equal(await menu.locator('[role=menuitem]').nth(0).evaluate(el=>el===document.activeElement),true);
    await page.keyboard.press('ArrowDown');await page.keyboard.press('ArrowDown');assert.equal(await menu.locator('[role=menuitem]').last().evaluate(el=>el===document.activeElement),true);
    await page.keyboard.press('Escape');assert.equal(await trigger.getAttribute('aria-expanded'),'false');assert.equal(await trigger.evaluate(el=>el===document.activeElement),true);
  });
  await check('Tooltips dismiss with Escape while the trigger keeps focus',async()=>{
    const tip=page.locator('#component-tooltip [data-s-tooltip]');await tip.locator('button').focus();
    assert.equal(await tip.locator('[role=tooltip]').evaluate(el=>getComputedStyle(el).visibility),'visible');
    await page.keyboard.press('Escape');assert.equal(await tip.locator('[role=tooltip]').evaluate(el=>getComputedStyle(el).visibility),'hidden');
  });
  await check('Code samples expand into copyable HTML',async()=>{
    const card=page.locator('#component-button');await card.locator('[data-code-toggle]').click();assert.equal(await card.locator('.component-source').isVisible(),true);
    assert.ok((await card.locator('pre').textContent()).includes('s-button--primary'));
    await card.locator('[data-code-toggle]').click();
  });
  await route('#patterns');
  await check('Project modal contains focus, validates, creates and restores focus',async()=>{
    const trigger=page.getByRole('button',{name:'New project',exact:true});await trigger.click();
    await page.waitForFunction(()=>document.activeElement.id==='new-project-name');
    await page.locator('#create-project-form button[type=submit]').click();assert.equal(await page.locator('#create-project').evaluate(d=>d.open),true);
    await page.locator('#new-project-name').fill('Sarah’s next idea');await page.locator('#create-project-form button[type=submit]').click();
    await page.waitForFunction(()=>!document.getElementById('create-project').open);
    assert.equal(await page.locator('#metric-projects').textContent(),'9');
    assert.ok((await page.locator('#workspace-table').textContent()).includes('Sarah’s next idea'));
    await page.waitForFunction(()=>document.activeElement.textContent.trim()==='New project');
    await trigger.click();for(let i=0;i<12;i++)await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.getElementById('create-project').contains(document.activeElement)),true);await page.keyboard.press('Escape');
  });
  await check('Workspace filters, pagination and global sorting change data',async()=>{
    await page.locator('#project-search').fill('studio');assert.equal(await page.locator('#workspace-table tbody tr').count(),1);
    await page.locator('#project-search').fill('');await page.locator('#projects-pagination [data-page="2"]').click();assert.ok((await page.locator('#projects-summary').textContent()).includes('5–8'));
    await page.locator('#project-status').selectOption('Complete');assert.equal(await page.locator('#workspace-table tbody tr').count(),1);
    await page.locator('#project-status').selectOption('All statuses');await page.locator('#workspace-table [data-s-sort=progress]').click();
    assert.equal(await page.locator('#workspace-table tbody tr').first().locator('[data-column=progress]').getAttribute('data-sort'),'0');
  });
  await check('Settings validate and preserve the chosen theme after reload',async()=>{
    await page.locator('#settings-name').fill('Maya Rahman');await page.locator('#settings-theme').selectOption('dark');
    await page.locator('#settings-form button[type=submit]').click();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
    assert.ok((await page.locator('.settings-profile').textContent()).includes('Maya Rahman'));
    await page.reload();await page.waitForSelector('html[data-ready=true]');assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  });
  await route('#overview');await page.evaluate(()=>scrollTo(0,0));await shot('overview-dark');
  await page.locator('[data-s-theme-toggle]').click();
  await route('#patterns');await page.evaluate(()=>scrollTo(0,0));await shot('patterns-light');
  await route('#foundations');await page.evaluate(()=>scrollTo(0,0));await shot('foundations-light');
  await route('#components');await page.evaluate(()=>scrollTo(0,0));await shot('components-light');
  await check('Theme controls work under reduced motion and focus is visible',async()=>{
    const button=page.locator('[data-s-theme-toggle]');await button.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');
    assert.notEqual(await button.evaluate(el=>getComputedStyle(el).outlineStyle),'none');
    assert.equal(await page.locator('#component-spinner .s-spinner').evaluate(el=>getComputedStyle(el).animationName),'none');
    await page.emulateMedia({forcedColors:'active'});assert.equal(await page.locator('#demo-checkbox-a').evaluate(el=>getComputedStyle(el).appearance),'auto');await page.emulateMedia({forcedColors:'none'});
  });
  await check('All views fit narrow, mobile and tablet viewports',async()=>{
    for(const width of [320,390,768,1024]){
      await page.setViewportSize({width,height:900});
      for(const view of ['overview','foundations','components','patterns','start']){
        await route('#'+view);
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
        assert.equal(overflow,false,view+' overflows at '+width+'px');
      }
    }
  });
  await page.setViewportSize({width:390,height:844});await route('#overview');await page.evaluate(()=>scrollTo(0,0));await shot('overview-mobile');
  await check('Mobile navigation is a native modal and closes after navigation',async()=>{
    await page.getByRole('button',{name:'Open navigation'}).click();assert.equal(await page.locator('#mobile-navigation').evaluate(d=>d.open),true);
    await page.locator('#mobile-navigation').getByRole('link',{name:'Components 32'}).click();await page.waitForFunction(()=>!document.getElementById('mobile-navigation').open);assert.equal(await page.locator('[data-view=components]').isVisible(),true);
  });
  await check('No browser errors occurred',async()=>assert.deepEqual(errors,[]));
} finally {
  fs.writeFileSync(path.join(output,'browser-results.json'),JSON.stringify({passed:results.filter(r=>r.passed).length,failed:results.filter(r=>!r.passed).length,results,errors},null,2));
  await browser?.close();server?.kill();
}
console.log(results.filter(r=>r.passed).length+'/'+results.length+' browser scenarios passed.');
if(results.some(r=>!r.passed))process.exitCode=1;
