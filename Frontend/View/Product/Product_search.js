(function(){
  const searchBtn = document.getElementById('searchBtn');
  const overlay = document.getElementById('searchOverlay');
  const closeBtn = document.getElementById('closeSearch');
  const input = document.querySelector('.search-input-area input');
  

  searchBtn.addEventListener('click', function(e){
    e.preventDefault();
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden','false');
    
    setTimeout(()=> { if (input) input.focus(); }, 180);
  });


  function closeOverlay(){
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden','true');
    if (input) input.value = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeOverlay);


  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeOverlay();
  });

  overlay.addEventListener('click', function(e){
    const content = overlay.querySelector('.search-container');
    if (!content.contains(e.target)) closeOverlay();
  });
})();