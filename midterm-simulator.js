/*
  Randomized Midterm 1 simulator.
  Six mixed, original transfer problems are drawn from six hidden skill pools.
  Scope: Parts 1–2 only. Laplace is excluded.
*/
(()=>{
  if(typeof units==="undefined" || typeof state==="undefined") return;

  const VERSION=4;
  const KEY="engMathMidterm1RandomV4";
  const LIMIT=50*60;
  const UNIT_ID="l9-mock";
  let tickHandle=null;

  const bank=[
    {
      id:"A1",pool:"A",minutes:8,marks:17,
      prompt:`<p>Solve the initial-value problem completely. Include the maximal interval containing the initial point on which the IVP solution is defined.</p>
      <div class="eq">\\[
      y'=y^2-2(x+1)y+x^2+2x+2,\\qquad y(0)=2.
      \\]</div>
      <p>Do not assume in advance which first-order technique is intended.</p>`,
      solution:`<p>Inspection gives a particular solution <span class="math">S=x+1</span>, since the right side becomes 1 when <span class="math">y=x+1</span>.</p>
      <p>Put</p><div class="eq">\\[y=x+1+\\frac1z.\\]</div>
      <p>Then <span class="math">y'=1-z'/z^2</span>. Substitution cancels the terms involving <span class="math">x</span> and gives</p>
      <div class="eq">\\[1-\\frac{z'}{z^2}=1+\\frac1{z^2},\\]</div>
      <p>hence <span class="math">z'=-1</span>, so <span class="math">z=C-x</span>. Therefore</p>
      <div class="eq">\\[y=x+1+\\frac1{C-x}.\\]</div>
      <p>The initial condition gives <span class="math">C=1</span>:</p>
      <div class="whybox"><div class="eq">\\[\\boxed{y=x+1+\\frac1{1-x}}.\\]</div></div>
      <p>The singularity is at <span class="math">x=1</span>, so the maximal interval containing 0 is <span class="math">\\boxed{(-\\infty,1)}</span>.</p>
      <p><b>Marking guide (17):</b> useful reduction 3; transformed equation 4; solve it 4; initial condition 3; interval/check 3.</p>`
    },
    {
      id:"A2",pool:"A",minutes:9,marks:17,
      prompt:`<p>Find the complete real solution family, on intervals where <span class="math">x\\ne0</span>, of</p>
      <div class="eq">\\[(2x^2+xy+y^2)\\,dx-x(x+2y)\\,dy=0.\\]</div>
      <p>If algebra excludes any straight-line solutions, recover and report them separately.</p>`,
      solution:`<p>Put <span class="math">y=ux</span>, so <span class="math">y'=u+xu'</span>. Then</p>
      <div class="eq">\\[u+xu'=\\frac{2+u+u^2}{1+2u},\\]</div>
      <p>so</p><div class="eq">\\[x\\frac{du}{dx}=\\frac{2-u^2}{1+2u}.\\]</div>
      <p>For <span class="math">u^2\\ne2</span>,</p>
      <div class="eq">\\[\\frac{1+2u}{2-u^2}\\,du=\\frac{dx}{x}.\\]</div>
      <p>One antiderivative is</p>
      <div class="eq">\\[\\frac1{2\\sqrt2}\\ln\\left|\\frac{\\sqrt2+u}{\\sqrt2-u}\\right|-\\ln|2-u^2|.\\]</div>
      <p>Hence, with <span class="math">u=y/x</span>,</p>
      <div class="whybox"><div class="eq">\\[
      \\boxed{
      \\frac1{2\\sqrt2}\\ln\\left|\\frac{\\sqrt2+y/x}{\\sqrt2-y/x}\\right|
      -\\ln\\left|2-(y/x)^2\\right|=\\ln|x|+C
      }.
      \\]</div></div>
      <p>The division by <span class="math">2-u^2</span> excluded the constant-ratio branches <span class="math">u=\\pm\\sqrt2</span>. Both satisfy the original equation, so also include</p>
      <div class="eq">\\[\\boxed{y=\\sqrt2\,x},\\qquad \\boxed{y=-\\sqrt2\,x}.\\]</div>
      <p><b>Marking guide (17):</b> reduction 4; separation 4; integration 5; restore variables 2; excluded branches 2.</p>`
    },
    {
      id:"B1",pool:"B",minutes:8,marks:16,
      prompt:`<p>Solve the initial-value problem and give the maximal real interval containing <span class="math">x=1</span> on which the resulting real branch exists:</p>
      <div class="eq">\\[(3y^2+2x)\\,dx+2xy\\,dy=0,\\qquad y(1)=1.\\]</div>`,
      solution:`<p>Let <span class="math">M=3y^2+2x</span> and <span class="math">N=2xy</span>. Since</p>
      <div class="eq">\\[M_y=6y,\\qquad N_x=2y,\\]</div>
      <p>the equation is not exact. But</p>
      <div class="eq">\\[\\frac{M_y-N_x}{N}=\\frac{4y}{2xy}=\\frac2x,\\]</div>
      <p>so an integrating factor is <span class="math">\\mu=x^2</span>. Multiplying gives</p>
      <div class="eq">\\[(3x^2y^2+2x^3)dx+2x^3y\,dy=0,\\]</div>
      <p>which is exact, with potential</p>
      <div class="eq">\\[\\phi=x^3y^2+\\frac{x^4}{2}.\\]</div>
      <p>Using <span class="math">y(1)=1</span> gives <span class="math">C=3/2</span>, so the positive IVP branch is</p>
      <div class="whybox"><div class="eq">\\[
      \\boxed{y(x)=\\sqrt{\\frac{3-x^4}{2x^3}}}.
      \\]</div></div>
      <p>For the branch through <span class="math">(1,1)</span>, we require <span class="math">x>0</span> and <span class="math">3-x^4>0</span>. Thus</p>
      <div class="eq">\\[\\boxed{0<x<3^{1/4}}.\\]</div>
      <p><b>Marking guide (16):</b> exactness test 2; integrating-factor test/factor 4; exact potential 4; IVP branch 3; interval 3.</p>`
    },
    {
      id:"B2",pool:"B",minutes:7,marks:16,
      prompt:`<p>Find the implicit solution through <span class="math">(0,\\pi)</span>, and compute the slope of that solution curve at the initial point:</p>
      <div class="eq">\\[
      (e^x\\cos y+2xy)\\,dx+(-e^x\\sin y+x^2+3y^2)\\,dy=0.
      \\]</div>`,
      solution:`<p>Set</p>
      <div class="eq">\\[M=e^x\\cos y+2xy,\\qquad N=-e^x\\sin y+x^2+3y^2.\\]</div>
      <p>Then</p><div class="eq">\\[M_y=-e^x\\sin y+2x=N_x,\\]</div>
      <p>so the equation is exact. Integrating <span class="math">M</span> with respect to <span class="math">x</span> gives</p>
      <div class="eq">\\[\\phi=e^x\\cos y+x^2y+g(y).\\]</div>
      <p>Matching <span class="math">\\phi_y=N</span> gives <span class="math">g'(y)=3y^2</span>, hence <span class="math">g=y^3</span>. At <span class="math">(0,\\pi)</span>, <span class="math">C=\\pi^3-1</span>:</p>
      <div class="whybox"><div class="eq">\\[
      \\boxed{e^x\\cos y+x^2y+y^3=\\pi^3-1}.
      \\]</div></div>
      <p>From <span class="math">M+Ny'=0</span>,</p>
      <div class="eq">\\[
      y'(0)=-\\frac{M(0,\\pi)}{N(0,\\pi)}
      =-\\frac{-1}{3\\pi^2}
      =\\boxed{\\frac1{3\\pi^2}}.
      \\]</div>
      <p><b>Marking guide (16):</b> exactness 3; potential 5; initial condition 3; implicit answer 2; slope 3.</p>`
    },
    {
      id:"C1",pool:"C",minutes:10,marks:17,
      prompt:`<p>Solve the initial-value problem:</p>
      <div class="eq">\\[
      y^{(4)}-4y^{(3)}+8y''-8y'+4y=0,
      \\]</div>
      <div class="eq">\\[
      y(0)=1,\\qquad y'(0)=2,\\qquad y''(0)=4,\\qquad y^{(3)}(0)=4.
      \\]</div>`,
      solution:`<p>The characteristic polynomial factors as</p>
      <div class="eq">\\[
      r^4-4r^3+8r^2-8r+4=(r^2-2r+2)^2=((r-1)^2+1)^2.
      \\]</div>
      <p>Thus <span class="math">1\\pm i</span> are both double roots and</p>
      <div class="eq">\\[
      y=e^x[(A+Bx)\\cos x+(C+Dx)\\sin x].
      \\]</div>
      <p>At zero, successive derivatives give</p>
      <div class="eq">\\[
      y(0)=A,\quad y'(0)=A+B+C,\quad
      y''(0)=2B+2C+2D,\quad y^{(3)}(0)=-2A+2C+6D.
      \\]</div>
      <p>The data give <span class="math">A=1</span>, <span class="math">B+C=1</span>, <span class="math">B+C+D=2</span>, and <span class="math">-2+2C+6D=4</span>. Hence <span class="math">D=1</span>, <span class="math">C=0</span>, <span class="math">B=1</span>.</p>
      <div class="whybox"><div class="eq">\\[
      \\boxed{y=e^x[(1+x)\\cos x+x\\sin x]}.
      \\]</div></div>
      <p><b>Marking guide (17):</b> polynomial/factorization 4; repeated-complex basis 5; four initial conditions 6; final answer/check 2.</p>`
    },
    {
      id:"C2",pool:"C",minutes:8,marks:17,
      prompt:`<p>On the real line, one nonzero solution of the equation below is <span class="math">y_1=x^2+1</span>. Find a second linearly independent solution and hence the general solution.</p>
      <div class="eq">\\[
      y''-\\frac{2}{x^2+1}y=0.
      \\]</div>
      <p>Your work must make clear why the second solution is independent of <span class="math">y_1</span>.</p>`,
      solution:`<p>The equation is in standard form with <span class="math">P(x)=0</span>. Reduction of order gives</p>
      <div class="eq">\\[
      y_2=y_1\\int\\frac{e^{-\\int Pdx}}{y_1^2}\\,dx
      =(x^2+1)\\int\\frac{dx}{(x^2+1)^2}.
      \\]</div>
      <p>Using</p>
      <div class="eq">\\[
      \\int\\frac{dx}{(x^2+1)^2}
      =\\frac{x}{2(x^2+1)}+\\frac12\\arctan x,
      \\]</div>
      <p>and rescaling by 2, take</p>
      <div class="eq">\\[
      y_2=x+(x^2+1)\\arctan x.
      \\]</div>
      <p>For the unscaled reduction-of-order choice, <span class="math">W=y_1^2u'=1</span>; after multiplying <span class="math">y_2</span> by 2, the Wronskian is the nonzero constant 2. Therefore the pair is independent.</p>
      <div class="whybox"><div class="eq">\\[
      \\boxed{y=C_1(x^2+1)+C_2[x+(x^2+1)\\arctan x]}.
      \\]</div></div>
      <p><b>Marking guide (17):</b> reduction setup 5; integral 5; second solution 3; independence 2; general family 2.</p>`
    },
    {
      id:"D1",pool:"D",minutes:8,marks:17,
      prompt:`<p>Solve the initial-value problem:</p>
      <div class="eq">\\[
      y''-2y'+y=e^x(x^2+1),\\qquad y(0)=0,\\qquad y'(0)=1.
      \\]</div>
      <p>Show enough work to justify the form of every term in your answer.</p>`,
      solution:`<p>The homogeneous polynomial is <span class="math">(r-1)^2</span>, so <span class="math">y_h=e^x(C_1+C_2x)</span>.</p>
      <p>Write <span class="math">y=e^xv</span>. Because the operator is <span class="math">(D-1)^2</span>,</p>
      <div class="eq">\\[(D-1)^2(e^xv)=e^xv''.\\]</div>
      <p>Thus</p><div class="eq">\\[v''=x^2+1.\\]</div>
      <p>Integrating twice,</p>
      <div class="eq">\\[
      v=\\frac{x^4}{12}+\\frac{x^2}{2}+C_2x+C_1.
      \\]</div>
      <p>The data give <span class="math">C_1=0</span> and <span class="math">C_2=1</span>. Hence</p>
      <div class="whybox"><div class="eq">\\[
      \\boxed{y=e^x\\left(x+\\frac{x^2}{2}+\\frac{x^4}{12}\\right)}.
      \\]</div></div>
      <p><b>Marking guide (17):</b> homogeneous part 3; recognize/handle overlap 4; particular calculation 5; IVP constants 3; verification 2.</p>`
    },
    {
      id:"D2",pool:"D",minutes:10,marks:17,
      prompt:`<p>On <span class="math">(-\\pi/2,\\pi/2)</span>, solve</p>
      <div class="eq">\\[
      y''+y=\\tan x,\\qquad y(0)=1,\\qquad y'(0)=0.
      \\]</div>
      <p>Give a real-valued answer valid on the stated interval.</p>`,
      solution:`<p>A homogeneous basis is <span class="math">y_1=\\cos x</span>, <span class="math">y_2=\\sin x</span>, with <span class="math">W=1</span>. Variation of parameters gives</p>
      <div class="eq">\\[
      u_1'=-\\sin x\\tan x=\\cos x-\\sec x,\\qquad
      u_2'=\\cos x\\tan x=\\sin x.
      \\]</div>
      <p>So we may take</p>
      <div class="eq">\\[
      u_1=\\sin x-\\ln(\\sec x+\\tan x),\\qquad u_2=-\\cos x.
      \\]</div>
      <p>The cross terms cancel, leaving</p>
      <div class="eq">\\[
      y_p=-\\cos x\\ln(\\sec x+\\tan x).
      \\]</div>
      <p>Thus</p>
      <div class="eq">\\[
      y=C_1\\cos x+C_2\\sin x-\\cos x\\ln(\\sec x+\\tan x).
      \\]</div>
      <p>At <span class="math">x=0</span>, the logarithm is zero, so <span class="math">C_1=1</span>. The particular term has derivative -1 at zero, so <span class="math">C_2=1</span>.</p>
      <div class="whybox"><div class="eq">\\[
      \\boxed{y=\\cos x+\\sin x-\\cos x\\ln(\\sec x+\\tan x)}.
      \\]</div></div>
      <p><b>Marking guide (17):</b> homogeneous basis/Wronskian 3; parameter equations 5; integrations/cancellation 5; IVP constants 3; interval 1.</p>`
    },
    {
      id:"E1",pool:"E",minutes:9,marks:16,
      prompt:`<p>For <span class="math">x>0</span>, solve the initial-value problem</p>
      <div class="eq">\\[
      x^2y''-3xy'+4y=x^2\\ln x,\\qquad y(1)=1,\\qquad y'(1)=0.
      \\]</div>`,
      solution:`<p>Set <span class="math">t=\\ln x</span> and <span class="math">Y(t)=y(e^t)</span>. Then</p>
      <div class="eq">\\[xy'=Y',\\qquad x^2y''=Y''-Y'.\\]</div>
      <p>The equation becomes</p>
      <div class="eq">\\[
      Y''-4Y'+4Y=e^{2t}t.
      \\]</div>
      <p>The left side is <span class="math">(D-2)^2Y</span>. Put <span class="math">Y=e^{2t}V</span>; then <span class="math">(D-2)^2Y=e^{2t}V''</span>, so</p>
      <div class="eq">\\[V''=t.\\]</div>
      <p>Hence <span class="math">V=t^3/6+C_2t+C_1</span>. Returning to <span class="math">x</span>,</p>
      <div class="eq">\\[
      y=x^2\\left(C_1+C_2\\ln x+\\frac{(\\ln x)^3}{6}\\right).
      \\]</div>
      <p>The conditions give <span class="math">C_1=1</span> and <span class="math">C_2=-2</span>.</p>
      <div class="whybox"><div class="eq">\\[
      \\boxed{y=x^2\\left(1-2\\ln x+\\frac{(\\ln x)^3}{6}\\right)},\\qquad x>0.
      \\]</div></div>
      <p><b>Marking guide (16):</b> change of variable identities 4; transformed ODE 3; solve transformed equation 4; restore x 2; initial data 3.</p>`
    },
    {
      id:"E2",pool:"E",minutes:8,marks:16,
      prompt:`<p>Let <span class="math">b</span> be a real constant. Determine exactly for which values of <span class="math">b</span> the boundary-value problem has a solution. For every admissible <span class="math">b</span>, give <em>all</em> solutions and state whether the solution is unique.</p>
      <div class="eq">\\[
      y''+4y=8\\cos(2x),\\qquad y(0)=0,\\qquad y(\\pi/2)=b.
      \\]</div>`,
      solution:`<p>The complementary solution is</p>
      <div class="eq">\\[y_h=A\\cos2x+B\\sin2x.\\]</div>
      <p>Because the forcing is resonant, a particular solution is <span class="math">y_p=2x\\sin2x</span>. Therefore</p>
      <div class="eq">\\[y=A\\cos2x+B\\sin2x+2x\\sin2x.\\]</div>
      <p>The condition <span class="math">y(0)=0</span> gives <span class="math">A=0</span>. At <span class="math">x=\\pi/2</span>, both sine terms vanish, so every remaining solution has</p>
      <div class="eq">\\[y(\\pi/2)=0.\\]</div>
      <div class="whybox">
      <p>If <span class="math">\\boxed{b\\ne0}</span>, there is <b>no solution</b>.</p>
      <p>If <span class="math">\\boxed{b=0}</span>, there are <b>infinitely many</b> solutions:</p>
      <div class="eq">\\[\\boxed{y=B\\sin2x+2x\\sin2x,\\qquad B\\in\\mathbb R}.\\]</div>
      </div>
      <p><b>Marking guide (16):</b> homogeneous family 3; resonant particular 4; first boundary 2; compatibility at second boundary 4; classify solution count 3.</p>`
    },
    {
      id:"F1",pool:"F",minutes:9,marks:17,
      prompt:`<p>A <span class="math">1\\,\\mathrm{kg}</span> mass is attached to a spring with stiffness <span class="math">9\\,\\mathrm{N/m}</span> and a viscous damper with coefficient <span class="math">2\\,\\mathrm{N\\,s/m}</span>. It is driven by <span class="math">10\\cos(3t)\\,\\mathrm N</span>. Displacement is measured from equilibrium. At <span class="math">t=0</span>, the mass is at equilibrium and at rest.</p>
      <p>(a) Build the governing IVP. (b) Solve for the displacement. (c) Classify the free motion and decide whether the forced response exhibits unbounded resonance.</p>`,
      solution:`<p>Newton's law gives</p>
      <div class="eq">\\[
      \\boxed{y''+2y'+9y=10\\cos3t},\\qquad y(0)=0,\\qquad y'(0)=0.
      \\]</div>
      <p>The homogeneous roots are <span class="math">-1\\pm2\\sqrt2\,i</span>, hence</p>
      <div class="eq">\\[
      y_h=e^{-t}[C_1\\cos(2\\sqrt2\,t)+C_2\\sin(2\\sqrt2\,t)].
      \\]</div>
      <p>Try <span class="math">y_p=A\\cos3t+B\\sin3t</span>. The <span class="math">y''+9y</span> terms cancel, leaving</p>
      <div class="eq">\\[-6A\\sin3t+6B\\cos3t=10\\cos3t,\\]</div>
      <p>so <span class="math">A=0</span>, <span class="math">B=5/3</span>. The initial data give <span class="math">C_1=0</span> and <span class="math">C_2=-5/(2\\sqrt2)</span>.</p>
      <div class="whybox"><div class="eq">\\[
      \\boxed{y(t)=-\\frac5{2\\sqrt2}e^{-t}\\sin(2\\sqrt2\,t)+\\frac53\\sin3t}.
      \\]</div></div>
      <p>Since <span class="math">c^2-4mk=4-36<0</span> and <span class="math">c>0</span>, the free motion is <b>underdamped</b>. The forcing frequency equals the undamped natural frequency, but positive damping keeps the steady-state amplitude finite, so there is <b>no unbounded resonance</b>.</p>
      <p><b>Marking guide (17):</b> model/ICs 3; homogeneous response 4; forced response 5; constants 3; interpretation 2.</p>`
    },
    {
      id:"F2",pool:"F",minutes:9,marks:17,
      prompt:`<p>A series RLC circuit has <span class="math">L=1\\,\\mathrm H</span>, <span class="math">R=4\\,\\Omega</span>, <span class="math">C=1/13\\,\\mathrm F</span>, and applied voltage <span class="math">E(t)=10e^{-2t}\\,\\mathrm V</span>. Initially the capacitor is uncharged and the current is zero.</p>
      <p>Using capacitor charge <span class="math">q(t)</span> as the dependent variable, (a) derive the IVP, (b) solve for <span class="math">q(t)</span>, and (c) obtain the current <span class="math">i(t)</span>.</p>`,
      solution:`<p>Kirchhoff's voltage law is</p>
      <div class="eq">\\[Lq''+Rq'+\\frac1Cq=E(t),\\qquad i=q'.\\]</div>
      <p>Thus</p>
      <div class="eq">\\[
      \\boxed{q''+4q'+13q=10e^{-2t}},\\qquad q(0)=0,\\qquad q'(0)=0.
      \\]</div>
      <p>The homogeneous roots are <span class="math">-2\\pm3i</span>:</p>
      <div class="eq">\\[q_h=e^{-2t}(C_1\\cos3t+C_2\\sin3t).\\]</div>
      <p>Try <span class="math">q_p=Ae^{-2t}</span>. Substitution gives <span class="math">9Ae^{-2t}=10e^{-2t}</span>, so <span class="math">A=10/9</span>. The initial data give <span class="math">C_1=-10/9</span>, <span class="math">C_2=0</span>.</p>
      <div class="whybox"><div class="eq">\\[
      \\boxed{q(t)=\\frac{10}{9}e^{-2t}(1-\\cos3t)}.
      \\]</div></div>
      <p>Differentiating,</p>
      <div class="eq">\\[
      \\boxed{i(t)=q'(t)=\\frac{10}{9}e^{-2t}\\left[-2(1-\\cos3t)+3\\sin3t\\right]}.
      \\]</div>
      <p><b>Marking guide (17):</b> circuit model/ICs 4; homogeneous response 3; particular response 4; constants 3; current 3.</p>`
    }
  ];

  const pools=["A","B","C","D","E","F"];

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
  function pickPaper(){
    let draft=[];
    for(let attempt=0;attempt<60;attempt++){
      draft=pools.map(pool=>{
        const choices=bank.filter(x=>x.pool===pool);
        return choices[randInt(choices.length)];
      });
      const mins=draft.reduce((s,p)=>s+p.minutes,0);
      if(mins>=49 && mins<=53) break;
    }
    return shuffle(draft);
  }
  function code(){
    const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let out="";
    for(let i=0;i<6;i++) out+=chars[randInt(chars.length)];
    return out;
  }
  function saveExam(exam){
    try{localStorage.setItem(KEY,JSON.stringify(exam));}catch(_){}
  }
  function loadExam(){
    try{
      const raw=localStorage.getItem(KEY);
      if(!raw) return null;
      const x=JSON.parse(raw);
      if(x?.version!==VERSION || !Array.isArray(x.problemIds) || x.problemIds.length!==6) return null;
      if(!x.problemIds.every(id=>bank.some(p=>p.id===id))) return null;
      return x;
    }catch(_){return null;}
  }
  function normalizeEnd(exam){
    if(!exam) return exam;
    if(exam.startedAt && !exam.endedAt && Date.now()-exam.startedAt>=LIMIT*1000){
      exam.endedAt=exam.startedAt+LIMIT*1000;
      exam.reason="time";
      saveExam(exam);
    }
    return exam;
  }
  function liveExam(){
    const x=normalizeEnd(loadExam());
    return !!(x?.startedAt && !x.endedAt);
  }
  function examUnit(){
    return units.find(u=>u&&u.id===UNIT_ID);
  }
  function examUnitIndex(){
    return units.findIndex(u=>u&&u.id===UNIT_ID);
  }
  function introScreen(exam){
    const active=!!(exam?.startedAt && !exam.endedAt);
    const finished=!!exam?.endedAt;
    const status=active
      ? `<div class="warn"><b>Paper ${exam.code} is running.</b> The 50-minute clock continues even if you leave this lesson or refresh the page.</div>`
      : finished
        ? `<div class="tip"><b>Last paper:</b> ${exam.code}. Its worked solutions are unlocked. Starting a new paper replaces it.</div>`
        : "";
    const button=active
      ? `<button class="primary midtermBigBtn" onclick="midtermResume()">Resume paper</button><button class="secondary midtermBigBtn" onclick="midtermStartNew()">Discard &amp; generate new paper</button>`
      : `<button class="primary midtermBigBtn" onclick="midtermStartNew()">Generate &amp; start a random paper</button>`;
    return {
      type:"teach",
      title:"Random 50-Minute Midterm",
      _midtermIntro:true,
      html:`<p><span class="supplementalTag">Midterm 1 simulator · Parts 1–2 · 50 minutes · 100 marks</span></p>
      <p><b>This is not a six-question method checklist.</b> Every paper is generated from hidden skill pools and then shuffled. Question titles do not tell you what technique to use, and the order is random.</p>
      <div class="whybox"><p><b>Paper design:</b> 6 substantial questions, 100 marks total, approximately 49–53 minutes of intended work. The bank deliberately mixes unfamiliar first-order structure, higher-order equations, boundary/initial data, and engineering applications.</p>
      <p>The problems are original transfer problems built to match the scope and level of the course and to resemble the multi-step difficulty of harder O'Neil Chapter 1–2 work. They are not copied textbook questions.</p></div>
      <div class="warn"><b>Exam conditions:</b> closed book, no glossary, no worked solutions, no method hints. Laplace is outside this Midterm 1 simulation. The timer does not pause.</div>
      ${status}
      <div class="midtermStartActions">${button}</div>`
    };
  }
  function qScreen(problem,index){
    return {
      type:"bookproblem",
      bookSection:"Midterm 1 simulation",
      practiceLabel:`Random paper · Question ${index+1} · ${problem.marks} marks`,
      title:`Question ${index+1} · ${problem.marks} marks`,
      prompt:problem.prompt,
      solution:problem.solution,
      _midtermExamProblem:true,
      _midtermProblemId:problem.id,
      _midtermIndex:index
    };
  }
  function summaryScreen(exam,problems){
    const minutes=problems.reduce((s,p)=>s+p.minutes,0);
    const ended=exam?.endedAt;
    return {
      type:"teach",
      title:"Paper complete",
      _midtermSummary:true,
      html:`<p><span class="supplementalTag">Paper ${exam?.code||""} · 100 marks · intended workload ≈ ${minutes} min</span></p>
      <div class="whybox"><p><b>Worked solutions are now unlocked.</b> Go back through Questions 1–6 and mark your own paper using the marking guides. Do not award method marks for a result you reached by an invalid step.</p></div>
      <p>Use this as a diagnostic: record which question cost you time, which recognition step failed, and whether the mistake was mathematical, algebraic, or time-management related.</p>
      <div class="midtermStartActions"><button class="secondary midtermBigBtn" onclick="midtermReviewQuestion(1)">Review Question 1</button><button class="primary midtermBigBtn" onclick="midtermStartNew()">Generate another random paper</button></div>
      <p class="midtermSmall">${ended?"The timer is stopped for this paper.":""}</p>`
    };
  }
  function rebuild(exam){
    const unit=examUnit();
    if(!unit) return;
    if(!exam){
      unit.lessons=[{title:"Random paper",screens:[introScreen(null)]}];
      return;
    }
    const problems=exam.problemIds.map(id=>bank.find(p=>p.id===id)).filter(Boolean);
    unit.lessons=[{title:"Random paper",screens:[introScreen(exam),...problems.map(qScreen),summaryScreen(exam,problems)]}];
    unit.title="Random 50-Minute Midterm Simulation";
    unit.subtitle="6 mixed questions · 100 marks · actual 50-minute timer · new paper each run";
    unit.desc="A randomized closed-book Midterm 1 simulation. Methods are hidden, questions are shuffled, and worked solutions stay locked until the paper ends.";
  }

  window.midtermStartNew=()=>{
    const current=normalizeEnd(loadExam());
    if(current?.startedAt && !current.endedAt){
      if(!confirm("A timed paper is already running. Discard it and generate a new one?")) return;
    }
    const picked=pickPaper();
    const exam={
      version:VERSION,
      code:code(),
      problemIds:picked.map(p=>p.id),
      startedAt:Date.now(),
      endedAt:null,
      reason:null
    };
    saveExam(exam);
    rebuild(exam);
    const ui=examUnitIndex();
    if(ui<0) return;
    state.unit=ui; state.lesson=0; state.screen=1;
    selected=null;
    try{rememberCoursePosition?.();}catch(_){}
    try{save?.();}catch(_){try{persistState?.();}catch(__){}}
    render();
  };

  window.midtermResume=()=>{
    const exam=normalizeEnd(loadExam());
    if(!exam) return;
    rebuild(exam);
    const ui=examUnitIndex();
    state.unit=ui; state.lesson=0;
    if(state.screen<1 || state.screen>6) state.screen=1;
    selected=null;
    try{save?.();}catch(_){}
    render();
  };

  window.midtermEndExam=(reason="submitted")=>{
    const exam=normalizeEnd(loadExam());
    if(!exam || exam.endedAt) return;
    if(reason==="submitted" && !confirm("End this paper now? The timer will stop and worked solutions will unlock.")) return;
    exam.endedAt=Date.now();
    exam.reason=reason;
    saveExam(exam);
    rebuild(exam);
    const ui=examUnitIndex();
    if(ui>=0){state.unit=ui;state.lesson=0;state.screen=7;}
    try{save?.();}catch(_){}
    render();
  };

  window.midtermReviewQuestion=n=>{
    const ui=examUnitIndex();
    if(ui<0) return;
    state.unit=ui;state.lesson=0;state.screen=Math.max(1,Math.min(6,Number(n)||1));
    try{save?.();}catch(_){}
    render();
  };

  function formatTime(sec){
    sec=Math.max(0,Math.floor(sec));
    const m=Math.floor(sec/60), s=sec%60;
    return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  }
  function updateTimer(){
    const bar=document.getElementById("midtermTimerValue");
    if(!bar) return;
    const exam=normalizeEnd(loadExam());
    if(!exam?.startedAt || exam.endedAt){
      if(exam?.endedAt) bar.textContent="ENDED";
      return;
    }
    const remaining=Math.max(0,LIMIT-Math.floor((Date.now()-exam.startedAt)/1000));
    bar.textContent=formatTime(remaining);
    const shell=document.getElementById("midtermTimerBar");
    shell?.classList.toggle("urgent",remaining<=5*60);
    if(remaining<=0) window.midtermEndExam("time");
  }
  function ensureTicker(){
    if(tickHandle) clearInterval(tickHandle);
    tickHandle=setInterval(updateTimer,1000);
    updateTimer();
  }
  function postProcess(){
    if(Number(selectedCourseLesson)!==9) return;
    const unit=units[state.unit];
    if(!unit || unit.id!==UNIT_ID) return;
    const screen=unit.lessons?.[state.lesson]?.screens?.[state.screen];
    const card=document.getElementById("card");
    if(!card || !screen) return;

    if(screen._midtermIntro){
      const actions=card.querySelector(".actions");
      if(actions) actions.style.display="none";
    }

    const exam=normalizeEnd(loadExam());
    if(screen._midtermExamProblem || screen._midtermSummary){
      const running=!!(exam?.startedAt && !exam.endedAt);
      const timer=document.createElement("div");
      timer.id="midtermTimerBar";
      timer.className="midtermTimerBar"+(running?" live":" ended");
      timer.innerHTML=`<div><span class="midtermTimerLabel">MIDTERM 1 · PAPER ${exam?.code||"—"}</span><strong id="midtermTimerValue">${running?"50:00":"ENDED"}</strong></div>
      ${running?'<button class="midtermSubmitBtn" onclick="midtermEndExam()">End paper</button>':""}`;
      card.prepend(timer);

      const toggle=card.querySelector("#exampleSolutionToggle");
      const body=card.querySelector("#exampleSolutionBody");
      if(running && screen._midtermExamProblem){
        if(toggle) toggle.style.display="none";
        if(body){body.classList.remove("open");body.style.display="none";}
        const label=card.querySelector(".exampleQuestionLabel");
        if(label) label.textContent="Question";
      }else if(screen._midtermExamProblem){
        if(toggle){toggle.style.display="inline-flex";toggle.textContent="Show worked solution";}
        if(body) body.style.display="";
      }

      if(running && screen._midtermExamProblem){
        const counter=card.querySelector(".counter");
        if(counter) counter.textContent=`Question ${screen._midtermIndex+1} of 6`;
      }
      ensureTicker();
    }
  }

  function addStyles(){
    if(document.getElementById("midtermRandomStyles")) return;
    const style=document.createElement("style");
    style.id="midtermRandomStyles";
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
        .midtermTimerLabel{max-width:150px}
        .midtermTimerBar strong{font-size:18px}
      }
    `;
    document.head.appendChild(style);
  }

  const old=normalizeEnd(loadExam());
  rebuild(old);
  addStyles();

  const baseRender=render;
  render=function(){
    baseRender();
    try{postProcess();}catch(e){console.error("midterm post-process",e);}
  };

  // Finishing Question 6 submits the paper before the summary can be shown.
  const baseNext=next;
  next=function(){
    const unit=units[state.unit];
    if(Number(selectedCourseLesson)===9 && unit?.id===UNIT_ID && state.screen===6 && liveExam()){
      const exam=normalizeEnd(loadExam());
      if(exam && !exam.endedAt){
        exam.endedAt=Date.now();
        exam.reason="completed";
        saveExam(exam);
        rebuild(exam);
        state.screen=7;
        try{save?.();}catch(_){}
        render();
        return;
      }
    }
    baseNext();
  };

  try{renderCourseMap?.();}catch(_){}
  try{render();}catch(_){}
})();