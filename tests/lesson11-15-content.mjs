import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const units = [];
const courseLessons = Array.from({ length: 25 }, (_, n) => ({ number: n + 1, status: 'complete' }));
const renderCourseMap = () => {};
const render = () => {};

for (let n = 11; n <= 15; n++) {
  const source = readFileSync(new URL('../lesson' + n + '.js', import.meta.url), 'utf8');
  new Function('units', 'courseLessons', 'renderCourseMap', 'render', source)(
    units, courseLessons, renderCourseMap, render
  );
}

const all = units.filter(u => u.courseLesson >= 11 && u.courseLesson <= 15);
const screens = all.flatMap(u => u.lessons.flatMap(l => l.screens));
const named = title => screens.find(s => s.title === title);
const counts = {};
for (const u of all) counts[u.courseLesson] = (counts[u.courseLesson] || 0) + u.lessons.reduce((v, l) => v + l.screens.length, 0);

assert.deepEqual(Object.keys(counts).map(Number), [11, 12, 13, 14, 15]);
for (let n = 11; n <= 15; n++) assert(counts[n] >= 30, 'Lesson ' + n + ' unexpectedly truncated');

const bridgeTitles = [
  'How to tell the two shifts apart before calculating',
  'Why a gated cosine is not a delayed cosine',
  'Work a complete simple-pole example and check the shortcut',
  'What to check before solving a switched IVP',
  'Convolution theorem: carry out the change of variables',
  'Why an impulse changes velocity but not displacement',
  'A full reindexing example: derive each coefficient instead of guessing',
  'Radius from the equation is a guarantee, not always an exact answer',
  'Derive the general indicial equation and distinguish it from the recurrence',
  'The resonance test: why a logarithm sometimes cannot be avoided'
];
for (const title of bridgeTitles) {
  const screen = named(title);
  assert(screen?.type === 'teach' && screen.html?.length > 500, 'Missing teaching bridge: ' + title);
}
const idx = (unitId, part, title) => {
  const u = all.find(x => x.id === unitId);
  const l = u?.lessons.find(x => x.title === part);
  return l?.screens.findIndex(x => x.title === title) ?? -1;
};
assert(idx('l11-heaviside','Step functions as switches','Why a gated cosine is not a delayed cosine') >= 0);
assert(idx('l11-heaviside','Step functions as switches','Why a gated cosine is not a delayed cosine') <
       idx('l11-heaviside','Step functions as switches','Gate versus shift'));
assert(idx('l12-piecewise','A complete switched-forcing IVP','What to check before solving a switched IVP') <
       idx('l12-piecewise','A complete switched-forcing IVP','O’Neil Example 3.10 — discontinuous forcing'));
assert(idx('l15-threecases','Case 3','The resonance test: why a logarithm sometimes cannot be avoided') <
       idx('l15-threecases','Case 3','O’Neil Example 2.24 — Case 3 can genuinely require a logarithm'));

const quizCounts = [0, 0, 0];
let quizTotal = 0;
let bookTotal = 0;
for (const screen of screens) {
  if (screen.type === 'quiz') {
    quizTotal++;
    assert(Array.isArray(screen.options) && screen.options.length === 3, 'Missing quiz options: ' + screen.title);
    assert(Number.isInteger(screen.answer) && screen.answer >= 0 && screen.answer < screen.options.length, 'Invalid answer: ' + screen.title);
    assert(new Set(screen.options).size === screen.options.length, 'Duplicate choice: ' + screen.title);
    quizCounts[screen.answer]++;
  }
  if (screen.type === 'bookproblem') {
    bookTotal++;
    assert(screen.prompt?.length > 20 && screen.solution?.length > 80, 'Incomplete problem: ' + screen.title);
    assert(!/O’Neil §3\.3 Problem T\d/.test(screen.title), 'Original question misattributed: ' + screen.title);
  }
  for (const html of [screen.html, screen.prompt, screen.solution].filter(Boolean)) {
    const starts = (html.match(/\\\[/g) || []).length;
    const ends = (html.match(/\\\]/g) || []).length;
    const inlineStarts = (html.match(/\\\(/g) || []).length;
    const inlineEnds = (html.match(/\\\)/g) || []).length;
    assert(starts === ends && inlineStarts === inlineEnds, 'Unbalanced math delimiters: ' + screen.title);
  }
}
assert(quizTotal >= 25 && quizCounts.every(x => x >= 6), 'Correct quiz positions are concentrated');

const p5 = named('O’Neil §2.5.2 Problem 5 — noninteger-separated roots');
assert(p5 && p5.prompt.includes("4xy''+2y'+2y=0"), 'Textbook Frobenius Problem 5 miscopied');
assert(p5.solution.includes('2c_{n-1}') && p5.solution.includes('22680') && p5.solution.includes('2520'), 'Frobenius coefficients regressed');

for (const [r, coeffs] of [
  [0.5, [1, -1/3, 1/30, -1/630, 1/22680]],
  [0, [1, -1, 1/6, -1/90, 1/2520]]
]) {
  for (let n = 0; n < coeffs.length; n++) {
    const residual = (4*(n+r)*(n+r-1)+2*(n+r))*coeffs[n] + (n ? 2*coeffs[n-1] : 0);
    assert(Math.abs(residual) < 1e-10, 'Frobenius residual for r=' + r + ', n=' + n + ': ' + residual);
  }
}

console.log(JSON.stringify({
  status: 'passed', screens: screens.length, counts, pedagogicalBridges: bridgeTitles.length,
  bookProblems: bookTotal, quizzes: quizTotal, answerPositions: quizCounts,
  frobeniusProblem5: 'source equation and both coefficient recurrences checked'
}, null, 2));
