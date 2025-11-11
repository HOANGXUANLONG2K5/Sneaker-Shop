// Size_Show.js
window.productDetails = []; // global để dùng ở các file khác

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    if (!productId) return console.error("Không có ID sản phẩm!");

    try {
        const res = await fetch(`http://localhost:3000/api/productdetails/${productId}`);
        if (!res.ok) throw new Error("Không lấy được chi tiết sản phẩm");
        const data = await res.json();
        window.productDetails = data;

        console.log("Product details raw:", window.productDetails);

        const sizeContainer = document.getElementById("size-button");
        sizeContainer.innerHTML = "";

        const sizes = [39, 40, 41, 42, 43, 44];

        sizes.forEach(size => {
            // tìm chi tiết sản phẩm theo size, đảm bảo số lượng > 0
            const detail = window.productDetails.find(
                d => Number(d.KichThuoc.toString().trim()) === size && Number(d.SoLuong) > 0
            );
            console.log("Checking size:", size, "Detail found:", detail);

            const btn = document.createElement("button");
            btn.className = "btn btn-outline-dark btn-sm me-1 mb-1";
            btn.textContent = size;

            if (detail) {
                btn.dataset.id = detail.MaChiTietSanPham;
                console.log("Assigned dataset.id:", btn.dataset.id);
            } else {
                btn.disabled = true;
                btn.classList.add("disabled");
            }

            btn.addEventListener("click", () => {
                if (btn.disabled) return;
                sizeContainer.querySelectorAll("button").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
            });

            sizeContainer.appendChild(btn);
        });

    } catch (err) {
        console.error(err);
    }
});
