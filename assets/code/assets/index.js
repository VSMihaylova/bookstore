const items = document.querySelectorAll(".carousel-item");
const prevBtn = document.querySelector(".carousel-btn.left");
const nextBtn = document.querySelector(".carousel-btn.right");
let current = 0;

function showItem(index) {
  items[current].classList.remove("active");
  current = (index + items.length) % items.length;
  items[current].classList.add("active");
}

function scrollAuthors(direction) {
  const slider = document.getElementById("authorsSlider");
  const scrollAmount = 140;
  slider.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}

document.getElementById("prevBtn").addEventListener("click", () => {
  showItem(current - 1);
});

document.getElementById("nextBtn").addEventListener("click", () => {
  showItem(current + 1);
});

document.getElementById("scrollLeftBtn").addEventListener("click", () => {
  scrollAuthors(-1);
});

document.getElementById("scrollRightBtn").addEventListener("click", () => {
  scrollAuthors(1);
});


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.length;

    const cartCountElem = document.querySelector('a[href="cart.html"] .count');
    if (cartCountElem) {
        cartCountElem.textContent = count;
    }
}



document.addEventListener("DOMContentLoaded", () => {
    updateCartCount(); 


    const cartButtons = document.querySelectorAll(".btn-cart");

    function slugify(text) {
        return text.toLowerCase()
                .replace(/\s+/g, '-')    
                .replace(/[^\w\-]+/g, '')  
                .trim();
    }

    cartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const bookContainer = button.closest(".new__books") || button.closest(".book-detail__info") || button.closest(".book-link");
          const title = bookContainer.querySelector(".book__title").textContent;
          const price = bookContainer.querySelector(".price").textContent;
          const id = slugify(title);

          const book = { id, title, price };

          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.push(book);
          localStorage.setItem("cart", JSON.stringify(cart));

          updateCartCount();

          showPopupMessage("Успешно добавяне", `„${title}“ беше добавена в количката!`);
        });
    });
});

function showPopupMessage(title, message, duration = 3000) {
    const modal = document.getElementById('success-modal');
    const modalText = document.getElementById('modal-text');
    const closeBtn = modal.querySelector('.close-button');
  
    modalText.innerHTML = `
      <h2>${title}</h2>
      <p>${message}</p>
    `;
  
    modal.style.display = 'flex';
  
    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };
  
    setTimeout(() => {
      modal.style.display = 'none';
    }, duration);
}
  
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    
    if (params.get('success') === '1') {
      const name = localStorage.getItem('customerName') || 'клиент';
  
      showPopupMessage(
        "Поръчката е успешна!",
        `Благодарим Ви, <strong>${name}</strong>, за поръчката!`,
        5000
      );

      localStorage.removeItem('customerName');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
});
  
