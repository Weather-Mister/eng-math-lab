/* Lesson 25 — Dec. 16: final-exam review, Q&A, and closing remarks.
   This lesson introduces no new examinable theory. It consolidates Parts 1–5. */

const l25Core='<span class="supplementalTag">Core · Dec. 16 syllabus · cumulative final review</span>';
const l25Explain='<span class="supplementalTag">Expanded explanation · recognition → execution → verification</span>';
const l25Recon='<span class="supplementalTag">Original cumulative review · not an O’Neil textbook exercise</span>';

function l25Board(title,prompt,solution,section='Original cumulative review'){
  return {type:'bookproblem',bookSection:section,practiceLabel:'Original cumulative review · not an O’Neil exercise',title,prompt,solution};
}

const l25Clairaut=l25Board(
  'Part 1 transfer — Clairaut family and singular solution',
  `<p>${l25Recon}</p><p>Solve the Clairaut equation</p><div class="eq">\\[y=x y'+(y')^2.\\]</div><p>Find both the one-parameter family and any singular solution, then verify them.</p>`,
  `<p>Let \\(p=y'\\). The equation is \\(y=xp+p^2\\). Differentiate with respect to \\(x\\):</p>
   <div class="eq">\\[p=p+(x+2p)p'.\\]</div>
   <p>Hence</p><div class="eq">\\[(x+2p)p'=0.\\]</div>
   <p><b>Branch 1: \\(p'=0\\).</b> Then \\(p=C\\), so</p><div class="eq">\\[\\boxed{y=Cx+C^2}.\\]</div>
   <p><b>Branch 2: \\(x+2p=0\\).</b> Then \\(p=-x/2\\). Substituting into the original Clairaut form gives</p>
   <div class="eq">\\[y=x(-x/2)+(-x/2)^2=\\boxed{-x^2/4}.\\]</div>
   <p><b>Verification.</b> For the family, \\(y'=C\\), and \\(xy'+(y')^2=Cx+C^2=y\\). For \\(y_s=-x^2/4\\), \\(y_s'=-x/2\\), and \\(xy_s'+(y_s')^2=-x^2/4=y_s\\).</p>
   <div class="whybox"><p><b>Trap:</b> dividing by \\(p'\\) would destroy the constant-slope family; dividing by \\(x+2p\\) would destroy the singular branch. Keep both factors.</p></div>`
);

const l25Higher=l25Board(
  'Part 2 transfer — repeated-root resonance',
  `<p>${l25Recon}</p><p>Solve</p><div class="eq">\\[y''+2y'+y=e^{-t}.\\]</div><p>Explain why the naive exponential trial must be modified.</p>`,
  `<p>The homogeneous characteristic polynomial is</p><div class="eq">\\[(r+1)^2=0,\\]</div><p>so</p><div class="eq">\\[y_h=(C_1+C_2t)e^{-t}.\\]</div>
   <p>The forcing \\(e^{-t}\\) corresponds to the repeated root \\(r=-1\\), already present with multiplicity two. Therefore multiply the usual trial by \\(t^2\\):</p>
   <div class="eq">\\[y_p=A t^2e^{-t}.\\]</div>
   <p>Because the left side is \\((D+1)^2y\\), where here \\(D=d/dt\\), write \\(y_p=e^{-t}v\\) with \\(v=At^2\\). Then</p>
   <div class="eq">\\[(D+1)(e^{-t}v)=e^{-t}v',\\qquad (D+1)^2(e^{-t}v)=e^{-t}v''=2Ae^{-t}.\\]</div>
   <p>Matching the forcing gives \\(2A=1\\), hence \\(A=1/2\\). Therefore</p>
   <div class="eq">\\[\\boxed{y=e^{-t}\\left(C_1+C_2t+\\frac{t^2}{2}\\right)}.\\]</div>
   <p>Substitution gives exactly \\(e^{-t}\\), confirming the particular term.</p>`
);

const l25Euler=l25Board(
  'Part 2 transfer — Euler–Cauchy repeated exponent',
  `<p>${l25Recon}</p><p>For \\(x>0\\), solve</p><div class="eq">\\[x^2y''-3xy'+4y=0.\\]</div>`,
  `<p>Try \\(y=x^m\\). Then</p><div class="eq">\\[m(m-1)-3m+4=0\\quad\\Rightarrow\\quad(m-2)^2=0.\\]</div>
   <p>The repeated exponent is \\(m=2\\). A repeated Euler root produces the pair \\(x^m\\) and \\(x^m\\ln x\\), so</p>
   <div class="eq">\\[\\boxed{y=x^2(C_1+C_2\\ln x)},\\qquad x>0.\\]</div>
   <p>The domain matters because the real logarithm shown here requires \\(x>0\\).</p>`
);

const l25Laplace=l25Board(
  'Part 3 transfer — switched forcing',
  `<p>${l25Recon}</p><p>Solve</p><div class="eq">\\[y'+y=H(t-2),\\qquad y(0)=0.\\]</div>`,
  `<p>Taking Laplace transforms gives</p><div class="eq">\\[(s+1)Y(s)=\\frac{e^{-2s}}{s}.\\]</div>
   <p>Thus</p><div class="eq">\\[Y(s)=e^{-2s}\\frac{1}{s(s+1)}=e^{-2s}\\left(\\frac1s-\\frac1{s+1}\\right).\\]</div>
   <p>The second-shift theorem yields</p><div class="eq">\\[\\boxed{y(t)=H(t-2)\\left(1-e^{-(t-2)}\\right)}.\\]</div>
   <p><b>Physical check.</b> The response is zero before switching, continuous at \\(t=2\\), and tends to the steady value 1 afterward.</p>`
);

const l25Impulse=l25Board(
  'Part 3 diagnostic — impulse response versus step response',
  `<p>${l25Recon}</p><p>A causal LTI system has transfer function</p><div class="eq">\\[G(s)=\\frac1{s+2}.\\]</div><p>Find its impulse response and its response to a unit step. Explain why they are different.</p>`,
  `<p>The impulse response is the inverse transform of the transfer function itself:</p><div class="eq">\\[\\boxed{g(t)=e^{-2t}}.\\]</div>
   <p>A unit step has transform \\(1/s\\), so</p><div class="eq">\\[Y(s)=\\frac1{s(s+2)}=\\frac12\\left(\\frac1s-\\frac1{s+2}\\right).\\]</div>
   <p>Hence the step response is</p><div class="eq">\\[\\boxed{y_{step}(t)=\\frac12(1-e^{-2t})}.\\]</div>
   <div class="whybox"><p>The impulse response characterizes the system itself. The step response is the convolution of that system response with a persistent unit input.</p></div>`
);

const l25Series=l25Board(
  'Part 4 transfer — derive a power-series recurrence',
  `<p>${l25Recon}</p><p>For a power-series solution about \\(x=0\\), derive the recurrence for</p><div class="eq">\\[y''+xy=0,\\qquad y=\\sum_{n=0}^{\\infty}a_nx^n.\\]</div>`,
  `<p>Differentiate:</p><div class="eq">\\[y''=\\sum_{n=0}^{\\infty}(n+2)(n+1)a_{n+2}x^n.\\]</div>
   <p>Also</p><div class="eq">\\[xy=\\sum_{n=0}^{\\infty}a_nx^{n+1}=\\sum_{n=1}^{\\infty}a_{n-1}x^n.\\]</div>
   <p>The \\(x^0\\) coefficient gives \\(2a_2=0\\), so \\(a_2=0\\). For \\(n\\ge1\\),</p>
   <div class="eq">\\[(n+2)(n+1)a_{n+2}+a_{n-1}=0,\\]</div>
   <p>therefore</p><div class="eq">\\[\\boxed{a_{n+2}=-\\frac{a_{n-1}}{(n+2)(n+1)}},\\qquad n\\ge1.\\]</div>
   <p>The low-index term must be handled separately before the two sums can be merged.</p>`
);

const l25Frobenius=l25Board(
  'Part 4 diagnostic — integer-separated indicial roots',
  `<p>${l25Recon}</p><p>Analyze</p><div class="eq">\\[x^2y''+xy'-y=0.\\]</div><p>Find the indicial roots and decide whether a nonzero logarithmic term is actually required.</p>`,
  `<p>Trying \\(y=x^r\\) gives</p><div class="eq">\\[r(r-1)+r-1=r^2-1=0,\\]</div><p>so \\(r_1=1\\), \\(r_2=-1\\). Their difference is the positive integer 2, so this is the integer-separated case.</p>
   <p>But the equation is also Euler–Cauchy, and the two direct solutions \\(x\\) and \\(x^{-1}\\) are already independent. Thus the logarithmic coefficient is zero here:</p>
   <div class="eq">\\[\\boxed{y=C_1x+C_2x^{-1}}.\\]</div>
   <div class="whybox"><p>Integer-separated roots mean a logarithmic term <em>may</em> be needed; they do not guarantee a nonzero log coefficient.</p></div>`
);

const l25Rank=l25Board(
  'Part 5 transfer — rank, nullity, and a null-space basis',
  `<p>${l25Recon}</p><p>For</p><div class="eq">\\[A=\\begin{pmatrix}1&2&-1\\\\2&4&-2\\end{pmatrix},\\]</div><p>find the rank, nullity, and a basis for \\(N(A)\\).</p>`,
  `<p>The second row is twice the first, so the RREF has one pivot row:</p><div class="eq">\\[\\operatorname{rank}(A)=1.\\]</div>
   <p>There are three columns, hence</p><div class="eq">\\[\\operatorname{nullity}(A)=3-1=2.\\]</div>
   <p>The equation is \\(x_1+2x_2-x_3=0\\). Let \\(x_2=s\\), \\(x_3=t\\); then \\(x_1=-2s+t\\). Therefore</p>
   <div class="eq">\\[X=s\\begin{pmatrix}-2\\\\1\\\\0\\end{pmatrix}+t\\begin{pmatrix}1\\\\0\\\\1\\end{pmatrix}.\\]</div>
   <p>A basis is</p><div class="eq">\\[\\boxed{\\left\\{(-2,1,0)^T,(1,0,1)^T\\right\\}}.\\]</div>`
);

const l25System=l25Board(
  'Part 5 transfer — solve a matrix system from eigenpairs',
  `<p>${l25Recon}</p><p>Solve</p><div class="eq">\\[X'=AX,\\qquad A=\\begin{pmatrix}0&1\\\\-2&-3\\end{pmatrix},\\qquad X(0)=\\begin{pmatrix}1\\\\0\\end{pmatrix}.\\]</div>`,
  `<p>The characteristic polynomial is</p><div class="eq">\\[\\lambda^2+3\\lambda+2=(\\lambda+1)(\\lambda+2),\\]</div><p>so \\(\\lambda_1=-1\\), \\(\\lambda_2=-2\\). Corresponding eigenvectors may be chosen as</p><div class="eq">\\[v_1=(1,-1)^T,\\qquad v_2=(1,-2)^T.\\]</div>
   <p>Thus</p><div class="eq">\\[X=c_1e^{-t}v_1+c_2e^{-2t}v_2.\\]</div>
   <p>At \\(t=0\\),</p><div class="eq">\\[c_1+c_2=1,\\qquad -c_1-2c_2=0.\\]</div><p>Hence \\(c_1=2\\), \\(c_2=-1\\), and</p>
   <div class="eq">\\[\\boxed{X(t)=2e^{-t}\\begin{pmatrix}1\\\\-1\\end{pmatrix}-e^{-2t}\\begin{pmatrix}1\\\\-2\\end{pmatrix}}.\\]</div>
   <p>Both eigenvalues are negative, so the origin is a nodal sink; the solution tends to zero.</p>`
);

const l25Mock=[
  l25Board('Final transfer 1 — separable IVP with interval',`<p>${l25Recon}</p><p>Solve \\(y'=x(1+y^2)\\), \\(y(0)=0\\), and state the maximal interval containing zero.</p>`,`<p>Separate and integrate:</p><div class="eq">\\[\\frac{dy}{1+y^2}=x\\,dx\\quad\\Rightarrow\\quad\\arctan y=\\frac{x^2}{2}+C.\\]</div><p>The IC gives \\(C=0\\), so \\(y=\\tan(x^2/2)\\). The nearest poles occur when \\(x^2/2=\\pi/2\\), hence</p><div class="eq">\\[\\boxed{y=\\tan(x^2/2),\\qquad -\\sqrt\\pi<x<\\sqrt\\pi}.\\]</div>`),
  l25Board('Final transfer 2 — exactness before potential',`<p>${l25Recon}</p><p>Solve \\(2xy\\,dx+x^2\\,dy=0\\) on an interval with \\(x\\ne0\\).</p>`,`<p>Set \\(M=2xy\\), \\(N=x^2\\). Then \\(M_y=2x=N_x\\), so the form is exact. A potential satisfies \\(\\phi_x=2xy\\), hence \\(\\phi=x^2y+g(y)\\). Matching \\(\\phi_y=x^2=N\\) gives \\(g'=0\\). Therefore</p><div class="eq">\\[\\boxed{x^2y=C},\\qquad x\\ne0.\\]</div><p>Equivalently \\(y=C/x^2\\) on any interval not crossing zero. Differentiating \\(x^2y=C\\) recovers the original differential form.</p>`),
  l25Board('Final transfer 3 — simple resonance',`<p>${l25Recon}</p><p>Find one particular solution of \\(y''-y=e^t\\).</p>`,`<p>The root \\(r=1\\) belongs to the homogeneous equation, so multiply the naive trial \\(Ae^t\\) by \\(t\\): try \\(y_p=Ate^t\\). Then \\(y_p''-y_p=2Ae^t\\), giving \\(A=1/2\\). Thus</p><div class="eq">\\[\\boxed{y_p=\\tfrac12te^t}.\\]</div>`),
  l25Board('Final transfer 4 — delayed second-order forcing',`<p>${l25Recon}</p><p>Solve \\(y''+y=H(t-\\pi)\\), \\(y(0)=y'(0)=0\\).</p>`,`<p>Transforming gives</p><div class="eq">\\[Y=\\frac{e^{-\\pi s}}{s(s^2+1)}=e^{-\\pi s}\\left(\\frac1s-\\frac{s}{s^2+1}\\right).\\]</div><p>Therefore</p><div class="eq">\\[\\boxed{y=H(t-\\pi)\\left[1-\\cos(t-\\pi)\\right]}.\\]</div><p>The response and its first derivative are zero immediately before the switch, consistent with the zero initial state.</p>`),
  l25Board('Final transfer 5 — series coefficient bookkeeping',`<p>${l25Recon}</p><p>For \\(y''+xy=0\\), express \\(a_3\\) and \\(a_4\\) in terms of \\(a_0,a_1\\).</p>`,`<p>From the recurrence \\(a_{n+2}=-a_{n-1}/[(n+2)(n+1)]\\) for \\(n\\ge1\\):</p><div class="eq">\\[a_3=-\\frac{a_0}{3\\cdot2}=-\\frac{a_0}{6},\\qquad a_4=-\\frac{a_1}{4\\cdot3}=-\\frac{a_1}{12}.\\]</div><p>Also \\(a_2=0\\) came from the isolated \\(x^0\\) coefficient.</p>`),
  l25Board('Final transfer 6 — consistency diagnosis',`<p>${l25Recon}</p><p>Row reduction of an augmented system produces the row \\([0\\;0\\;0\\mid 5]\\). What does this prove?</p>`,`<p>The row means \\(0=5\\), an impossibility. Therefore the system is inconsistent and has</p><div class="eq">\\[\\boxed{\\text{no solution}}.\\]</div><p>No choice of free variables can repair a contradictory pivot row.</p>`),
  l25Board('Final transfer 7 — determinant and invertibility',`<p>${l25Recon}</p><p>For \\(A=\\begin{pmatrix}2&1\\\\4&2\\end{pmatrix}\\), decide whether \\(A^{-1}\\) exists and explain the structural consequence for \\(AX=b\\).</p>`,`<p>\\(\\det A=2(2)-1(4)=0\\), so \\(A\\) is singular and has no inverse. Consequently \\(AX=b\\) cannot have a unique solution for every \\(b\\); depending on \\(b\\), it may have no solution or infinitely many.</p>`),
  l25Board('Final transfer 8 — phase portrait from eigenvalues',`<p>${l25Recon}</p><p>A real \\(2\\times2\\) system has eigenvalues \\(3\\) and \\(-2\\). Classify the equilibrium at the origin.</p>`,`<p>The eigenvalues have opposite signs, so one eigendirection grows while the other decays. Therefore the origin is a</p><div class="eq">\\[\\boxed{\\text{saddle, hence unstable}}.\\]</div>`),
  l25Board('Final transfer 9 — plane from a cross product',`<p>${l25Recon}</p><p>Find the plane through</p><div class="eq">\\[P_0=(1,0,0),\\qquad P_1=(1,1,0),\\qquad P_2=(1,0,2).\\]</div><p>Build a normal vector from the geometry rather than guessing the equation.</p>`,`<p>Two in-plane directions are</p><div class="eq">\\[a=P_1-P_0=(0,1,0),\\qquad b=P_2-P_0=(0,0,2).\\]</div><p>Their cross product is normal to the plane:</p><div class="eq">\\[a\\times b=(2,0,0).\\]</div><p>Use the simpler parallel normal \\(n=(1,0,0)\\). Then</p><div class="eq">\\[n\\cdot[(x,y,z)-P_0]=0\\quad\\Rightarrow\\quad x-1=0.\\]</div><div class="whybox"><div class="eq">\\[\\boxed{x=1}.\\]</div></div><p>All three supplied points have first coordinate 1, which independently verifies the result.</p>`),
  l25Board('Final transfer 10 — Gram–Schmidt on unseen vectors',`<p>${l25Recon}</p><p>Use Gram–Schmidt to construct an orthogonal basis for</p><div class="eq">\\[\\operatorname{span}\\{(1,1,0),(1,0,1)\\}.\\]</div>`,`<p>Let \\(v_1=(1,1,0)\\). For \\(x_2=(1,0,1)\\),</p><div class="eq">\\[\\frac{x_2\\cdot v_1}{v_1\\cdot v_1}=\\frac12.\\]</div><p>Subtract the projection:</p><div class="eq">\\[v_2=x_2-\\frac12v_1=\\left(\\frac12,-\\frac12,1\\right).\\]</div><p>Scale without changing its direction:</p><div class="eq">\\[v_2=(1,-1,2).\\]</div><p>Check \\(v_1\\cdot v_2=1-1=0\\). Hence</p><div class="whybox"><div class="eq">\\[\\boxed{\\{(1,1,0),(1,-1,2)\\}}\\]</div></div><p>is an orthogonal basis for the same span.</p>`),
  l25Board('Final transfer 11 — matrix order really matters',`<p>${l25Recon}</p><p>For</p><div class="eq">\\[A=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix},\\qquad B=\\begin{pmatrix}2&0\\\\1&3\\end{pmatrix},\\]</div><p>compute both \\(AB\\) and \\(BA\\).</p>`,`<p>Row-by-column multiplication gives</p><div class="eq">\\[AB=\\begin{pmatrix}4&6\\\\1&3\\end{pmatrix},\\qquad BA=\\begin{pmatrix}2&4\\\\1&5\\end{pmatrix}.\\]</div><div class="whybox"><div class="eq">\\[\\boxed{AB\\ne BA}.\\]</div></div><p>The calculation verifies the structural warning: matrix multiplication is generally not commutative.</p>`),
  l25Board('Final transfer 12 — Cramer’s rule with a determinant check',`<p>${l25Recon}</p><p>Use Cramer’s rule to solve</p><div class="eq">\\[2x+y=5,\\qquad x-y=1.\\]</div>`,`<p>The coefficient determinant is</p><div class="eq">\\[D=\\begin{vmatrix}2&1\\\\1&-1\\end{vmatrix}=-3\\ne0,\\]</div><p>so Cramer’s rule is legal. Replace the first column:</p><div class="eq">\\[D_x=\\begin{vmatrix}5&1\\\\1&-1\\end{vmatrix}=-6.\\]</div><p>Replace the second:</p><div class="eq">\\[D_y=\\begin{vmatrix}2&5\\\\1&1\\end{vmatrix}=-3.\\]</div><p>Therefore</p><div class="whybox"><div class="eq">\\[\\boxed{x=D_x/D=2,\\qquad y=D_y/D=1}.\\]</div></div><p>Substitution gives 5 and 1 respectively, verifying both equations.</p>`),
  l25Board('Final transfer 13 — diagonalize and use the diagonal form',`<p>${l25Recon}</p><p>Diagonalize</p><div class="eq">\\[A=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}\\]</div><p>and use the result to write a formula for \\(A^n\\).</p>`,`<p>The eigenvalues are \\(3\\) and \\(1\\), with eigenvectors \\(v_1=(1,1)^T\\) and \\(v_2=(1,-1)^T\\). Thus</p><div class="eq">\\[P=\\begin{pmatrix}1&1\\\\1&-1\\end{pmatrix},\\qquad D=\\begin{pmatrix}3&0\\\\0&1\\end{pmatrix},\\qquad P^{-1}=\\frac12\\begin{pmatrix}1&1\\\\1&-1\\end{pmatrix}.\\]</div><p>Since \\(A=PDP^{-1}\\),</p><div class="eq">\\[A^n=PD^nP^{-1}.\\]</div><div class="whybox"><div class="eq">\\[\\boxed{A^n=\\frac12\\begin{pmatrix}3^n+1&3^n-1\\\\3^n-1&3^n+1\\end{pmatrix}}.\\]</div></div><p>Setting \\(n=1\\) returns the original matrix, an immediate check.</p>`),
  l25Board('Final transfer 14 — complex eigenvalues and a stable spiral',`<p>${l25Recon}</p><p>For</p><div class="eq">\\[X'=AX,\\qquad A=\\begin{pmatrix}-1&-2\\\\2&-1\\end{pmatrix},\\]</div><p>find a real fundamental matrix and classify the origin.</p>`,`<p>The eigenvalues are \\(-1\\pm2i\\). The matrix is \\(-I+2J\\) with \\(J=\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}\\), so its exponential is decay times rotation:</p><div class="eq">\\[\\Phi(t)=e^{-t}\\begin{pmatrix}\\cos2t&-\\sin2t\\\\\\sin2t&\\cos2t\\end{pmatrix}.\\]</div><p>The two columns are independent real solutions. The factor \\(e^{-t}\\) shrinks every trajectory while the sine/cosine terms rotate it, hence</p><div class="whybox"><div class="eq">\\[\\boxed{\\text{the origin is an asymptotically stable spiral (spiral sink)}}.\\]</div></div>`),
  l25Board('Final transfer 15 — defective repeated eigenvalue',`<p>${l25Recon}</p><p>Solve</p><div class="eq">\\[X'=AX,\\qquad A=\\begin{pmatrix}2&1\\\\0&2\\end{pmatrix}.\\]</div><p>Explain why two ordinary eigenvector modes are unavailable.</p>`,`<p>The only eigenvalue is \\(\\lambda=2\\) with algebraic multiplicity two, but</p><div class="eq">\\[(A-2I)v=0\\]</div><p>gives only one eigendirection, \\(v=(1,0)^T\\). Writing \\(X=(x,y)^T\\), the second equation is \\(y'=2y\\), so \\(y=c_2e^{2t}\\). Then</p><div class="eq">\\[x'-2x=c_2e^{2t}.\\]</div><p>Set \\(x=e^{2t}u\\); then \\(u'=c_2\\), so \\(u=c_1+c_2t\\). Therefore</p><div class="whybox"><div class="eq">\\[\\boxed{X(t)=e^{2t}\\begin{pmatrix}c_1+c_2t\\\\c_2\\end{pmatrix}}.\\]</div></div><p>The \\(t e^{2t}\\) term is the generalized-mode analogue of a repeated-root factor in scalar ODEs.</p>`)
];

const l25ExamMatrix=[
  l25Board('Final selection 1 — first-order method matrix',`<p>${l25Recon}</p><p>Name the first method for each equation and give the structural clue: (A) \\(y'=(x+y)/x\\); (B) \\(y'+2y=xy^3\\); (C) \\(y'=y^2-y+x\\) when one particular solution is supplied; (D) a non-exact form \\(Mdx+Ndy=0\\) for which \\((M_y-N_x)/N\\) depends only on \\(x\\).</p>`,`<p><b>A:</b> homogeneous-ratio substitution \\(u=y/x\\), because the slope depends on \\(y/x\\).</p><p><b>B:</b> Bernoulli with \\(n=3\\); preserve any zero branch before using \\(v=y^{1-n}\\).</p><p><b>C:</b> Riccati reduction using the verified particular solution \\(S\\), then \\(y=S+1/z\\).</p><p><b>D:</b> an integrating factor \\(\\mu(x)\\), because the standard exactness-ratio test reduces to a function of \\(x\\) alone.</p><div class="whybox"><p>This is a method-selection check: identify structure before doing algebra.</p></div>`),
  l25Board('Final selection 2 — reduction of order versus variation of parameters',`<p>${l25Recon}</p><p>Choose the appropriate tool: (A) a homogeneous second-order linear ODE with one known nonzero solution \\(y_1\\); (B) a forced linear ODE with a known independent homogeneous basis \\(y_1,y_2\\) but forcing outside the undetermined-coefficients family.</p>`,`<p><b>A:</b> reduction of order: set \\(y_2=u(x)y_1(x)\\) and reduce the problem to an equation for \\(u'\\).</p><p><b>B:</b> variation of parameters: seek \\(y_p=u_1y_1+u_2y_2\\) and solve the standard two-equation system for \\(u_1',u_2'\\).</p><div class="whybox"><p>Both use a known homogeneous solution structure, but reduction of order finds a missing homogeneous direction while variation of parameters constructs a particular solution to a forced equation.</p></div>`),
  l25Board('Final selection 3 — BVP compatibility is not IVP uniqueness',`<p>${l25Recon}</p><p>For \\(y''+y=0\\), consider \\(y(0)=0\\) and \\(y(\\pi)=1\\). Without invoking an IVP uniqueness theorem, determine whether the boundary-value problem is compatible.</p>`,`<p>The general solution is \\(y=C_1\\cos x+C_2\\sin x\\). The first boundary condition gives \\(C_1=0\\). The second would require</p><div class="eq">\\[C_2\\sin\\pi=1,\\]</div><p>that is \\(0=1\\), which is impossible.</p><div class="whybox"><div class="eq">\\[\\boxed{\\text{No solution}}.\\]</div><p>A two-point BVP is governed by compatibility of the boundary-constant system, not by the same-point IVP uniqueness theorem.</p></div>`),
  l25Board('Final selection 4 — rebuild the engineering model before solving',`<p>${l25Recon}</p><p>Match each physical description to its governing linear ODE structure: (A) mass–spring–damper displacement under force; (B) series RLC charge under applied voltage; (C) Kelvin–Voigt strain under applied stress.</p>`,`<p><b>A:</b> Newton balance gives \\(my''+cy'+ky=F(t)\\).</p><p><b>B:</b> Kirchhoff voltage balance gives \\(Lq''+Rq'+q/C=E(t)\\).</p><p><b>C:</b> parallel spring/dashpot stresses add at the same strain, giving \\(\\sigma=E\\varepsilon+\\eta\\varepsilon'\\).</p><div class="whybox"><p>The exam skill is not formula recall alone: identify the physical balance/connection rule that creates the differential equation, then check units and limiting behavior.</p></div>`)
];

const lesson25Units=[
  {id:'l25-map',courseLesson:25,color:'#486d91',badge:'1',label:'Dec. 16 map',title:'Final Review: What This Lesson Is For',subtitle:'Parts 1–5 · Q&A · closing remarks · no new theory',desc:'Use the last class to connect methods, expose weak links, and rehearse verification rather than memorizing isolated formulas.',lessons:[{title:'Scope and strategy',screens:[
    {type:'teach',title:'The boundary: review, not a sixth part',html:`<p>${l25Core}</p><p>The Dec. 16 class is a <b>final-exam review/Q&A/closing session</b>. It should not introduce a new examinable method. Everything below consolidates material already taught in Parts 1–5.</p><div class="whybox"><p>The goal is not “Can I recognize a formula on sight?” It is “Can I classify an unfamiliar problem, justify the method, execute it, and verify the result?”</p></div>`},
    {type:'teach',title:'Five-part cumulative map',html:`<p>${l25Explain}</p><ol><li><b>Part 1 — first-order ODEs:</b> separable, homogeneous substitution, linear, exact/integrating factor, Bernoulli/Riccati, Clairaut, modeling and solution-loss/domain checks.</li><li><b>Part 2 — higher-order ODEs:</b> characteristic roots, Wronskians, reduction of order, undetermined coefficients, variation of parameters, Euler–Cauchy, applications/BVPs.</li><li><b>Part 3 — Laplace:</b> direct/inverse transforms, derivative rules, shifting, Heaviside/pulses, periodic forcing, convolution, impulse response, delta forcing and systems.</li><li><b>Part 4 — series:</b> ordinary-point power series, recurrence bookkeeping, regular-singular classification, indicial roots and Frobenius cases.</li><li><b>Part 5 — linear algebra/systems:</b> vectors/subspaces/bases, orthogonality, matrices, elimination/rank/nullity, systems, inverses/determinants, eigenstructure, diagonalization and \\(X'=AX\\).</li></ol>`},
    {type:'quiz',title:'Review-session rule',q:'A final-review problem appears to require a brand-new theorem never taught earlier. What should you conclude?',options:['It does not belong in this review unless the missing prerequisite is first identified as previously taught material','Memorize the theorem without context','Assume it will not matter'],answer:0,why:'The Dec. 16 lesson consolidates existing course material; it should not silently create new examinable theory.'}
  ]}]},

  {id:'l25-select',courseLesson:25,color:'#3e7b72',badge:'2',label:'Recognition',title:'Method Selection Before Algebra',subtitle:'structure first · formula second',desc:'Most exam errors begin before the first calculation: the equation is classified incorrectly or a theorem is applied without its hypotheses.',lessons:[{title:'Recognition circuit',screens:[
    {type:'teach',title:'Ask these questions in order',html:`<p>${l25Explain}</p><ol><li>What kind of object is this: scalar ODE, system, transform problem, series problem, or matrix problem?</li><li>What structural feature selects a method?</li><li>What assumptions/domain restrictions must hold?</li><li>What result should qualitatively make sense before calculation?</li><li>How will I verify the answer independently?</li></ol>`},
    {type:'quiz',title:'Clairaut recognition',q:'Which form most strongly signals a Clairaut equation?',options:['y = x y′ + f(y′)','y′ + P(x)y = Q(x)','M(x,y)dx + N(x,y)dy = 0 with M_y=N_x'],answer:0,why:'Clairaut equations have y=xp+f(p) with p=y′; differentiating produces distinct branches.'},
    {type:'quiz',title:'Resonance recognition',q:'In undetermined coefficients, what forces an extra factor of x or t in the trial?',options:['The naive trial overlaps the homogeneous solution space','The forcing contains any exponential','The ODE is second order'],answer:0,why:'The extra power removes overlap with the homogeneous null space.'},
    {type:'quiz',title:'Frobenius recognition',q:'What must be checked before using an ordinary Taylor-series method at x=x₀?',options:['Whether x₀ is an ordinary point of the normalized ODE','Whether the indicial roots are integers','Whether the forcing is periodic'],answer:0,why:'If the leading coefficient vanishes, the point may be singular and Frobenius analysis may be required.'}
  ]}]},

  {id:'l25-p1',courseLesson:25,color:'#8f5f47',badge:'3',label:'Part 1',title:'First-Order Synthesis',subtitle:'branches · domains · modeling · verification',desc:'Finish the first-order material by making branch preservation and method recognition automatic.',lessons:[{title:'Clairaut and branch safety',screens:[l25Clairaut,{type:'quiz',title:'Lost-branch warning',q:'After obtaining (x+2p)p′=0 in a Clairaut problem, why should you not divide immediately by either factor?',options:['Each factor defines a legitimate solution branch that division could discard','Because multiplication is forbidden','Because p can never be zero'],answer:0,why:'The product equation encodes two branches; solving both is essential.'}]}]},

  {id:'l25-p2',courseLesson:25,color:'#6e5d9a',badge:'4',label:'Part 2',title:'Higher-Order Synthesis',subtitle:'root structure · resonance · Euler form',desc:'Choose trial forms from the differential operator and the homogeneous solution space, not from memorized templates alone.',lessons:[{title:'Repeated roots and resonance',screens:[l25Higher,l25Euler]}]},

  {id:'l25-p3',courseLesson:25,color:'#34758a',badge:'5',label:'Part 3',title:'Laplace Synthesis',subtitle:'switches · systems · impulse response',desc:'Keep time-domain meaning attached to every transform manipulation.',lessons:[{title:'Delayed and impulsive inputs',screens:[l25Laplace,l25Impulse,{type:'quiz',title:'Shift theorem check',q:'What does a factor e^{-as} multiplying F(s) do in the time domain?',options:['Delays f by a and multiplies it by H(t−a)','Advances f by a','Differentiates f'],answer:0,why:'The second-shift theorem gives H(t−a)f(t−a).'}]}]},

  {id:'l25-p4',courseLesson:25,color:'#68763e',badge:'6',label:'Part 4',title:'Series Synthesis',subtitle:'low indices · recurrence · Frobenius cases',desc:'Keep the coefficient bookkeeping and theorem hypotheses visible.',lessons:[{title:'Series decisions',screens:[l25Series,l25Frobenius]}]},

  {id:'l25-p5',courseLesson:25,color:'#7a6640',badge:'7',label:'Part 5',title:'Linear Algebra & Systems Synthesis',subtitle:'rank/nullity · eigenmodes · stability',desc:'Connect elimination, vector spaces, eigenstructure, and dynamical systems.',lessons:[{title:'Structure and dynamics',screens:[l25Rank,l25System,{type:'quiz',title:'Diagonalization condition',q:'What is required to diagonalize an n×n matrix as A=PDP⁻¹?',options:['n linearly independent eigenvectors','n distinct matrix entries','A nonzero determinant only'],answer:0,why:'The columns of P must form an eigenvector basis. Distinct eigenvalues are sufficient, not necessary.'}]}]},

  {id:'l25-exam-matrix',courseLesson:25,color:'#5d6b88',badge:'8',label:'Exam selection',title:'Cumulative Method-Selection Matrix',subtitle:'4 targeted diagnostics · underrepresented Part 1–2 outcomes',desc:'Close the remaining cumulative review gaps without adding a repetitive problem bank.',lessons:[{title:'First-order selection',screens:l25ExamMatrix.slice(0,1)},{title:'Higher-order selection',screens:l25ExamMatrix.slice(1,3)},{title:'Engineering model selection',screens:l25ExamMatrix.slice(3,4)}]},

  {id:'l25-mastery',courseLesson:25,color:'#a24458',badge:'9',label:'Cumulative mastery',title:'Final Unseen Transfer Circuit',subtitle:'15 new problems · all five parts · explanation + verification',desc:'A cumulative circuit that closes the remaining review gaps without replaying the guided boards above.',lessons:[
    {title:'First-order transfer',screens:l25Mock.slice(0,2)},
    {title:'Higher-order & Laplace transfer',screens:l25Mock.slice(2,4)},
    {title:'Series & systems transfer',screens:l25Mock.slice(4,6)},
    {title:'Core linear algebra & stability',screens:l25Mock.slice(6,8)},
    {title:'Geometry, orthogonality & matrices',screens:l25Mock.slice(8,11)},
    {title:'Cramer, diagonalization & system modes',screens:l25Mock.slice(11,15)}
  ]}
];

if(!units.some(u=>u&&u.id==='l25-map')) units.push(...lesson25Units);
if(courseLessons[23]) courseLessons[23].status='complete';
courseLessons[24]={number:25,title:'Cumulative Final Review',subtitle:'Dec. 16 · Parts 1–5 · Q&A · closing remarks · no new examinable theory',status:'current'};
if(typeof renderCourseMap==='function') renderCourseMap();
if(typeof render==='function') render();