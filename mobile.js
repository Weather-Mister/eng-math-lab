(() => {
  const mq = window.matchMedia('(max-width: 850px)');
  const body = document.body;

  function closeMenu() {
    body.classList.remove('mobileNavOpen');
    const btn = document.querySelector('.mobileNavBtn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    const opening = !body.classList.contains('mobileNavOpen');
    body.classList.toggle('mobileNavOpen', opening);
    const btn = document.querySelector('.mobileNavBtn');
    if (btn) btn.setAttribute('aria-expanded', String(opening));
  }

  function initMobileShell() {
    const topbar = document.querySelector('.topbar');
    const sidebar = document.querySelector('.sidebar');
    if (!topbar || !sidebar) return;

    // The current page already ships the mobile controls in index.html.
    // Reuse and bind them instead of returning early when they exist.
    let menuBtn = document.querySelector('.mobileNavBtn');
    if (!menuBtn) {
      menuBtn = document.createElement('button');
      menuBtn.type = 'button';
      menuBtn.className = 'mobileNavBtn';
      menuBtn.setAttribute('aria-label', 'Open course navigation');
      menuBtn.setAttribute('aria-controls', 'mobileCourseDrawer');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.innerHTML = '<span class="mobileNavBtnLines" aria-hidden="true"><span></span><span></span><span></span></span>';
      topbar.prepend(menuBtn);
    }
    if (!menuBtn.dataset.mobileNavBound) {
      menuBtn.addEventListener('click', toggleMenu);
      menuBtn.dataset.mobileNavBound = 'true';
    }

    sidebar.id = sidebar.id || 'mobileCourseDrawer';
    let drawerHead = sidebar.querySelector('.mobileDrawerHead');
    if (!drawerHead) {
      drawerHead = document.createElement('div');
      drawerHead.className = 'mobileDrawerHead';
      drawerHead.innerHTML = '<span class="mobileDrawerTitle">Course navigation</span><button type="button" class="mobileDrawerClose" aria-label="Close course navigation">Close</button>';
      sidebar.prepend(drawerHead);
    }
    const closeBtn = drawerHead.querySelector('.mobileDrawerClose');
    if (closeBtn && !closeBtn.dataset.mobileNavBound) {
      closeBtn.addEventListener('click', closeMenu);
      closeBtn.dataset.mobileNavBound = 'true';
    }

    let backdrop = document.querySelector('.mobileBackdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'mobileBackdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      body.appendChild(backdrop);
    }
    if (!backdrop.dataset.mobileNavBound) {
      backdrop.addEventListener('click', closeMenu);
      backdrop.dataset.mobileNavBound = 'true';
    }

    document.addEventListener('click', (event) => {
      if (!mq.matches) return;
      if (event.target.closest('.lessonNode')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && body.classList.contains('mobileNavOpen')) closeMenu();
    });

    const handleViewport = () => {
      if (!mq.matches) closeMenu();
    };
    if (mq.addEventListener) mq.addEventListener('change', handleViewport);
    else mq.addListener(handleViewport);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMobileShell, { once: true });
  else initMobileShell();
})();