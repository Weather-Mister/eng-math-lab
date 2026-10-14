import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';

const browser = await puppeteer.launch({ executablePath:process.env.CHROME_BIN,headless:true,
  args:['--no-sandbox','--disable-dev-shm-usage'] });
const page=await browser.newPage();
const issues=[];
page.on('pageerror',e=>issues.push('Page error: '+e.message));
const base=process.env.SITE_URL||'http://127.0.0.1:8765/';
try {
  await page.setViewport({width:1365,height:900});
  await page.goto(base,{waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForFunction(()=>Boolean(window.LaplaceReference && window.MathJax?.startup?.promise && window.openGlossary),{timeout:45000});
  const entry=await page.evaluate(()=>{
    const d=document.querySelector('.laplaceToggle'),m=document.querySelector('.mobileLaplaceToggle');
    return {desktop:!!d,mobile:!!m,defaultClosed:!document.getElementById('laplaceFloating'),section:!!document.querySelector('[data-glossary-section="laplace"]')};
  });
  assert(entry.desktop&&entry.mobile&&entry.section,'Missing launch controls or glossary tab');
  await page.evaluate(()=>window.LaplaceReference.open());
  await page.evaluate(async()=>{await mathTypesetChain;});
  const math=await page.evaluate(()=>{
    const win=document.getElementById('laplaceFloating');
    const rows=win.querySelectorAll('.laplaceTable tbody tr');
    return {
      open:!win.hidden,groups:win.querySelectorAll('.laplaceGroup').length,rows:rows.length,
      typeset:win.querySelectorAll('mjx-container').length,
      failures:win.querySelectorAll('mjx-merror,.MathJax_Error').length,
      rawNodes:[...win.querySelectorAll('.laplaceMath')].flatMap(el=>[...el.childNodes].filter(node=>node.nodeType===3 && /\\(?:frac|\()/.test(node.textContent)).map(node=>node.textContent.slice(0,125))),
      geom: win.getBoundingClientRect().toJSON()
    };
  });
  assert(math.open&&math.groups===4&&math.rows>=35&&math.typeset>=math.rows*2&&!math.failures&&!math.rawNodes.length,
    'Laplace table is missing or has unrendered formulas: '+JSON.stringify(math));
  const before=await page.$eval('#laplaceFloating',el=>el.getBoundingClientRect().toJSON());
  const title=await page.$eval('#laplaceDragHandle',el=>el.getBoundingClientRect().toJSON());
  await page.mouse.move(title.x+65,title.y+15);
  await page.mouse.down();
  await page.mouse.move(title.x-95,title.y+60,{steps:9});
  await page.mouse.up();
  const after=await page.$eval('#laplaceFloating',el=>el.getBoundingClientRect().toJSON());
  assert(after.x<before.x-30&&after.y>before.y+20,'Window did not move by pointer drag');
  const grip=await page.$eval('.laplaceResizeGrip',el=>el.getBoundingClientRect().toJSON());
  await page.mouse.move(grip.x+grip.width-8,grip.y+grip.height-8);
  await page.mouse.down();
  await page.mouse.move(grip.x+grip.width-95,grip.y+grip.height-70,{steps:7});
  await page.mouse.up();
  const resized=await page.$eval('#laplaceFloating',el=>el.getBoundingClientRect().toJSON());
  assert(resized.width<after.width-30&&resized.height<after.height-25,'Resize grip did not resize');
  await page.$eval('.laplaceSearch',el=>{el.value='convolution';el.dispatchEvent(new Event('input',{bubbles:true}));});
  const search=await page.evaluate(()=>{
    const el=document.querySelector('#laplaceFloating');
    return {label:el.querySelector('.laplaceCount').textContent,rows:[...el.querySelectorAll('.laplaceTable tbody tr')].filter(row=>!row.hidden)};
  });
  assert(search.label==='1 formulas','Search should find one convolution pair: '+search.label);
  await page.$eval('.laplaceSearch',el=>{el.value='';el.dispatchEvent(new Event('input',{bubbles:true}));});
  await page.evaluate(()=>window.LaplaceReference.close());
  await page.keyboard.down('Alt');await page.keyboard.press('l');await page.keyboard.up('Alt');
  assert(await page.$eval('#laplaceFloating',el=>!el.hidden),'Alt+L failed to open the window');
  await page.keyboard.down('Alt');await page.keyboard.press('l');await page.keyboard.up('Alt');
  assert(await page.$eval('#laplaceFloating',el=>el.hidden),'Alt+L failed to close the window');
  const glossary=await page.evaluate(async()=>{
    window.openGlossary('laplace');await mathTypesetChain;
    const section=document.querySelector('[data-glossary-section="laplace"]');
    return {visible:section.classList.contains('active'),rows:section.querySelectorAll('tbody tr').length,
      math:section.querySelectorAll('mjx-container').length,
      errors:section.querySelectorAll('mjx-merror').length,
      duplicateData:!!window.LaplaceReference};
  });
  assert(glossary.visible&&glossary.rows===math.rows&&glossary.math>70&&!glossary.errors,'Glossary math failed: '+JSON.stringify(glossary));
  await page.click('[data-laplace-float-open]');
  assert(await page.$eval('#laplaceFloating',el=>!el.hidden),'Glossary to floating link failed');
  assert(!(await page.$eval('#glossaryModal',el=>el.classList.contains('open'))),'Glossary left open after opening floating window');
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.LaplaceReference?.open);
  await page.evaluate(()=>window.LaplaceReference.open());
  const restored=await page.$eval('#laplaceFloating',el=>el.getBoundingClientRect().toJSON());
  assert(Math.abs(restored.width-resized.width)<3&&Math.abs(restored.x-resized.x)<3,'Window geometry did not persist across reload');
  await page.setViewport({width:390,height:844});
  const mobile=await page.evaluate(()=>{
    const win=document.getElementById('laplaceFloating');
    const r=win.getBoundingClientRect();
    const b=document.querySelector('.mobileLaplaceToggle');
    return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,button:getComputedStyle(b).display,
      horizontalPageOverflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+4};
  });
  assert(mobile.left>=0&&mobile.top>=0&&mobile.right<=391&&mobile.bottom<=845&&!mobile.horizontalPageOverflow&&mobile.button!=='none',
    'Mobile overflow or inaccessible reference: '+JSON.stringify(mobile));
  await page.evaluate(()=>window.LaplaceReference.close());
  console.log(JSON.stringify({status:'passed',rows:math.rows,typeset:math.typeset,glossaryMath:glossary.math,
    moved:[Math.round(after.x-before.x),Math.round(after.y-before.y)],
    resized:[Math.round(resized.width-after.width),Math.round(resized.height-after.height)],
    search:search.label,mobile,issues},null,2));
  assert(issues.length===0,'JS page errors: '+issues.join('; '));
}finally{await browser.close();}
