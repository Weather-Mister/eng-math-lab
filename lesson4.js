/*
  Lesson 4 — Sep. 23: Particular solutions of nonhomogeneous constant-coefficient
  ODEs by the method of undetermined coefficients.
  Course outline says O’Neil §2.4.2; the uploaded 8th-edition textbook places this
  material in §2.3.2. This lesson follows the actual textbook organization.
*/

const lesson4CoreTag = '<span class="supplementalTag">Core · Sep. 23 syllabus · O’Neil §2.3.2</span>';
const lesson4ExplainTag = '<span class="supplementalTag">Expanded explanation · why the method works</span>';
const lesson4BookTag = '<span class="supplementalTag">Textbook example · O’Neil §2.3.2</span>';

function l4BookProblem(number,prompt,solution){
  return {
    type:"bookproblem",
    bookSection:"§2.3",
    title:`O’Neil §2.3 Problem ${number}`,
    prompt,
    solution
  };
}

const lesson4BookScreens = [
  l4BookProblem(7,
    `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.3 Problem 7</span><br>Find a general solution using undetermined coefficients:</p><div class="eq">\\[y''-y'-2y=2x^2+5.\\]</div>`,
    `<p><b>1. Homogeneous part.</b> The characteristic polynomial is</p><div class="eq">\\[r^2-r-2=(r-2)(r+1),\\]</div><p>so</p><div class="eq">\\[y_h=c_1e^{2x}+c_2e^{-x}.\\]</div>
     <p><b>2. Particular trial.</b> The forcing is a quadratic polynomial, so use the complete quadratic</p><div class="eq">\\[y_p=Ax^2+Bx+C.\\]</div>
     <p>Then \\(y_p'=2Ax+B\\), \\(y_p''=2A\\). Substitution gives</p><div class="eq">\\[-2Ax^2+(-2A-2B)x+(2A-B-2C)=2x^2+5.\\]</div>
     <p>Match coefficients: \\(A=-1\\), \\(B=1\\), \\(C=-4\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^{2x}+c_2e^{-x}-x^2+x-4}.\\]</div></div>`),

  l4BookProblem(8,
    `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.3 Problem 8</span><br>Find a general solution using undetermined coefficients:</p><div class="eq">\\[y''-y'-6y=8e^{2x}.\\]</div>`,
    `<p><b>Homogeneous part:</b> \\(r^2-r-6=(r-3)(r+2)\\), hence \\(y_h=c_1e^{3x}+c_2e^{-2x}\\).</p>
     <p><b>Trial:</b> \\(y_p=Ae^{2x}\\). There is no overlap because \\(r=2\\) is not a characteristic root.</p>
     <p>Substitution gives \\((4A-2A-6A)e^{2x}=8e^{2x}\\), so \\(-4A=8\\) and \\(A=-2\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^{3x}+c_2e^{-2x}-2e^{2x}}.\\]</div></div>`),

  l4BookProblem(9,
    `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.3 Problem 9</span><br>Find a general solution using undetermined coefficients:</p><div class="eq">\\[y''-2y'+10y=20x^2+2x-8.\\]</div>`,
    `<p><b>Homogeneous part:</b> \\(r^2-2r+10=0\\Rightarrow r=1\\pm3i\\), so</p><div class="eq">\\[y_h=e^x(c_1\\cos3x+c_2\\sin3x).\\]</div>
     <p><b>Polynomial trial:</b> \\(y_p=Ax^2+Bx+C\\). After substitution,</p><div class="eq">\\[10Ax^2+(-4A+10B)x+(2A-2B+10C)=20x^2+2x-8.\\]</div>
     <p>Matching coefficients gives \\(A=2\\), \\(B=1\\), \\(C=-1\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=e^x(c_1\\cos3x+c_2\\sin3x)+2x^2+x-1}.\\]</div></div>`),

  l4BookProblem(10,
    `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.3 Problem 10</span><br>Find a general solution using undetermined coefficients:</p><div class="eq">\\[y''-4y'+5y=21e^{2x}.\\]</div>`,
    `<p>The characteristic roots are \\(2\\pm i\\), so</p><div class="eq">\\[y_h=e^{2x}(c_1\\cos x+c_2\\sin x).\\]</div>
     <p>Use \\(y_p=Ae^{2x}\\). Notice that \\(e^{2x}\\) by itself is <em>not</em> a homogeneous solution; the roots are \\(2\\pm i\\), not \\(2\\).</p>
     <p>Substitution yields \\(Ae^{2x}=21e^{2x}\\), so \\(A=21\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=e^{2x}(c_1\\cos x+c_2\\sin x+21)}.\\]</div></div>`),

  l4BookProblem(11,
    `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.3 Problem 11</span><br>Find a general solution using undetermined coefficients:</p><div class="eq">\\[y''-6y'+8y=3e^x.\\]</div>`,
    `<p>From \\((r-2)(r-4)=0\\),</p><div class="eq">\\[y_h=c_1e^{2x}+c_2e^{4x}.\\]</div>
     <p>Try \\(y_p=Ae^x\\). Substitution gives \\((1-6+8)Ae^x=3e^x\\), hence \\(3A=3\\) and \\(A=1\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^{2x}+c_2e^{4x}+e^x}.\\]</div></div>`),

  l4BookProblem(12,
    `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.3 Problem 12</span><br>Find a general solution using undetermined coefficients:</p><div class="eq">\\[y''+6y'+9y=9\\cos3x.\\]</div>`,
    `<p>The characteristic equation \\((r+3)^2=0\\) gives \\(y_h=(c_1+c_2x)e^{-3x}\\).</p>
     <p>For a cosine forcing, always include both sine and cosine:</p><div class="eq">\\[y_p=A\\cos3x+B\\sin3x.\\]</div>
     <p>Substitution reduces to</p><div class="eq">\\[18B\\cos3x-18A\\sin3x=9\\cos3x.\\]</div>
     <p>Therefore \\(B=1/2\\) and \\(A=0\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=(c_1+c_2x)e^{-3x}+\\tfrac12\\sin3x}.\\]</div></div>`),

  l4BookProblem(13,
    `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.3 Problem 13</span><br>Find a general solution using undetermined coefficients:</p><div class="eq">\\[y''-3y'+2y=10\\sin x.\\]</div>`,
    `<p>The homogeneous roots are \\(1,2\\), so \\(y_h=c_1e^x+c_2e^{2x}\\).</p>
     <p>Use the paired trigonometric trial</p><div class="eq">\\[y_p=A\\cos x+B\\sin x.\\]</div>
     <p>After substitution, the cosine coefficient is \\(A-3B\\) and the sine coefficient is \\(3A+B\\). Matching \\(0\\cos x+10\\sin x\\) gives</p><div class="eq">\\[A-3B=0,\\qquad3A+B=10.\\]</div>
     <p>Thus \\(A=3\\), \\(B=1\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^x+c_2e^{2x}+3\\cos x+\\sin x}.\\]</div></div>`),

  l4BookProblem(14,
    `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.3 Problem 14</span><br>Find a general solution using undetermined coefficients:</p><div class="eq">\\[y''-4y=8x^2+2e^{3x}.\\]</div>`,
    `<p><b>Homogeneous part:</b> \\(y_h=c_1e^{2x}+c_2e^{-2x}\\).</p>
     <p><b>Split the forcing.</b> By linearity, find one particular solution for \\(8x^2\\) and another for \\(2e^{3x}\\).</p>
     <p>For the polynomial, \\(y_{p1}=Ax^2+Bx+C\\) gives \\(A=-2,B=0,C=-1\\). For the exponential, \\(y_{p2}=De^{3x}\\) gives \\((9-4)D=2\\Rightarrow D=2/5\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^{2x}+c_2e^{-2x}-2x^2-1+\\tfrac25e^{3x}}.\\]</div></div>`),

  l4BookProblem(15,
    `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.3 Problem 15</span><br>Find a general solution using undetermined coefficients:</p><div class="eq">\\[y''-4y'+13y=3e^{2x}-5e^{3x}.\\]</div>`,
    `<p>The characteristic roots are \\(2\\pm3i\\), so</p><div class="eq">\\[y_h=e^{2x}(c_1\\cos3x+c_2\\sin3x).\\]</div>
     <p>Split the forcing and try \\(Ae^{2x}+Be^{3x}\\). Neither exponential alone lies in the homogeneous family.</p>
     <p>For \\(e^{2x}\\), the operator contributes \\(9A e^{2x}\\), so \\(A=1/3\\). For \\(e^{3x}\\), it contributes \\(10B e^{3x}\\), so \\(B=-1/2\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=e^{2x}(c_1\\cos3x+c_2\\sin3x)+\\tfrac13e^{2x}-\\tfrac12e^{3x}}.\\]</div></div>`),

  l4BookProblem(16,
    `<p><span class="supplementalTag">Textbook exercise · O’Neil §2.3 Problem 16</span><br>Find a general solution using undetermined coefficients:</p><div class="eq">\\[y''-2y'+y=3x+25\\sin3x.\\]</div>`,
    `<p>The homogeneous root is \\(r=1\\) twice, giving \\(y_h=(c_1+c_2x)e^x\\).</p>
     <p>Split the forcing. For \\(3x\\), try \\(Ax+B\\); matching gives \\(A=3,B=6\\). For \\(25\\sin3x\\), try \\(C\\cos3x+D\\sin3x\\); matching gives \\(C=3/2,D=-2\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=(c_1+c_2x)e^x+3x+6+\\tfrac32\\cos3x-2\\sin3x}.\\]</div></div>`),

  l4BookProblem(17,
    `<p><span class="supplementalTag">Textbook IVP · O’Neil §2.3 Problem 17</span><br>Solve</p><div class="eq">\\[y''-4y=-7e^{2x}+x,\\qquad y(0)=1,\\ y'(0)=3.\\]</div>`,
    `<p><b>1. Homogeneous part:</b> \\(y_h=c_1e^{2x}+c_2e^{-2x}\\).</p>
     <p><b>2. Particular part.</b> The exponential \\(e^{2x}\\) overlaps a homogeneous solution, so \\(Ae^{2x}\\) would be annihilated. Multiply by \\(x\\): use \\(Axe^{2x}\\). For the polynomial forcing use \\(Bx+C\\).</p>
     <p>Substitution gives \\(A=-7/4\\), \\(B=-1/4\\), \\(C=0\\), hence</p><div class="eq">\\[y=c_1e^{2x}+c_2e^{-2x}-\\tfrac74xe^{2x}-\\tfrac14x.\\]</div>
     <p>Applying the two initial conditions gives \\(c_1=7/4\\), \\(c_2=-3/4\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=\\tfrac74e^{2x}-\\tfrac34e^{-2x}-\\tfrac74xe^{2x}-\\tfrac14x}.\\]</div></div>`),

  l4BookProblem(18,
    `<p><span class="supplementalTag">Textbook IVP · O’Neil §2.3 Problem 18</span><br>Solve</p><div class="eq">\\[y''+4y=8+34\\cos x,\\qquad y(0)=3,\\ y'(0)=2.\\]</div>`,
    `<p>The homogeneous family is \\(y_h=c_1\\cos2x+c_2\\sin2x\\).</p>
     <p>Use \\(y_p=A+B\\cos x+C\\sin x\\). Coefficient matching gives \\(A=2\\), \\(B=34/3\\), \\(C=0\\).</p>
     <p>So \\(y=c_1\\cos2x+c_2\\sin2x+2+\\frac{34}{3}\\cos x\\). The initial conditions give \\(c_1=-31/3\\) and \\(c_2=1\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=2+\\tfrac{34}{3}\\cos x-\\tfrac{31}{3}\\cos2x+\\sin2x}.\\]</div></div>`),

  l4BookProblem(19,
    `<p><span class="supplementalTag">Textbook IVP · O’Neil §2.3 Problem 19</span><br>Solve</p><div class="eq">\\[y''+8y'+12y=e^{-x}+7,\\qquad y(0)=1,\\ y'(0)=0.\\]</div>`,
    `<p>The homogeneous roots are \\(-2,-6\\). Use \\(y_p=Ae^{-x}+B\\). Matching gives \\(A=1/5\\), \\(B=7/12\\).</p>
     <p>Thus</p><div class="eq">\\[y=c_1e^{-2x}+c_2e^{-6x}+\\tfrac15e^{-x}+\\tfrac7{12}.\\]</div>
     <p>The initial conditions yield \\(c_1=3/8\\), \\(c_2=-19/120\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=\\tfrac38e^{-2x}-\\tfrac{19}{120}e^{-6x}+\\tfrac15e^{-x}+\\tfrac7{12}}.\\]</div></div>`),

  l4BookProblem(20,
    `<p><span class="supplementalTag">Textbook IVP · O’Neil §2.3 Problem 20</span><br>Solve</p><div class="eq">\\[y''-3y'=2e^{2x}\\sin x,\\qquad y(0)=1,\\ y'(0)=2.\\]</div>`,
    `<p>The homogeneous roots are \\(0,3\\), so \\(y_h=c_1+c_2e^{3x}\\).</p>
     <p>The forcing is an exponential times a sine. Differentiation mixes sine and cosine, so the complete trial is</p><div class="eq">\\[y_p=e^{2x}(A\\cos x+B\\sin x).\\]</div>
     <p>Matching coefficients gives \\(A=-1/5\\), \\(B=-3/5\\), so</p><div class="eq">\\[y=c_1+c_2e^{3x}-\\tfrac15e^{2x}(\\cos x+3\\sin x).\\]</div>
     <p>Using the IVP gives \\(c_1=1/5\\), \\(c_2=1\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=\\tfrac15+e^{3x}-\\tfrac15e^{2x}(\\cos x+3\\sin x)}.\\]</div></div>`),

  l4BookProblem(21,
    `<p><span class="supplementalTag">Textbook IVP · O’Neil §2.3 Problem 21</span><br>Solve</p><div class="eq">\\[y''-2y'-8y=10e^{-x}+8e^{2x},\\qquad y(0)=1,\\ y'(0)=4.\\]</div>`,
    `<p>The homogeneous roots are \\(4,-2\\), so \\(y_h=c_1e^{4x}+c_2e^{-2x}\\).</p>
     <p>Use \\(y_p=Ae^{-x}+Be^{2x}\\). Substitution gives \\(A=-2\\), \\(B=-1\\).</p>
     <p>After applying the initial conditions, \\(c_1=2\\) and \\(c_2=2\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=2e^{4x}+2e^{-2x}-2e^{-x}-e^{2x}}.\\]</div></div>`),

  l4BookProblem(22,
    `<p><span class="supplementalTag">Textbook IVP · O’Neil §2.3 Problem 22</span><br>Solve</p><div class="eq">\\[y''-y'+y=1,\\qquad y(1)=4,\\ y'(1)=-2.\\]</div>`,
    `<p>The characteristic roots are \\(\\frac12\\pm i\\frac{\\sqrt3}{2}\\). A constant particular solution works: \\(y_p=1\\).</p>
     <p>For the IVP it is cleaner to shift the homogeneous family around \\(x=1\\):</p><div class="eq">\\[y=1+e^{(x-1)/2}[A\\cos(\\tfrac{\\sqrt3}{2}(x-1))+B\\sin(\\tfrac{\\sqrt3}{2}(x-1))].\\]</div>
     <p>The value condition gives \\(A=3\\). At \\(x=1\\), the derivative is \\(A/2+B\\sqrt3/2=-2\\), so \\(B=-7/\\sqrt3\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=1+e^{(x-1)/2}[3\\cos(\\tfrac{\\sqrt3}{2}(x-1))-\\tfrac7{\\sqrt3}\\sin(\\tfrac{\\sqrt3}{2}(x-1))]}.\\]</div></div>`),

  l4BookProblem(23,
    `<p><span class="supplementalTag">Textbook IVP · O’Neil §2.3 Problem 23</span><br>Solve</p><div class="eq">\\[y''-y=5\\sin^2x,\\qquad y(0)=2,\\ y'(0)=-4.\\]</div>`,
    `<p><b>First rewrite the forcing.</b> Undetermined coefficients needs a derivative-closed form. Use</p><div class="eq">\\[\\sin^2x=\\frac{1-\\cos2x}{2}.\\]</div>
     <p>Thus the right side is \\(\\frac52-\\frac52\\cos2x\\). The homogeneous family is \\(c_1e^x+c_2e^{-x}\\). A suitable particular trial is \\(A+B\\cos2x+C\\sin2x\\), which gives</p><div class="eq">\\[y_p=-\\frac52+\\frac12\\cos2x= -\\sin^2x-2.\\]</div>
     <p>Applying the initial conditions gives \\(c_1=0\\), \\(c_2=4\\).</p>
     <div class="whybox"><div class="eq">\\[\\boxed{y=4e^{-x}-\\sin^2x-2}.\\]</div></div>`)
];

function l4CloneBook(number){
  const source=lesson4BookScreens.find(s=>s.title===`O’Neil §2.3 Problem ${number}`);
  return source?{...source,inlineBookPractice:true}:null;
}
function l4AddBookPractice(unitId,title,numbers){
  const unit=lesson4Units.find(u=>u.id===unitId);
  if(!unit)return;
  const screens=numbers.map(l4CloneBook).filter(Boolean);
  if(screens.length)unit.lessons.push({title,screens});
}

const lesson4BaseUnits = [
  {
    id:"l4-structure",courseLesson:4,color:"#4059ad",badge:"1",label:"Structure",
    title:"Nonhomogeneous Solutions: What Are We Actually Looking For?",subtitle:"Separate the natural response from the forced response",
    desc:"Build the logic behind y = y_h + y_p before choosing any trial. Understand why one particular solution is enough and why arbitrary constants belong only in the homogeneous part.",
    lessons:[
      {title:"The structure y = y_h + y_p",screens:[
        {type:"teach",title:"The Sep. 23 target",html:`
          <p>${lesson4CoreTag}</p>
          <p>The syllabus asks for <b>particular solutions of nonhomogeneous equations by undetermined coefficients (UC)</b>. We will use <b>UC</b> as a short label for this method from here onward. In the uploaded O’Neil 8th edition this is §2.3.2. The course outline prints §2.4.2, but §2.4 in the actual book is the Euler equation; this lesson follows the book’s real section numbering.</p>
          <p>We start from a constant-coefficient linear equation</p><div class="eq">\\[L[y]=y''+ay'+by=f(x).\\]</div>
          <div class="beginner"><b>Goal:</b> do not try to solve everything at once. First solve the homogeneous equation \\(L[y]=0\\), then find just <em>one</em> function whose image under \\(L\\) is the forcing \\(f(x)\\).</div>`},
        {type:"teach",title:"Why y = y_h + y_p",html:`
          <p>${lesson4ExplainTag}</p>
          <p>Let \\(y_h\\) satisfy \\(L[y_h]=0\\), and let \\(y_p\\) satisfy \\(L[y_p]=f(x)\\). Because \\(L\\) is linear,</p><div class="eq">\\[L[y_h+y_p]=L[y_h]+L[y_p]=0+f(x)=f(x).\\]</div>
          <p>So every \\(y_h+y_p\\) is a solution of the nonhomogeneous equation.</p>
          <p>Conversely, if \\(y\\) and \\(y_p\\) both solve \\(L[\\cdot]=f\\), then</p><div class="eq">\\[L[y-y_p]=f-f=0.\\]</div>
          <p>Therefore \\(y-y_p\\) must be homogeneous. This proves the full structure:</p><div class="whybox"><div class="eq">\\[\\boxed{y=y_h+y_p}.\\]</div><p>The homogeneous family carries the arbitrary constants; the particular part needs none.</p></div>`},
        {type:"quiz",title:"What belongs in yₚ?",q:`Why should a particular solution \\(y_p\\) not contain new arbitrary constants?`,options:[`Because we only need one function with L[yₚ]=f; arbitrary homogeneous directions are already in yₕ`,`Because constants are forbidden in differential equations`,`Because yₚ must always be zero at x=0`],answer:0,why:`Any arbitrary homogeneous addition to yₚ can simply be absorbed into yₕ. One particular solution is enough.`},
        {type:"teach",title:"The method in one clean workflow",html:`
          <p>For a constant-coefficient equation:</p>
          <div class="whybox"><b>Workflow</b><ol><li>Solve the associated homogeneous equation and write \\(y_h\\).</li><li>Inspect \\(f(x)\\) and choose a trial family for \\(y_p\\).</li><li>Check whether any part of that trial overlaps \\(y_h\\). If it does, multiply the entire overlapping trial by enough powers of \\(x\\).</li><li>Differentiate and substitute.</li><li>Match coefficients and solve for the unknown trial coefficients.</li><li>Write \\(y=y_h+y_p\\).</li><li>For an IVP, apply the initial conditions only after the complete general solution is assembled.</li></ol></div>`}
      ]}
    ]
  },

  {
    id:"l4-trials",courseLesson:4,color:"#2e7d69",badge:"2",label:"Trial families",
    title:"How to Choose the Trial Without Guessing Blindly",subtitle:"Derivative-closed families are the reason undetermined coefficients works",
    desc:"Learn the complete trial table for polynomials, exponentials, trig functions, products, and sums — including why missing terms must be included.",
    lessons:[
      {title:"Why trial families work",screens:[
        {type:"teach",title:"The deeper reason: differentiation stays inside certain families",html:`
          <p>${lesson4ExplainTag}</p>
          <p>Undetermined coefficients works when repeated differentiation of the forcing stays inside a <b>finite family of familiar functions</b>.</p>
          <div class="reviewGrid"><div class="mini"><b>Polynomial</b><p>Derivatives lower the degree but remain polynomials.</p></div><div class="mini"><b>Exponential</b><p>Derivatives of \\(e^{\\alpha x}\\) are constant multiples of itself.</p></div><div class="mini"><b>Sine/cosine</b><p>Differentiation rotates between sine and cosine.</p></div><div class="mini"><b>Products</b><p>Products such as \\(e^{\\alpha x}\\cos\\beta x\\) stay in the same exponential–trig family.</p></div></div>
          <p>Because \\(L\\) uses only constant multiples of derivatives, applying \\(L\\) to one of these families cannot escape the family. We choose unknown coefficients so that the result becomes exactly \\(f(x)\\).</p>`},
        {type:"teach",title:"The complete trial table",html:`
          <p>${lesson4CoreTag}</p>
          <div class="reviewGrid">
            <div class="mini"><b>Polynomial \\(P_n(x)\\)</b><div class="eq">\\[A_nx^n+\\cdots+A_1x+A_0\\]</div></div>
            <div class="mini"><b>Exponential \\(Ce^{\\alpha x}\\)</b><div class="eq">\\[Ae^{\\alpha x}\\]</div></div>
            <div class="mini"><b>Sine/cosine at \\(\\beta\\)</b><div class="eq">\\[A\\cos\\beta x+B\\sin\\beta x\\]</div></div>
            <div class="mini"><b>Product \\(e^{\\alpha x}P_n(x)\\cos\\beta x\\) / sine</b><div class="eq">\\[e^{\\alpha x}[Q_n(x)\\cos\\beta x+R_n(x)\\sin\\beta x]\\]</div></div>
          </div>
          <div class="warn"><b>Complete the family.</b> Even if the forcing omits some lower polynomial powers or contains only sine, derivatives can create those missing partners. Your trial must include them.</div>`},
        {type:"teach",title:"Why a quadratic needs Ax² + Bx + C",html:`
          <p>Suppose the forcing is \\(4x^2\\). It is tempting to try only \\(Ax^2\\). But differentiation creates lower powers, and the operator also contains \\(y'\\) and \\(y\\). Those lower powers generally cannot be matched unless the trial already includes them:</p><div class="eq">\\[y_p=Ax^2+Bx+C.\\]</div>
          <p>The same rule applies to every polynomial: use the full polynomial of the same degree.</p>`},
        {type:"teach",title:"Why cosine forces us to include sine",html:`
          <p>If the forcing is only \\(5\\cos2x\\), we still use</p><div class="eq">\\[y_p=A\\cos2x+B\\sin2x.\\]</div>
          <p>Why? Because</p><div class="eq">\\[(\\cos2x)'=-2\\sin2x,\\qquad(\\sin2x)'=2\\cos2x.\\]</div>
          <p>A \\(y'\\) term mixes the two. Leaving out the sine partner can make coefficient matching impossible even when the final coefficient happens to be zero.</p>`},
        {type:"quiz",title:"Choose the complete trial",q:`For \\(f(x)=e^{2x}(3x-1)\\cos4x\\), before checking resonance, what family should you try?`,options:[`e^{2x}[(Ax+B)cos4x+(Cx+D)sin4x]`,`Ae^{2x}cos4x`,`(Ax+B)cos4x`],answer:0,why:`The product combines an exponential, a degree-1 polynomial, and a trig frequency. The complete derivative-closed family needs both sine and cosine, each with a degree-1 polynomial.`}
      ]}
    ]
  },

  {
    id:"l4-book-examples",courseLesson:4,color:"#8a5aa6",badge:"3",label:"Book examples",
    title:"O’Neil Examples 2.7–2.10",subtitle:"Exponential, polynomial, trigonometric, and split forcing",
    desc:"Work through the textbook’s core examples with the missing reasoning made explicit, then immediately solve matching book exercises.",
    lessons:[
      {title:"O’Neil Example 2.7 · exponential forcing",screens:[
        {type:"teach",title:"Example 2.7: y'' + 4y = 7e^{3x}",html:`
          <p>${lesson4BookTag}</p><div class="eq">\\[y''+4y=7e^{3x}.\\]</div>
          <p><b>Homogeneous part.</b> \\(r^2+4=0\\Rightarrow r=\\pm2i\\), so</p><div class="eq">\\[y_h=c_1\\cos2x+c_2\\sin2x.\\]</div>
          <p><b>Particular part.</b> The forcing is an exponential, so try \\(y_p=Ae^{3x}\\). Then \\(y_p''=9Ae^{3x}\\), and</p><div class="eq">\\[(9A+4A)e^{3x}=7e^{3x}.\\]</div>
          <p>Thus \\(13A=7\\), so \\(A=7/13\\).</p>
          <div class="whybox"><div class="eq">\\[\\boxed{y=c_1\\cos2x+c_2\\sin2x+\\frac7{13}e^{3x}}.\\]</div></div>`}
      ]},
      {title:"O’Neil Example 2.8 · polynomial forcing",screens:[
        {type:"teach",title:"Example 2.8: why every polynomial coefficient is needed",html:`
          <p>${lesson4BookTag}</p><div class="eq">\\[y''+3y'+2y=-2x^2+3.\\]</div>
          <p>The homogeneous roots are \\(-1,-2\\), giving \\(y_h=c_1e^{-x}+c_2e^{-2x}\\).</p>
          <p>The forcing has degree 2. Even though there is no \\(x\\)-term on the right, try the <em>complete</em> quadratic</p><div class="eq">\\[y_p=Ax^2+Bx+C.\\]</div>
          <p>Substitution gives</p><div class="eq">\\[2Ax^2+(6A+2B)x+(2A+3B+2C)=-2x^2+3.\\]</div>
          <p>Matching powers gives \\(A=-1\\), \\(B=3\\), \\(C=-2\\).</p>
          <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^{-x}+c_2e^{-2x}-x^2+3x-2}.\\]</div></div>`}
      ]},
      {title:"O’Neil Example 2.9 · trig forcing",screens:[
        {type:"teach",title:"Example 2.9: sine and cosine travel together",html:`
          <p>${lesson4BookTag}</p><div class="eq">\\[y''+y'+3y=5\\sin2x.\\]</div>
          <p>The homogeneous roots are \\(-1/2\\pm i\\sqrt{11}/2\\), so</p><div class="eq">\\[y_h=e^{-x/2}[c_1\\cos(\\tfrac{\\sqrt{11}}2x)+c_2\\sin(\\tfrac{\\sqrt{11}}2x)].\\]</div>
          <p>Try \\(y_p=A\\cos2x+B\\sin2x\\). Substitution and coefficient matching gives</p><div class="eq">\\[-A+2B=0,\\qquad -2A-B=5.\\]</div>
          <p>Hence \\(A=-2\\), \\(B=-1\\).</p>
          <div class="whybox"><div class="eq">\\[\\boxed{y=y_h-2\\cos2x-\\sin2x}.\\]</div></div>`}
      ]},
      {title:"O’Neil Example 2.10 · split forcing",screens:[
        {type:"teach",title:"Example 2.10: use superposition to split unlike forcing",html:`
          <p>${lesson4BookTag}</p><div class="eq">\\[y''+2y'-3y=4x^2-x+11e^{2x}.\\]</div>
          <p>The homogeneous roots are \\(1,-3\\): \\(y_h=c_1e^x+c_2e^{-3x}\\).</p>
          <p>Because the forcing is a sum of two different families, linearity lets us write</p><div class="eq">\\[y_p=y_{p,\\text{poly}}+y_{p,\\exp}.\\]</div>
          <p>For \\(11e^{2x}\\), try \\(Ae^{2x}\\), giving \\(A=11/5\\). For \\(4x^2-x\\), try \\(Bx^2+Cx+D\\), giving</p><div class="eq">\\[B=-\\frac43,\\qquad C=-\\frac{13}{9},\\qquad D=-\\frac{50}{27}.\\]</div>
          <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^x+c_2e^{-3x}+\\frac{11}{5}e^{2x}-\\frac43x^2-\\frac{13}{9}x-\\frac{50}{27}}.\\]</div></div>`},
        {type:"quiz",title:"Why may we split the forcing?",q:`If \\(L[y]=f_1+f_2\\), why can we find \\(y_{p1}\\) for \\(f_1\\) and \\(y_{p2}\\) for \\(f_2\\) separately?`,options:[`Linearity gives L[yₚ₁+yₚ₂]=L[yₚ₁]+L[yₚ₂]=f₁+f₂`,`Because every forcing is separable`,`Because the characteristic roots add`],answer:0,why:`This is exactly superposition for a linear differential operator.`}
      ]}
    ]
  },

  {
    id:"l4-resonance",courseLesson:4,color:"#b35f4a",badge:"4",label:"Overlap / resonance",
    title:"The x-Multiplier Rule: What to Do When the Trial Is Already Homogeneous",subtitle:"Understand the failure first; then the correction becomes inevitable",
    desc:"Derive the overlap rule from the operator, work O’Neil Examples 2.11–2.12, and learn how root multiplicity determines the required power of x.",
    lessons:[
      {title:"Why the naive trial can fail",screens:[
        {type:"teach",title:"The failure has a precise cause",html:`
          <p>${lesson4ExplainTag}</p>
          <p>Suppose the forcing suggests a trial \\(g(x)\\), but \\(g\\) is already a homogeneous solution. Then</p><div class="eq">\\[L[g]=0.\\]</div>
          <p>So any constant multiple also satisfies \\(L[Ag]=0\\). No choice of \\(A\\) can make it equal a nonzero forcing. The coefficient equation collapses to an impossibility such as \\(0=11e^{-x}\\).</p>
          <div class="warn"><b>This is not bad algebra.</b> It is a signal that the trial lies in the null space of the operator. You must move to a linearly independent function.</div>`},
        {type:"teach",title:"O’Neil Example 2.11: one x fixes a simple overlap",html:`
          <p>${lesson4BookTag}</p><div class="eq">\\[y''+5y'+4y=11e^{-x}.\\]</div>
          <p>The characteristic polynomial is \\((r+1)(r+4)\\), so \\(e^{-x}\\) is already in \\(y_h\\).</p>
          <p>The naive trial \\(Ae^{-x}\\) is annihilated. Multiply by \\(x\\):</p><div class="eq">\\[y_p=Axe^{-x}.\\]</div>
          <p>Substitution gives \\(3Ae^{-x}=11e^{-x}\\), so \\(A=11/3\\).</p>
          <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^{-x}+c_2e^{-4x}+\\frac{11}{3}xe^{-x}}.\\]</div></div>`},
        {type:"teach",title:"O’Neil Example 2.12: a double overlap needs x²",html:`
          <p>${lesson4BookTag}</p><div class="eq">\\[y''-4y'+4y=3e^{2x}.\\]</div>
          <p>The characteristic polynomial is \\((r-2)^2\\), so the homogeneous family already contains</p><div class="eq">\\[e^{2x},\\qquad xe^{2x}.\\]</div>
          <p>Therefore \\(Ae^{2x}\\) overlaps, and \\(Axe^{2x}\\) also overlaps. Multiply by \\(x^2\\):</p><div class="eq">\\[y_p=Ax^2e^{2x}.\\]</div>
          <p>Substitution gives \\(2Ae^{2x}=3e^{2x}\\), hence \\(A=3/2\\).</p>
          <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^{2x}+c_2xe^{2x}+\\frac32x^2e^{2x}}.\\]</div></div>`},
        {type:"teach",title:"General overlap rule",html:`
          <p>Suppose your ordinary trial corresponds to the complex number \\(\\lambda=\\alpha+i\\beta\\). Check the characteristic polynomial.</p>
          <div class="whybox"><div class="eq">\\[\\boxed{\\text{If }\\lambda\\text{ is a root of multiplicity }s,\\text{ multiply the entire trial by }x^s.}\\]</div></div>
          <p>Examples: simple root → multiply by \\(x\\); double root → \\(x^2\\); no root → no extra \\(x\\).</p>
          <p>For a trig forcing, \\(\\cos\\beta x\\) and \\(\\sin\\beta x\\) correspond to the pair \\(\\pm i\\beta\\). For \\(e^{\\alpha x}\\cos\\beta x\\), use \\(\\alpha\\pm i\\beta\\).</p>`},
        {type:"quiz",title:"Multiplicity check",q:`The forcing is \\(e^{2x}\\), and the characteristic polynomial contains \\((r-2)^3\\). What factor must multiply the usual trial?`,options:[`x³`,`x`,`x²`],answer:0,why:`The corresponding root r=2 has multiplicity 3, so multiply by x³.`}
      ]}
    ]
  },

  {
    id:"l4-products",courseLesson:4,color:"#d27a42",badge:"5",label:"Products & rewrites",
    title:"Products, Identities, and the Cases That Need Preprocessing",subtitle:"Handle e^{αx}sinβx and expressions such as sin²x correctly",
    desc:"Extend the trial logic to exponential–trigonometric products and learn when to rewrite a forcing before choosing a trial.",
    lessons:[
      {title:"Product forcing",screens:[
        {type:"teach",title:"Exponential × trigonometric forcing",html:`
          <p>${lesson4ExplainTag}</p>
          <p>For a forcing such as</p><div class="eq">\\[e^{2x}\\sin x,\\]</div>
          <p>do not try only \\(Ae^{2x}\\sin x\\). Differentiation creates both sine and cosine while preserving the exponential. Use</p><div class="eq">\\[y_p=e^{2x}(A\\cos x+B\\sin x).\\]</div>
          <p>This is exactly the family needed for O’Neil Problem 20.</p>`},
        {type:"teach",title:"Polynomial × exponential × trig: the full general pattern",html:`
          <p>If the forcing is</p><div class="eq">\\[e^{\\alpha x}P_n(x)\\cos(\\beta x)\\quad\\text{or}\\quad e^{\\alpha x}P_n(x)\\sin(\\beta x),\\]</div>
          <p>use</p><div class="eq">\\[e^{\\alpha x}[Q_n(x)\\cos(\\beta x)+R_n(x)\\sin(\\beta x)],\\]</div>
          <p>where both \\(Q_n\\) and \\(R_n\\) are complete degree-\\(n\\) polynomials. Then apply the overlap test to \\(\\alpha\\pm i\\beta\\) and multiply the <em>entire</em> trial by \\(x^s\\) if needed.</p>`},
        {type:"teach",title:"Rewrite sin²x before choosing a trial",html:`
          <p>O’Neil Problem 23 has \\(5\\sin^2x\\). The square of sine is not in the basic trial table, but a trig identity converts it:</p><div class="eq">\\[\\sin^2x=\\frac{1-\\cos2x}{2}.\\]</div>
          <p>Now the forcing is a sum of a constant and a cosine, so the trial table applies immediately.</p>
          <div class="beginner"><b>Lesson:</b> simplify or rewrite the forcing into derivative-closed pieces before deciding that undetermined coefficients does not apply.</div>`},
        {type:"quiz",title:"Preprocess first",q:`For \\(f(x)=6\\cos^2x\\), what is the best first step?`,options:[`Use cos²x=(1+cos2x)/2, then choose a constant-plus-trig trial`,`Try A cos²x only`,`Differentiate until the square disappears`],answer:0,why:`The identity rewrites the forcing into standard UC families.`}
      ]}
    ]
  },

  {
    id:"l4-limitations",courseLesson:4,color:"#6a6f7b",badge:"6",label:"Limits & method choice",
    title:"When Undetermined Coefficients Does Not Apply",subtitle:"Know the boundary of the method instead of forcing it onto every ODE",
    desc:"Distinguish constant-coefficient UC problems from forcings that need variation of parameters, and make the next lesson’s scope explicit.",
    lessons:[
      {title:"Method boundary",screens:[
        {type:"teach",title:"Two requirements to check before using UC",html:`
          <p>${lesson4CoreTag}</p>
          <p>For the version taught here, check both:</p><div class="whybox"><ol><li>The differential equation has <b>constant coefficients</b>.</li><li>The forcing belongs, after simple identities/algebra, to a finite derivative-closed family built from polynomials, exponentials, sines/cosines, and their products.</li></ol></div>
          <p>If either condition fails, do not invent a trial table entry that has no closure property.</p>`},
        {type:"teach",title:"O’Neil’s e^{-x³} warning",html:`
          <p>${lesson4BookTag}</p>
          <p>O’Neil gives the example</p><div class="eq">\\[y''+8y'-2y=-6e^{-x^3}.\\]</div>
          <p>Differentiating \\(e^{-x^3}\\) produces polynomial factors, and repeated derivatives keep increasing their complexity. There is no finite trial family of the UC type that closes neatly.</p>
          <div class="warn"><b>Conclusion:</b> undetermined coefficients is not a universal method. A more general method is needed.</div>`},
        {type:"teach",title:"Why Problems 1–6 and 24 are deferred",html:`
          <p>The textbook itself assigns §2.3 Problems <b>1–6</b> to <b>variation of parameters</b>. Problem <b>24</b> has forcing \\(\\tan x\\), which also lies outside the standard UC trial families.</p>
          <p>The course schedule puts variation of parameters on <b>Sep. 30</b>, so those problems are deliberately reserved for Lesson 5 rather than pulled forward.</p>
          <div class="whybox"><b>Lesson 4 practice scope:</b> Problems 7–23 are the textbook block relevant to undetermined coefficients and its IVPs. This reconstructed lesson deliberately uses a <b>representative, non-repetitive selection</b> from that block—placed beside the concepts they reinforce and in mixed mastery—instead of claiming to repeat every exercise.</div>`},
        {type:"quiz",title:"Method choice",q:`Which forcing is NOT a standard undetermined-coefficients forcing?`,options:[`tan x`,`x²e^{3x}`,`e^{-x}cos4x`],answer:0,why:`tan x does not stay in a finite derivative-closed family. It is a natural variation-of-parameters case.`}
      ]}
    ]
  },

  {
    id:"l4-ivp",courseLesson:4,color:"#3f7f8f",badge:"7",label:"IVPs & exam workflow",
    title:"Initial-Value Problems and Error-Proof Workflow",subtitle:"Solve the equation first; fit the constants last",
    desc:"Integrate undetermined coefficients with the IVP structure from Lesson 2 and build a reliable exam-time decision process.",
    lessons:[
      {title:"IVP workflow",screens:[
        {type:"teach",title:"Do not apply initial conditions too early",html:`
          <p>${lesson4ExplainTag}</p>
          <p>In a nonhomogeneous second-order IVP, the order is:</p><div class="whybox"><ol><li>Find \\(y_h\\).</li><li>Find one \\(y_p\\).</li><li>Combine them: \\(y=y_h+y_p\\).</li><li>Differentiate the complete expression.</li><li>Use \\(y(x_0)\\) and \\(y'(x_0)\\) to determine the two homogeneous constants.</li></ol></div>
          <p>The coefficients inside \\(y_p\\) are <em>not</em> free constants; they were already fixed by matching the differential equation.</p>`},
        {type:"teach",title:"Fast classification checklist",html:`
          <p>Before writing any trial, ask:</p>
          <div class="reviewGrid"><div class="mini"><b>1. Constant coefficients?</b><p>If no, stop and choose another method.</p></div><div class="mini"><b>2. What forcing family?</b><p>Polynomial, exponential, trig, product, or sum?</p></div><div class="mini"><b>3. Complete family?</b><p>All lower polynomial powers? Both sine and cosine?</p></div><div class="mini"><b>4. Overlap?</b><p>Compare the trial’s exponential/frequency with the characteristic roots.</p></div><div class="mini"><b>5. Multiplicity?</b><p>Multiply by \\(x^s\\) where \\(s\\) is the overlap multiplicity.</p></div><div class="mini"><b>6. Verify?</b><p>Substitute the resulting \\(y_p\\) back before fitting IVP constants.</p></div></div>`},
        {type:"quiz",title:"Most common trap",q:`For \\(y''-4y=7e^{2x}\\), what is wrong with trying \\(Ae^{2x}\\)?`,options:[`e^{2x} is already a homogeneous solution, so the operator sends Ae^{2x} to zero`,`The exponential grows too fast`,`A must be complex`],answer:0,why:`r=2 is a characteristic root. Multiply the trial by x for a simple overlap.`},
        {type:"quiz",title:"Another trap",q:`For forcing \\(4x^2+7\\), which polynomial trial is safest?`,options:[`Ax²+Bx+C`,`Ax²+C`,`Ax²`],answer:0,why:`Derivatives and lower-order terms in the operator can create x and constant terms. Use the complete degree-2 family.`}
      ]}
    ]
  }
];

const l4OriginalTransfer = {
  type:"bookproblem", bookSection:"Course original", practiceLabel:"Original transfer problem · source-transparent",
  title:"Original transfer · choose, correct, and verify the trial",
  prompt:`<p><span class="supplementalTag">Original course problem · not O’Neil</span></p><p>For</p><div class="eq">\\[y''-3y'+2y=xe^x,\\]</div><p>(a) explain why the naive trial \\(e^x(Ax+B)\\) fails, (b) choose the corrected trial, and (c) find and verify one particular solution.</p>`,
  solution:`<p>The characteristic polynomial is \\((r-1)(r-2)\\), so \\(e^x\\) belongs to the homogeneous family. The entire degree-1 exponential trial therefore overlaps once and must be multiplied by \\(x\\):</p><div class="eq">\\[y_p=xe^x(Ax+B).\\]</div><p>Substitution gives</p><div class="eq">\\[L[y_p]=e^x[-2Ax+(2A-B)].\\]</div><p>Matching \\(xe^x\\) gives \\(-2A=1\\) and \\(2A-B=0\\), so \\(A=-1/2\\), \\(B=-1\\).</p><div class="whybox"><div class="eq">\\[\\boxed{y_p=-e^x(\\tfrac12x^2+x)}.\\]</div><p>Direct substitution returns exactly \\(xe^x\\), which is the required residual check.</p></div>`
};

const l4OriginalRecognition = {
  type:"bookproblem", bookSection:"Course original", practiceLabel:"Original recognition problem · source-transparent",
  title:"Original recognition · when UC is the wrong tool",
  prompt:`<p><span class="supplementalTag">Original course problem · not O’Neil</span></p><p>For each equation, decide whether the Lesson 4 method applies directly and justify the decision before doing any algebra:</p><div class="eq">\\[(i)\\ y''+4y=x^2e^{-x},\\qquad (ii)\\ y''+x y'+y=e^x,\\qquad (iii)\\ y''+y=\\tan x.\\]</div>`,
  solution:`<p><b>(i)</b> Yes: constant coefficients and a polynomial–exponential forcing form a finite derivative-closed family.</p><p><b>(ii)</b> No: the coefficient of \\(y'\\) depends on \\(x\\), so the constant-coefficient UC method taught here is not justified.</p><p><b>(iii)</b> No: although the coefficients are constant, \\(\\tan x\\) does not generate a finite UC trial family. This is exactly the kind of forcing handled by variation of parameters in Lesson 5.</p>`
};

const lesson4Mastery = {
  id:"l4-mastery",courseLesson:4,color:"#9a3f69",badge:"8",label:"Mixed mastery",
  title:"Undetermined-Coefficients Mastery",subtitle:"Recognition → execution → overlap → IVP → transfer",
  desc:"A deliberately mixed set. Selected authentic O’Neil problems represent the important forcing patterns; original problems test method choice and transfer instead of repeating the entire textbook bank.",
  lessons:[
    {title:"Core patterns",screens:[l4CloneBook(7),l4CloneBook(12),l4CloneBook(20)].filter(Boolean)},
    {title:"Overlap and IVP",screens:[l4CloneBook(17),l4CloneBook(23)].filter(Boolean)},
    {title:"Recognition and transfer",screens:[l4OriginalRecognition,l4OriginalTransfer]}
  ]
};

const lesson4Units = [...lesson4BaseUnits,lesson4Mastery];

// Reconstruction policy: textbook exercises appear once, at a deliberate point.
// The previous version duplicated most of Problems 7–23 both inline and in mastery.
l4AddBookPractice("l4-trials","Book practice · complete trial families",[9]);
l4AddBookPractice("l4-book-examples","Book practice · split forcing",[14]);
l4AddBookPractice("l4-resonance","Book practice · resonance check",[8]);

if(!units.some(u=>u&&u.id==="l4-structure"))units.push(...lesson4Units);

courseLessons[3]={
  number:4,
  title:"Undetermined Coefficients",
  subtitle:"Sep. 23 · O’Neil §2.3.2 · particular solutions · trial families · overlap · IVPs",
  status:"current"
};