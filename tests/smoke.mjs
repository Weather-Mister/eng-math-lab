import puppeteer from 'puppeteer-core';

const SITE = process.env.SITE_URL || 'https://weather-mister.github.io/eng-math-lab/';
const USER = process.env.SMOKE_USERNAME || 'migration_smoke_test';
const chrome = process.env.CHROME_BIN;
if (!chrome) throw new Error('CHROME_BIN is not set');

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});

const failures = [];
const warnings = [];
const lessonAudit = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};
const sleep = ms => new Promise(r => setTimeout(r, ms));

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });

  page.on('pageerror', err => failures.push('pageerror: ' + err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!/favicon|Failed to load resource/i.test(text)) failures.push('console error: ' + text);
      else warnings.push('console: ' + text);
    }
  });
  page.on('requestfailed', req => failures.push('request failed: ' + req.url() + ' — ' + (req.failure()?.errorText || 'unknown')));
  page.on('response', res => {
    const u = res.url();
    if (u.startsWith(SITE) && res.status() >= 400) failures.push('HTTP ' + res.status() + ': ' + u);
  });

  const response = await page.goto(SITE, { waitUntil: 'networkidle2', timeout: 60000 });
  assert(response && response.status() === 200, 'main page did not return HTTP 200');

  await page.waitForSelector('#courseLessonSelect', { timeout: 20000 });
  await page.waitForFunction(() => typeof window.selectCourseLesson === 'function');
  await page.waitForFunction(() => typeof window.toggleSiteTheme === 'function');
  await page.waitForFunction(() => typeof window.cloudSignIn === 'function');
  await page.waitForFunction(() => typeof window.openGlossary === 'function');
  await page.waitForFunction(() => typeof window.toggleScratchFullscreen === 'function');

  const initial = await page.evaluate(() => ({
    title: document.title,
    lessons: document.querySelectorAll('#courseLessonSelect option').length,
    nodes: document.querySelectorAll('.lessonNode').length,
    mathJax: !!window.MathJax,
    desmos: !!window.Desmos,
    banner: document.querySelector('#bannerTitle')?.textContent || '',
    widthOK: document.documentElement.scrollWidth <= document.documentElement.clientWidth + 4
  }));

  assert(initial.title.includes('Engineering Mathematics Lab'), 'document title mismatch');
  assert(initial.lessons === 25, 'expected 25 course lessons, got ' + initial.lessons);
  assert(initial.nodes > 0, 'lesson navigation rendered no nodes');
  assert(initial.mathJax, 'MathJax did not load');
  assert(initial.desmos, 'Desmos API did not load');
  assert(initial.banner.length > 0, 'lesson banner is empty');
  assert(initial.widthOK, 'desktop page has unexpected horizontal overflow');

  // Theme behavior.
  await page.click('[data-theme-toggle]');
  await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
  assert(await page.evaluate(() => document.documentElement.dataset.theme === 'dark'), 'dark mode did not activate');
  await page.click('[data-theme-toggle]');
  await page.waitForFunction(() => document.documentElement.dataset.theme !== 'dark');

  // Audit all 25 course lessons: each must switch cleanly and render navigation + content.
  for (let i = 1; i <= 25; i++) {
    await page.select('#courseLessonSelect', String(i));
    await page.waitForFunction(
      n => document.querySelector('#bannerEyebrow')?.textContent?.includes('Lesson ' + n),
      { timeout: 10000 },
      i
    );
    await sleep(80);
    const info = await page.evaluate(n => ({
      lesson: n,
      banner: document.querySelector('#bannerTitle')?.textContent?.trim() || '',
      eyebrow: document.querySelector('#bannerEyebrow')?.textContent?.trim() || '',
      nodes: document.querySelectorAll('.lessonNode').length,
      cardText: document.querySelector('#card')?.textContent?.trim().length || 0,
      cardHTML: document.querySelector('#card')?.innerHTML.length || 0
    }), i);
    lessonAudit.push(info);
    assert(info.nodes > 0, 'Lesson ' + i + ' rendered no navigation nodes');
    assert(info.banner.length > 0, 'Lesson ' + i + ' rendered an empty banner');
    assert(info.cardText > 20 || info.cardHTML > 100, 'Lesson ' + i + ' rendered an empty/near-empty card');
  }

  // Return to Lesson 1 and open an authentic book-practice node, which must mount a whiteboard.
  await page.select('#courseLessonSelect', '1');
  await page.waitForFunction(() => document.querySelector('#bannerEyebrow')?.textContent?.includes('Lesson 1'));
  const clickedPractice = await page.evaluate(() => {
    const btn = [...document.querySelectorAll('.lessonNode')].find(el => /Authentic source checks/i.test(el.textContent || ''));
    if (!btn) return false;
    btn.click();
    return true;
  });
  assert(clickedPractice, 'could not find Lesson 1 authentic source practice node');
  if (clickedPractice) {
    await page.waitForSelector('#scratchCanvas', { timeout: 10000 });
    const board = await page.evaluate(() => {
      const c = document.querySelector('#scratchCanvas');
      const r = c?.getBoundingClientRect();
      return {
        exists: !!c,
        width: r?.width || 0,
        height: r?.height || 0,
        ctx: !!c?.getContext?.('2d')
      };
    });
    assert(board.exists && board.width > 100 && board.height > 100 && board.ctx, 'whiteboard canvas did not initialize correctly');

    const box = await page.$eval('#scratchCanvas', c => {
      const r = c.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    });
    await page.mouse.move(box.x + 30, box.y + 40);
    await page.mouse.down();
    await page.mouse.move(box.x + 110, box.y + 90, { steps: 8 });
    await page.mouse.up();
    await sleep(150);
    assert(await page.evaluate(() => document.querySelector('#scratchWrap')?.classList.contains('hasInk')), 'whiteboard did not record a mouse stroke');

    await page.evaluate(() => window.toggleScratchFullscreen());
    await page.waitForFunction(() => document.querySelector('#scratchWrap')?.classList.contains('fsMode'));
    assert(await page.evaluate(() => document.querySelector('#scratchWrap')?.classList.contains('fsMode')), 'whiteboard fullscreen did not activate');
    await page.evaluate(() => window.closeScratchFullscreen());
    await page.waitForFunction(() => !document.querySelector('#scratchWrap')?.classList.contains('fsMode'));
  }

  // Notes: create, edit, and remove a local note.
  await page.evaluate(() => {
    if (!document.querySelector('#notesPanel')?.classList.contains('open')) window.toggleNotes();
    window.addNote();
  });
  await page.waitForSelector('.noteTitleInput');
  await page.type('.noteTitleInput', 'Migration smoke note');
  await page.type('.notesTextarea', 'Temporary smoke-test content.');
  assert((await page.$$('.noteTab')).length >= 1, 'note creation did not create a note tab');
  await page.evaluate(() => window.deleteActiveNote());
  await sleep(250);

  // Checklist modal.
  await page.evaluate(() => window.openChecklist());
  await page.waitForFunction(() => {
    const m = document.querySelector('#checkModal');
    return !!m && getComputedStyle(m).display !== 'none';
  });
  assert((await page.$$('#checkModal .checkitem')).length >= 7, 'method checklist did not render expected items');
  await page.evaluate(() => window.closeChecklist());

  // Glossary and simulation catalog.
  await page.evaluate(() => window.openGlossary());
  await page.waitForFunction(() => document.querySelector('#glossaryModal')?.classList.contains('open'));
  const glossary = await page.evaluate(() => ({
    tabs: document.querySelectorAll('#glossaryModal [data-glossary-tab]').length,
    cards: document.querySelectorAll('#glossaryModal .glossaryCard').length,
    simulations: document.querySelectorAll('#glossaryModal [data-sim-unit]').length
  }));
  assert(glossary.tabs >= 3, 'glossary tabs did not render');
  assert(glossary.cards > 0, 'glossary content did not render');
  assert(glossary.simulations > 0, 'glossary Desmos simulation catalog did not render');
  await page.evaluate(() => window.closeGlossary());

  // Cloud sync through the actual UI and browser CORS path.
  await page.click('#cloudProfileButton');
  await page.waitForSelector('#cloudUsernameInput', { visible: true });
  await page.evaluate(() => {
    const input = document.querySelector('#cloudUsernameInput');
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.type('#cloudUsernameInput', USER);
  await page.evaluate(() => window.cloudSignIn());
  await page.waitForFunction(
    u => {
      const name = document.querySelector('#cloudSignedInName')?.textContent || '';
      const card = document.querySelector('#cloudSignedInCard');
      return name.toLowerCase().includes(u) && card?.classList.contains('show');
    },
    { timeout: 30000 },
    USER
  );
  await page.evaluate(() => window.forceCloudSave());
  await page.waitForFunction(
    () => {
      const t = document.querySelector('#cloudProfileMainText')?.textContent || '';
      return /synced|saved/i.test(t);
    },
    { timeout: 30000 }
  );
  const cloud = await page.evaluate(() => ({
    main: document.querySelector('#cloudProfileMainText')?.textContent || '',
    signed: document.querySelector('#cloudSignedInName')?.textContent || '',
    status: document.querySelector('#cloudStatus')?.textContent || ''
  }));
  assert(cloud.signed.toLowerCase().includes(USER), 'cloud sign-in did not complete for smoke-test username');
  assert(/synced|saved/i.test(cloud.main), 'cloud indicator did not reach synced/saved state: ' + cloud.main);
  await page.evaluate(() => window.closeCloudProfile());
  await sleep(150);

  // Mobile shell and layout.
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await sleep(300);
  const mobileBefore = await page.evaluate(() => ({
    visible: getComputedStyle(document.querySelector('.mobileNavBtn')).display !== 'none',
    widthOK: document.documentElement.scrollWidth <= document.documentElement.clientWidth + 4
  }));
  assert(mobileBefore.visible, 'mobile navigation button is not visible at 390px');
  assert(mobileBefore.widthOK, 'mobile page has unexpected horizontal overflow');

  await page.click('.mobileNavBtn');
  await page.waitForFunction(() => document.body.classList.contains('mobileNavOpen'));
  assert(await page.evaluate(() => document.body.classList.contains('mobileNavOpen')), 'mobile drawer did not open');
  await page.click('.mobileDrawerClose');
  await page.waitForFunction(() => !document.body.classList.contains('mobileNavOpen'));

  const summary = {
    site: SITE,
    smokeUser: USER,
    failures,
    warnings,
    initial,
    lessonAudit,
    glossary,
    cloud
  };

  console.log(JSON.stringify(summary, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  await browser.close();
}
