const reviews = []; // toàn cục

document.addEventListener("DOMContentLoaded", () => {
  const reviewContainer = document.getElementById("reviewContainer");

  function renderReviews() {
    reviewContainer.innerHTML = "";
    if (reviews.length === 0) {
      reviewContainer.innerHTML = `<p class="text-muted text-center">Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!</p>`;
    } else {
      reviews.forEach(review => {
        const reviewHTML = `
          <div class="border-bottom pb-3 mb-3">
            <div class="d-flex justify-content-between">
              <div>
                <strong>${review.name}</strong>
                <span class="text-muted small">• ${review.date}</span>
              </div>
              <div class="text-warning">${"★".repeat(review.stars)}${"☆".repeat(5 - review.stars)}</div>
            </div>
            <p class="mt-2 mb-0">${review.content}</p>
          </div>`;
        reviewContainer.insertAdjacentHTML("beforeend", reviewHTML);
      });
    }
  }

  renderReviews();

  // nút gửi review
  document.querySelector(".product-review .btn.btn-dark").addEventListener("click", () => {
    const content = document.getElementById("feedback").value;
    const stars = parseInt(document.getElementById("rating").value) || 0;
    if (!content.trim() || stars === 0) {
      alert("Vui lòng nhập nội dung và chọn số sao!");
      return;
    }

    const review = {
      name: "Người dùng ẩn danh",
      date: new Date().toLocaleDateString("vi-VN"),
      stars: stars,
      content: content
    };

    reviews.unshift(review);
    renderReviews();

    // reset form
    document.getElementById("feedback").value = "";
    document.getElementById("rating").value = "0";
    document.querySelectorAll('.star-rating i').forEach(s => s.classList.remove('selected'));
  });
});


