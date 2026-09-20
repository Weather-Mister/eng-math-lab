(()=>{
  const math=(tex)=>`<span class="math">\\(${tex}\\)</span>`;
  const display=(tex)=>`<div class="glossaryFormula eq">\\[${tex}\\]</div>`;

  const calculus=`
    <p class="glossaryIntro">A compact calculus reference for the manipulations that appear repeatedly in Engineering Mathematics. Use it to recall a rule, not to skip domain checks.</p>
    <div class="glossaryGrid">
      <div class="glossaryCard">
        <h3>Derivative rules</h3>
        ${display(`\\frac{d}{dx}c=0,\\qquad \\frac{d}{dx}x^n=nx^{n-1}`)}
        ${display(`\\frac{d}{dx}e^{ax}=ae^{ax},\\qquad \\frac{d}{dx}\\ln|x|=\\frac1x`)}
        ${display(`\\frac{d}{dx}\\sin(ax)=a\\cos(ax),\\qquad \\frac{d}{dx}\\cos(ax)=-a\\sin(ax)`)}
        ${display(`\\frac{d}{dx}\\tan(ax)=a\\sec^2(ax)`)}
        ${display(`\\frac{d}{dx}\\arctan u=\\frac{u'}{1+u^2},\\qquad \\frac{d}{dx}\\arcsin u=\\frac{u'}{\\sqrt{1-u^2}}`)}
        <h4>Structural rules</h4>
        ${display(`(uv)'=u'v+uv'`)}
        ${display(`\\left(\\frac{u}{v}\\right)'=\\frac{u'v-uv'}{v^2}`)}
        ${display(`\\frac{d}{dx}f(g(x))=f'(g(x))g'(x)`)}
        <div class="glossaryNote">The product rule is the reason integrating-factor methods collapse to one derivative. The chain rule is the reason substitutions such as ${math(`y=ux`)} and ${math(`v=y^{1-\\alpha}`)} work.</div>
      </div>

      <div class="glossaryCard">
        <h3>Core antiderivatives</h3>
        ${display(`\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C,\\qquad n\\ne-1`)}
        ${display(`\\int \\frac{dx}{x}=\\ln|x|+C`)}
        ${display(`\\int e^{ax}\\,dx=\\frac1a e^{ax}+C`)}
        ${display(`\\int \\sin(ax)\\,dx=-\\frac1a\\cos(ax)+C`)}
        ${display(`\\int \\cos(ax)\\,dx=\\frac1a\\sin(ax)+C`)}
        ${display(`\\int \\tan(ax)\\,dx=-\\frac1a\\ln|\\cos(ax)|+C=\\frac1a\\ln|\\sec(ax)|+C`)}
        ${display(`\\int \\sec(ax)\\,dx=\\frac1a\\ln|\\sec(ax)+\\tan(ax)|+C`)}
        ${display(`\\int \\sec^2(ax)\\,dx=\\frac1a\\tan(ax)+C`)}
        ${display(`\\int \\frac{dx}{1+x^2}=\\arctan x+C`)}
        ${display(`\\int \\frac{dx}{\\sqrt{1-x^2}}=\\arcsin x+C`)}
      </div>

      <div class="glossaryCard">
        <h3>Two patterns worth recognizing immediately</h3>
        ${display(`\\int \\frac{du}{a^2+u^2}=\\frac1a\\arctan\\left(\\frac{u}{a}\\right)+C`)}
        ${display(`\\int \\frac{du}{1-u^2}=\\operatorname{artanh}(u)+C=\\frac12\\ln\\left|\\frac{1+u}{1-u}\\right|+C`)}
        <p>The second form is especially useful in separable motion models such as quadratic drag.</p>
      </div>

      <div class="glossaryCard">
        <h3>Integration techniques</h3>
        <h4>Substitution</h4>
        ${display(`u=g(x),\\quad du=g'(x)dx`)}
        <p>Look for a function and its derivative together. This is the reverse chain rule.</p>
        <h4>Integration by parts</h4>
        ${display(`\\int u\\,dv=uv-\\int v\\,du`)}
        <p>Useful for products such as polynomial × exponential/trigonometric terms.</p>
        <h4>Partial fractions</h4>
        <p>Factor a rational denominator and decompose it into simpler fractions before integrating.</p>
        <h4>Complete the square</h4>
        ${display(`x^2+bx+c=\\left(x+\\frac b2\\right)^2+\\left(c-\\frac{b^2}{4}\\right)`)}
        <p>Often exposes an arctangent or logarithmic integral.</p>
      </div>

      <div class="glossaryCard wide">
        <h3>Integration habits that prevent ODE mistakes</h3>
        <div class="glossaryChoice">
          <div><b>One arbitrary constant</b>When both sides are integrated, combine the two constants into one ${math(`C`)}.</div>
          <div><b>Absolute values matter</b>${math(`\\int du/u=\\ln|u|+C`)} on an interval that does not cross ${math(`u=0`)}.</div>
          <div><b>Record divisions</b>If you divide by a factor that can be zero, test that excluded value in the original equation later.</div>
          <div><b>Implicit answers are valid</b>You do not need to force ${math(`y=y(x)`)} if the natural result is ${math(`\\Phi(x,y)=C`)}.</div>
        </div>
      </div>
    </div>`;

  const firstOrder=`
    <p class="glossaryIntro">Classify first. More than one method may work; choose the cleanest valid route and keep track of every restriction introduced by algebra.</p>
    <div class="glossaryGrid">
      <div class="glossaryCard wide">
        <h3>Fast method-selection order</h3>
        <div class="glossaryChoice">
          <div><b>1 · Separable?</b>Can all ${math(`y`)} terms be moved with ${math(`dy`)} and all ${math(`x`)} terms with ${math(`dx`)}?</div>
          <div><b>2 · Homogeneous ratio?</b>Does the slope depend only on ${math(`y/x`)}, or are ${math(`M,N`)} homogeneous of the same degree?</div>
          <div><b>3 · Exact?</b>Can you write ${math(`Mdx+Ndy=0`)} and does ${math(`M_y=N_x`)}?</div>
          <div><b>4 · Linear?</b>Can it be written ${math(`y'+p(x)y=q(x)`)}?</div>
          <div><b>5 · Named pattern?</b>Bernoulli, Riccati, or Clairaut?</div>
          <div><b>Always</b>After solving, apply the IVP, verify in the original ODE, and state the valid interval/domain.</div>
        </div>
      </div>

      <div class="glossaryCard">
        <div class="glossaryMethodTop"><span class="glossaryMethodNo">1</span><span class="glossaryMethodName">Separable</span></div>
        <p class="glossaryRecognition">Recognize: ${math(`y'=F(x)G(y)`)}</p>
        ${display(`\\frac{dy}{G(y)}=F(x)\\,dx`)}
        <ol class="glossarySteps"><li>Set aside zeros of ${math(`G(y)`)} before dividing.</li><li>Separate.</li><li>Integrate both sides with one constant.</li><li>Solve explicitly if useful; otherwise keep an implicit answer.</li><li>Test excluded constant solutions in the original ODE.</li></ol>
      </div>

      <div class="glossaryCard">
        <div class="glossaryMethodTop"><span class="glossaryMethodNo">2</span><span class="glossaryMethodName">Homogeneous first-order</span></div>
        <p class="glossaryRecognition">Recognize: ${math(`y'=g(y/x)`)} or ${math(`Mdx+Ndy=0`)} with ${math(`M,N`)} homogeneous of the same degree.</p>
        ${display(`u=\\frac yx,\\qquad y=ux,\\qquad y'=u+xu'`)}
        ${display(`xu'=g(u)-u`)}
        <p>Then separate in ${math(`u`)} and ${math(`x`)}, integrate, and restore ${math(`u=y/x`)}.</p>
        <div class="glossaryNote">Extension: ${math(`y=ux^\\alpha`)} can sometimes simplify a non-homogeneous equation by matching powers, but it is an ansatz, not a guaranteed method.</div>
      </div>

      <div class="glossaryCard">
        <div class="glossaryMethodTop"><span class="glossaryMethodNo">3</span><span class="glossaryMethodName">Exact</span></div>
        <p class="glossaryRecognition">Recognize: ${math(`M(x,y)dx+N(x,y)dy=0`)}</p>
        ${display(`M_y=N_x`)}
        <ol class="glossarySteps"><li>Run the exactness test first.</li><li>Integrate ${math(`M`)} with respect to ${math(`x`)}: ${math(`\\phi=\\int Mdx+f(y)`)} — or start from ${math(`N`)}.</li><li>Differentiate the candidate with respect to the other variable and match.</li><li>Finish with ${math(`\\phi(x,y)=C`)}.</li></ol>
      </div>

      <div class="glossaryCard">
        <div class="glossaryMethodTop"><span class="glossaryMethodNo">4</span><span class="glossaryMethodName">Non-exact + integrating factor</span></div>
        <p class="glossaryRecognition">Start when ${math(`M_y\\ne N_x`)}</p>
        ${display(`\\frac{M_y-N_x}{N}=f(x)\\Rightarrow \\mu(x)=e^{\\int f(x)dx}`)}
        ${display(`\\frac{M_y-N_x}{M}=g(y)\\Rightarrow \\mu(y)=e^{-\\int g(y)dy}`)}
        ${display(`\\frac{M_y-N_x}{N-M}=h(x+y)\\Rightarrow \\mu=e^{\\int h(z)dz},\\ z=x+y`)}
        <p>For selected polynomial pairs, trying ${math(`\\mu=x^\\alpha y^\\beta`)} can also work. After multiplying, return to the exact-equation procedure.</p>
      </div>

      <div class="glossaryCard">
        <div class="glossaryMethodTop"><span class="glossaryMethodNo">5</span><span class="glossaryMethodName">Linear first-order</span></div>
        <p class="glossaryRecognition">Recognize after standardizing: ${math(`y'+p(x)y=q(x)`)}</p>
        ${display(`\\mu(x)=e^{\\int p(x)dx}`)}
        ${display(`(\\mu y)'=\\mu q`)}
        ${display(`y=\\frac{\\int \\mu q\\,dx+C}{\\mu}`)}
        <ol class="glossarySteps"><li>Divide first so the coefficient of ${math(`y'`)} is exactly 1.</li><li>Build ${math(`\\mu`)}.</li><li>Multiply the entire equation.</li><li>Recognize one product derivative, integrate, solve.</li></ol>
      </div>

      <div class="glossaryCard">
        <div class="glossaryMethodTop"><span class="glossaryMethodNo">6</span><span class="glossaryMethodName">Bernoulli</span></div>
        <p class="glossaryRecognition">Recognize: ${math(`y'+p(x)y=q(x)y^\\alpha`)}, with ${math(`\\alpha\\ne0,1`)}</p>
        ${display(`v=y^{1-\\alpha}`)}
        ${display(`v'+(1-\\alpha)p(x)v=(1-\\alpha)q(x)`)}
        <p>The transformed equation is linear in ${math(`v`)}. If division by a power of ${math(`y`)} excluded ${math(`y=0`)}, check it separately.</p>
      </div>

      <div class="glossaryCard">
        <div class="glossaryMethodTop"><span class="glossaryMethodNo">7</span><span class="glossaryMethodName">Riccati</span></div>
        <p class="glossaryRecognition">Recognize: ${math(`y'=P(x)y^2+Q(x)y+R(x)`)}</p>
        <p>If one particular solution ${math(`S(x)`)} is known, set</p>
        ${display(`y=S+\\frac1z`)}
        ${display(`z'+(2PS+Q)z=-P`)}
        <p>Solve the resulting linear equation for ${math(`z`)} and restore ${math(`y`)}. Include the known solution ${math(`y=S`)} separately if the transformed family misses it.</p>
      </div>

      <div class="glossaryCard">
        <div class="glossaryMethodTop"><span class="glossaryMethodNo">8</span><span class="glossaryMethodName">Clairaut</span></div>
        <p class="glossaryRecognition">Recognize: ${math(`y=xy'+f(y')`)}</p>
        ${display(`y=cx+f(c)`)}
        <p>This is the one-parameter line family. For the possible singular envelope, put ${math(`p=y'`)} and differentiate:</p>
        ${display(`p'(x+f'(p))=0`)}
        <p>The second branch ${math(`x=-f'(p)`)} gives the envelope parametrically.</p>
      </div>

      <div class="glossaryCard wide">
        <h3>IVP + verification checklist</h3>
        <div class="glossaryChoice">
          <div><b>General solution first</b>Then use ${math(`y(x_0)=y_0`)} to determine the constant.</div>
          <div><b>Equation check</b>Differentiate as needed and substitute into the original ODE.</div>
          <div><b>Domain check</b>Check denominators, logarithms, radicals, substitutions, and every divided-out factor.</div>
          <div><b>Engineering check</b>For models, verify units, sign, equilibrium/steady state, and long-time behavior.</div>
        </div>
      </div>
    </div>`;

  const higherOrder=`
    <p class="glossaryIntro">Higher-order methods in the ME2001-02 sequence are mainly methods for linear second-order equations, followed by their nth-order generalization. Put the equation in standard form and identify homogeneous versus forced structure before choosing a technique.</p>
    <div class="glossaryGrid">
      <div class="glossaryCard wide">
        <h3>Method-selection map</h3>
        <div class="glossaryChoice">
          <div><b>Constant coefficients, homogeneous</b>Use the characteristic polynomial.</div>
          <div><b>One homogeneous solution already known</b>Use reduction of order to find a second independent solution.</div>
          <div><b>Simple forcing + constant coefficients</b>Use undetermined coefficients.</div>
          <div><b>General forcing + fundamental pair known</b>Use variation of parameters.</div>
          <div><b>Euler–Cauchy structure</b>Try ${math(`y=x^m`)} on a fixed-sign interval.</div>
          <div><b>Boundary conditions at two points</b>Find the general solution first, then solve the resulting linear system for constants.</div>
        </div>
      </div>

      <div class="glossaryCard">
        <h3>Linear second-order structure</h3>
        ${display(`a(x)y''+b(x)y'+c(x)y=g(x)`)}
        <p>On an interval where ${math(`a(x)\\ne0`)}, divide through:</p>
        ${display(`y''+P(x)y'+Q(x)y=G(x)`)}
        <p>For the homogeneous equation ${math(`G=0`)}, linear combinations of solutions are also solutions.</p>
        ${display(`y_h=C_1y_1+C_2y_2`)}
        <h4>Wronskian</h4>
        ${display(`W(y_1,y_2)=y_1y_2'-y_1'y_2`)}
        <p>If ${math(`W\\ne0`)} at a point (under the standard continuity assumptions), the two solutions are linearly independent on the interval.</p>
      </div>

      <div class="glossaryCard">
        <h3>Constant-coefficient homogeneous</h3>
        ${display(`ay''+by'+cy=0\\quad\\Rightarrow\\quad ar^2+br+c=0`)}
        <p><b>Distinct real roots ${math(`r_1,r_2`)}</b></p>
        ${display(`y=C_1e^{r_1x}+C_2e^{r_2x}`)}
        <p><b>Repeated real root ${math(`r`)}</b></p>
        ${display(`y=(C_1+C_2x)e^{rx}`)}
        <p><b>Complex roots ${math(`\\alpha\\pm i\\beta`)}</b></p>
        ${display(`y=e^{\\alpha x}(C_1\\cos\\beta x+C_2\\sin\\beta x)`)}
      </div>

      <div class="glossaryCard">
        <h3>nth-order constant coefficients</h3>
        ${display(`a_ny^{(n)}+\\cdots+a_1y'+a_0y=0\\quad\\Rightarrow\\quad P(r)=0`)}
        <p>Each real root ${math(`r`)} of multiplicity ${math(`m`)} contributes</p>
        ${display(`e^{rx},\\ xe^{rx},\\ldots,x^{m-1}e^{rx}`)}
        <p>Complex-conjugate roots give real sine/cosine pairs, multiplied by powers of ${math(`x`)} when the complex root is repeated.</p>
      </div>

      <div class="glossaryCard">
        <h3>Reduction of order</h3>
        <p class="glossaryRecognition">Use when one nonzero homogeneous solution ${math(`y_1`)} is already known.</p>
        ${display(`y_2=v(x)y_1(x)`)}
        <p>For standard form ${math(`y''+P(x)y'+Q(x)y=0`)}, the shortcut is</p>
        ${display(`y_2=y_1\\int \\frac{e^{-\\int P(x)dx}}{y_1^2}\\,dx`)}
        <p>The goal is a second solution not proportional to ${math(`y_1`)}.</p>
      </div>

      <div class="glossaryCard">
        <h3>Nonhomogeneous structure</h3>
        ${display(`L[y]=g(x),\\qquad y=y_c+y_p`)}
        <p>${math(`y_c`)} solves the associated homogeneous equation. ${math(`y_p`)} is any one particular solution of the forced equation.</p>
        <div class="glossaryNote">Do not put arbitrary constants inside ${math(`y_p`)}. They already belong in ${math(`y_c`)}.</div>
      </div>

      <div class="glossaryCard">
        <h3>Undetermined coefficients</h3>
        <p class="glossaryRecognition">Best for constant coefficients with forcing built from polynomials, exponentials, sines, cosines, or products of these.</p>
        <div class="glossaryChoice">
          <div><b>${math(`P_n(x)`)}</b>Try a general polynomial of degree ${math(`n`)}.</div>
          <div><b>${math(`e^{ax}`)}</b>Try ${math(`Ae^{ax}`)}.</div>
          <div><b>${math(`\\cos bx`)} / ${math(`\\sin bx`)}</b>Try ${math(`A\\cos bx+B\\sin bx`)}.</div>
          <div><b>Products</b>Multiply the matching trial forms together.</div>
        </div>
        <div class="glossaryNote glossaryDanger"><b>Resonance rule:</b> if your trial duplicates any part of ${math(`y_c`)}, multiply the entire trial by ${math(`x^s`)}, where ${math(`s`)} is the smallest power that removes the overlap.</div>
      </div>

      <div class="glossaryCard">
        <h3>Variation of parameters</h3>
        <p class="glossaryRecognition">Use for standard form ${math(`y''+P y'+Q y=G`)} when a fundamental pair ${math(`y_1,y_2`)} is known.</p>
        ${display(`W=y_1y_2'-y_1'y_2`)}
        ${display(`u_1'=-\\frac{y_2G}{W},\\qquad u_2'=\\frac{y_1G}{W}`)}
        ${display(`y_p=u_1y_1+u_2y_2`)}
        <p>Equivalently,</p>
        ${display(`y_p=-y_1\\int\\frac{y_2G}{W}dx+y_2\\int\\frac{y_1G}{W}dx`)}
      </div>

      <div class="glossaryCard">
        <h3>Euler–Cauchy equation</h3>
        ${display(`x^2y''+axy'+by=0`)}
        <p>Try ${math(`y=x^m`)}. The indicial equation is</p>
        ${display(`m(m-1)+am+b=0`)}
        <p><b>Distinct roots:</b> ${math(`C_1x^{m_1}+C_2x^{m_2}`)}.</p>
        <p><b>Repeated root:</b> ${math(`x^m(C_1+C_2\\ln|x|)`)}.</p>
        <p><b>Complex roots ${math(`\\alpha\\pm i\\beta`)}</b>: on a fixed-sign interval,</p>
        ${display(`|x|^\\alpha[C_1\\cos(\\beta\\ln|x|)+C_2\\sin(\\beta\\ln|x|)]`)}
      </div>

      <div class="glossaryCard">
        <h3>Two-point boundary-value problems</h3>
        <p>Conditions such as ${math(`y(a)=A`)} and ${math(`y(b)=B`)} are imposed at different points.</p>
        <ol class="glossarySteps"><li>Find the full general solution first.</li><li>Apply both boundary conditions.</li><li>Solve the resulting algebraic system for the constants.</li><li>Unlike a typical IVP, a BVP may have one solution, no solution, or multiple solutions depending on the equation and data.</li></ol>
      </div>

      <div class="glossaryCard wide">
        <h3>Engineering forms worth recognizing</h3>
        <div class="glossaryChoice">
          <div><b>Spring–mass–damper</b>${math(`my''+cy'+ky=F(t)`)}. Characteristic equation ${math(`mr^2+cr+k=0`)}. The sign of ${math(`c^2-4mk`)} separates over-, critical-, and under-damping.</div>
          <div><b>Natural frequency</b>For the undamped free system ${math(`my''+ky=0`)}, ${math(`\\omega_0=\\sqrt{k/m}`)}.</div>
          <div><b>Series RLC in charge ${math(`q`)}</b>${math(`Lq''+Rq'+\\frac1Cq=E(t)`)} — mathematically the same constant-coefficient forced structure.</div>
          <div><b>Model first</b>In mechanical, electrical, or viscoelastic applications, identify what each variable and parameter means before choosing the ODE method.</div>
        </div>
      </div>
    </div>`;

  const appliedODE=`
    <p class="glossaryIntro">Course application formulas collected as model-building references. Read the physical rule first, then use the ODE. These are the recurring thermal, growth/decay, mixing, vibration, circuit, and viscoelastic models used across the course.</p>
    <div class="glossaryGrid">
      <div class="glossaryCard">
        <h3>Newton cooling / thermal relaxation</h3>
        <p class="glossaryRecognition">Temperature changes in proportion to the difference from a constant ambient temperature.</p>
        ${display(`\\frac{dT}{dt}=k(T-T_{amb})`)}
        ${display(`T(t)=T_{amb}+(T_0-T_{amb})e^{kt}`)}
        <div class="glossaryChoice">
          <div><b>Cooling</b>${math(`k<0`)} when ${math(`T>T_{amb}`)} and the body relaxes toward ambient.</div>
          <div><b>Equilibrium check</b>${math(`T=T_{amb}`)} makes ${math(`T'=0`)}.</div>
        </div>
      </div>

      <div class="glossaryCard">
        <h3>Exponential growth / decay / first-order kinetics</h3>
        <p class="glossaryRecognition">Rate proportional to the amount currently present.</p>
        ${display(`P'=kP,\\qquad P(t)=P_0e^{kt}`)}
        <p>${math(`k>0`)} gives growth; ${math(`k<0`)} gives decay.</p>
        ${display(`t_{double}=\\frac{\\ln2}{k}\\ (k>0),\\qquad h_{1/2}=-\\frac{\\ln2}{k}\\ (k<0)`)}
        <div class="glossaryNote">Radioactive decay is the standard course example. The same proportional-rate structure is the simplest reaction/growth model.</div>
      </div>

      <div class="glossaryCard">
        <h3>Well-stirred mixing tank</h3>
        <p class="glossaryRecognition">Always start from accumulation = rate in − rate out.</p>
        ${display(`Q'=c_{in}r_{in}-\\frac{Q}{V(t)}r_{out}`)}
        ${display(`V(t)=V_0+(r_{in}-r_{out})t`)}
        <p>${math(`Q(t)`)} is solute amount, ${math(`c_{in}`)} inlet concentration, and ${math(`r_{in},r_{out}`)} are volume-flow rates.</p>
        <div class="glossaryNote glossaryDanger"><b>Do not assume constant volume unless ${math(`r_{in}=r_{out}`)}.</b> If the flow rates differ, the concentration in the outlet is ${math(`Q/V(t)`)} with a changing denominator.</div>
      </div>

      <div class="glossaryCard">
        <h3>Spring–mass–damper</h3>
        <p class="glossaryRecognition">Newton's second law: inertia + damping + restoring force = external force.</p>
        ${display(`my''+cy'+ky=F(t)`)}
        <p>Free motion uses ${math(`F(t)=0`)} and characteristic equation</p>
        ${display(`mr^2+cr+k=0,\\qquad \\Delta=c^2-4mk`)}
        ${display(`\\omega_0=\\sqrt{\\frac{k}{m}},\\qquad c_{crit}=2\\sqrt{mk}`)}
        <p>For the underdamped case ${math(`c^2<4mk`)},</p>
        ${display(`\\omega_d=\\sqrt{\\frac{k}{m}-\\frac{c^2}{4m^2}}`)}
        ${display(`y=e^{-ct/(2m)}[C_1\\cos(\\omega_dt)+C_2\\sin(\\omega_dt)]`)}
      </div>

      <div class="glossaryCard">
        <h3>Sinusoidally forced vibration & resonance</h3>
        ${display(`my''+cy'+ky=A\\cos(\\omega t)`)}
        <p>For positive damping, the steady displacement-amplitude response is</p>
        ${display(`R(\\omega)=\\frac{A}{\\sqrt{(k-m\\omega^2)^2+(c\\omega)^2}}`)}
        <p>When a nonzero displacement peak exists,</p>
        ${display(`\\omega_r=\\sqrt{\\frac{k}{m}-\\frac{c^2}{2m^2}},\\qquad c^2<2mk`)}
        <div class="glossaryNote"><b>Ideal undamped resonance:</b> if ${math(`c=0`)} and the forcing frequency equals ${math(`\\omega_0`)}, the ordinary trial overlaps the homogeneous mode and the particular solution acquires a factor of ${math(`t`)}.</div>
      </div>

      <div class="glossaryCard">
        <h3>Series RLC circuit</h3>
        <p class="glossaryRecognition">Kirchhoff voltage balance. Use charge ${math(`q(t)`)} as the state; current is its derivative.</p>
        ${display(`Lq''+Rq'+\\frac1Cq=E(t),\\qquad i=q'`)}
        ${display(`Lr^2+Rr+\\frac1C=0,\\qquad \\Delta=R^2-\\frac{4L}{C}`)}
        ${display(`\\omega_0=\\frac1{\\sqrt{LC}},\\qquad R_{crit}=2\\sqrt{\\frac{L}{C}}`)}
        <p>For an underdamped free circuit,</p>
        ${display(`\\omega_d=\\sqrt{\\frac1{LC}-\\frac{R^2}{4L^2}}`)}
        <div class="glossaryChoice">
          <div><b>Mechanical analogy</b>${math(`m\\leftrightarrow L,\\ c\\leftrightarrow R,\\ k\\leftrightarrow1/C`)}</div>
          <div><b>Stable DC check</b>For constant source ${math(`E_0`)}, long time gives ${math(`i\\to0`)} and ${math(`q\\to CE_0`)}.</div>
        </div>
      </div>

      <div class="glossaryCard">
        <h3>Maxwell viscoelastic model · series</h3>
        <p class="glossaryRecognition">Spring and dashpot in series: same stress, strains add.</p>
        ${display(`\\sigma=E\\varepsilon_s,\\qquad \\sigma=\\eta\\dot{\\varepsilon}_d`)}
        ${display(`\\varepsilon=\\varepsilon_s+\\varepsilon_d`)}
        ${display(`\\boxed{\\dot{\\sigma}+\\frac{E}{\\eta}\\sigma=E\\dot{\\varepsilon}}`)}
        ${display(`\\tau=\\frac{\\eta}{E}`)}
        <h4>Held strain · stress relaxation</h4>
        ${display(`\\dot{\\varepsilon}=0\\Rightarrow\\sigma(t)=\\sigma_0e^{-t/\\tau}`)}
        <h4>Constant stress · creep</h4>
        ${display(`\\sigma=\\sigma_0\\Rightarrow\\varepsilon(t)=\\frac{\\sigma_0}{E}+\\frac{\\sigma_0}{\\eta}t`)}
        <div class="glossaryNote">The first term is the immediate spring strain; the second is continuing dashpot creep.</div>
      </div>

      <div class="glossaryCard">
        <h3>Kelvin–Voigt viscoelastic model · parallel</h3>
        <p class="glossaryRecognition">Spring and dashpot in parallel: same strain, stresses add.</p>
        ${display(`\\boxed{\\sigma=E\\varepsilon+\\eta\\dot{\\varepsilon}}`)}
        ${display(`\\tau=\\frac{\\eta}{E}`)}
        <h4>Constant stress · bounded creep</h4>
        ${display(`\\sigma=\\sigma_0,\\ \\varepsilon(0)=0\\Rightarrow\\varepsilon(t)=\\frac{\\sigma_0}{E}(1-e^{-t/\\tau})`)}
        <div class="glossaryChoice">
          <div><b>Initial behavior</b>No instantaneous finite strain jump in the ideal model.</div>
          <div><b>Long-time behavior</b>${math(`\\varepsilon\\to\\sigma_0/E`)}.</div>
        </div>
      </div>

      <div class="glossaryCard wide">
        <h3>Fast analogy / model-selection table</h3>
        <div class="glossaryChoice">
          <div><b>Temperature relaxing to ambient</b>${math(`T'=k(T-T_{amb})`)}</div>
          <div><b>Amount changes proportionally to itself</b>${math(`P'=kP`)}</div>
          <div><b>Material entering and leaving a tank</b>${math(`Q'=\\text{rate in}-\\text{rate out}`)}</div>
          <div><b>Mechanical vibration</b>${math(`my''+cy'+ky=F(t)`)}</div>
          <div><b>Series electrical circuit</b>${math(`Lq''+Rq'+q/C=E(t)`)}</div>
          <div><b>Viscoelastic series connection</b>Maxwell: same stress, strains add.</div>
          <div><b>Viscoelastic parallel connection</b>Kelvin–Voigt: same strain, stresses add.</div>
          <div><b>Before solving</b>State the physical balance, units, initial/boundary data, and expected long-time behavior.</div>
        </div>
      </div>
    </div>`;

  const desmosSimulations=[
    {lesson:6,unit:'l6-damping',screen:'Interactive Desmos — change the damping yourself',name:'Spring–mass damping regimes',desc:'Change m, c, k, initial displacement, and initial velocity to compare undamped, underdamped, critical, and overdamped free motion.'},
    {lesson:6,unit:'l6-resonance',screen:'Interactive Desmos — resonance response curve',name:'Forced-oscillator resonance',desc:'Explore the steady-state displacement amplitude, natural frequency, and the damping-dependent resonance peak.'},
    {lesson:7,unit:'l7-rlc-response',screen:'Interactive Desmos — RLC transient explorer',name:'RLC transient response',desc:'Change L, R, C, initial charge, and current to see the electrical analogues of the damping regimes.'},
    {lesson:7,unit:'l7-kelvin',screen:'Interactive Desmos — Maxwell vs Kelvin–Voigt creep',name:'Maxwell vs Kelvin–Voigt creep',desc:'Compare unbounded Maxwell creep with the finite Kelvin–Voigt strain response under constant stress.'},
    {lesson:8,unit:'l8-existence',screen:'Interactive Desmos — why the Laplace integral converges',name:'Laplace convergence',desc:'See why the weighted integral for e^{at} converges for real s>a and fails at or below the boundary.'},
    {lesson:11,unit:'l11-pulses',screen:'Interactive Desmos — step, pulse, and true delay',name:'Steps, pulses, and delays',desc:'Separate a Heaviside gate from a finite pulse and a true time-delayed waveform.'},
    {lesson:12,unit:'l12-periodic',screen:'Interactive Desmos — periodic waveform vs staircase',name:'Periodic input vs staircase',desc:'Compare a genuinely periodic pulse train with an accumulating staircase that repeats jump times but not values.'},
    {lesson:13,unit:'l13-convolution',screen:'Interactive Desmos — convolution as sliding overlap',name:'Convolution as sliding overlap',desc:'Slide two unit pulses and watch the overlap integral build the triangular convolution function.'},
    {lesson:14,unit:'l14-review',screen:'Interactive Desmos — partial sums and radius of convergence',name:'Power-series convergence',desc:'Increase the geometric-series partial-sum order and compare behavior inside, near, and outside the radius of convergence.'},
    {lesson:18,unit:'l18-proj',screen:'Interactive Desmos — projection is the closest point',name:'Orthogonal projection',desc:'Move a vector and target line while checking that the residual stays perpendicular and the projection is the closest point.'},
    {lesson:20,unit:'l20-nonhom',screen:'Interactive Desmos — one, none, or infinitely many solutions',name:'Linear-system consistency',desc:'Move two lines between unique, inconsistent, and dependent systems and connect the geometry to row reduction.'},
    {lesson:21,unit:'l21-det',screen:'Interactive Desmos — determinant as signed area scale',name:'Determinant as area and orientation',desc:'Transform the unit square and watch det(A) control signed area, orientation, and singularity.'},
    {lesson:22,unit:'l22-char',screen:'Interactive Desmos — see an eigenvector not turn',name:'Eigen-directions',desc:'Compare a generic vector with true eigen-directions and see how positive and negative eigenvalues scale them.'},
    {lesson:23,unit:'l23-phase',screen:'Interactive Desmos — rotation, centers, and radial nodes',name:'Phase portraits',desc:'Change α and β to move among spiral sinks, centers, spiral sources, and the no-rotation radial cases.'}
  ];

  const simulations=`
    <p class="glossaryIntro">Every interactive Desmos model currently built into the course, collected in one place. Use <b>Open simulation</b> to jump directly to the live adjustable graph.</p>
    <div class="glossarySimulationGrid">
      ${desmosSimulations.map(sim=>`<article class="glossarySimulationCard">
        <div class="glossarySimulationMeta"><span>Lesson ${sim.lesson}</span><span>Desmos</span></div>
        <h3>${sim.name}</h3>
        <p>${sim.desc}</p>
        <button type="button" class="glossarySimulationOpen" data-sim-unit="${sim.unit}" data-sim-screen="${sim.screen}">Open simulation</button>
      </article>`).join('')}
    </div>`;

  function openSimulation(unitId,screenTitle){
    if(typeof units==='undefined' || typeof state==='undefined') return;
    const ui=units.findIndex(u=>u&&u.id===unitId);
    if(ui<0) return;
    const u=units[ui];
    let li=-1,si=-1;
    for(let i=0;i<u.lessons.length;i++){
      const found=u.lessons[i].screens.findIndex(s=>s&&s.title===screenTitle);
      if(found>=0){li=i;si=found;break;}
    }
    if(li<0||si<0) return;
    if(typeof rememberCoursePosition==='function') rememberCoursePosition(selectedCourseLesson);
    selectedCourseLesson=Number(u.courseLesson||1);
    localStorage.setItem('odeCourseLesson',String(selectedCourseLesson));
    state.courseLesson=selectedCourseLesson;
    state.unit=ui; state.lesson=li; state.screen=si;
    if(typeof selected!=='undefined') selected=null;
    if(typeof rememberCoursePosition==='function') rememberCoursePosition(selectedCourseLesson);
    if(typeof save==='function') save();
    closeGlossary();
    if(typeof renderCourseMap==='function') renderCourseMap();
    if(typeof render==='function') render();
    requestAnimationFrame(()=>document.getElementById('card')?.scrollIntoView({behavior:'smooth',block:'start'}));
  }

  function modalMarkup(){
    return `<div class="glossaryModal" id="glossaryModal" aria-hidden="true">
      <div class="glossaryPanel" role="dialog" aria-modal="true" aria-labelledby="glossaryTitle">
        <div class="glossaryHead">
          <div><div class="glossaryKicker">Always-available reference</div><h2 class="glossaryTitle" id="glossaryTitle">Engineering Mathematics Glossary</h2><p class="glossarySubtitle">Calculus formulas, ODE methods, applied engineering models, and interactive simulations in the same notation used by the course.</p></div>
          <button type="button" class="glossaryClose" aria-label="Close glossary">Close</button>
        </div>
        <div class="glossaryTabs" role="tablist" aria-label="Glossary sections">
          <button class="glossaryTab active" data-glossary-tab="calculus" role="tab" aria-selected="true">Derivatives &amp; integrals</button>
          <button class="glossaryTab" data-glossary-tab="first" role="tab" aria-selected="false">First-order ODE methods</button>
          <button class="glossaryTab" data-glossary-tab="higher" role="tab" aria-selected="false">Higher-order ODE methods</button>
          <button class="glossaryTab" data-glossary-tab="applied" role="tab" aria-selected="false">Applied ODE models</button>
          <button class="glossaryTab" data-glossary-tab="simulations" role="tab" aria-selected="false">Desmos simulations</button>
        </div>
        <div class="glossaryBody">
          <section class="glossarySection active" data-glossary-section="calculus">${calculus}</section>
          <section class="glossarySection" data-glossary-section="first">${firstOrder}</section>
          <section class="glossarySection" data-glossary-section="higher">${higherOrder}</section>
          <section class="glossarySection" data-glossary-section="applied">${appliedODE}</section>
          <section class="glossarySection" data-glossary-section="simulations">${simulations}</section>
        </div>
      </div>
    </div>`;
  }

  function setSection(id){
    const modal=document.getElementById('glossaryModal');
    if(!modal) return;
    modal.querySelectorAll('[data-glossary-tab]').forEach(btn=>{
      const on=btn.dataset.glossaryTab===id;
      btn.classList.toggle('active',on);
      btn.setAttribute('aria-selected',String(on));
    });
    modal.querySelectorAll('[data-glossary-section]').forEach(sec=>sec.classList.toggle('active',sec.dataset.glossarySection===id));
    const body=modal.querySelector('.glossaryBody');
    if(body) body.scrollTop=0;
    if(typeof window.queueMathTypeset==='function') window.queueMathTypeset(modal);
  }

  function openGlossary(section){
    const modal=document.getElementById('glossaryModal');
    if(!modal) return;
    if(section) setSection(section);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('glossaryOpen');
    requestAnimationFrame(()=>modal.querySelector('.glossaryClose')?.focus());
    if(typeof window.queueMathTypeset==='function') window.queueMathTypeset(modal);
  }

  function closeGlossary(){
    const modal=document.getElementById('glossaryModal');
    if(!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('glossaryOpen');
  }

  function buttonMarkup(cls){
    return `<button type="button" class="${cls}" aria-label="Open engineering mathematics glossary" title="Open glossary"><span class="glossaryToggleIcon" aria-hidden="true">∫</span><span class="glossaryToggleText">Glossary</span></button>`;
  }

  function install(){
    if(document.getElementById('glossaryModal')) return;
    document.body.insertAdjacentHTML('beforeend',modalMarkup());

    const desktopTheme=document.querySelector('.themeToggle');
    if(desktopTheme){
      desktopTheme.insertAdjacentHTML('beforebegin',buttonMarkup('glossaryToggle'));
      desktopTheme.previousElementSibling?.addEventListener('click',()=>openGlossary());
    }
    const mobileTheme=document.querySelector('.mobileThemeToggle');
    if(mobileTheme){
      mobileTheme.insertAdjacentHTML('beforebegin',buttonMarkup('mobileGlossaryToggle'));
      mobileTheme.previousElementSibling?.addEventListener('click',()=>openGlossary());
    }

    const modal=document.getElementById('glossaryModal');
    modal.querySelector('.glossaryClose')?.addEventListener('click',closeGlossary);
    modal.querySelectorAll('[data-glossary-tab]').forEach(btn=>btn.addEventListener('click',()=>setSection(btn.dataset.glossaryTab)));
    modal.querySelectorAll('[data-sim-unit]').forEach(btn=>btn.addEventListener('click',()=>openSimulation(btn.dataset.simUnit,btn.dataset.simScreen)));
    modal.addEventListener('click',e=>{if(e.target===modal) closeGlossary();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape' && modal.classList.contains('open')) closeGlossary();});
  }

  window.openGlossary=openGlossary;
  window.closeGlossary=closeGlossary;
  window.setGlossarySection=setSection;
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();