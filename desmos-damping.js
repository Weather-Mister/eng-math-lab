(() => {
  let lastHost = null;

  function mountIfNeeded() {
    const host = document.getElementById('dampingDesmos');

    if (!host) {
      if (lastHost && typeof window.destroyDampingExplorer === 'function') {
        window.destroyDampingExplorer();
      }
      lastHost = null;
      return;
    }

    if (host === lastHost || host.dataset.desmosMounted === '1') return;
    host.dataset.desmosMounted = '1';
    lastHost = host;

    if (typeof window.setupDampingExplorer === 'function') {
      window.setupDampingExplorer();
      host.dataset.desmosMounted = '1';
    }
  }

  function start() {
    const card = document.getElementById('card') || document.body;
    const observer = new MutationObserver(() => mountIfNeeded());
    observer.observe(card, { childList: true, subtree: true });
    mountIfNeeded();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();