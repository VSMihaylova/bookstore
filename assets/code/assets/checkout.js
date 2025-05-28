const tbody = document.querySelector('#order-summary tbody');
const totalPriceElem = document.getElementById('summary-total');

function loadSummary() {
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

    grouped.forEach(item => {
        const price = parseFloat(item.price.replace(',', '.'));
        const subtotal = price * item.qty;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name || item.title}</td>
            <td>${item.qty}</td>
            <td>${price.toFixed(2)} лв.</td>
            <td>${subtotal.toFixed(2)} лв.</td>
        `;
        tbody.appendChild(row);
    });

    totalPriceElem.textContent = total.toFixed(2) + ' лв.';
}

loadSummary();

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

document.getElementById('order-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value; 

    localStorage.removeItem('cart');
    localStorage.setItem('customerName', name);

    window.location.href = 'index.html?success=1';
});