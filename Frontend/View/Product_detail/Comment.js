// Hàm load comment từ server và render ra reviewContainer
async function loadComments(productId) {
    const commentContainer = document.getElementById("reviewContainer");
    if (!commentContainer) return;

    try {
        const res = await fetch(`http://localhost:3000/api/comment/${productId}`);
        if (!res.ok) throw new Error("Không lấy được comment từ server");

        const comments = await res.json();
        commentContainer.innerHTML = "";

        if (!comments || comments.length === 0) {
            commentContainer.innerHTML = `<p class="text-muted text-center">
                Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!
            </p>`;
        } else {
            comments.forEach(comment => {
                const formattedDate = new Date(comment.NgayBinhLuan).toLocaleDateString("vi-VN");
                const commentHTML = `
                    <div class="border-bottom pb-3 mb-3">
                        <div class="d-flex justify-content-between">
                            <div>
                                <strong>${comment.Ho} ${comment.Ten}</strong>
                                <span class="text-muted small">• ${formattedDate}</span>
                            </div>
                            <div class="text-warning">
                                ${"★".repeat(comment.SoSao)}${"☆".repeat(5 - comment.SoSao)}
                            </div>
                        </div>
                        <p class="mt-2 mb-0">${comment.NoiDung}</p>
                    </div>
                `;
                commentContainer.insertAdjacentHTML("beforeend", commentHTML);
            });
        }
    } catch (err) {
        console.error("Lỗi khi lấy comment:", err);
        commentContainer.innerHTML = `<p class="text-danger text-center">Không tải được đánh giá.</p>`;
    }
}

// Khi trang load, cũng gọi luôn để hiển thị comment hiện có
document.addEventListener('DOMContentLoaded', () => {
    // Lấy productId từ query string ?id=1
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get("id"));

    if (productId) {
        // Gán vào dataset (tuỳ chọn, nếu muốn dùng sau)
        const reviewContainer = document.getElementById("reviewContainer");
        reviewContainer.dataset.productId = productId;

        loadComments(productId);
    }
});
