document.addEventListener("DOMContentLoaded", async () => {
    const nikeList = document.getElementById("product-nike");
    const jordanList = document.getElementById("product-jordan");
    const adidasList = document.getElementById("product-adidas");

    try {
        const response = await fetch("http://localhost:3000/api/products");
        const products = await response.json();

        // Xóa cũ
        nikeList.innerHTML = "";
        jordanList.innerHTML = "";
        adidasList.innerHTML = "";

        products.forEach(product => {
            // Hiển thị giá thấp nhất trong chiTiet
            const giaThapNhat = Math.min(...product.chiTiet.map(c => c.giaXuat));
            const productHTML = `
              <div class="col-6 col-md-3 mb-4">
                <div class="card h-100 shadow-sm">
                  <a href="../Product_detail/Product_detail.html?id=${product.id}">
                    <img src="${product.anh}" class="card-img-top" alt="${product.tenSanPham}">
                  </a>
                  <div class="card-body text-center">
                    <h6 class="card-title">${product.tenSanPham}</h6>
                    <p class="card-text">${giaThapNhat.toLocaleString('vi-VN')} VND</p>
                  </div>
                </div>
              </div>`;

            const brand = (product.thuongHieu || "").toLowerCase();
            if (brand.includes("nike")) nikeList.innerHTML += productHTML;
            else if (brand.includes("jordan")) jordanList.innerHTML += productHTML;
            else if (brand.includes("adidas")) adidasList.innerHTML += productHTML;
        });

    } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
    }
});
