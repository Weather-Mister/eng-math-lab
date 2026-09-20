/*
  Lesson 5 — Sep. 30: Variation of parameters.
  The course outline points to O’Neil §2.4.2, but the uploaded O’Neil 8th SI edition
  places variation of parameters in §2.3.1. This lesson follows the actual textbook.
*/

const lesson5CoreTag = '<span class="supplementalTag">Core · Sep. 30 syllabus · O’Neil §2.3.1</span>';
const lesson5ExplainTag = '<span class="supplementalTag">Expanded explanation · no skipped reasoning</span>';
const lesson5BookTag = '<span class="supplementalTag">Textbook example · O’Neil Example 2.6</span>';

function l5BookProblem(number,prompt,solution){
  return {type:"bookproblem",bookSection:"§2.3",title:`O’Neil §2.3 Problem ${number}`,prompt,solution};
}

const l5IntegrationBox = `
  <div class="whybox"><b>Integration tools used below</b>
  <div class="eq">\\[\\int e^{ax}\\cos(bx+c)\\,dx=\\frac{e^{ax}}{a^2+b^2}[a\\cos(bx+c)+b\\sin(bx+c)],\\]</div>
  <div class="eq">\\[\\int e^{ax}\\sin(bx+c)\\,dx=\\frac{e^{ax}}{a^2+b^2}[a\\sin(bx+c)-b\\cos(bx+c)].\\]</div>
  <p>Also use \\(\\sin^2x=(1-\\cos2x)/2\\) and \\(\\frac{d}{dx}\\ln|\\sec x+\\tan x|=\\sec x\\).</p></div>`;

const lesson5BookScreens = [
  l5BookProblem(1,
    `<p><span class="supplementalTag">Textbook exercise · variation of parameters</span><br>Find a general solution of</p><div class="eq">\\[y''+y=\\tan x.\\]</div>`,
    `<p><b>1. Homogeneous basis.</b> \\(y_1=\\cos x\\), \\(y_2=\\sin x\\), so</p><div class="eq">\\[W=y_1y_2'-y_1'y_2=\\cos^2x+\\sin^2x=1.\\]</div>
     <p><b>2. Compute the parameter derivatives.</b></p><div class="eq">\\[u_1'=-\\sin x\\tan x=\\cos x-\\sec x,\\qquad u_2'=\\cos x\\tan x=\\sin x.\\]</div>
     <p>The first rewrite uses \\(-\\sin^2x/\\cos x=\\cos x-\\sec x\\).</p>
     <p><b>3. Integrate.</b></p><div class="eq">\\[u_1=\\sin x-\\ln|\\sec x+\\tan x|,\\qquad u_2=-\\cos x.\\]</div>
     <p><b>4. Assemble and simplify.</b> The products \\(\\sin x\\cos x\\) cancel:</p><div class="eq">\\[y_p=-\\cos x\\ln|\\sec x+\\tan x|.\\]</div>
     <div class="whybox"><div class="eq">\\[\\boxed{y=c_1\\cos x+c_2\\sin x-\\cos x\\ln|\\sec x+\\tan x|}.\\]</div><p>This formula is valid on any interval that does not cross a point where \\(\\tan x\\) is undefined.</p></div>`),

  l5BookProblem(2,
    `<p><span class="supplementalTag">Textbook exercise · variation of parameters</span><br>Find a general solution of</p><div class="eq">\\[y''-4y'+3y=2\\cos(x+3).\\]</div>`,
    `<p><b>1. Homogeneous basis.</b> Roots \\(1,3\\) give \\(y_1=e^x\\), \\(y_2=e^{3x}\\), and</p><div class="eq">\\[W=2e^{4x}.\\]</div>
     <p><b>2. Parameter derivatives.</b></p><div class="eq">\\[u_1'=-e^{-x}\\cos(x+3),\\qquad u_2'=e^{-3x}\\cos(x+3).\\]</div>
     ${l5IntegrationBox}
     <p>Therefore one convenient choice is</p><div class="eq">\\[u_1=\\tfrac12e^{-x}[\\cos(x+3)-\\sin(x+3)],\\]</div><div class="eq">\\[u_2=\\tfrac1{10}e^{-3x}[\\sin(x+3)-3\\cos(x+3)].\\]</div>
     <p>Multiplying by \\(y_1,y_2\\) and collecting sine/cosine terms gives</p><div class="eq">\\[y_p=\\tfrac15\\cos(x+3)-\\tfrac25\\sin(x+3).\\]</div>
     <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^x+c_2e^{3x}+\\tfrac15\\cos(x+3)-\\tfrac25\\sin(x+3)}.\\]</div></div>`),

  l5BookProblem(3,
    `<p><span class="supplementalTag">Textbook exercise · variation of parameters</span><br>Find a general solution of</p><div class="eq">\\[y''+9y=12\\sec(3x).\\]</div>`,
    `<p><b>1. Homogeneous basis.</b> Use \\(y_1=\\cos3x\\), \\(y_2=\\sin3x\\). Then</p><div class="eq">\\[W=3.\\]</div>
     <p><b>2. Parameter derivatives.</b></p><div class="eq">\\[u_1'=-4\\tan3x,\\qquad u_2'=4.\\]</div>
     <p><b>3. Integrate.</b> Since \\(d[\\ln|\\cos3x|]/dx=-3\\tan3x\\),</p><div class="eq">\\[u_1=\\tfrac43\\ln|\\cos3x|,\\qquad u_2=4x.\\]</div>
     <p><b>4. Particular and general solutions.</b></p><div class="eq">\\[y_p=\\tfrac43\\cos3x\\ln|\\cos3x|+4x\\sin3x.\\]</div>
     <div class="whybox"><div class="eq">\\[\\boxed{y=c_1\\cos3x+c_2\\sin3x+\\tfrac43\\cos3x\\ln|\\cos3x|+4x\\sin3x}.\\]</div><p>Work on an interval on which \\(\\cos3x\\neq0\\), because the forcing itself has those singularities.</p></div>`),

  l5BookProblem(4,
    `<p><span class="supplementalTag">Textbook exercise · variation of parameters</span><br>Find a general solution of</p><div class="eq">\\[y''-2y'-3y=2\\sin^2x.\\]</div>`,
    `<p><b>1. Homogeneous basis.</b> \\(y_1=e^{3x}\\), \\(y_2=e^{-x}\\), so \\(W=-4e^{2x}\\).</p>
     <p><b>2. Parameter derivatives.</b></p><div class="eq">\\[u_1'=\\tfrac12e^{-3x}\\sin^2x,\\qquad u_2'=-\\tfrac12e^x\\sin^2x.\\]</div>
     <p>Rewrite \\(\\sin^2x=(1-\\cos2x)/2\\), so each integral becomes a sum of exponential–trig integrals.</p>${l5IntegrationBox}
     <p>A convenient pair of antiderivatives is</p><div class="eq">\\[u_1=\\frac{e^{-3x}}{156}[-13+9\\cos2x-6\\sin2x],\\]</div><div class="eq">\\[u_2=\\frac{e^x}{20}[-5+\\cos2x+2\\sin2x].\\]</div>
     <p>Now \\(y_p=u_1e^{3x}+u_2e^{-x}\\). Combining like terms simplifies substantially:</p><div class="eq">\\[y_p=-\\tfrac13+\\tfrac7{65}\\cos2x+\\tfrac4{65}\\sin2x.\\]</div>
     <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^{3x}+c_2e^{-x}-\\tfrac13+\\tfrac7{65}\\cos2x+\\tfrac4{65}\\sin2x}.\\]</div></div>`),

  l5BookProblem(5,
    `<p><span class="supplementalTag">Textbook exercise · variation of parameters</span><br>Find a general solution of</p><div class="eq">\\[y''-3y'+2y=\\cos(e^{-x}).\\]</div>`,
    `<p><b>1. Homogeneous basis.</b> \\(y_1=e^x\\), \\(y_2=e^{2x}\\), giving \\(W=e^{3x}\\).</p>
     <p><b>2. Parameter derivatives.</b></p><div class="eq">\\[u_1'=-e^{-x}\\cos(e^{-x}),\\qquad u_2'=e^{-2x}\\cos(e^{-x}).\\]</div>
     <p><b>3. The natural substitution.</b> Put \\(t=e^{-x}\\), so \\(dt=-e^{-x}dx\\).</p>
     <p>For \\(u_1\\), this immediately gives \\(u_1=\\sin(e^{-x})\\). For \\(u_2\\),</p><div class="eq">\\[u_2=-\\int t\\cos t\\,dt=-t\\sin t-\\cos t.\\]</div>
     <p>Thus</p><div class="eq">\\[u_2=-e^{-x}\\sin(e^{-x})-\\cos(e^{-x}).\\]</div>
     <p>In \\(u_1e^x+u_2e^{2x}\\), the two sine terms cancel, leaving</p><div class="eq">\\[y_p=-e^{2x}\\cos(e^{-x}).\\]</div>
     <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^x+c_2e^{2x}-e^{2x}\\cos(e^{-x})}.\\]</div></div>`),

  l5BookProblem(6,
    `<p><span class="supplementalTag">Textbook exercise · variation of parameters</span><br>Find a general solution of</p><div class="eq">\\[y''-5y'+6y=8\\sin^2(4x).\\]</div>`,
    `<p><b>1. Homogeneous basis.</b> \\(y_1=e^{2x}\\), \\(y_2=e^{3x}\\), so \\(W=e^{5x}\\).</p>
     <p><b>2. Parameter derivatives.</b></p><div class="eq">\\[u_1'=-8e^{-2x}\\sin^2(4x),\\qquad u_2'=8e^{-3x}\\sin^2(4x).\\]</div>
     <p>Use \\(\\sin^2(4x)=(1-\\cos8x)/2\\), then the exponential–trig integration formulas.</p>${l5IntegrationBox}
     <p>One convenient result is</p><div class="eq">\\[u_1=e^{-2x}\\left[2+\\frac{-2\\cos8x+8\\sin8x}{17}\\right],\\]</div><div class="eq">\\[u_2=e^{-3x}\\left[-\\frac43+\\frac{12\\cos8x-32\\sin8x}{73}\\right].\\]</div>
     <p>After forming \\(y_p=u_1e^{2x}+u_2e^{3x}\\) and combining coefficients,</p><div class="eq">\\[y_p=\\tfrac23+\\tfrac{58}{1241}\\cos8x+\\tfrac{40}{1241}\\sin8x.\\]</div>
     <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^{2x}+c_2e^{3x}+\\tfrac23+\\tfrac{58}{1241}\\cos8x+\\tfrac{40}{1241}\\sin8x}.\\]</div></div>`),

  l5BookProblem(24,
    `<p><span class="supplementalTag">Textbook IVP · O’Neil §2.3 Problem 24</span><br>Solve</p><div class="eq">\\[y''+y=\\tan x,\\qquad y(0)=4,\\quad y'(0)=3.\\]</div>`,
    `<p>Problem 1 already produced the general solution</p><div class="eq">\\[y=c_1\\cos x+c_2\\sin x-\\cos x\\ln|\\sec x+\\tan x|.\\]</div>
     <p><b>Value condition.</b> At \\(x=0\\), the logarithm is \\(\\ln1=0\\), hence \\(c_1=4\\).</p>
     <p><b>Slope condition.</b> Differentiate the particular term carefully:</p><div class="eq">\\[\\frac{d}{dx}[-\\cos x\\ln|\\sec x+\\tan x|]=\\sin x\\ln|\\sec x+\\tan x|-1.\\]</div>
     <p>Therefore \\(y'(0)=c_2-1=3\\), so \\(c_2=4\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=4\\cos x+4\\sin x-\\cos x\\ln|\\sec x+\\tan x|}.\\]</div><p>The maximal interval containing the initial point is \\((-\\pi/2,\\pi/2)\\).</p></div>`)
];

function l5CloneBook(number){
  const source=lesson5BookScreens.find(s=>s.title===`O’Neil §2.3 Problem ${number}`);
  return source?{...source,inlineBookPractice:true}:null;
}
function l5AddBookPractice(unitId,title,numbers){
  const unit=lesson5Units.find(u=>u.id===unitId);
  if(!unit)return;
  const screens=numbers.map(l5CloneBook).filter(Boolean);
  if(screens.length)unit.lessons.push({title,screens});
}

const lesson5BaseUnits = [
  {
    id:"l5-idea",courseLesson:5,color:"#4059ad",badge:"1",label:"Core idea",
    title:"Why Variation of Parameters Exists",subtitle:"Turn the homogeneous constants into functions",
    desc:"Start from the structure y = y_h + y_p and derive the motivation for varying the constants instead of memorizing a Wronskian formula.",
    lessons:[{title:"From constants to functions",screens:[
      {type:"teach",title:"The Sep. 30 target — and the book numbering mismatch",html:`
        <p>${lesson5CoreTag}</p>
        <p>The course outline assigns <b>variation of parameters (VP)</b> to Sep. 30. We will use <b>VP</b> as a short label for this method from here onward. In the uploaded O’Neil 8th SI edition the method is actually <b>§2.3.1</b>; §2.4 is the Euler equation. This lesson follows the textbook’s real organization while keeping the syllabus date and topic.</p>
        <p>We begin with a normalized nonhomogeneous linear equation</p><div class="eq">\\[y''+p(x)y'+q(x)y=f(x).\\]</div>
        <p>If \\(y_1,y_2\\) are independent solutions of the associated homogeneous equation, then</p><div class="eq">\\[y_h=c_1y_1+c_2y_2.\\]</div>
        <div class="beginner"><b>The idea:</b> constants \\(c_1,c_2\\) can only move inside the homogeneous solution family. To create a forced response, let those coefficients become functions \\(u_1(x),u_2(x)\\).</div>`},
      {type:"teach",title:"The variation-of-parameters ansatz",html:`
        <p>${lesson5ExplainTag}</p>
        <p>Look for a particular solution in the form</p><div class="eq">\\[\\boxed{y_p=u_1(x)y_1(x)+u_2(x)y_2(x)}.\\]</div>
        <p>This deliberately resembles \\(y_h=c_1y_1+c_2y_2\\). The difference is that \\(u_1,u_2\\) are allowed to change with \\(x\\), so their derivatives can generate the forcing \\(f(x)\\).</p>
        <div class="whybox"><b>Why this is more general than undetermined coefficients:</b> it does not require constant \\(p,q\\), and it does not need \\(f(x)\\) to belong to a special polynomial/exponential/trig family. The cost is that we must already know a homogeneous basis and then evaluate integrals.</div>`},
      {type:"quiz",title:"What is being varied?",q:`In variation of parameters, what replaces the constants \\(c_1,c_2\\) from the homogeneous solution?`,options:[`Functions u₁(x), u₂(x)`,`New characteristic roots`,`Two new independent variables`],answer:0,why:`The method keeps the homogeneous basis y₁,y₂ and lets its coefficients vary with x.`}
    ]}]
  },

  {
    id:"l5-derivation",courseLesson:5,color:"#2e7d69",badge:"2",label:"Derivation",
    title:"Derive the Formula — Including the Auxiliary Condition",subtitle:"See exactly where the Wronskian and the two integrals come from",
    desc:"Differentiate the ansatz without skipping terms, explain the chosen constraint, eliminate the homogeneous pieces, and solve the 2×2 system for u₁′ and u₂′.",
    lessons:[{title:"No-skipped-steps derivation",screens:[
      {type:"teach",title:"Differentiate first — all four terms matter",html:`
        <p>${lesson5ExplainTag}</p>
        <p>Starting from \\(y_p=u_1y_1+u_2y_2\\), the product rule gives</p><div class="eq">\\[y_p'=u_1'y_1+u_1y_1'+u_2'y_2+u_2y_2'.\\]</div>
        <p>If we differentiate this as-is, \\(y_p''\\) contains \\(u_1''\\) and \\(u_2''\\). We introduced two unknown functions even though we only need one particular solution, so we have freedom to impose one extra relation that makes the algebra manageable.</p>`},
      {type:"teach",title:"Why impose u₁′y₁ + u₂′y₂ = 0?",html:`
        <p>Choose</p><div class="eq">\\[\\boxed{u_1'y_1+u_2'y_2=0}.\\]</div>
        <p>This is <b>not</b> a fact about every solution; it is a convenient condition defining one useful representation of \\(y_p\\). Under this condition, the first derivative collapses to</p><div class="eq">\\[y_p'=u_1y_1'+u_2y_2'.\\]</div>
        <p>Now the second derivative has only first derivatives of the new parameters:</p><div class="eq">\\[y_p''=u_1'y_1'+u_2'y_2'+u_1y_1''+u_2y_2''.\\]</div>
        <div class="beginner"><b>Purpose of the condition:</b> it removes \\(u_1''\\) and \\(u_2''\\), reducing the problem to a first-order algebraic system for \\(u_1',u_2'\\).</div>`},
      {type:"teach",title:"Substitution makes the homogeneous pieces vanish",html:`
        <p>Substitute into \\(y''+py'+qy=f\\):</p><div class="eq">\\[u_1'y_1'+u_2'y_2'+u_1(y_1''+py_1'+qy_1)+u_2(y_2''+py_2'+qy_2)=f.\\]</div>
        <p>Because \\(y_1,y_2\\) solve the homogeneous equation, both bracketed expressions are zero. We are left with</p><div class="eq">\\[u_1'y_1'+u_2'y_2'=f.\\]</div>
        <p>Together with the auxiliary condition, this is the 2×2 system</p><div class="eq">\\[\\begin{cases}y_1u_1'+y_2u_2'=0,\\\\y_1'u_1'+y_2'u_2'=f.\\end{cases}\\]</div>`},
      {type:"teach",title:"Solve the system and watch the Wronskian appear",html:`
        <p>The coefficient determinant is</p><div class="eq">\\[W=y_1y_2'-y_1'y_2.\\]</div>
        <p>Solving the two equations, for example by Cramer’s rule or elimination, gives</p><div class="whybox"><div class="eq">\\[\\boxed{u_1'=-\\frac{y_2f}{W},\\qquad u_2'=\\frac{y_1f}{W}}.\\]</div></div>
        <p>The Wronskian appears because it is the determinant of the linear system for the parameter derivatives. Independence of \\(y_1,y_2\\) guarantees \\(W\\neq0\\) on the regular interval, so this system can be solved.</p>`},
      {type:"quiz",title:"Why does W appear downstairs?",q:`What is the structural reason the Wronskian appears in the denominators?`,options:[`It is the determinant of the 2×2 system for u₁′ and u₂′`,`It is the forcing function`,`It is the characteristic polynomial`],answer:0,why:`The auxiliary condition and the substituted ODE form a linear system whose determinant is W[y₁,y₂].`}
    ]}]
  },

  {
    id:"l5-workflow",courseLesson:5,color:"#8a5aa6",badge:"3",label:"Formula & workflow",
    title:"The Practical Formula, Normalization, and Domain",subtitle:"Know exactly what f means before you substitute into the formula",
    desc:"Convert a general second-order equation to standard form, use the formula safely, understand why integration constants are omitted, and track intervals of validity.",
    lessons:[{title:"Safe workflow",screens:[
      {type:"teach",title:"Normalize before using the formula",html:`
        <p>${lesson5CoreTag}</p>
        <p>If the equation is written</p><div class="eq">\\[a_2(x)y''+a_1(x)y'+a_0(x)y=g(x),\\]</div>
        <p>first divide by \\(a_2(x)\\) on an interval where \\(a_2\\neq0\\):</p><div class="eq">\\[y''+p(x)y'+q(x)y=f(x),\\qquad f=\\frac{g}{a_2}.\\]</div>
        <div class="warn"><b>Common error:</b> putting the original \\(g(x)\\) into the variation-of-parameters formula when the leading coefficient is not 1. The formula below uses the <em>normalized</em> forcing \\(f(x)\\).</div>`},
      {type:"teach",title:"Complete calculation template",html:`
        <div class="whybox"><ol><li>Put the equation in normalized form.</li><li>Solve the associated homogeneous equation and choose independent \\(y_1,y_2\\).</li><li>Compute \\(W=y_1y_2'-y_1'y_2\\).</li><li>Compute \\(u_1'=-y_2f/W\\), \\(u_2'=y_1f/W\\).</li><li>Integrate to obtain one convenient \\(u_1,u_2\\).</li><li>Form \\(y_p=u_1y_1+u_2y_2\\).</li><li>Write \\(y=y_h+y_p\\), then apply initial/boundary data if given.</li><li>Substitute back or differentiate-check the result.</li></ol></div>`},
      {type:"teach",title:"Why the integration constants can be zero",html:`
        <p>Suppose integration gives \\(u_1=U_1+C_1\\) and \\(u_2=U_2+C_2\\). Then</p><div class="eq">\\[y_p=(U_1+C_1)y_1+(U_2+C_2)y_2=U_1y_1+U_2y_2+C_1y_1+C_2y_2.\\]</div>
        <p>The last two terms are already part of the homogeneous family \\(y_h\\). Therefore we may choose the integration constants to be zero when constructing <em>one</em> particular solution.</p>`},
      {type:"teach",title:"Definite-integral form removes the ambiguity",html:`
        <p>${lesson5ExplainTag}</p>
        <p>Choosing a base point \\(x_0\\) gives a canonical-looking particular solution:</p><div class="eq">\\[u_1(x)=-\\int_{x_0}^{x}\\frac{y_2(t)f(t)}{W(t)}\\,dt,\\qquad u_2(x)=\\int_{x_0}^{x}\\frac{y_1(t)f(t)}{W(t)}\\,dt.\\]</div>
        <p>This automatically sets \\(u_1(x_0)=u_2(x_0)=0\\). It is mathematically equivalent to using indefinite integrals and dropping their constants.</p>`},
      {type:"teach",title:"Intervals are part of the answer",html:`
        <p>Variation of parameters is an interval method. The coefficients, forcing, homogeneous basis, and Wronskian must be valid on the interval. If the forcing contains \\(\\tan x\\) or \\(\\sec3x\\), you cannot write one solution formula across their singularities.</p>
        <div class="beginner"><b>Practical habit:</b> before integrating, mark where the original ODE is defined. For an IVP, choose the maximal valid interval containing the initial point.</div>`}
    ]}]
  },

  {
    id:"l5-example",courseLesson:5,color:"#b35f4a",badge:"4",label:"Book example",
    title:"O’Neil Example 2.6 — Every Integral Explained",subtitle:"A full textbook example with the trig identities unpacked",
    desc:"Work through the textbook’s variation-of-parameters example from homogeneous basis to Wronskian, parameter integrals, particular solution, and domain.",
    lessons:[{title:"O’Neil Example 2.6",screens:[
      {type:"teach",title:"Problem and homogeneous basis",html:`
        <p>${lesson5BookTag}</p><p>Find a general solution of</p><div class="eq">\\[y''+4y=\\sec x,\\qquad -\\pi/4\\le x\\le\\pi/4.\\]</div>
        <p>The homogeneous characteristic equation is \\(r^2+4=0\\), giving</p><div class="eq">\\[y_1=\\cos2x,\\qquad y_2=\\sin2x.\\]</div>
        <p>The Wronskian is</p><div class="eq">\\[W=\\cos2x(2\\cos2x)-(-2\\sin2x)\\sin2x=2.\\]</div>`},
      {type:"teach",title:"Compute u₁′ and integrate it",html:`
        <p>Here \\(f(x)=\\sec x\\). Therefore</p><div class="eq">\\[u_1'=-\\frac{\\sin2x\\,\\sec x}{2}.\\]</div>
        <p>Use \\(\\sin2x=2\\sin x\\cos x\\):</p><div class="eq">\\[u_1'=-\\frac{2\\sin x\\cos x}{2\\cos x}=-\\sin x.\\]</div>
        <p>So one convenient antiderivative is</p><div class="eq">\\[u_1=\\cos x.\\]</div>`},
      {type:"teach",title:"Compute u₂′ and integrate it",html:`
        <p>Similarly,</p><div class="eq">\\[u_2'=\\frac{\\cos2x\\,\\sec x}{2}.\\]</div>
        <p>Use \\(\\cos2x=2\\cos^2x-1\\):</p><div class="eq">\\[u_2'=\\frac{2\\cos^2x-1}{2\\cos x}=\\cos x-\\tfrac12\\sec x.\\]</div>
        <p>Integrate:</p><div class="eq">\\[u_2=\\sin x-\\tfrac12\\ln|\\sec x+\\tan x|.\\]</div>`},
      {type:"teach",title:"Assemble yₚ and the general solution",html:`
        <p>Form \\(y_p=u_1y_1+u_2y_2\\):</p><div class="eq">\\[y_p=\\cos x\\cos2x+\\sin x\\sin2x-\\tfrac12\\sin2x\\ln|\\sec x+\\tan x|.\\]</div>
        <p>The first two terms may be recognized as \\(\\cos(x-2x)=\\cos x\\), so an equivalent compact form is</p><div class="eq">\\[y_p=\\cos x-\\tfrac12\\sin2x\\ln|\\sec x+\\tan x|.\\]</div>
        <div class="whybox"><div class="eq">\\[\\boxed{y=c_1\\cos2x+c_2\\sin2x+y_p}.\\]</div><p>The stated interval stays inside \\(\\cos x>0\\), so the forcing and logarithm are well behaved there.</p></div>`}
    ]}]
  },

  {
    id:"l5-general",courseLesson:5,color:"#d27a42",badge:"5",label:"Generality",
    title:"Why This Method Is More General Than Undetermined Coefficients",subtitle:"Variable coefficients are allowed once the homogeneous basis is known",
    desc:"Understand the real strength and limitation of variation of parameters and compare it directly with Lesson 4’s faster but narrower method.",
    lessons:[{title:"Method choice",screens:[
      {type:"teach",title:"Constant coefficients are not required",html:`
        <p>${lesson5ExplainTag}</p>
        <p>The derivation never assumed that \\(p(x)\\) or \\(q(x)\\) were constant. It only used linearity and a known independent homogeneous pair. Thus variation of parameters applies to</p><div class="eq">\\[y''+p(x)y'+q(x)y=f(x)\\]</div>
        <p>on any regular interval where the homogeneous basis is known.</p>`},
      {type:"teach",title:"Supplemental example: variable coefficients without jumping ahead",html:`
        <p><span class="supplementalTag">Supplemental · not a textbook exercise</span></p>
        <p>Suppose we are <em>given</em> that \\(y_1=x\\), \\(y_2=x^2\\) form a homogeneous basis for</p><div class="eq">\\[y''-\\frac2x y'+\\frac2{x^2}y=x^2,\\qquad x>0.\\]</div>
        <p>We do not yet need the method for solving this Euler-type homogeneous equation; that belongs to the next lesson. Here the basis is supplied.</p>
        <p>Compute \\(W=x^2\\). Then</p><div class="eq">\\[u_1'=-\\frac{x^2\\cdot x^2}{x^2}=-x^2,\\qquad u_2'=\\frac{x\\cdot x^2}{x^2}=x.\\]</div>
        <p>So \\(u_1=-x^3/3\\), \\(u_2=x^2/2\\), and</p><div class="eq">\\[y_p=x(-x^3/3)+x^2(x^2/2)=\\frac{x^4}{6}.\\]</div>
        <p>This is the key advantage: variable coefficients did not break the VP formula.</p>`},
      {type:"teach",title:"Undetermined coefficients vs. variation of parameters",html:`
        <div class="reviewGrid"><div class="mini"><b>Undetermined coefficients</b><p>Fast algebra when coefficients are constant and the forcing belongs to a derivative-closed trial family. No integration required.</p></div><div class="mini"><b>Variation of parameters</b><p>Works for much broader forcing and variable coefficients, but requires a known homogeneous basis and integrals that may be difficult or non-elementary.</p></div></div>
        <div class="whybox"><b>Exam decision:</b> if UC applies cleanly, it is usually the shorter route. If the forcing is something like \\(\\tan x\\), \\(\\sec3x\\), or \\(\\cos(e^{-x})\\), VP is designed for exactly that situation.</div>`},
      {type:"quiz",title:"Choose the method",q:`For \\(y''+y=\\tan x\\), why is variation of parameters more appropriate than undetermined coefficients?`,options:[`tan x is not in a finite polynomial/exponential/trig trial family, but VP only needs the homogeneous basis and integrals`,`The coefficients are nonlinear`,`The Wronskian is zero`],answer:0,why:`The equation is linear, but tan x is outside the standard UC trial families.`}
    ]}]
  },

  {
    id:"l5-integrals",courseLesson:5,color:"#6a6f7b",badge:"6",label:"Integration & traps",
    title:"Integration Patterns and Common Failure Modes",subtitle:"Most VP errors happen after the formula is already correct",
    desc:"Build the integration habits needed for the book exercises and eliminate sign, Wronskian, normalization, and constant-handling mistakes.",
    lessons:[{title:"Error-proof execution",screens:[
      {type:"teach",title:"The four signs to protect",html:`
        <p>Keep the definitions visible while working:</p><div class="eq">\\[W=y_1y_2'-y_1'y_2,\\qquad u_1'=-\\frac{y_2f}{W},\\qquad u_2'=\\frac{y_1f}{W}.\\]</div>
        <div class="warn"><b>Do not silently reverse the Wronskian order.</b> If you define \\(W=y_2y_1'-y_2'y_1\\) instead, both formulas must change consistently. Mixing conventions causes a sign error in \\(y_p\\).</div>`},
      {type:"teach",title:"Integration pattern: substitution can be the whole point",html:`
        <p>In O’Neil Problem 5, the forcing is \\(\\cos(e^{-x})\\). After the VP formula, factors \\(e^{-x}\\) and \\(e^{-2x}\\) appear naturally. The substitution</p><div class="eq">\\[t=e^{-x},\\qquad dt=-e^{-x}dx\\]</div>
        <p>turns the apparently awkward expressions into elementary \\(\\cos t\\) and \\(t\\cos t\\) integrals. This illustrates why VP can handle forcings that UC cannot guess.</p>`},
      {type:"teach",title:"Verification is faster than re-solving",html:`
        <p>After obtaining \\(y_p\\), substitute it into the original operator and check</p><div class="eq">\\[L[y_p]\\stackrel{?}=f(x).\\]</div>
        <p>You do not need to re-derive \\(u_1,u_2\\) to catch a mistake. A direct substitution detects most sign or integration errors immediately.</p>`},
      {type:"quiz",title:"Normalization trap",q:`For \\(3y''+6y'+y=g(x)\\), what forcing enters the standard VP formulas after normalization?`,options:[`g(x)/3`,`g(x)`,`3g(x)`],answer:0,why:`Divide the entire equation by the leading coefficient 3 before identifying f(x).`}
    ]}]
  },

  {
    id:"l5-ivp",courseLesson:5,color:"#3f7f8f",badge:"7",label:"IVP & mastery prep",
    title:"Initial-Value Problems, Domains, and Final Checklist",subtitle:"Assemble the general solution first; fit the constants last",
    desc:"Use the VP particular solution inside the general nonhomogeneous family, apply initial data without confusing parameter functions with constants, and state the correct interval.",
    lessons:[{title:"IVP workflow",screens:[
      {type:"teach",title:"There are still only two arbitrary constants",html:`
        <p>The functions \\(u_1,u_2\\) are determined by integration up to homogeneous additions. After we choose one particular solution, the general answer is still</p><div class="eq">\\[y=c_1y_1+c_2y_2+y_p.\\]</div>
        <p>For a second-order IVP, the two initial conditions determine only \\(c_1,c_2\\). Do not introduce extra free constants inside \\(u_1,u_2\\).</p>`},
      {type:"teach",title:"Final checklist",html:`
        <div class="whybox"><ol><li>Normalize the equation.</li><li>Find/verify an independent homogeneous basis.</li><li>Compute the Wronskian in a fixed order.</li><li>Use the correct normalized forcing in \\(u_1',u_2'\\).</li><li>Integrate, omitting redundant constants.</li><li>Assemble and simplify \\(y_p\\).</li><li>Write \\(y_h+y_p\\).</li><li>Apply IVP data if present.</li><li>State the valid interval and substitute-check.</li></ol></div>`},
      {type:"quiz",title:"Where do initial conditions enter?",q:`When solving a nonhomogeneous IVP by variation of parameters, when should the initial conditions normally be applied?`,options:[`After y_h+y_p has been assembled`,`Before computing the Wronskian`,`While choosing the auxiliary condition`],answer:0,why:`First construct the general solution; then the initial conditions determine the two homogeneous constants.`}
    ]}]
  }
];

const l5OriginalNormalize = {
  type:"bookproblem",bookSection:"Course original",practiceLabel:"Original transfer problem · source-transparent",
  title:"Original transfer · normalize before using the formula",
  prompt:`<p><span class="supplementalTag">Original course problem · not O’Neil</span></p><p>Use variation of parameters to find one particular solution on \\((-\\pi/2,\\pi/2)\\):</p><div class="eq">\\[2y''+2y=4\\sec x.\\]</div><p>Your solution must explicitly identify the normalized forcing before computing \\(u_1',u_2'\\).</p>`,
  solution:`<p><b>Normalize first:</b> divide by 2, giving \\(y''+y=2\\sec x\\). Thus the forcing entering the VP formulas is \\(f(x)=2\\sec x\\), not \\(4\\sec x\\).</p><p>Choose \\(y_1=\\cos x\\), \\(y_2=\\sin x\\), with \\(W=1\\). Then</p><div class="eq">\\[u_1'=-2\\tan x,\\qquad u_2'=2.\\]</div><p>One convenient choice is \\(u_1=2\\ln|\\cos x|\\), \\(u_2=2x\\). Therefore</p><div class="whybox"><div class="eq">\\[\\boxed{y_p=2\\cos x\\ln|\\cos x|+2x\\sin x}.\\]</div><p>Direct substitution into the normalized equation gives \\(2\\sec x\\), hence the original equation gives \\(4\\sec x\\).</p></div>`
};

const l5OriginalWhy = {
  type:"bookproblem",bookSection:"Course original",practiceLabel:"Original reasoning problem · source-transparent",
  title:"Original reasoning · diagnose a broken VP solution",
  prompt:`<p><span class="supplementalTag">Original course problem · not O’Neil</span></p><p>A student starts from \\(3y''+6y'+3y=g(x)\\), uses a homogeneous basis for the normalized equation, but inserts \\(g(x)\\) directly into \\(u_1'=-y_2f/W\\) and \\(u_2'=y_1f/W\\). Identify the error and state the correct forcing.</p>`,
  solution:`<p>The variation-of-parameters formulas used in this lesson assume leading coefficient 1. Divide the ODE by 3:</p><div class="eq">\\[y''+2y'+y=\\frac{g(x)}3.\\]</div><p>Therefore the correct formula input is</p><div class="eq">\\[\\boxed{f(x)=g(x)/3}.\\]</div><p>Using \\(g(x)\\) would make the computed particular solution three times too large.</p>`
};

const lesson5Mastery = {
  id:"l5-mastery",courseLesson:5,color:"#9a3f69",badge:"8",label:"Mixed mastery",
  title:"Variation-of-Parameters Mastery",subtitle:"Derivation logic → domain → integration → transfer",
  desc:"Selected O’Neil problems cover genuinely different integration patterns. Original tasks test normalization and reasoning rather than repeating every §2.3 exercise twice.",
  lessons:[
    {title:"Textbook method range",screens:[l5CloneBook(1),l5CloneBook(3),l5CloneBook(5),l5CloneBook(24)].filter(Boolean)},
    {title:"Normalization and diagnosis",screens:[l5OriginalWhy,l5OriginalNormalize]}
  ]
};

const lesson5Units=[...lesson5BaseUnits,lesson5Mastery];

// Reconstruction policy: authentic textbook questions are used once and sampled for distinct skills.
l5AddBookPractice("l5-general","Book practice · broad forcing",[2]);
l5AddBookPractice("l5-integrals","Book practice · trig-square integration",[6]);

if(!units.some(u=>u&&u.id==="l5-idea"))units.push(...lesson5Units);

courseLessons[4]={
  number:5,
  title:"Variation of Parameters",
  subtitle:"Sep. 30 · O’Neil §2.3.1 · Wronskian derivation · parameter integrals · variable coefficients · IVPs",
  status:"current"
};