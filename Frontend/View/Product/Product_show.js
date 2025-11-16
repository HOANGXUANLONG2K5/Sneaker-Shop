document.addEventListener("DOMContentLoaded", async () => {
  const productList = document.getElementById("product-other");

  try {
    const response = await fetch("http://localhost:3000/api/products");
    const products = await response.json();

    products.forEach(product => {
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
      productList.innerHTML += productHTML;
    });
  } catch (error) {
    console.error("Lỗi khi tải sản phẩm:", error);
    productList.innerHTML = "<p class='text-center text-danger'>Không thể tải sản phẩm</p>";
  }
});


