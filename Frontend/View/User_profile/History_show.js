document.addEventListener("DOMContentLoaded", () => {
    const orderHistoryDiv = document.getElementById("orderHistory");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser || !currentUser.id) {
        orderHistoryDiv.innerHTML = "<p class='text-center text-danger'>Bạn chưa đăng nhập.</p>";
        return;
    }

    const userId = currentUser.id;

    fetch(`http://localhost:3000/api/order/${userId}`)
        .then(res => res.json())
        .then(orders => {
            if (!orders || orders.length === 0) {
                orderHistoryDiv.innerHTML = "<p class='text-center text-muted'>Bạn chưa có đơn hàng nào.</p>";
                return;
            }

            let html = "";

            orders.forEach(order => {
                html += `
                    <div class="card mb-3 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5>Đơn hàng #${order.MaDonHang}</h5>
                                <small>${new Date(order.NgayDat).toLocaleString()}</small>
                            </div>

                            <p class="mb-1"><strong>Trạng thái:</strong> ${order.TrangThaiDonHang}</p>
                            <p class="mb-1"><strong>Tổng tiền:</strong> ${Number(order.TongTien).toLocaleString("vi-VN")} VNĐ</p>

                            <button class="btn btn-dark btn-sm mt-2" onclick="showDetail(${order.MaDonHang})">
                                Xem chi tiết
                            </button>

                            <div id="detail-${order.MaDonHang}" class="mt-3" style="display:none;"></div>
                        </div>
                    </div>
                `;
            });

            orderHistoryDiv.innerHTML = html;
        });
});

function showDetail(orderId) {
    const detailDiv = document.getElementById(`detail-${orderId}`);

    if (detailDiv.style.display === "block") {
        detailDiv.style.display = "none";
        return;
    }

    fetch(`http://localhost:3000/api/order/detail/${orderId}`)
        .then(res => res.json())
        .then(items => {

            let html = `
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            items.forEach(it => {
                html += `
                    <tr>
                        <td>${it.TenSanPham}</td>
                        <td>${it.SoLuong}</td>
                        <td>${Number(it.Gia).toLocaleString("vi-VN")} VNĐ</td>
                    </tr>
                `;
            });

            html += "</tbody></table>";

            detailDiv.innerHTML = html;
            detailDiv.style.display = "block";
        });
}
