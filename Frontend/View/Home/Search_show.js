(function(){
  const searchBtn = document.getElementById('searchBtn');
  const overlay = document.getElementById('searchOverlay');
  const closeBtn = document.getElementById('closeSearch');
  const input = document.querySelector('.search-input-area input');

 
  function renderProducts(list) {
    const productWrapper = document.querySelector('.suggested-products .row');
    productWrapper.innerHTML = "";

    if (!Array.isArray(list) || list.length === 0) {
      productWrapper.innerHTML = `<p class="text-center">Không tìm thấy sản phẩm</p>`;
      return;
    }

    list.forEach(product => {
      const giaThapNhat = Math.min(...product.chiTiet.map(c => c.giaXuat));

      const productHTML = `
        <div class="col-6 col-md-3">
          <div class="card h-100">
            <a href="../Product_detail/Product_detail.html?id=${product.id}">
              <img src="${product.anh}" class="card-img-top" alt="${product.tenSanPham}">
            </a>
            <div class="card-body text-center">
              <h5 class="card-title">${product.tenSanPham}</h5>
              <p class="card-text">${giaThapNhat.toLocaleString('vi-VN')} VND</p>
            </div>
          </div>
        </div>
      `;
      productWrapper.innerHTML += productHTML;
    });
  }

 
  searchBtn.addEventListener('click', function(e){
    e.preventDefault();
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden','false');

    setTimeout(() => { if (input) input.focus(); }, 180);
  });

 
  function closeOverlay(){
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden','true');
    if (input) input.value = '';

    const productWrapper = document.querySelector('.suggested-products .row');
    productWrapper.innerHTML = "";
  }

  if (closeBtn) closeBtn.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });

  overlay.addEventListener('click', function(e){
    const content = overlay.querySelector('.search-container');
    if (!content.contains(e.target)) closeOverlay();
  });

 
  let typingTimer;
  const debounceTime = 150;

  input.addEventListener('keyup', () => {
    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      const keyword = input.value.trim();

      if (keyword === "") {
        document.querySelector('.suggested-products .row').innerHTML = "";
        return;
      }

      fetch(`http://localhost:3000/api/products/search?q=${keyword}`)
        .then(res => res.json())
        .then(data => renderProducts(data))
        .catch(err => console.error(err));

    }, debounceTime);
  });

})();
