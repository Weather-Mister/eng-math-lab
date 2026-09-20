/*
  Lesson 3 — Sep. 21: Reduction of order; constant-coefficient homogeneous ODEs;
  nth-order generalization. Built against the course syllabus and O’Neil §2.2.
*/

// Lesson 3 uses authored TeX in many .eq blocks. The base app normally converts
// plain-text .eq/.math content to TeX before MathJax runs; running that converter
// over already-authored TeX corrupts superscripts and produces errors such as
// “Double exponent: use braces to clarify”. Preserve explicit TeX verbatim.
const lesson3BasePrepareMathElements = prepareMathElements;
prepareMathElements = function(root=document){
  const host=root && root.querySelectorAll ? root : document;
  host.querySelectorAll('.math,.eq').forEach(el=>{
    if(el.dataset.mathPrepared==='1') return;
    const raw=(el.textContent || '').trim();
    const displayTex=raw.startsWith('\\[') && raw.endsWith('\\]');
    const inlineTex=raw.startsWith('\\(') && raw.endsWith('\\)');
    if(displayTex || inlineTex){
      // Keep the exact TeX source and only mark it prepared so the legacy
      // Unicode-to-TeX converter will not rewrite ^, \frac, \sqrt, etc.
      el.textContent=raw;
      el.dataset.mathPrepared='1';
    }
  });
  lesson3BasePrepareMathElements(root);
};

const lesson3CoreTag = '<span class="supplementalTag">Core · Sep. 21 syllabus · O’Neil §2.2</span>';
const lesson3ExplainTag = '<span class="supplementalTag">Expanded explanation · no skipped steps</span>';
const lesson3SyllabusTag = '<span class="supplementalTag">Syllabus-required extension · nth-order generalization</span>';

function l3BookProblem(number,prompt,solution){
  return {
    type:"bookproblem",
    bookSection:"§2.2",
    title:`O’Neil §2.2 Problem ${number}`,
    prompt,
    solution
  };
}

const l3GeneralBookData = [
  {n:1,eq:`\\(y''-y'-6y=0\\)`,char:`\\(r^2-r-6=(r-3)(r+2)=0\\)`,roots:`\\(r=3,-2\\)`,kind:"two distinct real roots",sol:`\\(y=c_1e^{3x}+c_2e^{-2x}\\)`},
  {n:2,eq:`\\(y''-2y'+10y=0\\)`,char:`\\(r^2-2r+10=0\\)`,roots:`\\(r=1\\pm3i\\)`,kind:"a complex-conjugate pair",sol:`\\(y=e^x(c_1\\cos3x+c_2\\sin3x)\\)`},
  {n:3,eq:`\\(y''+6y'+9y=0\\)`,char:`\\(r^2+6r+9=(r+3)^2=0\\)`,roots:`\\(r=-3\\) twice`,kind:"a repeated real root",sol:`\\(y=(c_1+c_2x)e^{-3x}\\)`},
  {n:4,eq:`\\(y''-3y'=0\\)`,char:`\\(r^2-3r=r(r-3)=0\\)`,roots:`\\(r=0,3\\)`,kind:"two distinct real roots (one is zero)",sol:`\\(y=c_1+c_2e^{3x}\\)`},
  {n:5,eq:`\\(y''+10y'+26y=0\\)`,char:`\\(r^2+10r+26=0\\)`,roots:`\\(r=-5\\pm i\\)`,kind:"a complex-conjugate pair",sol:`\\(y=e^{-5x}(c_1\\cos x+c_2\\sin x)\\)`},
  {n:6,eq:`\\(y''+6y'-40y=0\\)`,char:`\\(r^2+6r-40=(r-4)(r+10)=0\\)`,roots:`\\(r=4,-10\\)`,kind:"two distinct real roots",sol:`\\(y=c_1e^{4x}+c_2e^{-10x}\\)`},
  {n:7,eq:`\\(y''+3y'+18y=0\\)`,char:`\\(r^2+3r+18=0\\)`,roots:`\\(r=-\\frac32\\pm i\\frac{3\\sqrt7}{2}\\)`,kind:"a complex-conjugate pair",sol:`\\(y=e^{-3x/2}[c_1\\cos(3\\sqrt7x/2)+c_2\\sin(3\\sqrt7x/2)]\\)`},
  {n:8,eq:`\\(y''+16y'+64y=0\\)`,char:`\\(r^2+16r+64=(r+8)^2=0\\)`,roots:`\\(r=-8\\) twice`,kind:"a repeated real root",sol:`\\(y=(c_1+c_2x)e^{-8x}\\)`},
  {n:9,eq:`\\(y''-14y'+49y=0\\)`,char:`\\(r^2-14r+49=(r-7)^2=0\\)`,roots:`\\(r=7\\) twice`,kind:"a repeated real root",sol:`\\(y=(c_1+c_2x)e^{7x}\\)`},
  {n:10,eq:`\\(y''-6y'+7y=0\\)`,char:`\\(r^2-6r+7=0\\)`,roots:`\\(r=3\\pm\\sqrt2\\)`,kind:"two distinct real roots",sol:`\\(y=c_1e^{(3+\\sqrt2)x}+c_2e^{(3-\\sqrt2)x}\\)`}
];

function l3GeneralBookScreen(d){
  return l3BookProblem(d.n,
    `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.2 Problem ${d.n}</span><br>Write a real-valued general solution of ${d.eq}.</p>`,
    `<p><b>1. Form the characteristic equation.</b> Replace \\(y\\), \\(y'\\), and \\(y''\\) by the factors produced by \\(e^{rx}\\). This gives</p><div class="eq">${d.char}</div>
     <p><b>2. Solve for the characteristic roots.</b></p><div class="eq">${d.roots}</div>
     <p>These are ${d.kind}, so use the matching root-case rule.</p>
     <p><b>3. General solution.</b></p><div class="whybox"><div class="eq">${d.sol}</div></div>
     <p><b>Self-check:</b> the result contains exactly two arbitrary constants, as a second-order homogeneous equation should.</p>`
  );
}

const l3IVPBookData = [
  {n:11,eq:`\\(y''+3y'=0\\)`,ic:`\\(y(0)=3,\\ y'(0)=6\\)`,char:`\\(r(r+3)=0\\)`,family:`\\(y=c_1+c_2e^{-3x}\\)`,deriv:`\\(y'=-3c_2e^{-3x}\\)`,work:`At \\(x=0\\), \\(c_1+c_2=3\\). The slope condition gives \\(-3c_2=6\\), hence \\(c_2=-2\\) and \\(c_1=5\\).`,answer:`\\(y=5-2e^{-3x}\\)`},
  {n:12,eq:`\\(y''+2y'-3y=0\\)`,ic:`\\(y(0)=6,\\ y'(0)=-2\\)`,char:`\\((r-1)(r+3)=0\\)`,family:`\\(y=c_1e^x+c_2e^{-3x}\\)`,deriv:`\\(y'=c_1e^x-3c_2e^{-3x}\\)`,work:`At zero, \\(c_1+c_2=6\\) and \\(c_1-3c_2=-2\\). Subtract the equations: \\(-4c_2=-8\\), so \\(c_2=2\\) and \\(c_1=4\\).`,answer:`\\(y=4e^x+2e^{-3x}\\)`},
  {n:13,eq:`\\(y''-2y'+y=0\\)`,ic:`\\(y(1)=0,\\ y'(1)=0\\)`,char:`\\((r-1)^2=0\\)`,family:`\\(y=(c_1+c_2x)e^x\\)`,deriv:`\\(y'=(c_1+c_2x+c_2)e^x\\)`,work:`At \\(x=1\\), the value condition gives \\(c_1+c_2=0\\). The slope condition gives \\(c_1+2c_2=0\\). Subtraction gives \\(c_2=0\\), then \\(c_1=0\\). This is also what uniqueness predicts for zero value and zero slope.`,answer:`\\(y\\equiv0\\)`},
  {n:14,eq:`\\(y''-4y'+4y=0\\)`,ic:`\\(y(0)=3,\\ y'(0)=5\\)`,char:`\\((r-2)^2=0\\)`,family:`\\(y=(c_1+c_2x)e^{2x}\\)`,deriv:`\\(y'=[c_2+2(c_1+c_2x)]e^{2x}\\)`,work:`The value condition gives \\(c_1=3\\). At zero, \\(y'(0)=c_2+2c_1=5\\), so \\(c_2+6=5\\) and \\(c_2=-1\\).`,answer:`\\(y=(3-x)e^{2x}\\)`},
  {n:15,eq:`\\(y''+y'-12y=0\\)`,ic:`\\(y(2)=2,\\ y'(2)=-1\\)`,char:`\\((r-3)(r+4)=0\\)`,family:`\\(y=Ae^{3(x-2)}+Be^{-4(x-2)}\\)`,deriv:`\\(y'=3Ae^{3(x-2)}-4Be^{-4(x-2)}\\)`,work:`Writing the family with \\(x-2\\) keeps the arithmetic clean. At \\(x=2\\), \\(A+B=2\\) and \\(3A-4B=-1\\). From \\(A=2-B\\), \\(6-7B=-1\\), so \\(B=1\\) and \\(A=1\\).`,answer:`\\(y=e^{3(x-2)}+e^{-4(x-2)}\\)`},
  {n:16,eq:`\\(y''-2y'-5y=0\\)`,ic:`\\(y(0)=0,\\ y'(0)=3\\)`,char:`\\(r^2-2r-5=0\\)`,family:`\\(y=c_1e^{(1+\\sqrt6)x}+c_2e^{(1-\\sqrt6)x}\\)`,deriv:`\\(y'=(1+\\sqrt6)c_1e^{(1+\\sqrt6)x}+(1-\\sqrt6)c_2e^{(1-\\sqrt6)x}\\)`,work:`At zero, \\(c_1+c_2=0\\), so \\(c_2=-c_1\\). The slope condition becomes \\([(1+\\sqrt6)-(1-\\sqrt6)]c_1=2\\sqrt6c_1=3\\). Thus \\(c_1=\\sqrt6/4\\), \\(c_2=-\\sqrt6/4\\).`,answer:`\\(y=\\frac{\\sqrt6}{4}[e^{(1+\\sqrt6)x}-e^{(1-\\sqrt6)x}]\\)`},
  {n:17,eq:`\\(y''-2y'+y=0\\)`,ic:`\\(y(1)=12,\\ y'(1)=-5\\)`,char:`\\((r-1)^2=0\\)`,family:`\\(y=e^{x-1}[A+B(x-1)]\\)`,deriv:`\\(y'=e^{x-1}[A+B(x-1)+B]\\)`,work:`At \\(x=1\\), \\(A=12\\). Then \\(A+B=-5\\), hence \\(B=-17\\). The shifted form is the same repeated-root family with renamed constants.`,answer:`\\(y=e^{x-1}[12-17(x-1)]\\)`},
  {n:18,eq:`\\(y''-5y'+12y=0\\)`,ic:`\\(y(2)=0,\\ y'(2)=-4\\)`,char:`\\(r^2-5r+12=0\\)`,family:`\\(y=e^{5(x-2)/2}[A\\cos(\\tfrac{\\sqrt{23}}2(x-2))+B\\sin(\\tfrac{\\sqrt{23}}2(x-2))]\\)`,deriv:`At \\(x=2\\), the exponential is 1, cosine is 1, and sine is 0.`,work:`The value condition gives \\(A=0\\). With \\(A=0\\), the derivative at \\(x=2\\) is \\(B\\sqrt{23}/2\\). Set this equal to \\(-4\\): \\(B=-8/\\sqrt{23}\\).`,answer:`\\(y=-\\frac8{\\sqrt{23}}e^{5(x-2)/2}\\sin(\\tfrac{\\sqrt{23}}2(x-2))\\)`},
  {n:19,eq:`\\(y''-y'+4y=0\\)`,ic:`\\(y(-2)=1,\\ y'(-2)=3\\)`,char:`\\(r^2-r+4=0\\)`,family:`\\(y=e^{(x+2)/2}[A\\cos(\\tfrac{\\sqrt{15}}2(x+2))+B\\sin(\\tfrac{\\sqrt{15}}2(x+2))]\\)`,deriv:`At \\(x=-2\\), \\(y=A\\) and \\(y'=\\tfrac12A+\\tfrac{\\sqrt{15}}2B\\).`,work:`Thus \\(A=1\\). The slope condition is \\(1/2+(\\sqrt{15}/2)B=3\\), so \\(B=5/\\sqrt{15}=\\sqrt{15}/3\\).`,answer:`\\(y=e^{(x+2)/2}[\\cos(\\tfrac{\\sqrt{15}}2(x+2))+\\tfrac{\\sqrt{15}}3\\sin(\\tfrac{\\sqrt{15}}2(x+2))]\\)`},
  {n:20,eq:`\\(y''+y'-y=0\\)`,ic:`\\(y(-4)=7,\\ y'(-4)=1\\)`,char:`\\(r^2+r-1=0\\)`,family:`\\(y=Ae^{r_+(x+4)}+Be^{r_-(x+4)},\\quad r_\\pm=\\frac{-1\\pm\\sqrt5}{2}\\)`,deriv:`At \\(x=-4\\), \\(A+B=7\\) and \\(r_+A+r_-B=1\\).`,work:`Solving the two linear equations gives \\(A=\\frac72+\\frac{9\\sqrt5}{10}\\) and \\(B=\\frac72-\\frac{9\\sqrt5}{10}\\). Using \\(x+4\\) avoids carrying large factors \\(e^{\\pm4r}\\) through the algebra.`,answer:`\\(y=(\\frac72+\\frac{9\\sqrt5}{10})e^{r_+(x+4)}+(\\frac72-\\frac{9\\sqrt5}{10})e^{r_-(x+4)}\\)`}
];

function l3IVPBookScreen(d){
  return l3BookProblem(d.n,
    `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.2 Problem ${d.n}</span><br>Solve the initial-value problem ${d.eq}, ${d.ic}.</p>`,
    `<p><b>1. Characteristic equation.</b></p><div class="eq">${d.char}</div>
     <p><b>2. Write the correct homogeneous family.</b></p><div class="eq">${d.family}</div>
     <p><b>3. Differentiate before using the slope condition.</b></p><div class="eq">${d.deriv}</div>
     <p><b>4. Apply both initial conditions.</b> ${d.work}</p>
     <div class="whybox"><b>IVP solution:</b><div class="eq">${d.answer}</div></div>`
  );
}

const l3P21 = l3BookProblem(21,
  `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.2 Problem 21</span><br>
  (a) Find a general solution of \\(y''-2\\alpha y'+\\alpha^2y=0\\).<br>
  (b) For \\(\\varepsilon>0\\), find a general solution of \\(y''-2\\alpha y'+(\\alpha^2-\\varepsilon^2)y=0\\).<br>
  (c) Explain what happens to the family in (b) as \\(\\varepsilon\\to0\\), and why this illustrates a subtle change when two roots merge.</p>`,
  `<p><b>(a) Repeated root.</b></p><div class="eq">\\(r^2-2\\alpha r+\\alpha^2=(r-\\alpha)^2\\).</div>
   <p>The root \\(r=\\alpha\\) has multiplicity two, so</p><div class="eq">\\(\\phi(x)=(c_1+c_2x)e^{\\alpha x}.\\)</div>
   <p><b>(b) Split the repeated root.</b></p><div class="eq">\\(r^2-2\\alpha r+\\alpha^2-\\varepsilon^2=(r-\\alpha-\\varepsilon)(r-\\alpha+\\varepsilon).\\)</div>
   <p>Hence</p><div class="eq">\\(\\phi_\\varepsilon(x)=c_1e^{(\\alpha+\\varepsilon)x}+c_2e^{(\\alpha-\\varepsilon)x}.\\)</div>
   <p><b>(c) Why the naive limit loses a direction.</b> If the constants \\(c_1,c_2\\) are kept fixed and \\(\\varepsilon\\to0\\), both exponentials approach \\(e^{\\alpha x}\\). The family collapses to</p><div class="eq">\\((c_1+c_2)e^{\\alpha x}\\)</div>
   <p>which does not display the independent solution \\(xe^{\\alpha x}\\). The differential equation changes smoothly, but a convenient basis of solutions need not. This is why the repeated-root case needs special care.</p>`
);

const l3P22 = l3BookProblem(22,
  `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.2 Problem 22</span><br>
  Suppose \\(a^2=4b\\) and \\(a\\ne0\\). Given \\(y_1=e^{-ax/2}\\) for \\(y''+ay'+by=0\\), derive a second solution by trying \\(y_2=u(x)e^{-ax/2}\\).</p>`,
  `<p><b>1. Use the proposed reduction-of-order form.</b></p><div class="eq">\\(y_2=ue^{-ax/2}.\\)</div>
   <p>Differentiate with the product rule:</p><div class="eq">\\(y_2'=e^{-ax/2}(u'-\\tfrac a2u).\\)</div>
   <p>Differentiate again:</p><div class="eq">\\(y_2''=e^{-ax/2}(u''-au'+\\tfrac{a^2}{4}u).\\)</div>
   <p><b>2. Substitute into the ODE.</b> Because \\(b=a^2/4\\),</p>
   <div class="eq">\\(y_2''+ay_2'+by_2=e^{-ax/2}[u''-au'+\\tfrac{a^2}{4}u+au'-\\tfrac{a^2}{2}u+\\tfrac{a^2}{4}u].\\)</div>
   <p>Every term except \\(u''\\) cancels:</p><div class="eq">\\(e^{-ax/2}u''=0\\Rightarrow u''=0.\\)</div>
   <p><b>3. Solve the reduced equation.</b> \\(u=C_1x+C_2\\). The \\(C_2\\) part only reproduces a constant multiple of \\(y_1\\), so choose \\(u=x\\) to obtain a genuinely new direction:</p>
   <div class="whybox"><div class="eq">\\(y_2=xe^{-ax/2}.\\)</div></div>
   <p>The pair \\(e^{-ax/2},xe^{-ax/2}\\) is the repeated-root basis used throughout §2.2.</p>`
);

const l3P23 = l3BookProblem(23,
  `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.2 Problem 23</span><br>
  Let \\(\\phi\\) solve \\(y''+ay'+by=0\\), where \\(a>0\\) and \\(b>0\\). Show that \\(\\lim_{x\\to\\infty}\\phi(x)=0\\). Does the conclusion necessarily hold if \\(a\\) and \\(b\\) are not both positive?</p>`,
  `<p>The characteristic polynomial is</p><div class="eq">\\(r^2+ar+b.\\)</div>
   <p><b>Case 1: real roots.</b> Their sum is \\(r_1+r_2=-a<0\\) and their product is \\(r_1r_2=b>0\\). A positive product means the roots have the same sign; the negative sum forces both to be negative. Every exponential term therefore decays.</p>
   <p><b>Case 2: repeated root.</b> The root is \\(r=-a/2<0\\), so both \\(e^{-ax/2}\\) and \\(xe^{-ax/2}\\) tend to zero. Exponential decay dominates the factor \\(x\\).</p>
   <p><b>Case 3: complex roots.</b> They have real part \\(-a/2<0\\). The real solution has the form</p><div class="eq">\\(e^{-ax/2}[c_1\\cos(\\beta x)+c_2\\sin(\\beta x)],\\)</div>
   <p>and the bounded sine/cosine factor is multiplied by a decaying exponential. Thus every solution tends to zero.</p>
   <div class="whybox"><b>Why positivity matters:</b> the conclusion can fail without it. For example, \\(a=0,b=1\\) gives \\(y''+y=0\\), and \\(y=\\cos x\\) does not tend to zero.</div>`
);

const lesson3BookScreens = [
  ...l3GeneralBookData.map(l3GeneralBookScreen),
  ...l3IVPBookData.map(l3IVPBookScreen),
  l3P21,l3P22,l3P23
];

const lesson3BaseUnits = [
  {
    id:"l3-characteristic",courseLesson:3,color:"#4059ad",badge:"1",label:"Characteristic equation",
    title:"Why the Characteristic Equation Works",subtitle:"Turn differentiation into algebra",
    desc:"Derive the exponential trial from first principles, understand exactly why the characteristic polynomial appears, and solve O’Neil’s first constant-coefficient example without treating the method as a magic recipe.",
    lessons:[
      {title:"From the ODE to a polynomial",screens:[
        {type:"teach",title:"What changes from Lesson 2?",html:`
          <p>${lesson3CoreTag}</p>
          <p>Lesson 2 told us what a complete homogeneous solution must look like once two independent solutions are known. The new question is: <b>how do we actually find those solutions?</b></p>
          <div class="tip"><b>Source map:</b> the syllabus labels Sep. 21 as O’Neil §§2.2–2.3, but in the supplied 8th SI edition §2.3 begins <em>particular solutions of nonhomogeneous equations</em>, which the syllabus schedules for Sep. 23. This lesson therefore uses O’Neil §2.2 for the constant-coefficient theory and treats the syllabus-required nth-order generalization as a clearly labeled course extension; nonhomogeneous methods remain in Lesson 4.</div>
          <p>For the constant-coefficient equation</p><div class="eq">\\[y''+ay'+by=0,\\]</div>
          <p>O’Neil exploits a special property of exponentials: differentiating \\(e^{rx}\\) never changes its basic shape.</p>
          <div class="beginner"><b>Key idea:</b> if differentiation only multiplies the same function by constants, then a differential equation can collapse into an ordinary algebraic equation for those constants.</div>`},
        {type:"teach",title:"Why try an exponential?",html:`
          <p>${lesson3ExplainTag}</p>
          <p>Try</p><div class="eq">\\[y=e^{rx}.\\]</div>
          <p>Here \\(r\\) is not yet known. Differentiate carefully:</p><div class="eq">\\[y'=re^{rx},\\qquad y''=r^2e^{rx}.\\]</div>
          <p>Every term contains the same nonzero factor \\(e^{rx}\\). That is exactly why this trial is useful.</p>
          <p>Substitute into \\(y''+ay'+by=0\\):</p><div class="eq">\\[r^2e^{rx}+ar e^{rx}+b e^{rx}=0.\\]</div>`},
        {type:"teach",title:"Derive the characteristic equation — do not just memorize it",html:`
          <p>${lesson3CoreTag}</p>
          <p>Factor out the common exponential:</p><div class="eq">\\[e^{rx}(r^2+ar+b)=0.\\]</div>
          <p>For every finite real or complex \\(r\\) and every real \\(x\\), \\(e^{rx}\\neq0\\). Therefore the exponential cannot make the product zero. The polynomial factor must:</p>
          <div class="eq">\\[\\boxed{r^2+ar+b=0}.\\]</div>
          <div class="whybox"><b>This is the characteristic equation.</b> Its roots are exactly the values of \\(r\\) for which \\(e^{rx}\\) solves the ODE.</div>`},
        {type:"quiz",title:"Why may we divide by the exponential?",q:`After substituting \\(y=e^{rx}\\), why is it legal to divide by \\(e^{rx}\\)?`,options:[`Because e^{rx} is never zero`,`Because r is always positive`,`Because the ODE is first order`],answer:0,why:`The exponential factor never vanishes, so it cannot be responsible for the product being zero.`},
        {type:"teach",title:"The discriminant predicts the shape of the solution",html:`
          <p>The roots are</p><div class="eq">\\[r=\\frac{-a\\pm\\sqrt{a^2-4b}}{2}.\\]</div>
          <p>The discriminant \\(a^2-4b\\) produces the three cases in O’Neil §2.2:</p>
          <div class="reviewGrid"><div class="mini"><b>Positive</b><p>Two distinct real roots.</p></div><div class="mini"><b>Zero</b><p>One repeated real root.</p></div><div class="mini"><b>Negative</b><p>A complex-conjugate pair.</p></div></div>
          <p>Those are not three unrelated tricks. They are simply the three possible root patterns of a real quadratic.</p>`}
      ]},
      {title:"O’Neil Example 2.3",screens:[
        {type:"teach",title:"Worked example: O’Neil Example 2.3",html:`
          <p><span class="supplementalTag">Textbook example · O’Neil Example 2.3</span></p>
          <p>Solve</p><div class="eq">\\[y''-y'-6y=0.\\]</div>
          <p><b>Step 1 — read the characteristic equation from the coefficients.</b></p><div class="eq">\\[r^2-r-6=0.\\]</div>
          <p><b>Step 2 — factor.</b> We need two numbers whose product is \\(-6\\) and sum is \\(-1\\):</p><div class="eq">\\[(r-3)(r+2)=0.\\]</div>
          <p>Thus \\(r_1=3\\) and \\(r_2=-2\\).</p>
          <p><b>Step 3 — turn each root back into an exponential solution.</b></p><div class="eq">\\[y_1=e^{3x},\\qquad y_2=e^{-2x}.\\]</div>
          <p>Because the roots are distinct, these two exponentials are independent. Therefore</p><div class="whybox"><div class="eq">\\[y=c_1e^{3x}+c_2e^{-2x}.\\]</div></div>`},
        {type:"quiz",title:"Root-to-solution translation",q:`If \\(r=-5\\) is a characteristic root, which exponential solution does it generate?`,options:[`e^{-5x}`,`-5e^x`,`x^{-5}`],answer:0,why:`The trial function is e^{rx}; insert r=-5.`}
      ]}
    ]
  },
  {
    id:"l3-distinct",courseLesson:3,color:"#2e7d69",badge:"2",label:"Distinct roots",
    title:"Distinct Real Roots",subtitle:"Two roots give two independent exponential directions",
    desc:"Understand the distinct-real-root case conceptually, verify independence rather than merely asserting it, and practice the direct characteristic-equation workflow with real textbook exercises.",
    lessons:[
      {title:"Why two different roots are enough",screens:[
        {type:"teach",title:"The distinct-root rule",html:`
          <p>${lesson3CoreTag}</p>
          <p>If the characteristic equation has distinct real roots \\(r_1\\neq r_2\\), then</p><div class="eq">\\[y_1=e^{r_1x},\\qquad y_2=e^{r_2x}.\\]</div>
          <p>are solutions. The general solution is</p><div class="eq">\\[\\boxed{y=c_1e^{r_1x}+c_2e^{r_2x}}.\\]</div>
          <p>This uses Lesson 2’s structure theorem: we need two <em>independent</em> homogeneous solutions, not just two expressions.</p>`},
        {type:"teach",title:"Why the two exponentials are independent",html:`
          <p>${lesson3ExplainTag}</p>
          <p>Compute their Wronskian:</p><div class="eq">\\[W=\\begin{vmatrix}e^{r_1x}&e^{r_2x}\\\\r_1e^{r_1x}&r_2e^{r_2x}\\end{vmatrix}.\\]</div>
          <p>Expand the determinant:</p><div class="eq">\\[W=r_2e^{(r_1+r_2)x}-r_1e^{(r_1+r_2)x}.\\]</div>
          <p>Factor:</p><div class="eq">\\[W=(r_2-r_1)e^{(r_1+r_2)x}.\\]</div>
          <p>Since \\(r_1\\neq r_2\\) and an exponential never vanishes, \\(W\\neq0\\). So the pair is independent.</p>`},
        {type:"quiz",title:"A zero characteristic root is allowed",q:`If the roots are \\(0\\) and \\(3\\), what is the corresponding general solution?`,options:[`c₁+c₂e^{3x}`,`c₁x+c₂e^{3x}`,`c₁e^{0}+c₂e^{-3x}`],answer:0,why:`e^{0x}=1, so a zero root contributes a constant solution.`}
      ]},
      {title:"Method selection",screens:[
        {type:"teach",title:"A repeatable distinct-root workflow",html:`
          <ol class="steps"><li>Confirm the ODE is homogeneous and has constant coefficients.</li><li>Write its characteristic polynomial.</li><li>Factor it or use the quadratic formula.</li><li>If the two roots are real and different, write one exponential for each.</li><li>If initial data are present, differentiate the complete family and solve the resulting two linear equations.</li><li>Substitute back if you want a final correctness check.</li></ol>
          <div class="warn"><b>Do not use this rule blindly.</b> If the roots coincide or become complex, the form of the real basis changes. Those are the next units.</div>`}
      ]}
    ]
  },
  {
    id:"l3-reduction",courseLesson:3,color:"#9b5a37",badge:"3",label:"Reduction of order",
    title:"Repeated Roots & Reduction of Order",subtitle:"How one known solution produces a second independent one",
    desc:"Explain why a repeated root appears to give only one exponential, derive the missing xe^{rx} solution, and learn the general reduction-of-order formula instead of memorizing the repeated-root rule.",
    lessons:[
      {title:"The repeated-root problem",screens:[
        {type:"teach",title:"Why a repeated root creates a problem",html:`
          <p>${lesson3CoreTag}</p>
          <p>If the characteristic polynomial has the repeated root \\(r\\), writing \\(e^{rx}\\) twice does <b>not</b> give two independent solutions:</p><div class="eq">\\[c_1e^{rx}+c_2e^{rx}=(c_1+c_2)e^{rx}.\\]</div>
          <p>That still contains only one independent direction. A second-order homogeneous equation needs two.</p>
          <div class="beginner"><b>The question reduction of order answers:</b> if we already know one nonzero solution \\(y_1\\), can we use it to manufacture a second solution rather than starting from scratch?</div>`},
        {type:"teach",title:"O’Neil’s repeated-root rule",html:`
          <p>For</p><div class="eq">\\[y''+ay'+by=0,\\]</div>
          <p>if \\(a^2-4b=0\\), the repeated root is \\(r=-a/2\\). O’Neil gives the independent pair</p><div class="eq">\\[e^{-ax/2},\\qquad xe^{-ax/2}.\\]</div>
          <p>Hence</p><div class="eq">\\[\\boxed{y=(c_1+c_2x)e^{-ax/2}}.\\]</div>
          <p>The extra factor \\(x\\) is not decoration: it is what prevents the second solution from being merely a constant multiple of the first.</p>`},
        {type:"teach",title:"Worked example: O’Neil Example 2.4",html:`
          <p><span class="supplementalTag">Textbook example · O’Neil Example 2.4</span></p>
          <p>Solve</p><div class="eq">\\[y''+8y'+16y=0.\\]</div>
          <p>The characteristic equation is</p><div class="eq">\\[r^2+8r+16=(r+4)^2=0.\\]</div>
          <p>So \\(r=-4\\) is repeated. One solution is \\(e^{-4x}\\); the independent companion is \\(xe^{-4x}\\). Therefore</p><div class="whybox"><div class="eq">\\[y=(c_1+c_2x)e^{-4x}.\\]</div></div>`}
      ]},
      {title:"General reduction of order",screens:[
        {type:"teach",title:"Start from y₂=v(x)y₁(x)",html:`
          <p>${lesson3ExplainTag}</p>
          <p>Now derive the more general idea. Suppose \\(y_1\\) is a known nonzero solution of</p><div class="eq">\\[y''+p(x)y'+q(x)y=0.\\]</div>
          <p>Instead of guessing a completely unrelated second function, let</p><div class="eq">\\[y_2=v(x)y_1(x).\\]</div>
          <p>If \\(v\\) were constant, \\(y_2\\) would be dependent on \\(y_1\\). So we let \\(v\\) vary with \\(x\\).</p>`},
        {type:"teach",title:"Differentiate without skipping the product-rule terms",html:`
          <p>First derivative:</p><div class="eq">\\[y_2'=v'y_1+vy_1'.\\]</div>
          <p>Second derivative: differentiate <em>both</em> products:</p><div class="eq">\\[y_2''=v''y_1+v'y_1'+v'y_1'+vy_1''=v''y_1+2v'y_1'+vy_1''.\\]</div>
          <div class="warn"><b>Common mistake:</b> losing one of the two \\(v'y_1'\\) terms. The coefficient 2 is essential.</div>`},
        {type:"teach",title:"Substitution makes the order drop",html:`
          <p>Insert the derivatives into the homogeneous ODE:</p>
          <div class="eq">\\[v''y_1+2v'y_1'+vy_1''+p(v'y_1+vy_1')+qvy_1=0.\\]</div>
          <p>Group by \\(v'',v',v\\):</p><div class="eq">\\[v''y_1+v'(2y_1'+py_1)+v(y_1''+py_1'+qy_1)=0.\\]</div>
          <p>The last bracket is zero because \\(y_1\\) is already a solution. Thus</p><div class="eq">\\[v''y_1+v'(2y_1'+py_1)=0.\\]</div>
          <p>The original second-order problem has been reduced to an equation involving only \\(v'\\) and \\(v''\\) — hence <b>reduction of order</b>.</p>`},
        {type:"teach",title:"Derive the reduction-of-order formula",html:`
          <p>${lesson3ExplainTag}</p>
          <p>Let \\(w=v'\\). This is the symbol that records how fast the new multiplier \\(v(x)\\) changes. Divide by \\(y_1\\) on an interval where \\(y_1\\neq0\\):</p><div class="eq">\\[w'+\\left(2\\frac{y_1'}{y_1}+p\\right)w=0.\\]</div>
          <p>If \\(w=0\\) identically, then \\(v\\) is constant and \\(y_2=vy_1\\) is only a dependent copy of the known solution. Since our goal is an <em>independent</em> second solution, work on the nonzero branch \\(w\\neq0\\). There we may divide by \\(w\\):</p><div class="eq">\\[\\frac{w'}w=-2\\frac{y_1'}{y_1}-p.\\]</div>
          <p>Integrate:</p><div class="eq">\\[\\ln|w|=-2\\ln|y_1|-\\int p(x)\\,dx+C.\\]</div>
          <p>Exponentiating gives a nonzero constant multiple of</p><div class="eq">\\[w=v'=\\frac{e^{-\\int p(x)dx}}{y_1^2}.\\]</div><p>That multiplicative constant only rescales the eventual second solution, so we may choose it to be 1.</p>
          <p>Integrate once more and multiply by \\(y_1\\):</p><div class="whybox"><div class="eq">\\[\\boxed{y_2=y_1\\int\\frac{e^{-\\int p(x)dx}}{y_1^2}\\,dx}.\\]</div></div><p><b>What happened to the outer integration constant?</b> Adding a constant \\(K\\) to that antiderivative changes \\(y_2\\) by \\(K y_1\\), which is only a multiple of the solution we already know. It does not create a new independent direction, so we may choose one convenient antiderivative.</p>`},
        {type:"teach",title:"Why the formula produces xe^{rx} for a repeated root",html:`
          <p>For the repeated-root constant-coefficient case, \\(p(x)=a\\) and</p><div class="eq">\\[y_1=e^{-ax/2}.\\]</div>
          <p>Then</p><div class="eq">\\[e^{-\\int p dx}=e^{-ax},\\qquad y_1^2=e^{-ax}.\\]</div>
          <p>The ratio is simply 1:</p><div class="eq">\\[\\frac{e^{-ax}}{e^{-ax}}=1.\\]</div>
          <p>So</p><div class="eq">\\[y_2=y_1\\int1\\,dx=xe^{-ax/2}.\\]</div>
          <p>That is exactly O’Neil’s repeated-root second solution. The rule is therefore a consequence of reduction of order, not an arbitrary pattern.</p>`},
        {type:"quiz",title:"What actually reduces?",q:`When \\(y_2=vy_1\\) is substituted and the known-solution terms cancel, why is this called reduction of order?`,options:[`The equation becomes first order in w=v′`,`The original ODE becomes algebraic immediately`,`The coefficient q must become zero`],answer:0,why:`After setting w=v′, the remaining equation is first order in w.`}
      ]}
    ]
  },
  {
    id:"l3-complex",courseLesson:3,color:"#7651b8",badge:"4",label:"Complex roots",
    title:"Complex Roots, Real Solutions",subtitle:"Use Euler’s formula to turn conjugate exponentials into sine and cosine",
    desc:"Understand why complex roots occur in conjugate pairs, how Euler’s formula produces a real basis, and why the real solution oscillates inside an exponential envelope.",
    lessons:[
      {title:"From α ± iβ to a real basis",screens:[
        {type:"teach",title:"Complex-number prerequisite — define i before using it",html:`
          <p>${lesson3ExplainTag}</p>
          <p>The symbol \\(i\\) is defined by</p><div class="eq">\\[i^2=-1.\\]</div><p>A complex number has the form \\(\\alpha+i\\beta\\), where \\(\\alpha\\) is its real part and \\(\\beta\\) is the coefficient of its imaginary part. Its <b>complex conjugate</b> is \\(\\alpha-i\\beta\\).</p><p>When a real quadratic has negative discriminant, write</p><div class="eq">\\[\\sqrt{-d}=i\\sqrt d,\\qquad d>0.\\]</div><p>That is the only complex-number algebra needed for the root calculation here; Euler’s formula on the next screen converts the resulting complex exponentials back into real sine/cosine solutions.</p>`},
        {type:"teach",title:"Complex roots are not a problem",html:`
          <p>${lesson3CoreTag}</p>
          <p>With real coefficients, nonreal characteristic roots come in conjugate pairs</p><div class="eq">\\[r=\\alpha\\pm i\\beta,\\qquad \\beta\\ne0.\\]</div>
          <p>The corresponding complex exponential solutions are \\(e^{(\\alpha+i\\beta)x}\\) and \\(e^{(\\alpha-i\\beta)x}\\). They are mathematically valid, but for a real ODE we usually want a real-valued basis.</p>`},
        {type:"teach",title:"Euler’s formula supplies the real and imaginary parts",html:`
          <p>${lesson3ExplainTag}</p>
          <p>Euler’s formula is</p><div class="eq">\\[e^{i\\theta}=\\cos\\theta+i\\sin\\theta.\\]</div>
          <p>Therefore</p><div class="eq">\\[e^{(\\alpha+i\\beta)x}=e^{\\alpha x}[\\cos(\\beta x)+i\\sin(\\beta x)].\\]</div>
          <p>Its real part \\(e^{\\alpha x}\\cos(\\beta x)\\) and imaginary part \\(e^{\\alpha x}\\sin(\\beta x)\\) are both real solutions. They are independent, so the real general solution is</p>
          <div class="whybox"><div class="eq">\\[\\boxed{y=e^{\\alpha x}[c_1\\cos(\\beta x)+c_2\\sin(\\beta x)]}.\\]</div></div>`},
        {type:"teach",title:"Read the geometry from α and β",html:`
          <p>The real part \\(\\alpha\\) controls the exponential envelope \\(e^{\\alpha x}\\): negative \\(\\alpha\\) gives decay, positive \\(\\alpha\\) gives growth, and zero gives constant amplitude.</p>
          <p>The imaginary magnitude \\(\\beta\\) controls oscillation: the angular frequency in \\(x\\) is \\(\\beta\\), so the period is \\(2\\pi/|\\beta|\\).</p>
          <div class="tip"><b>Do not confuse the two jobs:</b> \\(\\alpha\\) controls the envelope; \\(\\beta\\) controls the oscillation rate.</div>`}
      ]},
      {title:"O’Neil Example 2.5",screens:[
        {type:"teach",title:"Worked example: O’Neil Example 2.5",html:`
          <p><span class="supplementalTag">Textbook example · O’Neil Example 2.5</span></p>
          <p>Solve</p><div class="eq">\\[y''+2y'+3y=0.\\]</div>
          <p>Characteristic equation:</p><div class="eq">\\[r^2+2r+3=0.\\]</div>
          <p>Quadratic formula:</p><div class="eq">\\[r=\\frac{-2\\pm\\sqrt{4-12}}2=-1\\pm\\sqrt2\,i.\\]</div>
          <p>Thus \\(\\alpha=-1\\) and \\(\\beta=\\sqrt2\\). Insert these into the real complex-root form:</p>
          <div class="whybox"><div class="eq">\\[y=e^{-x}[c_1\\cos(\\sqrt2x)+c_2\\sin(\\sqrt2x)].\\]</div></div>
          <p>The solution oscillates while its amplitude decays like \\(e^{-x}\\).</p>`},
        {type:"quiz",title:"Translate a conjugate pair",q:`For roots \\(-5\\pm i\\), which real solution family is correct?`,options:[`e^{-5x}(c₁cos x+c₂sin x)`,`e^x(c₁cos5x+c₂sin5x)`,`c₁e^{-5x}+c₂e^x`],answer:0,why:`The real part -5 gives the envelope e^{-5x}; the imaginary magnitude 1 gives cos x and sin x.`}
      ]},
      {title:"Engineering context without jumping ahead",screens:[
        {type:"teach",title:"Book context: the damped spring and the discriminant",html:`
          <p><span class="supplementalTag">Textbook context · O’Neil §2.2</span></p>
          <p>A free damped spring–mass system has the form</p><div class="eq">\\[m y''+c y'+ky=0.\\]</div>
          <p>Divide by \\(m\\):</p><div class="eq">\\[y''+\\frac cm y'+\\frac km y=0.\\]</div>
          <p>Its characteristic equation is</p><div class="eq">\\[mr^2+cr+k=0,\\]</div>
          <p>so the discriminant is \\(c^2-4mk\\). That single number decides whether the roots are real distinct, repeated, or complex.</p>
          <div class="warn"><b>Scope boundary:</b> the syllabus studies spring–mass–damper regimes and resonance in detail on Oct. 5. Here we use the model only to understand why the three root cases matter physically.</div>`}
      ]}
    ]
  },
  {
    id:"l3-ivp",courseLesson:3,color:"#c05b58",badge:"5",label:"IVPs",
    title:"Initial Values & Root-Case Selection",subtitle:"Recognize the root pattern, write the right family, then fit the constants",
    desc:"Combine characteristic roots with the two initial conditions of a second-order IVP, and learn a practical workflow that catches repeated-root and complex-root mistakes before they spread.",
    lessons:[
      {title:"The complete second-order workflow",screens:[
        {type:"teach",title:"Method-selection checklist",html:`
          <p>${lesson3CoreTag}</p>
          <ol class="steps"><li>Check that the equation is linear, homogeneous, and constant-coefficient.</li><li>Write the characteristic polynomial.</li><li>Solve it completely, including multiplicity and complex parts.</li><li>Choose the correct real general-solution form for the root case.</li><li>Differentiate the <em>whole</em> general solution.</li><li>Apply \\(y(x_0)\\) and \\(y'(x_0)\\) to obtain two equations for the two constants.</li><li>Check the ODE and both initial conditions.</li></ol>`},
        {type:"quiz",title:"Repeated root warning",q:`The characteristic equation is \\((r-2)^2=0\\). Which family has two independent constants?`,options:[`(c₁+c₂x)e^{2x}`,`c₁e^{2x}+c₂e^{2x}`,`c₁e^{2x}+c₂e^{-2x}`],answer:0,why:`Writing the same exponential twice gives dependent terms; the second basis function must be x e^{2x}.`},
        {type:"teach",title:"Why shifting x can simplify IVPs",html:`
          <p>${lesson3ExplainTag}</p>
          <p>If initial data are imposed at \\(x=x_0\\), you may rewrite a distinct-root family as</p><div class="eq">\\[y=Ae^{r_1(x-x_0)}+Be^{r_2(x-x_0)}.\\]</div>
          <p>This is the same general family with renamed constants, because \\(e^{r(x-x_0)}=e^{-rx_0}e^{rx}\\). At \\(x=x_0\\), both exponentials become 1, often making the constant algebra much cleaner.</p>
          <div class="tip">This is an algebra convenience, not a new solution method.</div>`}
      ]},
      {title:"Root-pattern traps",screens:[
        {type:"quiz",title:"Trap — forgetting r=0",q:`For \\(r(r+3)=0\\), which two basis functions correspond to the roots?`,options:[`1 and e^{-3x}`,`x and e^{-3x}`,`e^x and e^{-3x}`],answer:0,why:`The root r=0 gives e^{0x}=1.`},
        {type:"quiz",title:"Trap — imaginary part versus real part",q:`For \\(r=2\\pm5i\\), what multiplies the sine and cosine?`,options:[`e^{2x}`,`e^{5x}`,`x²`],answer:0,why:`The real part 2 gives the exponential envelope; 5 is the oscillation frequency.`},
        {type:"quiz",title:"Trap — differentiating a repeated-root family",q:`If \\(y=(c_1+c_2x)e^{rx}\\), which product-rule contribution must appear in \\(y'\\)?`,options:[`c₂e^{rx}`,`c₁x e^{rx}`,`r²e^{rx} only`],answer:0,why:`Differentiating c₁+c₂x contributes c₂, while differentiating e^{rx} contributes r(c₁+c₂x).`}
      ]}
    ]
  },
  {
    id:"l3-nth",courseLesson:3,color:"#d27a42",badge:"6",label:"nth order",
    title:"nth-Order Generalization",subtitle:"The same characteristic-polynomial idea scales beyond second order",
    desc:"Cover the syllabus-required nth-order extension explicitly: characteristic polynomials of degree n, multiplicity, conjugate roots, n independent solution directions, and n initial data.",
    lessons:[
      {title:"The nth-order pattern",screens:[
        {type:"teach",title:"What “nth-order” means here",html:`
          <p>${lesson3SyllabusTag}</p>
          <p>The syllabus explicitly requires an <b>nth-order generalization</b>. For a constant-coefficient homogeneous linear ODE, write</p>
          <div class="eq">\\[a_ny^{(n)}+a_{n-1}y^{(n-1)}+\\cdots+a_1y'+a_0y=0,\\qquad a_n\\ne0.\\]</div>
          <p>The notation \\(y^{(n)}\\) means the \\(n\\)th derivative. The second-order equation from the previous units is the special case \\(n=2\\).</p>
          <div class="beginner"><b>Why this belongs here:</b> the exponential idea does not depend on there being exactly two derivatives. Every derivative of \\(e^{rx}\\) simply contributes another power of \\(r\\).</div>`},
        {type:"teach",title:"Derive the nth-degree characteristic polynomial",html:`
          <p>Try \\(y=e^{rx}\\). Then</p><div class="eq">\\[y'=re^{rx},\\ y''=r^2e^{rx},\\ldots,\\ y^{(n)}=r^ne^{rx}.\\]</div>
          <p>Substitution gives</p><div class="eq">\\[e^{rx}(a_nr^n+a_{n-1}r^{n-1}+\\cdots+a_1r+a_0)=0.\\]</div>
          <p>Divide by the nonzero exponential:</p><div class="whybox"><div class="eq">\\[\\boxed{P(r)=a_nr^n+a_{n-1}r^{n-1}+\\cdots+a_1r+a_0=0}.\\]</div></div>
          <p>The differential-equation problem has again become a polynomial-root problem.</p>`},
        {type:"teach",title:"Multiplicity tells you how many x-powers are needed",html:`
          <p>${lesson3ExplainTag}</p>
          <p>If a real root \\(r_0\\) has multiplicity \\(m\\), it contributes \\(m\\) independent functions:</p><div class="eq">\\[e^{r_0x},\\ xe^{r_0x},\\ x^2e^{r_0x},\\ldots,x^{m-1}e^{r_0x}.\\]</div>
          <p>For \\(m=2\\), this is exactly the repeated-root rule from O’Neil §2.2. Higher multiplicity simply continues the same pattern.</p>`},
        {type:"teach",title:"Repeated complex roots follow the same multiplicity idea",html:`
          <p>If \\(\\alpha\\pm i\\beta\\) is a conjugate root pair of multiplicity \\(m\\), then for each \\(k=0,1,\\ldots,m-1\\) the real basis includes</p><div class="eq">\\[x^ke^{\\alpha x}\\cos(\\beta x),\\qquad x^ke^{\\alpha x}\\sin(\\beta x).\\]</div>
          <p>Each conjugate pair therefore contributes two real solution directions per multiplicity level.</p>`},
        {type:"teach",title:"An nth-order IVP needs n pieces of initial data",html:`
          <p>A regular \\(n\\)th-order linear homogeneous equation has \\(n\\) independent constants in its general solution. A standard IVP therefore prescribes</p><div class="eq">\\[y(x_0),\\ y'(x_0),\\ y''(x_0),\\ldots,y^{(n-1)}(x_0).\\]</div>
          <p>That is the same counting principle seen earlier: second order → two constants → value and slope; third order → three constants → value, slope, and curvature; and so on.</p>`}
      ]},
      {title:"Higher-order worked examples",screens:[
        {type:"teach",title:"Worked example: third order with a repeated root",html:`
          <p>${lesson3SyllabusTag}</p>
          <p>Solve</p><div class="eq">\\[y'''-3y'+2y=0.\\]</div>
          <p>Characteristic polynomial:</p><div class="eq">\\[r^3-3r+2.\\]</div>
          <p>Test \\(r=1\\): \\(1-3+2=0\\), so \\(r-1\\) is a factor. Factoring completely,</p><div class="eq">\\[r^3-3r+2=(r-1)^2(r+2).\\]</div>
          <p>The root \\(1\\) has multiplicity two, giving \\(e^x\\) and \\(xe^x\\). The root \\(-2\\) gives \\(e^{-2x}\\). Hence</p><div class="whybox"><div class="eq">\\[y=(c_1+c_2x)e^x+c_3e^{-2x}.\\]</div></div>
          <p>There are three constants, matching the third order.</p>`},
        {type:"teach",title:"Worked example: fourth order with two conjugate pairs",html:`
          <p>${lesson3SyllabusTag}</p>
          <p>Solve</p><div class="eq">\\[y^{(4)}+5y''+4y=0.\\]</div>
          <p>The characteristic equation is</p><div class="eq">\\[r^4+5r^2+4=0.\\]</div>
          <p>Treat \\(r^2\\) like one variable:</p><div class="eq">\\[(r^2+1)(r^2+4)=0.\\]</div>
          <p>Thus the roots are \\(\\pm i\\) and \\(\\pm2i\\). The two conjugate pairs give the four real basis functions \\(\\cos x,\\sin x,\\cos2x,\\sin2x\\). Therefore</p><div class="whybox"><div class="eq">\\[y=c_1\\cos x+c_2\\sin x+c_3\\cos2x+c_4\\sin2x.\\]</div></div>`},
        {type:"quiz",title:"Count the solution directions",q:`A fifth-order constant-coefficient homogeneous equation has roots \\(2\\) (multiplicity 3) and \\(-1\\pm i\\). How many real independent basis functions should the general solution contain?`,options:[`5`,`3`,`7`],answer:0,why:`The triple real root contributes 3 functions; the conjugate pair contributes 2, for a total of 5.`}
      ]},
      {title:"Scope boundary",screens:[
        {type:"teach",title:"What comes next — and what is deliberately not taught here",html:`
          <p>${lesson3CoreTag}</p>
          <p>This Sep. 21 lesson is now complete for the three syllabus items: <b>reduction of order, the constant-coefficient homogeneous equation, and nth-order generalization</b>.</p>
          <div class="warn"><b>Do not jump into a different method yet:</b> the Sep. 23 syllabus session begins particular solutions of <em>nonhomogeneous</em> equations and the method of undetermined coefficients. Those methods belong in the next lesson, not this one.</div>
          <p>The mental model to carry forward is:</p><div class="whybox">Homogeneous constant coefficients → exponential trial → characteristic polynomial → root pattern/multiplicity → complete independent basis → fit initial data.</div>`}
      ]}
    ]
  }
];

const lesson3Mastery = {
  id:"l3-mastery",courseLesson:3,color:"#9a3f69",badge:"7",label:"Book mastery",
  title:"O’Neil §2.2 Book Mastery",subtitle:"All 23 section exercises, with scratch space and hidden worked solutions",
  desc:"Work through the complete O’Neil §2.2 exercise set. Each problem opens on a full scratch whiteboard; reveal the worked solution only after attempting it yourself.",
  lessons:[
    {title:"Book Problems 1–5",screens:lesson3BookScreens.slice(0,5)},
    {title:"Book Problems 6–10",screens:lesson3BookScreens.slice(5,10)},
    {title:"Book Problems 11–15",screens:lesson3BookScreens.slice(10,15)},
    {title:"Book Problems 16–20",screens:lesson3BookScreens.slice(15,20)},
    {title:"Book Problems 21–23",screens:lesson3BookScreens.slice(20,23)}
  ]
};

const lesson3Units = [...lesson3BaseUnits,lesson3Mastery];

function l3CloneBook(number){
  const source=lesson3BookScreens.find(s=>s.title===`O’Neil §2.2 Problem ${number}`);
  return source?{...source,inlineBookPractice:true}:null;
}
function l3AddBookPractice(unitId,title,numbers){
  const unit=lesson3Units.find(u=>u.id===unitId);
  if(!unit)return;
  const screens=numbers.map(l3CloneBook).filter(Boolean);
  if(screens.length)unit.lessons.push({title,screens});
}

// Curated authentic textbook checkpoints: enough to test each new idea without turning the
// lesson into a second copy of the section exercise bank.
l3AddBookPractice("l3-characteristic","Book practice · characteristic equation",[1]);
l3AddBookPractice("l3-distinct","Book practice · distinct real roots",[6]);
l3AddBookPractice("l3-reduction","Book practice · repeated roots and reduction of order",[22]);
l3AddBookPractice("l3-complex","Book practice · complex roots",[5]);
l3AddBookPractice("l3-ivp","Book practice · initial-value problem",[14]);
l3AddBookPractice("l3-nth","Book practice · long-term structure",[23]);

// Keep the mastery unit slot so saved indices for later lessons do not move, but replace the
// repetitive 23-problem rerun with mixed transfer and error-audit tasks.
lesson3Mastery.label="Mixed mastery";
lesson3Mastery.title="Lesson 3 Mixed Mastery";
lesson3Mastery.subtitle="authentic O’Neil synthesis · root cases · reduction of order · nth-order structure";
lesson3Mastery.desc="A compact gate combining authentic O’Neil problems with original transfer/error-audit tasks. The next lesson’s nonhomogeneous methods are deliberately excluded.";
lesson3Mastery.lessons=[
 {title:"Authentic O’Neil synthesis",screens:[l3CloneBook(3),l3CloneBook(18)].filter(Boolean)},
 {title:"Mixed transfer",screens:[
  {type:"bookproblem",bookSection:"Lesson 3 transfer",practiceLabel:"Original course practice · not an O’Neil exercise",title:"Transfer · repeated root without memorizing x",prompt:`<p><span class="supplementalTag">Original transfer problem · course-aligned</span><br>For <span class="math">y′′−4y′+4y=0</span>, the characteristic equation has the repeated root <span class="math">r=2</span>. Explain why writing <span class="math">c₁e^(2x)+c₂e^(2x)</span> is incomplete, and derive a second solution using <span class="math">y₂=v(x)e^(2x)</span>.</p>`,solution:`<p>The two displayed exponentials are the same function, so their linear combination collapses to one direction.</p><p>Put <span class="math">y₂=ve^(2x)</span>. Then</p><div class="eq">y₂′=e^(2x)(v′+2v),</div><div class="eq">y₂′′=e^(2x)(v′′+4v′+4v).</div><p>Substitute:</p><div class="eq">e^(2x)[v′′+4v′+4v−4(v′+2v)+4v]=e^(2x)v′′=0.</div><p>Thus <span class="math">v′′=0</span>, so <span class="math">v=A+Bx</span>. The constant part reproduces <span class="math">e^(2x)</span>; choose <span class="math">v=x</span> for an independent second direction.</p><div class="whybox"><div class="eq">y=(c₁+c₂x)e^(2x).</div></div>`},
  {type:"bookproblem",bookSection:"Lesson 3 transfer",practiceLabel:"Original course practice · not an O’Neil exercise",title:"Transfer · diagnose the characteristic-equation scope",prompt:`<p><span class="supplementalTag">Original transfer problem · course-aligned</span><br>A student sees <span class="math">x²y′′+xy′−y=0</span> and immediately writes the polynomial <span class="math">r²+r−1=0</span>. What is wrong with that move?</p>`,solution:`<p>The standard exponential characteristic-polynomial method in this lesson assumes <b>constant coefficients</b>. Here the coefficients are <span class="math">x²</span> and <span class="math">x</span>, so substituting <span class="math">e^(rx)</span> does not factor out a common exponential times a constant polynomial in <span class="math">r</span>.</p><p>This equation is Euler/Cauchy type and belongs to a later method. Method recognition must happen before algebra.</p>`},
  {type:"bookproblem",bookSection:"Lesson 3 transfer",practiceLabel:"Original course practice · not an O’Neil exercise",title:"Transfer · nth-order multiplicity check",prompt:`<p><span class="supplementalTag">Original transfer problem · course-aligned</span><br>A fourth-order constant-coefficient homogeneous ODE has characteristic roots <span class="math">r=1</span> with multiplicity 3 and <span class="math">r=−2</span> with multiplicity 1. Write a real fundamental set and explain why it contains four functions.</p>`,solution:`<p>A root <span class="math">r</span> of multiplicity <span class="math">m</span> contributes</p><div class="eq">e^(rx), xe^(rx), …, x^(m−1)e^(rx).</div><p>Thus the triple root at 1 contributes <span class="math">e^x, xe^x, x²e^x</span>, and the simple root at −2 contributes <span class="math">e^(−2x)</span>.</p><div class="whybox"><div class="eq">{e^x, xe^x, x²e^x, e^(−2x)}</div></div><p>A fourth-order homogeneous linear equation needs four independent solution directions; the multiplicities account for all four.</p>`}
]}];

if(!units.some(u=>u&&u.id==="l3-characteristic"))units.push(...lesson3Units);

courseLessons[2]={
  number:3,
  title:"Characteristic Equations & Reduction of Order",
  subtitle:"Sep. 21 · O’Neil §2.2 · reduction of order · constant coefficients · nth-order generalization",
  status:"current"
};