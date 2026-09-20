(() => {
  const mounted = new Map();
  const presets = new Map();
  const COLORS = () => (window.Desmos && Desmos.Colors) ? Desmos.Colors : { BLUE:'#2d70b3', RED:'#c74440', GREEN:'#388c46', PURPLE:'#6042a6', ORANGE:'#fa7e19', BLACK:'#000' };

  function opts(bounds) {
    return {
      expressions: true,
      settingsMenu: false,
      zoomButtons: true,
      keypad: false,
      expressionsCollapsed: false,
      border: false,
      invertedColors: false,
      xAxisLabel: bounds && bounds.xLabel || '',
      yAxisLabel: bounds && bounds.yLabel || ''
    };
  }

  function calcFor(host, bounds) {
    const calc = Desmos.GraphingCalculator(host, opts(bounds));
    if (bounds) calc.setMathBounds({ left: bounds.left, right: bounds.right, bottom: bounds.bottom, top: bounds.top });
    mounted.set(host.id, { host, calc, type: host.dataset.desmosExplorer });
    host.dataset.desmosMounted = '1';
    return calc;
  }

  function expr(calc, id, latex, extra={}) { calc.setExpression({ id, latex, ...extra }); }
  function slider(calc,id,latex,min,max,step){ calc.setExpression({id,latex,sliderBounds:{min:String(min),max:String(max),step:String(step)}}); }
  function helper(calc, latex, fn) {
    const h = calc.HelperExpression({ latex });
    const push = () => { if(Number.isFinite(h.numericValue)) fn(h.numericValue); };
    h.observe('numericValue', push);
    push();
    return h;
  }
  function num(v, digits=3){
    if(!Number.isFinite(v)) return '—';
    const epsilon = 0.5 * Math.pow(10,-digits);
    const clean = Math.abs(v) < epsilon ? 0 : Number(v);
    return clean.toFixed(digits).replace(/\.?0+$/,'');
  }
  function setText(id, html){ const el=document.getElementById(id); if(el) el.innerHTML=html; }
  function setBadge(id,text,kind=''){ const el=document.getElementById(id); if(!el)return; el.textContent=text; el.className='mathExplorerBadge '+kind; }
  function setMany(calc, values){ Object.entries(values).forEach(([id,val]) => calc.setExpression({id,latex:`${id}=${val}`})); }

  function initResonance(host){
    const c=COLORS(), calc=calcFor(host,{left:0,right:7,bottom:0,top:7,xLabel:'ω',yLabel:'R'});
    slider(calc,'m','m=1',0.2,5,0.1); slider(calc,'k','k=4',0.2,20,0.1); slider(calc,'c','c=0.6',0,8,0.1); slider(calc,'A','A=1',0.2,5,0.1);
    expr(calc,'resp','R(x)=\\frac{A}{\\sqrt{(k-mx^2)^2+(cx)^2}}\\{x\\ge0\\}',{color:c.BLUE,lineWidth:3,label:'response amplitude',showLabel:true});
    expr(calc,'w0','x=\\sqrt{k/m}',{color:c.PURPLE,lineStyle:Desmos.Styles.DASHED,label:'ω₀',showLabel:true});
    expr(calc,'wr','x=\\sqrt{k/m-c^2/(2m^2)}\\{c^2<2mk\\}',{color:c.ORANGE,lineStyle:Desmos.Styles.DASHED,label:'ωᵣ',showLabel:true});
    const v={m:1,k:4,c:.6}; const update=()=>{const w0=Math.sqrt(v.k/v.m); if(v.c===0){setBadge('resonanceBadge','Undamped resonance','critical');setText('resonanceReadout',`<span>ω₀ = ${num(w0)}</span><span>ideal peak is unbounded at ω₀</span>`);return;} const q=v.c*v.c<2*v.m*v.k; const wr=q?Math.sqrt(v.k/v.m-v.c*v.c/(2*v.m*v.m)):NaN; setBadge('resonanceBadge',q?'Finite resonance peak':'No positive-frequency peak',q?'under':'over'); setText('resonanceReadout',`<span>ω₀ = ${num(w0)}</span><span>${q?`ωᵣ = ${num(wr)}`:'c² ≥ 2mk'}</span>`);};
    ['m','k','c'].forEach(name=>helper(calc,name,n=>{v[name]=n;update();}));
    presets.set('resonance',(p)=>{const map={none:{m:1,k:4,c:0,A:1},light:{m:1,k:4,c:.6,A:1},strong:{m:1,k:4,c:2.4,A:1},nopeak:{m:1,k:4,c:3.2,A:1}};setMany(calc,map[p]||map.light);});
  }

  function initRLC(host){
    const c=COLORS(), calc=calcFor(host,{left:0,right:10,bottom:-2.5,top:2.5,xLabel:'t',yLabel:'q, i'});
    slider(calc,'L','L=1',0.2,5,0.1); slider(calc,'R','R=2',0,10,0.1); slider(calc,'C','C=0.25',0.05,2,0.05); slider(calc,'q_0','q_0=1',-2,2,0.1); slider(calc,'i_0','i_0=0',-3,3,0.1);
    expr(calc,'D','D=R^2-4L/C',{hidden:true}); expr(calc,'a','a=-R/(2L)',{hidden:true});
    expr(calc,'wd','w_d=\\sqrt{-D}/(2L)',{hidden:true}); expr(calc,'bu','B_u=(i_0-aq_0)/w_d',{hidden:true}); expr(calc,'qu','q_u(x)=e^{ax}(q_0\\cos(w_dx)+B_u\\sin(w_dx))',{hidden:true});
    expr(calc,'r1','r_1=(-R+\\sqrt{D})/(2L)',{hidden:true}); expr(calc,'r2','r_2=(-R-\\sqrt{D})/(2L)',{hidden:true}); expr(calc,'ao','A_o=(i_0-r_2q_0)/(r_1-r_2)',{hidden:true}); expr(calc,'bo','B_o=(r_1q_0-i_0)/(r_1-r_2)',{hidden:true}); expr(calc,'qo','q_o(x)=A_oe^{r_1x}+B_oe^{r_2x}',{hidden:true});
    expr(calc,'bc','B_c=i_0-aq_0',{hidden:true}); expr(calc,'qc','q_c(x)=(q_0+B_cx)e^{ax}',{hidden:true});
    expr(calc,'q-under','q_u(x)\\{D<0\\}\\{x\\ge0\\}',{color:c.BLUE,lineWidth:3,label:'q(t)',showLabel:true}); expr(calc,'q-over','q_o(x)\\{D>0\\}\\{x\\ge0\\}',{color:c.BLUE,lineWidth:3,label:'q(t)',showLabel:true}); expr(calc,'q-crit','q_c(x)\\{D=0\\}\\{x\\ge0\\}',{color:c.BLUE,lineWidth:3,label:'q(t)',showLabel:true});
    expr(calc,'i-under','q_u\'(x)\\{D<0\\}\\{x\\ge0\\}',{color:c.RED,lineWidth:2,label:'i(t)',showLabel:true}); expr(calc,'i-over','q_o\'(x)\\{D>0\\}\\{x\\ge0\\}',{color:c.RED,lineWidth:2,label:'i(t)',showLabel:true}); expr(calc,'i-crit','q_c\'(x)\\{D=0\\}\\{x\\ge0\\}',{color:c.RED,lineWidth:2,label:'i(t)',showLabel:true});
    const v={L:1,R:2,C:.25}; const update=()=>{const D=v.R*v.R-4*v.L/v.C,rc=2*Math.sqrt(v.L/v.C); let label,kind;if(Math.abs(D)<1e-8){label='Critical';kind='critical';}else if(D<0){label=v.R===0?'Undamped':'Underdamped';kind=v.R===0?'undamped':'under';}else{label='Overdamped';kind='over';} setBadge('rlcBadge',label,kind);setText('rlcReadout',`<span>Δ = ${num(D)}</span><span>Rcrit = ${num(rc)}</span>`);};
    ['L','R','C'].forEach(name=>helper(calc,name,n=>{v[name]=n;update();}));
    presets.set('rlc',(p)=>{const map={undamped:{L:1,R:0,C:.25,q_0:1,i_0:0},under:{L:1,R:2,C:.25,q_0:1,i_0:0},critical:{L:1,R:4,C:.25,q_0:1,i_0:0},over:{L:1,R:6,C:.25,q_0:1,i_0:0}};setMany(calc,map[p]||map.under);});
  }

  function initVisco(host){
    const c=COLORS(), calc=calcFor(host,{left:0,right:12,bottom:0,top:4,xLabel:'t',yLabel:'ε'});
    slider(calc,'E','E=2',0.2,8,0.1); slider(calc,'eta','\\eta=4',0.2,20,0.1); slider(calc,'sigma','\\sigma=1',0.2,5,0.1);
    expr(calc,'tau','\\tau=\\eta/E',{hidden:true});
    expr(calc,'maxwell','\\varepsilon_M(x)=\\sigma/E+(\\sigma/\\eta)x',{color:c.RED,lineWidth:3,label:'Maxwell creep',showLabel:true});
    expr(calc,'kelvin','\\varepsilon_K(x)=(\\sigma/E)(1-e^{-Ex/\\eta})',{color:c.BLUE,lineWidth:3,label:'Kelvin–Voigt creep',showLabel:true});
    expr(calc,'limit','y=\\sigma/E',{color:c.GREEN,lineStyle:Desmos.Styles.DASHED,label:'σ/E',showLabel:true});
    const v={E:2,eta:4,sigma:1};const update=()=>{const tau=v.eta/v.E,fin=v.sigma/v.E,slope=v.sigma/v.eta;setBadge('viscoBadge',`τ = ${num(tau)} s`,'under');setText('viscoReadout',`<span>Kelvin–Voigt limit = ${num(fin)}</span><span>Maxwell creep slope = ${num(slope)}</span>`);};
    helper(calc,'E',n=>{v.E=n;update();});helper(calc,'\\eta',n=>{v.eta=n;update();});helper(calc,'\\sigma',n=>{v.sigma=n;update();});
    presets.set('visco',(p)=>{const map={balanced:{E:2,eta:4,sigma:1},fast:{E:2,eta:1,sigma:1},slow:{E:2,eta:10,sigma:1}};const a=map[p]||map.balanced;calc.setExpression({id:'E',latex:`E=${a.E}`});calc.setExpression({id:'eta',latex:`\\eta=${a.eta}`});calc.setExpression({id:'sigma',latex:`\\sigma=${a.sigma}`});});
  }

  function initHeaviside(host){
    const c=COLORS(), calc=calcFor(host,{left:-1,right:10,bottom:-3,top:3,xLabel:'t',yLabel:''});
    slider(calc,'a','a=2',0,7,0.1); slider(calc,'b','b=5',0.5,9,0.1); slider(calc,'A','A=2',0.5,3,0.1); slider(calc,'w','\\omega=2',0.2,6,0.1);
    const ids={step:['hs0','hs1'],pulse:['hp0','hp1','hp2'],delay:['hd0','hd1']};
    expr(calc,'ma','x=a',{color:c.PURPLE,lineStyle:Desmos.Styles.DASHED,label:'a',showLabel:true});expr(calc,'mb','x=b',{color:c.ORANGE,lineStyle:Desmos.Styles.DASHED,label:'b',showLabel:true});
    expr(calc,'hs0','y=0\\{x<a\\}',{color:c.BLUE,lineWidth:3});expr(calc,'hs1','y=1\\{x\\ge a\\}',{color:c.BLUE,lineWidth:3});
    expr(calc,'hp0','y=0\\{x<a\\}',{color:c.GREEN,lineWidth:3,hidden:true});expr(calc,'hp1','y=A\\{a\\le x<b\\}',{color:c.GREEN,lineWidth:3,hidden:true});expr(calc,'hp2','y=0\\{x\\ge b\\}',{color:c.GREEN,lineWidth:3,hidden:true});
    expr(calc,'hd0','y=0\\{x<a\\}',{color:c.RED,lineWidth:3,hidden:true});expr(calc,'hd1','y=\\sin(\\omega(x-a))\\{x\\ge a\\}',{color:c.RED,lineWidth:3,hidden:true});
    let mode='step', vals={a:2,b:5,A:2,w:2};
    function show(m){mode=m;Object.entries(ids).forEach(([key,list])=>list.forEach(id=>calc.setExpression({id,hidden:key!==m})));calc.setExpression({id:'mb',hidden:m!=='pulse'});update();}
    function update(){if(mode==='step'){setBadge('heavisideBadge','Step','under');setText('heavisideReadout',`<span>H(t−${num(vals.a,1)})</span><span>switches from 0 to 1</span>`);}else if(mode==='pulse'){const ok=vals.b>vals.a;setBadge('heavisideBadge',ok?'Finite pulse':'Need b > a',ok?'critical':'over');setText('heavisideReadout',`<span>${num(vals.A,1)}[H(t−${num(vals.a,1)})−H(t−${num(vals.b,1)})]</span><span>${ok?`active for ${num(vals.b-vals.a,1)} time units`:'drag b to the right of a'}</span>`);}else{setBadge('heavisideBadge','True time delay','under');setText('heavisideReadout',`<span>H(t−${num(vals.a,1)}) sin[${num(vals.w,1)}(t−${num(vals.a,1)})]</span><span>internal clock starts at t=a</span>`);}}
    helper(calc,'a',n=>{vals.a=n;update();});helper(calc,'b',n=>{vals.b=n;update();});helper(calc,'A',n=>{vals.A=n;update();});helper(calc,'\\omega',n=>{vals.w=n;update();});
    presets.set('heaviside',(p)=>{if(p==='step'){show('step');}else if(p==='pulse'){show('pulse');}else{show('delay');}});show('step');
  }

  function initPeriodic(host){
    const c=COLORS(), calc=calcFor(host,{left:0,right:20,bottom:-1,top:10,xLabel:'t',yLabel:''});
    slider(calc,'T','T=4',1,8,0.5);slider(calc,'A','A=2',0.5,5,0.5);slider(calc,'d','d=0.5',0.1,0.9,0.05);
    expr(calc,'u','u(x)=x-T\\operatorname{floor}(x/T)',{hidden:true});
    expr(calc,'ptop','y=A\\{0\\le u(x)<dT\\}\\{x\\ge0\\}',{color:c.BLUE,lineWidth:3,label:'periodic pulse',showLabel:true});
    expr(calc,'pbase','y=0\\{dT\\le u(x)<T\\}\\{x\\ge0\\}',{color:c.BLUE,lineWidth:3});
    expr(calc,'stair','y=A\\operatorname{floor}(x/T)\\{x\\ge0\\}',{color:c.ORANGE,lineWidth:3,label:'staircase',showLabel:true,hidden:true});
    let mode='pulse',v={T:4,A:2,d:.5};function update(){if(mode==='pulse'){setBadge('periodicBadge',`Periodic · T = ${num(v.T,1)}`,'under');setText('periodicReadout',`<span>f(t+T)=f(t)</span><span>one-period average = A·d = ${num(v.A*v.d)}</span>`);}else{setBadge('periodicBadge','Staircase · not periodic','critical');setText('periodicReadout',`<span>r(t+T)=r(t)+A</span><span>increment each period = ${num(v.A)}</span>`);}}
    ['T','A','d'].forEach(name=>helper(calc,name,n=>{v[name]=n;update();}));presets.set('periodic',(p)=>{mode=p==='stair'?'stair':'pulse';calc.setExpression({id:'ptop',hidden:mode!=='pulse'});calc.setExpression({id:'pbase',hidden:mode!=='pulse'});calc.setExpression({id:'stair',hidden:mode!=='stair'});update();});update();
  }

  function initLaplace(host){
    const c=COLORS(), calc=calcFor(host,{left:0,right:8,bottom:0,top:8,xLabel:'t',yLabel:''});
    slider(calc,'a','a=1',-1,2,0.1); slider(calc,'s','s=2.5',-1,4,0.1);
    expr(calc,'integrand','y=e^{(a-s)x}\\{x\\ge0\\}',{color:c.BLUE,lineWidth:3,label:'e^{(a-s)t}',showLabel:true});
    expr(calc,'accum','y=\\int_0^x e^{(a-s)t}dt\\{x\\ge0\\}',{color:c.GREEN,lineWidth:3,label:'accumulated area',showLabel:true});
    expr(calc,'limit','y=1/(s-a)\\{s>a\\}',{color:c.ORANGE,lineStyle:Desmos.Styles.DASHED,label:'finite limit',showLabel:true});
    const v={a:1,s:2.5};
    function update(){const gap=v.s-v.a;if(Math.abs(gap)<1e-8){setBadge('laplaceBadge','Boundary: diverges','critical');setText('laplaceReadout','<span>s = a → integrand = 1</span><span>area grows like T</span>');}else if(gap>0){setBadge('laplaceBadge','Converges','under');setText('laplaceReadout',`<span>s−a = ${num(gap)}</span><span>limit = 1/(s−a) = ${num(1/gap)}</span>`);}else{setBadge('laplaceBadge','Diverges','over');setText('laplaceReadout',`<span>a−s = ${num(-gap)}</span><span>weighted integrand grows exponentially</span>`);}}
    helper(calc,'a',n=>{v.a=n;update();}); helper(calc,'s',n=>{v.s=n;update();}); update();
    presets.set('laplace',(p)=>{const map={converges:{a:1,s:2.5},boundary:{a:1,s:1},diverges:{a:1,s:.4}};setMany(calc,map[p]||map.converges);});
  }

  function initConvolution(host){
    const c=COLORS(), calc=calcFor(host,{left:-1,right:3,bottom:-.5,top:2.2,xLabel:'τ',yLabel:''});
    slider(calc,'T','T=0.6',0,3,0.05);
    expr(calc,'fbase','y=1\\{0\\le x\\le1\\}',{color:c.BLUE,lineWidth:4,label:'f(τ)',showLabel:true});
    expr(calc,'gshift','y=1.35\\{T-1\\le x\\le T\\}',{color:c.RED,lineWidth:4,label:'g(T−τ)',showLabel:true});
    expr(calc,'product','y=1\\{\\max(0,T-1)\\le x\\le\\min(1,T)\\}',{color:c.GREEN,lineWidth:7,label:'product = 1 on overlap',showLabel:true});
    expr(calc,'leftmark','x=\\max(0,T-1)',{color:c.GREEN,lineStyle:Desmos.Styles.DASHED,opacity:.35});
    expr(calc,'rightmark','x=\\min(1,T)',{color:c.GREEN,lineStyle:Desmos.Styles.DASHED,opacity:.35});
    const v={T:.6};
    function overlap(t){return Math.max(0,Math.min(1,t)-Math.max(0,t-1));}
    function update(){const h=overlap(v.T);let label,kind;if(h<=1e-8){label='No overlap';kind='over';}else if(Math.abs(h-1)<1e-8){label='Full overlap';kind='critical';}else{label=v.T<1?'Overlap increasing':'Overlap decreasing';kind='under';}setBadge('convolutionBadge',label,kind);setText('convolutionReadout',`<span>T = ${num(v.T,2)}</span><span>(f*g)(T) = overlap area = ${num(h,3)}</span>`);}
    helper(calc,'T',n=>{v.T=n;update();}); update();
    presets.set('convolution',(p)=>{const map={enter:.45,peak:1,leave:1.55,gone:2.5};calc.setExpression({id:'T',latex:`T=${map[p]??.6}`});});
  }

  function initSeries(host){
    const c=COLORS(), calc=calcFor(host,{left:-1.5,right:1.5,bottom:-6,top:10,xLabel:'x',yLabel:''});
    slider(calc,'N','N=5',0,30,1);slider(calc,'p','p=0.5',-1.4,1.4,0.05);
    expr(calc,'sum','S_N(x)=\\sum_{n=0}^{N}x^n',{color:c.BLUE,lineWidth:3,label:'partial sum S_N',showLabel:true});
    expr(calc,'exact','y=1/(1-x)\\{-1<x<1\\}',{color:c.RED,lineWidth:2,label:'1/(1−x), |x|<1',showLabel:true});
    expr(calc,'left','x=-1',{color:c.PURPLE,lineStyle:Desmos.Styles.DASHED,label:'−R',showLabel:true});expr(calc,'right','x=1',{color:c.PURPLE,lineStyle:Desmos.Styles.DASHED,label:'R',showLabel:true});
    expr(calc,'sample','(p,S_N(p))',{color:c.BLUE,pointSize:8,showLabel:true,label:'sample'});
    const v={N:5,p:.5};function update(){const inside=Math.abs(v.p)<1-1e-9,boundary=Math.abs(Math.abs(v.p)-1)<1e-9;let kind=inside?'under':boundary?'critical':'over';let label=inside?'Inside radius':boundary?'On boundary':'Outside radius';let sn;if(Math.abs(v.p-1)<1e-10)sn=v.N+1;else sn=(1-Math.pow(v.p,v.N+1))/(1-v.p);const exact=inside?1/(1-v.p):NaN;setBadge('seriesBadge',label,kind);setText('seriesReadout',`<span>N = ${Math.round(v.N)}, p = ${num(v.p,2)}</span><span>S_N(p) = ${num(sn)}${inside?`, exact = ${num(exact)}`:''}</span>`);}
    helper(calc,'N',n=>{v.N=n;update();});helper(calc,'p',n=>{v.p=n;update();});presets.set('series',(x)=>{const map={inside:.5,near:.95,outside:1.1};calc.setExpression({id:'p',latex:`p=${map[x]??.5}`});});
  }

  function initProjection(host){
    const c=COLORS(), calc=calcFor(host,{left:-6,right:6,bottom:-6,top:6,xLabel:'x',yLabel:'y'});
    slider(calc,'u_x','u_x=3',-5,5,.1);slider(calc,'u_y','u_y=2',-5,5,.1);slider(calc,'phi','\\phi=0.6',0,6.28,.02);
    expr(calc,'d','d=u_x\\cos\\phi+u_y\\sin\\phi',{hidden:true});expr(calc,'px','p_x=d\\cos\\phi',{hidden:true});expr(calc,'py','p_y=d\\sin\\phi',{hidden:true});
    expr(calc,'line','(t\\cos\\phi,t\\sin\\phi)\\{-8<t<8\\}',{color:c.BLACK,lineWidth:1});
    expr(calc,'uvec','(tu_x,tu_y)\\{0\\le t\\le1\\}',{color:c.BLUE,lineWidth:4,label:'u',showLabel:true});expr(calc,'pvec','(tp_x,tp_y)\\{0\\le t\\le1\\}',{color:c.GREEN,lineWidth:4,label:'proj u',showLabel:true});expr(calc,'err','(p_x+t(u_x-p_x),p_y+t(u_y-p_y))\\{0\\le t\\le1\\}',{color:c.RED,lineWidth:3,label:'error',showLabel:true});expr(calc,'upoint','(u_x,u_y)',{color:c.BLUE,pointSize:7});expr(calc,'ppoint','(p_x,p_y)',{color:c.GREEN,pointSize:7});
    const v={ux:3,uy:2,phi:.6};function update(){const co=Math.cos(v.phi),si=Math.sin(v.phi),dot=v.ux*co+v.uy*si,px=dot*co,py=dot*si,resdot=(v.ux-px)*co+(v.uy-py)*si;setBadge('projectionBadge','Residual ⟂ line','under');setText('projectionReadout',`<span>proj = (${num(px)}, ${num(py)})</span><span>(u−p)·v = ${num(resdot,6)}</span>`);}
    helper(calc,'u_x',n=>{v.ux=n;update();});helper(calc,'u_y',n=>{v.uy=n;update();});helper(calc,'\\phi',n=>{v.phi=n;update();});update();
    presets.set('projection',(p)=>{const map={oblique:{ux:3,uy:2,phi:.6},horizontal:{ux:3,uy:2,phi:0},vertical:{ux:3,uy:2,phi:Math.PI/2}};const a=map[p]||map.oblique;calc.setExpression({id:'u_x',latex:`u_x=${a.ux}`});calc.setExpression({id:'u_y',latex:`u_y=${a.uy}`});calc.setExpression({id:'phi',latex:`\\phi=${a.phi}`});});
  }

  function initSystem(host){
    const c=COLORS(), calc=calcFor(host,{left:-6,right:6,bottom:-6,top:6,xLabel:'x',yLabel:'y'});
    slider(calc,'m','m=1',-4,4,0.1); slider(calc,'n','n=-0.5',-4,4,0.1); slider(calc,'b','b=1',-4,4,0.1); slider(calc,'c0','c=0',-4,4,0.1);
    expr(calc,'line1','y=mx+b',{color:c.BLUE,lineWidth:3,label:'equation 1',showLabel:true});
    expr(calc,'line2','y=nx+c',{color:c.RED,lineWidth:3,label:'equation 2',showLabel:true});
    expr(calc,'ix','x=(c-b)/(m-n)\\{m\\ne n\\}',{color:c.GREEN,lineStyle:Desmos.Styles.DASHED,opacity:.4});
    expr(calc,'ip','((c-b)/(m-n),m(c-b)/(m-n)+b)\\{m\\ne n\\}',{color:c.GREEN,pointSize:9,label:'solution',showLabel:true});
    const v={m:1,n:-.5,b:1,c:0};
    function update(){const ds=v.m-v.n,di=v.b-v.c;if(Math.abs(ds)>1e-7){const x=(v.c-v.b)/ds,y=v.m*x+v.b;setBadge('systemBadge','One solution','under');setText('systemReadout',`<span>slopes differ</span><span>(x,y) = (${num(x)}, ${num(y)})</span>`);}else if(Math.abs(di)>1e-7){setBadge('systemBadge','No solution','over');setText('systemReadout','<span>same slope, different intercepts</span><span>parallel distinct lines</span>');}else{setBadge('systemBadge','Infinitely many solutions','critical');setText('systemReadout','<span>same slope and intercept</span><span>the equations describe the same line</span>');}}
    helper(calc,'m',x=>{v.m=x;update();});helper(calc,'n',x=>{v.n=x;update();});helper(calc,'b',x=>{v.b=x;update();});helper(calc,'c',x=>{v.c=x;update();});update();
    presets.set('system',(p)=>{const map={unique:{m:1,n:-.5,b:1,c:0},none:{m:1,n:1,b:1,c:-1},infinite:{m:1,n:1,b:1,c:1}};const a=map[p]||map.unique;calc.setExpression({id:'m',latex:`m=${a.m}`});calc.setExpression({id:'n',latex:`n=${a.n}`});calc.setExpression({id:'b',latex:`b=${a.b}`});calc.setExpression({id:'c0',latex:`c=${a.c}`});});
  }

  function initDeterminant(host){
    const c=COLORS(), calc=calcFor(host,{left:-6,right:6,bottom:-6,top:6,xLabel:'x',yLabel:'y'});
    slider(calc,'a','a=2',-4,4,0.1); slider(calc,'b','b=0.5',-4,4,0.1); slider(calc,'c0','c=0.5',-4,4,0.1); slider(calc,'d','d=1.5',-4,4,0.1);
    expr(calc,'col1','(ta,tc)\\{0\\le t\\le1\\}',{color:c.BLUE,lineWidth:4,label:'column 1',showLabel:true});
    expr(calc,'col2','(tb,td)\\{0\\le t\\le1\\}',{color:c.RED,lineWidth:4,label:'column 2',showLabel:true});
    expr(calc,'edge3','(a+tb,c+td)\\{0\\le t\\le1\\}',{color:c.GREEN,lineWidth:3});
    expr(calc,'edge4','(b+ta,d+tc)\\{0\\le t\\le1\\}',{color:c.GREEN,lineWidth:3});
    expr(calc,'p0','(0,0)',{color:c.BLACK,pointSize:5});expr(calc,'p1','(a,c)',{color:c.BLUE,pointSize:7});expr(calc,'p2','(b,d)',{color:c.RED,pointSize:7});expr(calc,'p3','(a+b,c+d)',{color:c.GREEN,pointSize:7});
    const v={a:2,b:.5,c:.5,d:1.5};
    function update(){const det=v.a*v.d-v.b*v.c,area=Math.abs(det);const singular=area<1e-7;setBadge('detBadge',singular?'Singular · area collapsed':det>0?'Invertible · orientation preserved':'Invertible · orientation reversed',singular?'over':det>0?'under':'critical');setText('detReadout',`<span>det(A) = ${num(det)}</span><span>|det(A)| = area scale = ${num(area)}</span>`);}
    helper(calc,'a',x=>{v.a=x;update();});helper(calc,'b',x=>{v.b=x;update();});helper(calc,'c',x=>{v.c=x;update();});helper(calc,'d',x=>{v.d=x;update();});update();
    presets.set('determinant',(p)=>{const map={stretch:{a:2,b:0,c:0,d:1.5},shear:{a:1,b:1.5,c:0,d:1},reflect:{a:-1,b:0,c:0,d:1},singular:{a:1,b:2,c:.5,d:1}};const z=map[p]||map.stretch;calc.setExpression({id:'a',latex:`a=${z.a}`});calc.setExpression({id:'b',latex:`b=${z.b}`});calc.setExpression({id:'c0',latex:`c=${z.c}`});calc.setExpression({id:'d',latex:`d=${z.d}`});});
  }

  function initEigen(host){
    const c=COLORS(), calc=calcFor(host,{left:-7,right:7,bottom:-7,top:7,xLabel:'x',yLabel:'y'});
    slider(calc,'lambda_1','\\lambda_1=3',-4,5,.1);slider(calc,'lambda_2','\\lambda_2=0.7',-4,5,.1);slider(calc,'alpha','\\alpha=0.6',0,3.14,.02);slider(calc,'phi','\\phi=1.1',0,6.28,.02);
    expr(calc,'q1x','q_{1x}=\\cos\\alpha',{hidden:true});expr(calc,'q1y','q_{1y}=\\sin\\alpha',{hidden:true});expr(calc,'q2x','q_{2x}=-\\sin\\alpha',{hidden:true});expr(calc,'q2y','q_{2y}=\\cos\\alpha',{hidden:true});
    expr(calc,'vx','v_x=2\\cos\\phi',{hidden:true});expr(calc,'vy','v_y=2\\sin\\phi',{hidden:true});expr(calc,'aa','a=v_xq_{1x}+v_yq_{1y}',{hidden:true});expr(calc,'bb','b=v_xq_{2x}+v_yq_{2y}',{hidden:true});expr(calc,'wx','w_x=\\lambda_1a q_{1x}+\\lambda_2b q_{2x}',{hidden:true});expr(calc,'wy','w_y=\\lambda_1a q_{1y}+\\lambda_2b q_{2y}',{hidden:true});
    expr(calc,'e1','(tq_{1x},tq_{1y})\\{-7<t<7\\}',{color:c.PURPLE,lineStyle:Desmos.Styles.DASHED,label:'q₁',showLabel:true});expr(calc,'e2','(tq_{2x},tq_{2y})\\{-7<t<7\\}',{color:c.ORANGE,lineStyle:Desmos.Styles.DASHED,label:'q₂',showLabel:true});
    expr(calc,'vin','(tv_x,tv_y)\\{0\\le t\\le1\\}',{color:c.BLUE,lineWidth:4,label:'v',showLabel:true});expr(calc,'wout','(tw_x,tw_y)\\{0\\le t\\le1\\}',{color:c.RED,lineWidth:4,label:'Av',showLabel:true});expr(calc,'vp','(v_x,v_y)',{color:c.BLUE,pointSize:7});expr(calc,'wp','(w_x,w_y)',{color:c.RED,pointSize:7});
    const v={l1:3,l2:.7,alpha:.6,phi:1.1};function update(){const ct=Math.cos(v.alpha),st=Math.sin(v.alpha),cp=Math.cos(v.phi),sp=Math.sin(v.phi),vx=2*cp,vy=2*sp,a=vx*ct+vy*st,b=vx*(-st)+vy*ct,wx=v.l1*a*ct+v.l2*b*(-st),wy=v.l1*a*st+v.l2*b*ct,cross=vx*wy-vy*wx;const scalar=Math.abs(v.l1-v.l2)<1e-7,aligned=scalar||Math.abs(cross)<1e-4;const A11=v.l1*ct*ct+v.l2*st*st,A12=(v.l1-v.l2)*st*ct,A22=v.l1*st*st+v.l2*ct*ct;setBadge('eigenBadge',scalar?'Every direction is an eigen-direction':aligned?'Eigen-direction: no turning':'Generic vector: direction changes',aligned?'under':'critical');setText('eigenReadout',`<span>A ≈ [[${num(A11,2)}, ${num(A12,2)}], [${num(A12,2)}, ${num(A22,2)}]]</span><span>${scalar?'A is a scalar multiple of I':aligned?'Av is parallel to v':'v mixes both eigendirections'}</span>`);}
    helper(calc,'\\lambda_1',n=>{v.l1=n;update();});helper(calc,'\\lambda_2',n=>{v.l2=n;update();});helper(calc,'\\alpha',n=>{v.alpha=n;update();});helper(calc,'\\phi',n=>{v.phi=n;update();});update();
    presets.set('eigen',(p)=>{const map={generic:{l1:3,l2:.7,alpha:.6,phi:1.1},eig1:{l1:3,l2:.7,alpha:.6,phi:.6},eig2:{l1:3,l2:.7,alpha:.6,phi:.6+Math.PI/2},reverse:{l1:3,l2:-1,alpha:.6,phi:.6+Math.PI/2}};const z=map[p]||map.generic;calc.setExpression({id:'lambda_1',latex:`\\lambda_1=${z.l1}`});calc.setExpression({id:'lambda_2',latex:`\\lambda_2=${z.l2}`});calc.setExpression({id:'alpha',latex:`\\alpha=${z.alpha}`});calc.setExpression({id:'phi',latex:`\\phi=${z.phi}`});});
  }

  function initPhase(host){
    const c=COLORS(), calc=calcFor(host,{left:-8,right:8,bottom:-8,top:8,xLabel:'x₁',yLabel:'x₂'});
    slider(calc,'alpha','\\alpha=-0.4',-1,1,.05);slider(calc,'beta','\\beta=2',-5,5,.1);slider(calc,'x_0','x_0=3',-5,5,.1);slider(calc,'y_0','y_0=0.5',-5,5,.1);slider(calc,'T','T=10',1,12,.5);
    expr(calc,'fx','F_x(t,p,q)=e^{\\alpha t}(p\\cos(\\beta t)-q\\sin(\\beta t))',{hidden:true});expr(calc,'fy','F_y(t,p,q)=e^{\\alpha t}(p\\sin(\\beta t)+q\\cos(\\beta t))',{hidden:true});
    const seeds=[[3,0],[0,3],[-3,0],[0,-3],[2,2],[-2,2]];
    seeds.forEach((s,i)=>expr(calc,`traj${i}`,`(F_x(t,${s[0]},${s[1]}),F_y(t,${s[0]},${s[1]}))\\{0\\le t\\le T\\}`,{color:c.PURPLE,lineWidth:1,opacity:.35}));
    expr(calc,'chosen','(F_x(t,x_0,y_0),F_y(t,x_0,y_0))\\{0\\le t\\le T\\}',{color:c.BLUE,lineWidth:4,label:'chosen trajectory',showLabel:true});expr(calc,'init','(x_0,y_0)',{color:c.BLUE,pointSize:8,label:'X(0)',showLabel:true});
    const v={alpha:-.4,beta:2};function update(){const eps=1e-9;let label,kind,eigText,behaviorText;if(Math.abs(v.beta)<eps){if(Math.abs(v.alpha)<eps){label='Every point is equilibrium';kind='critical';eigText='λ = 0 (double)';behaviorText='no motion';}else if(v.alpha<0){label='Stable radial node';kind='under';eigText=`λ = ${num(v.alpha,2)} (double)`;behaviorText='no rotation; trajectories move straight inward';}else{label='Unstable radial node';kind='over';eigText=`λ = ${num(v.alpha,2)} (double)`;behaviorText='no rotation; trajectories move straight outward';}}else{if(Math.abs(v.alpha)<eps){label='Center';kind='critical';}else if(v.alpha<0){label='Spiral sink';kind='under';}else{label='Spiral source';kind='over';}eigText=`λ = ${num(v.alpha,2)} ± ${num(Math.abs(v.beta),2)}i`;behaviorText=v.alpha<0?'radius decays':v.alpha>0?'radius grows':'radius stays constant';}setBadge('phaseBadge',label,kind);setText('phaseReadout',`<span>${eigText}</span><span>${behaviorText}</span>`);}
    helper(calc,'\\alpha',n=>{v.alpha=n;update();});helper(calc,'\\beta',n=>{v.beta=n;update();});presets.set('phase',(p)=>{const map={sink:{alpha:-.4,beta:2,x_0:3,y_0:.5,T:10},center:{alpha:0,beta:2,x_0:3,y_0:.5,T:8},source:{alpha:.35,beta:2,x_0:1,y_0:.2,T:5},node:{alpha:-.4,beta:0,x_0:3,y_0:.5,T:10},slow:{alpha:-.25,beta:.6,x_0:3,y_0:.5,T:12}};const a=map[p]||map.sink;calc.setExpression({id:'alpha',latex:`\\alpha=${a.alpha}`});calc.setExpression({id:'beta',latex:`\\beta=${a.beta}`});calc.setExpression({id:'x_0',latex:`x_0=${a.x_0}`});calc.setExpression({id:'y_0',latex:`y_0=${a.y_0}`});calc.setExpression({id:'T',latex:`T=${a.T}`});});
  }

  const initializers={resonance:initResonance,rlc:initRLC,visco:initVisco,laplace:initLaplace,heaviside:initHeaviside,periodic:initPeriodic,convolution:initConvolution,series:initSeries,projection:initProjection,system:initSystem,determinant:initDeterminant,eigen:initEigen,phase:initPhase};

  function cleanup(){for(const [id,item] of mounted){if(!item.host.isConnected){try{item.calc.destroy();}catch(e){}mounted.delete(id);presets.delete(item.type);}}}
  function mount(){cleanup();if(!window.Desmos)return;document.querySelectorAll('[data-desmos-explorer]').forEach(host=>{if(host.dataset.desmosMounted==='1'||mounted.has(host.id))return;const fn=initializers[host.dataset.desmosExplorer];if(!fn)return;try{fn(host);}catch(err){console.error('Desmos explorer failed:',host.dataset.desmosExplorer,err);host.dataset.desmosMounted='error';host.innerHTML='<div class="mathExplorerError">Interactive graph failed to initialize. Reopen this screen to retry.</div>';}});}
  window.setMathExplorerPreset=(type,preset)=>{const fn=presets.get(type);if(fn)fn(preset);};
  window.__mathExplorers=mounted;
  function start(){const root=document.getElementById('card')||document.body;const observer=new MutationObserver(()=>mount());observer.observe(root,{childList:true,subtree:true});mount();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();