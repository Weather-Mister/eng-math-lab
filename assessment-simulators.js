/*
  Timed randomized simulators for the remaining ME2001-02 assessments.
  - Midterm 2: Parts 3-4, 50 minutes, Laplace table provided.
  - Final exam: Parts 1-5, 100 minutes, Laplace table provided.

  Reuses already-audited Lesson 16 / Lesson 25 transfer boards so the
  simulator stays aligned with the course content instead of maintaining
  a second, drifting copy of the mathematics.
*/
(()=>{
  if(typeof units==="undefined" || typeof state==="undefined") return;
  if(typeof l16Transfer==="undefined" || typeof l25Mock==="undefined") return;

  const VERSION=1;
  let tickHandle=null;

  function fromBoard(id,pool,minutes,marks,board){
    return {
      id,pool,minutes,marks,
      prompt:board?.prompt || "<p>Problem unavailable.</p>",
      solution:board?.solution || "<p>Worked solution unavailable.</p>"
    };
  }

  const midterm2Bank=[
    fromBoard("M2-A1","A",8,17,l16P32),
    fromBoard("M2-A2","A",9,17,l16Transfer[9]),

    fromBoard("M2-B1","B",7,17,l16Shift),
    fromBoard("M2-B2","B",6,17,l16Transfer[4]),

    fromBoard("M2-C1","C",10,17,l16Series),
    fromBoard("M2-C2","C",8,17,l16Transfer[2]),

    fromBoard("M2-D1","D",9,17,l16Frob),
    fromBoard("M2-D2","D",8,17,l16Transfer[3]),

    fromBoard("M2-E1","E",8,16,l16Transfer[6]),
    fromBoard("M2-E2","E",7,16,l16Transfer[7]),

    fromBoard("M2-F1","F",9,16,l16Transfer[8]),
    fromBoard("M2-F2","F",6,16,l16Transfer[5])
  ];

  const finalBank=[
    fromBoard("F-A1","A",10,10,l25Clairaut),
    fromBoard("F-A2","A",9,10,l25Mock[0]),

    fromBoard("F-B1","B",7,10,l25Mock[1]),
    fromBoard("F-B2","B",8,10,l25ExamMatrix[0]),

    fromBoard("F-C1","C",9,10,l25Higher),
    fromBoard("F-C2","C",8,10,l25Euler),

    fromBoard("F-D1","D",8,10,l25ExamMatrix[2]),
    fromBoard("F-D2","D",6,10,l25Mock[2]),

    fromBoard("F-E1","E",9,10,l25Laplace),
    fromBoard("F-E2","E",10,10,l25Mock[3]),

    fromBoard("F-F1","F",7,10,l25Impulse),
    fromBoard("F-F2","F",9,10,l16Transfer[8]),
    fromBoard("F-F3","F",9,10,l16Transfer[9]),

    fromBoard("F-G1","G",9,10,l25Series),
    fromBoard("F-G2","G",10,10,l16Series),

    fromBoard("F-H1","H",8,10,l25Frobenius),
    fromBoard("F-H2","H",9,10,l16Frob),
    fromBoard("F-H3","H",8,10,l16Transfer[3]),

    fromBoard("F-I1","I",10,10,l25Rank),
    fromBoard("F-I2","I",10,10,l25Mock[9]),
    fromBoard("F-I3","I",8,10,l25Mock[11]),

    fromBoard("F-J1","J",12,10,l25System),
    fromBoard("F-J2","J",11,10,l25Mock[12]),
    fromBoard("F-J3","J",9,10,l25Mock[13]),
    fromBoard("F-J4","J",11,10,l25Mock[14])
  ];

  const defs={
    midterm2:{
      id:"midterm2",
      unitId:"l16-random",
      courseLesson:16,
      storageKey:"engMathMidterm2RandomV1",
      limit:50*60,
      pools:["A","B","C","D","E","F"],
      bank:midterm2Bank,
      targetMin:47,
      targetMax:53,
      label:"MIDTERM 2",
      examTitle:"Random 50-Minute Midterm 2",
      scopeLine:"Parts 3–4 · Laplace + power series/Frobenius",
      officialLine:"Nov. 18 · 50 minutes · closed book · Laplace table provided",
      count:6,
      marks:100,
      color:"#536b48",
      badge:"★",
      subtitle:"6 mixed questions · 100 practice marks · actual 50-minute timer · new paper each run",
      desc:"A randomized Midterm 2 simulation covering Parts 3–4. Question titles hide the technique, the paper is shuffled, and worked solutions stay locked until the timer ends."
    },
    final:{
      id:"final",
      unitId:"l25-random",
      courseLesson:25,
      storageKey:"engMathFinalRandomV1",
      limit:100*60,
      pools:["A","B","C","D","E","F","G","H","I","J"],
      bank:finalBank,
      targetMin:90,
      targetMax:102,
      label:"FINAL EXAM",
      examTitle:"Random 100-Minute Final Simulation",
      scopeLine:"Parts 1–5 · cumulative",
      officialLine:"Dec. 21 · 10:20–12:00 · 100 minutes · closed book · Laplace table provided",
      count:10,
      marks:100,
      color:"#5d6b88",
      badge:"★",
      subtitle:"10 mixed questions · all five parts · 100 practice marks · actual 100-minute timer",
      desc:"A randomized cumulative final simulation. Every paper samples all five course parts, hides method labels, shuffles the questions, and locks worked solutions until the paper ends."
    }
  };

  function defFor(kind){ return defs[kind] || null; }

  function randInt(n){
    if(n<=1) return 0;
    try{
      const a=new Uint32Array(1);
      crypto.getRandomValues(a);
      return a[0]%n;
    }catch(_){
      return Math.floor(Math.random()*n);
    }
  }

  function shuffle(items){
    const a=[...items];
    for(let i=a.length-1;i>0;i--){
      const j=randInt(i+1);
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }

  function pickPaper(d){
    let draft=[];
    for(let attempt=0;attempt<100;attempt++){
      draft=d.pools.map(pool=>{
        const choices=d.bank.filter(x=>x.pool===pool);
        return choices[randInt(choices.length)];
      });
      const mins=draft.reduce((s,p)=>s+p.minutes,0);
      if(mins>=d.targetMin && mins<=d.targetMax) break;
    }
    return shuffle(draft);
  }

  function paperCode(){
    const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let out="";
    for(let i=0;i<6;i++) out+=chars[randInt(chars.length)];
    return out;
  }

  function saveExam(d,exam){
    try{ localStorage.setItem(d.storageKey,JSON.stringify(exam)); }catch(_){}
  }

  function loadExam(d){
    try{
      const raw=localStorage.getItem(d.storageKey);
      if(!raw) return null;
      const x=JSON.parse(raw);
      if(x?.version!==VERSION || !Array.isArray(x.problemIds) || x.problemIds.length!==d.count) return null;
      if(!x.problemIds.every(id=>d.bank.some(p=>p.id===id))) return null;
      return x;
    }catch(_){
      return null;
    }
  }

  function normalizeEnd(d,exam){
    if(!exam) return exam;
    if(exam.startedAt && !exam.endedAt && Date.now()-exam.startedAt>=d.limit*1000){
      exam.endedAt=exam.startedAt+d.limit*1000;
      exam.reason="time";
      saveExam(d,exam);
    }
    return exam;
  }

  function liveExam(d){
    const x=normalizeEnd(d,loadExam(d));
    return !!(x?.startedAt && !x.endedAt);
  }

  function examUnit(d){
    return units.find(u=>u&&u.id===d.unitId);
  }

  function examUnitIndex(d){
    return units.findIndex(u=>u&&u.id===d.unitId);
  }

  function practiceMarking(marks){
    const method=Math.round(marks*0.30);
    const verify=Math.round(marks*0.20);
    const execution=marks-method-verify;
    return `<div class="whybox"><p><b>Practice marking (${marks}):</b> method/structure ${method}; execution ${execution}; final answer + verification ${verify}. Treat this only as the simulator's self-marking split, not an official NTU marking scheme.</p></div>`;
  }

  function introScreen(d,exam){
    const active=!!(exam?.startedAt && !exam.endedAt);
    const finished=!!exam?.endedAt;
    const status=active
      ? `<div class="warn"><b>Paper ${exam.code} is running.</b> The ${Math.round(d.limit/60)}-minute clock continues if you leave the lesson or refresh the page.</div>`
      : finished
        ? `<div class="tip"><b>Last paper:</b> ${exam.code}. Its worked solutions are unlocked. Starting a new paper replaces it.</div>`
        : "";
    const button=active
      ? `<button class="primary midtermBigBtn" onclick="assessmentSimResume('${d.id}')">Resume paper</button><button class="secondary midtermBigBtn" onclick="assessmentSimStart('${d.id}')">Discard &amp; generate new paper</button>`
      : `<button class="primary midtermBigBtn" onclick="assessmentSimStart('${d.id}')">Generate &amp; start a random paper</button>`;
    return {
      type:"teach",
      title:d.examTitle,
      _assessmentSimIntro:true,
      _assessmentKind:d.id,
      html:`<p><span class="supplementalTag">${d.label} simulator · ${d.scopeLine} · ${Math.round(d.limit/60)} minutes · ${d.marks} practice marks</span></p>
      <p><b>This is a timed random paper, not another chapter-by-chapter checklist.</b> One problem is drawn from every hidden skill pool, then the questions are shuffled so the order does not reveal the method.</p>
      <div class="whybox"><p><b>Paper design:</b> ${d.count} questions, ${d.marks} practice marks, target workload about ${d.targetMin}–${d.targetMax} minutes. Repeated runs rotate the problem choice inside each pool.</p></div>
      <div class="warn"><b>Official exam conditions:</b> ${d.officialLine}. To mirror the exam, use only the provided Laplace table where applicable; do not use the glossary or worked solutions. The timer does not pause.</div>
      ${status}
      <div class="midtermStartActions">${button}</div>`
    };
  }

  function qScreen(d,problem,index){
    return {
      type:"bookproblem",
      bookSection:`${d.label} simulation`,
      practiceLabel:`Random paper · Question ${index+1} · ${problem.marks} practice marks`,
      title:`Question ${index+1} · ${problem.marks} marks`,
      prompt:problem.prompt,
      solution:problem.solution+practiceMarking(problem.marks),
      _assessmentSimProblem:true,
      _assessmentKind:d.id,
      _assessmentProblemId:problem.id,
      _assessmentIndex:index
    };
  }

  function summaryScreen(d,exam,problems){
    const minutes=problems.reduce((s,p)=>s+p.minutes,0);
    const ended=exam?.endedAt;
    return {
      type:"teach",
      title:"Paper complete",
      _assessmentSimSummary:true,
      _assessmentKind:d.id,
      html:`<p><span class="supplementalTag">Paper ${exam?.code||""} · ${d.marks} practice marks · intended workload ≈ ${minutes} min</span></p>
      <div class="whybox"><p><b>Worked solutions are now unlocked.</b> Go back through Questions 1–${d.count} and mark your paper. Separate recognition/method errors from algebra, bookkeeping, and verification errors.</p></div>
      <p>For the next run, focus on the pool that cost the most time rather than simply repeating the easiest question type.</p>
      <div class="midtermStartActions"><button class="secondary midtermBigBtn" onclick="assessmentSimReview('${d.id}',1)">Review Question 1</button><button class="primary midtermBigBtn" onclick="assessmentSimStart('${d.id}')">Generate another random paper</button></div>
      <p class="midtermSmall">${ended?"The timer is stopped for this paper.":""}</p>`
    };
  }

  function ensureUnit(d){
    let unit=examUnit(d);
    if(unit) return unit;
    unit={
      id:d.unitId,
      courseLesson:d.courseLesson,
      color:d.color,
      badge:d.badge,
      label:d.label==="FINAL EXAM" ? "100-min random" : "50-min random",
      title:d.examTitle,
      subtitle:d.subtitle,
      desc:d.desc,
      lessons:[{title:"Random paper",screens:[introScreen(d,null)]}]
    };
    units.push(unit);
    return unit;
  }

  function rebuild(d,exam){
    const unit=ensureUnit(d);
    if(!exam){
      unit.lessons=[{title:"Random paper",screens:[introScreen(d,null)]}];
      unit.title=d.examTitle;
      unit.subtitle=d.subtitle;
      unit.desc=d.desc;
      return;
    }
    const problems=exam.problemIds.map(id=>d.bank.find(p=>p.id===id)).filter(Boolean);
    unit.lessons=[{
      title:"Random paper",
      screens:[
        introScreen(d,exam),
        ...problems.map((p,i)=>qScreen(d,p,i)),
        summaryScreen(d,exam,problems)
      ]
    }];
    unit.title=d.examTitle;
    unit.subtitle=d.subtitle;
    unit.desc=d.desc;
  }

  function enterExamUnit(d,screen){
    const ui=examUnitIndex(d);
    if(ui<0) return;
    selectedCourseLesson=d.courseLesson;
    localStorage.setItem("odeCourseLesson",String(d.courseLesson));
    state.courseLesson=d.courseLesson;
    state.unit=ui;
    state.lesson=0;
    state.screen=screen;
    selected=null;
    try{ rememberCoursePosition?.(); }catch(_){}
    try{ save?.(); }catch(_){ try{ persistState?.(); }catch(__){} }
    try{ renderCourseMap?.(); }catch(_){}
    render();
  }

  window.assessmentSimStart=kind=>{
    const d=defFor(kind);
    if(!d) return;
    const current=normalizeEnd(d,loadExam(d));
    if(current?.startedAt && !current.endedAt){
      if(!confirm(`A timed ${d.label.toLowerCase()} paper is already running. Discard it and generate a new one?`)) return;
    }
    const picked=pickPaper(d);
    const exam={
      version:VERSION,
      code:paperCode(),
      problemIds:picked.map(p=>p.id),
      startedAt:Date.now(),
      endedAt:null,
      reason:null
    };
    saveExam(d,exam);
    rebuild(d,exam);
    enterExamUnit(d,1);
  };

  window.assessmentSimResume=kind=>{
    const d=defFor(kind);
    if(!d) return;
    const exam=normalizeEnd(d,loadExam(d));
    if(!exam) return;
    rebuild(d,exam);
    let screen=Number(state.screen);
    if(screen<1 || screen>d.count) screen=1;
    enterExamUnit(d,screen);
  };

  window.assessmentSimEnd=(kind,reason="submitted")=>{
    const d=defFor(kind);
    if(!d) return;
    const exam=normalizeEnd(d,loadExam(d));
    if(!exam || exam.endedAt) return;
    if(reason==="submitted" && !confirm("End this paper now? The timer will stop and worked solutions will unlock.")) return;
    exam.endedAt=Date.now();
    exam.reason=reason;
    saveExam(d,exam);
    rebuild(d,exam);
    enterExamUnit(d,d.count+1);
  };

  window.assessmentSimReview=(kind,n)=>{
    const d=defFor(kind);
    if(!d) return;
    const exam=normalizeEnd(d,loadExam(d));
    if(!exam) return;
    rebuild(d,exam);
    enterExamUnit(d,Math.max(1,Math.min(d.count,Number(n)||1)));
  };

  function formatTime(sec){
    sec=Math.max(0,Math.floor(sec));
    const m=Math.floor(sec/60), s=sec%60;
    return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  }

  function updateTimer(kind){
    const d=defFor(kind);
    if(!d) return;
    const bar=document.getElementById("midtermTimerValue");
    if(!bar) return;
    const exam=normalizeEnd(d,loadExam(d));
    if(!exam?.startedAt || exam.endedAt){
      if(exam?.endedAt) bar.textContent="ENDED";
      return;
    }
    const remaining=Math.max(0,d.limit-Math.floor((Date.now()-exam.startedAt)/1000));
    bar.textContent=formatTime(remaining);
    const shell=document.getElementById("midtermTimerBar");
    shell?.classList.toggle("urgent",remaining<=5*60);
    if(remaining<=0) window.assessmentSimEnd(kind,"time");
  }

  function stopTicker(){
    if(tickHandle){
      clearInterval(tickHandle);
      tickHandle=null;
    }
  }

  function ensureTicker(kind){
    stopTicker();
    tickHandle=setInterval(()=>updateTimer(kind),1000);
    updateTimer(kind);
  }

  function postProcess(){
    const d=Object.values(defs).find(x=>Number(selectedCourseLesson)===x.courseLesson);
    if(!d) return;
    const unit=units[state.unit];
    if(!unit || unit.id!==d.unitId) return;
    const screen=unit.lessons?.[state.lesson]?.screens?.[state.screen];
    const card=document.getElementById("card");
    if(!card || !screen) return;

    if(screen._assessmentSimIntro){
      const actions=card.querySelector(".actions");
      if(actions) actions.style.display="none";
    }

    const exam=normalizeEnd(d,loadExam(d));
    if(screen._assessmentSimProblem || screen._assessmentSimSummary){
      const running=!!(exam?.startedAt && !exam.endedAt);
      const timer=document.createElement("div");
      timer.id="midtermTimerBar";
      timer.className="midtermTimerBar"+(running?" live":" ended");
      timer.innerHTML=`<div><span class="midtermTimerLabel">${d.label} · PAPER ${exam?.code||"—"}</span><strong id="midtermTimerValue">${running?formatTime(d.limit):"ENDED"}</strong></div>
      ${running?`<button class="midtermSubmitBtn" onclick="assessmentSimEnd('${d.id}')">End paper</button>`:""}`;
      card.prepend(timer);

      const toggle=card.querySelector("#exampleSolutionToggle");
      const body=card.querySelector("#exampleSolutionBody");
      if(running && screen._assessmentSimProblem){
        if(toggle) toggle.style.display="none";
        if(body){
          body.classList.remove("open");
          body.style.display="none";
        }
        const label=card.querySelector(".exampleQuestionLabel");
        if(label) label.textContent="Question";
      }else if(screen._assessmentSimProblem){
        if(toggle){
          toggle.style.display="inline-flex";
          toggle.textContent="Show worked solution";
        }
        if(body) body.style.display="";
      }

      if(running && screen._assessmentSimProblem){
        const counter=card.querySelector(".counter");
        if(counter) counter.textContent=`Question ${screen._assessmentIndex+1} of ${d.count}`;
      }
      ensureTicker(d.id);
    }
  }

  function addStyles(){
    if(document.getElementById("assessmentSimulatorStyles")) return;
    const style=document.createElement("style");
    style.id="assessmentSimulatorStyles";
    style.textContent=`
      .midtermStartActions{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0 4px}
      .midtermBigBtn{min-height:44px}
      .midtermTimerBar{display:flex;align-items:center;justify-content:space-between;gap:14px;margin:-2px 0 18px;padding:12px 14px;border:1px solid rgba(35,48,72,.16);border-radius:14px;background:rgba(255,255,255,.78);position:sticky;top:8px;z-index:20;backdrop-filter:blur(10px)}
      .midtermTimerBar>div{display:flex;align-items:center;gap:12px;min-width:0}
      .midtermTimerLabel{font-size:11px;font-weight:900;letter-spacing:.08em;color:#67728a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .midtermTimerBar strong{font-variant-numeric:tabular-nums;font-size:20px;letter-spacing:.04em}
      .midtermTimerBar.urgent strong{font-size:23px}
      .midtermSubmitBtn{border:0;border-radius:10px;padding:9px 12px;font-weight:850;background:#172033;color:white;cursor:pointer;white-space:nowrap}
      .midtermSmall{color:#6b7691;font-size:13px}
      @media(max-width:640px){
        .midtermTimerBar{top:4px;padding:10px}
        .midtermTimerLabel{max-width:170px}
        .midtermTimerBar strong{font-size:18px}
      }
    `;
    document.head.appendChild(style);
  }

  for(const d of Object.values(defs)){
    ensureUnit(d);
    rebuild(d,normalizeEnd(d,loadExam(d)));
  }
  addStyles();

  const baseRender=render;
  render=function(){
    stopTicker();
    baseRender();
    try{ postProcess(); }catch(e){ console.error("assessment simulator post-process",e); }
  };

  const baseNext=next;
  next=function(){
    const d=Object.values(defs).find(x=>Number(selectedCourseLesson)===x.courseLesson);
    const unit=units[state.unit];
    if(d && unit?.id===d.unitId && state.screen===d.count && liveExam(d)){
      const exam=normalizeEnd(d,loadExam(d));
      if(exam && !exam.endedAt){
        exam.endedAt=Date.now();
        exam.reason="completed";
        saveExam(d,exam);
        rebuild(d,exam);
        state.screen=d.count+1;
        try{ save?.(); }catch(_){}
        render();
        return;
      }
    }
    baseNext();
  };

  try{ renderCourseMap?.(); }catch(_){}
  try{ render(); }catch(_){}
})();
