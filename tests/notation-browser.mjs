import puppeteer from 'puppeteer-core';

const url = process.env.SITE_URL || 'http://127.0.0.1:8765/';
const chrome = process.env.CHROME_BIN;
if (!chrome) throw new Error('CHROME_BIN is required');
const browser = await puppeteer.launch({
  executablePath: chrome, headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});
const failures = [];
let scanned = 0;
let withMath = 0;
try {
  const page = await browser.newPage();
  await page.setViewport({width: 1365, height: 900});
  page.on('pageerror', e => failures.push('JS page error: ' + e.message));
  await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 60000});
  await page.waitForFunction(() => (
    typeof selectCourseLesson === 'function' &&
    typeof units !== 'undefined' &&
    typeof render === 'function' &&
    !!window.MathJax?.startup?.promise
  ), {timeout: 60000});
  await page.evaluate(() => window.MathJax.startup.promise);

  const plan = await page.evaluate(() => units.flatMap((u, ui) =>
    u.courseLesson >= 11 && u.courseLesson <= 25 ?
      u.lessons.flatMap((l, li) => l.screens.map((s, si) => ({
        ui, li, si, courseLesson: u.courseLesson, title: s.title,
        mathExpected: /\\\[|\\\(|class=["'](?:eq|math)/.test(
          [s.html, s.prompt, s.solution, s.questionHtml, s.solutionHtml, s.q, ...(s.options || [])]
            .filter(Boolean).join(' ')
        )
      }))) : []
  ));
  if (!plan.length) failures.push('No Lesson 11–25 screens found');

  // A missing backslash inside a JS template string can silently corrupt rendered TeX.
  const lesson16Notation = await page.evaluate(() => {
    const screens16 = units.filter(u => u.courseLesson === 16)
      .flatMap(u => u.lessons.flatMap(l => l.screens));
    const html = title => screens16.find(s => s.title === title)?.html || '';
    const multiply = html('Where the multiplication-by-t Laplace rule comes from');
    const heaviside = html('Heaviside’s formula is not the Heaviside step function');
    const periodic = html('Why periodic inputs have a geometric denominator');
    return {
      transformDefinition: multiply.includes('F(s)=\\mathcal L\\{f(t)\\}=\\int_0^\\infty'),
      multiplicationRule: multiply.includes("\\boxed{\\mathcal L\\{tf(t)\\}=-F'(s)}"),
      heavisideFormula: heaviside.includes("\\mathcal L^{-1}\\{F\\}=\\sum_j\\frac{P(r_j)}{Q'(r_j)}"),
      partialFractionAnswer: heaviside.includes('\\boxed{f(t)=\\tfrac12e^{-t}+\\tfrac12e^{-3t}}'),
      periodicFormula: periodic.includes('\\boxed{\\mathcal L\\{f(t)\\}(s)=\\frac{\\int_0^T'),
      noControlCharacters: screens16.every(s => [s.html, s.prompt, s.solution]
        .filter(Boolean).every(value => !/[\x08\t\r]/.test(value)))
    };
  });
  for (const [check, passed] of Object.entries(lesson16Notation)) {
    if (!passed) failures.push('Lesson 16 TeX escaping regression: ' + check);
  }


  for (const step of plan) {
    const detail = await page.evaluate(async ({ui, li, si}) => {
      state.unit = ui;
      state.lesson = li;
      state.screen = si;
      render();
      await mathTypesetChain;
      const card = document.querySelector('#card');
      const rawText = card?.textContent || '';
      return {
        blank: !card || rawText.trim().length < 5,
        errors: [...(card?.querySelectorAll('mjx-merror, .MathJax_Error') || [])]
          .map(el => el.textContent?.slice(0, 180)),
        rawMath: (rawText.match(/\\(?:\[|\]|\(|\)|begin\{(?:cases|pmatrix|bmatrix|aligned|array)\})/g) || []).length,
        renderedMath: card?.querySelectorAll('mjx-container').length || 0,
        anchors: card?.querySelectorAll('div.eq a, div.math a').length || 0
      };
    }, step);
    scanned++;
    if (step.mathExpected) withMath++;
    if (detail.blank) failures.push('Blank card: ' + JSON.stringify(step));
    if (detail.errors.length) failures.push('MathJax error: ' + JSON.stringify({step, errors: detail.errors}));
    if (detail.rawMath) failures.push('Raw TeX visible: ' + JSON.stringify({step, rawMath: detail.rawMath}));
    if (step.mathExpected && !detail.renderedMath) failures.push('No rendered math: ' + JSON.stringify(step));
    if (detail.anchors) failures.push('HTML broke equation into links: ' + JSON.stringify({step, anchors: detail.anchors}));
  }

  const target = plan.find(p => p.title === 'Definition and endpoint convention' && p.courseLesson === 11);
  if (!target) failures.push('Lesson 11 Heaviside definition screen missing');
  else {
    const result = await page.evaluate(async ({ui, li, si}) => {
      state.unit = ui; state.lesson = li; state.screen = si; render();
      await mathTypesetChain;
      const card = document.querySelector('#card');
      return {
        errors: card.querySelectorAll('mjx-merror').length,
        math: card.querySelectorAll('mjx-container').length,
        rawTeX: card.textContent.includes('\\begin{cases}') || card.textContent.includes('\\[H(t)')
      };
    }, target);
    if (result.errors || result.math === 0 || result.rawTeX)
      failures.push('Heaviside regression: ' + JSON.stringify(result));
  }

  console.log(JSON.stringify({
    source: url, scanned, withMath, failures: failures.slice(0, 80),
    failureCount: failures.length
  }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  await browser.close();
}
