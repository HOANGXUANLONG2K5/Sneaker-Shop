// ==== CẤU HÌNH BACKEND ====
const BASE_URL = "http://localhost:3000"; // sửa nếu backend chạy port khác

// Cập nhật năm footer
document.getElementById("year").textContent = new Date().getFullYear();

// ====== CHUYỂN TAB SIDEBAR ======
const menuItems = document.querySelectorAll("#adminMenu .list-group-item");
const sections = document.querySelectorAll(".content-section");

menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    menuItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");

    sections.forEach((sec) => sec.classList.add("d-none"));
    const target = document.getElementById(item.dataset.target);
    if (target) target.classList.remove("d-none");

    switch (item.dataset.target) {
      case "dashboard":
        loadDashboard();
        break;
      case "products":
        loadProducts();
        break;
      case "orders":
        loadOrders();
        break;
      case "customers":
        loadCustomers();
        break;
      case "top_product":
        loadTopProducts();
        break;
      case "reviews":
        // sau này có API BinhLuan sẽ nối tiếp
        break;
    }
  });
});

// ====== DASHBOARD ======
async function loadDashboard() {
  const elProducts = document.getElementById("dashboardTotalProducts");
  const elOrders = document.getElementById("dashboardTotalOrders");
  const elRevenue = document.getElementById("dashboardRevenue");

  if (!elProducts || !elOrders || !elRevenue) return;

  elProducts.textContent = "...";
  elOrders.textContent = "...";
  elRevenue.textContent = "...";

  try {
    const res = await fetch(`${BASE_URL}/api/admin/dashboard`);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();

    elProducts.textContent = data.totalProducts ?? 0;
    elOrders.textContent = data.totalOrders ?? 0;
    elRevenue.textContent =
      (data.totalRevenue || 0).toLocaleString("vi-VN") + " đ";
  } catch (err) {
    console.error("Lỗi loadDashboard:", err);
    elProducts.textContent = "Lỗi";
    elOrders.textContent = "Lỗi";
    elRevenue.textContent = "Lỗi";
  }
}

// ====== SẢN PHẨM – LIST + CRUD ======
const productTbody = document.getElementById("productTableBody");
const btnAddProduct = document.getElementById("btnAddProduct");

let productModalInstance = null;
let editingProductId = null; // null = thêm mới

if (document.getElementById("productModal")) {
  productModalInstance = new bootstrap.Modal(
    document.getElementById("productModal")
  );
}

async function loadProducts() {
  if (!productTbody) return;

  productTbody.innerHTML = `
    <tr>
      <td colspan="5" class="text-center text-muted">Đang tải dữ liệu...</td>
    </tr>
  `;

  try {
    const res = await fetch(`${BASE_URL}/api/admin/products`);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const products = await res.json();

    if (!products.length) {
      productTbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-muted">Không có sản phẩm nào.</td>
        </tr>
      `;
      return;
    }

    productTbody.innerHTML = "";

    products.forEach((p) => {
      const tr = document.createElement("tr");

      const priceText =
        p.giaThapNhat != null && p.giaCaoNhat != null
          ? `${p.giaThapNhat.toLocaleString("vi-VN")}đ - ${p.giaCaoNhat.toLocaleString("vi-VN")}đ`
          : p.giaThapNhat != null
          ? `${p.giaThapNhat.toLocaleString("vi-VN")}đ`
          : "-";

      tr.innerHTML = `
        <td>${p.maSanPham}</td>
        <td>${p.tenSanPham || ""}</td>
        <td>${priceText}</td>
        <td>${p.tongSoLuong ?? 0}</td>
        <td>
          <button class="btn btn-sm btn-outline-dark btn-edit-product" data-id="${p.maSanPham}">Sửa</button>
          <button class="btn btn-sm btn-outline-danger btn-delete-product" data-id="${p.maSanPham}">Xóa</button>
        </td>
      `;

      tr.dataset.product = JSON.stringify(p);

      productTbody.appendChild(tr);
    });

    productTbody.querySelectorAll(".btn-edit-product").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const row = btn.closest("tr");
        const product = row && row.dataset.product ? JSON.parse(row.dataset.product) : null;
        if (product) openEditProduct(product);
      });
    });

    productTbody.querySelectorAll(".btn-delete-product").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        deleteProduct(id);
      });
    });
  } catch (err) {
    console.error("Lỗi loadProducts:", err);
    productTbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-danger">Lỗi tải danh sách sản phẩm.</td>
      </tr>
    `;
  }
}

// Mở modal thêm mới
if (btnAddProduct && productModalInstance) {
  btnAddProduct.addEventListener("click", () => {
    editingProductId = null;
    document.getElementById("productModalTitle").textContent = "Thêm sản phẩm";
    document.getElementById("productId").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productBrand").value = "";
    document.getElementById("productImage").value = "";
    document.getElementById("productModel3D").value = "";
    document.getElementById("productDescription").value = "";
    productModalInstance.show();
  });
}

// Mở modal sửa
function openEditProduct(p) {
  if (!productModalInstance) return;
  editingProductId = p.maSanPham;

  document.getElementById("productModalTitle").textContent = "Sửa sản phẩm";
  document.getElementById("productId").value = p.maSanPham;
  document.getElementById("productName").value = p.tenSanPham || "";
  document.getElementById("productBrand").value = p.thuongHieu || "";
  document.getElementById("productImage").value = p.anh || "";
  document.getElementById("productModel3D").value = p.model3D || "";
  document.getElementById("productDescription").value = p.moTa || "";

  productModalInstance.show();
}

// Lưu (thêm/sửa)
const btnSaveProduct = document.getElementById("btnSaveProduct");
if (btnSaveProduct && productModalInstance) {
  btnSaveProduct.addEventListener("click", async () => {
    const tenSanPham = document.getElementById("productName").value.trim();
    const thuongHieu = document.getElementById("productBrand").value.trim();
    const anh = document.getElementById("productImage").value.trim();
    const model3D = document.getElementById("productModel3D").value.trim();
    const moTa = document.getElementById("productDescription").value.trim();

    if (!tenSanPham) {
      alert("Vui lòng nhập tên sản phẩm");
      return;
    }

    const payload = { tenSanPham, thuongHieu, anh, model3D, moTa };

    try {
      let res;
      if (editingProductId) {
        res = await fetch(`${BASE_URL}/api/admin/products/${editingProductId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${BASE_URL}/api/admin/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Lỗi lưu sản phẩm");
        return;
      }

      productModalInstance.hide();
      await loadProducts();
    } catch (err) {
      console.error("Lỗi save product:", err);
      alert("Lỗi kết nối server");
    }
  });
}

// Xoá sản phẩm
async function deleteProduct(id) {
  if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

  try {
    const res = await fetch(`${BASE_URL}/api/admin/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "Lỗi xoá sản phẩm");
      return;
    }
    await loadProducts();
  } catch (err) {
    console.error("Lỗi deleteProduct:", err);
    alert("Lỗi kết nối server");
  }
}

// ====== ĐƠN HÀNG ======
const orderTbody = document.getElementById("orderTableBody");

async function loadOrders() {
  if (!orderTbody) return;

  orderTbody.innerHTML = `
    <tr>
      <td colspan="5" class="text-center text-muted">Đang tải dữ liệu...</td>
    </tr>
  `;

  try {
    const res = await fetch(`${BASE_URL}/api/admin/orders`);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const orders = await res.json();

    if (!orders.length) {
      orderTbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-muted">Không có đơn hàng nào.</td>
        </tr>
      `;
      return;
    }

    orderTbody.innerHTML = "";

    orders.forEach((o) => {
      const tr = document.createElement("tr");

      const customerName = `${o.ho || ""} ${o.ten || ""}`.trim() || "(Không tên)";
      const ngayDatText = o.ngayDat
        ? new Date(o.ngayDat).toLocaleString("vi-VN")
        : "";
      const tongTienText =
        (o.tongTien || 0).toLocaleString("vi-VN") + "đ";

      let badgeClass = "bg-secondary";
      if (o.trangThaiDonHang === "Đang xử lý") badgeClass = "bg-warning text-dark";
      else if (o.trangThaiDonHang === "Hoàn thành") badgeClass = "bg-success";
      else if (o.trangThaiDonHang === "Đã hủy") badgeClass = "bg-danger";

      tr.innerHTML = `
        <td>DH${o.maDonHang}</td>
        <td>${customerName}</td>
        <td>${ngayDatText}</td>
        <td>${tongTienText}</td>
        <td><span class="badge ${badgeClass}">${o.trangThaiDonHang || "Không rõ"}</span></td>
      `;

      orderTbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Lỗi loadOrders:", err);
    orderTbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-danger">Lỗi tải danh sách đơn hàng.</td>
      </tr>
    `;
  }
}

// ====== KHÁCH HÀNG ======
const customerTbody = document.getElementById("customerTableBody");

async function loadCustomers() {
  if (!customerTbody) return;

  customerTbody.innerHTML = `
    <tr>
      <td colspan="4" class="text-center text-muted">Đang tải dữ liệu...</td>
    </tr>
  `;

  try {
    const res = await fetch(`${BASE_URL}/api/admin/users`);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const users = await res.json();

    if (!users.length) {
      customerTbody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center text-muted">Không có khách hàng nào.</td>
        </tr>
      `;
      return;
    }

    customerTbody.innerHTML = "";

    users.forEach((u) => {
      const tr = document.createElement("tr");
      const fullName = `${u.ho || ""} ${u.ten || ""}`.trim() || "(Chưa cập nhật)";

      tr.innerHTML = `
        <td>${u.maTaiKhoan}</td>
        <td>${fullName}</td>
        <td>${u.email || ""}</td>
        <td>${u.soDienThoai || ""}</td>
      `;

      customerTbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Lỗi loadCustomers:", err);
    customerTbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-danger">Lỗi tải danh sách khách hàng.</td>
      </tr>
    `;
  }
}

// ====== TOP SẢN PHẨM BÁN CHẠY (ECharts + backend) ======

// Giữ một instance duy nhất của chart
let topProductChartInstance = null;

async function loadTopProducts() {
  const chartDom = document.getElementById("topProductChart");
  if (!chartDom) return;

  // Không xóa chartDom.innerHTML bừa nữa, chỉ xử lý khi không có data / lỗi

  try {
    const res = await fetch(`${BASE_URL}/api/admin/products/top-selling?limit=5`);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json(); // [{maSanPham, tenSanPham, tongSoLuongBan}, ...]

    if (!data.length) {
      // Nếu trước đó có chart thì dispose
      if (topProductChartInstance) {
        topProductChartInstance.dispose();
        topProductChartInstance = null;
      }
      chartDom.innerHTML =
        "<p class='text-center text-muted'>Chưa có dữ liệu đơn hàng để thống kê.</p>";
      return;
    }

    // Có dữ liệu thì vẽ chart
    renderTopProductChart(data);
  } catch (err) {
    console.error("Lỗi loadTopProducts:", err);
    if (topProductChartInstance) {
      topProductChartInstance.dispose();
      topProductChartInstance = null;
    }
    chartDom.innerHTML =
      "<p class='text-center text-danger'>Lỗi tải dữ liệu thống kê.</p>";
  }
}

function renderTopProductChart(topData) {
  const chartDom = document.getElementById("topProductChart");
  if (!chartDom) return;

  // Nếu đã có chart trước đó thì dùng lại, không init mới
  if (!topProductChartInstance) {
    topProductChartInstance = echarts.init(chartDom);
  }

  const names = topData.map((p) => p.tenSanPham);
  const values = topData.map((p) => p.tongSoLuongBan);

  const option = {
    title: {
      text: "Top sản phẩm bán chạy",
      left: "center",
      textStyle: {
        color: "#000",
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    xAxis: {
      type: "category",
      data: names,
      axisLabel: { color: "#333" },
      axisLine: { lineStyle: { color: "#000" } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#333" },
      axisLine: { lineStyle: { color: "#000" } },
      splitLine: { lineStyle: { color: "#ccc" } },
    },
    series: [
      {
        data: values,
        type: "bar",
        barWidth: "50%",
        itemStyle: {
          color: "#000",
          borderRadius: [6, 6, 0, 0],
        },
      },
    ],
  };

  topProductChartInstance.setOption(option);

  // Gọi resize sau khi tab hiển thị lại
  setTimeout(() => {
    if (topProductChartInstance) {
      topProductChartInstance.resize();
    }
  }, 0);
}

// Lắng nghe resize cửa sổ cho chart
window.addEventListener("resize", () => {
  if (topProductChartInstance) {
    topProductChartInstance.resize();
  }
});


// ====== KHỞI ĐỘNG: load dashboard khi vừa vào trang ======
loadDashboard();
