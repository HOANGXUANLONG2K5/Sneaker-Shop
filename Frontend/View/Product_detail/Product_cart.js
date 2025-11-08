// Product_detail.js

document.addEventListener("DOMContentLoaded", function () {
  const addToCartBtn = document.querySelector(".product-info .btn-dark.w-100.py-2.mt-2");

  addToCartBtn.addEventListener("click", function () {
    const name = document.querySelector(".product-info h3").textContent;
    const price = document.querySelector(".product-info h4").textContent;
    const image = document.querySelector(".product-thumbnail").src;

    // Tạo object sản phẩm
    const product = { name, price, image, quantity: 1 };

    // Lấy giỏ hàng từ localStorage (nếu có)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Nếu đã có sản phẩm trong giỏ -> tăng số lượng
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(product);
    }

    // Lưu lại giỏ hàng
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Đã thêm vào giỏ hàng!");
  });
});