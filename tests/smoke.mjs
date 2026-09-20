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
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

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

  // Theme behavior
  await page.click('[data-theme-toggle]');
  await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
  assert(await page.evaluate(() => document.documentElement.dataset.theme === 'dark'), 'dark mode did not activate');
  await page.click('[data-theme-toggle]');
  await page.waitForFunction(() => document.documentElement.dataset.theme !== 'dark');

  // Lesson switching: exercise a late lesson and return to Lesson 1.
  await page.select('#courseLessonSelect', '25');
  await page.waitForFunction(() => document.querySelector('#bannerEyebrow')?.textContent?.includes('Lesson 25'));
  const lesson25 = await page.evaluate(() => ({
    banner: document.querySelector('#bannerTitle')?.textContent || '',
    nodes: document.querySelectorAll('.lessonNode').length,
    card: document.querySelector('#card')?.textContent?.trim().length || 0
  }));
  assert(lesson25.nodes > 0, 'Lesson 25 rendered no navigation nodes');
  assert(lesson25.card > 40, 'Lesson 25 rendered an empty card');

  await page.select('#courseLessonSelect', '6');
  await page.waitForFunction(() => document.querySelector('#bannerEyebrow')?.textContent?.includes('Lesson 6'));
  assert((await page.$$('.lessonNode')).length > 0, 'Lesson 6 rendered no navigation nodes');

  await page.select('#courseLessonSelect', '1');
  await page.waitForFunction(() => document.querySelector('#bannerEyebrow')?.textContent?.includes('Lesson 1'));

  // Notes: create, edit, and remove a local note.
  await page.evaluate(() => {
    if (!document.querySelector('#notesPanel')?.classList.contains('open')) window.toggleNotes();
    window.addNote();
  });
  await page.waitForSelector('.noteTitleInput');
  await page.type('.noteTitleInput', 'Migration smoke note');
  await page.type('.notesTextarea', 'Temporary smoke-test content.');
  assert((await page.$$('.noteTab')).length >= 1, 'note creation did not create a note tab');
  await page.evaluate(() => window.deleteCurrentNote());
  await new Promise(r => setTimeout(r, 300));

  // Checklist modal
  await page.evaluate(() => window.openChecklist());
  await page.waitForFunction(() => document.querySelector('#checkModal')?.classList.contains('show') || getComputedStyle(document.querySelector('#checkModal')).display !== 'none');
  assert((await page.$$('#checkModal .checkitem')).length >= 7, 'method checklist did not render expected items');
  await page.evaluate(() => window.closeChecklist());

  // Cloud sync through the actual UI and browser CORS path.
  await page.click('#cloudProfileButton');
  await page.waitForSelector('#cloudUsernameInput', { visible: true });
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

  // Mobile shell and layout.
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await new Promise(r => setTimeout(r, 250));
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
    lesson25,
    cloud
  };

  console.log(JSON.stringify(summary, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  await browser.close();
}
