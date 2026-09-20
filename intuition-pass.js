/*
  Intuition pass — vivid mental models for concept-heavy screens.
  These are explanatory additions, not textbook quotations. The mathematical
  statements and source labels in the underlying lessons remain unchanged.
*/
(()=>{
  if(typeof units==='undefined') return;

  const lessonOf=u=>Number(u?.courseLesson||1);
  const findScreens=(lesson,title)=>{
    const out=[];
    for(const u of units){
      if(lesson!=null && lessonOf(u)!==Number(lesson)) continue;
      for(const l of (u.lessons||[])) for(const s of (l.screens||[])){
        if(s && s.title===title) out.push(s);
      }
    }
    return out;
  };

  const add=(lesson,title,key,html)=>{
    for(const s of findScreens(lesson,title)){
      if(s.type!=='teach' || typeof s.html!=='string') continue;
      const marker=`data-intuition-pass="${key}"`;
      if(s.html.includes(marker)) continue;
      s.html += `<div class="beginner" ${marker}><b>Mental model:</b> ${html}</div>`;
    }
  };

  const addWhy=(lesson,title,key,html)=>{
    for(const s of findScreens(lesson,title)){
      if(s.type!=='teach' || typeof s.html!=='string') continue;
      const marker=`data-intuition-pass="${key}"`;
      if(s.html.includes(marker)) continue;
      s.html += `<div class="whybox" ${marker}>${html}</div>`;
    }
  };

  // Lesson 6 — resonance: connect the overlap rule to the physical experience.
  add(6,'Off resonance: ω ≠ ω₀','resonance-off',String.raw`
    picture a playground swing being pushed at the <b>wrong rhythm</b>. Because the push rhythm and the swing's own rhythm are different, their phase relationship keeps changing. Some pushes add energy effectively; later pushes are less helpful or can partly oppose the motion. In the ideal undamped linear model, a sinusoidal forcing with \(\omega\neq\omega_0\) therefore produces a bounded forced response rather than the linearly growing resonant envelope.`);

  addWhy(6,'Exact resonance: ω = ω₀','resonance-swing',String.raw`
    <b>Why the swing example explains the extra factor \(t\).</b>
    <p>A swing has its own preferred rhythm, the natural frequency \(\omega_0\). If you push at the same favorable phase every cycle — in the direction that adds energy — each push reinforces the motion instead of drifting out of step.</p>
    <p>Mathematically, matching the driving frequency to \(\omega_0\) means the forcing shape \(\cos(\omega_0t)\) is already one of the homogeneous modes. The ordinary particular trial therefore gets annihilated by the differential operator. Multiplying by \(t\) creates a genuinely new trial direction.</p>
    <div class="eq">\[\text{frequency match}\;\Rightarrow\;\text{homogeneous overlap}\;\Rightarrow\;\times t\;\Rightarrow\;\text{growing envelope}.\]</div>
    <p>That last \(t\) is the mathematical version of “each correctly timed push adds another contribution.” In the ideal undamped model the envelope grows linearly. With positive damping, the unbounded growth disappears and the steady forced amplitude is finite.</p>`);

  // Lesson 7 — engineering models.
  add(7,'The mechanical–electrical analogy','rlc-same-movie',String.raw`
    think of the spring system and the series RLC circuit as <b>the same mathematical movie with different physical actors</b>. Mass and inductance multiply a second derivative, a damper and resistor dissipate energy, and a spring and capacitor provide energy-storage terms. Under the charge-displacement analogy, \(m\leftrightarrow L\), \(c\leftrightarrow R\), and \(k\leftrightarrow1/C\), so the same characteristic-root, damping, transient, and resonance logic reappears.`);

  add(7,'Derive the Maxwell equation','maxwell-honey',String.raw`
    imagine a spring connected end-to-end with a piston moving through thick honey. Because the elements are in <b>series</b>, they carry the same force/stress, while their extensions/strains add. The spring responds elastically; the honey-like dashpot can keep sliding while a constant stress is maintained. That is why the ideal Maxwell model can keep creeping instead of settling at a fixed total strain.`);

  add(7,'Derive the Kelvin–Voigt equation','kelvin-parallel',String.raw`
    now put the spring and the honey-filled dashpot <b>side-by-side between the same two plates</b>. They must undergo the same extension/strain, while their resisting forces/stresses add. The dashpot prevents a finite step stress from producing an instantaneous strain jump, while the spring sets the eventual elastic strain. So the ideal Kelvin–Voigt strain approaches its final value gradually.`);

  add(7,'What makes a problem a two-point BVP?','bvp-bridge',String.raw`
    picture a rod or cable constrained at <b>two different locations</b>, often its two ends. The differential equation describes what the material must do throughout the interior; the boundary conditions describe what the supports force at the boundaries. Unlike an IVP, you are not launching the solution from one point with a value and slope — you are asking whether one curve can satisfy constraints imposed from different points at once.`);

  // Lesson 8 — first encounter with Laplace.
  add(8,'Why introduce another domain?','laplace-translator',String.raw`
    treat the Laplace transform as a <b>translator</b>, not as “replace \(t\) with \(s\).” It integrates the whole time-domain function over \(t\ge0\), weighted by \(e^{-st}\), and produces a new function of \(s\). The reason engineers bother is that derivative rules turn time differentiation into multiplication by powers of \(s\) <em>plus explicit initial-data terms</em>, so many constant-coefficient IVPs become ordinary algebra in \(s\) before being translated back.`);

  // Lesson 10 — make the derivative rule feel like a feature, not a formula to memorize.
  add(10,'Why Laplace can make an ODE algebraic','laplace-initial-data-receipt',String.raw`
    imagine the transform attaching the starting state to the algebra like a <b>receipt</b>. A time derivative does not survive as a derivative of \(Y\): \(y'\) becomes \(sY-y(0)\), \(y''\) becomes \(s^2Y-sy(0)-y'(0)\), and so on. The powers of \(s\) encode differentiation, while the subtracted terms carry the initial conditions along automatically.`);

  // Lesson 11 — distinguish the two kinds of shift before using them.
  add(11,'Derive the first shifting theorem from the definition','first-vs-time-shift',String.raw`
    the <b>first shift is not a delay</b>. Multiplying the entire time signal by \(e^{at}\) changes its growth/decay envelope starting immediately at \(t=0\); in the \(s\)-domain that appears as \(F(s-a)\). A genuine delayed start is the different pattern \(e^{-as}F(s)\leftrightarrow H(t-a)f(t-a)\). Keep those two pictures separate.`);

  add(11,'Multiplying by H(t-a) gates a function','heaviside-switch',String.raw`
    \(H(t-a)\) is a <b>timer-controlled light switch</b>. Before time \(a\), the switch is off and whatever it multiplies is hidden. Under the course convention \(H(0)=1\), it is on from \(t=a\) onward and the original signal is allowed through. The switch controls <em>when</em> the signal appears; it does not automatically change the signal's internal clock unless the function itself is also written with \(t-a\).`);

  // Lesson 12 — repeated/scheduled inputs.
  add(12,'The common idea: input history matters','scheduled-inputs',String.raw`
    imagine programming a machine: “turn this load on at 3 s, turn it off at 5 s, repeat a pulse every 10 s.” Heaviside factors are the mathematical schedule. Laplace transform turns those timing instructions into exponential factors such as \(e^{-as}\), so one algebraic solution can carry the switching history without solving a brand-new IVP on every interval.`);

  add(12,'Periodic does not mean “use Heaviside repeatedly by hand”','periodic-stamp',String.raw`
    picture making wallpaper with one repeating <b>stamp</b>. You only need to describe one tile of width \(T\); every later copy is the same tile shifted by another \(T\). In the Laplace transform, those repeated shifted copies form a geometric series, which is why an infinite periodic history collapses to “one-period integral divided by \(1-e^{-sT}\).”`);

  add(12,'Build a staircase from unit steps','staircase-elevator',String.raw`
    think of an elevator display that increases by one floor at each scheduled time \(T,2T,3T,\ldots\). Every Heaviside term contributes one permanent +1 after its own switch time. Adding them builds a staircase: the <em>jump timing</em> repeats, but the level itself keeps increasing, so the staircase is not periodic.`);

  // Lesson 13 — convolution, system memory, and impulses.
  add(13,'What convolution is actually doing','convolution-echoes',String.raw`
    imagine every tiny past input creating a small <b>echo of the system's response</b>. In this lesson's input-output notation, an input applied at past time \(\tau\) contributes \(f(\tau)\), and by the present time \(t\) the system has had \(t-\tau\) seconds to respond, giving the weight \(g(t-\tau)\). Convolution adds all those contributions:
    <div class="eq">\[y(t)=\int_0^t g(t-\tau)f(\tau)\,d\tau.\]</div>
    Because convolution is commutative, the equivalent form \(\int_0^t f(t-\tau)g(\tau)d\tau\) is also correct; the roles should not be confused with the course's chosen input/impulse-response notation.`);

  add(13,'Why G(s) is called a transfer function','transfer-machine',String.raw`
    for a <b>linear time-invariant system with zero initial conditions</b>, think of the system as a machine whose internal construction stays fixed while you feed it different inputs. \(G(s)\) is the machine's input-output fingerprint: a new input \(F(s)\) produces \(Y(s)=G(s)F(s)\). In time, that same zero-state operation is convolution with \(g(t)=\mathcal L^{-1}\{G(s)\}\). Nonzero initial conditions contribute an additional zero-input response.`);

  add(13,'Impulse response is literally the response to δ(t)','impulse-hammer',String.raw`
    picture a very short <b>hammer tap</b>: enormous force for a tiny time, but with a fixed total impulse. The Dirac delta is the ideal limit of that idea. If the input is \(\delta(t)\), its Laplace transform is 1, so a zero-state system gives \(Y=G\). The output is therefore exactly \(g(t)\), which is why \(g\) is called the impulse response.`);

  // Lesson 14 — ordinary power series.
  add(14,'Why use an infinite series at all?','series-dna',String.raw`
    instead of guessing an entire difficult function in one shot, a power series lets the ODE reveal the function's <b>local recipe one coefficient at a time</b>. Think of \(a_0,a_1,a_2,\ldots\) as instructions for how the curve starts, slopes, bends, and continues bending near the expansion center. The recurrence relation is the ODE telling you how later instructions depend on earlier ones.`);

  add(14,'Singular point: ordinary Taylor machinery can break','singular-leading-coefficient',String.raw`
    the coefficient of \(y''\) is like the equation's <b>control over its highest derivative</b>. At an ordinary point that coefficient is nonzero, so you can divide by it and keep a regular equation nearby. At a singular point it vanishes; dividing may create terms such as \(1/(x-x_0)\) or \(1/(x-x_0)^2\). That does not mean “no solution” — it means the ordinary Taylor template may no longer be the right local language.`);

  // Lesson 15 — Frobenius.
  add(15,'The conceptual jump is only one exponent','frobenius-ladder',String.raw`
    an ordinary Taylor series about \(x_0=0\) is like a ladder whose rungs are \(x^0,x^1,x^2,\ldots\). At a regular singular point the solution may need to begin with a fractional or negative power that this ladder cannot represent. Frobenius keeps the rungs one power apart but lets the whole ladder start at an unknown height \(r\): \(x^r,x^{r+1},x^{r+2},\ldots\). More generally about \(x_0\), replace \(x\) by \(x-x_0\). The indicial equation determines the allowed starting exponent(s).`);

  // Lesson 17 — geometry of vector operations and basis.
  add(17,'What the dot product measures','projection-shadow',String.raw`
    think of one vector casting a <b>signed shadow</b> onto the direction of another. The signed scalar projection of \(u\) onto the direction of \(v\) is \((u\cdot v)/\|v\|\), so the dot product is that shadow length multiplied by \(\|v\|\). Equivalently, \(u\cdot v=\|u\|\|v\|\cos\theta\): positive means acute alignment, negative means obtuse/opposite alignment, and zero means perpendicular for nonzero vectors.`);

  add(17,'A basis must pass two tests','basis-coordinate-language',String.raw`
    a basis is a <b>minimal coordinate language</b> for a space. “Spans” means the vocabulary is rich enough to describe every vector in the space. “Independent” means no basis vector is redundant — none can be rebuilt from the others. The dimension is simply how many independent coordinate directions are needed.`);

  // Lesson 18 — orthogonalization, projection, and matrix composition.
  add(18,'The idea before the formula','gram-schmidt-shadow',String.raw`
    Gram–Schmidt is “<b>remove the shadows you already used</b>.” Keep the first direction. From the next vector, subtract its projection on that first direction; the leftover is perpendicular. For each new vector, remove all projections along the earlier orthogonal directions. What remains is a genuinely new perpendicular direction while the overall span stays the same.`);

  add(18,'S and S⊥','projection-floor',String.raw`
    imagine dropping a point straight down onto a flat floor. The landing point is the projection \(u_S\): the closest point in the subspace. The straight drop is the error \(u_\perp=u-u_S\), and it is perpendicular to every direction along the floor. The same geometry works in higher-dimensional subspaces even when you cannot draw them.`);

  add(18,'Why the dimension rule exists','matrix-pipeline',String.raw`
    view matrix multiplication as connecting two machines in a pipeline. In \(ABx\), <b>\(B\) acts first</b>, producing an intermediate vector, and \(A\) acts on that result. The inner dimensions must match because the output size of \(B\) must fit the input size expected by \(A\). Reversing the machines can give a different transformation — and for rectangular matrices the reversed product may not even be defined.`);

  // Lesson 19 — row reduction and rank/nullity.
  add(19,'The central idea','row-balance',String.raw`
    when a matrix represents a linear system, each row is an equation. Row operations are like rewriting a set of balance-scale statements without changing the values that can satisfy them. Swapping equations, multiplying an equation by a nonzero number, or adding a multiple of one equation to another are reversible moves, so the solution set is preserved.`);

  add(19,'Rank is the number of pivots','rank-locks',String.raw`
    think of each pivot as one <b>independent lock</b> placed on the unknowns. Rank counts how many independent constraints survive after all redundancy is removed. Every nonpivot column leaves one independent degree of freedom. That is the rank-nullity picture: constraints used up by pivots versus directions still free to move.`);

  // Lesson 20 — affine solution sets.
  add(20,'Why X = Xp + Xh','affine-slide',String.raw`
    imagine the null space as all the directions you are free to move without changing \(AX\). One particular solution \(X_p\) tells you where to place that whole shape so it reaches the required right-hand side \(B\). Thus every consistent nonhomogeneous solution set is the homogeneous null space <b>slid away from the origin</b>: \(X_p+N(A)\).`);

  add(20,'The augmented column matters','consistency-contradiction',String.raw`
    row reduction is also a contradiction detector. A row such as \([0\;0\;0\mid5]\) says “\(0=5\),” which no vector can satisfy. Free variables do <em>not</em> automatically mean infinitely many solutions; first make sure no impossible row has appeared in the augmented matrix.`);

  // Lesson 21 — inverses and determinants.
  add(21,'Definition and uniqueness','inverse-undo',String.raw`
    an invertible matrix transformation has an <b>undo button</b>. Apply \(A\), then \(A^{-1}\), and you recover exactly what you started with. A singular matrix collapses at least one independent direction, so two different inputs can produce the same output. Once that information is lost, no perfect inverse can reconstruct which input you started from.`);

  add(21,'From 2×2 to n×n','det-volume',String.raw`
    geometrically, a determinant measures the signed <b>area/volume scaling</b> of a square linear transformation. In 2D, \(|\det A|\) tells how the area of a unit square changes; in 3D it does the same for volume. If \(\det A=0\), some dimension has been flattened, so volume collapses to zero and the transformation cannot be inverted. The sign records orientation reversal.`);

  // Lesson 22 — eigenvectors and diagonalization.
  add(22,'The central idea','eigen-rubber',String.raw`
    imagine drawing arrows on a rubber sheet and then stretching/shearing the sheet according to \(A\). Most arrows leave their original lines. An eigenvector lies along a <b>special invariant line</b>: it can stretch, shrink, or reverse direction when \(\lambda<0\), but \(Av\) stays on the same line as \(v\). The eigenvalue \(\lambda\) is the signed scale factor along that line.`);

  add(22,'Why eigenvectors diagonalize A','diagonal-eigen-coordinates',String.raw`
    diagonalization is a <b>change to the matrix's natural coordinate axes</b>. Put independent eigenvectors into \(P\). In those coordinates, each basis direction evolves independently: the first coordinate is multiplied by \(\lambda_1\), the second by \(\lambda_2\), and so on. That independent scaling is exactly why \(P^{-1}AP\) becomes diagonal.`);

  // Lesson 23 — state-space dynamics.
  add(23,'A phase portrait removes time from the axes','phase-map',String.raw`
    a phase portrait is a <b>map of possible states rather than a graph against a clock</b>. Each point says “the system is currently in this state,” and the direction-field arrow there is tangent to the trajectory and shows the instantaneous direction of motion. A trajectory is the road followed from one initial state. For \(X'=AX\), real eigenvectors give invariant straight-line directions, while the eigenvalues determine growth or decay along them.`);

  add(23,'Interpret α ± iβ','complex-spiral',String.raw`
    a complex pair \(\alpha\pm i\beta\) combines two motions at once: \(e^{\alpha t}\) continuously scales the radius while the sine/cosine part rotates with angular frequency \(|\beta|\). Think “<b>scale while turning</b>.” If \(\alpha<0\), the turning path shrinks inward; if \(\alpha>0\), it expands outward; if \(\alpha=0\), the linear pure-imaginary case has no exponential radial growth or decay.`);

  // Lessons 9, 16, 24 and 25 are review/exam/presentation sessions rather than new conceptual blocks,
  // so this pass intentionally avoids adding decorative analogies there.

  if(typeof renderCourseMap==='function') renderCourseMap();
})();