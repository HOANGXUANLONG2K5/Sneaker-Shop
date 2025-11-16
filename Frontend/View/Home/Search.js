const searchInput = document.querySelector('.search-input-area input');
let typingTimer;
const debounceTime = 150;

searchInput.addEventListener('keyup', () => {
  clearTimeout(typingTimer);

  typingTimer = setTimeout(() => {
    const keyword = searchInput.value.trim();

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
