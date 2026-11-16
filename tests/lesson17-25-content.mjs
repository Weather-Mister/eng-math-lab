import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const context = vm.createContext({units:[],courseLessons:Array.from({length:25},(_,i)=>({number:i+1})),renderCourseMap(){},render(){}});
for(let n=17;n<=25;n++) vm.runInContext(readFileSync(new URL(`../lesson${n}.js`,import.meta.url),'utf8'),context);
const units=context.units;
const screens=units.flatMap(u=>u.lessons.flatMap(l=>l.screens.map(s=>({...s,number:u.courseLesson}))));
const named=(n,part)=>{
  const hits=screens.filter(s=>s.number===n&&s.title.includes(part));
  assert.equal(hits.length,1,`Ambiguous/missing screen ${n}: ${part}`);
  return hits[0];
};
const counts={};
const positions=[0,0,0];
let boards=0;
for(const unit of units){
  assert(unit.id.startsWith(`l${unit.courseLesson}-`));
  for(const lesson of unit.lessons) assert(lesson.screens.length>0);
}
assert.equal(new Set(units.map(u=>u.id)).size,units.length,'Duplicate unit IDs');
for(const s of screens){
  counts[s.number]=(counts[s.number]||0)+1;
  assert(s.title?.length>0);
  if(s.type==='bookproblem'){
    boards++;
    assert(s.prompt.length>20&&s.solution.length>80,s.title);
    assert(s.practiceLabel,'Missing visible provenance: '+s.title);
    if(!s.title.startsWith('O’Neil'))assert(!s.practiceLabel.startsWith('Textbook practice'),s.title);
  }
  if(s.type==='quiz'){
    assert.equal(s.options.length,3);
    assert(Number.isInteger(s.answer)&&s.answer>=0&&s.answer<3);
    assert.equal(new Set(s.options).size,3);
    assert(s.why.length>20,'Insufficient quiz explanation: '+s.title);
    positions[s.answer]++;
  }
  for(const html of [s.html,s.prompt,s.solution,s.q,s.why,...(s.options||[])].filter(Boolean)){
    assert(!/[\x08\x0b\x0c\t\r]/.test(html),'Escaped control character: '+s.title);
    for(const [a,b]of [['\\[','\\]'],['\\(','\\)']])assert.equal(html.split(a).length,html.split(b).length,'TeX delimiters: '+s.title);
  }
}
assert(positions.every(n=>n>=7),'Quiz answer positions are concentrated');
for(let n=17;n<=25;n++)assert(counts[n]>=20,`Lesson ${n} truncated`);

function near(a,b,label='numeric equality',epsilon=1e-9){
  if(Array.isArray(a)){
    assert.equal(a.length,b.length,label);
    a.forEach((x,i)=>near(x,b[i],label,epsilon));
  }else assert(Math.abs(a-b)<=epsilon,`${label}: ${a} != ${b}`);
}
const dot=(a,b)=>a.reduce((v,x,i)=>v+x*b[i],0);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const transpose=A=>A[0].map((_,i)=>A.map(r=>r[i]));
const multiply=(A,B)=>A.map(r=>transpose(B).map(c=>dot(r,c)));
const mv=(A,v)=>A.map(r=>dot(r,v));
const identity=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
function rref(input){
  const A=input.map(r=>r.slice());let row=0;
  for(let col=0;col<A[0].length&&row<A.length;col++){
    const k=A.findIndex((r,i)=>i>=row&&Math.abs(r[col])>1e-10);if(k<0)continue;
    [A[k],A[row]]=[A[row],A[k]];const p=A[row][col];A[row]=A[row].map(x=>x/p);
    for(let i=0;i<A.length;i++)if(i!==row){const f=A[i][col];A[i]=A[i].map((x,j)=>x-f*A[row][j]);}
    row++;
  }return A;
}
function determinant(A){
  if(A.length===1)return A[0][0];
  return A[0].reduce((sum,x,j)=>sum+(-1)**j*x*determinant(A.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
}
function scalar(tex,t=0){
  let s=tex.trim().replace(/\\(?:t?frac)\{([^{}]+)\}\{([^{}]+)\}/g,'(($1)/($2))')
    .replace(/\\(?:t?frac)(\d)\{([^{}]+)\}/g,'(($1)/($2))')
    .replace(/\\(?:t?frac)(\d)(\d)/g,'(($1)/($2))')
    .replace(/e\^\{([^{}]+)\}/g,'exp($1)')
    .replace(/e\^t/g,'exp(t)')
    .replace(/\\sqrt\{([^{}]+)\}/g,'sqrt($1)')
    .replace(/\\sqrt(\d+)/g,'sqrt($1)')
    .replace(/(\d|\))(?=exp|sqrt|t|\()/g,'$1*')
    .replace(/\bt\b/g,`(${t})`);
  // Only evaluate arithmetic emitted by our own restricted numeric TeX parser.
  assert(/^[\d+\-*/().\sexpqrt]+$/.test(s),'Unsupported numeric TeX: '+tex);
  s=s.replace(/exp/g,'Math.exp').replace(/sqrt/g,'Math.sqrt');
  const value=Function(`return (${s})`)();assert(Number.isFinite(value));return value;
}
function matrices(html,t=0){
  return [...html.matchAll(/\\begin\{(pmatrix|bmatrix|vmatrix|array)\}(?:\{[^}]*\})?([\s\S]*?)\\end\{\1\}/g)].map(m=>{
    const A=m[2].split('\\\\').map(r=>r.split('&').map(x=>scalar(x,t)));
    assert(A.every(r=>r.length===A[0].length),'Ragged matrix');return A;
  });
}
let algebraCases=0;
function test(label,fn){try{fn();algebraCases++;}catch(e){e.message=label+': '+e.message;throw e;}}
test('L17 geometry',()=>{
  near(cross([1,2,0],[0,1,3]),[6,-3,1]);near(cross([1,0,1],[0,2,1]),[-2,-1,2]);
  near(dot([6,-3,1],[1,2,0]),0);near(dot([6,-3,1],[0,1,3]),0);
  near(dot([-2,4,1],[-6,1,1]),17);
  near([2,1,-1,0].map((x,i)=>3*x-2*[1,-1,0,2][i]),[4,5,-3,-4]);
  near([2,1,2].map((x,i)=>x-8/9*[1,2,2][i]),[10/9,-7/9,2/9]);
});
test('L18 orthogonal bases',()=>{
  for(const [a,b]of [[[1,1,0],[1,-1,2]],[[1,4,0],[4,-1,0]],[[0,-1,2,0],[0,2,1,0]],[[1,1,1],[2,-1,-1]]])near(dot(a,b),0);
  near(Math.hypot(0,0,1,7),Math.sqrt(50));
});
for(const title of ['Example 11.3','Matrix order matters','Transfer 4 — row-by-column'])test('L18 '+title,()=>{
  const s=named(18,title),p=matrices(s.prompt),q=matrices(s.solution);
  near(multiply(p[0],p[1]),q[0]);
  if(title==='Matrix order matters')near(multiply(p[1],p[0]),q[1]);
});
test('L18 walks',()=>{const s=named(18,'Random walks —');const m=matrices(s.solution);near(multiply(m[0],m[0]),m[1]);});
for(const title of ['Example 11.13','Problem 12','Problem 13','Problem 17','Transfer 2 — reach RREF'])test('L19 '+title,()=>{
  const s=named(19,title),A=matrices(s.prompt)[0],q=matrices(s.solution);
  const expected=rref(A);
  const rounded=M=>JSON.stringify(M.map(r=>r.map(x=>+x.toFixed(8))));
  assert(q.some(M=>rounded(M)===rounded(expected)), 'No correct RREF in solution');
  if(title.startsWith('Problem'))near(multiply(q[1],A),q[0]);
});
test('L19 Gaussian and Gauss–Jordan',()=>{
  near(mv([[1,1,1],[2,-1,1],[1,2,-1]],[1,2,3]),[6,3,2]);
  near(mv([[1,1,1],[2,-1,1],[1,2,3]],[3/5,9/5,8/5]),[4,1,9]);
});
for(const title of ['Homogeneous system —','Transfer 1 — build a null-space'])test('L20 '+title,()=>{
  const s=named(20,title),A=matrices(s.prompt)[0];
  for(const v of matrices(s.solution).filter(M=>M[0].length===1))near(mv(A,v.map(r=>r[0])),A.map(()=>0));
});
test('L20 textbook systems',()=>{
  near(mv([[1,-3,2],[-2,1,-3]],[-7,1,5]),[0,0]);
  near(rref([[3,-2,1,6],[1,10,-1,2],[-3,-2,1,0]]),matrices(named(20,'§11.4 Problem 1').solution)[0]);
  near(rref([[2,-3,1],[-1,3,0],[1,-4,3]]),matrices(named(20,'§11.4 Problem 4').solution)[0]);
  near(mv([[1,2,-1,1],[0,1,-1,1]],[-1,1,1,0]),[0,0]);
});
for(const title of ['Example 11.24','Transfer 1 — compute','§11.5 Problem 1'])test('L21 inverse '+title,()=>{
  const s=named(21,title),A=matrices(s.prompt)[0],solution=matrices(s.solution);
  const scale=title==='Example 11.24'?1/46:1;
  const candidate=solution.find(M=>M.length===2&&M[0].length===2);
  near(multiply(A,candidate.map(r=>r.map(x=>scale*x))),identity(2));
});
for(const [title,result]of [['Determinant — cofactor',-50],['Determinant by row',0],['Transfer 3 — cofactor',-15],['§11.6 Problem 1',-22]])test('L21 det '+title,()=>{
  const s=named(21,title);near(determinant(matrices(s.prompt)[0]),result);
  assert(s.solution.includes(result===0?'\\det A=0':`\\boxed{${result}}`));
});
test('L21 Cramer systems',()=>{
  near(mv([[2,1],[1,-1]],[2,1]),[5,1]);
  near(mv([[3,2],[1,-1]],[9/5,4/5]),[7,1]);
  near(mv([[15,-4],[8,1]],[-11/47,-100/47]),[5,-4]);
});
for(const title of ['Diagonalize a 2×2','Example 12.8','§12.2 Problem 2'])test('L22 diagonalization '+title,()=>{
  const s=named(22,title),A=matrices(s.prompt)[0],q=matrices(s.solution),P=q[0],D=q.at(-1);
  assert(Math.abs(determinant(P))>1e-9);near(multiply(A,P),multiply(P,D));
});
test('L22 eigenpairs',()=>{
  const A=matrices(named(22,'complete calculation').prompt)[0];near(mv(A,[1,1]),[5,5]);near(mv(A,[1,-2]),[2,-4]);
  const B=matrices(named(22,'§12.1 Problem 1 —').prompt)[0];
  for(const sign of [-1,1]){const l=1+sign*Math.sqrt(6),v=[3,sign*Math.sqrt(6)];near(mv(B,v),v.map(x=>l*x));}
  near(rref([[0,1],[0,0]]),[[0,1],[0,0]]);
});
test('L23 real, initial, and generalized modes',()=>{
  for(const [A,l,v]of [[[[3,1],[1,3]],4,[1,1]],[[[3,1],[1,3]],2,[1,-1]],[[[4,2],[3,3]],1,[2,-3]],[[[4,2],[3,3]],6,[1,1]],[[[5,3],[1,3]],2,[-1,1]],[[[5,3],[1,3]],6,[3,1]],[[[2,1],[-3,6]],5,[1,3]],[[[2,1],[-3,6]],3,[1,1]]])near(mv(A,v),v.map(x=>l*x));
  near(mv([[-3,3],[-3,3]],[1,4/3]),[1,1]);
  near([1.5-3.5,3*1.5-3.5],[-2,1]);
});
for(const title of ['Example 13.6','§13.2 Problem 1'])test('L23 fundamental matrix '+title,()=>{
  const s=named(23,title),A=matrices(s.prompt)[0];
  for(const t of [-0.2,0,0.3]){
    const h=1e-6,P=matrices(s.solution,t).at(-1),plus=matrices(s.solution,t+h).at(-1),minus=matrices(s.solution,t-h).at(-1);
    const d=P.map((r,i)=>r.map((_,j)=>(plus[i][j]-minus[i][j])/(2*h)));
    near(d,multiply(A,P),'fundamental matrix residual',1e-7);assert(Math.abs(determinant(P))>1e-9);
  }
});
test('L25 new transfer data',()=>{
  const a=[1,2,0],b=[2,0,1],v=[8,-4,5];near(dot(a,v),0);near(dot(v,v),105);near(b.map((x,i)=>5*x-2*a[i]),v);
  assert(named(25,'Final transfer 10').prompt.includes('(1,2,0)'));
  assert(named(25,'Final transfer 12').prompt.includes('4x-y=9'));
  near(mv([[4,-1],[2,3]],[2,-1]),[9,1]);
  const s=named(25,'Final transfer 11'),p=matrices(s.prompt),q=matrices(s.solution);near(multiply(p[0],p[1]),q[0]);near(multiply(p[1],p[0]),q[1]);
});
test('L25 review ODE checks',()=>{
  const A=matrices(named(25,'Part 5 transfer — solve a matrix').prompt)[0];
  near(mv(A,[1,-1]),[-1,1]);near(mv(A,[1,-2]),[-2,4]);near([2-1,-2+2],[1,0]);
  for(const x of [-0.7,0,0.7]){
    const y=Math.tan(x*x/2),dy=x/(Math.cos(x*x/2)**2);near(dy,x*(1+y*y));
    const a0=2,a1=-3,coeff=[a0,a1,0,-a0/6,-a1/12,0,a0/180,a1/504];
    for(let n=1;n<6;n++)near((n+2)*(n+1)*coeff[n+2]+coeff[n-1],0);
  }
});
for(const title of ['Length, unit vectors','The zero subspace','Gram–Schmidt for more','Why the projection is the unique','Row space, column space','Write the cofactor sum','Repeated roots can still','Orthogonal, unitary','From a complex eigenvector','Zero eigenvalues and repeated','Course requirements before rehearsal']){
  assert(screens.some(s=>s.title.startsWith(title)&&s.html?.length>400),'Missing teaching bridge: '+title);
}
assert(named(20,'Transfer 5 — particular').solution.includes('exactly when'));
assert(named(24,'Course requirements before rehearsal').html.includes('five complementary checks'));
assert(named(25,'The boundary: review').html.includes('contingency'));
console.log(JSON.stringify({status:'passed',screens:screens.length,counts,bookProblems:boards,quizzes:positions.reduce((a,b)=>a+b),answerPositions:positions,algebraCases},null,2));
