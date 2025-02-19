let cart = [];

function addToCart(product) {
    cart.push(product);
    alert(`${product} تمت إضافته إلى عربة التسوق!`);
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}


function displayCartItems() {
    getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>العربة فارغة.</p>';
    } else {
        cart.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.className = 'cart-item';
            productElement.innerHTML = `
                <p>${product}</p>
                <button onclick="removeFromCart(${index})">إزالة</button>
            `;
            cartItemsContainer.appendChild(productElement);
        });
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    displayCartItems();
}

if (window.location.pathname.endsWith('cart.html')) {
    displayCartItems();
}

function toggleDropdown() {
    var dropdown = document.getElementById("dropdown-menu");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}
