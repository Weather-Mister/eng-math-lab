/* One trusted, shared Laplace table for the movable reference and glossary. */
(function () {
  'use strict';
  const groups = [
    { id: 'pairs', name: 'Standard pairs', rows: [
      ['Constant', '1', '\\frac{1}{s}', '\\operatorname{Re}(s)>0', 'constant unit input'],
      ['Power (integer)', 't^n', '\\frac{n!}{s^{n+1}}', 'n=0,1,2,\\ldots;\\ \\operatorname{Re}(s)>0', 'polynomial'],
      ['Exponential', 'e^{at}', '\\frac{1}{s-a}', '\\operatorname{Re}(s)>a', 'exponential shift'],
      ['Sine', '\\sin(bt)', '\\frac{b}{s^2+b^2}', '\\operatorname{Re}(s)>0', 'trigonometric'],
      ['Cosine', '\\cos(bt)', '\\frac{s}{s^2+b^2}', '\\operatorname{Re}(s)>0', 'trigonometric'],
      ['Hyperbolic sine', '\\sinh(bt)', '\\frac{b}{s^2-b^2}', '\\operatorname{Re}(s)>|b|', 'hyperbolic'],
      ['Hyperbolic cosine', '\\cosh(bt)', '\\frac{s}{s^2-b^2}', '\\operatorname{Re}(s)>|b|', 'hyperbolic'],
      ['Exponential × sine', 'e^{at}\\sin(bt)', '\\frac{b}{(s-a)^2+b^2}', '\\operatorname{Re}(s)>a', 'first shift'],
      ['Exponential × cosine', 'e^{at}\\cos(bt)', '\\frac{s-a}{(s-a)^2+b^2}', '\\operatorname{Re}(s)>a', 'first shift'],
      ['Exponential × polynomial', 't^n e^{at}', '\\frac{n!}{(s-a)^{n+1}}', 'n\\in\\mathbb N_0;\\ \\operatorname{Re}(s)>a', 'first shift power'],
      ['Damped hyperbolic sine', 'e^{at}\\sinh(bt)', '\\frac{b}{(s-a)^2-b^2}', '\\operatorname{Re}(s)>a+|b|', 'hyperbolic shift'],
      ['Damped hyperbolic cosine', 'e^{at}\\cosh(bt)', '\\frac{s-a}{(s-a)^2-b^2}', '\\operatorname{Re}(s)>a+|b|', 'hyperbolic shift']
    ]},
    { id: 'switching', name: 'Shifts & switching', rows: [
      ['First shifting theorem', 'e^{at}f(t)', 'F(s-a)', 'F(s)=\\mathcal L\\{f(t)\\}', 'frequency shift exponential'],
      ['Second shifting theorem', 'H(t-a)f(t-a)', 'e^{-as}F(s)', 'a\\ge0', 'delay clock reset'],
      ['Unit step', 'H(t-a)', '\\frac{e^{-as}}{s}', 'a\\ge0,\\ \\operatorname{Re}(s)>0', 'heaviside step'],
      ['Finite rectangular pulse', 'A[H(t-a)-H(t-b)]', '\\frac{A(e^{-as}-e^{-bs})}{s}', '0\\le a\\lt b', 'pulse on off'],
      ['Gate without clock reset', 'H(t-a)f(t)', 'e^{-as}\\mathcal L\\{f(t+a)\\}', 'a\\ge0', 'gate not a delay'],
      ['Unit staircase', '\\sum_{n=1}^{\\infty}H(t-nT)', '\\frac{e^{-sT}}{s(1-e^{-sT})}', 'T>0,\\ \\operatorname{Re}(s)>0', 'staircase repeated jumps'],
      ['Finite staircase', '\\sum_{n=1}^{N}H(t-nT)', '\\frac{e^{-sT}(1-e^{-NsT})}{s(1-e^{-sT})}', 'N\\in\\mathbb N,\\ T>0', 'finite repeated steps'],
      ['Time scaling', 'f(bt)', '\\frac{1}{b}F\\!\\left(\\frac{s}{b}\\right)', 'b>0', 'time compression dilation']
    ]},
    { id: 'operations', name: 'Derivatives & operations', rows: [
      ['First derivative', 'f\\prime(t)', 'sF(s)-f(0^+)', '\\text{usual regularity}', 'initial values derivative'],
      ['Second derivative', 'f\\prime\\prime(t)', 's^2F(s)-sf(0^+)-f\\prime(0^+)', '\\text{usual regularity}', 'second derivative ivp'],
      ['nth derivative', 'f^{(n)}(t)', 's^nF(s)-\\sum_{k=0}^{n-1}s^{n-1-k}f^{(k)}(0^+)', '\\text{usual regularity}', 'higher order initial values'],
      ['Integral from zero', '\\int_0^t f(\\tau)\\,d\\tau', '\\frac{F(s)}{s}', '\\text{when transforms exist}', 'integration accumulation'],
      ['Multiplication by time', 't f(t)', '-\\frac{dF(s)}{ds}', '\\text{differentiable transform}', 'differentiate in s'],
      ['Multiplication by time power', 't^n f(t)', '(-1)^n\\frac{d^nF(s)}{ds^n}', 'n\\in\\mathbb N_0', 'time power derivative in s'],
      ['Convolution', '(f*g)(t)=\\int_0^t f(t-\\tau)g(\\tau)\\,d\\tau', 'F(s)G(s)', '\\text{when transforms exist}', 'convolution product impulse response'],
      ['Periodic signal', 'f(t+T)=f(t)', '\\frac{\\int_0^T e^{-st}f(t)\\,dt}{1-e^{-sT}}', 'T>0,\\ \\operatorname{Re}(s)>0', 'periodic waveform']
    ]},
    { id: 'impulses', name: 'Impulses & inverse tools', rows: [
      ['Unit impulse at origin', '\\delta(t)', '1', '\\text{causal impulse convention}', 'dirac delta at zero'],
      ['Delayed impulse', '\\delta(t-a)', 'e^{-as}', 'a>0', 'delta force shock'],
      ['Impulse amplitude', 'A\\delta(t-a)', 'Ae^{-as}', 'a>0', 'scaled impulse'],
      ['Convolution with delta', '\\delta(t-a)*f(t)', 'e^{-as}F(s)', 'a\\ge0', 'shift impulse identity'],
      ['Inverse of a delayed transform', '\\mathcal L^{-1}\\{e^{-as}F(s)\\}', 'H(t-a)f(t-a)', 'a\\ge0', 'inverse second shift'],
      ['Simple-pole inverse', '\\mathcal L^{-1}\\!\\left\\{\\frac{p(s)}{q(s)}\\right\\}', '\\sum_{j=1}^{m}\\frac{p(a_j)}{q\\prime(a_j)}e^{a_jt}', '\\text{strictly proper; distinct roots }a_j', 'heaviside formula partial fractions'],
      ['Initial-value theorem', 'f(0^+)', '\\lim_{s\\to\\infty}sF(s)', '\\text{when theorem applies}', 'initial value check'],
      ['Final-value theorem', '\\lim_{t\\to\\infty}f(t)', '\\lim_{s\\to0}sF(s)', '\\text{only if final-value conditions hold}', 'steady state stability caution']
    ]}
  ];

  function formula(value) { return '<span class="laplaceMath">\\(' + value + '\\)</span>'; }
  function tableMarkup() {
    return '<div class="laplaceReference">' +
      '<p class="laplaceLead">One-sided Laplace transforms: ' + formula('\\mathcal L\\{f\\}(s)=\\int_0^\\infty e^{-st}f(t)\\,dt') +
      '. Unless stated otherwise, ' + formula('t\\ge0') + ' and parameters are real. The domain column states useful convergence or validity conditions.</p>' +
      '<div class="laplaceGroupBar" role="group" aria-label="Filter Laplace table sections">' +
      '<button type="button" class="laplaceFilter active" data-laplace-filter="all" aria-pressed="true">All</button>' +
      groups.map(g => '<button type="button" class="laplaceFilter" data-laplace-filter="' + g.id + '" aria-pressed="false">' + g.name + '</button>').join('') +
      '</div><div class="laplaceGroups">' +
      groups.map(g => '<section class="laplaceGroup" data-laplace-group="' + g.id + '"><h3>' + g.name + '</h3>' +
        '<div class="laplaceTableScroll"><table class="laplaceTable"><thead><tr><th scope="col">Pattern</th><th scope="col">Time-domain input</th><th scope="col">Laplace transform</th><th scope="col">Conditions</th></tr></thead><tbody>' +
        g.rows.map(r => '<tr data-laplace-search="' + (r[0]+' '+r[4]).toLowerCase() + '"><th scope="row">' + r[0] + '</th><td>' + formula(r[1]) + '</td><td>' + formula(r[2]) + '</td><td class="laplaceCondition">' + formula(r[3]) + '</td></tr>').join('') +
        '</tbody></table></div></section>').join('') +
      '</div><p class="laplaceFoot"><b>Critical distinctions:</b> ' + formula('H(t-a)f(t)') + ' only gates the existing waveform; ' +
      formula('H(t-a)f(t-a)') + ' truly delays it. In the derivative formulas use the initial data on the right side of the origin. ' +
      'The final-value theorem is <b>not</b> valid for unstable or persistent oscillatory responses: check the poles of ' +
      formula('sF(s)') + ' first (they must lie in the open left half-plane, with the usual treatment of any pole at zero in ' +
      formula('F(s)') + '). For a causal impulse at the origin we use ' + formula('\\mathcal L\\{\\delta(t)\\}=1') + '.</p></div>';
  }

  const KEY = 'engMathLaplaceFloatingV1';
  let win, live = false, geometry = null, op = null;
  const minimum = () => ({ width: Math.min(350, Math.max(260, innerWidth - 16)), height: Math.min(280, Math.max(220, innerHeight - 16)) });
  function defaultGeometry() {
    const width = Math.min(720, Math.max(280, innerWidth - 24));
    const height = Math.min(620, Math.max(250, innerHeight - 100));
    return { left: Math.max(8, innerWidth - width - 24), top: Math.max(8, Math.min(108, innerHeight-height-8)), width, height };
  }
  function readGeometry() {
    try { const x = JSON.parse(localStorage.getItem(KEY)); if (x && ['left','top','width','height'].every(k => Number.isFinite(x[k]))) return x; } catch (_) {}
    return defaultGeometry();
  }
  function clamp(g) {
    const min = minimum();
    const width = Math.min(Math.max(g.width, min.width), Math.max(min.width, innerWidth - 12));
    const height = Math.min(Math.max(g.height, min.height), Math.max(min.height, innerHeight - 12));
    return {
      width, height,
      left: Math.max(6, Math.min(g.left, innerWidth - width - 6)),
      top: Math.max(6, Math.min(g.top, innerHeight - height - 6))
    };
  }
  function writeGeometry() {
    if (!win || !geometry) return;
    Object.assign(win.style, { left: geometry.left + 'px', top: geometry.top + 'px', width: geometry.width + 'px', height: geometry.height + 'px' });
  }
  function persistGeometry() {
    try { localStorage.setItem(KEY, JSON.stringify(geometry)); } catch (_) {}
  }
  function reposition() { if (geometry) { geometry = clamp(geometry); writeGeometry(); persistGeometry(); } }
  function initFloating() {
    if (win) return;
    win = document.createElement('aside');
    win.id = 'laplaceFloating';
    win.className = 'laplaceFloating';
    win.setAttribute('role', 'region');
    win.setAttribute('aria-label', 'Movable Laplace transform table');
    win.hidden = true;
    win.innerHTML = '<div class="laplaceWindowHead" id="laplaceDragHandle" tabindex="0" aria-label="Drag to move Laplace table, or use arrow keys">' +
      '<div class="laplaceWindowHeading"><span class="laplaceWindowIcon" aria-hidden="true">ℒ</span><div><strong>Laplace transform table</strong><small>Drag • resize • Alt + L</small></div></div>' +
      '<div class="laplaceWindowActions"><button type="button" data-laplace-action="glossary" title="Open this table in the glossary" aria-label="Open in glossary">Glossary</button>' +
      '<button type="button" data-laplace-action="reset" title="Reset position and size" aria-label="Reset position and size">Reset</button>' +
      '<button type="button" class="laplaceClose" data-laplace-action="close" title="Close (Esc)" aria-label="Close Laplace table">×</button></div></div>' +
      '<div class="laplaceWindowTools"><label class="laplaceSearchLabel"><span aria-hidden="true">⌕</span>' +
      '<input class="laplaceSearch" type="search" placeholder="Filter e.g. cosine, impulse, shift..." aria-label="Search Laplace transform patterns"></label>' +
      '<span class="laplaceCount" aria-live="polite"></span></div>' +
      '<div class="laplaceWindowScroll">' + tableMarkup() + '</div>' +
      '<div class="laplaceResizeGrip" tabindex="0" role="separator" aria-label="Resize Laplace table; use arrow keys" title="Drag to resize"></div>';
    document.body.appendChild(win);
    geometry = clamp(readGeometry());
    writeGeometry();
    win.querySelectorAll('[data-laplace-action]').forEach(button => button.addEventListener('click', () => {
      const action = button.dataset.laplaceAction;
      if (action === 'close') close();
      else if (action === 'reset') { geometry = clamp(defaultGeometry()); writeGeometry(); persistGeometry(); }
      else if (action === 'glossary') { close(); if (typeof window.openGlossary === 'function') window.openGlossary('laplace'); }
    }));
    const search = win.querySelector('.laplaceSearch');
    search.addEventListener('input', () => filterRows());
    win.querySelectorAll('.laplaceFilter').forEach(button => button.addEventListener('click', () => {
      win.querySelectorAll('.laplaceFilter').forEach(b => { const active = b === button; b.classList.toggle('active',active); b.setAttribute('aria-pressed', String(active)); });
      filterRows();
    }));
    win.querySelector('#laplaceDragHandle').addEventListener('pointerdown', e => startPointer(e,'move'));
    win.querySelector('.laplaceResizeGrip').addEventListener('pointerdown', e => startPointer(e,'resize'));
    win.querySelector('#laplaceDragHandle').addEventListener('keydown', e => nudge(e, 'move'));
    win.querySelector('.laplaceResizeGrip').addEventListener('keydown', e => nudge(e, 'resize'));
    win.querySelector('#laplaceDragHandle').addEventListener('dblclick', e => { if (e.target.closest('button')) return; geometry=clamp(defaultGeometry()); writeGeometry(); persistGeometry(); });
    filterRows();
  }
  function filterRows() {
    if (!win) return;
    const query = win.querySelector('.laplaceSearch').value.toLowerCase().trim();
    const selected = win.querySelector('.laplaceFilter.active')?.dataset.laplaceFilter || 'all';
    let visible = 0;
    win.querySelectorAll('.laplaceGroup').forEach(group => {
      const current = selected === 'all' || group.dataset.laplaceGroup === selected;
      let groupVisible = 0;
      group.querySelectorAll('tbody tr').forEach(row => {
        const hit = current && (!query || row.dataset.laplaceSearch.includes(query));
        row.hidden = !hit;
        if (hit) groupVisible++;
      });
      group.hidden = !current || groupVisible === 0;
      visible += groupVisible;
    });
    win.querySelector('.laplaceCount').textContent = visible + ' formulas';
  }
  function startPointer(e, mode) {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (mode === 'move' && e.target.closest('button,input')) return;
    if (!geometry) return;
    const target = e.currentTarget;
    op = { mode, pointer: e.pointerId, x: e.clientX, y: e.clientY, start: { ...geometry } };
    target.setPointerCapture(e.pointerId);
    win.classList.add('laplaceInteracting');
    e.preventDefault();
    const move = event => {
      if (!op || event.pointerId !== op.pointer) return;
      const dx=event.clientX-op.x,dy=event.clientY-op.y;
      geometry = clamp({ ...op.start,
        left: op.start.left + (mode === 'move' ? dx : 0),
        top: op.start.top + (mode === 'move' ? dy : 0),
        width: op.start.width + (mode === 'resize' ? dx : 0),
        height: op.start.height + (mode === 'resize' ? dy : 0)
      });
      writeGeometry();
    };
    const stop = event => {
      if (!op || event.pointerId !== op.pointer) return;
      op=null;target.removeEventListener('pointermove',move);target.removeEventListener('pointerup',stop);target.removeEventListener('pointercancel',stop);
      win.classList.remove('laplaceInteracting');
      persistGeometry();
    };
    target.addEventListener('pointermove',move);
    target.addEventListener('pointerup',stop);
    target.addEventListener('pointercancel',stop);
  }
  function nudge(e, mode) {
    const dirs={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
    if (!dirs[e.key]) return;
    e.preventDefault();
    const step=e.shiftKey?30:10,[dx,dy]=dirs[e.key];
    if (mode==='move') geometry=clamp({...geometry,left:geometry.left+dx*step,top:geometry.top+dy*step});
    else geometry=clamp({...geometry,width:geometry.width+dx*step,height:geometry.height+dy*step});
    writeGeometry();persistGeometry();
  }
  function open() {
    initFloating();
    // Browser Fullscreen uses a top layer; keep the reference inside it.
    const parent=document.fullscreenElement || document.body;
    if (win.parentNode !== parent) parent.appendChild(win);
    if (document.body.classList.contains('glossaryOpen') && typeof window.closeGlossary==='function') window.closeGlossary();
    win.hidden=false;live=true;reposition();
    document.querySelectorAll('[data-laplace-toggle]').forEach(b=>b.setAttribute('aria-pressed','true'));
    if (typeof window.queueMathTypeset==='function') window.queueMathTypeset(win);
  }
  function close() {
    if (!win) return;
    win.hidden=true;live=false;
    document.querySelectorAll('[data-laplace-toggle]').forEach(b=>b.setAttribute('aria-pressed','false'));
    persistGeometry();
  }
  function toggle() { if (live) close(); else open(); }
  function buttonMarkup(mobile) {
    return '<button type="button" class="' + (mobile ? 'mobileLaplaceToggle' : 'laplaceToggle') +
      '" data-laplace-toggle aria-label="Toggle floating Laplace transform table" aria-pressed="false" title="Laplace table (Alt + L)">' +
      '<span class="laplaceToggleIcon" aria-hidden="true">ℒ</span><span class="laplaceToggleLabel">Laplace</span></button>';
  }
  function install() {
    if (document.querySelector('[data-laplace-toggle]')) return;
    const desktop = document.querySelector('.topActions .themeToggle:not(.soundToggle)');
    const mobile = document.querySelector('.mobileThemeToggle:not(.soundToggle)');
    if (desktop) desktop.insertAdjacentHTML('beforebegin',buttonMarkup(false));
    if (mobile) mobile.insertAdjacentHTML('beforebegin',buttonMarkup(true));
    document.querySelectorAll('[data-laplace-toggle]').forEach(b => b.addEventListener('click',toggle));
    document.addEventListener('keydown', e => {
      const t=e.target;
      const typing=t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
      if (!typing && e.altKey && !e.ctrlKey && !e.metaKey && e.key.toLowerCase()==='l') {
        e.preventDefault(); toggle(); return;
      }
      if (e.key==='Escape' && live && !document.querySelector('#glossaryModal.open')) close();
    });
    window.addEventListener('resize',reposition);
    document.addEventListener('fullscreenchange',()=>{
      if (!win) return;
      const parent=document.fullscreenElement || document.body;
      if (win.parentNode !== parent) parent.appendChild(win);
      reposition();
    });
  }
  window.LaplaceReference = { groups, tableMarkup, open, close, toggle };
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
