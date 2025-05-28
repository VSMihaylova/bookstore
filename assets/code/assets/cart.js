const tbody = document.querySelector('#cart-table tbody');
const totalPriceElem = document.getElementById('total-price');
              
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
              
    const grouped = cart.reduce((acc, item) => {
        const existing = acc.find(i => i.id === item.id);
        if (existing) {
            existing.qty += 1;
        } else {
            acc.push({...item, qty: 1});
        }
        return acc;
    }, []);
              
    let total = 0;
    tbody.innerHTML = ''; 
              
    grouped.forEach((item, index) => {
        const row = document.createElement('tr');

        const pricePerItem = parseFloat(item.price);
        const subtotal = pricePerItem * item.qty;
        total += subtotal;

        row.innerHTML = `
            <td>${item.title}</td>
            <td>${item.qty}</td>
            <td>${pricePerItem.toFixed(2)} лв.</td>
            <td><button class="delete-btn" data-id="${item.id}">Изтрий</button></td>
            <td>${subtotal.toFixed(2)} лв.</td>
        `;

        tbody.appendChild(row);
    });
              
    totalPriceElem.textContent = total.toFixed(2) + ' лв.';
}
              
loadCart();

tbody.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const itemId = e.target.getAttribute('data-id');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const index = cart.findIndex(item => item.id === itemId);

        if (index !== -1) {
            const count = cart.filter(item => item.id === itemId).length;

            if (count > 1) {
                cart.splice(index, 1);
            } else {
                cart = cart.filter(item => item.id !== itemId);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); 
                
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const count = cart.length;
        const cartCountElem = document.querySelector('a[href="cart.html"] .count');
        if (cartCountElem) {
            cartCountElem.textContent = count;
        }
    }
});

document.getElementById('checkout-btn').addEventListener('click', function(event) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems.length > 0) {
        window.location.href = 'checkout.html';
    }
});
