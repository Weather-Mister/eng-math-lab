/* Lesson 2 — Linear Second-Order Equations
   Scope: NTU ME2001-02 Sep. 16, 2026; O'Neil §2.1.
   This file deliberately extends the stable app without rewriting Lesson 1.
*/

const lesson2CoreTag = '<span class="supplementalTag">Core · Sep. 16 syllabus · O’Neil §2.1</span>';
const lesson2DeepTag = '<span class="supplementalTag">Expanded explanation · built for understanding</span>';

const lesson2Units = [
  {
    id:"l2-foundations", courseLesson:2, color:"#4666c8", badge:"1", label:"Foundations",
    title:"Second-Order Foundations", subtitle:"What changes when y′′ enters the equation",
    desc:"Build the second-order picture from the ground up: standard form, two constants, two initial conditions, and the interval on which the theory is valid.",
    lessons:[
      {title:"What “second order” means",screens:[
        {type:"teach",title:"The new object: a linear second-order ODE",html:`
          <p>${lesson2CoreTag}</p>
          <p>A <b>second-order</b> ODE contains <span class="math">y′′</span> and no derivative of higher order. The central equation in this lesson is</p>
          <div class="eq">y′′ + p(x)y′ + q(x)y = f(x).</div>
          <div class="beginner"><b>Read every symbol:</b> <span class="math">x</span> is the independent variable, <span class="math">y=y(x)</span> is the unknown function, <span class="math">y′</span> is its rate of change, and <span class="math">y′′</span> is the rate of change of that rate. The known functions <span class="math">p(x)</span> and <span class="math">q(x)</span> are coefficients. The right-hand side <span class="math">f(x)</span> is called the <b>forcing</b>: it represents an external input or source acting on the system. All three depend only on <span class="math">x</span>.</div>
          <p>The equation is <b>linear in y</b>: <span class="math">y,y′,y′′</span> occur only to the first power, they are not multiplied together, and functions such as <span class="math">sin(y)</span> do not appear.</p>`},
        {type:"quiz",title:"Order and linearity",q:`Which equation is a <b>linear second-order</b> ODE?`,options:[`y′′+x y′−3y=e^x`,`(y′′)²+y=0`,`y′′+sin(y)=x`],answer:0,why:`The first equation has highest derivative y′′ and is linear in y, y′, and y′′. The other two are nonlinear.`},
        {type:"teach",title:"Standard form requires a nonzero leading coefficient",html:`
          <p>${lesson2DeepTag}</p>
          <p>You may first see a linear equation as</p>
          <div class="eq">a(x)y′′ + b(x)y′ + c(x)y = r(x).</div>
          <p>To use the theorems in this lesson, divide by <span class="math">a(x)</span>:</p>
          <div class="eq">y′′ + (b(x)/a(x))y′ + (c(x)/a(x))y = r(x)/a(x).</div>
          <p>This normalized form, with coefficient <span class="math">1</span> in front of <span class="math">y′′</span>, is what this lesson means by <b>standard form</b>.</p>
          <div class="warn"><b>Interval warning:</b> this division is valid only where <span class="math">a(x)≠0</span>. A point where the leading coefficient vanishes can split the problem into separate intervals. This detail matters later when using the Wronskian test.</div>`},
        {type:"quiz",title:"Where is standard form valid?",q:`For <span class="math">x y′′+y′−y=0</span>, on which intervals can you divide by the leading coefficient and obtain the standard form used by the theorems?`,options:[`Any interval that does not cross x=0`,`Only x>0`,`The entire real line`],answer:0,why:`You must divide by x, so x=0 is excluded. Separate intervals such as (−∞,0) and (0,∞) are valid.`}
      ]},
      {title:"Why two initial conditions?",screens:[
        {type:"teach",title:"One extra derivative means one extra constant",html:`
          <p>${lesson2CoreTag}</p>
          <p>Start with the textbook’s simplest structural example:</p>
          <div class="eq">y′′=12x.</div>
          <p>Integrate once:</p>
          <div class="eq">y′=6x²+C₁.</div>
          <p>Integrate again:</p>
          <div class="eq">y=2x³+C₁x+C₂.</div>
          <div class="whybox"><b>Why are there two arbitrary constants?</b> Because recovering <span class="math">y</span> from <span class="math">y′′</span> requires two integrations. Each integration introduces one independent constant.</div>`},
        {type:"teach",title:"A position condition alone cannot select one curve",html:`
          <p>Impose only <span class="math">y(0)=−3</span> on</p>
          <div class="eq">y=2x³+C₁x+C₂.</div>
          <p>Substituting <span class="math">x=0</span> gives</p>
          <div class="eq">−3=C₂.</div>
          <p>So the whole family</p>
          <div class="eq">y=2x³+C₁x−3</div>
          <p>passes through the same point <span class="math">(0,−3)</span>. The free constant <span class="math">C₁</span> changes the slope there.</p>
          <div class="tip"><b>Geometric picture:</b> for a second-order equation, knowing the point is normally not enough. You also specify the tangent slope.</div>`},
        {type:"teach",title:"The second condition fixes the slope",html:`
          <p>${lesson2CoreTag}</p>
          <p>Differentiate the family:</p>
          <div class="eq">y′=6x²+C₁.</div>
          <p>If we additionally require <span class="math">y′(0)=−1</span>, then</p>
          <div class="eq">−1=C₁.</div>
          <p>Both constants are now fixed:</p>
          <div class="eq">y=2x³−x−3.</div>
          <p>This is the core pattern for a second-order IVP:</p>
          <div class="eq">y(x₀)=A,  y′(x₀)=B.</div>`},
        {type:"quiz",title:"How many conditions?",q:`A general second-order solution contains two independent constants. Which data normally determine one particular solution?`,options:[`y(x₀) and y′(x₀)`,`Only y(x₀)`,`y(x₀) and y(x₁) must always be used`],answer:0,why:`The standard initial-value data are the value and first derivative at the same point: y(x₀)=A and y′(x₀)=B.`}
      ]},
      {title:"Existence, uniqueness, and scope",screens:[
        {type:"teach",title:"What the uniqueness theorem actually promises",html:`
          <p>${lesson2CoreTag}</p>
          <p>Suppose <span class="math">p(x),q(x),f(x)</span> are continuous on an open interval <span class="math">I</span> containing <span class="math">x₀</span>. Then the IVP</p>
          <div class="eq">y′′+p(x)y′+q(x)y=f(x),  y(x₀)=A,  y′(x₀)=B</div>
          <p>has exactly one solution on that interval.</p>
          <div class="beginner"><b>Existence</b> means a solution is there. <b>Uniqueness</b> means two different solution curves cannot have the same value and the same slope at <span class="math">x₀</span> while both satisfy the same equation on <span class="math">I</span>.</div>`},
        {type:"teach",title:"Why the interval condition is not decoration",html:`
          <p>${lesson2DeepTag}</p>
          <p>The theorem is local to an interval on which the standard-form coefficients stay continuous. If dividing by the leading coefficient creates <span class="math">1/x</span>, then <span class="math">x=0</span> is not part of such an interval.</p>
          <p>This will explain an important Wronskian caveat later: a theorem that assumes continuous standard-form coefficients cannot be applied across a singular point.</p>`},
        {type:"quiz",title:"Uniqueness conditions",q:`For <span class="math">y′′+(1/x)y′+y=0</span> with data prescribed at <span class="math">x₀=2</span>, which interval is suitable for the standard theorem?`,options:[`(0,∞)`,`(−1,3)`,`All real x`],answer:0,why:`p(x)=1/x is continuous on (0,∞), which contains x₀=2. Intervals crossing 0 violate the continuity assumption.`},
        {type:"teach",title:"Scope boundary: what we are not doing yet",html:`
          <p>${lesson2CoreTag}</p>
          <div class="warn"><b>Do not jump ahead:</b> this lesson is about the <em>structure</em> of solutions. The Sep. 21 syllabus session introduces reduction of order and the constant-coefficient homogeneous method. Here, candidate solutions such as <span class="math">sin x</span> or <span class="math">e^x</span> will be <b>given</b> and verified rather than generated by a characteristic equation.</div>
          <p>Today’s goal is to know what two solutions must do, how to test them, and how they assemble into every solution.</p>`}
      ]}
    ]
  },

  {
    id:"l2-superposition", courseLesson:2, color:"#5b55bd", badge:"2", label:"Structure",
    title:"Superposition & Independence", subtitle:"Why linear homogeneous equations form a solution family",
    desc:"Understand the linear-operator reason superposition works, why nonhomogeneous equations are different, and what “independent” really means.",
    lessons:[
      {title:"Superposition from linearity",screens:[
        {type:"teach",title:"Package the left side as one operator",html:`
          <p>${lesson2DeepTag}</p>
          <p>Write the homogeneous equation as</p>
          <div class="eq">L[y]=y′′+p(x)y′+q(x)y=0.</div>
          <p>The key fact is that <span class="math">L</span> is linear:</p>
          <div class="eq">L[c₁y₁+c₂y₂]=c₁L[y₁]+c₂L[y₂].</div>
          <p>If <span class="math">L[y₁]=0</span> and <span class="math">L[y₂]=0</span>, then</p>
          <div class="eq">L[c₁y₁+c₂y₂]=c₁·0+c₂·0=0.</div>
          <div class="whybox"><b>This is superposition.</b> Any constant linear combination of homogeneous solutions is another homogeneous solution. It is not a memorized coincidence; it is a direct consequence of linearity.</div>`},
        {type:"bookproblem",title:"Textbook example — superposition with sine and cosine",practiceLabel:"Textbook example · O’Neil §2.1",prompt:`
          <p>Verify that <span class="math">y₁=sin x</span> and <span class="math">y₂=cos x</span> solve <span class="math">y′′+y=0</span>. Then explain, using linearity, why <span class="math">c₁sin x+c₂cos x</span> also solves the equation for any constants <span class="math">c₁,c₂</span>.</p>`,solution:`
          <p><b>1. Verify the first solution.</b> If <span class="math">y₁=sin x</span>, then</p>
          <div class="eq">y₁′=cos x,  y₁′′=−sin x.</div>
          <p>Substitute into the ODE:</p>
          <div class="eq">y₁′′+y₁=−sin x+sin x=0.</div>
          <p><b>2. Verify the second solution.</b> If <span class="math">y₂=cos x</span>, then</p>
          <div class="eq">y₂′=−sin x,  y₂′′=−cos x.</div>
          <p>Substitute:</p>
          <div class="eq">y₂′′+y₂=−cos x+cos x=0.</div>
          <p><b>3. Use superposition.</b> For <span class="math">L[y]=y′′+y</span>, linearity gives</p>
          <div class="eq">L[c₁y₁+c₂y₂]=c₁L[y₁]+c₂L[y₂]=c₁·0+c₂·0=0.</div>
          <div class="whybox">So every constant linear combination <span class="math">c₁sin x+c₂cos x</span> is also a solution.</div>`},
        {type:"quiz",title:"Use superposition",q:`Given that <span class="math">y₁</span> and <span class="math">y₂</span> solve <span class="math">y′′+p(x)y′+q(x)y=0</span>, which is guaranteed to be another solution?`,options:[`5y₁−2y₂`,`y₁y₂`,`y₁²+y₂²`],answer:0,why:`A constant linear combination is guaranteed by superposition. Products and squares are not.`},
        {type:"teach",title:"A naming trap: two meanings of homogeneous",html:`
          <p>${lesson2CoreTag}</p>
          <div class="warn"><b>Important terminology:</b> in Lesson 1, a first-order “homogeneous” equation meant one reducible through the ratio <span class="math">y/x</span>. Here, a <b>linear homogeneous</b> second-order equation means simply that the forcing side is zero:</div>
          <div class="eq">y′′+p(x)y′+q(x)y=0.</div>
          <p>The two uses of the word are unrelated. Always identify the context.</p>`}
      ]},
      {title:"Why superposition fails with forcing",screens:[
        {type:"teach",title:"The zero on the right is doing real work",html:`
          <p>${lesson2DeepTag}</p>
          <p>Suppose instead that two functions satisfy the same nonhomogeneous equation</p>
          <div class="eq">L[Y₁]=f(x),  L[Y₂]=f(x).</div>
          <p>Then their sum gives</p>
          <div class="eq">L[Y₁+Y₂]=L[Y₁]+L[Y₂]=2f(x),</div>
          <p>which is generally <b>not</b> the original forcing <span class="math">f(x)</span>.</p>
          <div class="tip">The homogeneous case is special because any constants multiplying zero still add to zero.</div>`},
        {type:"quiz",title:"The forcing trap",q:`If <span class="math">L[Y₁]=f</span> and <span class="math">L[Y₂]=f</span>, what is <span class="math">L[Y₁+Y₂]</span>?`,options:[`2f`,`f`,`0`],answer:0,why:`Linearity gives L[Y₁+Y₂]=L[Y₁]+L[Y₂]=f+f=2f.`},
        {type:"teach",title:"But the difference cancels the forcing",html:`
          <p>${lesson2CoreTag}</p>
          <p>The useful operation is subtraction:</p>
          <div class="eq">L[Y₁−Y₂]=L[Y₁]−L[Y₂]=f−f=0.</div>
          <p>So the difference between <b>any two solutions of the same forced linear equation</b> is a solution of its associated homogeneous equation.</p>
          <p>Keep this fact. It will become the whole structure theorem for nonhomogeneous equations later in this lesson.</p>`}
      ]},
      {title:"Linear independence",screens:[
        {type:"teach",title:"Two solutions are useful only if they add new information",html:`
          <p>${lesson2CoreTag}</p>
          <p>If <span class="math">y₂=k y₁</span> for one constant <span class="math">k</span> throughout the interval, then</p>
          <div class="eq">c₁y₁+c₂y₂=(c₁+k c₂)y₁.</div>
          <p>Although two symbols appear, the family still has only one independent shape. The pair is called <b>linearly dependent</b>.</p>
          <p>If neither solution is a constant multiple of the other on the interval, they are <b>linearly independent</b>.</p>`},
        {type:"teach",title:"Dependent versus independent",html:`
          <div class="reviewGrid">
            <div class="mini"><b>Dependent</b><div class="eq">y₁=e^x,  y₂=3e^x</div><p>The second is exactly three times the first.</p></div>
            <div class="mini"><b>Independent</b><div class="eq">y₁=sin x,  y₂=cos x</div><p>No single constant turns one into the other on an interval.</p></div>
          </div>
          <div class="beginner"><b>Intuition:</b> independent solutions give two genuinely different directions in the two-parameter solution family.</div>`},
        {type:"quiz",title:"Spot dependence",q:`Which pair is linearly dependent on the real line?`,options:[`e^x and −7e^x`,`sin x and cos x`,`e^x and x e^x`],answer:0,why:`−7e^x is a constant multiple of e^x. The other pairs are not constant multiples on the whole interval.`},
        {type:"teach",title:"Why “on an interval” matters",html:`
          <p>${lesson2DeepTag}</p>
          <p>Independence is a statement about functions over an entire interval, not about whether their values happen to match at one point. Two different functions can both equal zero at the same <span class="math">x</span> and still be independent.</p>
          <p>We therefore need a test that uses both function values and slopes in the way appropriate to a second-order ODE. That test is the <b>Wronskian</b>.</p>`}
      ]}
    ]
  },

  {
    id:"l2-wronskian", courseLesson:2, color:"#8a4fb0", badge:"3", label:"Independence test",
    title:"The Wronskian", subtitle:"A one-number test with important assumptions",
    desc:"Learn the Wronskian from first principles, compute it without skipped derivative steps, understand its theorem, and know exactly when the shortcut is legal.",
    lessons:[
      {title:"Build the Wronskian",screens:[
        {type:"teach",title:"The formula — no determinant background required",html:`
          <p>${lesson2CoreTag}</p>
          <p>For two differentiable functions <span class="math">y₁,y₂</span>, define</p>
          <div class="eq">W[y₁,y₂](x)=y₁y₂′−y₂y₁′.</div>
          <div class="beginner"><b>You do not need a linear-algebra course yet.</b> The book writes this as a 2×2 determinant. For now, compute it as “first function times second slope minus second function times first slope.”</div>
          <p>The Wronskian compares the pair’s <b>values and slopes at the same point</b> — exactly the two pieces of information that control a second-order IVP.</p>`},
        {type:"bookproblem",title:"Textbook Wronskian example",practiceLabel:"Textbook example · O’Neil §2.1",prompt:`
          <p>For <span class="math">y₁=e^(−x)</span> and <span class="math">y₂=x e^(−x)</span>, compute <span class="math">W[y₁,y₂](x)</span> and use it to decide whether the pair is linearly independent.</p>`,solution:`
          <p><b>1. Differentiate y₁.</b></p>
          <div class="eq">y₁′=−e^(−x).</div>
          <p><b>2. Differentiate y₂ with the product rule.</b></p>
          <div class="eq">y₂′=1·e^(−x)+x(−e^(−x))=(1−x)e^(−x).</div>
          <p><b>3. Substitute into the Wronskian formula.</b></p>
          <div class="eq">W=y₁y₂′−y₂y₁′</div>
          <div class="eq">=e^(−x)(1−x)e^(−x)−x e^(−x)(−e^(−x)).</div>
          <p>Factor <span class="math">e^(−2x)</span>:</p>
          <div class="eq">W=(1−x)e^(−2x)+x e^(−2x)=e^(−2x).</div>
          <p>Because <span class="math">e^(−2x)>0</span> for every real <span class="math">x</span>, <span class="math">W</span> is never zero, so the pair is linearly independent.</p>`},
        {type:"quiz",title:"Compute a simple Wronskian",q:`For <span class="math">y₁=sin x</span> and <span class="math">y₂=cos x</span>, what is <span class="math">W=y₁y₂′−y₂y₁′</span>?`,options:[`−1`,`1`,`0`],answer:0,why:`y₁′=cos x and y₂′=−sin x, so W=−sin²x−cos²x=−1.`},
        {type:"teach",title:"Sign does not matter — zero versus nonzero does",html:`
          <p>A Wronskian of <span class="math">−1</span>, <span class="math">7</span>, or <span class="math">e^(−2x)</span> can all certify independence. The test is not asking whether <span class="math">W</span> is positive.</p>
          <div class="eq">W(x₀)≠0  ⇒  the two functions are independent.</div>
          <p>This direction needs no special ODE theorem: if the functions were dependent, one would be a constant multiple of the other and their Wronskian would be zero everywhere.</p>
          <div class="warn"><b>The subtle direction is W(x₀)=0.</b> A zero at one point does <em>not</em> prove dependence for arbitrary functions. That conclusion becomes valid when the two functions solve the same homogeneous second-order linear ODE and its standard-form coefficients are continuous on the interval, as taught next.</div>`}
      ]},
      {title:"The Wronskian theorem",screens:[
        {type:"teach",title:"For ODE solutions, checking one point is enough",html:`
          <p>${lesson2CoreTag}</p>
          <p>Let <span class="math">y₁,y₂</span> solve</p>
          <div class="eq">y′′+p(x)y′+q(x)y=0</div>
          <p>on an open interval <span class="math">I</span>, with the standard-form coefficients continuous there. Then their Wronskian has an all-or-nothing behavior:</p>
          <div class="eq">W is identically 0 on I,  or  W is never 0 on I.</div>
          <p>Therefore, if you find <b>one</b> point <span class="math">x₀∈I</span> with <span class="math">W(x₀)≠0</span>, the pair is linearly independent on the whole interval.</p>`},
        {type:"quiz",title:"Use the one-point shortcut",q:`Two solutions of the same homogeneous second-order linear ODE have continuous standard-form coefficients on an interval. You calculate <span class="math">W(2)=5</span>. What follows?`,options:[`They are independent on the interval`,`They are independent only at x=2`,`Nothing can be concluded`],answer:0,why:`Under the theorem’s hypotheses, a nonzero Wronskian at one point means it is never zero on the interval, so the solutions are independent there.`},
        {type:"teach",title:"Why the Wronskian cannot cross through zero",html:`
          <p>${lesson2DeepTag}</p>
          <p>This is the idea behind the textbook’s follow-up problem, and it connects directly to Lesson 1.</p>
          <p>Start from</p>
          <div class="eq">W=y₁y₂′−y₂y₁′.</div>
          <p>Differentiate with the product rule:</p>
          <div class="eq">W′=y₁′y₂′+y₁y₂′′−y₂′y₁′−y₂y₁′′.</div>
          <p>The first and third terms cancel:</p>
          <div class="eq">W′=y₁y₂′′−y₂y₁′′.</div>
          <p>Because each <span class="math">yᵢ</span> solves <span class="math">y′′+py′+qy=0</span>,</p>
          <div class="eq">yᵢ′′=−p yᵢ′−q yᵢ.</div>
          <p>Substitute both second derivatives:</p>
          <div class="eq">W′=−p(y₁y₂′−y₂y₁′)−q(y₁y₂−y₂y₁)=−pW.</div>
          <p>So <span class="math">W</span> itself satisfies the first-order equation</p>
          <div class="eq">W′+p(x)W=0.</div>`},
        {type:"teach",title:"Finish the argument with a Lesson 1 method — without dividing by W",html:`
          <p>${lesson2DeepTag}</p>
          <p>The first-order equation <span class="math">W′+pW=0</span> is linear. Use the Lesson 1 integrating-factor method so the zero solution is never divided out.</p>
          <p>Choose</p><div class="eq">I(x)=e^(∫p(x)dx).</div>
          <p>Multiplying the equation by <span class="math">I</span> gives</p><div class="eq">IW′+IpW=0.</div>
          <p>Because <span class="math">I′=pI</span>, the left side is one product derivative:</p><div class="eq">(IW)′=0.</div>
          <p>Integrate:</p><div class="eq">IW=C.</div>
          <p>Therefore</p><div class="eq">W=C e^(−∫p(x)dx).</div>
          <p>The exponential factor never vanishes. If <span class="math">C=0</span>, then <span class="math">W≡0</span>; if <span class="math">C≠0</span>, then <span class="math">W</span> never vanishes.</p>
          <div class="whybox"><b>This is why one point is enough.</b> The integrating-factor derivation includes the zero-Wronskian branch automatically and avoids the invalid step of dividing by <span class="math">W</span> before knowing it is nonzero.</div>`}
      ]},
      {title:"Wronskian caveats",screens:[
        {type:"teach",title:"A zero Wronskian at one point is NOT a universal dependence test",html:`
          <p>${lesson2CoreTag}</p>
          <p>For arbitrary differentiable functions, <span class="math">W(x₀)=0</span> at one point does not by itself prove dependence.</p>
          <p>Example:</p>
          <div class="eq">y₁=x²,  y₂=x³.</div>
          <p>Then <span class="math">y₁′=2x</span> and <span class="math">y₂′=3x²</span>, so</p>
          <div class="eq">W=x²(3x²)−x³(2x)=x⁴.</div>
          <p>Here <span class="math">W(0)=0</span>, yet <span class="math">x²</span> and <span class="math">x³</span> are not constant multiples on an interval.</p>
          <div class="warn">The one-point theorem requires the functions to be solutions of the same homogeneous linear second-order ODE on a valid interval with the required coefficient continuity.</div>`},
        {type:"quiz",title:"Do the assumptions hold?",q:`You are given two arbitrary differentiable functions, not known to solve the same ODE, and find <span class="math">W(0)=0</span>. Which conclusion is justified?`,options:[`No dependence conclusion from that fact alone`,`They must be dependent`,`They must be independent`],answer:0,why:`A zero Wronskian at one point forces dependence only for solutions of the same homogeneous linear second-order ODE when the standard-form coefficients are continuous on the interval. Arbitrary functions can have W=0 at isolated points.`},
        {type:"teach",title:"A singular leading coefficient can break the shortcut",html:`
          <p>${lesson2DeepTag}</p>
          <p>Consider an equation whose leading coefficient vanishes at some point. If putting it into standard form forces division by zero, then the continuity assumptions behind the theorem fail there.</p>
          <p>So before using “check W at any one point,” ask:</p>
          <ol class="steps"><li>Are both functions solutions of the <b>same</b> homogeneous equation?</li><li>Can the equation be put in standard form on the whole interval?</li><li>Are <span class="math">p</span> and <span class="math">q</span> continuous there?</li></ol>`},
        {type:"quiz",title:"Wronskian theorem checklist",q:`What should you verify <b>before</b> using one Wronskian value as a whole-interval independence test?`,options:[`Same homogeneous ODE + valid continuous standard-form coefficients on the interval`,`Only that both functions are differentiable`,`Only that x₀ is positive`],answer:0,why:`Those are the structural hypotheses that give the Wronskian its all-or-nothing behavior.`}
      ]}
    ]
  },

  {
    id:"l2-general", courseLesson:2, color:"#b04d83", badge:"4", label:"General solution",
    title:"General Homogeneous Solution", subtitle:"Why two independent solutions contain every solution",
    desc:"Move from “these are solutions” to the stronger statement “these generate all solutions,” then use initial conditions without skipping the constant-solving algebra.",
    lessons:[
      {title:"The general-solution theorem",screens:[
        {type:"teach",title:"Two independent solutions form the complete family",html:`
          <p>${lesson2CoreTag}</p>
          <p>If <span class="math">p,q</span> are continuous on an open interval <span class="math">I</span>, and <span class="math">y₁,y₂</span> are linearly independent solutions of</p>
          <div class="eq">y′′+p(x)y′+q(x)y=0,</div>
          <p>then <b>every</b> solution on <span class="math">I</span> has the form</p>
          <div class="eq">y=c₁y₁+c₂y₂.</div>
          <div class="whybox">Superposition tells us that this expression gives solutions. Independence + uniqueness give the stronger fact that it gives <b>all</b> solutions.</div>`},
        {type:"teach",title:"Why “all solutions” follows — step 1",html:`
          <p>${lesson2DeepTag}</p>
          <p>Take any solution <span class="math">φ(x)</span>. Choose one point <span class="math">x₀∈I</span> and record its value and slope:</p>
          <div class="eq">A=φ(x₀),  B=φ′(x₀).</div>
          <p>We want a combination <span class="math">c₁y₁+c₂y₂</span> that has exactly those same two data. Therefore the constants must satisfy</p>
          <div class="eq">c₁y₁(x₀)+c₂y₂(x₀)=A,</div>
          <div class="eq">c₁y₁′(x₀)+c₂y₂′(x₀)=B.</div>`},
        {type:"teach",title:"Why “all solutions” follows — step 2",html:`
          <p>${lesson2DeepTag}</p>
          <p>These are two simultaneous linear equations for <span class="math">c₁,c₂</span>:</p>
          <div class="eq">c₁y₁(x₀)+c₂y₂(x₀)=A,</div>
          <div class="eq">c₁y₁′(x₀)+c₂y₂′(x₀)=B.</div>
          <p>Eliminate <span class="math">c₂</span>. Multiply the first equation by <span class="math">y₂′(x₀)</span> and the second by <span class="math">y₂(x₀)</span>, then subtract:</p>
          <div class="eq">c₁[y₁(x₀)y₂′(x₀)−y₂(x₀)y₁′(x₀)]</div>
          <div class="eq">=A y₂′(x₀)−B y₂(x₀).</div>
          <p>The bracket is exactly the Wronskian:</p>
          <div class="eq">W(x₀)=y₁(x₀)y₂′(x₀)−y₂(x₀)y₁′(x₀).</div>
          <p>Because the solutions are independent, <span class="math">W(x₀)≠0</span>, so division is legal:</p>
          <div class="eq">c₁=[A y₂′(x₀)−B y₂(x₀)]/W(x₀).</div>
          <p>Now eliminate <span class="math">c₁</span>: multiply the second equation by <span class="math">y₁(x₀)</span>, multiply the first by <span class="math">y₁′(x₀)</span>, and subtract:</p>
          <div class="eq">c₂[y₁(x₀)y₂′(x₀)−y₂(x₀)y₁′(x₀)]</div>
          <div class="eq">=B y₁(x₀)−A y₁′(x₀),</div>
          <p>hence</p>
          <div class="eq">c₂=[B y₁(x₀)−A y₁′(x₀)]/W(x₀).</div>
          <div class="beginner"><b>Nothing was memorized:</b> these formulas came from ordinary elimination of two equations. The Wronskian appears because it is the factor left over when one unknown is eliminated.</div>
          <p>Now <span class="math">φ</span> and <span class="math">c₁y₁+c₂y₂</span> solve the same ODE and share the same value and slope at <span class="math">x₀</span>. By uniqueness, they must be the same solution on <span class="math">I</span>.</p>`},
        {type:"quiz",title:"What completes the proof?",q:`After matching both <span class="math">y(x₀)</span> and <span class="math">y′(x₀)</span> for two solutions of the same second-order linear ODE whose standard-form coefficients are continuous on the interval, what theorem lets us conclude the solutions coincide?`,options:[`Existence and uniqueness`,`Separation of variables`,`Exactness`],answer:0,why:`The second-order IVP has a unique solution for those two initial data, so the two candidate solutions must agree.`},
        {type:"teach",title:"Book context: why second-order equations appear in mechanics",html:`
          <p>${lesson2CoreTag}</p>
          <p>O’Neil places a spring–mass model beside this theory to show where the mathematics comes from. Let <span class="math">y(t)</span> denote displacement. Then <span class="math">y′(t)</span> is velocity and <span class="math">y′′(t)</span> is acceleration.</p>
          <p>Newton’s second law says that the sum of forces equals mass times acceleration. A spring force is proportional to displacement and a damping force is proportional to velocity. After choosing a sign convention and measuring displacement from equilibrium, the standard model has the form</p>
          <div class="eq">m y′′+c y′+k y=F(t).</div>
          <div class="beginner"><b>Meaning of the terms:</b> <span class="math">m y′′</span> is inertia, <span class="math">c y′</span> is damping, <span class="math">k y</span> is the spring restoring term, and <span class="math">F(t)</span> is external forcing.</div>
          <div class="warn"><b>Scope:</b> the syllabus studies damping regimes and resonance later. Here this model is only context for why a linear second-order equation and two initial data naturally arise.</div>`}
      ]},
      {title:"Initial values determine the constants",screens:[
        {type:"bookproblem",title:"O’Neil Example 2.1 — fit the initial conditions",practiceLabel:"Textbook example · O’Neil Example 2.1",prompt:`
          <p>Given the linearly independent solutions <span class="math">y₁=e^x</span> and <span class="math">y₂=e^(2x)</span> of <span class="math">y′′−3y′+2y=0</span>, solve the IVP</p>
          <div class="eq">y(0)=−2,  y′(0)=3.</div>
          <p>Start from the general homogeneous solution and determine <span class="math">c₁,c₂</span>.</p>`,solution:`
          <p><b>1. Write the general homogeneous solution.</b></p>
          <div class="eq">y=c₁e^x+c₂e^(2x).</div>
          <p><b>2. Differentiate before using the slope condition.</b></p>
          <div class="eq">y′=c₁e^x+2c₂e^(2x).</div>
          <p><b>3. Apply y(0)=−2.</b> Since <span class="math">e^0=1</span>:</p>
          <div class="eq">c₁+c₂=−2.  (1)</div>
          <p><b>4. Apply y′(0)=3.</b></p>
          <div class="eq">c₁+2c₂=3.  (2)</div>
          <p>Subtract (1) from (2):</p>
          <div class="eq">c₂=5.</div>
          <p>Then <span class="math">c₁+5=−2</span>, so</p>
          <div class="eq">c₁=−7.</div>
          <div class="whybox"><b>IVP solution:</b><div class="eq">y=−7e^x+5e^(2x).</div></div>`},
        {type:"quiz",title:"Do not forget to differentiate",q:`If <span class="math">y=c₁sin x+c₂cos x</span>, what is <span class="math">y′</span>?`,options:[`c₁cos x−c₂sin x`,`c₁cos x+c₂sin x`,`−c₁sin x−c₂cos x`],answer:0,why:`Differentiate each term: (sin x)′=cos x and (cos x)′=−sin x.`},
        {type:"quiz",title:"Two constants, two equations",q:`Why does the Wronskian being nonzero matter when fitting <span class="math">c₁,c₂</span> to initial data?`,options:[`It guarantees the two equations for c₁,c₂ have a unique solution`,`It makes y′′ disappear`,`It proves f(x)=0`],answer:0,why:`The Wronskian is the determinant of the 2×2 coefficient system built from the values and slopes of y₁ and y₂.`}
      ]}
    ]
  },

  {
    id:"l2-nonhom", courseLesson:2, color:"#c05b58", badge:"5", label:"Forced equations",
    title:"Nonhomogeneous Structure", subtitle:"Homogeneous family + one particular solution",
    desc:"Understand the associated homogeneous equation, why one particular solution is enough, and how the full forced solution is assembled and fitted to initial data.",
    lessons:[
      {title:"The structure theorem",screens:[
        {type:"teach",title:"Separate the reusable freedom from the forcing",html:`
          <p>${lesson2CoreTag}</p>
          <p>For</p>
          <div class="eq">y′′+p(x)y′+q(x)y=f(x),</div>
          <p>the <b>associated homogeneous equation</b> is obtained by replacing the forcing with zero:</p>
          <div class="eq">y′′+p(x)y′+q(x)y=0.</div>
          <p>If <span class="math">y₁,y₂</span> are independent homogeneous solutions and <span class="math">yₚ</span> is <b>any one</b> particular solution of the forced equation, then the complete family is</p>
          <div class="eq">y=c₁y₁+c₂y₂+yₚ.</div>`},
        {type:"teach",title:"Why adding a homogeneous solution keeps the same forcing",html:`
          <p>${lesson2DeepTag}</p>
          <p>Using <span class="math">L[y]=y′′+py′+qy</span>:</p>
          <div class="eq">L[yₚ]=f,  L[c₁y₁+c₂y₂]=0.</div>
          <p>Therefore</p>
          <div class="eq">L[yₚ+c₁y₁+c₂y₂]=f+0=f.</div>
          <p>The homogeneous part changes the initial position and slope without changing the external forcing.</p>`},
        {type:"teach",title:"Why this family contains every forced solution",html:`
          <p>${lesson2CoreTag}</p>
          <p>Let <span class="math">Y</span> be any other solution of the forced equation. Since both <span class="math">Y</span> and <span class="math">yₚ</span> produce the same <span class="math">f</span>,</p>
          <div class="eq">L[Y−yₚ]=f−f=0.</div>
          <p>So <span class="math">Y−yₚ</span> must be a homogeneous solution:</p>
          <div class="eq">Y−yₚ=c₁y₁+c₂y₂.</div>
          <p>Add <span class="math">yₚ</span> back:</p>
          <div class="eq">Y=c₁y₁+c₂y₂+yₚ.</div>
          <div class="whybox"><b>That is the whole theorem.</b> Any two forced solutions differ only by a homogeneous solution.</div>`},
        {type:"quiz",title:"Assemble the solution",q:`Given independent homogeneous solutions <span class="math">y₁,y₂</span> and one particular forced solution <span class="math">yₚ</span>, what is the general nonhomogeneous solution?`,options:[`c₁y₁+c₂y₂+yₚ`,`c₁y₁+c₂y₂`,`c₁y₁+c₂y₂+c₃yₚ`],answer:0,why:`The two arbitrary constants belong to the homogeneous freedom. One fixed particular solution is then added.`}
      ]},
      {title:"Textbook-aligned complete example",screens:[
        {type:"bookproblem",title:"O’Neil Example 2.2 — verify the building blocks",practiceLabel:"Textbook example · O’Neil Example 2.2",prompt:`
          <p>For <span class="math">y′′+4y=8x</span>, verify that <span class="math">y₁=sin(2x)</span> and <span class="math">y₂=cos(2x)</span> solve the associated homogeneous equation, use the Wronskian to verify that they are linearly independent, verify that <span class="math">yₚ=2x</span> solves the forced equation, and then write the general solution.</p>`,solution:`
          <p><b>1. Associated homogeneous equation.</b></p>
          <div class="eq">y′′+4y=0.</div>
          <p><b>2. Verify y₁=sin(2x).</b></p>
          <div class="eq">y₁′=2cos(2x),  y₁′′=−4sin(2x).</div>
          <div class="eq">y₁′′+4y₁=−4sin(2x)+4sin(2x)=0.</div>
          <p><b>3. Verify y₂=cos(2x).</b></p>
          <div class="eq">y₂′=−2sin(2x),  y₂′′=−4cos(2x).</div>
          <div class="eq">y₂′′+4y₂=−4cos(2x)+4cos(2x)=0.</div>
          <p><b>4. Verify independence with the Wronskian.</b></p>
          <div class="eq">W=y₁y₂′−y₂y₁′</div>
          <div class="eq">=sin(2x)(−2sin(2x))−cos(2x)(2cos(2x))</div>
          <div class="eq">=−2[sin²(2x)+cos²(2x)]=−2≠0.</div>
          <p>So <span class="math">y₁,y₂</span> are linearly independent and generate the full homogeneous solution.</p>
          <p><b>5. Verify yₚ=2x.</b></p>
          <div class="eq">yₚ′=2,  yₚ′′=0.</div>
          <div class="eq">yₚ′′+4yₚ=0+4(2x)=8x.</div>
          <p>Therefore one particular solution is <span class="math">yₚ=2x</span>, and the complete family is</p>
          <div class="eq">y=c₁sin(2x)+c₂cos(2x)+2x.</div>`},
        {type:"bookproblem",title:"O’Neil Example 2.2 — fit the textbook IVP",practiceLabel:"Textbook example · O’Neil Example 2.2",prompt:`
          <p>Continue with <span class="math">y′′+4y=8x</span> and the general solution</p>
          <div class="eq">y=c₁sin(2x)+c₂cos(2x)+2x.</div>
          <p>Find the particular solution satisfying</p>
          <div class="eq">y(π)=1,  y′(π)=−6.</div>`,solution:`
          <p><b>1. Differentiate the entire general solution.</b></p>
          <div class="eq">y′=2c₁cos(2x)−2c₂sin(2x)+2.</div>
          <p><b>2. Apply y(π)=1.</b> Since <span class="math">sin(2π)=0</span> and <span class="math">cos(2π)=1</span>:</p>
          <div class="eq">1=0+c₂+2π.</div>
          <div class="eq">c₂=1−2π.</div>
          <p><b>3. Apply y′(π)=−6.</b></p>
          <div class="eq">−6=2c₁(1)−2c₂(0)+2=2c₁+2.</div>
          <p>Subtract 2 and divide by 2:</p>
          <div class="eq">−8=2c₁  ⇒  c₁=−4.</div>
          <div class="whybox"><b>IVP solution:</b><div class="eq">y=−4sin(2x)+(1−2π)cos(2x)+2x.</div></div>`},
        {type:"quiz",title:"Particular solution check",q:`Why is <span class="math">yₚ=2x</span> a particular solution of <span class="math">y′′+4y=8x</span>?`,options:[`Because yₚ′′=0 and 4yₚ=8x`,`Because yₚ is homogeneous`,`Because its Wronskian is nonzero`],answer:0,why:`Substitution gives 0+4(2x)=8x, exactly the required forcing.`},
        {type:"teach",title:"Do not invent a third arbitrary constant",html:`
          <div class="warn"><b>Common mistake:</b> writing <span class="math">c₁y₁+c₂y₂+c₃yₚ</span>. In general, multiplying the particular solution by an arbitrary <span class="math">c₃</span> changes the forcing to <span class="math">c₃f(x)</span>. The forced equation fixes the coefficient of the chosen particular solution.</div>
          <p>The two arbitrary constants already account for the two degrees of freedom of a second-order linear equation.</p>`}
      ]}
    ]
  },

  {
    id:"l2-mastery", courseLesson:2, color:"#d27a42", badge:"6", label:"Mastery",
    title:"O’Neil §2.1 Book Mastery", subtitle:"All Section 2.1 Problems 1–11 · textbook exercises only",
    desc:"Master the exact exercise set assigned by the primary textbook. Every problem below is from O’Neil §2.1, with a large scratch board and a fully explained worked solution hidden until you choose to reveal it.",
    lessons:[
      {title:"How to use the book mastery",screens:[
        {type:"teach",title:"Do the textbook problem first, then audit the solution",html:`
          <p>${lesson2CoreTag}</p>
          <div class="whybox"><b>Mastery rule:</b> the questions in this section are O’Neil §2.1 Problems 1–11, not newly invented substitutes. Work each problem on the whiteboard before opening the worked solution.</div>
          <p>Problems 1–5 all use the same complete workflow from the book:</p>
          <ol class="steps">
            <li>Verify <span class="math">y₁</span> and <span class="math">y₂</span> solve the associated homogeneous equation.</li>
            <li>Compute the Wronskian and prove the pair is independent.</li>
            <li>Write the homogeneous general solution.</li>
            <li>Verify the supplied <span class="math">yₚ</span> solves the nonhomogeneous equation.</li>
            <li>Write the nonhomogeneous general solution.</li>
            <li>Use both initial conditions to determine <span class="math">c₁,c₂</span>.</li>
          </ol>
          <p>Problems 6–11 then test the Wronskian theorem, its hypotheses, and consequences. Their solutions below explain every logical step rather than only giving the final conclusion.</p>`}
      ]},
      {title:"Book Problems 1–2",screens:[
        {type:"bookproblem",title:"O’Neil §2.1 Problem 1",prompt:`
          <p><span class="supplementalTag">Textbook exercise · O’Neil §2.1 Problem 1</span><br>
          For <span class="math">y′′+36y=x−1</span>, <span class="math">y(0)=−5</span>, <span class="math">y′(0)=2</span>, with <span class="math">y₁=sin(6x)</span>, <span class="math">y₂=cos(6x)</span>, and <span class="math">yₚ=(x−1)/36</span>: verify the two homogeneous solutions, use the Wronskian to show independence, write the homogeneous general solution, verify the particular solution, write the full general solution, and solve the IVP.</p>`,solution:`
          <p><b>1. Associated homogeneous equation.</b></p><div class="eq">y′′+36y=0.</div>
          <p>For <span class="math">y₁=sin(6x)</span>,</p><div class="eq">y₁′=6cos(6x),  y₁′′=−36sin(6x),</div><div class="eq">y₁′′+36y₁=−36sin(6x)+36sin(6x)=0.</div>
          <p>For <span class="math">y₂=cos(6x)</span>,</p><div class="eq">y₂′=−6sin(6x),  y₂′′=−36cos(6x),</div><div class="eq">y₂′′+36y₂=0.</div>
          <p><b>2. Wronskian.</b></p><div class="eq">W=y₁y₂′−y₂y₁′=−6sin²(6x)−6cos²(6x)=−6.</div>
          <p>Since <span class="math">W≠0</span>, the pair is independent, so</p><div class="eq">y_h=c₁sin(6x)+c₂cos(6x).</div>
          <p><b>3. Verify the particular solution.</b> For <span class="math">yₚ=(x−1)/36</span>, <span class="math">yₚ′=1/36</span> and <span class="math">yₚ′′=0</span>. Therefore</p><div class="eq">yₚ′′+36yₚ=0+(x−1)=x−1.</div>
          <p>Thus</p><div class="eq">y=c₁sin(6x)+c₂cos(6x)+(x−1)/36.</div>
          <p><b>4. Apply y(0)=−5.</b></p><div class="eq">c₂−1/36=−5  ⇒  c₂=−179/36.</div>
          <p>Differentiate the full solution:</p><div class="eq">y′=6c₁cos(6x)−6c₂sin(6x)+1/36.</div>
          <p><b>5. Apply y′(0)=2.</b></p><div class="eq">6c₁+1/36=2  ⇒  c₁=71/216.</div>
          <div class="whybox"><b>IVP solution:</b><div class="eq">y=(71/216)sin(6x)−(179/36)cos(6x)+(x−1)/36.</div></div>`},
        {type:"bookproblem",title:"O’Neil §2.1 Problem 2",prompt:`
          <p><span class="supplementalTag">Textbook exercise · O’Neil §2.1 Problem 2</span><br>
          For <span class="math">y′′−16y=4x²</span>, <span class="math">y(0)=12</span>, <span class="math">y′(0)=3</span>, with <span class="math">y₁=e^(4x)</span>, <span class="math">y₂=e^(−4x)</span>, and <span class="math">yₚ=−x²/4−1/32</span>: carry out the complete verification, Wronskian, general-solution, and IVP procedure.</p>`,solution:`
          <p><b>1. Homogeneous verification.</b> The associated equation is <span class="math">y′′−16y=0</span>.</p>
          <div class="eq">y₁′=4e^(4x),  y₁′′=16e^(4x)  ⇒  y₁′′−16y₁=0.</div>
          <div class="eq">y₂′=−4e^(−4x),  y₂′′=16e^(−4x)  ⇒  y₂′′−16y₂=0.</div>
          <p><b>2. Wronskian.</b></p><div class="eq">W=e^(4x)(−4e^(−4x))−e^(−4x)(4e^(4x))=−8.</div>
          <p>Hence the pair is independent and</p><div class="eq">y_h=c₁e^(4x)+c₂e^(−4x).</div>
          <p><b>3. Particular solution.</b> With <span class="math">yₚ=−x²/4−1/32</span>,</p><div class="eq">yₚ′=−x/2,  yₚ′′=−1/2,</div><div class="eq">yₚ′′−16yₚ=−1/2+4x²+1/2=4x².</div>
          <p>Therefore</p><div class="eq">y=c₁e^(4x)+c₂e^(−4x)−x²/4−1/32.</div>
          <p><b>4. Initial value.</b></p><div class="eq">c₁+c₂−1/32=12  ⇒  c₁+c₂=385/32.</div>
          <p>Differentiate:</p><div class="eq">y′=4c₁e^(4x)−4c₂e^(−4x)−x/2.</div>
          <p>At <span class="math">x=0</span>:</p><div class="eq">4c₁−4c₂=3  ⇒  c₁−c₂=3/4.</div>
          <p>Add and subtract the two equations:</p><div class="eq">c₁=409/64,  c₂=361/64.</div>
          <div class="whybox"><b>IVP solution:</b><div class="eq">y=(409/64)e^(4x)+(361/64)e^(−4x)−x²/4−1/32.</div></div>`}
      ]},
      {title:"Book Problems 3–5",screens:[
        {type:"bookproblem",title:"O’Neil §2.1 Problem 3",prompt:`
          <p><span class="supplementalTag">Textbook exercise · O’Neil §2.1 Problem 3</span><br>
          For <span class="math">y′′+3y′+2y=15</span>, <span class="math">y(0)=−3</span>, <span class="math">y′(0)=−1</span>, with <span class="math">y₁=e^(−2x)</span>, <span class="math">y₂=e^(−x)</span>, and <span class="math">yₚ=15/2</span>: complete all verification and solve the IVP.</p>`,solution:`
          <p><b>1. Verify y₁.</b></p><div class="eq">y₁′=−2e^(−2x),  y₁′′=4e^(−2x).</div><div class="eq">y₁′′+3y₁′+2y₁=(4−6+2)e^(−2x)=0.</div>
          <p><b>2. Verify y₂.</b></p><div class="eq">y₂′=−e^(−x),  y₂′′=e^(−x).</div><div class="eq">y₂′′+3y₂′+2y₂=(1−3+2)e^(−x)=0.</div>
          <p><b>3. Wronskian.</b></p><div class="eq">W=e^(−2x)(−e^(−x))−e^(−x)(−2e^(−2x))=e^(−3x).</div>
          <p>The exponential is never zero, so</p><div class="eq">y_h=c₁e^(−2x)+c₂e^(−x).</div>
          <p><b>4. Verify yₚ.</b> A constant has zero first and second derivative, so</p><div class="eq">0+0+2(15/2)=15.</div>
          <p>Hence</p><div class="eq">y=c₁e^(−2x)+c₂e^(−x)+15/2.</div>
          <p><b>5. Initial conditions.</b></p><div class="eq">c₁+c₂+15/2=−3  ⇒  c₁+c₂=−21/2.</div><div class="eq">y′=−2c₁e^(−2x)−c₂e^(−x).</div><div class="eq">−2c₁−c₂=−1.</div>
          <p>Solving these two linear equations gives</p><div class="eq">c₁=23/2,  c₂=−22.</div>
          <div class="whybox"><b>IVP solution:</b><div class="eq">y=(23/2)e^(−2x)−22e^(−x)+15/2.</div></div>`},
        {type:"bookproblem",title:"O’Neil §2.1 Problem 4",prompt:`
          <p><span class="supplementalTag">Textbook exercise · O’Neil §2.1 Problem 4</span><br>
          For <span class="math">y′′−6y′+13y=−e^x</span>, <span class="math">y(0)=−1</span>, <span class="math">y′(0)=1</span>, with <span class="math">y₁=e^(3x)cos(2x)</span>, <span class="math">y₂=e^(3x)sin(2x)</span>, and <span class="math">yₚ=−e^x/8</span>: complete the textbook workflow and solve the IVP.</p>`,solution:`
          <p><b>1. Verify the homogeneous pair.</b> Differentiate carefully using the product rule:</p>
          <div class="eq">y₁′=e^(3x)[3cos(2x)−2sin(2x)],</div><div class="eq">y₁′′=e^(3x)[5cos(2x)−12sin(2x)].</div>
          <p>Substitute all three pieces into the homogeneous left side:</p>
          <div class="eq">y₁′′−6y₁′+13y₁</div>
          <div class="eq">=e^(3x){[5cos(2x)−12sin(2x)]−6[3cos(2x)−2sin(2x)]+13cos(2x)}</div>
          <div class="eq">=e^(3x){(5−18+13)cos(2x)+(−12+12)sin(2x)}=0.</div>
          <p>Now do the same for <span class="math">y₂</span>:</p>
          <div class="eq">y₂′=e^(3x)[3sin(2x)+2cos(2x)],</div><div class="eq">y₂′′=e^(3x)[5sin(2x)+12cos(2x)].</div>
          <div class="eq">y₂′′−6y₂′+13y₂</div>
          <div class="eq">=e^(3x){[5sin(2x)+12cos(2x)]−6[3sin(2x)+2cos(2x)]+13sin(2x)}</div>
          <div class="eq">=e^(3x){(5−18+13)sin(2x)+(12−12)cos(2x)}=0.</div>
          <p><b>2. Wronskian.</b></p><div class="eq">W=2e^(6x).</div>
          <p>Since <span class="math">e^(6x)>0</span>, the pair is independent:</p><div class="eq">y_h=c₁e^(3x)cos(2x)+c₂e^(3x)sin(2x).</div>
          <p><b>3. Verify yₚ.</b> For <span class="math">yₚ=−e^x/8</span>, all derivatives equal <span class="math">−e^x/8</span>, so</p><div class="eq">yₚ′′−6yₚ′+13yₚ=[−1+6−13]e^x/8=−e^x.</div>
          <p>Thus</p><div class="eq">y=c₁e^(3x)cos(2x)+c₂e^(3x)sin(2x)−e^x/8.</div>
          <p><b>4. Initial value.</b></p><div class="eq">c₁−1/8=−1  ⇒  c₁=−7/8.</div>
          <p>At <span class="math">x=0</span>, the derivative of the full solution is</p><div class="eq">y′(0)=3c₁+2c₂−1/8=1.</div>
          <p>Substitute <span class="math">c₁=−7/8</span>:</p><div class="eq">−21/8+2c₂−1/8=1  ⇒  c₂=15/8.</div>
          <div class="whybox"><b>IVP solution:</b><div class="eq">y=−(7/8)e^(3x)cos(2x)+(15/8)e^(3x)sin(2x)−e^x/8.</div></div>`},
        {type:"bookproblem",title:"O’Neil §2.1 Problem 5",prompt:`
          <p><span class="supplementalTag">Textbook exercise · O’Neil §2.1 Problem 5</span><br>
          For <span class="math">y′′−2y′+2y=−5x²</span>, <span class="math">y(0)=6</span>, <span class="math">y′(0)=1</span>, with <span class="math">y₁=e^x cos x</span>, <span class="math">y₂=e^x sin x</span>, and <span class="math">yₚ=−(5/2)x²−5x−5/2</span>: complete all verification and solve the IVP.</p>`,solution:`
          <p><b>1. Verify y₁.</b></p><div class="eq">y₁′=e^x(cos x−sin x),  y₁′′=−2e^x sin x.</div>
          <div class="eq">y₁′′−2y₁′+2y₁=−2e^x sin x−2e^x(cos x−sin x)+2e^x cos x</div>
          <div class="eq">=e^x[−2sin x−2cos x+2sin x+2cos x]=0.</div>
          <p><b>2. Verify y₂.</b></p><div class="eq">y₂′=e^x(sin x+cos x),  y₂′′=2e^x cos x.</div>
          <div class="eq">y₂′′−2y₂′+2y₂=2e^x cos x−2e^x(sin x+cos x)+2e^x sin x</div>
          <div class="eq">=e^x[2cos x−2sin x−2cos x+2sin x]=0.</div>
          <p><b>3. Wronskian.</b></p><div class="eq">W=e^x cos x·e^x(sin x+cos x)−e^x sin x·e^x(cos x−sin x)</div>
          <div class="eq">=e^(2x)[cos x sin x+cos²x−sin x cos x+sin²x]=e^(2x).</div>
          <p>This is never zero, so</p><div class="eq">y_h=c₁e^x cos x+c₂e^x sin x.</div>
          <p><b>4. Particular solution.</b></p><div class="eq">yₚ′=−5x−5,  yₚ′′=−5.</div>
          <div class="eq">yₚ′′−2yₚ′+2yₚ=−5−2(−5x−5)+2[−(5/2)x²−5x−5/2]</div>
          <div class="eq">=−5+10x+10−5x²−10x−5=−5x².</div>
          <p>Therefore</p><div class="eq">y=c₁e^x cos x+c₂e^x sin x−(5/2)x²−5x−5/2.</div>
          <p><b>5. Initial conditions.</b></p><div class="eq">c₁−5/2=6  ⇒  c₁=17/2.</div>
          <p>Differentiate the full solution:</p><div class="eq">y′=c₁e^x(cos x−sin x)+c₂e^x(sin x+cos x)−5x−5.</div>
          <p>At zero:</p><div class="eq">c₁+c₂−5=1  ⇒  c₂=−5/2.</div>
          <div class="whybox"><b>IVP solution:</b><div class="eq">y=(17/2)e^x cos x−(5/2)e^x sin x−(5/2)x²−5x−5/2.</div></div>`}
      ]},
      {title:"Book Problem 6",screens:[
        {type:"bookproblem",title:"O’Neil §2.1 Problem 6",prompt:`
          <p><span class="supplementalTag">Textbook exercise · O’Neil §2.1 Problem 6</span><br>
          Show that the Wronskian of two independent solutions of <span class="math">y′′+p(x)y′+q(x)y=0</span> is never zero: multiply the first solution equation by <span class="math">y₂</span>, the second by <span class="math">−y₁</span>, add, obtain <span class="math">W′+p(x)W=0</span>, and solve this first-order equation for <span class="math">W</span>.</p>`,solution:`
          <p>Because <span class="math">y₁</span> and <span class="math">y₂</span> are solutions,</p><div class="eq">y₁′′+p y₁′+q y₁=0,</div><div class="eq">y₂′′+p y₂′+q y₂=0.</div>
          <p>Multiply the first equation by <span class="math">y₂</span> and the second by <span class="math">−y₁</span>:</p><div class="eq">y₂y₁′′+p y₂y₁′+q y₁y₂=0,</div><div class="eq">−y₁y₂′′−p y₁y₂′−q y₁y₂=0.</div>
          <p>Add them. The <span class="math">q y₁y₂</span> terms cancel:</p><div class="eq">y₂y₁′′−y₁y₂′′+p(y₂y₁′−y₁y₂′)=0.</div>
          <p>Now recall</p><div class="eq">W=y₁y₂′−y₂y₁′.</div>
          <p>Differentiate it. The cross terms cancel:</p><div class="eq">W′=y₁y₂′′−y₂y₁′′.</div>
          <p>Therefore the previous equation is exactly</p><div class="eq">−W′−pW=0  ⇒  W′+pW=0.</div>
          <p>This is a first-order linear equation. To avoid dividing by a Wronskian that might be zero, use the integrating factor</p><div class="eq">I=e^(∫p(x)dx).</div><p>Then</p><div class="eq">(IW)′=0 ⇒ IW=C ⇒ W=C e^(−∫p(x)dx).</div>
          <div class="whybox">The exponential factor is never zero. If <span class="math">C=0</span>, then <span class="math">W≡0</span>; if <span class="math">C≠0</span>, then <span class="math">W</span> is never zero. For an independent pair, the Wronskian cannot be identically zero, so it is never zero.</div>`}
      ]},
      {title:"Book Problems 7–8",screens:[
        {type:"bookproblem",title:"O’Neil §2.1 Problem 7",prompt:`
          <p><span class="supplementalTag">Textbook exercise · O’Neil §2.1 Problem 7</span><br>
          Let <span class="math">y₁=x²</span> and <span class="math">y₂=x³</span>. Show that <span class="math">W=x⁴</span>. Since <span class="math">W(0)=0</span> but <span class="math">W(x)>0</span> for <span class="math">x≠0</span>, explain why this does not contradict O’Neil’s Wronskian theorem, which applies when the two functions solve the <b>same homogeneous second-order linear ODE</b> and its standard-form coefficients are continuous on the interval.</p>`,solution:`
          <p>Differentiate:</p><div class="eq">y₁′=2x,  y₂′=3x².</div>
          <p>Then</p><div class="eq">W=y₁y₂′−y₂y₁′=x²(3x²)−x³(2x)=x⁴.</div>
          <p>So <span class="math">W(0)=0</span>, while <span class="math">x⁴>0</span> for every <span class="math">x≠0</span>.</p>
          <div class="whybox"><b>No contradiction:</b> O’Neil’s Wronskian theorem applies when two functions solve the <em>same</em> homogeneous linear second-order ODE and the standard-form coefficients are continuous on the interval. Problem 7 gives only two arbitrary functions; it does not say they solve such an ODE. Therefore the theorem’s hypotheses are missing, and an isolated zero of the Wronskian is possible.</div>`},
        {type:"bookproblem",title:"O’Neil §2.1 Problem 8",prompt:`
          <p><span class="supplementalTag">Textbook exercise · O’Neil §2.1 Problem 8</span><br>
          Show that <span class="math">y₁=x</span> and <span class="math">y₂=x²</span> are linearly independent solutions of <span class="math">x²y′′−2xy′+2y=0</span> on <span class="math">−1&lt;x&lt;1</span>, but <span class="math">W(0)=0</span>. Explain why this does not contradict O’Neil’s Wronskian theorem: for two solutions of <span class="math">y′′+p(x)y′+q(x)y=0</span> on an interval where <span class="math">p,q</span> are continuous, the Wronskian is either identically zero or never zero.</p>`,solution:`
          <p><b>1. Verify y₁=x.</b> Here <span class="math">y₁′=1</span>, <span class="math">y₁′′=0</span>:</p><div class="eq">x²(0)−2x(1)+2x=0.</div>
          <p><b>2. Verify y₂=x².</b> Here <span class="math">y₂′=2x</span>, <span class="math">y₂′′=2</span>:</p><div class="eq">x²(2)−2x(2x)+2x²=0.</div>
          <p>The pair is independent because <span class="math">x²</span> is not a constant multiple of <span class="math">x</span> on the interval.</p>
          <p><b>3. Wronskian.</b></p><div class="eq">W=x(2x)−x²(1)=x²,</div><p>so <span class="math">W(0)=0</span>.</p>
          <p><b>4. Find the failed theorem hypothesis.</b> The Wronskian theorem is stated for the standard homogeneous form</p><div class="eq">y′′+p(x)y′+q(x)y=0.</div>
          <p>To put this ODE into that form, divide by <span class="math">x²</span>:</p><div class="eq">y′′−(2/x)y′+(2/x²)y=0.</div>
          <div class="whybox">Now <span class="math">p(x)=−2/x</span> and <span class="math">q(x)=2/x²</span>. Both fail to be continuous at <span class="math">x=0</span>, so the Wronskian theorem cannot be applied on the whole interval <span class="math">(−1,1)</span>. On either side of zero, where the coefficients are continuous, <span class="math">W=x²</span> is indeed nonzero.</div>`}
      ]},
      {title:"Book Problems 9–11",screens:[
        {type:"bookproblem",title:"O’Neil §2.1 Problem 9",prompt:`
          <p><span class="supplementalTag">Textbook exercise · O’Neil §2.1 Problem 9</span><br>
          Suppose <span class="math">y₁,y₂</span> both solve the homogeneous linear equation</p>
          <div class="eq">y′′+p(x)y′+q(x)y=0</div>
          <p>on <span class="math">(a,b)</span>, where <span class="math">p,q</span> are continuous. If both functions have a <b>relative extremum</b> (a local maximum or local minimum) at the same point <span class="math">x₀</span>, show that they must be linearly dependent.</p>`,solution:`
          <p>At a differentiable relative maximum or minimum, the derivative is zero. Therefore</p><div class="eq">y₁′(x₀)=0,  y₂′(x₀)=0.</div>
          <p>Evaluate the Wronskian at that point:</p><div class="eq">W(x₀)=y₁(x₀)y₂′(x₀)−y₂(x₀)y₁′(x₀)=0−0=0.</div>
          <p>Because both functions solve the same homogeneous equation and <span class="math">p,q</span> are continuous on the whole interval, the Wronskian theorem applies: for such a pair, <span class="math">W</span> is either identically zero or never zero.</p>
          <div class="whybox">Here <span class="math">W(x₀)=0</span>, so the “never zero” case is impossible. Therefore <span class="math">W≡0</span> and the two solutions are linearly dependent. Thus linearly independent solutions cannot share a relative extremum.</div>`},
        {type:"bookproblem",title:"O’Neil §2.1 Problem 10",prompt:`
          <p><span class="supplementalTag">Textbook exercise · O’Neil §2.1 Problem 10</span><br>
          Let <span class="math">φ</span> be a solution of the homogeneous linear equation</p>
          <div class="eq">y′′+p(x)y′+q(x)y=0</div>
          <p>on an open interval <span class="math">I</span>, where <span class="math">p,q</span> are continuous. Suppose <span class="math">φ</span> is <b>not identically zero</b> (meaning it is not the zero function <span class="math">φ(x)=0</span> for every <span class="math">x∈I</span>), but <span class="math">φ(x₀)=0</span> at some <span class="math">x₀∈I</span>. Show that <span class="math">φ′(x₀)≠0</span>.</p>`,solution:`
          <p>Assume the opposite for contradiction: suppose also <span class="math">φ′(x₀)=0</span>.</p>
          <p>Then <span class="math">φ</span> solves the initial value problem</p><div class="eq">y′′+p(x)y′+q(x)y=0,  y(x₀)=0,  y′(x₀)=0.</div>
          <p>But the zero function <span class="math">y≡0</span> also solves exactly the same IVP.</p>
          <p>The second-order existence–uniqueness theorem says that when <span class="math">p,q</span> are continuous, an IVP specifying both <span class="math">y(x₀)</span> and <span class="math">y′(x₀)</span> has only one solution on <span class="math">I</span>. Therefore <span class="math">φ</span> would have to equal the zero function on <span class="math">I</span>.</p>
          <div class="whybox">That contradicts the assumption that <span class="math">φ</span> is not identically zero. Hence <span class="math">φ′(x₀)≠0</span>.</div>`},
        {type:"bookproblem",title:"O’Neil §2.1 Problem 11",prompt:`
          <p><span class="supplementalTag">Textbook exercise · O’Neil §2.1 Problem 11</span><br>
          Suppose <span class="math">y₁,y₂</span> are distinct solutions of</p>
          <div class="eq">y′′+p(x)y′+q(x)y=0</div>
          <p>on an open interval <span class="math">I</span>, with <span class="math">p,q</span> continuous there. If <span class="math">y₁(x₀)=y₂(x₀)=0</span> at some <span class="math">x₀∈I</span>, show that <span class="math">y₁,y₂</span> must be linearly dependent.</p>`,solution:`
          <p>Evaluate the Wronskian at the common zero:</p><div class="eq">W(x₀)=y₁(x₀)y₂′(x₀)−y₂(x₀)y₁′(x₀).</div>
          <p>Both function values are zero, so</p><div class="eq">W(x₀)=0·y₂′(x₀)−0·y₁′(x₀)=0.</div>
          <p>Because the pair consists of solutions of the same homogeneous linear ODE and <span class="math">p,q</span> are continuous on <span class="math">I</span>, the Wronskian theorem applies. A zero Wronskian at one point forces <span class="math">W≡0</span> on the interval.</p>
          <div class="whybox">Therefore the pair is linearly dependent. Equivalently, linearly independent solutions of the same homogeneous second-order linear ODE with continuous standard-form coefficients cannot share a common zero.</div>`},
        {type:"teach",title:"End-of-§2.1 audit",html:`
          <p>${lesson2CoreTag}</p>
          <div class="whybox"><b>Everything the Sep. 16 syllabus names is now represented:</b> the linear second-order equation, superposition, linear independence, the Wronskian, and the structure of homogeneous and nonhomogeneous general solutions. The lesson also includes O’Neil’s existence/uniqueness setup, both numbered examples, the Wronskian example, spring–mass context, theorem proofs/caveats, and a deliberately selected set of §2.1 problems placed only after their prerequisites.</div>
          <p>The next lesson may now begin §2.2 constant-coefficient methods without needing to introduce characteristic equations early here.</p>`}
      ]}
    ]
  }
];

// Thread selected textbook exercises into the normal teaching units as spaced book practice.
// The end mastery gate is deliberately compact; these checkpoints place authentic problems
// immediately after the concepts they reinforce without recreating a long textbook-problem dump.
const lesson2Mastery = lesson2Units.find(u => u.id === "l2-mastery");
const lesson2BookScreens = lesson2Mastery.lessons.flatMap(l => l.screens).filter(s => s.type === "bookproblem");
function lesson2BookProblem(number){
  const source = lesson2BookScreens.find(s => s.title === `O’Neil §2.1 Problem ${number}`);
  return source ? {...source, inlineBookPractice:true} : null;
}
function addLesson2BookPractice(unitId, title, numbers){
  const unit = lesson2Units.find(u => u.id === unitId);
  if(!unit) return;
  const screens = numbers.map(lesson2BookProblem).filter(Boolean);
  if(screens.length) unit.lessons.push({title, screens});
}

// Never place an exercise before every concept it needs has been taught.
// Problem 10 uses only the existence–uniqueness theorem, so it may follow Foundations.
// Problems 6, 8, and 9 are the highest-value Wronskian follow-ups: derivation, singular-point
// caveat, and theorem application. Do not dump the entire §2.1 bank here merely because it exists.
addLesson2BookPractice("l2-foundations", "Book practice · uniqueness consequence", [10]);
addLesson2BookPractice("l2-wronskian", "Book practice · Wronskian theorem and caveats", [6,8,9]);
addLesson2BookPractice("l2-nonhom", "Book practice · complete forced-equation IVPs", [1,3]);

// Astra-style reconstruction: keep authentic book work beside the concept it tests, but do not
// repeat the entire section bank again at the end. The final slot is now mixed transfer/audit work.
lesson2Mastery.label="Mixed mastery";
lesson2Mastery.title="Lesson 2 Mixed Mastery";
lesson2Mastery.subtitle="authentic O’Neil synthesis · structure · Wronskian hypotheses · forced-solution logic";
lesson2Mastery.desc="A compact end-of-lesson gate combining prerequisite-safe authentic O’Neil problems with original transfer tasks. It does not assume the Lesson 3 characteristic-equation method.";
lesson2Mastery.lessons=[
 {title:"Authentic O’Neil synthesis",screens:[lesson2BookProblem(2),lesson2BookProblem(5),lesson2BookProblem(7),lesson2BookProblem(11)].filter(Boolean)},
 {title:"Mixed transfer",screens:[
  {type:"bookproblem",bookSection:"Lesson 2 transfer",practiceLabel:"Original course practice · not an O’Neil exercise",title:"Transfer · is the Wronskian theorem legal here?",prompt:`<p><span class="supplementalTag">Original transfer problem · course-aligned</span><br>Two functions solve <span class="math">x²y′′−2xy′+2y=0</span> and their Wronskian vanishes at <span class="math">x=0</span>. May you immediately conclude dependence on an interval crossing zero? Explain before calculating anything else.</p>`,solution:`<p>No. First put the equation in standard form:</p><div class="eq">y′′−(2/x)y′+(2/x²)y=0.</div><p>The coefficients are not continuous at <span class="math">x=0</span>. Therefore the one-point Wronskian theorem cannot be applied on an interval crossing zero. It may be applied separately on intervals lying entirely on one side of zero.</p><div class="whybox"><b>Audit habit:</b> check a theorem’s hypotheses before using its conclusion.</div>`},
  {type:"bookproblem",bookSection:"Lesson 2 transfer",practiceLabel:"Original course practice · not an O’Neil exercise",title:"Transfer · why every forced solution is yₚ+yₕ",prompt:`<p><span class="supplementalTag">Original transfer problem · course-aligned</span><br>Suppose <span class="math">L[Y]=f</span> and one particular solution <span class="math">Yₚ</span> is known. Prove that every other solution has the form <span class="math">Y=Yₚ+yₕ</span>, where <span class="math">L[yₕ]=0</span>.</p>`,solution:`<p>Let <span class="math">Y</span> be any other solution. Subtract the two equations:</p><div class="eq">L[Y]−L[Yₚ]=f−f=0.</div><p>By linearity,</p><div class="eq">L[Y−Yₚ]=0.</div><p>Define <span class="math">yₕ=Y−Yₚ</span>. Then <span class="math">L[yₕ]=0</span> and</p><div class="eq">Y=Yₚ+yₕ.</div><p>Conversely, <span class="math">L[Yₚ+yₕ]=f+0=f</span>. Thus the form describes exactly all forced solutions.</p>`},
  {type:"bookproblem",bookSection:"Lesson 2 transfer",practiceLabel:"Original course practice · not an O’Neil exercise",title:"Transfer · verify a proposed fundamental pair",prompt:`<p><span class="supplementalTag">Original transfer problem · course-aligned</span><br>For <span class="math">y′′−y=0</span>, verify <span class="math">e^x</span> and <span class="math">e^(−x)</span>, compute their Wronskian, and explain what the nonzero result buys you.</p>`,solution:`<p>For <span class="math">y₁=e^x</span>, <span class="math">y₁′′=e^x</span>, so <span class="math">y₁′′−y₁=0</span>. For <span class="math">y₂=e^(−x)</span>, <span class="math">y₂′′=e^(−x)</span>, so it also solves the equation.</p><div class="eq">W=y₁y₂′−y₂y₁′=e^x(−e^(−x))−e^(−x)e^x=−2.</div><p>Because <span class="math">W≠0</span>, the pair is independent. A second-order homogeneous solution space is therefore spanned by them:</p><div class="eq">y=c₁e^x+c₂e^(−x).</div>`}
]}];

// Install Lesson 2 only once.
if(!units.some(u => u && u.id === "l2-foundations")) units.push(...lesson2Units);

courseLessons[1] = {
  number:2,
  title:"Linear Second-Order Equations",
  subtitle:"Sep. 16 · O’Neil §2.1 · superposition, independence, Wronskian, general-solution structure",
  status:"current"
};

function lessonUnitEntries(number=selectedCourseLesson){
  return units.map((u,i)=>({u,i})).filter(({u}) => Number(u.courseLesson || 1) === Number(number));
}
function unitBelongsToLesson(unitIndex,number){
  const u=units[unitIndex];
  return !!u && Number(u.courseLesson || 1) === Number(number);
}
function defaultUnitForLesson(number){
  return lessonUnitEntries(number)[0]?.i ?? 0;
}
function rememberCoursePosition(number=selectedCourseLesson){
  if(!state.coursePositions || typeof state.coursePositions!=="object") state.coursePositions={};
  if(unitBelongsToLesson(state.unit,number)){
    state.coursePositions[String(number)]={unit:state.unit,lesson:state.lesson,screen:state.screen};
  }
}
function restoreCoursePosition(number){
  const entries=lessonUnitEntries(number);
  if(!entries.length) return;
  if(!state.coursePositions || typeof state.coursePositions!=="object") state.coursePositions={};
  const saved=state.coursePositions[String(number)];
  let ui=(saved && unitBelongsToLesson(Number(saved.unit),number)) ? Number(saved.unit) : entries[0].i;
  let li=Math.max(0,Math.min(units[ui].lessons.length-1,Number(saved?.lesson)||0));
  let si=Math.max(0,Math.min(units[ui].lessons[li].screens.length-1,Number(saved?.screen)||0));
  state.unit=ui; state.lesson=li; state.screen=si;
}

function selectCourseLesson(number){
  rememberCoursePosition(selectedCourseLesson);
  selectedCourseLesson=Number(number);
  localStorage.setItem("odeCourseLesson",String(selectedCourseLesson));
  state.courseLesson=selectedCourseLesson;
  restoreCoursePosition(selectedCourseLesson);
  selected=null;
  persistState();
  renderCourseMap();
  render();
}

function totalLessons(){
  return lessonUnitEntries(selectedCourseLesson).reduce((sum,{u})=>sum+u.lessons.length,0);
}
function doneCount(){
  let n=0;
  lessonUnitEntries(selectedCourseLesson).forEach(({u,i})=>u.lessons.forEach((_,li)=>{ if(state.done?.[key(i,li)]) n++; }));
  return n;
}
function updateProgress(){
  const total=totalLessons();
  const pct=total ? Math.round(doneCount()/total*100) : 0;
  const pctEl=document.getElementById("progressPct");
  const fill=document.getElementById("progressFill");
  const label=document.querySelector(".progressLabel span");
  if(pctEl) pctEl.textContent=pct+"%";
  if(fill) fill.style.width=pct+"%";
  if(label) label.textContent=`Lesson ${selectedCourseLesson} progress`;
}

function renderSidebar(){
  const host=document.getElementById("unitList");
  host.innerHTML="";
  const label=document.createElement("div");
  label.className="unitSectionLabel";
  label.textContent=`Lesson ${selectedCourseLesson} topics`;
  host.appendChild(label);
  const entries=lessonUnitEntries(selectedCourseLesson);
  if(!entries.length){
    const empty=document.createElement("div");
    empty.className="unitSectionLabel";
    empty.textContent="No topics published yet";
    host.appendChild(empty);
    return;
  }
  entries.forEach(({u,i:ui})=>{
    // Most reconstructed topics contain one actual lesson. Render those as one
    // clickable topic row instead of a redundant card-with-one-child group.
    if(u.lessons.length===1){
      const l=u.lessons[0];
      const done=!!state.done?.[key(ui,0)];
      const active=state.unit===ui&&state.lesson===0;
      const b=document.createElement("button");
      b.className="unit topicUnit"+(active?" active":"");
      b.innerHTML=`<span class="badge" style="background:${u.color}">${u.badge || ui}</span><span class="topicUnitText"><strong>${u.title}</strong><small>${u.subtitle}</small></span><span class="dot ${done?"done":(active?"current":"")}">${done?"✓":""}</span>`;
      b.onclick=()=>{state.unit=ui;state.lesson=0;state.screen=0;selected=null;rememberCoursePosition();save();render();};
      host.appendChild(b);
      return;
    }

    // Keep genuine multi-part units grouped, because their child lessons are meaningful.
    const box=document.createElement("div"); box.className="unit groupedUnit";
    box.innerHTML=`<div class="unitHead"><div class="badge" style="background:${u.color}">${u.badge || ui}</div><div><h3>${u.title}</h3><small>${u.subtitle}</small></div></div>`;
    u.lessons.forEach((l,li)=>{
      const b=document.createElement("button");
      b.className="lessonNode"+(state.unit===ui&&state.lesson===li?" active":"");
      const done=!!state.done?.[key(ui,li)];
      b.innerHTML=`<span class="dot ${done?"done":(state.unit===ui&&state.lesson===li?"current":"")}">${done?"✓":""}</span><span>${l.title}</span>`;
      b.onclick=()=>{state.unit=ui;state.lesson=li;state.screen=0;selected=null;rememberCoursePosition();save();render();};
      box.appendChild(b);
    });
    host.appendChild(box);
  });
}

function render(){
  if(!lessonUnitEntries(selectedCourseLesson).length){
    renderReservedLesson(selectedCourseLesson);
    updateProgress();
    return;
  }
  if(!unitBelongsToLesson(state.unit,selectedCourseLesson)) restoreCoursePosition(selectedCourseLesson);
  const u=units[state.unit], l=u.lessons[state.lesson], s=l.screens[state.screen];
  document.getElementById("banner").style.background=u.color;
  document.getElementById("bannerEyebrow").textContent=`Lesson ${selectedCourseLesson} · ${u.label || ("Topic "+u.badge)} · Part ${state.lesson+1} of ${u.lessons.length}`;
  document.getElementById("bannerTitle").textContent=u.title+" — "+l.title;
  document.getElementById("bannerDesc").textContent=u.desc;
  const card=document.getElementById("card");
  card.className="card";
  if(s.type==="teach"){
    const exampleBoard=isSolvedExample(s)?exampleScratchHTML(s):"";
    card.innerHTML=`<div class="type">Learn</div><h3>${s.title}</h3>${s.html}${exampleBoard}<div class="spacer"></div>${actionsHTML(true)}`;
    if(exampleBoard) setTimeout(setupScratchCanvas,0);
  }else if(s.type==="bookproblem"){
    const problemBoard=exampleScratchHTML({title:s.title,prompt:s.prompt||"",solution:s.solution||""});
    const bookSection=s.bookSection || "§2.1";
    const bookLabel=s.practiceLabel || (s.inlineBookPractice?`Book practice · O’Neil ${bookSection}`:`Book mastery · O’Neil ${bookSection}`);
    card.innerHTML=`<div class="type">${bookLabel}</div><h3>${s.title}</h3>${problemBoard}<div class="spacer"></div>${actionsHTML(true)}`;
    setTimeout(setupScratchCanvas,0);
  }else{
    card.innerHTML=`<div class="type">Check your understanding</div><h3>${s.title}</h3><p>${s.q}</p>
    <div class="scratchWrap" id="scratchWrap">
      <div class="scratchTop">
        <div class="scratchQuestion"><div class="scratchQuestionCompact">${s.title}</div><div class="scratchQuestionFull">${s.q}</div></div>
        <div class="scratchTopActions"><div class="scratchStatus">Session only · not saved</div></div>
      </div>
      <div class="scratchToolbar">
        <div class="toolGroup">
          <button class="colorBtn active" aria-label="Black pencil" title="Black pencil" style="background:#172033" onclick="chooseColor('#172033',this)"></button>
          <button class="colorBtn" aria-label="Blue pencil" title="Blue pencil" style="background:#2f62d0" onclick="chooseColor('#2f62d0',this)"></button>
          <button class="colorBtn" aria-label="Red pencil" title="Red pencil" style="background:#d44855" onclick="chooseColor('#d44855',this)"></button>
          <button class="colorBtn" aria-label="Green pencil" title="Green pencil" style="background:#21845e" onclick="chooseColor('#21845e',this)"></button>
          <button class="colorBtn" aria-label="Purple pencil" title="Purple pencil" style="background:#7651b8" onclick="chooseColor('#7651b8',this)"></button>
          <button class="colorBtn" aria-label="Orange pencil" title="Orange pencil" style="background:#d77b28" onclick="chooseColor('#d77b28',this)"></button>
        </div>
        <div class="toolGroup">
          <button id="eraserBtn" class="toolBtn iconBtn" onclick="setEraser()" aria-label="Eraser" title="Eraser">${whiteboardIcon("eraser")}</button>
          <button id="undoBtn" class="toolBtn iconBtn" onclick="undoScratch()" aria-label="Undo" title="Undo (Ctrl/Cmd+Z)">${whiteboardIcon("undo")}</button>
          <button id="redoBtn" class="toolBtn iconBtn" onclick="redoScratch()" aria-label="Redo" title="Redo (Ctrl+Y / Cmd+Shift+Z)">${whiteboardIcon("redo")}</button>
          <button class="toolBtn iconBtn" onclick="clearScratch()" aria-label="Clear board" title="Clear board">${whiteboardIcon("trash")}</button>
          <button id="panBtn" class="toolBtn iconBtn" onclick="setPanMode()" aria-label="Drag board" aria-pressed="false" title="Drag the whiteboard to move around the larger workspace">${whiteboardIcon("drag")}</button>
        </div>
        <div class="toolGroup"><span class="widthLabel">Size <span id="widthNum">3</span></span><input class="widthRange" type="range" min="1" max="8" value="3" step="1" oninput="setPenWidth(this.value)"></div>
        <div class="toolGroup fullscreenToolGroup"><button id="fullscreenBtn" class="toolBtn iconBtn" onclick="toggleScratchFullscreen()" aria-label="Fullscreen" aria-pressed="false" title="Fullscreen (F)">${whiteboardIcon("fullscreen")}</button></div>
      </div>
      <div class="canvasShell" id="canvasShell"><div class="boardStage"><canvas id="scratchCanvas" class="scratchCanvas"></canvas></div><div class="canvasHint">Write here with your stylus, finger, or mouse</div></div>
      <div class="scratchAnswers"><div class="options">${s.options.map((o,i)=>`<button class="option" data-i="${i}" onclick="choose(${i})">${o}</button>`).join("")}</div><div id="feedback" class="feedback"></div></div>
    </div>
    <div class="spacer"></div>${actionsHTML(false)}`;
    setTimeout(setupScratchCanvas,0);
  }
  selected=null;
  rememberCoursePosition();
  updateProgress();
  renderSidebar();
  queueMathTypeset(card);
  window.scrollTo({top:0,behavior:"smooth"});
}

function next(){
  const u=units[state.unit], l=u.lessons[state.lesson];
  if(state.screen<l.screens.length-1){state.screen++;rememberCoursePosition();save();render();return;}
  state.done[key(state.unit,state.lesson)]=true;
  if(state.lesson<u.lessons.length-1){
    state.lesson++; state.screen=0;
  }else{
    const entries=lessonUnitEntries(selectedCourseLesson);
    const pos=entries.findIndex(({i})=>i===state.unit);
    if(pos>=0 && pos<entries.length-1){state.unit=entries[pos+1].i;state.lesson=0;state.screen=0;}
    else state.screen=l.screens.length-1;
  }
  rememberCoursePosition();
  save();
  render();
}

function resetProgress(){
  if(confirm(cloudUsername ? "Reset lesson progress and clear this session’s whiteboards? Your notes will be kept and the progress reset will sync to the cloud." : "Reset lesson progress and clear this session’s whiteboards? Your notes will be kept.")){
    const keptNotes=Array.isArray(state.notesList) ? JSON.parse(JSON.stringify(state.notesList)) : [];
    const keptActive=state.activeNoteId || (keptNotes[0]?.id ?? null);
    const keptLegacyNotes=typeof state.notes==="string" ? state.notes : "";
    state={unit:0,lesson:0,screen:0,done:{},notes:keptLegacyNotes,notesList:keptNotes,activeNoteId:keptActive,courseLesson:selectedCourseLesson,coursePositions:{},version:16};
    restoreCoursePosition(selectedCourseLesson);
    rememberCoursePosition(selectedCourseLesson);
    clearSessionWhiteboards();
    saveStateOnly();
    renderNotes();
    renderCourseMap();
    render();
  }
}

// Migrate the pre-Lesson-2 navigation position without touching existing Lesson 1 progress.
if(!state.coursePositions || typeof state.coursePositions!=="object") state.coursePositions={};
if(unitBelongsToLesson(state.unit,1) && !state.coursePositions["1"]){
  state.coursePositions["1"]={unit:state.unit,lesson:state.lesson,screen:state.screen};
}

// The original two-lesson navigation bootstrap only restored Lessons 1–2. Once later
// lessons were added, a reload could keep state.courseLesson=6/7 yet reset the visible
// selectedCourseLesson to 1. Restore the persisted course lesson generically. Later
// lesson files finish registering their units, and lesson7.js performs the final render.
const persistedCourseLesson=Number(state.courseLesson || localStorage.getItem("odeCourseLesson") || selectedCourseLesson || 1);
if(Number.isFinite(persistedCourseLesson) && persistedCourseLesson>=1){
  selectedCourseLesson=persistedCourseLesson;
  localStorage.setItem("odeCourseLesson",String(selectedCourseLesson));
}
if(lessonUnitEntries(selectedCourseLesson).length && !unitBelongsToLesson(state.unit,selectedCourseLesson)) restoreCoursePosition(selectedCourseLesson);
if(unitBelongsToLesson(state.unit,selectedCourseLesson)) rememberCoursePosition(selectedCourseLesson);

renderCourseMap();
render();