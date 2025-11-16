const menuItems = document.querySelectorAll('#profileMenu .list-group-item');
const sections = document.querySelectorAll('.content-section');

// Hàm hiển thị section dựa vào menu được chọn
function showSection(targetId) {
    // Ẩn tất cả section
    sections.forEach(section => section.classList.add('d-none'));
    // Hiện section target
    document.getElementById(targetId).classList.remove('d-none');
}

// Thiết lập mặc định khi load trang
window.addEventListener('DOMContentLoaded', () => {
    menuItems.forEach(item => item.classList.remove('active')); // Xóa active cũ
    const defaultItem = document.querySelector('#profileMenu .list-group-item[data-target="profile"]');
    defaultItem.classList.add('active'); // Hồ sơ là active
    showSection('profile'); // Chỉ show hồ sơ
});

// Khi click menu
menuItems.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        // Xóa active cũ
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Hiển thị section tương ứng
        const target = item.getAttribute('data-target');
        showSection(target);
    });
});
