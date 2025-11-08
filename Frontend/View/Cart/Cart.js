// Cart.js

document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.querySelector(".col-lg-8");
  const totalContainer = document.querySelector(".col-lg-4 .fw-bold span:last-child");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
      totalContainer.textContent = "0 VND";
      return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
      <div class="p-4 shadow-sm mb-3 cart-item" data-index="${index}">
        <div class="row align-items-center">
          <div class="col-md-3 text-center">
            <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
          </div>
          <div class="col-md-6">
            <h6 class="fw-bold">${item.name}</h6>
            <p class="text-muted mb-1">${item.price}</p>
          </div>
          <div class="col-md-3 text-center">
            <label class="form-label fw-semibold">Số lượng</label>
            
            <p class="quantityDisplay w-50 mx-auto" data-index="${index}">
             ${item.quantity}
            </p>
            <p class="mt-2 fw-bold item-total">${formatCurrency(getTotal(item))}</p>
            <button class="btn btn-outline-danger btn-sm mt-2 deleteBtn" data-index="${index}">Xóa</button>
          </div>
        </div>
      </div>
    `).join("");

    updateTotal();
    bindEvents();
  }

  function getTotal(item) {
    const price = parseFloat(item.price.replace(/[^\d]/g, "")); // lấy số từ "50.000.000 VND"
    return price * item.quantity;
  }

  function formatCurrency(num) {
    return num.toLocaleString("vi-VN") + " VND";
  }

  function updateTotal() {
    const total = cart.reduce((sum, item) => sum + getTotal(item), 0);
    totalContainer.textContent = formatCurrency(total);
  }

  function bindEvents() {
    // Xóa sản phẩm (không reload)
    document.querySelectorAll(".deleteBtn").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // render lại thay vì reload
      });
    });

    // Thay đổi số lượng (update trực tiếp)
    document.querySelectorAll(".quantitySelect").forEach(select => {
      select.addEventListener("change", e => {
        const index = e.target.dataset.index;
        cart[index].quantity = parseInt(e.target.value);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });
  }

  renderCart(); // chạy lần đầu
});
