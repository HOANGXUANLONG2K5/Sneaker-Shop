document.addEventListener("DOMContentLoaded", async () => {
    const nikeList = document.getElementById("product-nike");
    const jordanList = document.getElementById("product-jordan");
    const adidasList = document.getElementById("product-adidas");
    const otherList = document.getElementById("product-other");
    try {
        const response = await fetch("http://localhost:3000/api/products");
        const products = await response.json();

        // Xóa nội dung cũ trước khi hiển thị
        nikeList.innerHTML = "";
        jordanList.innerHTML = "";
        adidasList.innerHTML = "";
        if (otherList) otherList.innerHTML = "";

        // Duyệt qua từng sản phẩm
        products.forEach(product => {
            const price = parseFloat(product.GiaXuat);
            const productHTML = `
        <div class="col-6 col-md-3 mb-4">
          <div class="card h-100 shadow-sm">
            <a href="../Product_detail/Product_detail.html?id=${product.MaSanPham}">
              <img src="${product.Anh}" class="card-img-top" alt="${product.TenSanPham}">
            </a>
            <div class="card-body text-center">
              <h6 class="card-title">${product.TenSanPham}</h6>
              <p class="card-text">${price.toLocaleString('vi-VN')} VND</p>
            </div>
          </div>
        </div>`;

            // Phân loại theo thương hiệu
            const brand = (product.ThuongHieu || "").toLowerCase();

            if (brand.includes("nike")) {
                nikeList.innerHTML += productHTML;
            } else if (brand.includes("jordan")) {
                jordanList.innerHTML += productHTML;
            } else if (brand.includes("adidas")) {
                adidasList.innerHTML += productHTML;
            } else {
                if (otherList) otherList.innerHTML += productHTML;
            }
        });
    } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        nikeList.innerHTML = "<p class='text-center text-danger'>Không thể tải sản phẩm</p>";
    }
});