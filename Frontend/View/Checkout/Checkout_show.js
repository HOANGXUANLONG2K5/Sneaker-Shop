document.addEventListener("DOMContentLoaded", () => {
    const cartItemsDiv = document.getElementById("cartItems");
    const totalAmountSpan = document.getElementById("totalAmount");

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser?.id;

    fetch(`http://localhost:3000/api/cart/${userId}`)
        .then(res => res.json())
        .then(data => {
            let html = "";
            let total = 0;
            data.forEach(item => {
                total += item.SoLuong * item.GiaXuat;
                html += `
                <div class="d-flex justify-content-between mb-2">
                    <span>${item.TenSanPham} (${item.KichThuoc}) x ${item.SoLuong}</span>
                    <span>${item.SoLuong * item.GiaXuat} VNĐ</span>
                </div>`;
            });
            cartItemsDiv.innerHTML = html;
            totalAmountSpan.textContent = total.toLocaleString("vi-VN") + " VNĐ";
        });

});