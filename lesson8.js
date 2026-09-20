/*
  Lesson 8 — Oct. 12: Midterm 1 preparation + beginning of Part 3 (Laplace transform).

  Source alignment:
  - Official syllabus: Midterm 1 preparation; then Laplace definition/notation, existence
    conditions, linearity, and transforms of elementary functions. Laplace material is explicitly
    NOT examined on Midterm 1.
  - Primary text: O’Neil §3.1, Definition and Notation. Example 3.1 and forward-transform
    Problems 1–5 are used exactly as the book's relevant exercises for this session.
  - The syllabus explicitly asks for existence conditions; O’Neil §3.1 motivates convergence via
    the improper integral and Example 3.1 but does not state a full sufficient-condition theorem.
    The standard piecewise-continuous/exponential-order criterion is therefore labeled below as a
    syllabus-required extension rather than falsely attributed to O’Neil.
*/

const lesson8CoreTag='<span class="supplementalTag">Core · Oct. 12 syllabus · O’Neil §3.1</span>';
const lesson8ExplainTag='<span class="supplementalTag">Expanded explanation · Lesson 1 depth standard</span>';
const lesson8BookTag='<span class="supplementalTag">Textbook · O’Neil §3.1</span>';
const lesson8ExtensionTag='<span class="supplementalTag">Syllabus-required extension · standard existence criterion</span>';
const lesson8ExamTag='<span class="supplementalTag">Midterm 1 prep · Parts 1–2 only</span>';

function l8BookProblem(number,prompt,solution){
  return {type:'bookproblem',bookSection:'§3.1',title:`O’Neil §3.1 Problem ${number}`,prompt,solution};
}

const lesson8BookScreens=[
  l8BookProblem(1,
    `<p>${lesson8BookTag}<br>Find the Laplace transform of</p><div class="eq">\\[f(t)=3t\\cos(2t).\\]</div>`,
    `<p><b>Plan before calculating.</b> The function is already a constant multiple of a table entry. O’Neil's table gives</p><div class="eq">\\[\\mathcal L\\{t\\cos(at)\\}=\\frac{s^2-a^2}{(s^2+a^2)^2}.\\]</div>
     <p><b>1. Match the parameter.</b> Here \\(a=2\\), so</p><div class="eq">\\[\\mathcal L\\{t\\cos(2t)\\}=\\frac{s^2-4}{(s^2+4)^2}.\\]</div>
     <p><b>2. Use linearity.</b> The factor 3 comes straight through the transform:</p><div class="whybox"><div class="eq">\\[\\boxed{F(s)=\\frac{3(s^2-4)}{(s^2+4)^2}}.\\]</div></div>
     <p><b>Check.</b> As \\(s\\to\\infty\\), the result behaves like \\(3/s^2\\), which is consistent with a function that begins like \\(3t\\) near \\(t=0\\).</p>`),
  l8BookProblem(2,
    `<p>${lesson8BookTag}<br>Find the Laplace transform of</p><div class="eq">\\[g(t)=e^{-4t}\\sin(8t).\\]</div>`,
    `<p><b>Plan.</b> Do not invent a shifting theorem yet; O’Neil §3.1 already lists this elementary form directly:</p><div class="eq">\\[\\mathcal L\\{e^{at}\\sin(bt)\\}=\\frac{b}{(s-a)^2+b^2}.\\]</div>
     <p><b>1. Identify the parameters.</b> Here \\(a=-4\\) and \\(b=8\\). Therefore \\(s-a=s+4\\).</p>
     <p><b>2. Substitute carefully.</b></p><div class="whybox"><div class="eq">\\[\\boxed{G(s)=\\frac{8}{(s+4)^2+64}}.\\]</div></div>
     <p><b>Check the sign.</b> The time-domain factor is \\(e^{-4t}\\), so the denominator must contain \\((s+4)\\), not \\((s-4)\\).</p>`),
  l8BookProblem(3,
    `<p>${lesson8BookTag}<br>Find the Laplace transform of</p><div class="eq">\\[h(t)=14t-\\sin(7t).\\]</div>`,
    `<p><b>Plan.</b> Split the sum because the transform is linear.</p><div class="eq">\\[\\mathcal L\\{14t-\\sin7t\\}=14\\mathcal L\\{t\\}-\\mathcal L\\{\\sin7t\\}.\\]</div>
     <p><b>1. Use the two elementary entries.</b></p><div class="eq">\\[\\mathcal L\\{t\\}=\\frac1{s^2},\\qquad \\mathcal L\\{\\sin(at)\\}=\\frac{a}{s^2+a^2}.\\]</div>
     <p><b>2. Put \\(a=7\\).</b></p><div class="whybox"><div class="eq">\\[\\boxed{H(s)=\\frac{14}{s^2}-\\frac{7}{s^2+49}}.\\]</div></div>
     <p>No common denominator is required unless a later calculation needs one; the split form shows the source of each term clearly.</p>`),
  l8BookProblem(4,
    `<p>${lesson8BookTag}<br>Find the Laplace transform of</p><div class="eq">\\[w(t)=\\cos(3t)-\\cos(7t).\\]</div>`,
    `<p><b>Plan.</b> Use linearity and the cosine transform twice:</p><div class="eq">\\[\\mathcal L\\{\\cos(at)\\}=\\frac{s}{s^2+a^2}.\\]</div>
     <p>For \\(a=3\\), the first transform is \\(s/(s^2+9)\\). For \\(a=7\\), the second is \\(s/(s^2+49)\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{W(s)=\\frac{s}{s^2+9}-\\frac{s}{s^2+49}}.\\]</div></div>
     <p><b>Check.</b> Since \\(w(0)=1-1=0\\), the leading \\(1/s\\) contributions of the two fractions cancel, which is exactly what the displayed difference does.</p>`),
  l8BookProblem(5,
    `<p>${lesson8BookTag}<br>Find the Laplace transform of</p><div class="eq">\\[k(t)=-5t^2e^{-4t}+\\sin(3t).\\]</div>`,
    `<p><b>Plan.</b> Split the sum. The two relevant O’Neil table entries are</p><div class="eq">\\[\\mathcal L\\{t^ne^{at}\\}=\\frac{n!}{(s-a)^{n+1}},\\qquad \\mathcal L\\{\\sin(bt)\\}=\\frac{b}{s^2+b^2}.\\]</div>
     <p><b>1. Transform \\(t^2e^{-4t}\\).</b> Use \\(n=2\\), \\(a=-4\\):</p><div class="eq">\\[\\mathcal L\\{t^2e^{-4t}\\}=\\frac{2!}{(s+4)^3}=\\frac2{(s+4)^3}.\\]</div>
     <p>Multiplying by \\(-5\\) gives \\(-10/(s+4)^3\\).</p>
     <p><b>2. Transform the sine.</b></p><div class="eq">\\[\\mathcal L\\{\\sin3t\\}=\\frac3{s^2+9}.\\]</div>
     <div class="whybox"><div class="eq">\\[\\boxed{K(s)=-\\frac{10}{(s+4)^3}+\\frac3{s^2+9}}.\\]</div></div>`)
];

function l8CloneBook(n){const s=lesson8BookScreens.find(x=>x.title===`O’Neil §3.1 Problem ${n}`);return s?{...s,inlineBookPractice:true}:null;}
function l8AddBook(unitId,title,nums){const u=lesson8Units.find(x=>x.id===unitId);if(!u)return;const screens=nums.map(l8CloneBook).filter(Boolean);if(screens.length)u.lessons.push({title,screens});}

const lesson8BaseUnits=[
  {
    id:'l8-exam-map',courseLesson:8,color:'#4059ad',badge:'1',label:'Midterm boundary',
    title:'Midterm 1 Preparation: Know Exactly What Is and Is Not Examined',subtitle:'Parts 1–2 only · 50 minutes · closed book',
    desc:'Turn the syllabus into an exam map before reviewing methods. Laplace begins today but is explicitly outside Midterm 1.',
    lessons:[{title:'Exam scope and strategy',screens:[
      {type:'teach',title:'The Oct. 12 session has two different jobs',html:`<p>${lesson8ExamTag}</p><p>The syllabus combines <b>Midterm 1 preparation</b> with the beginning of <b>Part 3: Laplace Transform</b>. These must not be mixed together when you study for the exam.</p><div class="reviewGrid"><div class="mini"><b>Midterm 1</b><p>Parts 1–2, O’Neil Chapters 1–2, 50 minutes, closed book.</p></div><div class="mini"><b>New today</b><p>Laplace definition, notation, existence, linearity, elementary transforms. The syllabus explicitly says this is <b>not examined on Midterm 1</b>.</p></div></div>`},
      {type:'teach',title:'What “method selection” means under time pressure',html:`<p>${lesson8ExplainTag}</p><p>A short closed-book exam rewards recognizing structure before calculating. Your first 15–30 seconds should answer: <b>what type of ODE is this, what method is legal, and what special cases can be lost?</b></p><div class="whybox"><ol><li>Classify before manipulating.</li><li>Write the method-defining structure explicitly.</li><li>Carry out the algebra with domain/lost-solution checks.</li><li>Use initial/boundary data only after the general family is ready.</li><li>Spend a final line verifying the defining equation or conditions.</li></ol></div>`},
      {type:'quiz',title:'Does Laplace belong on Midterm 1?',q:'You learn the Laplace transform on Oct. 12. Should you use it as Midterm 1 examinable material on Oct. 14?',options:['No — the syllabus explicitly excludes it from Midterm 1','Yes — anything taught before the exam is examinable','Only for second-order equations'],answer:0,why:'The Oct. 12 schedule explicitly marks the Laplace material “Not examined on Midterm 1.”'}
    ]}]
  },
  {
    id:'l8-part1-review',courseLesson:8,color:'#2e7d69',badge:'2',label:'Part 1 triage',
    title:'Part 1 Rapid Method Selection',subtitle:'Separable · homogeneous · exact/non-exact · linear · Bernoulli · Riccati · Clairaut',
    desc:'Review the recognition logic from Lesson 1 without replacing the full lesson. The purpose is exam-speed classification and error prevention.',
    lessons:[{title:'First-order decision tree',screens:[
      {type:'teach',title:'Run the tests in a stable order',html:`<p>${lesson8ExamTag}</p><div class="whybox"><ol><li><b>Separable?</b> Can you write \\(A(y)dy=B(x)dx\\)? Check values divided out.</li><li><b>Homogeneous first-order?</b> Does the slope depend only on \\(y/x\\), or are \\(M,N\\) homogeneous of the same degree? Use \\(y=ux\\).</li><li><b>Exact?</b> For \\(Mdx+Ndy=0\\), test \\(M_y=N_x\\) before reconstructing a potential.</li><li><b>Non-exact but integrating factor available?</b> Run the syllabus/lecture tests before guessing.</li><li><b>Linear?</b> Put it in \\(y'+p(x)y=q(x)\\) and derive/use \\(I=e^{\\int p dx}\\).</li><li><b>Bernoulli/Riccati/Clairaut?</b> Identify the defining pattern and make the corresponding substitution.</li></ol></div>`},
      {type:'teach',title:'The lost-solution check is not optional',html:`<p>Whenever you divide by an expression involving the unknown, you temporarily assume it is nonzero. For example, separating \\(y'=2xy^2\\) by dividing by \\(y^2\\) excludes \\(y=0\\).</p><p>After solving the nonzero branch, return to the original equation and test the excluded values. A singular or equilibrium solution can be mathematically valid even though the algebraic route discarded it.</p>`},
      {type:'quiz',title:'Fast classification',q:`For \\((2xy+y^3)dx+(x^2+3xy^2+2y)dy=0\\), what should you test first before integrating either component?`,options:['Whether M_y=N_x','Whether the characteristic roots are repeated','Whether the forcing resonates'],answer:0,why:'This is a first-order differential form. Exactness is tested before reconstructing a potential.'}
    ]}]
  },
  {
    id:'l8-part2-review',courseLesson:8,color:'#7651b8',badge:'3',label:'Part 2 triage',
    title:'Part 2 Rapid Method Selection',subtitle:'Homogeneous roots · nonhomogeneous forcing · Euler · engineering models · BVPs',
    desc:'Compress Lessons 2–7 into a method-choice map while preserving the distinctions that cause most exam errors.',
    lessons:[{title:'Higher-order decision tree',screens:[
      {type:'teach',title:'Start from the equation form',html:`<p>${lesson8ExamTag}</p><div class="reviewGrid"><div class="mini"><b>Constant-coefficient homogeneous</b><p>Characteristic polynomial; root multiplicity controls the basis.</p></div><div class="mini"><b>Constant-coefficient forced</b><p>Find \\(y_h\\), then one \\(y_p\\): UC when the forcing family is suitable; VP more generally.</p></div><div class="mini"><b>Euler–Cauchy</b><p>Try \\(y=x^r\\) on a sign-consistent interval, or set \\(t=\\ln|x|\\).</p></div><div class="mini"><b>Engineering model</b><p>Derive the ODE from force/voltage/constitutive balance before solving it.</p></div></div>`},
      {type:'teach',title:'Three distinctions that must survive the review',html:`<p><b>1. Wronskian versus characteristic polynomial.</b> The Wronskian tests independence of known solutions; it does not generate constant-coefficient roots.</p><p><b>2. UC overlap versus physical resonance.</b> The \\(x^s\\)-multiplier rule is an algebraic overlap rule. In an undamped forced oscillator, that same overlap creates physical resonance.</p><p><b>3. IVP versus BVP.</b> Two conditions at one point invoke the regular IVP uniqueness theorem. Conditions at two points produce a separate boundary linear system that may have one, none, or infinitely many solutions.</p>`},
      {type:'quiz',title:'Pick the right forced-equation method',q:`For \\(y''+y=\\tan x\\), which method from Parts 1–2 is designed to handle the forcing directly once a homogeneous basis is known?`,options:['Variation of parameters','Undetermined coefficients with A tan x','Euler substitution y=x^r'],answer:0,why:'tan x is outside the finite derivative-closed UC trial families; variation of parameters is the general method taught for this case.'}
    ]}]
  },
  {
    id:'l8-laplace-idea',courseLesson:8,color:'#b35f4a',badge:'4',label:'Laplace idea',
    title:'What a Laplace Transform Actually Does',subtitle:'Convert a time-domain function into an s-domain function',
    desc:'Begin Part 3 from the underlying integral and the engineering reason for using it, not from a transform table.',
    lessons:[{title:'Definition and notation',screens:[
      {type:'teach',title:'Why introduce another domain?',html:`<p>${lesson8BookTag}</p><p>O’Neil motivates the Laplace transform as a way to convert certain initial-value differential equations into <b>algebra problems</b>. The rough strategy is</p><div class="eq">\\[\\text{IVP in }t\\;\\longrightarrow\\;\\text{algebra in }s\\;\\longrightarrow\\;\\text{solution in }t.\\]</div><p>The payoff arrives in the next lessons when derivatives and discontinuous inputs are transformed. Today we first learn what the transform itself means.</p>`},
      {type:'teach',title:'Read every symbol in the definition',html:`<p>${lesson8CoreTag}</p><div class="whybox"><div class="eq">\\[\\boxed{\\mathcal L\\{f\\}(s)=\\int_0^\\infty e^{-st}f(t)\\,dt=F(s)}.\\]</div></div><p>Here \\(t\\) is the original independent variable, usually time. \\(f(t)\\) is the original function. \\(s\\) is a new parameter/variable. After the integration is carried out with respect to \\(t\\), the answer is a new function \\(F(s)\\).</p><div class="beginner"><b>Do not confuse the variables:</b> the transform does not “replace t by s.” It integrates over all \\(t\\ge0\\), weighted by \\(e^{-st}\\), and the resulting number depends on \\(s\\).</div>`},
      {type:'teach',title:'Forward and inverse notation — know the symbol, defer the method',html:`<p>${lesson8BookTag}</p><p>O’Neil §3.1 also introduces the notation for going back. If \\(\\mathcal L\\{f\\}=F\\), then</p><div class="eq">\\[\\boxed{\\mathcal L^{-1}\\{F\\}=f}.\\]</div><p>The superscript \\(-1\\) means <b>inverse operation</b>; it is not the reciprocal \\(1/\\mathcal L\\). A transform table can therefore be read left-to-right to find \\(F(s)\\), and right-to-left to recognize the corresponding \\(f(t)\\).</p><div class="warn"><b>Scope:</b> today you only need the notation and the idea. The syllabus schedules actual inverse-transform technique, partial fractions, and IVP solution for Oct. 19.</div>`},
      {type:'teach',title:'Why the kernel e^{-st} is useful',html:`<p>${lesson8ExplainTag}</p><p>For positive \\(s\\), the factor \\(e^{-st}\\) decays as \\(t\\) grows. It therefore suppresses the distant-time contribution of \\(f(t)\\) strongly enough for many improper integrals to converge.</p><p>Different values of \\(s\\) change how aggressively later times are discounted. The collection of all these weighted integrals is the function \\(F(s)\\).</p>`},
      {type:'quiz',title:'What survives after integration?',q:`In \\(F(s)=\\int_0^\\infty e^{-st}f(t)dt\\), which variable is integrated out?`,options:['t','s','Both t and s'],answer:0,why:'The integration is with respect to t; s remains as the variable of the transformed function.'}
    ]}]
  },
  {
    id:'l8-existence',courseLesson:8,color:'#d27a42',badge:'5',label:'Existence',
    title:'When Does the Improper Integral Exist?',subtitle:'Convergence is part of the definition, not a footnote',
    desc:'Use O’Neil Example 3.1 to see a convergence condition explicitly, then state the syllabus-required sufficient criterion carefully.',
    lessons:[{title:'Improper integral and existence',screens:[
      {type:'teach',title:'O’Neil Example 3.1 — derive the exponential transform',html:`<p>${lesson8BookTag}</p><p>Let \\(f(t)=e^{at}\\), with constant \\(a\\). Start from the definition:</p><div class="eq">\\[\\mathcal L\\{e^{at}\\}=\\int_0^\\infty e^{-st}e^{at}dt=\\int_0^\\infty e^{(a-s)t}dt.\\]</div><p>Because the upper limit is infinite, write the improper integral as a limit:</p><div class="eq">\\[\\lim_{k\\to\\infty}\\int_0^k e^{(a-s)t}dt=\\lim_{k\\to\\infty}\\left[\\frac{e^{(a-s)t}}{a-s}\\right]_0^k.\\]</div><p>This is</p><div class="eq">\\[\\lim_{k\\to\\infty}\\frac{e^{(a-s)k}-1}{a-s}.\\]</div><p>If \\(s>a\\), then \\(a-s<0\\), so \\(e^{(a-s)k}\\to0\\). Hence</p><div class="whybox"><div class="eq">\\[\\boxed{\\mathcal L\\{e^{at}\\}=\\frac1{s-a},\\qquad s>a}.\\]</div></div><p>The condition \\(s>a\\) is part of the result: without it the defining improper integral does not converge.</p>`},
      {type:'teach',title:'A practical sufficient existence condition',html:`<p>${lesson8ExtensionTag}</p><p>The syllabus explicitly requires <b>existence conditions</b>. A standard sufficient theorem used in introductory Laplace courses is:</p><div class="whybox"><p>If \\(f\\) is piecewise continuous on every finite interval \\([0,T]\\) and is of <b>exponential order</b> — meaning there are constants \\(M,c,T_0\\) with</p><div class="eq">\\[|f(t)|\\le Me^{ct}\\quad(t\\ge T_0),\\]</div><p>— then \\(\\mathcal L\\{f\\}(s)\\) exists for all sufficiently large \\(s\\), in particular for \\(s>c\\).</p></div><p>This is a <b>sufficient</b> condition, not a claim that every transformable function must satisfy exactly this form.</p>`},
      {type:'teach',title:'Why exponential order is enough',html:`<p>${lesson8ExplainTag}</p><p>If \\(|f(t)|\\le Me^{ct}\\), then for \\(s>c\\),</p><div class="eq">\\[|e^{-st}f(t)|\\le M e^{-(s-c)t}.\\]</div><p>The comparison function on the right has a convergent integral:</p><div class="eq">\\[\\int_{T_0}^{\\infty}Me^{-(s-c)t}dt<\\infty.\\]</div><p>So the transform tail converges absolutely. Piecewise continuity handles the finite interval near the origin.</p>`},
      {type:'quiz',title:'Why did Example 3.1 need s>a?',q:`For \\(f(t)=e^{at}\\), what goes wrong when \\(s\\le a\\)?`,options:['The factor e^{(a-s)t} does not decay enough for the improper integral to converge','The derivative of f stops existing','Linearity fails'],answer:0,why:'The upper-limit term e^{(a-s)k} fails to tend to zero when s≤a.'}
    ]}]
  },
  {
    id:'l8-elementary',courseLesson:8,color:'#6a6f7b',badge:'6',label:'Elementary transforms',
    title:'Derive the Elementary Transform Table Instead of Memorizing Blindly',subtitle:'1 · t · t^n · sine · cosine · exponential',
    desc:'Build the core entries from the definition and integration by parts so the table has reasons behind it.',
    lessons:[{title:'Core transform derivations',screens:[
      {type:'teach',title:'Constant function: L{1}',html:`<p>${lesson8ExplainTag}</p><div class="eq">\\[\\mathcal L\\{1\\}=\\int_0^\\infty e^{-st}dt.\\]</div><p>For \\(s>0\\),</p><div class="eq">\\[\\int_0^k e^{-st}dt=\\left[-\\frac1s e^{-st}\\right]_0^k=\\frac1s(1-e^{-sk}).\\]</div><p>As \\(k\\to\\infty\\), \\(e^{-sk}\\to0\\), so</p><div class="whybox"><div class="eq">\\[\\boxed{\\mathcal L\\{1\\}=\\frac1s}.\\]</div></div>`},
      {type:'teach',title:'Why L{t}=1/s²',html:`<p>Start from</p><div class="eq">\\[\\mathcal L\\{t\\}=\\int_0^\\infty t e^{-st}dt.\\]</div><p>Use integration by parts with \\(u=t\\), \\(dv=e^{-st}dt\\). Then \\(du=dt\\) and \\(v=-e^{-st}/s\\):</p><div class="eq">\\[\\int_0^\\infty te^{-st}dt=\\left[-\\frac{t}{s}e^{-st}\\right]_0^\\infty+\\frac1s\\int_0^\\infty e^{-st}dt.\\]</div><p>For \\(s>0\\), the boundary term vanishes and the remaining integral is \\(1/s\\). Therefore</p><div class="whybox"><div class="eq">\\[\\boxed{\\mathcal L\\{t\\}=\\frac1{s^2}}.\\]</div></div>`},
      {type:'teach',title:'The factorial pattern for t^n',html:`<p>Let \\(I_n=\\int_0^\\infty t^n e^{-st}dt\\). Integration by parts with \\(u=t^n\\) gives</p><div class="eq">\\[I_n=\\frac{n}{s}I_{n-1}.\\]</div><p>Starting from \\(I_0=1/s\\), repeat the recurrence:</p><div class="eq">\\[I_n=\\frac ns\\frac{n-1}{s}\\cdots\\frac1s\\frac1s=\\frac{n!}{s^{n+1}}.\\]</div><div class="whybox"><div class="eq">\\[\\boxed{\\mathcal L\\{t^n\\}=\\frac{n!}{s^{n+1}}}.\\]</div></div>`},
      {type:'teach',title:'Derive sine and cosine together',html:`<p>${lesson8ExplainTag}</p><p>Define</p><div class="eq">\\[C=\\int_0^\\infty e^{-st}\\cos(at)dt,\\qquad S=\\int_0^\\infty e^{-st}\\sin(at)dt.\\]</div><p>Integrating \\(C\\) by parts once gives</p><div class="eq">\\[C=\\frac1s-\\frac as S.\\]</div><p>Integrating \\(S\\) by parts gives</p><div class="eq">\\[S=\\frac as C.\\]</div><p>Substitute the second relation into the first:</p><div class="eq">\\[C=\\frac1s-\\frac{a^2}{s^2}C\\Rightarrow C\\left(1+\\frac{a^2}{s^2}\\right)=\\frac1s.\\]</div><p>Hence</p><div class="eq">\\[C=\\frac{s}{s^2+a^2},\\qquad S=\\frac asC=\\frac{a}{s^2+a^2}.\\]</div><div class="whybox"><div class="eq">\\[\\boxed{\\mathcal L\\{\\cos at\\}=\\frac{s}{s^2+a^2},\\qquad \\mathcal L\\{\\sin at\\}=\\frac{a}{s^2+a^2}}.\\]</div></div>`},
      {type:'teach',title:'The rest of the core §3.1 table — recognize the pattern',html:`<p>${lesson8BookTag}</p><p>O’Neil Table 3.1 contains several product forms that the section exercises expect you to read directly. Keep the parameter pattern visible:</p><div class="reviewGrid"><div class="mini"><div class="eq">\\[\\mathcal L\\{e^{at}\\}=\\frac1{s-a}\\]</div><div class="eq">\\[\\mathcal L\\{t^ne^{at}\\}=\\frac{n!}{(s-a)^{n+1}}\\]</div></div><div class="mini"><div class="eq">\\[\\mathcal L\\{e^{at}\\sin bt\\}=\\frac{b}{(s-a)^2+b^2}\\]</div><div class="eq">\\[\\mathcal L\\{e^{at}\\cos bt\\}=\\frac{s-a}{(s-a)^2+b^2}\\]</div></div><div class="mini"><div class="eq">\\[\\mathcal L\\{t\\sin at\\}=\\frac{2as}{(s^2+a^2)^2}\\]</div><div class="eq">\\[\\mathcal L\\{t\\cos at\\}=\\frac{s^2-a^2}{(s^2+a^2)^2}\\]</div></div><div class="mini"><div class="eq">\\[\\mathcal L\\{\\sinh at\\}=\\frac{a}{s^2-a^2}\\]</div><div class="eq">\\[\\mathcal L\\{\\cosh at\\}=\\frac{s}{s^2-a^2}\\]</div></div></div><p><b>Why does \\(s-a\\) keep appearing?</b> In any individual exponential-weighted entry, the kernel combines as \\(e^{-st}e^{at}=e^{-(s-a)t}\\). We are only using that observation to read the §3.1 table here; the course formally develops the first shifting theorem later.</p><div class="beginner"><b>Do not memorize the letters.</b> Match the time-domain shape, identify the actual numerical parameters, then substitute them into the table entry.</div>`},
      {type:'quiz',title:'Why does n! appear?',q:`What recurrence comes from integrating \\(\\int_0^\\infty t^n e^{-st}dt\\) by parts?`,options:[`I_n=(n/s)I_{n-1}`,`I_n=sI_{n-1}`,`I_n=I_{n-1}/n`],answer:0,why:'Each integration by parts contributes a factor n/s, then (n−1)/s, and so on, producing n!.'}
    ]}]
  },
  {
    id:'l8-linearity',courseLesson:8,color:'#3f7f8f',badge:'7',label:'Linearity & table',
    title:'Linearity and Safe Table Reading',subtitle:'Break complicated inputs into transforms you already know',
    desc:'Derive linearity directly from the integral and learn how to read O’Neil Table 3.1 without sign/parameter mistakes.',
    lessons:[{title:'Linearity and pattern matching',screens:[
      {type:'teach',title:'Why the Laplace transform is linear',html:`<p>${lesson8BookTag}</p><p>Take constants \\(A,B\\). From the definition,</p><div class="eq">\\[\\mathcal L\\{Af+Bg\\}=\\int_0^\\infty e^{-st}[Af(t)+Bg(t)]dt.\\]</div><p>Ordinary integration is linear, so</p><div class="eq">\\[=A\\int_0^\\infty e^{-st}f(t)dt+B\\int_0^\\infty e^{-st}g(t)dt.\\]</div><div class="whybox"><div class="eq">\\[\\boxed{\\mathcal L\\{Af+Bg\\}=A F(s)+B G(s)}.\\]</div></div><p>Linearity is therefore inherited directly from the integral; it is not a separate trick.</p>`},
      {type:'teach',title:'How to read a transform table without guessing',html:`<p>${lesson8ExplainTag}</p><p>For every term, identify the <b>shape</b> and then the <b>parameters</b>. Example:</p><div class="eq">\\[e^{-4t}\\sin(8t)\\]</div><p>matches \\(e^{at}\\sin(bt)\\) with \\(a=-4\\), \\(b=8\\). The entry is</p><div class="eq">\\[\\frac{b}{(s-a)^2+b^2}=\\frac8{(s+4)^2+64}.\\]</div><div class="warn"><b>Most common sign error:</b> if the time factor is \\(e^{-4t}\\), then \\(a=-4\\), so \\(s-a=s+4\\).</div>`},
      {type:'teach',title:'Do not jump ahead to inverse transforms',html:`<p>The book table can be read in both directions, but the syllabus schedules <b>inverse Laplace transforms, partial fractions, transforms of derivatives, and IVP solution</b> for Oct. 19. Lesson 8 deliberately stops at forward transforms and the definition.</p><p>This keeps the course sequence clean: first understand the map \\(f(t)\\mapsto F(s)\\); next learn how to come back and use the transform on ODEs.</p>`},
      {type:'quiz',title:'Linearity check',q:`If \\(\\mathcal L\\{f\\}=F\\) and \\(\\mathcal L\\{g\\}=G\\), what is \\(\\mathcal L\\{3f-2g\\}\\)?`,options:[`3F−2G`,`F(3s)−G(2s)`,`3FG`],answer:0,why:'Constants factor out and sums/differences transform term by term.'}
    ]}]
  }
];

const lesson8TransferScreens=[
  {type:'bookproblem',bookSection:'Original course problem',practiceLabel:'Original transfer · not an O’Neil exercise',title:'Transfer 1 · Existence before calculation',prompt:`<p>${lesson8ExtensionTag}<br>Without evaluating the integral, decide whether the standard sufficient existence criterion guarantees a Laplace transform for each function: (a) \\(f(t)=t^4+3\\sin t\\); (b) \\(g(t)=e^{2t}\\cos t\\); (c) \\(h(t)=e^{t^2}\\). State the reason for each.</p>`,solution:`<p><b>(a)</b> Yes. A polynomial plus a bounded trigonometric term is piecewise continuous and of exponential order (for example, eventually bounded by \\(Me^t\\)).</p><p><b>(b)</b> Yes. It is continuous and \\(|g(t)|\\le e^{2t}\\), so it is of exponential order 2; the transform is guaranteed for sufficiently large \\(s\\), in particular \\(s>2\\).</p><p><b>(c)</b> No guarantee from this criterion. \\(e^{t^2}\\) eventually grows faster than \\(Me^{ct}\\) for every fixed \\(M,c\\). The statement is about failure of the <em>sufficient criterion</em>; it is not a license to claim nonexistence without analyzing the integral.</p>`},
  {type:'bookproblem',bookSection:'Original course problem',practiceLabel:'Original transfer · not an O’Neil exercise',title:'Transfer 2 · Derive, do not table-look up',prompt:`<p>${lesson8ExplainTag}<br>Starting only from the definition and integration by parts, derive \\(\\mathcal L\\{t\\}=1/s^2\\) for \\(s>0\\). Explicitly justify the boundary term.</p>`,solution:`<p>Start with</p><div class="eq">\\[\\mathcal L\\{t\\}=\\int_0^\\infty te^{-st}dt.\\]</div><p>Take \\(u=t\\), \\(dv=e^{-st}dt\\), so \\(du=dt\\), \\(v=-e^{-st}/s\\). Then</p><div class="eq">\\[\\int_0^\\infty te^{-st}dt=\\left[-\\frac{t}{s}e^{-st}\\right]_0^\\infty+\\frac1s\\int_0^\\infty e^{-st}dt.\\]</div><p>For \\(s>0\\), \\(te^{-st}\\to0\\) as \\(t\\to\\infty\\), and the lower endpoint is also zero. The remaining integral is \\(1/s\\), hence</p><div class="whybox"><div class="eq">\\[\\boxed{\\mathcal L\\{t\\}=\\frac1{s^2}}.\\]</div></div>`},
  {type:'bookproblem',bookSection:'Original course problem',practiceLabel:'Original transfer · not an O’Neil exercise',title:'Transfer 3 · Multi-pattern forward transform',prompt:`<p>${lesson8ExplainTag}<br>Find the Laplace transform of</p><div class="eq">\\[f(t)=2t^2-3e^{-2t}+4\\sin(5t).\\]</div><p>State the table pattern used for each term.</p>`,solution:`<p>Use linearity term by term:</p><div class="eq">\\[\\mathcal L\\{2t^2\\}=2\\frac{2!}{s^3}=\\frac4{s^3},\\qquad \\mathcal L\\{-3e^{-2t}\\}=-\\frac3{s+2},\\qquad \\mathcal L\\{4\\sin5t\\}=\\frac{20}{s^2+25}.\\]</div><div class="whybox"><div class="eq">\\[\\boxed{F(s)=\\frac4{s^3}-\\frac3{s+2}+\\frac{20}{s^2+25}}.\\]</div></div><p>The patterns are \\(t^n\\), \\(e^{at}\\), and \\(\\sin(at)\\), respectively.</p>`},
  {type:'bookproblem',bookSection:'Original course problem',practiceLabel:'Original transfer · not an O’Neil exercise',title:'Transfer 4 · Parameter-sign audit',prompt:`<p>${lesson8ExplainTag}<br>A student claims</p><div class="eq">\\[\\mathcal L\\{e^{-3t}\\cos(4t)\\}=\\frac{s-3}{(s-3)^2+16}.\\]</div><p>Diagnose the sign error and give the corrected transform using only the §3.1 table pattern.</p>`,solution:`<p>The table entry is</p><div class="eq">\\[\\mathcal L\\{e^{at}\\cos(bt)\\}=\\frac{s-a}{(s-a)^2+b^2}.\\]</div><p>Here \\(a=-3\\), not \\(a=3\\). Therefore \\(s-a=s+3\\):</p><div class="whybox"><div class="eq">\\[\\boxed{\\mathcal L\\{e^{-3t}\\cos4t\\}=\\frac{s+3}{(s+3)^2+16}}.\\]</div></div><p>The negative exponent in time shifts the table denominator/numerator toward \\(s+3\\).</p>`},
  {type:'bookproblem',bookSection:'Original course problem',practiceLabel:'Original transfer · not an O’Neil exercise',title:'Transfer 5 · Predict the large-s behavior',prompt:`<p>${lesson8ExplainTag}<br>Without computing a full transform first, predict the leading large-\\(s\\) behavior of the transform of \\(f(t)=3+2t+O(t^2)\\) near \\(t=0\\). Then explain how this gives a quick plausibility check for a table calculation.</p>`,solution:`<p>The elementary pairs give</p><div class="eq">\\[\\mathcal L\\{1\\}=\\frac1s,\\qquad \\mathcal L\\{t\\}=\\frac1{s^2}.\\]</div><p>So the first two local terms predict</p><div class="whybox"><div class="eq">\\[\\boxed{F(s)=\\frac3s+\\frac2{s^2}+O(s^{-3})\\quad(s\\to\\infty)}.\\]</div></div><p>This is a diagnostic, not a replacement for the transform: if a proposed answer has the wrong leading powers or coefficients, it cannot match the function's behavior near \\(t=0\\).</p>`}
];

const lesson8Mastery={
  id:'l8-mastery',courseLesson:8,color:'#9a3f69',badge:'8',label:'Transfer mastery',
  title:'Laplace Foundations Transfer Mastery',subtitle:'5 distinct problems · existence · derivation · pattern selection · error diagnosis · asymptotics',
  desc:'The authentic O’Neil §3.1 Problems 1–5 stay in the teaching sequence. Mastery now uses clearly labeled original transfer problems instead of repeating those same five questions. Inverse transforms remain deferred to Lesson 10.',
  lessons:[{title:'Existence & derivation',screens:lesson8TransferScreens.slice(0,2)},{title:'Pattern transfer & diagnostics',screens:lesson8TransferScreens.slice(2)}]
};

const lesson8Units=[...lesson8BaseUnits,lesson8Mastery];

// Put authentic book practice inside ordinary teaching units as well as in final mastery.
l8AddBook('l8-elementary','Book practice · products and elementary transforms',[1,2]);
l8AddBook('l8-linearity','Book practice · linear combinations',[3,4,5]);

if(!units.some(u=>u&&u.id==='l8-exam-map'))units.push(...lesson8Units);

courseLessons[7]={
  number:8,
  title:'Midterm 1 Preparation & Laplace Transform Foundations',
  subtitle:'Oct. 12 · Midterm 1 prep · O’Neil §3.1 · definition · existence · linearity · elementary transforms',
  status:'current'
};

if(typeof renderCourseMap==='function')renderCourseMap();
if(typeof render==='function')render();