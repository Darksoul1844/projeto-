const addCartButtons = document.querySelectorAll(".add-cart");
const cartItemsList = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const cartCount = document.getElementById("cart-count");

let cart = [];

addCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        addToCart(name, price);
    });
});

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

function updateCart() {
    cartItemsList.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.onclick = () => removeFromCart(item.name);

        li.appendChild(removeBtn);
        cartItemsList.appendChild(li);

        total += item.price * item.quantity;
        count += item.quantity;
    });

    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    cartCount.textContent = count;
}

document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
    } else {
        alert("Compra finalizada com sucesso! 🎉");
        cart = [];
        updateCart();
    }
});
