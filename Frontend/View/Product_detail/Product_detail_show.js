// Product_detail_show.js
document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) return console.error("Không có ID sản phẩm!");

    // Gán productId vào dataset của reviewContainer để dùng khi gửi comment
    const reviewContainer = document.getElementById("reviewContainer");
    if (reviewContainer) reviewContainer.dataset.productId = productId;

    try {
        const res = await fetch(`http://localhost:3000/api/productdetails/${productId}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const result = await res.json();
        const product = result[0];

        // Hiển thị 3D Model
        const model3d = document.getElementById("product-model");
        if (model3d) {
            model3d.innerHTML = `
                <iframe
                    src="${product.Model3D}"
                    width="100%" height="500" frameborder="0" allow="autoplay; fullscreen; vr"
                    class="w-100 rounded-3">
                </iframe>
            `;
        }

        // Hiển thị thông tin cơ bản sản phẩm
        const info = document.getElementById("product-info");
        if (info) {
            const price = parseFloat(product.GiaXuat);
            info.innerHTML = `
                <h4>Mô tả</h4>
                <p>Mã sản phẩm: ${product.MaSanPham}</p>
                <p>Tên sản phẩm: ${product.TenSanPham || "Chưa có"}</p>
                <p>Giá: ${price.toLocaleString('vi-VN')} VND</p>
            `;
        }

        // Hiển thị chi tiết sản phẩm
        const detail = document.getElementById("product-detail");
        if (detail) {
            detail.innerHTML = `
                <h4>Chi tiết</h4>
                <ul>
                    <li>Chất liệu: ${product.ChatLieu || "Chưa có"}</li>
                    <li>Sản xuất: ${product.SanXuat || "Chưa có"}</li>
                    <li>Kiểu dáng: ${product.KieuDang || "Chưa có"}</li>
                </ul>
            `;
        }

        // Hiển thị thông tin cơ bản sản phẩm vào thẻ riêng
        const basicInfo = document.getElementById("product-basic-info");
        if (basicInfo) {
            const price = parseFloat(product.GiaXuat);
            basicInfo.innerHTML = `
                <h3>${product.TenSanPham}</h3>
                <p class="text-muted">Mã sản phẩm: ${product.MaSanPham}</p>
                <h4 class="text-danger mb-3">${price.toLocaleString('vi-VN')} VND</h4>
            `;
        }

    } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
        const model3d = document.getElementById("product-model");
        const basicInfo = document.getElementById("product-basic-info");
        const info = document.getElementById("product-info");
        const detail = document.getElementById("product-detail");

        if (model3d) model3d.innerHTML = "<p class='text-danger'>Không thể tải sản phẩm.</p>";
        if (basicInfo) basicInfo.innerHTML = "<p class='text-danger'>Không thể tải sản phẩm.</p>";
        if (info) info.innerHTML = "<p class='text-danger'>Không thể tải sản phẩm.</p>";
        if (detail) detail.innerHTML = "<p class='text-danger'>Không thể tải sản phẩm.</p>";
    }
});
