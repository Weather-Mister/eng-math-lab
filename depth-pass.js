/*
  Lesson-1 depth pass for Lessons 2–7.
  Goal: no silent method jumps in solved examples or hidden worked solutions.
  This file runs after lesson7.js and deepens the already source-audited curriculum.
*/
(()=>{
  if(typeof units==='undefined') return;

  const lessonOf=u=>Number(u?.courseLesson||1);
  const screensIn=(lesson,title)=>{
    const found=[];
    for(const u of units){
      if(lessonOf(u)!==Number(lesson)) continue;
      for(const l of (u.lessons||[])) for(const s of (l.screens||[])){
        if(!title || s.title===title) found.push(s);
      }
    }
    return found;
  };
  const each=(lesson,title,fn)=>screensIn(lesson,title).forEach(fn);
  const setTeach=(lesson,title,html)=>each(lesson,title,s=>{if(s.type==='teach') s.html=html;});
  const replaceIn=(lesson,title,field,oldText,newText)=>each(lesson,title,s=>{
    if(typeof s[field]==='string' && s[field].includes(oldText)) s[field]=s[field].replace(oldText,newText);
  });
  const beforeWhy=(lesson,title,html)=>each(lesson,title,s=>{
    if(s.type!=='bookproblem' || s._depthDetail) return;
    if(typeof s.solution!=='string') return;
    const marker='<div class="whybox">';
    s.solution=s.solution.includes(marker)?s.solution.replace(marker,html+marker):s.solution+html;
    s._depthDetail=true;
  });

  const verificationNote=`<div class="tip"><b>Verification habit:</b> once the constants are known, differentiate the final expression as needed, substitute it into the original differential equation, and then re-check every stated initial or boundary condition. This is the fastest independent way to catch a sign or coefficient error.</div>`;
  const methodPlans={
    2:`<div class="beginner"><b>Plan before calculating:</b> identify the associated homogeneous equation, verify the supplied basis and its independence, verify the particular solution when one is supplied, assemble the complete family, and only then use the initial data. Each stage answers a different question, so none should be skipped.</div>`,
    3:`<div class="beginner"><b>Plan before calculating:</b> turn the constant-coefficient ODE into its characteristic polynomial, solve the roots completely, translate the root pattern into an independent real basis, then apply initial data if present. The root pattern is what decides the solution form.</div>`,
    4:`<div class="beginner"><b>Plan before calculating:</b> solve the homogeneous equation first, identify the forcing family, choose a derivative-closed trial, check whether that trial overlaps the homogeneous solution, substitute every derivative, match coefficients, and only then fit any initial data.</div>`,
    5:`<div class="beginner"><b>Plan before calculating:</b> normalize the ODE, identify an independent homogeneous basis, compute the Wronskian, form \\(u_1',u_2'\\), show the integrations, build one particular solution, add the homogeneous family, and respect the interval on which every expression is defined.</div>`,
    6:`<div class="beginner"><b>Plan before calculating:</b> for an Euler equation, use \\(y=x^r\\) because the powers of \\(x\\) restore the power lost by differentiation; derive the characteristic equation, solve its roots, translate the root pattern back to powers/logarithms, then apply any data. For vibration problems, build and interpret the physical model before solving it.</div>`,
    7:`<div class="beginner"><b>Plan before calculating:</b> start from the physical law or boundary conditions, define the state variable and units, derive the ODE rather than memorizing it, solve with the appropriate earlier method, and finish by interpreting what the mathematical result means physically.</div>`
  };

  // Every hidden worked problem now opens with a reasoned plan and ends with an explicit check.
  for(const u of units){
    const n=lessonOf(u);
    if(n<2||n>7) continue;
    for(const l of (u.lessons||[])) for(const s of (l.screens||[])){
      if(s.type!=='bookproblem' || s._lesson1DepthWrapped) continue;
      s.solution=(methodPlans[n]||'')+s.solution+verificationNote;
      s._lesson1DepthWrapped=true;
    }
  }

  // Lesson 2: expose the one remaining compressed elimination step.
  replaceIn(2,"O’Neil §2.1 Problem 3","solution",
    `<p>Solving these two linear equations gives</p><div class="eq">c₁=23/2,  c₂=−22.</div>`,
    `<p><b>6. Solve the two constant equations without jumping.</b> We have</p><div class="eq">c_1+c_2=-\\frac{21}{2},\\qquad -2c_1-c_2=-1.</div><p>Add the equations so that \\(c_2\\) cancels:</p><div class="eq">-c_1=-1-\\frac{21}{2}=-\\frac{23}{2},</div><p>hence \\(c_1=23/2\\). Substitute this into \\(c_1+c_2=-21/2\\):</p><div class="eq">\\frac{23}{2}+c_2=-\\frac{21}{2}\\Rightarrow c_2=-22.</div>`
  );

  // Lesson 3: numbered textbook examples and higher-order examples now show the algebra that used to be implicit.
  setTeach(3,"Worked example: O’Neil Example 2.3",`
    <p><span class="supplementalTag">Textbook example · O’Neil Example 2.3</span></p>
    <p>Solve</p><div class="eq">\\[y''-y'-6y=0.\\]</div>
    <p><b>Step 1 — choose the exponential trial and derive the polynomial.</b> Put \\(y=e^{rx}\\). Then \\(y'=re^{rx}\\) and \\(y''=r^2e^{rx}\\), so</p><div class="eq">\\[(r^2-r-6)e^{rx}=0.\\]</div><p>Because \\(e^{rx}\\neq0\\),</p><div class="eq">\\[r^2-r-6=0.\\]</div>
    <p><b>Step 2 — factor completely.</b> We need two numbers whose product is \\(-6\\) and whose sum is \\(-1\\): \\(-3\\) and \\(2\\). Therefore</p><div class="eq">\\[(r-3)(r+2)=0,\\]</div><p>so \\(r_1=3\\) and \\(r_2=-2\\).</p>
    <p><b>Step 3 — translate each root back to a solution.</b></p><div class="eq">\\[y_1=e^{3x},\\qquad y_2=e^{-2x}.\\]</div>
    <p><b>Step 4 — verify independence rather than assuming it.</b></p><div class="eq">\\[W=y_1y_2'-y_1'y_2=e^{3x}(-2e^{-2x})-(3e^{3x})e^{-2x}=-5e^x.\\]</div><p>This never vanishes, so the two solutions are independent.</p>
    <p><b>Step 5 — write the complete homogeneous family.</b></p><div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^{3x}+c_2e^{-2x}}.\\]</div></div>
    <p><b>Direct ODE check:</b> \\(e^{3x}\\) gives \\((9-3-6)e^{3x}=0\\), while \\(e^{-2x}\\) gives \\((4+2-6)e^{-2x}=0\\). Linearity then verifies every linear combination.</p>`);

  setTeach(3,"Worked example: O’Neil Example 2.4",`
    <p><span class="supplementalTag">Textbook example · O’Neil Example 2.4</span></p>
    <p>Solve</p><div class="eq">\\[y''+8y'+16y=0.\\]</div>
    <p><b>Step 1 — characteristic equation.</b> With \\(y=e^{rx}\\),</p><div class="eq">\\[r^2+8r+16=(r+4)^2=0.\\]</div><p>The only root is \\(r=-4\\), but it has multiplicity two.</p>
    <p><b>Step 2 — explain why one exponential is not enough.</b> Writing \\(e^{-4x}\\) twice does not create two directions: \\(c_1e^{-4x}+c_2e^{-4x}=(c_1+c_2)e^{-4x}\\). Reduction of order therefore supplies the independent companion \\(xe^{-4x}\\).</p>
    <p><b>Step 3 — verify the companion explicitly.</b> Let \\(y_2=xe^{-4x}\\). Then</p><div class="eq">\\[y_2'=(1-4x)e^{-4x},\\qquad y_2''=(16x-8)e^{-4x}.\\]</div><p>Substitution gives</p><div class="eq">\\[y_2''+8y_2'+16y_2=e^{-4x}[(16x-8)+8(1-4x)+16x]=0.\\]</div>
    <p><b>Step 4 — check independence.</b></p><div class="eq">\\[W=e^{-4x}(1-4x)e^{-4x}-(-4e^{-4x})(xe^{-4x})=e^{-8x}\\neq0.\\]</div>
    <div class="whybox"><div class="eq">\\[\\boxed{y=(c_1+c_2x)e^{-4x}}.\\]</div></div>`);

  setTeach(3,"Worked example: O’Neil Example 2.5",`
    <p><span class="supplementalTag">Textbook example · O’Neil Example 2.5</span></p>
    <p>Solve</p><div class="eq">\\[y''+2y'+3y=0.\\]</div>
    <p><b>Step 1 — characteristic equation.</b></p><div class="eq">\\[r^2+2r+3=0.\\]</div>
    <p><b>Step 2 — use the quadratic formula and simplify the complex square root.</b></p><div class="eq">\\[r=\\frac{-2\\pm\\sqrt{2^2-4(1)(3)}}{2}=\\frac{-2\\pm\\sqrt{-8}}2.\\]</div><p>Since \\(\\sqrt{-8}=2\\sqrt2\,i\\),</p><div class="eq">\\[r=-1\\pm\\sqrt2\,i.\\]</div>
    <p><b>Step 3 — translate the conjugate pair to a real basis.</b> Here \\(\\alpha=-1\\) and \\(\\beta=\\sqrt2\\). Euler's formula turns \\(e^{(\\alpha\\pm i\\beta)x}\\) into the real pair \\(e^{\\alpha x}\\cos(\\beta x)\\), \\(e^{\\alpha x}\\sin(\\beta x)\\).</p>
    <div class="whybox"><div class="eq">\\[\\boxed{y=e^{-x}[c_1\\cos(\\sqrt2x)+c_2\\sin(\\sqrt2x)]}.\\]</div></div>
    <p>The factor \\(e^{-x}\\) supplies decay; \\(\\sqrt2\\) is the angular oscillation rate.</p>`);

  setTeach(3,"Worked example: third order with a repeated root",`
    <p><span class="supplementalTag">Syllabus-required extension · nth-order generalization</span></p>
    <p>Solve</p><div class="eq">\\[y'''-3y'+2y=0.\\]</div>
    <p><b>Step 1 — characteristic polynomial.</b></p><div class="eq">\\[P(r)=r^3-3r+2.\\]</div>
    <p><b>Step 2 — find one root and factor without a jump.</b> Testing \\(r=1\\) gives \\(1-3+2=0\\), so the factor theorem says \\(r-1\\) divides \\(P(r)\\). Dividing/factoring the remainder gives</p><div class="eq">\\[r^3-3r+2=(r-1)(r^2+r-2)=(r-1)(r-1)(r+2).\\]</div><p>Thus \\(r=1\\) has multiplicity two and \\(r=-2\\) is simple.</p>
    <p><b>Step 3 — translate multiplicity into basis functions.</b> The double root contributes \\(e^x\\) and \\(xe^x\\); the simple root contributes \\(e^{-2x}\\).</p>
    <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^x+c_2xe^x+c_3e^{-2x}=(c_1+c_2x)e^x+c_3e^{-2x}}.\\]</div></div><p>There are three independent directions and therefore three arbitrary constants, matching the third order.</p>`);

  setTeach(3,"Worked example: fourth order with two conjugate pairs",`
    <p><span class="supplementalTag">Syllabus-required extension · nth-order generalization</span></p>
    <p>Solve</p><div class="eq">\\[y^{(4)}+5y''+4y=0.\\]</div>
    <p><b>Step 1 — characteristic equation.</b></p><div class="eq">\\[r^4+5r^2+4=0.\\]</div>
    <p><b>Step 2 — reduce the quartic to a quadratic.</b> Let \\(z=r^2\\). Then</p><div class="eq">\\[z^2+5z+4=(z+1)(z+4)=0.\\]</div><p>So \\(z=-1\\) or \\(z=-4\\).</p>
    <p><b>Step 3 — return to r.</b></p><div class="eq">\\[r^2=-1\\Rightarrow r=\\pm i,\\qquad r^2=-4\\Rightarrow r=\\pm2i.\\]</div>
    <p><b>Step 4 — translate each conjugate pair.</b> The pair \\(\\pm i\\) gives \\(\\cos x,\\sin x\\); the pair \\(\\pm2i\\) gives \\(\\cos2x,\\sin2x\\).</p>
    <div class="whybox"><div class="eq">\\[\\boxed{y=c_1\\cos x+c_2\\sin x+c_3\\cos2x+c_4\\sin2x}.\\]</div></div><p>Four independent basis functions match the fourth order.</p>`);

  const l3RootDetails={
    1:`\\[r^2-r-6=(r-3)(r+2)=0\\Rightarrow r=3,-2.\\]`,
    2:`\\[r=\\frac{2\\pm\\sqrt{4-40}}2=\\frac{2\\pm6i}{2}=1\\pm3i.\\]`,
    3:`\\[r^2+6r+9=(r+3)^2=0\\Rightarrow r=-3\\text{ twice}.\\]`,
    4:`\\[r^2-3r=r(r-3)=0\\Rightarrow r=0,3.\\]`,
    5:`\\[r=\\frac{-10\\pm\\sqrt{100-104}}2=\\frac{-10\\pm2i}{2}=-5\\pm i.\\]`,
    6:`\\[r^2+6r-40=(r-4)(r+10)=0\\Rightarrow r=4,-10.\\]`,
    7:`\\[r=\\frac{-3\\pm\\sqrt{9-72}}2=\\frac{-3\\pm3\\sqrt7\,i}{2}.\\]`,
    8:`\\[r^2+16r+64=(r+8)^2=0\\Rightarrow r=-8\\text{ twice}.\\]`,
    9:`\\[r^2-14r+49=(r-7)^2=0\\Rightarrow r=7\\text{ twice}.\\]`,
    10:`\\[r=\\frac{6\\pm\\sqrt{36-28}}2=\\frac{6\\pm2\\sqrt2}{2}=3\\pm\\sqrt2.\\]`
  };
  Object.entries(l3RootDetails).forEach(([n,eq])=>beforeWhy(3,`O’Neil §2.2 Problem ${n}`,`<div class="beginner"><b>Root arithmetic made explicit:</b><div class="eq">${eq}</div></div>`));
  beforeWhy(3,"O’Neil §2.2 Problem 18",`<p><b>Derivative at the shifted initial point.</b> With \\(A=0\\), write \\(z=x-2\\) and \\(\\beta=\\sqrt{23}/2\\). Then \\(y=Be^{5z/2}\\sin(\\beta z)\\), so</p><div class="eq">\\[y'=Be^{5z/2}[\\tfrac52\\sin(\\beta z)+\\beta\\cos(\\beta z)].\\]</div><p>At \\(z=0\\), this becomes \\(y'(2)=B\\beta=B\\sqrt{23}/2\\), which is the equation used for \\(B\\).</p>`);
  beforeWhy(3,"O’Neil §2.2 Problem 20",`<p><b>Solve the 2×2 system explicitly.</b> From \\(A+B=7\\), \\(B=7-A\\). Substitute into \\(r_+A+r_-B=1\\):</p><div class="eq">\\[(r_+-r_-)A+7r_-=1.\\]</div><p>Since \\(r_+-r_-=\\sqrt5\\) and \\(r_-=(-1-\\sqrt5)/2\\),</p><div class="eq">\\[\\sqrt5 A=1-7r_-=\\frac{9+7\\sqrt5}{2},\\]</div><p>so \\(A=7/2+9\\sqrt5/10\\), and \\(B=7-A=7/2-9\\sqrt5/10\\).</p>`);

  // Lesson 4 textbook examples: show every derivative, coefficient equation, and constant solve.
  setTeach(4,"Example 2.7: y'' + 4y = 7e^{3x}",`
    <p><span class="supplementalTag">Textbook example · O’Neil §2.3.2</span></p><div class="eq">\\[y''+4y=7e^{3x}.\\]</div>
    <p><b>1. Homogeneous response.</b> \\(r^2+4=0\\Rightarrow r=\\pm2i\\), so \\(y_h=c_1\\cos2x+c_2\\sin2x\\).</p>
    <p><b>2. Choose the particular trial and check overlap.</b> The forcing is \\(e^{3x}\\), so try \\(y_p=Ae^{3x}\\). The number \\(3\\) is not a characteristic root, so no extra factor of \\(x\\) is needed.</p>
    <p><b>3. Differentiate every term.</b></p><div class="eq">\\[y_p'=3Ae^{3x},\\qquad y_p''=9Ae^{3x}.\\]</div>
    <p><b>4. Substitute and solve the coefficient equation.</b></p><div class="eq">\\[9Ae^{3x}+4Ae^{3x}=7e^{3x}.\\]</div><p>Divide by the nonzero \\(e^{3x}\\): \\(13A=7\\), so \\(A=7/13\\).</p>
    <div class="whybox"><div class="eq">\\[\\boxed{y=c_1\\cos2x+c_2\\sin2x+\\frac7{13}e^{3x}}.\\]</div></div>`);

  setTeach(4,"Example 2.8: why every polynomial coefficient is needed",`
    <p><span class="supplementalTag">Textbook example · O’Neil §2.3.2</span></p><div class="eq">\\[y''+3y'+2y=-2x^2+3.\\]</div>
    <p><b>1. Homogeneous response.</b> \\(r^2+3r+2=(r+1)(r+2)\\), hence \\(y_h=c_1e^{-x}+c_2e^{-2x}\\).</p>
    <p><b>2. Choose the full quadratic trial.</b> Differentiating a quadratic produces linear and constant terms, so even though the forcing has no visible \\(x\\)-term we need</p><div class="eq">\\[y_p=Ax^2+Bx+C.\\]</div>
    <p><b>3. Differentiate.</b></p><div class="eq">\\[y_p'=2Ax+B,\\qquad y_p''=2A.\\]</div>
    <p><b>4. Substitute and collect like powers.</b></p><div class="eq">\\[2A+3(2Ax+B)+2(Ax^2+Bx+C)\\]</div><div class="eq">\\[=2Ax^2+(6A+2B)x+(2A+3B+2C).\\]</div>
    <p>Match this with \\(-2x^2+0x+3\\):</p><div class="eq">\\[2A=-2,\\qquad6A+2B=0,\\qquad2A+3B+2C=3.\\]</div>
    <p>First \\(A=-1\\). Then \\(-6+2B=0\\Rightarrow B=3\\). Finally \\(-2+9+2C=3\\Rightarrow2C=-4\\Rightarrow C=-2\\).</p>
    <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^{-x}+c_2e^{-2x}-x^2+3x-2}.\\]</div></div>`);

  setTeach(4,"Example 2.9: sine and cosine travel together",`
    <p><span class="supplementalTag">Textbook example · O’Neil §2.3.2</span></p><div class="eq">\\[y''+y'+3y=5\\sin2x.\\]</div>
    <p><b>1. Homogeneous response.</b> \\(r^2+r+3=0\\Rightarrow r=-1/2\\pm i\\sqrt{11}/2\\), so</p><div class="eq">\\[y_h=e^{-x/2}[c_1\\cos(\\tfrac{\\sqrt{11}}2x)+c_2\\sin(\\tfrac{\\sqrt{11}}2x)].\\]</div>
    <p><b>2. Trial choice.</b> Differentiating sine creates cosine and vice versa, so use the complete pair</p><div class="eq">\\[y_p=A\\cos2x+B\\sin2x.\\]</div>
    <p><b>3. Differentiate.</b></p><div class="eq">\\[y_p'=-2A\\sin2x+2B\\cos2x,\\]</div><div class="eq">\\[y_p''=-4A\\cos2x-4B\\sin2x.\\]</div>
    <p><b>4. Substitute and collect coefficients.</b> The cosine coefficient is \\(-4A+2B+3A=-A+2B\\); the sine coefficient is \\(-4B-2A+3B=-2A-B\\). Therefore</p><div class="eq">\\[-A+2B=0,\\qquad -2A-B=5.\\]</div>
    <p>From the first equation \\(A=2B\\). Substitute into the second: \\(-4B-B=5\\Rightarrow B=-1\\), hence \\(A=-2\\).</p>
    <div class="whybox"><div class="eq">\\[\\boxed{y=y_h-2\\cos2x-\\sin2x}.\\]</div></div>`);

  setTeach(4,"Example 2.10: use superposition to split unlike forcing",`
    <p><span class="supplementalTag">Textbook example · O’Neil §2.3.2</span></p><div class="eq">\\[y''+2y'-3y=4x^2-x+11e^{2x}.\\]</div>
    <p><b>1. Homogeneous response.</b> \\(r^2+2r-3=(r-1)(r+3)\\), so \\(y_h=c_1e^x+c_2e^{-3x}\\).</p>
    <p><b>2. Split the forcing by linearity.</b> Write \\(y_p=y_{p,\\text{poly}}+y_{p,\\text{exp}}\\).</p>
    <p><b>3. Exponential branch.</b> Let \\(y_{p,\\text{exp}}=Ae^{2x}\\). Then \\(y'=2Ae^{2x}\\), \\(y''=4Ae^{2x}\\), so</p><div class="eq">\\[(4A+4A-3A)e^{2x}=5Ae^{2x}=11e^{2x}.\\]</div><p>Hence \\(A=11/5\\).</p>
    <p><b>4. Polynomial branch.</b> Let \\(y_{p,\\text{poly}}=Bx^2+Cx+D\\). Then \\(y'=2Bx+C\\), \\(y''=2B\\). Substitution gives</p><div class="eq">\\[-3Bx^2+(4B-3C)x+(2B+2C-3D)=4x^2-x.\\]</div><p>Match coefficients:</p><div class="eq">\\[-3B=4,\\quad4B-3C=-1,\\quad2B+2C-3D=0.\\]</div><p>Thus \\(B=-4/3\\). The second equation becomes \\(-16/3-3C=-1\\), so \\(C=-13/9\\). The constant equation becomes \\(-8/3-26/9-3D=0\\), hence \\(D=-50/27\\).</p>
    <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^x+c_2e^{-3x}+\\frac{11}{5}e^{2x}-\\frac43x^2-\\frac{13}{9}x-\\frac{50}{27}}.\\]</div></div>`);

  setTeach(4,"O’Neil Example 2.11: one x fixes a simple overlap",`
    <p><span class="supplementalTag">Textbook example · O’Neil §2.3.2</span></p><div class="eq">\\[y''+5y'+4y=11e^{-x}.\\]</div>
    <p><b>1. Find the overlap.</b> The characteristic polynomial is \\((r+1)(r+4)\\), so \\(e^{-x}\\) is already a homogeneous mode. A trial \\(Ae^{-x}\\) would therefore give zero under the differential operator.</p>
    <p><b>2. Move to an independent trial.</b> Because \\(r=-1\\) is a simple root, multiply by one power of \\(x\\):</p><div class="eq">\\[y_p=Axe^{-x}.\\]</div>
    <p><b>3. Differentiate fully.</b></p><div class="eq">\\[y_p'=A(1-x)e^{-x},\\qquad y_p''=A(x-2)e^{-x}.\\]</div>
    <p><b>4. Substitute.</b></p><div class="eq">\\[A[(x-2)+5(1-x)+4x]e^{-x}=3Ae^{-x}.\\]</div><p>Thus \\(3A=11\\Rightarrow A=11/3\\).</p>
    <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^{-x}+c_2e^{-4x}+\\frac{11}{3}xe^{-x}}.\\]</div></div>`);

  setTeach(4,"O’Neil Example 2.12: a double overlap needs x²",`
    <p><span class="supplementalTag">Textbook example · O’Neil §2.3.2</span></p><div class="eq">\\[y''-4y'+4y=3e^{2x}.\\]</div>
    <p><b>1. Identify the multiplicity.</b> The characteristic polynomial is \\((r-2)^2\\). Therefore the homogeneous basis already contains \\(e^{2x}\\) and \\(xe^{2x}\\).</p>
    <p><b>2. Choose the first non-overlapping trial.</b> Multiplying by one \\(x\\) still overlaps, so multiply by \\(x^2\\):</p><div class="eq">\\[y_p=Ax^2e^{2x}.\\]</div>
    <p><b>3. Differentiate with the product rule.</b></p><div class="eq">\\[y_p'=A(2x+2x^2)e^{2x},\\]</div><div class="eq">\\[y_p''=A(2+8x+4x^2)e^{2x}.\\]</div>
    <p><b>4. Substitute and let the cancellations happen.</b></p><div class="eq">\\[A[(2+8x+4x^2)-4(2x+2x^2)+4x^2]e^{2x}=2Ae^{2x}.\\]</div><p>Set this equal to \\(3e^{2x}\\): \\(2A=3\\Rightarrow A=3/2\\).</p>
    <div class="whybox"><div class="eq">\\[\\boxed{y=c_1e^{2x}+c_2xe^{2x}+\\frac32x^2e^{2x}}.\\]</div></div>`);

  const l4Extra={
    7:`<p><b>Coefficient solve:</b> matching \\(x^2,x,1\\) gives \\(-2A=2\\Rightarrow A=-1\\); then \\(-2A-2B=0\\Rightarrow2-2B=0\\Rightarrow B=1\\); finally \\(2A-B-2C=5\\Rightarrow-2-1-2C=5\\Rightarrow C=-4\\).</p>`,
    8:`<p><b>Substitution without a jump:</b> for \\(y_p=Ae^{2x}\\), \\(y_p'=2Ae^{2x}\\) and \\(y_p''=4Ae^{2x}\\). Hence</p><div class="eq">\\[y_p''-y_p'-6y_p=(4A-2A-6A)e^{2x}=-4Ae^{2x}.\\]</div><p>Matching \\(8e^{2x}\\) gives \\(-4A=8\\Rightarrow A=-2\\).</p>`,
    9:`<p><b>Coefficient solve:</b> \\(10A=20\\Rightarrow A=2\\). Then \\(-4A+10B=2\\Rightarrow-8+10B=2\\Rightarrow B=1\\). Finally \\(2A-2B+10C=-8\\Rightarrow4-2+10C=-8\\Rightarrow C=-1\\).</p>`,
    10:`<p><b>Substitution without a jump:</b> for \\(y_p=Ae^{2x}\\), \\(y_p'=2Ae^{2x}\\), \\(y_p''=4Ae^{2x}\\). Therefore</p><div class="eq">\\[y_p''-4y_p'+5y_p=(4A-8A+5A)e^{2x}=Ae^{2x}.\\]</div><p>Matching \\(21e^{2x}\\) gives \\(A=21\\).</p>`,
    11:`<p><b>Substitution without a jump:</b> for \\(y_p=Ae^x\\), \\(y_p'=Ae^x\\), \\(y_p''=Ae^x\\). Thus</p><div class="eq">\\[y_p''-6y_p'+8y_p=(1-6+8)Ae^x=3Ae^x.\\]</div><p>Matching \\(3e^x\\) gives \\(A=1\\).</p>`,
    12:`<p><b>Derivative substitution:</b> \\(y_p'=-3A\\sin3x+3B\\cos3x\\) and \\(y_p''=-9A\\cos3x-9B\\sin3x\\). In \\(y''+6y'+9y\\), the \\(A\\cos\\) and \\(B\\sin\\) pieces cancel, leaving \\(18B\\cos3x-18A\\sin3x\\). Matching \\(9\\cos3x+0\\sin3x\\) gives \\(B=1/2,A=0\\).</p>`,
    13:`<p><b>Derivative substitution:</b> \\(y_p'=-A\\sin x+B\\cos x\\), \\(y_p''=-A\\cos x-B\\sin x\\). Therefore the cosine coefficient is \\(A-3B\\) and the sine coefficient is \\(3A+B\\). From \\(A=3B\\) and \\(3A+B=10\\), we get \\(10B=10\\Rightarrow B=1,A=3\\).</p>`,
    14:`<p><b>Polynomial branch in full:</b> for \\(Ax^2+Bx+C\\), \\(y''-4y=2A-4Ax^2-4Bx-4C\\). Match \\(8x^2+0x+0\\): \\(-4A=8\\Rightarrow A=-2\\), \\(-4B=0\\Rightarrow B=0\\), and \\(2A-4C=0\\Rightarrow-4-4C=0\\Rightarrow C=-1\\). For \\(De^{3x}\\), \\((9-4)D=2\\Rightarrow D=2/5\\).</p>`,
    15:`<p><b>Each exponential coefficient:</b> for \\(Ae^{2x}\\), the operator multiplier is \\(2^2-4(2)+13=9\\), so \\(9A=3\\Rightarrow A=1/3\\). For \\(Be^{3x}\\), it is \\(3^2-4(3)+13=10\\), so \\(10B=-5\\Rightarrow B=-1/2\\).</p>`,
    16:`<p><b>Polynomial branch:</b> \\(y_p=Ax+B\\Rightarrow y_p'=A,y_p''=0\\). Thus \\(0-2A+(Ax+B)=Ax+(B-2A)\\). Match \\(3x\\): \\(A=3\\), \\(B-6=0\\Rightarrow B=6\\).</p><p><b>Trig branch:</b> with \\(C\\cos3x+D\\sin3x\\), substitution yields cosine coefficient \\(-8C-6D\\) and sine coefficient \\(6C-8D\\). Set these equal to \\(0\\) and \\(25\\): from \\(4C+3D=0\\), \\(C=-3D/4\\); substitute into \\(6C-8D=25\\) to get \\(-25D/2=25\\Rightarrow D=-2\\), hence \\(C=3/2\\).</p>`,
    17:`<p><b>Particular coefficients:</b> for \\(Axe^{2x}\\), \\(y'=A(1+2x)e^{2x}\\), \\(y''=A(4+4x)e^{2x}\\), so \\(y''-4y=4Ae^{2x}\\). Match \\(-7e^{2x}\\): \\(A=-7/4\\). For \\(Bx+C\\), \\(y''-4y=-4Bx-4C\\), so \\(B=-1/4,C=0\\).</p><p><b>Initial constants:</b> \\(y(0)=c_1+c_2=1\\). Differentiating the complete solution gives \\(y'(0)=2c_1-2c_2-7/4-1/4=3\\), hence \\(c_1-c_2=5/2\\). Adding with \\(c_1+c_2=1\\) gives \\(2c_1=7/2\\Rightarrow c_1=7/4\\), then \\(c_2=-3/4\\).</p>`,
    18:`<p><b>Particular coefficients:</b> \\(y_p=A+B\\cos x+C\\sin x\\) gives \\(y_p''+4y_p=4A+3B\\cos x+3C\\sin x\\). Match \\(8+34\\cos x\\): \\(A=2,B=34/3,C=0\\).</p><p><b>Initial constants:</b> \\(y(0)=c_1+2+34/3=3\\Rightarrow c_1=-31/3\\). Also \\(y'= -2c_1\\sin2x+2c_2\\cos2x-(34/3)\\sin x\\), so \\(y'(0)=2c_2=2\\Rightarrow c_2=1\\).</p>`,
    19:`<p><b>Particular coefficients:</b> for \\(Ae^{-x}\\), the operator multiplier is \\(1-8+12=5\\), so \\(A=1/5\\). For constant \\(B\\), only \\(12B\\) remains, so \\(B=7/12\\).</p><p><b>Initial constants:</b> at zero, \\(c_1+c_2+1/5+7/12=1\\Rightarrow c_1+c_2=13/60\\). The derivative condition is \\(-2c_1-6c_2-1/5=0\\Rightarrow c_1+3c_2=-1/10\\). Subtracting the first equation gives \\(2c_2=-19/60\\Rightarrow c_2=-19/120\\), then \\(c_1=3/8\\).</p>`,
    20:`<p><b>Trial derivatives:</b> writing \\(y_p=e^{2x}(A\\cos x+B\\sin x)\\),</p><div class="eq">\\[y_p'=e^{2x}[(2A+B)\\cos x+(2B-A)\\sin x],\\]</div><div class="eq">\\[y_p''=e^{2x}[(3A+4B)\\cos x+(3B-4A)\\sin x].\\]</div><p>Therefore</p><div class="eq">\\[y_p''-3y_p'=e^{2x}[(-3A+B)\\cos x+(-A-3B)\\sin x].\\]</div><p>Match \\(0\\cos x+2\\sin x\\): \\(-3A+B=0\\), \\(-A-3B=2\\). The first gives \\(B=3A\\); substituting into the second gives \\(-10A=2\\Rightarrow A=-1/5\\), hence \\(B=-3/5\\).</p>`,
    21:`<p><b>Particular coefficients:</b> for \\(Ae^{-x}\\), the multiplier is \\(1+2-8=-5\\), so \\(-5A=10\\Rightarrow A=-2\\). For \\(Be^{2x}\\), it is \\(4-4-8=-8\\), so \\(-8B=8\\Rightarrow B=-1\\).</p><p><b>Initial constants:</b> \\(c_1+c_2-2-1=1\\Rightarrow c_1+c_2=4\\). Derivative at zero gives \\(4c_1-2c_2+2-2=4\\Rightarrow2c_1-c_2=2\\). Substituting \\(c_2=4-c_1\\) gives \\(3c_1=6\\Rightarrow c_1=2,c_2=2\\).</p>`,
    22:`<p><b>Initial constants:</b> at \\(x=1\\), the shifted sine is zero and cosine is one, so \\(4=1+A\\Rightarrow A=3\\). Differentiate the shifted homogeneous factor: at \\(x=1\\), \\(y'=A/2+B\\sqrt3/2\\). Thus \\(3/2+B\\sqrt3/2=-2\\Rightarrow B\\sqrt3/2=-7/2\\Rightarrow B=-7/\\sqrt3\\).</p>`,
    23:`<p><b>Particular coefficients:</b> after rewriting, use \\(y_p=A+B\\cos2x+C\\sin2x\\). Then \\(y_p''-y_p=-A-5B\\cos2x-5C\\sin2x\\). Match \\(5/2-(5/2)\\cos2x\\): \\(A=-5/2,B=1/2,C=0\\), so \\(y_p=-5/2+(1/2)\\cos2x=-2-\\sin^2x\\).</p><p><b>Initial constants:</b> \\(y(0)=c_1+c_2-2=2\\Rightarrow c_1+c_2=4\\). Since \\(y_p'(0)=0\\), \\(y'(0)=c_1-c_2=-4\\). Adding gives \\(2c_1=0\\Rightarrow c_1=0\\), hence \\(c_2=4\\).</p>`
  };
  Object.entries(l4Extra).forEach(([n,html])=>beforeWhy(4,`O’Neil §2.3 Problem ${n}`,html));

  // Lesson 5: make the algebraic system and non-obvious integrations visible rather than merely quoting results.
  setTeach(5,"Solve the system and watch the Wronskian appear",`
    <p>We have the two equations</p><div class="eq">\\[y_1u_1'+y_2u_2'=0,\\qquad y_1'u_1'+y_2'u_2'=f.\\]</div>
    <p><b>Solve for \\(u_1'\\) by elimination.</b> Multiply the first equation by \\(y_2'\\) and the second by \\(y_2\\):</p><div class="eq">\\[y_1y_2'u_1'+y_2y_2'u_2'=0,\\]</div><div class="eq">\\[y_1'y_2u_1'+y_2'y_2u_2'=fy_2.\\]</div><p>Subtract the second equation from the first. The \\(u_2'\\) terms cancel:</p><div class="eq">\\[(y_1y_2'-y_1'y_2)u_1'=-fy_2.\\]</div><p>The bracket is the Wronskian \\(W\\), so</p><div class="eq">\\[u_1'=-\\frac{y_2f}{W}.\\]</div>
    <p><b>Solve for \\(u_2'\\) the same way.</b> Multiply the second equation by \\(y_1\\) and the first by \\(y_1'\\), then subtract:</p><div class="eq">\\[(y_1y_2'-y_1'y_2)u_2'=fy_1.\\]</div><p>Hence</p><div class="whybox"><div class="eq">\\[\\boxed{u_1'=-\\frac{y_2f}{W},\\qquad u_2'=\\frac{y_1f}{W}}.\\]</div></div>
    <p>The Wronskian is downstairs because it is the determinant of this 2×2 system. Independence of \\(y_1,y_2\\) guarantees \\(W\\neq0\\) on the regular interval, so division is legitimate.</p>`);
  setTeach(5,"Compute u₂′ and integrate it",`
    <p>Similarly,</p><div class="eq">\\[u_2'=\\frac{\\cos2x\\,\\sec x}{2}.\\]</div>
    <p>Use \\(\\cos2x=2\\cos^2x-1\\):</p><div class="eq">\\[u_2'=\\frac{2\\cos^2x-1}{2\\cos x}=\\cos x-\\tfrac12\\sec x.\\]</div>
    <p>Integrate term by term. The first term gives \\(\\int\\cos x\,dx=\\sin x\\). For the second, the identity</p><div class="eq">\\[\\frac{d}{dx}\\ln|\\sec x+\\tan x|=\\frac{\\sec x\\tan x+\\sec^2x}{\\sec x+\\tan x}=\\sec x\\]</div><p>shows why \\(\\int\\sec x\,dx=\\ln|\\sec x+\\tan x|\\). Therefore</p><div class="eq">\\[u_2=\\sin x-\\tfrac12\\ln|\\sec x+\\tan x|.\\]</div><div class="beginner">The integration constant is omitted because adding a constant to \\(u_2\\) only adds a multiple of the homogeneous solution \\(y_2\\), which is already represented in \\(y_h\\).</div>`);

  beforeWhy(5,"O’Neil §2.3 Problem 2",`<p><b>Show both parameter integrations.</b> For \\(u_1'=-e^{-x}\\cos(x+3)\\), use the exponential–cosine formula with \\(a=-1,b=1\\):</p><div class="eq">\\[\\int e^{-x}\\cos(x+3)dx=\\frac{e^{-x}}2[-\\cos(x+3)+\\sin(x+3)],\\]</div><p>so the leading minus sign gives \\(u_1=\\tfrac12e^{-x}[\\cos(x+3)-\\sin(x+3)]\\). For \\(u_2'\\), use \\(a=-3,b=1\\):</p><div class="eq">\\[u_2=\\frac{e^{-3x}}{10}[-3\\cos(x+3)+\\sin(x+3)].\\]</div>`);
  beforeWhy(5,"O’Neil §2.3 Problem 4",`<p><b>Expand the two integrals before evaluating them.</b></p><div class="eq">\\[u_1'=\\tfrac14e^{-3x}-\\tfrac14e^{-3x}\\cos2x.\\]</div><p>The first integral is \\(-e^{-3x}/12\\). The cosine formula gives</p><div class="eq">\\[-\\tfrac14\\int e^{-3x}\\cos2x\,dx=\\frac{e^{-3x}}{52}(3\\cos2x-2\\sin2x).\\]</div><p>Combining these terms over denominator 156 gives exactly \\(u_1=e^{-3x}[-13+9\\cos2x-6\\sin2x]/156\\).</p><div class="eq">\\[u_2'=-\\tfrac14e^x+\\tfrac14e^x\\cos2x.\\]</div><p>Thus \\(u_2=-e^x/4+e^x(\\cos2x+2\\sin2x)/20=e^x[-5+\\cos2x+2\\sin2x]/20\\).</p>`);
  beforeWhy(5,"O’Neil §2.3 Problem 5",`<p><b>Do not hide the integration-by-parts step.</b> After \\(t=e^{-x}\\),</p><div class="eq">\\[u_2=-\\int t\\cos t\,dt.\\]</div><p>Use integration by parts with \\(u=t\\), \\(dv=\\cos t\,dt\\), so \\(du=dt\\), \\(v=\\sin t\\):</p><div class="eq">\\[\\int t\\cos t\,dt=t\\sin t-\\int\\sin t\,dt=t\\sin t+\\cos t.\\]</div><p>Therefore \\(u_2=-t\\sin t-\\cos t\\), and replacing \\(t=e^{-x}\\) gives the displayed expression.</p>`);
  beforeWhy(5,"O’Neil §2.3 Problem 6",`<p><b>Expand the squared sine first.</b></p><div class="eq">\\[u_1'=-4e^{-2x}+4e^{-2x}\\cos8x.\\]</div><p>Integrating the first term gives \\(2e^{-2x}\\). For the second, \\(a=-2,b=8\\) and \\(a^2+b^2=68\\):</p><div class="eq">\\[4\\int e^{-2x}\\cos8x\,dx=\\frac{e^{-2x}}{17}[-2\\cos8x+8\\sin8x].\\]</div><p>Hence the stated \\(u_1\\).</p><div class="eq">\\[u_2'=4e^{-3x}-4e^{-3x}\\cos8x.\\]</div><p>The first integral is \\(-4e^{-3x}/3\\); for the second \\(a=-3,b=8\\), denominator 73, giving</p><div class="eq">\\[-4\\int e^{-3x}\\cos8x\,dx=\\frac{e^{-3x}}{73}[12\\cos8x-32\\sin8x].\\]</div><p>Adding the two pieces gives the displayed \\(u_2\\).</p>`);

  // Lesson 6: make every numbered Euler example explain the root translation and verify the non-obvious basis.
  setTeach(6,"O’Neil Example 2.14",`
    <p><span class="supplementalTag">Textbook example · O’Neil Chapter 2</span></p><p>Solve for \\(x>0\\):</p><div class="eq">\\[x^2y''+2xy'-6y=0.\\]</div>
    <p><b>Step 1 — use the Euler power trial.</b> Let \\(y=x^r\\). Then \\(y'=rx^{r-1}\\) and \\(y''=r(r-1)x^{r-2}\\).</p>
    <p><b>Step 2 — substitute.</b></p><div class="eq">\\[r(r-1)x^r+2rx^r-6x^r=0.\\]</div><p>Since \\(x^r\\neq0\\) for \\(x>0\\),</p><div class="eq">\\[r(r-1)+2r-6=r^2+r-6=(r-2)(r+3)=0.\\]</div>
    <p><b>Step 3 — translate the roots.</b> \\(r=2\\) gives \\(x^2\\); \\(r=-3\\) gives \\(x^{-3}\\).</p>
    <div class="whybox"><div class="eq">\\[\\boxed{y=c_1x^2+c_2x^{-3}}.\\]</div></div><p>A quick substitution of each power returns zero, and their different exponents make them independent on \\(x>0\\).</p>`);

  setTeach(6,"O’Neil Example 2.15",`
    <p><span class="supplementalTag">Textbook example · O’Neil Chapter 2</span></p><p>Solve for \\(x>0\\):</p><div class="eq">\\[x^2y''-5xy'+9y=0.\\]</div>
    <p><b>Step 1 — substitute \\(y=x^r\\).</b></p><div class="eq">\\[r(r-1)-5r+9=r^2-6r+9=(r-3)^2=0.\\]</div><p>The root \\(r=3\\) is repeated.</p>
    <p><b>Step 2 — create the missing independent solution.</b> The first power is \\(y_1=x^3\\). Repeating \\(x^3\\) would not add a second direction; the Euler repeated-root companion is \\(y_2=x^3\\ln x\\).</p>
    <p><b>Step 3 — verify the logarithmic companion.</b></p><div class="eq">\\[y_2'=x^2(3\\ln x+1),\\qquad y_2''=x(6\\ln x+5).\\]</div><p>Then</p><div class="eq">\\[x^2y_2''-5xy_2'+9y_2=x^3[(6-15+9)\\ln x+(5-5)]=0.\\]</div>
    <p><b>Step 4 — verify independence.</b></p><div class="eq">\\[W=x^3\,x^2(3\\ln x+1)-(3x^2)(x^3\\ln x)=x^5\\neq0\\quad(x>0).\\]</div>
    <div class="whybox"><div class="eq">\\[\\boxed{y=x^3(c_1+c_2\\ln x)}.\\]</div></div>`);

  setTeach(6,"O’Neil Example 2.16",`
    <p><span class="supplementalTag">Textbook example · O’Neil Chapter 2</span></p><p>Solve for \\(x>0\\):</p><div class="eq">\\[x^2y''+3xy'+10y=0.\\]</div>
    <p><b>Step 1 — Euler characteristic equation.</b></p><div class="eq">\\[r(r-1)+3r+10=r^2+2r+10=0.\\]</div>
    <p><b>Step 2 — quadratic formula.</b></p><div class="eq">\\[r=\\frac{-2\\pm\\sqrt{4-40}}2=\\frac{-2\\pm6i}{2}=-1\\pm3i.\\]</div>
    <p><b>Step 3 — explain the logarithmic oscillation.</b> For \\(x>0\\),</p><div class="eq">\\[x^{-1+3i}=x^{-1}e^{3i\\ln x}=x^{-1}[\\cos(3\\ln x)+i\\sin(3\\ln x)].\\]</div><p>The real and imaginary parts give two real independent solutions.</p>
    <div class="whybox"><div class="eq">\\[\\boxed{y=x^{-1}[c_1\\cos(3\\ln x)+c_2\\sin(3\\ln x)]}.\\]</div></div>`);

  replaceIn(6,"Example 2.17 — complex roots plus initial data","html",
    `<p>The characteristic equation \\(r^2-6r+10=0\\) has roots \\(3\\pm i\\), so</p>`,
    `<p><b>Characteristic equation without a jump.</b> Substituting \\(y=x^r\\) gives</p><div class="eq">\\[r(r-1)-5r+10=r^2-6r+10=0.\\]</div><p>Using the quadratic formula,</p><div class="eq">\\[r=\\frac{6\\pm\\sqrt{36-40}}2=\\frac{6\\pm2i}{2}=3\\pm i.\\]</div><p>Therefore</p>`
  );

  const l6RootDetails={
    1:`\\[r^2+r-6=(r-2)(r+3)=0\\Rightarrow r=2,-3.\\]`,
    2:`\\[r^2+2r+1=(r+1)^2=0\\Rightarrow r=-1\\text{ twice}.\\]`,
    3:`\\[r^2+4=0\\Rightarrow r^2=-4\\Rightarrow r=\\pm2i.\\]`,
    4:`\\[r^2-4=(r-2)(r+2)=0\\Rightarrow r=2,-2.\\]`,
    5:`\\[r^2-16=(r-4)(r+4)=0\\Rightarrow r=4,-4.\\]`,
    6:`\\[r=\\frac{-2\\pm\\sqrt{4-40}}2=-1\\pm3i.\\]`,
    7:`\\[r^2+5r+6=(r+2)(r+3)=0\\Rightarrow r=-2,-3.\\]`,
    8:`\\[r=\\frac{6\\pm\\sqrt{36-232}}2=\\frac{6\\pm14i}{2}=3\\pm7i.\\]`,
    9:`\\[r^2+24r+144=(r+12)^2=0\\Rightarrow r=-12\\text{ twice}.\\]`,
    10:`\\[r^2-12r+35=(r-5)(r-7)=0\\Rightarrow r=5,7.\\]`
  };
  Object.entries(l6RootDetails).forEach(([n,eq])=>beforeWhy(6,`O’Neil §2.4 Problem ${n}`,`<div class="beginner"><b>Root arithmetic made explicit:</b><div class="eq">${eq}</div><p>Now translate the root case: a distinct real root \\(r\\) gives \\(x^r\\); a repeated root gives \\(x^r\\) and \\(x^r\\ln x\\); a pair \\(a\\pm ib\\) gives \\(x^a\\cos(b\\ln x)\\) and \\(x^a\\sin(b\\ln x)\\).</p></div>`));
  setTeach(6,"Off resonance: ω ≠ ω₀",`
    <p>If \\(\\omega\\neq\\omega_0\\), try \\(y_p=C\\cos(\\omega t)\\) because differentiating cosine twice returns the same frequency. Then</p><div class="eq">\\[y_p'=-C\\omega\\sin(\\omega t),\\qquad y_p''=-C\\omega^2\\cos(\\omega t).\\]</div>
    <p>Substitute into \\(my''+ky=A\\cos(\\omega t)\\):</p><div class="eq">\\[(-m\\omega^2C+kC)\\cos(\\omega t)=A\\cos(\\omega t).\\]</div><p>Since \\(k=m\\omega_0^2\\),</p><div class="eq">\\[m(\\omega_0^2-\\omega^2)C=A.\\]</div><p>Therefore</p><div class="eq">\\[\\boxed{y_p=\\frac{A}{m(\\omega_0^2-\\omega^2)}\\cos(\\omega t)}.\\]</div><p>The denominator is nonzero precisely because this is the off-resonant case \\(\\omega\\neq\\omega_0\\), so the particular response stays bounded.</p>`);

  setTeach(6,"Exact resonance: ω = ω₀",`
    <p><span class="supplementalTag">Expanded explanation · no skipped reasoning</span></p>
    <p>At \\(\\omega=\\omega_0\\), the ordinary trial \\(C\\cos(\\omega_0t)\\) is already homogeneous, so the differential operator sends it to zero. Lesson 4's overlap rule therefore requires an extra factor of \\(t\\).</p>
    <p>For the normalized equation</p><div class="eq">\\[y''+\\omega_0^2y=\\frac{A}{m}\\cos(\\omega_0t),\\]</div><p>use the convenient resonant trial</p><div class="eq">\\[y_p=K t\\sin(\\omega_0t).\\]</div>
    <p><b>Differentiate every term.</b></p><div class="eq">\\[y_p'=K\\sin(\\omega_0t)+K\\omega_0t\\cos(\\omega_0t),\\]</div><div class="eq">\\[y_p''=2K\\omega_0\\cos(\\omega_0t)-K\\omega_0^2t\\sin(\\omega_0t).\\]</div>
    <p>Now add \\(\\omega_0^2y_p\\). The terms containing \\(t\\sin(\\omega_0t)\\) cancel:</p><div class="eq">\\[y_p''+\\omega_0^2y_p=2K\\omega_0\\cos(\\omega_0t).\\]</div><p>Match the forcing coefficient:</p><div class="eq">\\[2K\\omega_0=\\frac{A}{m}\\Rightarrow K=\\frac{A}{2m\\omega_0}.\\]</div>
    <div class="whybox"><div class="eq">\\[\\boxed{y=c_1\\cos(\\omega_0t)+c_2\\sin(\\omega_0t)+\\frac{A}{2m\\omega_0}t\\sin(\\omega_0t)}.\\]</div><p>The factor \\(t\\) makes the oscillation envelope grow linearly. That is ideal undamped resonance.</p></div>`);

  setTeach(6,"Damping changes the resonance story",`
    <p><span class="supplementalTag">Syllabus-required application · mechanics</span></p>
    <p>For \\(c>0\\), consider</p><div class="eq">\\[my''+cy'+ky=A\\cos(\\omega t).\\]</div><p>A steady sinusoidal response must include both sine and cosine because the damping derivative mixes them:</p><div class="eq">\\[y_p=a\\cos(\\omega t)+b\\sin(\\omega t).\\]</div>
    <p>Differentiate:</p><div class="eq">\\[y_p'=-a\\omega\\sin(\\omega t)+b\\omega\\cos(\\omega t),\\]</div><div class="eq">\\[y_p''=-a\\omega^2\\cos(\\omega t)-b\\omega^2\\sin(\\omega t).\\]</div>
    <p>Let \\(D=k-m\\omega^2\\). Matching cosine and sine coefficients gives</p><div class="eq">\\[Da+c\\omega b=A,\\qquad Db-c\\omega a=0.\\]</div>
    <p><b>Extract the response amplitude without hiding the algebra.</b> Square both equations and add. The cross terms cancel:</p><div class="eq">\\[A^2=(D^2+c^2\\omega^2)(a^2+b^2).\\]</div><p>The displacement amplitude is \\(R=\\sqrt{a^2+b^2}\\), hence</p><div class="eq">\\[\\boxed{R(\\omega)=\\frac{A}{\\sqrt{(k-m\\omega^2)^2+(c\\omega)^2}}}.\\]</div>
    <p>Because \\(c\\omega\\) contributes to the denominator, a damped steady-state amplitude remains finite.</p>
    <p><b>Where is the displacement peak?</b> Minimize the squared denominator</p><div class="eq">\\[G(\\omega)=(k-m\\omega^2)^2+c^2\\omega^2.\\]</div><p>Differentiate:</p><div class="eq">\\[G'(\\omega)=-4m\\omega(k-m\\omega^2)+2c^2\\omega.\\]</div><p>For a positive-frequency critical point, divide by \\(2\\omega\\):</p><div class="eq">\\[-2m(k-m\\omega^2)+c^2=0.\\]</div><p>Therefore</p><div class="eq">\\[\\boxed{\\omega_r=\\sqrt{\\frac{k}{m}-\\frac{c^2}{2m^2}}}\\]</div><p>provided \\(c^2<2mk\\). If \\(c^2\\ge2mk\\), there is no positive-frequency peak in the displacement-amplitude curve. As \\(c\\to0\\), \\(\\omega_r\\to\\omega_0=\\sqrt{k/m}\\).</p>
    <div class="warn"><b>Keep the two cases separate:</b> zero damping gives unbounded resonant growth at \\(\\omega_0\\); positive damping gives a finite steady-state response, whose displacement peak—when it exists—is slightly below \\(\\omega_0\\).</div>`);

  setTeach(6,"Worked regime example — underdamped",`
    <p><span class="supplementalTag">Supplemental course example</span></p><p>Solve</p><div class="eq">\\[y''+4y'+13y=0,\\qquad y(0)=1,\\quad y'(0)=0.\\]</div>
    <p><b>1. Classify from the roots.</b> The characteristic equation is</p><div class="eq">\\[r^2+4r+13=0,\\]</div><p>so</p><div class="eq">\\[r=\\frac{-4\\pm\\sqrt{16-52}}2=-2\\pm3i.\\]</div><p>The negative real part gives decay and the imaginary part gives oscillation: this is underdamped motion.</p>
    <p><b>2. Write the real solution family.</b></p><div class="eq">\\[y=e^{-2t}(c_1\\cos3t+c_2\\sin3t).\\]</div>
    <p><b>3. Apply the value condition.</b> At \\(t=0\\), \\(e^0=1\\), \\(\\cos0=1\\), \\(\\sin0=0\\), so \\(c_1=1\\).</p>
    <p><b>4. Differentiate before using the velocity condition.</b></p><div class="eq">\\[y'=e^{-2t}[-2(c_1\\cos3t+c_2\\sin3t)-3c_1\\sin3t+3c_2\\cos3t].\\]</div><p>At \\(t=0\\),</p><div class="eq">\\[0=y'(0)=-2c_1+3c_2=-2+3c_2,\\]</div><p>so \\(c_2=2/3\\).</p>
    <div class="whybox"><div class="eq">\\[\\boxed{y=e^{-2t}(\\cos3t+\\tfrac23\\sin3t)}.\\]</div><p>The exponential envelope \\(e^{-2t}\\) shrinks while the sine/cosine factor continues oscillating.</p></div>`);

  setTeach(6,"Worked regime example — critical",`
    <p><span class="supplementalTag">Supplemental course example</span></p><p>Solve</p><div class="eq">\\[y''+6y'+9y=0,\\qquad y(0)=1,\\quad y'(0)=0.\\]</div>
    <p><b>1. Characteristic equation and classification.</b></p><div class="eq">\\[r^2+6r+9=(r+3)^2=0.\\]</div><p>The repeated negative root \\(r=-3\\) is the critically damped case.</p>
    <p><b>2. Use the repeated-root family.</b></p><div class="eq">\\[y=(c_1+c_2t)e^{-3t}.\\]</div>
    <p><b>3. Apply \\(y(0)=1\\).</b> This gives \\(c_1=1\\).</p>
    <p><b>4. Differentiate before applying \\(y'(0)=0\\).</b></p><div class="eq">\\[y'=[c_2-3(c_1+c_2t)]e^{-3t}.\\]</div><p>At zero,</p><div class="eq">\\[0=c_2-3c_1=c_2-3,\\]</div><p>hence \\(c_2=3\\).</p>
    <div class="whybox"><div class="eq">\\[\\boxed{y=(1+3t)e^{-3t}}.\\]</div><p>There is no sine/cosine factor, so the ideal motion returns without oscillation.</p></div>`);

  const l6IvpDetails={
    11:`<p><b>Constant algebra:</b> from \\(3A=7B\\), \\(A=7B/3\\). Insert this into \\(A+B=1\\): \\(7B/3+B=10B/3=1\\Rightarrow B=3/10\\), hence \\(A=7/10\\).</p>`,
    12:`<p><b>Constant algebra:</b> \\(4c_2=8\\Rightarrow c_2=2\\). Then \\(c_1+4(2)=5\\Rightarrow c_1=-3\\).</p>`,
    13:`<p><b>Constant algebra:</b> \\(c_1=4\\), then \\(2c_1+c_2=5\\Rightarrow8+c_2=5\\Rightarrow c_2=-3\\).</p>`,
    14:`<p><b>Constant algebra:</b> \\(c_1=-4\\). The slope equation is \\(-12c_1+c_2=0\\), so \\(48+c_2=0\\Rightarrow c_2=-48\\).</p>`,
    15:`<p><b>Constant algebra:</b> multiply \\(c_1+c_2=1\\) by 4 to get \\(4c_1+4c_2=4\\). Subtract this from \\(4c_1+6c_2=10\\): \\(2c_2=6\\Rightarrow c_2=3\\), hence \\(c_1=-2\\).</p>`,
    16:`<p><b>Constant algebra:</b> the slope equation \\(2c_1-2c_2=-3\\) is \\(c_1-c_2=-3/2\\). Add it to \\(c_1+c_2=7\\): \\(2c_1=11/2\\Rightarrow c_1=11/4\\). Then \\(c_2=7-11/4=17/4\\).</p>`
  };
  Object.entries(l6IvpDetails).forEach(([n,html])=>beforeWhy(6,`O’Neil §2.4 Problem ${n}`,html));

  // Lesson 7: fill prerequisite gaps, deepen physical terms, and expose omitted algebra in applications.
  replaceIn(7,"Stress, strain, spring, dashpot","html",
    `<p><b>Stress</b> \\(\\sigma\\) is force per area. <b>Strain</b> \\(\\varepsilon\\) is a dimensionless relative deformation.</p>`,
    `<p><b>Stress</b> \\(\\sigma=F/A\\) is internal force divided by cross-sectional area; its SI unit is the pascal. <b>Strain</b> \\(\\varepsilon=\\Delta L/L_0\\) is change in length divided by original length, so it is dimensionless.</p><div class="beginner"><b>Physical meaning of the material constants:</b> \\(E\\) measures elastic stiffness — larger \\(E\\) means more stress is needed for the same elastic strain. \\(\\eta\\) measures resistance to deformation rate in the dashpot — larger \\(\\eta\\) means the dashpot flows more slowly under the same stress.</div>`
  );

  const bvpUnit=units.find(u=>u&&u.id==='l7-bvp-structure');
  if(bvpUnit && bvpUnit.lessons?.[0] && !bvpUnit.lessons[0].screens.some(s=>s.title==='Hyperbolic functions are repackaged exponentials')){
    bvpUnit.lessons[0].screens.splice(2,0,{type:'teach',title:'Hyperbolic functions are repackaged exponentials',html:`
      <p><span class="supplementalTag">Prerequisite explained before use</span></p>
      <p>One later boundary-value example uses \\(\\cosh x\\), \\(\\sinh x\\), and \\(\\tanh x\\). They are not a new ODE method; they are convenient combinations of the exponential basis \\(e^x,e^{-x}\\):</p>
      <div class="eq">\\[\\cosh x=\\frac{e^x+e^{-x}}2,\\qquad \\sinh x=\\frac{e^x-e^{-x}}2,\\qquad \\tanh x=\\frac{\\sinh x}{\\cosh x}.\\]</div>
      <p>Differentiate the definitions:</p><div class="eq">\\[(\\cosh x)'=\\sinh x,\\qquad(\\sinh x)'=\\cosh x.\\]</div>
      <p>At zero, \\(\\cosh0=1\\) and \\(\\sinh0=0\\). That makes \\(A\\cosh x+B\\sinh x\\) especially convenient when a boundary condition is imposed at \\(x=0\\).</p>
      <div class="whybox"><b>Same solution space:</b> because each hyperbolic function is a linear combination of \\(e^x\\) and \\(e^{-x}\\), writing \\(A\\cosh x+B\\sinh x\\) is only a change of basis, not an extra assumption.</div>`});
  }

  replaceIn(7,"The boundary determinant","html",
    `<p>If \\(D\\neq0\\), only the zero homogeneous solution satisfies both boundaries, so a corresponding forced BVP cannot have two distinct solutions. If \\(D=0\\), nontrivial homogeneous solutions satisfy the boundaries and compatibility becomes the issue.</p>`,
    `<p><b>Why the determinant decides uniqueness.</b> The boundary equations have matrix form \\(M\\mathbf c=\\mathbf0\\), where \\(\\mathbf c=(c_1,c_2)^T\\). If \\(D=\\det M\\neq0\\), the matrix is invertible, so multiplying by \\(M^{-1}\\) gives \\(\\mathbf c=\\mathbf0\\). There is no nonzero homogeneous solution satisfying both boundary conditions.</p><p>If \\(D=0\\), the matrix is singular and has a nontrivial null direction: some nonzero homogeneous solution satisfies both boundaries. For a forced problem the constant system becomes \\(M\\mathbf c=\\mathbf b\\). A singular system can be incompatible (no solution) or compatible with one free null direction (infinitely many solutions).</p><div class="whybox"><b>This is the one/none/infinite mechanism.</b> It comes from ordinary 2×2 linear algebra applied to the boundary conditions, not from a mysterious new differential-equation rule.</div>`
  );

  beforeWhy(7,"Course Practice 2 · Free underdamped RLC response",`<p><b>Differentiate the charge without skipping the product rule.</b></p><div class="eq">\\[q'=e^{-2t}[-2(\\cos3t+\\tfrac23\\sin3t)-3\\sin3t+2\\cos3t].\\]</div><p>The cosine terms cancel. The sine coefficient is \\(-4/3-3=-13/3\\), so</p><div class="eq">\\[i=q'=-\\frac{13}{3}e^{-2t}\\sin3t.\\]</div>`);
  beforeWhy(7,"Course Practice 3 · RLC circuit with a DC source",`<p><b>Solve the constants explicitly.</b> From \\(c_1+c_2=-5\\) and \\(-c_1-2c_2=0\\), the second equation gives \\(c_1=-2c_2\\). Substitute into the first:</p><div class="eq">\\[-2c_2+c_2=-5\\Rightarrow c_2=5,\\]</div><p>hence \\(c_1=-10\\).</p>`);
  beforeWhy(7,"Course Practice 5 · Electrical resonance in the zero-resistance idealization",`<p><b>Derive the resonant coefficient instead of quoting it.</b> Because \\(\\cos3t\\) is already a homogeneous mode, multiply the forcing-shaped trial by \\(t\\):</p><div class="eq">\\[q_p=At\\sin3t.\\]</div><p>Differentiate:</p><div class="eq">\\[q_p'=A\\sin3t+3At\\cos3t,\\]</div><div class="eq">\\[q_p''=6A\\cos3t-9At\\sin3t.\\]</div><p>Then</p><div class="eq">\\[q_p''+9q_p=6A\\cos3t.\\]</div><p>Matching \\(3\\cos3t\\) gives \\(6A=3\\Rightarrow A=1/2\\).</p>`);
  beforeWhy(7,"Course Practice 6 · Maxwell stress relaxation",`<p><b>Solve the first-order relaxation equation explicitly.</b> With \\(\\tau=5\\) s,</p><div class="eq">\\[\\sigma'+\\frac15\\sigma=0.\\]</div><p>Separate variables:</p><div class="eq">\\[\\frac{d\\sigma}{\\sigma}=-\\frac15dt.\\]</div><p>Integrate:</p><div class="eq">\\[\\ln|\\sigma|=-\\frac{t}{5}+C\\Rightarrow\\sigma=Ce^{-t/5}.\\]</div><p>The instantaneous condition \\(\\sigma(0^+)=10\\) MPa gives \\(C=10\\).</p>`);
  beforeWhy(7,"Course Practice 8 · Kelvin–Voigt creep and time constant",`<p><b>Solve the first-order creep equation without jumping to the formula.</b> Divide by \\(\\eta=5000\\):</p><div class="eq">\\[\\varepsilon'+\\frac15\\varepsilon=0.002.\\]</div><p>A constant steady solution satisfies \\(\\varepsilon_s/5=0.002\\), so \\(\\varepsilon_s=0.01\\). The homogeneous part is \\(Ce^{-t/5}\\), hence</p><div class="eq">\\[\\varepsilon=0.01+Ce^{-t/5}.\\]</div><p>Using \\(\\varepsilon(0)=0\\) gives \\(C=-0.01\\), so \\(\\varepsilon=0.01(1-e^{-t/5})\\).</p>`);
  each(7,"Course Practice 13 · A mixed two-point BVP",s=>{
    if(s.type!=='bookproblem') return;
    s.solution=methodPlans[7]+`<p><b>1. Solve the homogeneous ODE.</b> The characteristic equation of \\(y''-y=0\\) is \\(r^2-1=(r-1)(r+1)=0\\), so an exponential basis is \\(e^x,e^{-x}\\).</p>
      <p><b>2. Rewrite the same family in a boundary-friendly basis.</b> Using the definitions of the hyperbolic functions, the same two-dimensional solution space may be written</p><div class="eq">\\[y=A\\cosh x+B\\sinh x.\\]</div><p>This is convenient because \\(\\cosh0=1\\) and \\(\\sinh0=0\\).</p>
      <p><b>3. Apply the first boundary condition.</b></p><div class="eq">\\[y(0)=A(1)+B(0)=1\\Rightarrow A=1.\\]</div>
      <p><b>4. Differentiate before applying the slope condition.</b></p><div class="eq">\\[y'=A\\sinh x+B\\cosh x=\\sinh x+B\\cosh x.\\]</div>
      <p><b>5. Apply \\(y'(1)=0\\).</b></p><div class="eq">\\[\\sinh1+B\\cosh1=0\\Rightarrow B=-\\frac{\\sinh1}{\\cosh1}=-\\tanh1.\\]</div>
      <p>Thus</p><div class="eq">\\[y=\\cosh x-\\tanh1\\,\\sinh x.\\]</div>
      <p><b>6. Simplify only after the solution is correct.</b></p><div class="eq">\\[y=\\frac{\\cosh1\\cosh x-\\sinh1\\sinh x}{\\cosh1}.\\]</div><p>The identity \\(\\cosh(a-b)=\\cosh a\\cosh b-\\sinh a\\sinh b\\) gives</p>
      <div class="whybox"><div class="eq">\\[\\boxed{y=\\frac{\\cosh(1-x)}{\\cosh1}}.\\]</div></div>
      <p><b>Boundary check:</b> \\(y(0)=\\cosh1/\\cosh1=1\\). Also \\(y'=-\\sinh(1-x)/\\cosh1\\), hence \\(y'(1)=0\\).</p>`+verificationNote;
    s._lesson1DepthWrapped=true;
  });
  each(7,"Course Practice 14 · Boundary-system determinant",s=>{
    if(s.type!=='bookproblem') return;
    const extra=`<p><b>Why the determinant has exactly this role.</b> Put the two equations into matrix form</p><div class="eq">\\[M\\mathbf c=\\mathbf0,\\qquad M=\\begin{bmatrix}y_1(a)&y_2(a)\\\\y_1(b)&y_2(b)\\end{bmatrix}.\\]</div><p>If \\(D=\\det M\\neq0\\), then \\(M^{-1}\\) exists and \\(\\mathbf c=M^{-1}\\mathbf0=\\mathbf0\\). If \\(D=0\\), \\(M\\) is singular and has a nonzero null vector, producing a nontrivial homogeneous solution that obeys both boundaries.</p>`;
    if(!s.solution.includes('Why the determinant has exactly this role')) s.solution=s.solution.replace('<div class="whybox">',extra+'<div class="whybox">');
  });

  // All ordinary solved-example teaching cards get an explicit verification instruction if they do not already contain one.
  for(const u of units){
    const n=lessonOf(u);
    if(n<2||n>7) continue;
    for(const l of (u.lessons||[])) for(const s of (l.screens||[])){
      if(s.type!=='teach' || !/(worked example|example 2\.|numerical resonance checkpoint|supplemental example)/i.test(s.title||'')) continue;
      if(typeof s.html==='string' && !/(verification habit|direct ODE check|boundary check|check the result)/i.test(s.html)){
        s.html+=`<div class="tip"><b>Check the result:</b> do not treat the boxed expression as self-validating. Differentiate it, substitute it into the original equation, and verify any initial/boundary data. The check uses the original problem, so it is independent of the solving route.</div>`;
      }
    }
  }

  // Update the visible UI after the final curriculum mutation.
  try{ if(typeof renderCourseMap==='function') renderCourseMap(); }catch(e){}
  try{ if(typeof render==='function') render(); }catch(e){}
})();