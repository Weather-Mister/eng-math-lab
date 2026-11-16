import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';

const browser=await puppeteer.launch({executablePath:process.env.CHROME_BIN,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const failures=[];
let rendered=0,quizzes=0,reveals=0;
try{
 const page=await browser.newPage();
 page.on('pageerror',e=>failures.push('JavaScript: '+e.message));
 await page.goto(process.env.SITE_URL||'http://127.0.0.1:8765/',{waitUntil:'domcontentloaded',timeout:60000});
 await page.waitForFunction(()=>typeof units!=='undefined'&&units.some(u=>u.courseLesson===25)&&window.MathJax?.startup?.promise);
 await page.evaluate(()=>window.MathJax.startup.promise);
 const plan=await page.evaluate(()=>units.flatMap((u,ui)=>u.courseLesson>=17&&u.courseLesson<=25?u.lessons.flatMap((l,li)=>l.screens.map((s,si)=>({ui,li,si,number:u.courseLesson,title:s.title,type:s.type,answer:s.answer,math:/\\\[|\\\(/.test([s.html,s.prompt,s.solution,s.q].filter(Boolean).join(' '))}))):[]));
 assert(plan.length>=250);
 for(const width of [1365,390]){
  await page.setViewport({width,height:900});
  for(const step of plan){
   const result=await page.evaluate(async step=>{
    selectedCourseLesson=step.number;state.unit=step.ui;state.lesson=step.li;state.screen=step.si;
    renderCourseMap();render();await mathTypesetChain;
    const doc=document,card=doc.getElementById('card'),errors=[];
    if(step.type==='bookproblem'){
     const button=doc.getElementById('exampleSolutionToggle');
     if(!button)errors.push('Missing solution reveal');
     else{button.click();if(!doc.getElementById('exampleSolutionBody').classList.contains('open'))errors.push('Reveal failed');}
    }
    if(step.type==='quiz'){
     // Incorrect choices must still explain the answer and allow continuation.
     doc.querySelectorAll('.option')[(step.answer+1)%3]?.click();
     if(!doc.querySelector('.option.correct')||doc.querySelector('#nextBtn').disabled)errors.push('Quiz feedback or continuation failed');
     if(!doc.querySelector('#feedback')?.textContent.includes('Not quite.'))errors.push('Missing incorrect-answer explanation');
    }
    await mathTypesetChain;
    if(!card?.textContent.trim())errors.push('Blank card');
    for(const e of card.querySelectorAll('mjx-merror,.MathJax_Error'))errors.push('MathJax: '+e.textContent);
    if(/\\(?:\[|\]|\(|\)|begin\{)/.test(card.textContent))errors.push('Raw TeX visible');
    if(step.math&&!card.querySelector('mjx-container'))errors.push('Math was not typeset');
    if(doc.documentElement.scrollWidth>innerWidth+4)errors.push('Page overflow: '+doc.documentElement.scrollWidth+' / '+innerWidth);
    if(doc.querySelector('.courseLessonPickerMeta')?.textContent.includes('Ready to fill'))errors.push('Published lesson marked empty');
    if(step.type==='bookproblem'&&!/^O’Neil/.test(step.title)&&card.querySelector('.type')?.textContent.includes('Book mastery · O’Neil'))errors.push('Original practice misattributed');
    return errors;
   },step);
   rendered++;quizzes+=+(step.type==='quiz');reveals+=+(step.type==='bookproblem');
   failures.push(...result.map(error=>({width,lesson:step.number,title:step.title,error})));
  }
 }
 console.log(JSON.stringify({screens:plan.length,rendered,quizzes,reveals,failureCount:failures.length,failures:failures.slice(0,60)},null,2));
 if(failures.length)process.exitCode=1;
}finally{await browser.close();}
