(()=>{
  const KEY='engMathTheme';
  function current(){return document.documentElement.dataset.theme==='dark'?'dark':'light';}
  function updateControls(){
    const dark=current()==='dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(btn=>{
      btn.setAttribute('aria-pressed',dark?'true':'false');
      btn.setAttribute('title',dark?'Switch to light mode':'Switch to dark mode');
      const icon=btn.querySelector('.themeToggleIcon');
      const text=btn.querySelector('.themeToggleText');
      if(icon) icon.textContent=dark?'☀':'☾';
      if(text) text.textContent=dark?'Light mode':'Dark mode';
    });
  }
  function apply(theme,persist=true){
    const value=theme==='dark'?'dark':'light';
    if(value==='dark') document.documentElement.dataset.theme='dark';
    else delete document.documentElement.dataset.theme;
    if(persist){try{localStorage.setItem(KEY,value);}catch(_){}}
    updateControls();
  }
  window.toggleSiteTheme=()=>apply(current()==='dark'?'light':'dark');
  window.setSiteTheme=theme=>apply(theme);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',updateControls,{once:true});
  else updateControls();
})();