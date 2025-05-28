document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); 

    const form = document.querySelector('.review-form');
    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');
    const tabContainer = form.parentElement;

    const isbn = document.getElementById('isbn')?.textContent.trim() || 'unknown';
    const storageKey = `reviews_${isbn}`;
    let savedReviews = JSON.parse(localStorage.getItem(storageKey)) || [];
    savedReviews.forEach((review, index) => insertReview(review, index));

    function insertReview(review, index) {
      const reviewDiv = document.createElement('div');
      reviewDiv.classList.add('review');
      reviewDiv.innerHTML = `
        <strong>${review.name}</strong>
        <p>${review.comment}</p>
        <button class="delete-review">❌</button>
      `;

      const deleteButton = reviewDiv.querySelector('.delete-review');
      deleteButton.addEventListener('click', () => {
       
        reviewDiv.remove();

        savedReviews.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(savedReviews));

        refreshReviews();
      });

      tabContainer.insertBefore(reviewDiv, form);
    }

    function refreshReviews() {
      const existing = tabContainer.querySelectorAll('.review');
      existing.forEach(el => el.remove());

      savedReviews.forEach((review, idx) => insertReview(review, idx));
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = nameInput.value.trim();
      const comment = commentInput.value.trim();

      if (!name || !comment) return;

      const review = { name, comment };
      savedReviews.push(review);
      localStorage.setItem(storageKey, JSON.stringify(savedReviews));

      insertReview(review, savedReviews.length - 1);

      const msg = document.createElement('p');
      msg.textContent = 'Мнението е добавено успешно.';
      msg.style.color = 'green';
      msg.style.marginTop = '0.5rem';
      form.appendChild(msg);

      form.reset();
      setTimeout(() => msg.remove(), 3000);
    });
});


