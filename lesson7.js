/*
  Lesson 7 — Oct. 7: RLC circuits; viscoelastic Maxwell and Kelvin–Voigt models;
  two-point boundary-value problems.

  Source policy:
  - The official course outline explicitly requires all three Oct. 7 topics and points to
    O’Neil's Spring Motion web module plus Zill §3.8–3.9.
  - The uploaded O’Neil PDF lists Spring Motion as a separate web module; it does not
    contain the Oct. 7 viscoelastic/BVP material as a normal Chapter 2 section.
  - Therefore the derivations and practice below are course-aligned supplemental material,
    not falsely presented as exact O’Neil exercises. Zill is used only for topic alignment.
*/

const lesson7CoreTag = '<span class="supplementalTag">Core · Oct. 7 syllabus · engineering applications</span>';
const lesson7ExplainTag = '<span class="supplementalTag">Expanded explanation · model first, algebra second</span>';
const lesson7RefTag = '<span class="supplementalTag">Reference alignment · Zill §3.8–3.9</span>';
const lesson7SupplementTag = '<span class="supplementalTag">Course-aligned supplemental · not an O’Neil textbook exercise</span>';

function l7Practice(number,title,prompt,solution){
  return {
    type:"bookproblem",
    bookSection:"Oct. 7",
    practiceLabel:"Course application mastery · Oct. 7",
    title:`Course Practice ${number} · ${title}`,
    prompt,
    solution
  };
}

const lesson7PracticeScreens = [
  l7Practice(1,"Build the RLC model",
    `<p>A series circuit contains an inductor \\(L\\), resistor \\(R\\), capacitor \\(C\\), and applied voltage \\(E(t)\\). Let \\(q(t)\\) be capacitor charge and \\(i(t)=q'(t)\\) the current. Derive the governing second-order ODE and state suitable initial data.</p>`,
    `<p><b>1. Write each voltage drop.</b></p>
     <div class="eq">\\[V_L=L\\frac{di}{dt}=Lq'',\\qquad V_R=Ri=Rq',\\qquad V_C=\\frac{q}{C}.\\]</div>
     <p><b>2. Apply Kirchhoff's voltage law.</b> The sum of the drops equals the source:</p>
     <div class="whybox"><div class="eq">\\[\\boxed{Lq''+Rq'+\\frac1Cq=E(t)}.\\]</div></div>
     <p><b>3. Initial data.</b> A second-order circuit IVP is naturally specified by</p><div class="eq">\\[q(0)=q_0,\\qquad q'(0)=i(0)=i_0.\\]</div>
     <p>The first condition is initial capacitor charge; the second is initial current.</p>`),

  l7Practice(2,"Free underdamped RLC response",
    `<p>Solve the source-free circuit model</p><div class="eq">\\[q''+4q'+13q=0,\\qquad q(0)=1,\\quad i(0)=q'(0)=0.\\]</div><p>Classify the transient and find both \\(q(t)\\) and \\(i(t)\\).</p>`,
    `<p>The characteristic equation is</p><div class="eq">\\[r^2+4r+13=0,\\]</div><p>with roots \\(-2\\pm3i\\). The response is underdamped:</p><div class="eq">\\[q=e^{-2t}(c_1\\cos3t+c_2\\sin3t).\\]</div>
     <p>From \\(q(0)=1\\), \\(c_1=1\\). Differentiate and evaluate at zero:</p><div class="eq">\\[q'(0)=-2c_1+3c_2=0\\Rightarrow c_2=\\frac23.\\]</div>
     <div class="whybox"><div class="eq">\\[\\boxed{q=e^{-2t}(\\cos3t+\\tfrac23\\sin3t)}.\\]</div></div>
     <p>Differentiating the simplified expression gives</p><div class="eq">\\[\\boxed{i=q'=-\\frac{13}{3}e^{-2t}\\sin3t}.\\]</div><p>Charge oscillates about zero while the envelope decays like \\(e^{-2t}\\).</p>`),

  l7Practice(3,"RLC circuit with a DC source",
    `<p>Solve</p><div class="eq">\\[q''+3q'+2q=10,\\qquad q(0)=0,\\quad q'(0)=0.\\]</div><p>Identify the steady-state charge and the transient part.</p>`,
    `<p>The homogeneous roots are \\(-1,-2\\), so \\(q_h=c_1e^{-t}+c_2e^{-2t}\\). A constant particular solution \\(q_p=A\\) gives \\(2A=10\\), hence \\(A=5\\).</p>
     <p>Thus</p><div class="eq">\\[q=5+c_1e^{-t}+c_2e^{-2t}.\\]</div>
     <p>The conditions give \\(c_1+c_2=-5\\) and \\(-c_1-2c_2=0\\), so \\(c_1=-10\\), \\(c_2=5\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{q(t)=5-10e^{-t}+5e^{-2t}}.\\]</div></div>
     <p>The steady-state charge is \\(5\\). The exponentials are the transient and vanish as \\(t\\to\\infty\\). The current is</p><div class="eq">\\[i(t)=10e^{-t}-10e^{-2t}.\\]</div>`),

  l7Practice(4,"Classify an RLC transient",
    `<p>A source-free series RLC circuit has \\(L=2\\), \\(R=3\\), and \\(C=1/5\\). Without solving for the constants, classify the transient as over-, critically, or underdamped.</p>`,
    `<p>The characteristic equation is</p><div class="eq">\\[Lr^2+Rr+\\frac1C=0.\\]</div>
     <p>Its discriminant is</p><div class="eq">\\[\\Delta=R^2-\\frac{4L}{C}=9-4(2)(5)=9-40=-31<0.\\]</div>
     <div class="whybox"><b>Classification:</b> underdamped. The roots are a complex-conjugate pair with negative real part, so the charge/current oscillate inside a decaying exponential envelope.</div>`),

  l7Practice(5,"Electrical resonance in the zero-resistance idealization",
    `<p>Solve the ideal LC model</p><div class="eq">\\[q''+9q=3\\cos3t,\\qquad q(0)=0,\\quad q'(0)=0.\\]</div><p>Explain why this is resonant.</p>`,
    `<p>The natural frequency is \\(\\omega_0=3\\), exactly equal to the forcing frequency. Since \\(\\cos3t\\) is already a homogeneous mode, the ordinary trial overlaps the homogeneous solution.</p>
     <p>Using the resonance rule gives</p><div class="eq">\\[q_p=\\frac12t\\sin3t.\\]</div>
     <p>This particular solution already satisfies both zero initial conditions, so no homogeneous correction is required:</p>
     <div class="whybox"><div class="eq">\\[\\boxed{q(t)=\\frac12t\\sin3t}.\\]</div><p>The linearly growing envelope is the same mathematical mechanism as undamped mechanical resonance.</p></div>`),

  l7Practice(6,"Maxwell stress relaxation",
    `<p>A Maxwell element has spring modulus \\(E=1000\\,\\text{MPa}\\) and dashpot viscosity \\(\\eta=5000\\,\\text{MPa}\\cdot\\text{s}\\). An instantaneous strain \\(\\varepsilon_0=0.01\\) is imposed and then held fixed. Find the stress for \\(t>0\\).</p>`,
    `<p>For a Maxwell element,</p><div class="eq">\\[\\sigma'+\\frac{E}{\\eta}\\sigma=E\\varepsilon'.\\]</div>
     <p>After the strain has been imposed and held, \\(\\varepsilon'=0\\) for \\(t>0\\), so</p><div class="eq">\\[\\sigma'+\\frac1\\tau\\sigma=0,\\qquad \\tau=\\frac{\\eta}{E}=5\\text{ s}.\\]</div>
     <p>The spring initially carries \\(\\sigma(0^+)=E\\varepsilon_0=10\\,\\text{MPa}\\). Therefore</p>
     <div class="whybox"><div class="eq">\\[\\boxed{\\sigma(t)=10e^{-t/5}\\ \\text{MPa}}.\\]</div><p>The stress relaxes to zero while the total strain remains fixed.</p></div>`),

  l7Practice(7,"Maxwell creep under constant stress",
    `<p>Use the same Maxwell element, \\(E=1000\\,\\text{MPa}\\), \\(\\eta=5000\\,\\text{MPa}\\cdot\\text{s}\\). A constant tensile stress \\(\\sigma_0=10\\,\\text{MPa}\\) is applied for \\(t>0\\). Find the strain history.</p>`,
    `<p>In series, total strain is spring strain plus dashpot strain. Under constant stress, the spring strain is \\(\\sigma_0/E\\), while the dashpot strain rate is \\(\\sigma_0/\\eta\\).</p>
     <div class="eq">\\[\\varepsilon(t)=\\frac{\\sigma_0}{E}+\\frac{\\sigma_0}{\\eta}t.\\]</div>
     <p>Insert the numbers:</p><div class="whybox"><div class="eq">\\[\\boxed{\\varepsilon(t)=0.01+0.002t}.\\]</div><p>The Maxwell model predicts an immediate elastic extension followed by unbounded linear creep.</p></div>`),

  l7Practice(8,"Kelvin–Voigt creep and time constant",
    `<p>A Kelvin–Voigt element has \\(E=1000\\,\\text{MPa}\\), \\(\\eta=5000\\,\\text{MPa}\\cdot\\text{s}\\), and starts with zero strain. At \\(t=0\\), a constant stress \\(\\sigma_0=10\\,\\text{MPa}\\) is applied. Find \\(\\varepsilon(t)\\) and the time to reach 95% of its long-term strain.</p>`,
    `<p>Kelvin–Voigt gives</p><div class="eq">\\[\\eta\\varepsilon'+E\\varepsilon=\\sigma_0.\\]</div>
     <p>The time constant is \\(\\tau=\\eta/E=5\\text{ s}\\), and the steady strain is \\(\\sigma_0/E=0.01\\). With \\(\\varepsilon(0)=0\\),</p><div class="eq">\\[\\boxed{\\varepsilon(t)=0.01(1-e^{-t/5})}.\\]</div>
     <p>For 95% response, \\(1-e^{-t/5}=0.95\\), so \\(e^{-t/5}=0.05\\):</p><div class="eq">\\[t=5\\ln20\\approx14.98\\text{ s}.\\]</div>`),

  l7Practice(9,"Choose the viscoelastic model",
    `<p>Model A shows stress that exponentially decays under a held strain. Model B shows strain that approaches a finite asymptote under a held stress. Which elementary viscoelastic models reproduce these behaviors?</p>`,
    `<p><b>Model A:</b> Maxwell. A held strain gives \\(\\varepsilon'=0\\), so the Maxwell constitutive equation reduces to exponential stress relaxation.</p>
     <p><b>Model B:</b> Kelvin–Voigt. Constant stress gives a first-order linear ODE whose solution approaches \\(\\sigma_0/E\\) exponentially.</p>
     <div class="whybox">Maxwell is the simplest elementary model for stress relaxation; Kelvin–Voigt is the simplest elementary model for delayed, bounded creep.</div>`),

  l7Practice(10,"A unique two-point BVP",
    `<p>Solve</p><div class="eq">\\[y''=-2,\\qquad y(0)=0,\\quad y(1)=0.\\]</div>`,
    `<p>Integrate twice:</p><div class="eq">\\[y'=-2x+c_1,\\qquad y=-x^2+c_1x+c_2.\\]</div>
     <p>From \\(y(0)=0\\), \\(c_2=0\\). From \\(y(1)=0\\), \\(-1+c_1=0\\), so \\(c_1=1\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=x(1-x)}.\\]</div><p>The two boundary conditions determine one unique member of the two-constant family.</p></div>`),

  l7Practice(11,"A BVP with infinitely many solutions",
    `<p>Determine the solution set of</p><div class="eq">\\[y''+y=0,\\qquad y(0)=0,\\quad y(\\pi)=0.\\]</div>`,
    `<p>The general solution is \\(y=c_1\\cos x+c_2\\sin x\\). The first boundary condition gives \\(c_1=0\\). Then</p><div class="eq">\\[y(\\pi)=c_2\\sin\\pi=0\\]</div><p>for <em>every</em> value of \\(c_2\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=c_2\\sin x,\\qquad c_2\\text{ arbitrary}}.\\]</div><p>This BVP has infinitely many solutions.</p></div>`),

  l7Practice(12,"A BVP with no solution",
    `<p>Determine whether</p><div class="eq">\\[y''+y=0,\\qquad y(0)=0,\\quad y(\\pi)=1\\]</div><p>has a solution.</p>`,
    `<p>Again, \\(y=c_1\\cos x+c_2\\sin x\\). The condition \\(y(0)=0\\) forces \\(c_1=0\\), so every candidate has form \\(y=c_2\\sin x\\).</p>
     <p>But then \\(y(\\pi)=c_2\\sin\\pi=0\\) for every \\(c_2\\), which can never equal 1.</p>
     <div class="whybox"><b>No solution.</b> The second boundary condition is incompatible with the solution family selected by the first.</div>`),

  l7Practice(13,"A mixed two-point BVP",
    `<p>Solve</p><div class="eq">\\[y''-y=0,\\qquad y(0)=1,\\quad y'(1)=0.\\]</div>`,
    `<p>A convenient general solution is \\(y=A\\cosh x+B\\sinh x\\). From \\(y(0)=1\\), \\(A=1\\).</p>
     <p>Differentiate:</p><div class="eq">\\[y'=\\sinh x+B\\cosh x.\\]</div>
     <p>The second condition gives \\(\\sinh1+B\\cosh1=0\\), hence \\(B=-\\tanh1\\).</p>
     <p>Therefore</p><div class="eq">\\[y=\\cosh x-\\tanh1\\,\\sinh x.\\]</div>
     <p>Using the hyperbolic subtraction identity, this is</p><div class="whybox"><div class="eq">\\[\\boxed{y=\\frac{\\cosh(1-x)}{\\cosh1}}.\\]</div></div>`),

  l7Practice(14,"Boundary-system determinant",
    `<p>Let \\(y_1,y_2\\) be an independent basis for a homogeneous second-order ODE. For the boundary conditions \\(y(a)=0\\), \\(y(b)=0\\), write the linear system for \\(c_1,c_2\\) and identify the determinant that decides whether the only homogeneous BVP solution is the zero solution.</p>`,
    `<p>Write \\(y=c_1y_1+c_2y_2\\). The two boundary conditions give</p><div class="eq">\\[\\begin{cases}c_1y_1(a)+c_2y_2(a)=0,\\\\c_1y_1(b)+c_2y_2(b)=0.\\end{cases}\\]</div>
     <p>The coefficient determinant is</p><div class="eq">\\[D=y_1(a)y_2(b)-y_2(a)y_1(b).\\]</div>
     <div class="whybox"><p>If \\(D\\neq0\\), the only homogeneous BVP solution is \\(c_1=c_2=0\\), and the corresponding forced BVP has at most one solution.</p><p>If \\(D=0\\), a nontrivial homogeneous solution satisfies both boundary conditions. A forced BVP can then be incompatible (no solution) or compatible with a free homogeneous direction (infinitely many).</p></div>`)
];

function l7ClonePractice(number){
  const source=lesson7PracticeScreens.find(s=>s.title.startsWith(`Course Practice ${number} ·`));
  return source?{...source,inlineBookPractice:true,practiceLabel:"Course application practice · Oct. 7"}:null;
}
function l7AddPractice(unitId,title,numbers){
  const unit=lesson7Units.find(u=>u.id===unitId);
  if(!unit)return;
  const screens=numbers.map(l7ClonePractice).filter(Boolean);
  if(screens.length)unit.lessons.push({title,screens});
}

const lesson7BaseUnits = [
  {
    id:"l7-map",courseLesson:7,color:"#4059ad",badge:"1",label:"Source map",
    title:"Oct. 7 Engineering Models: What Connects Them?",subtitle:"Three applications, one linear-ODE toolkit",
    desc:"Map the syllabus precisely, distinguish textbook/web/reference sources from supplemental derivations, and see the common modeling structure before entering the details.",
    lessons:[{title:"Syllabus and source alignment",screens:[
      {type:"teach",title:"The Oct. 7 syllabus has three explicit targets",html:`
        <p>${lesson7CoreTag}</p>
        <div class="reviewGrid"><div class="mini"><b>RLC circuits</b><p>Turn Kirchhoff's voltage law into a second-order ODE for charge/current.</p></div><div class="mini"><b>Viscoelasticity</b><p>Derive the Maxwell and Kelvin–Voigt constitutive ODEs from springs and dashpots.</p></div><div class="mini"><b>Two-point BVPs</b><p>Impose conditions at different points and understand why uniqueness behaves differently from an IVP.</p></div></div>`},
      {type:"teach",title:"What the cited sources actually support",html:`
        <p>${lesson7RefTag}</p>
        <p>The official outline points to <b>O’Neil's Spring Motion web module</b> and <b>Zill §3.8–3.9</b>. In Zill's organization, §3.8 contains linear initial-value models including the <b>series-circuit analogue</b>, while §3.9 treats <b>linear boundary-value models</b>.</p>
        <p>The uploaded O’Neil PDF lists Spring Motion as a separate web module rather than embedding it as a normal Chapter 2 section. It also does not supply a Maxwell/Kelvin–Voigt exercise set for this date.</p>
        <div class="warn"><b>Source-label rule for this lesson:</b> concepts required by the syllabus are taught fully, but the custom exercises are labeled <em>course application practice</em>, not “O’Neil problems.” Nothing is fabricated as a textbook exercise.</div>`},
      {type:"teach",title:"The common engineering workflow",html:`
        <p>${lesson7ExplainTag}</p>
        <div class="whybox"><ol><li>Choose the state variable and sign convention.</li><li>Write a physical balance law: voltage balance, force balance, or a constitutive relation.</li><li>Translate each physical element into a mathematical term.</li><li>Check units.</li><li>Identify the resulting ODE type and side conditions.</li><li>Solve with the methods from Lessons 2–6.</li><li>Interpret transients, steady state, characteristic time, or boundary behavior.</li><li>Substitute back and check the conditions.</li></ol></div>`}
    ]}]
  },

  {
    id:"l7-rlc-model",courseLesson:7,color:"#2e7d69",badge:"2",label:"RLC model",
    title:"Series RLC Circuits from Kirchhoff's Law",subtitle:"Charge is the displacement analogue; current is its derivative",
    desc:"Derive Lq''+Rq'+q/C=E(t) from component laws, define every variable and unit, and connect the electrical model directly to spring–mass–damper motion.",
    lessons:[{title:"Derive the circuit equation",screens:[
      {type:"teach",title:"Start with the physical story",html:`
        <p>${lesson7ExplainTag}</p>
        <p>In a <b>series</b> RLC circuit, the same current \\(i(t)\\) passes through the inductor, resistor, and capacitor. Let \\(q(t)\\) be capacitor charge, so</p><div class="eq">\\[i(t)=q'(t).\\]</div>
        <p>An applied electromotive force \\(E(t)\\) drives the loop. Kirchhoff's voltage law says the sum of voltage drops around the loop equals that applied voltage.</p>`},
      {type:"teach",title:"Translate each component",html:`
        <p>${lesson7CoreTag}</p>
        <div class="reviewGrid"><div class="mini"><b>Inductor</b><div class="eq">\\[V_L=L i'=Lq''\\]</div><p>Opposes changes in current.</p></div><div class="mini"><b>Resistor</b><div class="eq">\\[V_R=Ri=Rq'\\]</div><p>Dissipates electrical energy.</p></div><div class="mini"><b>Capacitor</b><div class="eq">\\[V_C=q/C\\]</div><p>Stores electric-field energy.</p></div></div>
        <p>Add the drops:</p><div class="whybox"><div class="eq">\\[\\boxed{Lq''+Rq'+\\frac1Cq=E(t)}.\\]</div></div><p><b>Units check:</b> \\(q\\) is measured in coulombs (C), \\(i=q'\\) in amperes (A), \\(L\\) in henries (H), \\(R\\) in ohms (Ω), \\(C\\) in farads (F), and \\(E\\) in volts (V). Each term on the left has units of volts, so the balance is dimensionally consistent.</p>`},
      {type:"teach",title:"The mechanical–electrical analogy",html:`
        <p>${lesson7RefTag}</p>
        <div class="reviewGrid"><div class="mini"><b>Mechanical</b><div class="eq">\\[my''+cy'+ky=F(t)\\]</div></div><div class="mini"><b>Electrical</b><div class="eq">\\[Lq''+Rq'+(1/C)q=E(t)\\]</div></div></div>
        <p>The direct correspondence is</p><div class="eq">\\[m\\leftrightarrow L,\\quad c\\leftrightarrow R,\\quad k\\leftrightarrow1/C,\\quad y\\leftrightarrow q,\\quad y'\\leftrightarrow i,\\quad F\\leftrightarrow E.\\]</div>
        <div class="beginner"><b>Why this is useful:</b> the same characteristic-root logic, damping classification, resonance ideas, transient/steady-state split, and IVP workflow apply to both systems.</div>`},
      {type:"quiz",title:"Pick the state derivative",q:`If \\(q(t)\\) is capacitor charge, which relation defines the series current?`,options:[`i=q′`,`i=q″`,`i=q/C`],answer:0,why:`Current is the time rate of change of charge.`}
    ]}]
  },

  {
    id:"l7-rlc-response",courseLesson:7,color:"#7651b8",badge:"3",label:"Circuit response",
    title:"RLC Transients, Steady State, and Electrical Damping",subtitle:"Classify first, then solve exactly as a second-order IVP",
    desc:"Normalize the circuit equation, classify the free transient with its discriminant, distinguish transient from forced steady response, and connect zero-resistance resonance to Lesson 6.",
    lessons:[{title:"Solve and interpret",screens:[
      {type:"teach",title:"Free circuit response",html:`
        <p>${lesson7CoreTag}</p>
        <p>With the source removed,</p><div class="eq">\\[Lq''+Rq'+\\frac1Cq=0.\\]</div>
        <p>The characteristic equation is</p><div class="eq">\\[Lr^2+Rr+\\frac1C=0.\\]</div>
        <p>so the electrical damping discriminant is</p><div class="eq">\\[\\boxed{\\Delta=R^2-\\frac{4L}{C}}.\\]</div>
        <p>Positive, zero, and negative \\(\\Delta\\) give overdamped, critically damped, and underdamped transients, respectively — exactly analogous to the mechanical cases.</p>`},
      {type:"teach",title:"Natural and damped frequencies",html:`
        <p>With \\(R=0\\), the ideal LC natural angular frequency is</p><div class="eq">\\[\\omega_0=\\frac1{\\sqrt{LC}}.\\]</div>
        <p>For an underdamped RLC circuit,</p><div class="eq">\\[\\omega_d=\\sqrt{\\frac1{LC}-\\frac{R^2}{4L^2}}.\\]</div>
        <p>The free charge therefore has the form</p><div class="eq">\\[q=e^{-Rt/(2L)}[c_1\\cos(\\omega_dt)+c_2\\sin(\\omega_dt)].\\]</div>`},
      {type:"teach",title:"Transient plus steady response",html:`
        <p>${lesson7ExplainTag}</p>
        <p>For a forced circuit, the solution again splits as</p><div class="eq">\\[q=q_h+q_p.\\]</div>
        <p>The homogeneous part \\(q_h\\) is the circuit's <b>transient</b>. If \\(R>0\\), its characteristic roots have negative real part and it decays. The particular part is the response maintained by the source and is often called the <b>steady-state response</b>.</p>
        <div class="whybox">This is the same mathematical structure you saw in Lesson 4 and the same physical transient/steady-state interpretation used in engineering systems.</div>`},
      {type:"teach",title:"Zero resistance can reproduce ideal resonance",html:`
        <p>If \\(R=0\\) and a sinusoidal source drives the circuit at \\(\\omega=1/\\sqrt{LC}\\), the forcing overlaps the homogeneous frequency. The undetermined-coefficients particular solution acquires a factor \\(t\\), just as in Lesson 6's undamped spring resonance.</p>
        <div class="warn"><b>Physical caveat:</b> real circuits contain resistance and other losses. The ideal unbounded-amplitude model is a limiting mathematical idealization, just as zero damping is for the spring.</div>`},
      {type:"quiz",title:"Circuit damping classification",q:`For a source-free RLC circuit, which quantity decides whether the characteristic roots are real distinct, repeated, or complex?`,options:[`R²−4L/C`,`LC−R`,`R/C`],answer:0,why:`It is the discriminant of Lr²+Rr+1/C=0.`}
    ]}]
  },

  {
    id:"l7-maxwell",courseLesson:7,color:"#b35f4a",badge:"4",label:"Maxwell model",
    title:"Maxwell Viscoelasticity: Spring and Dashpot in Series",subtitle:"Same stress, additive strain — a first-order constitutive ODE",
    desc:"Define stress and strain, derive the Maxwell relation from elementary components, and understand stress relaxation and creep before solving the formulas.",
    lessons:[{title:"Series viscoelastic model",screens:[
      {type:"teach",title:"Stress, strain, spring, dashpot",html:`
        <p>${lesson7CoreTag}</p>
        <p><b>Stress</b> \\(\\sigma\\) is force per area. <b>Strain</b> \\(\\varepsilon\\) is a dimensionless relative deformation.</p>
        <p>An ideal elastic spring obeys Hooke's law</p><div class="eq">\\[\\sigma=E\\varepsilon_s,\\]</div><p>where \\(E\\) is an elastic modulus. A Newtonian dashpot obeys</p><div class="eq">\\[\\sigma=\\eta\\varepsilon_d',\\]</div><p>where \\(\\eta\\) is viscosity.</p>`},
      {type:"teach",title:"Derive the Maxwell equation",html:`
        <p>${lesson7ExplainTag}</p>
        <p>In a <b>series</b> connection, the same force — hence the same stress — acts through both elements, while the strains add:</p><div class="eq">\\[\\varepsilon=\\varepsilon_s+\\varepsilon_d.\\]</div>
        <p>Differentiate:</p><div class="eq">\\[\\varepsilon'=\\varepsilon_s'+\\varepsilon_d'=\\frac{\\sigma'}{E}+\\frac{\\sigma}{\\eta}.\\]</div>
        <p>Multiply by \\(E\\):</p><div class="whybox"><div class="eq">\\[\\boxed{\\sigma'+\\frac{E}{\\eta}\\sigma=E\\varepsilon'}.\\]</div></div>
        <p>The natural material time scale is</p><div class="eq">\\[\\tau=\\frac{\\eta}{E}.\\]</div>`},
      {type:"teach",title:"Stress relaxation: hold strain fixed",html:`
        <p>After a strain has been imposed and held constant, \\(\\varepsilon'=0\\). The Maxwell equation becomes</p><div class="eq">\\[\\sigma'+\\frac1\\tau\\sigma=0.\\]</div>
        <p>Therefore</p><div class="eq">\\[\\boxed{\\sigma(t)=\\sigma(0^+)e^{-t/\\tau}}.\\]</div>
        <div class="beginner"><b>Physical story:</b> the spring initially carries stress; over time the dashpot flows, allowing the spring to unload even though the total deformation stays fixed.</div>`},
      {type:"teach",title:"Creep: hold stress fixed",html:`
        <p>For constant \\(\\sigma=\\sigma_0\\), \\(\\sigma'=0\\), so</p><div class="eq">\\[\\varepsilon'=\\frac{\\sigma_0}{\\eta}.\\]</div>
        <p>Including the instantaneous spring extension gives</p><div class="eq">\\[\\boxed{\\varepsilon(t)=\\frac{\\sigma_0}{E}+\\frac{\\sigma_0}{\\eta}t}.\\]</div>
        <p>The model therefore predicts continuing linear creep under sustained stress.</p>`},
      {type:"quiz",title:"Series rule",q:`In a Maxwell element, what is common to the spring and dashpot, and what adds?`,options:[`Stress is common; strains add`,`Strain is common; stresses add`,`Both stress and strain are common`],answer:0,why:`Series elements carry the same force/stress, while their elongations/strains add.`}
    ]}]
  },

  {
    id:"l7-kelvin",courseLesson:7,color:"#d27a42",badge:"5",label:"Kelvin–Voigt",
    title:"Kelvin–Voigt Viscoelasticity: Spring and Dashpot in Parallel",subtitle:"Same strain, additive stress — delayed elastic deformation",
    desc:"Derive the Kelvin–Voigt constitutive equation, solve constant-stress creep, compare it with Maxwell response, and understand the role of the retardation time η/E.",
    lessons:[{title:"Parallel viscoelastic model",screens:[
      {type:"teach",title:"Derive the Kelvin–Voigt equation",html:`
        <p>${lesson7ExplainTag}</p>
        <p>In a <b>parallel</b> arrangement, the spring and dashpot experience the same strain \\(\\varepsilon\\), while their stresses add:</p><div class="eq">\\[\\sigma=\\sigma_s+\\sigma_d.\\]</div>
        <p>Using \\(\\sigma_s=E\\varepsilon\\) and \\(\\sigma_d=\\eta\\varepsilon'\\),</p><div class="whybox"><div class="eq">\\[\\boxed{\\sigma=E\\varepsilon+\\eta\\varepsilon'}.\\]</div></div>`},
      {type:"teach",title:"Constant-stress creep is a first-order IVP",html:`
        <p>Apply constant stress \\(\\sigma_0\\):</p><div class="eq">\\[\\eta\\varepsilon'+E\\varepsilon=\\sigma_0.\\]</div>
        <p>Divide by \\(\\eta\\) and define \\(\\tau=\\eta/E\\):</p><div class="eq">\\[\\varepsilon'+\\frac1\\tau\\varepsilon=\\frac{\\sigma_0}{\\eta}.\\]</div>
        <p>For an initially unstrained element, the first-order linear solution is</p><div class="eq">\\[\\boxed{\\varepsilon(t)=\\frac{\\sigma_0}{E}(1-e^{-t/\\tau})}.\\]</div>`},
      {type:"teach",title:"Read the response before doing algebra",html:`
        <p>At \\(t=0\\), the ideal dashpot prevents an instantaneous strain jump, so \\(\\varepsilon(0)=0\\). As time grows,</p><div class="eq">\\[\\varepsilon(t)\\to\\frac{\\sigma_0}{E}.\\]</div>
        <p>So Kelvin–Voigt creep is <b>delayed but bounded</b>. The exponential time scale \\(\\tau=\\eta/E\\) is usually called the <b>retardation time</b> (or creep time constant); it controls how quickly the strain approaches its elastic limit. By contrast, the same ratio \\(\\eta/E\\) in the Maxwell model is its stress-relaxation time.</p>`},
      {type:"teach",title:"Maxwell versus Kelvin–Voigt",html:`
        <div class="reviewGrid"><div class="mini"><b>Maxwell · series</b><p>Same stress, strains add. Captures exponential stress relaxation and unbounded creep under constant stress.</p></div><div class="mini"><b>Kelvin–Voigt · parallel</b><p>Same strain, stresses add. Captures delayed, bounded creep under constant stress.</p></div></div>
        <div class="warn"><b>Do not swap the connection rules.</b> Most derivation errors come from treating a series assembly like a parallel one or vice versa.</div>`},
      {type:"quiz",title:"Long-time Kelvin–Voigt strain",q:`Under a constant stress \\(\\sigma_0\\), what does an initially unstrained Kelvin–Voigt element approach as \\(t\\to\\infty\\)?`,options:[`σ₀/E`,`Infinity`,`0`],answer:0,why:`The dashpot contribution to stress vanishes as the strain rate tends to zero, leaving the spring relation σ₀=Eε.`}
    ]}]
  },

  {
    id:"l7-bvp",courseLesson:7,color:"#6a6f7b",badge:"6",label:"Two-point BVPs",
    title:"Two-Point Boundary-Value Problems",subtitle:"Conditions at two locations change the uniqueness story",
    desc:"Distinguish IVPs from BVPs, learn common boundary-condition types, and see concrete unique, none, and infinitely-many cases rather than assuming the IVP theorem still applies.",
    lessons:[{title:"From initial values to boundaries",screens:[
      {type:"teach",title:"What makes a problem a two-point BVP?",html:`
        <p>${lesson7RefTag}</p>
        <p>An IVP places the value and slope at the <b>same point</b>, such as</p><div class="eq">\\[y(a)=A,\\qquad y'(a)=B.\\]</div>
        <p>A two-point BVP imposes side conditions at <b>different points</b>, for example</p><div class="eq">\\[y(a)=A,\\qquad y(b)=B,\\qquad a\\neq b.\\]</div>
        <p>Zill §3.9 motivates this distinction through steady-state and static physical systems, where information is naturally prescribed at spatial boundaries rather than at one initial time.</p>`},
      {type:"teach",title:"Boundary conditions can involve values, slopes, or combinations",html:`
        <p>${lesson7CoreTag}</p>
        <div class="reviewGrid"><div class="mini"><b>Value condition</b><div class="eq">\\[y(a)=A\\]</div><p>Often called a Dirichlet-type condition.</p></div><div class="mini"><b>Slope/flux condition</b><div class="eq">\\[y'(b)=B\\]</div><p>Often called a Neumann-type condition.</p></div><div class="mini"><b>Mixed condition</b><div class="eq">\\[\\alpha y+\\beta y'=\\gamma\\]</div><p>A linear combination at a boundary.</p></div></div>
        <p>The syllabus only requires two-point BVPs here; these names are useful terminology, not a new solution method.</p>`},
      {type:"teach",title:"Why the IVP uniqueness theorem does not transfer automatically",html:`
        <p>${lesson7ExplainTag}</p>
        <p>For a regular second-order linear ODE, specifying \\(y(a)\\) and \\(y'(a)\\) fixes a unique local/global solution on the regular interval. But \\(y(a)\\) and \\(y(b)\\) do not directly specify the initial slope.</p>
        <div class="whybox"><b>A two-point BVP can have:</b> exactly one solution, no solution, or infinitely many solutions. You must solve the boundary equations and check compatibility.</div>`},
      {type:"quiz",title:"IVP or BVP?",q:`Which set of side conditions is a two-point boundary-value specification?`,options:[`y(0)=1 and y(2)=3`,`y(0)=1 and y′(0)=3`,`y(2)=3 only`],answer:0,why:`The conditions are imposed at two distinct points, 0 and 2.`}
    ]}]
  },

  {
    id:"l7-bvp-structure",courseLesson:7,color:"#3f7f8f",badge:"7",label:"BVP solvability",
    title:"Why a BVP Can Have One, None, or Infinitely Many Solutions",subtitle:"The boundary conditions form their own 2×2 linear system",
    desc:"Turn boundary conditions into equations for the homogeneous constants, use the boundary determinant, and build an error-proof BVP workflow with explicit examples.",
    lessons:[{title:"Boundary-system viewpoint",screens:[
      {type:"teach",title:"Apply boundary conditions after solving the ODE",html:`
        <p>${lesson7ExplainTag}</p>
        <p>Suppose the differential equation has general solution</p><div class="eq">\\[y=c_1y_1+c_2y_2+y_p.\\]</div>
        <p>Two linear boundary conditions produce two linear equations for \\(c_1,c_2\\). This looks like fitting IVP constants, but the coefficient matrix now uses data at <em>two different points</em>.</p>
        <div class="whybox"><b>Workflow:</b><ol><li>Solve the differential equation.</li><li>Write the complete two-constant family.</li><li>Apply both boundary conditions.</li><li>Solve the resulting 2×2 system.</li><li>If that system is singular, check compatibility instead of dividing by zero.</li><li>Verify the ODE and both boundary conditions.</li></ol></div>`},
      {type:"teach",title:"The boundary determinant",html:`
        <p>For the homogeneous conditions \\(y(a)=0\\), \\(y(b)=0\\) and basis \\(y_1,y_2\\),</p><div class="eq">\\[\\begin{bmatrix}y_1(a)&y_2(a)\\\\y_1(b)&y_2(b)\\end{bmatrix}\\begin{bmatrix}c_1\\\\c_2\\end{bmatrix}=\\begin{bmatrix}0\\\\0\\end{bmatrix}.\\]</div>
        <p>The determinant is</p><div class="eq">\\[D=y_1(a)y_2(b)-y_2(a)y_1(b).\\]</div>
        <p>If \\(D\\neq0\\), only the zero homogeneous solution satisfies both boundaries, so a corresponding forced BVP cannot have two distinct solutions. If \\(D=0\\), nontrivial homogeneous solutions satisfy the boundaries and compatibility becomes the issue.</p>`},
      {type:"teach",title:"Three miniature examples",html:`
        <div class="reviewGrid"><div class="mini"><b>Unique</b><div class="eq">\\[y''=-2,\\ y(0)=y(1)=0\\]</div><p>Gives \\(y=x(1-x)\\).</p></div><div class="mini"><b>Infinitely many</b><div class="eq">\\[y''+y=0,\\ y(0)=y(\\pi)=0\\]</div><p>Every \\(C\\sin x\\) works.</p></div><div class="mini"><b>None</b><div class="eq">\\[y''+y=0,\\ y(0)=0,\\ y(\\pi)=1\\]</div><p>Every candidate satisfying the first condition is zero at \\(\\pi\\), so the second is impossible.</p></div></div>`},
      {type:"teach",title:"Physical interpretation of two-point data",html:`
        <p>${lesson7CoreTag}</p>
        <p>Time-evolution problems naturally give an initial state. Spatial equilibrium problems often give information at two ends instead: a displacement at each support, a temperature at each boundary, a slope at one end and a displacement at another, and so on.</p>
        <div class="beginner"><b>Modeling lesson:</b> the differential equation describes what happens inside the domain; the boundary conditions describe how the domain is attached to or interacts with its surroundings.</div>`},
      {type:"quiz",title:"Singular boundary system",q:`If the 2×2 system for the BVP constants has determinant zero, what should you do next?`,options:[`Check whether the boundary equations are compatible`,`Declare exactly one solution`,`Change the differential equation`],answer:0,why:`A singular linear system may be inconsistent (no solution) or dependent (infinitely many); compatibility decides which.`}
    ]}]
  }
];

const lesson7TransferScreens = [
  l7Practice(15,"Transfer: choose the model before calculating",
    `<p>${lesson7SupplementTag}<br>Three experiments are described.</p><ol><li>A capacitor charge oscillates while its envelope decays.</li><li>A specimen is suddenly strained and its stress then decays exponentially.</li><li>A bar is held at specified displacements at its two ends.</li></ol><p>For each, identify the appropriate model family from this lesson and state the observation that makes that choice appropriate. No calculation is required.</p>`,
    `<p><b>1. Decaying electrical oscillation:</b> a source-free <b>underdamped RLC</b> model. The oscillation identifies complex characteristic roots; the decaying envelope identifies positive resistance/dissipation.</p><p><b>2. Stress decay after held strain:</b> the elementary <b>Maxwell</b> model. Held strain gives \\(\\varepsilon'=0\\), reducing the constitutive law to exponential stress relaxation.</p><p><b>3. Prescribed end displacements:</b> a <b>two-point boundary-value problem</b>. The data are imposed at two spatial locations rather than as value-and-slope data at one initial point.</p><div class="whybox"><b>Mastery target:</b> recognize the governing structure before reaching for a solution method.</div>`),
  l7Practice(16,"Transfer: dimensional audit of an RLC model",
    `<p>${lesson7SupplementTag}<br>A student writes \\(Lq''+Rq'+Cq=E(t)\\) for a series RLC circuit. Diagnose the modeling error using units, then write the corrected capacitor term.</p>`,
    `<p>Charge \\(q\\) has units C and capacitance \\(C\\) has units F. The capacitor voltage is</p><div class="eq">\\[V_C=\\frac{q}{C},\\]</div><p>which has units volts. By contrast, \\(Cq\\) has units F·C and cannot be added to voltage terms.</p><div class="whybox"><div class="eq">\\[\\boxed{Lq''+Rq'+\\frac{1}{C}q=E(t)}.\\]</div><p>A unit check catches the error before any ODE solving begins.</p></div>`),
  l7Practice(17,"Transfer: infer an RLC parameter from the damping regime",
    `<p>${lesson7SupplementTag}<br>A source-free series circuit has \\(L=1\\,\\mathrm H\\) and \\(C=1/4\\,\\mathrm F\\). Find the resistance that makes the circuit critically damped. State the repeated characteristic root.</p>`,
    `<p>Critical damping means the discriminant of</p><div class="eq">\\[Lr^2+Rr+\\frac1C=0\\]</div><p>is zero:</p><div class="eq">\\[R^2-\\frac{4L}{C}=0.\\]</div><p>With \\(L=1\\) and \\(C=1/4\\),</p><div class="eq">\\[R^2-16=0.\\]</div><p>Physical resistance is nonnegative, so \\(R=4\\,\\Omega\\). The repeated root is</p><div class="eq">\\[r=-\\frac{R}{2L}=-2\\,\\mathrm{s}^{-1}.\\]</div><div class="whybox"><div class="eq">\\[\\boxed{R=4\\,\\Omega,\\qquad r=-2\\,\\mathrm{s}^{-1}}.\\]</div></div>`),
  l7Practice(18,"Transfer: Maxwell versus Kelvin–Voigt from limiting behavior",
    `<p>${lesson7SupplementTag}<br>Two ideal materials are loaded by a constant stress \\(\\sigma_0\\). Material A jumps immediately to strain \\(\\sigma_0/E\\) and then creeps linearly forever. Material B starts at zero strain and approaches \\(\\sigma_0/E\\) exponentially. Identify each model and explain the connection rule responsible.</p>`,
    `<p><b>Material A is Maxwell.</b> Its spring and dashpot are in series: stress is common and strains add. The spring produces the immediate strain \\(\\sigma_0/E\\); the dashpot contributes \\(\\sigma_0 t/\\eta\\), so creep is unbounded.</p><p><b>Material B is Kelvin–Voigt.</b> Its elements are in parallel: strain is common and stresses add. The dashpot initially resists rapid deformation, and the strain approaches the spring limit \\(\\sigma_0/E\\) with time constant \\(\\eta/E\\).</p>`),
  l7Practice(19,"Transfer: determine BVP compatibility without solving twice",
    `<p>${lesson7SupplementTag}<br>For \\(y''+y=0\\), suppose \\(y(0)=0\\). Determine which of the following second conditions produce a unique solution, infinitely many solutions, or no solution: (a) \\(y(\\pi)=0\\); (b) \\(y(\\pi)=2\\); (c) \\(y(\\pi/2)=3\\).</p>`,
    `<p>From \\(y(0)=0\\), the general solution reduces to \\(y=C\\sin x\\).</p><p><b>(a)</b> \\(y(\\pi)=C\\sin\\pi=0\\) for every \\(C\\): <b>infinitely many</b>.</p><p><b>(b)</b> the same left side is always zero, so it cannot equal 2: <b>no solution</b>.</p><p><b>(c)</b> \\(y(\\pi/2)=C=3\\): <b>unique solution</b>, \\(y=3\\sin x\\).</p><div class="whybox">The differential equation did not change; only the boundary-condition equations changed from compatible with many constants, to incompatible, to compatible with exactly one constant. Matrix rank gives a formal language for this later in the course; you do not need it here.</div>`),
  l7Practice(20,"Transfer: full model-to-verification workflow",
    `<p>${lesson7SupplementTag}<br>An ideal Kelvin–Voigt element has \\(E=2\\,\\mathrm{MPa}\\), \\(\\eta=6\\,\\mathrm{MPa\\,s}\\), starts unstrained, and is subjected to a constant stress \\(\\sigma_0=8\\,\\mathrm{MPa}\\). Before solving, predict the initial and long-time strain. Then derive \\(\\varepsilon(t)\\), find the time to reach 90% of the limiting strain, and verify the initial/long-time behavior.</p>`,
    `<p><b>Prediction.</b> Kelvin–Voigt strain cannot jump instantly in the ideal model, so \\(\\varepsilon(0)=0\\). At long times \\(\\varepsilon'\\to0\\), leaving \\(E\\varepsilon=\\sigma_0\\), hence \\(\\varepsilon_\\infty=8/2=4\\).</p><p>The constitutive law is</p><div class="eq">\\[6\\varepsilon'+2\\varepsilon=8\\quad\\Rightarrow\\quad \\varepsilon'+\\frac13\\varepsilon=\\frac43.\\]</div><p>The time constant is \\(\\tau=\\eta/E=3\\,\\mathrm s\\). With zero initial strain,</p><div class="eq">\\[\\boxed{\\varepsilon(t)=4(1-e^{-t/3})}.\\]</div><p>For 90%, \\(1-e^{-t/3}=0.9\\), so</p><div class="eq">\\[\\boxed{t=3\\ln10\\approx6.91\\,\\mathrm s}.\\]</div><p><b>Verification.</b> At \\(t=0\\), the formula gives 0; as \\(t\\to\\infty\\), it tends to 4. Differentiation gives \\(\\varepsilon'=(4/3)e^{-t/3}\\), and substitution returns the constant stress 8 MPa.</p>`)
];

const lesson7Mastery = {
  id:"l7-mastery",courseLesson:7,color:"#9a3f69",badge:"8",label:"Application mastery",
  title:"Oct. 7 Engineering Application Mastery",subtitle:"6 distinct transfer problems · scratch space + hidden solutions",
  desc:"A non-repetitive mastery set that tests model recognition, dimensional reasoning, parameter inference, limiting behavior, BVP compatibility, and a complete model-to-verification workflow. These are clearly labeled original course problems, not O’Neil exercises.",
  lessons:[
    {title:"Recognition & model auditing",screens:lesson7TransferScreens.slice(0,2)},
    {title:"RLC & viscoelastic transfer",screens:lesson7TransferScreens.slice(2,4)},
    {title:"BVP & full workflow transfer",screens:lesson7TransferScreens.slice(4,6)}
  ]
};

const lesson7Units=[...lesson7BaseUnits,lesson7Mastery];

l7AddPractice("l7-rlc-model","Application practice · circuit modeling",[1]);
l7AddPractice("l7-rlc-response","Application practice · circuit response",[2,3,4,5]);
l7AddPractice("l7-maxwell","Application practice · Maxwell response",[6,7]);
l7AddPractice("l7-kelvin","Application practice · Kelvin–Voigt and model choice",[8,9]);
l7AddPractice("l7-bvp","Application practice · BVP existence behavior",[10,11,12]);
l7AddPractice("l7-bvp-structure","Application practice · mixed boundaries and determinant",[13,14]);

if(!units.some(u=>u&&u.id==="l7-map"))units.push(...lesson7Units);

courseLessons[6]={
  number:7,
  title:"RLC, Viscoelasticity & Boundary-Value Problems",
  subtitle:"Oct. 7 · RLC circuits · Maxwell & Kelvin–Voigt · two-point BVPs · Zill §3.8–3.9 alignment",
  status:"current"
};

// lesson2.js renders the course map before the later lesson files finish loading.
// Refresh once the final current lesson has registered so Lessons 3–7 never appear
// as temporary “Reserved (empty)” entries, and a persisted Lesson 6/7 position
// renders immediately on page load.
if(typeof renderCourseMap==="function") renderCourseMap();
if(typeof render==="function") render();