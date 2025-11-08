document.addEventListener("DOMContentLoaded", async () => {
  const productList = document.getElementById("product-list");

  try {
    const response = await fetch("http://localhost:3000/api/products");
    const products = await response.json();

    products.forEach(product => {
      const price = parseFloat(product.GiaXuat);
      const productHTML = `
        <div class="col-6 col-md-3">
          <div class="card h-100">
            <a href="../Product_detail/Product_detail.html?id=${product.MaSanPham}">
              <img src="${product.Anh}" class="card-img-top" alt="${product.TenSanPham}">
            </a>
            <div class="card-body text-center">
              <h5 class="card-title">${product.TenSanPham}</h5>
             <p class="card-text">${price.toLocaleString('vi-VN')} VND</p>git commit -m "Mô tả ngắn gọn thay đổi"
            </div>
          </div>
        </div>`;
      productList.innerHTML += productHTML;
    });
  } catch (error) {
    console.error("Lỗi khi tải sản phẩm:", error);
    productList.innerHTML = "<p class='text-center text-danger'>Không thể tải sản phẩm</p>";
  }
});
