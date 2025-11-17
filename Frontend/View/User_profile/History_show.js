document.addEventListener("DOMContentLoaded", () => {
    const orderHistoryDiv = document.getElementById("orderHistory");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser || !currentUser.id) {
        orderHistoryDiv.innerHTML = "<p class='text-center text-danger'>Bạn chưa đăng nhập.</p>";
        return;
    }

    const userId = currentUser.id;

    fetch(`http://localhost:3000/api/order/${userId}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                orderHistoryDiv.innerHTML = "<p class='text-center text-muted'>Bạn chưa có đơn hàng nào.</p>";
                return;
            }

            let html = "<ul class='list-group'>";
            data.forEach(order => {
                html += `
                    <li class="list-group-item mb-2">
                        <div><strong>Đơn hàng #${order.MaDonHang}</strong> - ${new Date(order.NgayDat).toLocaleString()}</div>
                        <div>Trạng thái: ${order.TrangThaiDonHang}</div>
                        <div>Địa chỉ: ${order.DiaChiGiaoToi}</div>
                        <div>SĐT: ${order.SoDienThoai}</div>
                        <div>Tổng tiền: ${Number(order.TongTien).toLocaleString("vi-VN")} VNĐ</div>
                    </li>`;
            });
            html += "</ul>";

            orderHistoryDiv.innerHTML = html;
        })
        .catch(err => {
            console.error("Lỗi fetch lịch sử:", err);
            orderHistoryDiv.innerHTML = "<p class='text-center text-danger'>Không thể tải lịch sử mua hàng.</p>";
        });
});
