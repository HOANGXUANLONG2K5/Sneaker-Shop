document.addEventListener('DOMContentLoaded', async () => {
  const userId = Number(localStorage.getItem("userId"));
  const cartContainer = document.querySelector('.col-lg-8');
  const totalSpans = document.querySelectorAll('.col-lg-4 span');

  try {
    // Lấy giỏ hàng của user
    const response = await fetch(`http://localhost:3000/api/cart/${userId}`);
    if (!response.ok) throw new Error('Không lấy được giỏ hàng từ server');

    const cartItems = await response.json();

    if (!cartItems || cartItems.length === 0) {
      cartContainer.innerHTML = "<p>Giỏ hàng trống</p>";
      totalSpans.forEach(span => span.textContent = '0 VND');
      return;
    }

    cartContainer.innerHTML = ''; // xóa cũ trước khi render

    let total = 0;

    cartItems.forEach(item => {
      const itemTotal = item.SoLuong * item.GiaXuat; // giá từ DB
      total += itemTotal;

      const div = document.createElement('div');
      div.classList.add('cart-item', 'd-flex', 'mb-3', 'shadow-sm', 'p-3', 'align-items-center');

      div.innerHTML = `
      
        <img src="https://sneakerholicvietnam.vn/wp-content/uploads/2023/12/air-jordan-1-mid-panda-dv0991-101-copy.jpg" 
             alt="${item.TenSanPham}" class="me-3" style="width:80px;height:80px;object-fit:cover;">
        <div class="flex-grow-1">
          <h6>${item.TenSanPham}</h6>
          <p class="mb-1">Size: ${item.KichThuoc}</p>
          <p class="mb-1">Số lượng: ${item.SoLuong}</p>
          <p class="mb-0">Giá: ${itemTotal.toLocaleString()} VND</p>
        </div>
        <button class="btn btn-outline-danger btn-sm">Xóa</button>
      `;

      // Xử lý xóa sản phẩm
      div.querySelector('button').addEventListener('click', async () => {
        try {
          const delRes = await fetch(`http://localhost:3000/api/cart/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ MaChiTietSanPham: item.MaChiTietSanPham, MaNguoiDung: userId })
          });

          if (!delRes.ok) throw new Error('Xóa thất bại');
          cartContainer.removeChild(div);
          total -= itemTotal;
          totalSpans.forEach(span => span.textContent = total.toLocaleString() + ' VND');
          if (cartContainer.children.length === 0) {
            cartContainer.innerHTML = "<p>Giỏ hàng trống</p>";
          }
        } catch (err) {
          console.error(err);
          alert('Xóa sản phẩm thất bại!');
        }
      });

      cartContainer.appendChild(div);
    });

    // Update tổng tiền
    totalSpans.forEach(span => span.textContent = total.toLocaleString() + ' VND');

  } catch (error) {
    console.error('Lỗi khi tải giỏ hàng:', error);
    cartContainer.innerHTML = "<p>Không thể tải giỏ hàng</p>";
    totalSpans.forEach(span => span.textContent = '0 VND');
  }
});
