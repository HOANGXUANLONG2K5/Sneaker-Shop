
const menuItems = document.querySelectorAll('#profileMenu .list-group-item');
const sections = document.querySelectorAll('.content-section');

menuItems.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();

        // Xóa active cũ
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Ẩn tất cả section
        sections.forEach(section => section.classList.add('d-none'));

        // Hiện section tương ứng
        const target = item.getAttribute('data-target');
        document.getElementById(target).classList.remove('d-none');
    });
});

