/*
  Lesson 6 — Oct. 5: Euler differential equations; spring–mass–damper systems;
  damping regimes; resonance.
  Source alignment: O’Neil §2.4 is the Euler equation. Spring/resonance is developed
  in O’Neil Example 2.13 and the Spring Motion web module. The course outline's
  §2.4.1 / §2.5 labels do not match the uploaded 8th-edition section numbering.
*/

const lesson6CoreTag = '<span class="supplementalTag">Core · Oct. 5 syllabus · O’Neil §2.4 + Example 2.13</span>';
const lesson6ExplainTag = '<span class="supplementalTag">Expanded explanation · no skipped reasoning</span>';
const lesson6BookTag = '<span class="supplementalTag">Textbook example · O’Neil Chapter 2</span>';
const lesson6AppTag = '<span class="supplementalTag">Syllabus-required application · mechanics</span>';

function l6BookProblem(number,prompt,solution){
  return {type:"bookproblem",bookSection:"§2.4",title:`O’Neil §2.4 Problem ${number}`,prompt,solution};
}

const l6GeneralData = [
  {n:1,eq:`x^2y''+2xy'-6y=0`,char:`r^2+r-6=(r-2)(r+3)=0`,roots:`r=2,-3`,answer:`y=c_1x^2+c_2x^{-3}`},
  {n:2,eq:`x^2y''+3xy'+y=0`,char:`r^2+2r+1=(r+1)^2=0`,roots:`r=-1\\text{ twice}`,answer:`y=x^{-1}(c_1+c_2\\ln x)`},
  {n:3,eq:`x^2y''+xy'+4y=0`,char:`r^2+4=0`,roots:`r=\\pm2i`,answer:`y=c_1\\cos(2\\ln x)+c_2\\sin(2\\ln x)`},
  {n:4,eq:`x^2y''+xy'-4y=0`,char:`r^2-4=(r-2)(r+2)=0`,roots:`r=2,-2`,answer:`y=c_1x^2+c_2x^{-2}`},
  {n:5,eq:`x^2y''+xy'-16y=0`,char:`r^2-16=(r-4)(r+4)=0`,roots:`r=4,-4`,answer:`y=c_1x^4+c_2x^{-4}`},
  {n:6,eq:`x^2y''+3xy'+10y=0`,char:`r^2+2r+10=0`,roots:`r=-1\\pm3i`,answer:`y=x^{-1}[c_1\\cos(3\\ln x)+c_2\\sin(3\\ln x)]`},
  {n:7,eq:`x^2y''+6xy'+6y=0`,char:`r^2+5r+6=(r+2)(r+3)=0`,roots:`r=-2,-3`,answer:`y=c_1x^{-2}+c_2x^{-3}`},
  {n:8,eq:`x^2y''-5xy'+58y=0`,char:`r^2-6r+58=0`,roots:`r=3\\pm7i`,answer:`y=x^3[c_1\\cos(7\\ln x)+c_2\\sin(7\\ln x)]`},
  {n:9,eq:`x^2y''+25xy'+144y=0`,char:`r^2+24r+144=(r+12)^2=0`,roots:`r=-12\\text{ twice}`,answer:`y=x^{-12}(c_1+c_2\\ln x)`},
  {n:10,eq:`x^2y''-11xy'+35y=0`,char:`r^2-12r+35=(r-5)(r-7)=0`,roots:`r=5,7`,answer:`y=c_1x^5+c_2x^7`}
];

function l6GeneralScreen(d){
  return l6BookProblem(d.n,
    `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.4 Problem ${d.n}</span><br>Find the general solution for \\(x>0\\):</p><div class="eq">\\[${d.eq}.\\]</div>`,
    `<p><b>1. Use the Euler trial.</b> Put \\(y=x^r\\), so \\(xy'=r x^r\\) and \\(x^2y''=r(r-1)x^r\\).</p>
     <p><b>2. Characteristic equation.</b></p><div class="eq">\\[${d.char}.\\]</div>
     <p><b>3. Roots.</b></p><div class="eq">\\[${d.roots}.\\]</div>
     <p><b>4. Translate the root pattern back to an Euler basis.</b></p><div class="whybox"><div class="eq">\\[\\boxed{${d.answer}}.\\]</div></div>`
  );
}

const l6IvpData = [
  {n:11,eq:`x^2y''+5xy'-21y=0`,ic:`y(2)=1,\\ y'(2)=0`,char:`r^2+4r-21=(r-3)(r+7)=0`,family:`y=A(x/2)^3+B(x/2)^{-7}`,work:`At \\(x=2\\), \\(A+B=1\\). Also \\(y'(2)=(3A-7B)/2=0\\), so \\(3A=7B\\). Hence \\(A=7/10\\), \\(B=3/10\\).`,answer:`y=\\frac7{10}(x/2)^3+\\frac3{10}(x/2)^{-7}`},
  {n:12,eq:`x^2y''-xy'=0`,ic:`y(2)=5,\\ y'(2)=8`,char:`r(r-2)=0`,family:`y=c_1+c_2x^2`,work:`The value condition gives \\(c_1+4c_2=5\\). Since \\(y'=2c_2x\\), the slope condition gives \\(4c_2=8\\). Thus \\(c_2=2\\) and \\(c_1=-3\\).`,answer:`y=-3+2x^2`},
  {n:13,eq:`x^2y''-3xy'+4y=0`,ic:`y(1)=4,\\ y'(1)=5`,char:`(r-2)^2=0`,family:`y=x^2(c_1+c_2\\ln x)`,work:`At \\(x=1\\), \\(c_1=4\\). Differentiate: \\(y'=x[2(c_1+c_2\\ln x)+c_2]\\). Hence \\(y'(1)=2c_1+c_2=5\\), so \\(c_2=-3\\).`,answer:`y=x^2(4-3\\ln x)`},
  {n:14,eq:`x^2y''+25xy'+144y=0`,ic:`y(1)=-4,\\ y'(1)=0`,char:`(r+12)^2=0`,family:`y=x^{-12}(c_1+c_2\\ln x)`,work:`The value condition gives \\(c_1=-4\\). Differentiation gives \\(y'=x^{-13}[-12(c_1+c_2\\ln x)+c_2]\\). At \\(x=1\\), \\(-12c_1+c_2=0\\), hence \\(c_2=-48\\).`,answer:`y=-4x^{-12}(1+12\\ln x)`},
  {n:15,eq:`x^2y''-9xy'+24y=0`,ic:`y(1)=1,\\ y'(1)=10`,char:`(r-4)(r-6)=0`,family:`y=c_1x^4+c_2x^6`,work:`At \\(x=1\\), \\(c_1+c_2=1\\) and \\(4c_1+6c_2=10\\). Solving gives \\(c_1=-2\\), \\(c_2=3\\).`,answer:`y=-2x^4+3x^6`},
  {n:16,eq:`x^2y''+xy'-4y=0`,ic:`y(1)=7,\\ y'(1)=-3`,char:`(r-2)(r+2)=0`,family:`y=c_1x^2+c_2x^{-2}`,work:`At \\(x=1\\), \\(c_1+c_2=7\\). Since \\(y'=2c_1x-2c_2x^{-3}\\), the slope condition gives \\(2c_1-2c_2=-3\\). Therefore \\(c_1=11/4\\), \\(c_2=17/4\\).`,answer:`y=\\frac{11}{4}x^2+\\frac{17}{4}x^{-2}`}
];

function l6IvpScreen(d){
  return l6BookProblem(d.n,
    `<p><span class="supplementalTag">Textbook IVP · O’Neil §2.4 Problem ${d.n}</span><br>Solve for \\(x>0\\):</p><div class="eq">\\[${d.eq},\\qquad ${d.ic}.\\]</div>`,
    `<p><b>1. Characteristic equation.</b></p><div class="eq">\\[${d.char}.\\]</div>
     <p><b>2. General family.</b></p><div class="eq">\\[${d.family}.\\]</div>
     <p><b>3. Apply the two conditions.</b> ${d.work}</p>
     <div class="whybox"><b>IVP solution:</b><div class="eq">\\[\\boxed{${d.answer}}.\\]</div></div>`
  );
}

const l6P17 = l6BookProblem(17,
  `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.4 Problem 17</span><br>Transform the Euler equation</p><div class="eq">\\[x^2y''+Axy'+By=0\\]</div><p>for \\(x>0\\) into a constant-coefficient equation by setting \\(x=e^t\\) and \\(Y(t)=y(e^t)\\).</p>`,
  `<p>Since \\(x=e^t\\), \\(dx/dt=x\\). By the chain rule,</p><div class="eq">\\[Y'=\\frac{dy}{dx}\\frac{dx}{dt}=xy'.\\]</div>
   <p>Differentiate again with respect to \\(t\\):</p><div class="eq">\\[Y''=\\frac{d}{dt}(xy')=xy'+x^2y''.\\]</div>
   <p>Therefore</p><div class="eq">\\[x^2y''=Y''-Y',\\qquad xy'=Y'.\\]</div>
   <p>Substitute into the Euler equation:</p><div class="eq">\\[(Y''-Y')+AY'+BY=0.\\]</div>
   <div class="whybox"><div class="eq">\\[\\boxed{Y''+(A-1)Y'+BY=0}.\\]</div><p>This is a homogeneous constant-coefficient ODE. Its characteristic equation is exactly \\(r^2+(A-1)r+B=0\\), which explains the Euler power trial.</p></div>`
);

const l6P18 = l6BookProblem(18,
  `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.4 Problem 18</span><br>Solve Euler's equation on an interval with \\(x<0\\). The book suggests the transformation \\(t=\\ln|x|\\).</p>`,
  `<p>On \\(x<0\\), set \\(t=\\ln|x|\\). Since \\(dt/dx=1/x\\), the same chain-rule identities hold:</p><div class="eq">\\[xy'=Y',\\qquad x^2y''=Y''-Y'.\\]</div>
   <p>Thus the transformed equation is again</p><div class="eq">\\[Y''+(A-1)Y'+BY=0.\\]</div>
   <p>Solve this constant-coefficient equation in \\(t\\), then replace \\(t\\) by \\(\\ln|x|\\). For example, distinct real roots \\(r_1,r_2\\) give</p><div class="eq">\\[y=c_1|x|^{r_1}+c_2|x|^{r_2}.\\]</div>
   <p>A repeated root gives \\(|x|^r(c_1+c_2\\ln|x|)\\); complex roots \\(a\\pm ib\\) give</p><div class="eq">\\[|x|^a[c_1\\cos(b\\ln|x|)+c_2\\sin(b\\ln|x|)].\\]</div>
   <div class="whybox">The absolute value keeps the real-valued formulas valid on the negative half-line.</div>`
);

const l6P19 = l6BookProblem(19,
  `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.4 Problem 19</span><br>Redo O’Neil Example 2.17 by setting \\(t=\\ln x\\):</p><div class="eq">\\[x^2y''-5xy'+10y=0,\\qquad y(1)=4,\\ y'(1)=-6.\\]</div>`,
  `<p>Here \\(A=-5\\), \\(B=10\\), so Problem 17 gives</p><div class="eq">\\[Y''-6Y'+10Y=0.\\]</div>
   <p>Since \\(x=1\\) corresponds to \\(t=0\\),</p><div class="eq">\\[Y(0)=4.\\]</div>
   <p>Also \\(Y'=xy'\\), so \\(Y'(0)=1\\cdot(-6)=-6\\).</p>
   <p>The roots are \\(3\\pm i\\), hence</p><div class="eq">\\[Y=e^{3t}(c_1\\cos t+c_2\\sin t).\\]</div>
   <p>At \\(t=0\\), \\(c_1=4\\), and \\(Y'(0)=3c_1+c_2=-6\\), so \\(c_2=-18\\).</p>
   <p>Finally \\(t=\\ln x\\) and \\(e^{3t}=x^3\\):</p><div class="whybox"><div class="eq">\\[\\boxed{y=x^3[4\\cos(\\ln x)-18\\sin(\\ln x)]}.\\]</div></div>`
);

const l6P20 = l6BookProblem(20,
  `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.4 Problem 20</span><br>When the Euler characteristic equation has a repeated root, derive the second solution \\(y_2=x^{(1-A)/2}\\ln x\\) by setting \\(y_2=u(x)y_1(x)\\).</p>`,
  `<p>For \\(x^2y''+Axy'+By=0\\), divide by \\(x^2\\):</p><div class="eq">\\[y''+\\frac{A}{x}y'+\\frac{B}{x^2}y=0.\\]</div>
   <p>For a repeated root, \\(r=(1-A)/2\\) and one solution is \\(y_1=x^r\\). Use the reduction-of-order formula from Lesson 3:</p><div class="eq">\\[y_2=y_1\\int\\frac{e^{-\\int (A/x)dx}}{y_1^2}\\,dx.\\]</div>
   <p>Now \\(e^{-\\int A/x\,dx}=x^{-A}\\), while \\(y_1^2=x^{2r}=x^{1-A}\\). Therefore the integrand is</p><div class="eq">\\[\\frac{x^{-A}}{x^{1-A}}=\\frac1x.\\]</div>
   <p>Hence</p><div class="eq">\\[y_2=x^r\\int\\frac{dx}{x}=x^r\\ln x.\\]</div>
   <div class="whybox"><div class="eq">\\[\\boxed{y_2=x^{(1-A)/2}\\ln x}.\\]</div><p>This is the Euler analogue of the repeated-root companion \\(xe^{rx}\\) for constant coefficients.</p></div>`
);

const lesson6BookScreens = [
  ...l6GeneralData.map(l6GeneralScreen),
  ...l6IvpData.map(l6IvpScreen),
  l6P17,l6P18,l6P19,l6P20
];

const lesson6BaseUnits = [
  {
    id:"l6-euler",courseLesson:6,color:"#4059ad",badge:"1",label:"Euler equation",
    title:"Euler–Cauchy Equations from First Principles",subtitle:"Why powers x^r replace exponentials e^{rx}",
    desc:"Recognize the Euler coefficient pattern, derive its characteristic equation, track the x>0 domain, and connect the method to the constant-coefficient equations you already know.",
    lessons:[{title:"Recognize and derive",screens:[
      {type:"teach",title:"The Oct. 5 target — and another numbering mismatch",html:`
        <p>${lesson6CoreTag}</p>
        <p>The syllabus names <b>Euler's differential equation</b> together with mechanical vibration applications. In the uploaded O’Neil 8th SI edition, the Euler equation is <b>§2.4</b>. The syllabus prints “§2.4.1; §2.5,” but actual §2.5 begins <em>Series Solutions</em>. Spring motion appears instead in <b>Example 2.13</b> and the separate Spring Motion web module.</p>
        <div class="warn"><b>What this lesson follows:</b> the syllabus topics, but the actual textbook organization. Series solutions are not pulled forward into Oct. 5 because the schedule teaches them later in November.</div>`},
      {type:"teach",title:"Recognize the Euler pattern",html:`
        <p>${lesson6ExplainTag}</p>
        <p>An Euler (or Cauchy–Euler) homogeneous second-order equation has the form</p><div class="eq">\\[x^2y''+Axy'+By=0.\\]</div>
        <p>The powers of \\(x\\) track the derivative order: \\(x^2\\) multiplies \\(y''\\), \\(x\\) multiplies \\(y'\\), and the \\(y\\) coefficient is constant.</p>
        <div class="beginner"><b>Why this matters:</b> ordinary exponentials are ideal for constant coefficients. Here powers are ideal because differentiating \\(x^r\\) lowers the power, and multiplication by \\(x\\) or \\(x^2\\) restores it.</div>`},
      {type:"teach",title:"Derive the Euler characteristic equation",html:`
        <p>Try \\(y=x^r\\) on an interval with \\(x>0\\). Then</p><div class="eq">\\[y'=rx^{r-1},\\qquad y''=r(r-1)x^{r-2}.\\]</div>
        <p>Multiply by the Euler coefficients:</p><div class="eq">\\[x^2y''=r(r-1)x^r,\\qquad Axy'=Arx^r,\\qquad By=Bx^r.\\]</div>
        <p>Substitution gives</p><div class="eq">\\[x^r[r(r-1)+Ar+B]=0.\\]</div>
        <p>For \\(x>0\\), \\(x^r\\neq0\\), so</p><div class="whybox"><div class="eq">\\[\\boxed{r^2+(A-1)r+B=0}.\\]</div><p>This is the Euler characteristic equation.</p></div>`},
      {type:"quiz",title:"Read the coefficients correctly",q:`For \\(x^2y''+5xy'-6y=0\\), which characteristic equation is correct?`,options:[`r²+4r−6=0`,`r²+5r−6=0`,`r²+4r+6=0`],answer:0,why:`The y'' term contributes r(r−1); adding 5r gives r²+4r.`}
    ]}]
  },
  {
    id:"l6-root-cases",courseLesson:6,color:"#2e7d69",badge:"2",label:"Root cases",
    title:"Three Euler Root Cases",subtitle:"Distinct, repeated, and complex roots — with ln(x) in exactly the right places",
    desc:"Translate the three characteristic-root patterns into real Euler solution bases and understand why logarithms appear for repeated and complex roots.",
    lessons:[{title:"Root-to-solution map",screens:[
      {type:"teach",title:"Distinct real roots",html:`<p>${lesson6CoreTag}</p><p>If \\(r_1\\neq r_2\\) are real roots, then</p><div class="eq">\\[\\boxed{y=c_1x^{r_1}+c_2x^{r_2}},\\qquad x>0.\\]</div><p>These are independent for the same structural reason that exponentials with different exponents are independent.</p>`},
      {type:"teach",title:"O’Neil Example 2.14",html:`<p>${lesson6BookTag}</p><p>Solve</p><div class="eq">\\[x^2y''+2xy'-6y=0.\\]</div><p>The characteristic equation is \\(r^2+r-6=(r-2)(r+3)=0\\). Therefore</p><div class="whybox"><div class="eq">\\[\\boxed{y=c_1x^2+c_2x^{-3}}.\\]</div></div>`},
      {type:"teach",title:"Repeated real root",html:`<p>If the characteristic equation has a repeated root \\(r\\), one power \\(x^r\\) is not enough for a second-order family. The independent companion is \\(x^r\\ln x\\):</p><div class="eq">\\[\\boxed{y=x^r(c_1+c_2\\ln x)}.\\]</div><p>The logarithm is the Euler counterpart of the extra factor \\(x\\) in \\((c_1+c_2x)e^{rx}\\).</p>`},
      {type:"teach",title:"O’Neil Example 2.15",html:`<p>${lesson6BookTag}</p><div class="eq">\\[x^2y''-5xy'+9y=0.\\]</div><p>The characteristic equation is \\(r^2-6r+9=(r-3)^2\\). Hence</p><div class="whybox"><div class="eq">\\[\\boxed{y=x^3(c_1+c_2\\ln x)}.\\]</div></div>`},
      {type:"teach",title:"Complex roots become trig functions of ln(x)",html:`<p>${lesson6ExplainTag}</p><p>If \\(r=a\\pm ib\\), then \\(x^{a+ib}=x^ae^{ib\\ln x}\\). Euler's formula gives the real basis</p><div class="eq">\\[x^a\\cos(b\\ln x),\\qquad x^a\\sin(b\\ln x).\\]</div><p>Therefore</p><div class="eq">\\[\\boxed{y=x^a[c_1\\cos(b\\ln x)+c_2\\sin(b\\ln x)]}.\\]</div>`},
      {type:"teach",title:"O’Neil Example 2.16",html:`<p>${lesson6BookTag}</p><div class="eq">\\[x^2y''+3xy'+10y=0.\\]</div><p>The characteristic equation \\(r^2+2r+10=0\\) has roots \\(-1\\pm3i\\), so</p><div class="whybox"><div class="eq">\\[\\boxed{y=x^{-1}[c_1\\cos(3\\ln x)+c_2\\sin(3\\ln x)]}.\\]</div></div>`},
      {type:"quiz",title:"Complex Euler root translation",q:`Roots \\(2\\pm5i\\) produce which real Euler family?`,options:[`x²[c₁cos(5 ln x)+c₂sin(5 ln x)]`,`e^{2x}[c₁cos5x+c₂sin5x]`,`x⁵[c₁cos(2 ln x)+c₂sin(2 ln x)]`],answer:0,why:`The real part becomes x²; the imaginary part multiplies ln x inside sine and cosine.`}
    ]}]
  },
  {
    id:"l6-transform",courseLesson:6,color:"#7651b8",badge:"3",label:"Why it works",
    title:"The Logarithmic Change of Variable",subtitle:"Euler equations are constant-coefficient equations in disguise",
    desc:"Derive x=e^t, show how xy' and x²y'' transform, and use the transformation to explain every root-case formula rather than memorizing it.",
    lessons:[{title:"x=e^t",screens:[
      {type:"teach",title:"The hidden constant-coefficient equation",html:`<p>${lesson6ExplainTag}</p><p>Set</p><div class="eq">\\[x=e^t,\\qquad t=\\ln x,\\qquad Y(t)=y(e^t).\\]</div><p>Then</p><div class="eq">\\[Y'=xy',\\qquad Y''=xy'+x^2y''.\\]</div><p>Thus \\(x^2y''=Y''-Y'\\). Substituting into \\(x^2y''+Axy'+By=0\\) gives</p><div class="whybox"><div class="eq">\\[\\boxed{Y''+(A-1)Y'+BY=0}.\\]</div></div>`},
      {type:"teach",title:"Why ln(x) appears everywhere",html:`<p>A constant-coefficient solution \\(Y=e^{rt}\\) becomes</p><div class="eq">\\[y=e^{r\\ln x}=x^r.\\]</div><p>A repeated-root term \\(te^{rt}\\) becomes \\(x^r\\ln x\\). A complex-root term \\(e^{at}\\cos bt\\) becomes \\(x^a\\cos(b\\ln x)\\).</p><div class="whybox"><b>So the Euler formulas are not a new collection of unrelated rules.</b> They are Lesson 3's constant-coefficient formulas after the change of variable \\(t=\\ln x\\).</div>`},
      {type:"quiz",title:"Transform derivative",q:`If \\(Y(t)=y(e^t)\\) and \\(x=e^t\\), what is \\(Y''\\)?`,options:[`x²y''+xy'`,`x²y'' only`,`xy''+y'`],answer:0,why:`Differentiate Y'=xy' with respect to t: x y' + x(x y'') = xy' + x²y''.`}
    ]}]
  },
  {
    id:"l6-ivp",courseLesson:6,color:"#b35f4a",badge:"4",label:"Euler IVPs",
    title:"Euler Initial-Value Problems",subtitle:"Differentiate the ln(x) terms carefully before fitting constants",
    desc:"Use O’Neil Example 2.17 and the textbook IVPs to make repeated and complex Euler families reliable under initial conditions.",
    lessons:[{title:"O’Neil Example 2.17",screens:[
      {type:"teach",title:"Example 2.17 — complex roots plus initial data",html:`<p>${lesson6BookTag}</p><p>Solve</p><div class="eq">\\[x^2y''-5xy'+10y=0,\\qquad y(1)=4,\\quad y'(1)=-6.\\]</div><p>The characteristic equation \\(r^2-6r+10=0\\) has roots \\(3\\pm i\\), so</p><div class="eq">\\[y=x^3[c_1\\cos(\\ln x)+c_2\\sin(\\ln x)].\\]</div><p>At \\(x=1\\), \\(\\ln1=0\\), hence \\(c_1=4\\).</p><p>Differentiate with the product and chain rules:</p><div class="eq">\\[y'=3x^2[c_1\\cos(\\ln x)+c_2\\sin(\\ln x)]+x^2[-c_1\\sin(\\ln x)+c_2\\cos(\\ln x)].\\]</div><p>At \\(x=1\\), \\(y'(1)=3c_1+c_2=-6\\), hence \\(c_2=-18\\).</p><div class="whybox"><div class="eq">\\[\\boxed{y=x^3[4\\cos(\\ln x)-18\\sin(\\ln x)]}.\\]</div></div>`},
      {type:"teach",title:"Domain is not optional",html:`<p>All four numbered O’Neil examples in §2.4 are presented on \\(x>0\\). The singular coefficient \\(x=0\\) separates the positive and negative half-lines.</p><p>For \\(x<0\\), Problem 18 shows that \\(t=\\ln|x|\\) gives the analogous formulas. Never write a real \\(\\ln x\\) solution across zero.</p>`},
      {type:"quiz",title:"Chain-rule trap",q:`What is \\(d[\\cos(b\\ln x)]/dx\\)?`,options:[`−(b/x)sin(b ln x)`,`−b sin(b ln x)`,`−bx sin(b ln x)`],answer:0,why:`The inner derivative of ln x is 1/x.`}
    ]}]
  },
  {
    id:"l6-spring-model",courseLesson:6,color:"#d27a42",badge:"5",label:"Spring model",
    title:"Spring–Mass–Damper Modeling",subtitle:"Build the differential equation from forces before solving it",
    desc:"Start with the physical story, define displacement and signs, remove gravity using static equilibrium, and derive the forced damped oscillator exactly as O’Neil does in Example 2.13.",
    lessons:[{title:"From forces to the ODE",screens:[
      {type:"teach",title:"O’Neil Example 2.13 — choose equilibrium as y=0",html:`<p>${lesson6BookTag}</p><p>A mass \\(m\\) hangs from a spring of stiffness \\(k\\). Let \\(y(t)=0\\) be the <b>static equilibrium</b> position, with downward displacement positive.</p><p>At equilibrium the spring extension \\(d\\) satisfies</p><div class="eq">\\[mg=kd.\\]</div><p>If the mass is displaced an additional amount \\(y\\), the spring contributes an extra restoring force \\(-ky\\). The equilibrium terms \\(mg-kd\\) cancel, leaving only the displacement-dependent force.</p><div class="beginner"><b>This is why gravity disappears from the final vibration equation.</b> It has not been ignored; measuring from static equilibrium has already balanced it against the spring's static stretch.</div>`},
      {type:"teach",title:"Add damping and external forcing",html:`<p>${lesson6AppTag}</p><p>A viscous damping force opposes velocity, so with \\(c>0\\) it is \\(-cy'\\). An external force is \\(F(t)\\). Newton's second law gives</p><div class="eq">\\[my''=-ky-cy'+F(t).\\]</div><p>Move the internal forces to the left:</p><div class="whybox"><div class="eq">\\[\\boxed{my''+cy'+ky=F(t)}.\\]</div></div><p>Units are consistent: each term is a force. \\(my''\\) is inertia, \\(cy'\\) damping, \\(ky\\) elastic restoring force, and \\(F(t)\\) external input.</p>`},
      {type:"teach",title:"Initial data have a physical meaning",html:`<p>If the mass starts at displacement \\(y_0\\) with initial velocity \\(v_0\\), then</p><div class="eq">\\[y(0)=y_0,\\qquad y'(0)=v_0.\\]</div><p>These are exactly the two pieces of information required by a second-order IVP. They determine which motion occurs inside the two-constant solution family.</p>`},
      {type:"quiz",title:"Why no mg term?",q:`Why does the vibration equation measured from static equilibrium not contain a separate \\(mg\\) term?`,options:[`Because mg is already balanced by the spring's static force kd`,`Because gravity is assumed zero`,`Because damping cancels gravity`],answer:0,why:`At static equilibrium mg=kd. Measuring y from that point cancels the constant gravitational/static-spring contributions.`}
    ]}]
  },
  {
    id:"l6-damping",courseLesson:6,color:"#6a6f7b",badge:"6",label:"Damping regimes",
    title:"Undamped, Underdamped, Critical, and Overdamped Motion",subtitle:"One discriminant tells the physical story",
    desc:"Understand what damping physically does, how the discriminant changes the characteristic roots, and why those roots produce oscillation, decay, or a non-oscillatory return to equilibrium.",
    lessons:[{title:"Classify the free response",screens:[
      {type:"teach",title:"What damping is doing",html:`<p>${lesson6AppTag}</p><p>For free motion there is no external force, so the spring–mass–damper model is</p><div class="eq">\\[my''+cy'+ky=0.\\]</div><p>Each term has a physical role:</p><div class="reviewGrid"><div class="mini"><b>\\(my''\\) · inertia</b><p>The mass resists changes in its motion.</p></div><div class="mini"><b>\\(cy'\\) · damping</b><p>The damper removes mechanical energy and opposes velocity.</p></div><div class="mini"><b>\\(ky\\) · spring</b><p>The spring pulls the mass back toward equilibrium.</p></div></div><div class="beginner"><b>Big picture:</b> the spring tries to make the mass oscillate, while the damper tries to kill that oscillation. The competition between those effects creates the four damping regimes.</div>`},
      {type:"teach",title:"Why one discriminant classifies the motion",html:`<p>Try \\(y=e^{rt}\\). Substitution gives the characteristic equation</p><div class="eq">\\[mr^2+cr+k=0,\\qquad r=\\frac{-c\\pm\\sqrt{c^2-4mk}}{2m}.\\]</div><p>The only part that changes the <b>type</b> of roots is</p><div class="eq">\\[\\Delta=c^2-4mk.\\]</div><p>This matters because the root type tells us the shape of the solution:</p><div class="reviewGrid"><div class="mini"><b>Complex roots</b><p>Produce sine/cosine terms, so the mass oscillates.</p></div><div class="mini"><b>Real roots</b><p>Produce only exponentials, so there is no repeated back-and-forth oscillation.</p></div><div class="mini"><b>Repeated real root</b><p>Marks the boundary between those two behaviors.</p></div></div><p>The critical damping value is therefore</p><div class="eq">\\[c_{crit}=2\\sqrt{mk}.\\]</div><p>So you can classify the system by comparing \\(c\\) with \\(2\\sqrt{mk}\\), or equivalently by checking the sign of \\(c^2-4mk\\).</p>`},
      {type:"teach",title:"The four regimes — what you should picture",html:`<div class="reviewGrid"><div class="mini"><b>Undamped · \\(c=0\\)</b><p>No damping means no mechanical energy is dissipated. For \\(m,k&gt;0\\), every nontrivial free response is sinusoidal with constant amplitude; the zero initial state is the trivial exception.</p></div><div class="mini"><b>Underdamped · \\(0&lt;c&lt;2\\sqrt{mk}\\)</b><p>The roots are complex with a negative real part. Every nontrivial free response oscillates across equilibrium repeatedly while its amplitude decays.</p></div><div class="mini"><b>Critically damped · \\(c=2\\sqrt{mk}\\)</b><p>The roots merge into one repeated negative root, marking the boundary between oscillatory and non-oscillatory root behavior. Critical damping is the least damping that removes oscillatory modes. In the usual release-from-rest comparison it gives the quickest non-oscillatory settling, but with arbitrary initial velocity the response can still cross equilibrium once.</p></div><div class="mini"><b>Overdamped · \\(c&gt;2\\sqrt{mk}\\)</b><p>Two distinct negative real roots give a sum of decaying exponentials, so there is no repeated oscillation. Depending on the initial displacement and velocity, the response may remain on one side of equilibrium or cross it once before settling.</p></div></div><div class="whybox"><p><b>Memory aid:</b> no damping → sustained oscillation; underdamped → decaying oscillation; critical → boundary to non-oscillatory motion; overdamped → two decaying real modes.</p></div>`},
      {type:"teach",title:"Interactive Desmos — change the damping yourself",html:`<p><span class="supplementalTag">Interactive Desmos</span></p><p>Instead of only memorizing the four cases, <b>change the physical parameters and watch the motion change.</b> The Desmos panel contains live sliders for mass \\(m\\), damping \\(c\\), spring stiffness \\(k\\), initial displacement \\(y_0\\), and initial velocity \\(v_0\\).</p><div class="beginner"><b>Best experiment:</b> keep \\(m=1\\) and \\(k=4\\), then slowly drag \\(c\\) from \\(0\\) upward. The critical value is \\(c_{crit}=2\\sqrt{mk}=4\\). Watch the graph go from undamped → underdamped → critical → overdamped.</div><div class="dampingExplorer"><div class="dampingExplorerTop"><div><b>Live damping explorer</b><span>Drag the sliders inside Desmos</span></div><div id="dampingRegimeBadge" class="dampingRegimeBadge">Loading…</div></div><div class="dampingPresetRow"><button type="button" onclick="setDampingPreset('undamped')">Undamped</button><button type="button" onclick="setDampingPreset('under')">Underdamped</button><button type="button" onclick="setDampingPreset('critical')">Critical</button><button type="button" onclick="setDampingPreset('over')">Overdamped</button></div><div id="dampingDesmos" class="dampingDesmos" aria-label="Interactive Desmos graph of spring-mass-damper motion"></div><div id="dampingReadout" class="dampingReadout"><span>\\(\\Delta=c^2-4mk\\)</span><span>\\(c_{crit}=2\\sqrt{mk}\\)</span></div></div><div class="whybox"><b>What to look for:</b> crossing \\(y=0\\) means the mass passed through equilibrium. In the underdamped case, the dashed curves are the shrinking exponential envelope. At and above critical damping, repeated back-and-forth oscillation disappears; some initial conditions can still produce a single equilibrium crossing.</div>`},
      {type:"teach",title:"What the solution looks like in each regime",html:`<p>You do not need to memorize four unrelated formulas. They all come from the same quadratic roots.</p><div class="reviewGrid"><div class="mini"><b>Undamped</b><div class="eq">\\[y=c_1\\cos(\\omega_0t)+c_2\\sin(\\omega_0t),\\quad \\omega_0=\\sqrt{k/m}.\\]</div></div><div class="mini"><b>Underdamped</b><div class="eq">\\[y=e^{-ct/(2m)}[c_1\\cos(\\omega_dt)+c_2\\sin(\\omega_dt)].\\]</div></div><div class="mini"><b>Critical</b><div class="eq">\\[y=(c_1+c_2t)e^{-ct/(2m)}.\\]</div></div><div class="mini"><b>Overdamped</b><div class="eq">\\[y=c_1e^{r_1t}+c_2e^{r_2t},\\quad r_1,r_2&lt;0.\\]</div></div></div><p>Notice the pattern: complex roots produce sine/cosine factors and therefore repeated oscillation for every nontrivial response. Real negative roots produce non-oscillatory modes: they may allow at most a single equilibrium crossing, but not repeated back-and-forth motion.</p>`},
      {type:"teach",title:"Underdamped formula and damped frequency",html:`<p>For the underdamped case, \\(c^2&lt;4mk\\), the roots are</p><div class="eq">\\[r=-\\frac{c}{2m}\\pm i\\omega_d,\\qquad \\omega_d=\\sqrt{\\frac{k}{m}-\\frac{c^2}{4m^2}}.\\]</div><p>So</p><div class="eq">\\[y=e^{-ct/(2m)}[c_1\\cos(\\omega_dt)+c_2\\sin(\\omega_dt)].\\]</div><p>There are two separate pieces to read:</p><div class="reviewGrid"><div class="mini"><b>\\(e^{-ct/(2m)}\\)</b><p>The envelope. It tells you how quickly the amplitude dies away.</p></div><div class="mini"><b>\\(\\omega_d\\)</b><p>The damped angular frequency. It tells you how quickly the mass oscillates inside that shrinking envelope.</p></div></div><p>Because damping removes energy, \\(\\omega_d&lt;\\omega_0=\\sqrt{k/m}\\): the damped system oscillates a little more slowly than the undamped one.</p>`},
      {type:"teach",title:"Worked regime example — underdamped",html:`<p><span class="supplementalTag">Supplemental course example</span></p><p>For</p><div class="eq">\\[y''+4y'+13y=0,\\qquad y(0)=1,\\quad y'(0)=0,\\]</div><p>the roots are \\(-2\\pm3i\\), so</p><div class="eq">\\[y=e^{-2t}(c_1\\cos3t+c_2\\sin3t).\\]</div><p>The value condition gives \\(c_1=1\\). At \\(t=0\\), \\(y'(0)=-2c_1+3c_2=0\\), hence \\(c_2=2/3\\).</p><div class="whybox"><div class="eq">\\[\\boxed{y=e^{-2t}(\\cos3t+\\tfrac23\\sin3t)}.\\]</div></div>`},
      {type:"teach",title:"Worked regime example — critical",html:`<p><span class="supplementalTag">Supplemental course example</span></p><p>For</p><div class="eq">\\[y''+6y'+9y=0,\\qquad y(0)=1,\\quad y'(0)=0,\\]</div><p>the repeated root is \\(-3\\). Thus \\(y=(c_1+c_2t)e^{-3t}\\). The conditions give \\(c_1=1\\) and \\(c_2=3\\):</p><div class="eq">\\[\\boxed{y=(1+3t)e^{-3t}}.\\]</div>`},
      {type:"quiz",title:"Classify before solving",q:`If \\(m=2\\), \\(c=3\\), \\(k=5\\), what regime is the free motion?`,options:[`Underdamped`,`Critically damped`,`Overdamped`],answer:0,why:`c²−4mk=9−40<0, so the roots are complex with negative real part.`}
    ]}]
  },
  {
    id:"l6-resonance",courseLesson:6,color:"#3f7f8f",badge:"7",label:"Resonance",
    title:"Driven Motion and Resonance",subtitle:"Why matching the natural frequency creates the extra factor t",
    desc:"Follow O’Neil Example 2.13 through off-resonant and resonant forcing, then connect the algebraic overlap rule from Lesson 4 to the physical growth of oscillation amplitude.",
    lessons:[{title:"O’Neil Example 2.13 · resonance",screens:[
      {type:"teach",title:"Natural frequency and input frequency",html:`<p>${lesson6BookTag}</p><p>In the ideal undamped case \\(c=0\\),</p><div class="eq">\\[my''+ky=A\\cos(\\omega t).\\]</div><p>Divide by \\(m\\) and define the natural frequency</p><div class="eq">\\[\\omega_0=\\sqrt{k/m}.\\]</div><p>The homogeneous motion is</p><div class="eq">\\[y_h=c_1\\cos(\\omega_0t)+c_2\\sin(\\omega_0t).\\]</div><p>The forcing frequency \\(\\omega\\) is the <b>input frequency</b>.</p>`},
      {type:"teach",title:"Off resonance: ω ≠ ω₀",html:`<p>If \\(\\omega\\neq\\omega_0\\), try \\(y_p=C\\cos(\\omega t)\\). Substitution gives</p><div class="eq">\\[m(\\omega_0^2-\\omega^2)C=A.\\]</div><p>Therefore</p><div class="eq">\\[y_p=\\frac{A}{m(\\omega_0^2-\\omega^2)}\\cos(\\omega t).\\]</div><p>The response remains bounded for fixed \\(\\omega\\neq\\omega_0\\).</p>`},
      {type:"teach",title:"Exact resonance: ω = ω₀",html:`<p>${lesson6ExplainTag}</p><p>At \\(\\omega=\\omega_0\\), the ordinary cosine trial is already homogeneous. Lesson 4's overlap rule says multiply by \\(t\\). O’Neil writes a trial containing \\(t\\cos\\omega_0t\\) and \\(t\\sin\\omega_0t\\); coefficient matching yields</p><div class="eq">\\[y_p=\\frac{A}{2m\\omega_0}t\\sin(\\omega_0t).\\]</div><p>Hence</p><div class="whybox"><div class="eq">\\[\\boxed{y=c_1\\cos(\\omega_0t)+c_2\\sin(\\omega_0t)+\\frac{A}{2m\\omega_0}t\\sin(\\omega_0t)}.\\]</div><p>The factor \\(t\\) makes the oscillation envelope grow linearly. That is the ideal undamped resonance described by O’Neil.</p></div>`},
      {type:"teach",title:"Damping changes the resonance story",html:`<p>${lesson6AppTag}</p><p>For \\(c>0\\) and sinusoidal forcing, a steady-state trial \\(a\\cos\\omega t+b\\sin\\omega t\\) gives response amplitude</p><div class="eq">\\[R(\\omega)=\\frac{A}{\\sqrt{(k-m\\omega^2)^2+(c\\omega)^2}}.\\]</div><p>The denominator no longer vanishes merely because \\(k-m\\omega^2=0\\); damping keeps the steady-state amplitude finite.</p><p>For <b>displacement amplitude</b>, the peak is also shifted below the undamped natural frequency. Minimizing the squared denominator gives</p><div class="eq">\\[\\omega_r=\\sqrt{\\frac{k}{m}-\\frac{c^2}{2m^2}}\\]</div><p>provided \\(c^2<2mk\\). If \\(c^2\\ge2mk\\), there is no positive-frequency peak in the displacement-amplitude curve. As \\(c\\to0\\), \\(\\omega_r\\to\\omega_0=\\sqrt{k/m}\\), recovering the ideal resonance limit.</p><div class="warn"><b>Do not mix two claims:</b> the undamped model has unbounded resonant growth at \\(\\omega_0\\); a damped system has a finite steady-state response, and its displacement-response peak—when one exists—is slightly below \\(\\omega_0\\).</div>`},
      {type:"teach",title:"Numerical resonance checkpoint",html:`<p><span class="supplementalTag">Supplemental course example</span></p><p>Let \\(m=2\\), \\(k=18\\), \\(c=0\\), and \\(F(t)=6\\cos3t\\). Then \\(\\omega_0=\\sqrt{18/2}=3\\), so the forcing is exactly resonant.</p><p>The normalized equation is</p><div class="eq">\\[y''+9y=3\\cos3t.\\]</div><p>With zero initial displacement and velocity,</p><div class="eq">\\[\\boxed{y=\\tfrac12t\\sin3t}.\\]</div><p>At \\(t=2\\), the envelope magnitude is already \\(1\\); at \\(t=10\\), it is \\(5\\). The linearly growing envelope is the physical signature.</p>`},
      {type:"quiz",title:"Connect resonance to Lesson 4",q:`Why does exact undamped resonance require a factor of t in the particular solution?`,options:[`The ordinary forcing-shaped trial overlaps the homogeneous solution`,`The mass becomes zero`,`The spring constant changes with time`],answer:0,why:`At the natural frequency, cos(ω₀t) and sin(ω₀t) are homogeneous modes, so the undetermined-coefficients overlap rule requires multiplication by t.`}
    ]}]
  }
];

function l6CloneBook(number){
  const source=lesson6BookScreens.find(s=>s.title===`O’Neil §2.4 Problem ${number}`);
  return source?{...source,inlineBookPractice:true}:null;
}
function l6AddBookPractice(unitId,title,numbers){
  const unit=lesson6Units.find(u=>u.id===unitId);
  if(!unit)return;
  const screens=numbers.map(l6CloneBook).filter(Boolean);
  if(screens.length)unit.lessons.push({title,screens});
}

const l6OriginalModel = {
  type:"bookproblem",bookSection:"Course original",practiceLabel:"Original engineering transfer · source-transparent",
  title:"Original engineering transfer · predict, classify, solve, interpret",
  prompt:`<p><span class="supplementalTag">Original course problem · not O’Neil</span></p><p>A \\(2\\,\\mathrm{kg}\\) mass is attached to a spring with \\(k=10\\,\\mathrm{N/m}\\) and damper \\(c=4\\,\\mathrm{N\\,s/m}\\). Displacement \\(y\\) is measured from static equilibrium. The mass starts \\(0.10\\,\\mathrm m\\) below equilibrium and is released from rest.</p><p>(a) Build the free-motion ODE with units, (b) predict whether it oscillates, (c) solve the IVP, and (d) state the long-term behavior.</p>`,
  solution:`<p>Force balance about static equilibrium gives</p><div class="eq">\\[2y''+4y'+10y=0,\\qquad y(0)=0.10,\\quad y'(0)=0.\\]</div><p>Every left-hand term has units of force. The discriminant is \\(c^2-4mk=16-80<0\\), so the motion is underdamped and should oscillate with decaying amplitude.</p><p>After division by 2, \\(r^2+2r+5=0\\), hence \\(r=-1\\pm2i\\). Thus</p><div class="eq">\\[y=e^{-t}(C_1\\cos2t+C_2\\sin2t).\\]</div><p>The data give \\(C_1=0.10\\) and \\(-C_1+2C_2=0\\Rightarrow C_2=0.05\\).</p><div class="whybox"><div class="eq">\\[\\boxed{y=e^{-t}(0.10\\cos2t+0.05\\sin2t)\\ \\mathrm m}.\\]</div><p>The exponential envelope tends to zero, matching the physical prediction that damping returns the mass to equilibrium.</p></div>`
};

const l6OriginalResonance = {
  type:"bookproblem",bookSection:"Course original",practiceLabel:"Original resonance transfer · source-transparent",
  title:"Original transfer · connect algebraic overlap to physical resonance",
  prompt:`<p><span class="supplementalTag">Original course problem · not O’Neil</span></p><p>An ideal undamped system satisfies</p><div class="eq">\\[y''+9y=6\\cos3t,\\qquad y(0)=0,\\quad y'(0)=0.\\]</div><p>Predict the behavior before solving, explain why the usual cosine trial fails, then solve and interpret the result.</p>`,
  solution:`<p>The natural frequency is \\(\\omega_0=3\\), exactly the forcing frequency. Therefore the ordinary trial \\(A\\cos3t+B\\sin3t\\) lies in the homogeneous space and is annihilated by the operator. Multiply the trial by \\(t\\).</p><p>For \\(y''+\\omega_0^2y=F\\cos(\\omega_0t)\\), a resonant particular solution is \\(F t\\sin(\\omega_0t)/(2\\omega_0)\\). Here \\(F=6\\), so</p><div class="whybox"><div class="eq">\\[\\boxed{y=t\\sin3t}.\\]</div><p>It already satisfies the zero initial data. The envelope grows linearly like \\(|t|\\): this is the ideal undamped resonance predicted before calculation.</p></div>`
};

const lesson6Mastery = {
  id:"l6-mastery",courseLesson:6,color:"#9a3f69",badge:"8",label:"Mixed mastery",
  title:"Euler & Mechanical-Vibration Mastery",subtitle:"Root recognition → transformation → IVP → modeling → resonance",
  desc:"Selected authentic O’Neil Euler problems cover the distinct mathematical cases. Original engineering problems test model construction, units, prediction and physical interpretation instead of repeating all 20 section exercises.",
  lessons:[
    {title:"Euler foundations",screens:[l6CloneBook(2),l6CloneBook(6),l6CloneBook(13),l6CloneBook(17),l6CloneBook(18),l6CloneBook(20)].filter(Boolean)},
    {title:"Engineering transfer",screens:[l6OriginalModel,l6OriginalResonance]}
  ]
};

const lesson6Units=[...lesson6BaseUnits,lesson6Mastery];

// Reconstruction policy: no duplicate full-book bank. Representative authentic problems appear once.
l6AddBookPractice("l6-euler","Book practice · distinct real roots",[1]);
l6AddBookPractice("l6-root-cases","Book practice · complex roots",[8]);
l6AddBookPractice("l6-ivp","Book practice · Euler IVP",[11]);
l6AddBookPractice("l6-transform","Book practice · transformed IVP",[19]);

if(!units.some(u=>u&&u.id==="l6-euler"))units.push(...lesson6Units);

courseLessons[5]={
  number:6,
  title:"Euler Equations & Mechanical Vibrations",
  subtitle:"Oct. 5 · O’Neil §2.4 + Example 2.13 · Euler equations · damping regimes · resonance",
  status:"current"
};