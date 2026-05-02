document.querySelector(".genre-filter").addEventListener("change", function() {
    let genre = this.value;

    document.querySelectorAll(".book-card").forEach(card => {
        if (genre === "all" || card.dataset.genre === genre) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

let cart = [];

const buttons = document.querySelectorAll(".add-to-cart");

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCart = () => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
};

const updateButtons = () => {
    buttons.forEach(btn => {
        const exists = cart.some(item => item.name === btn.dataset.name);
        btn.disabled = exists;
    });
};

buttons.forEach(btn => {
    btn.addEventListener("click", e => {
        let name = btn.dataset.name;
        let price = Number(btn.dataset.price);
        e.target.disabled = true

        cart.push({ name, price });

        saveCart();
        renderCart();
    });
});

const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
};

const renderCart = () => {
    let container = document.querySelector(".cart-items");

    if (!container) return;

    container.innerHTML = "";

    cart.forEach((item, index) => {
        container.innerHTML += `
            <div class="cart-item">
                <p>${item.name} — ${item.price} ₽</p>
                <span class="remove-item" onclick="removeItem(${index})">×</span>
            </div>
        `;
    });

    document.querySelector(".cart-total").textContent = calculateTotal();
};

const removeItem = (index) => {
    deleted = cart.splice(index, 1)[0];
    btn = Array.from(buttons).find(btn => btn.dataset.name == deleted.name);
    btn.disabled = false;

    saveCart()
    renderCart();
}

const clearCart = () => {
    cart = [];
    buttons.forEach(btn => btn.disabled = false);

    saveCart();
    renderCart();
}

document.querySelector(".pay-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Корзина пуста.");
        return;
    }

    alert("Покупка успешно выполнена.");
    clearCart();
});

document.querySelector(".clear-btn").addEventListener("click", clearCart);

loadCart();
updateButtons();
renderCart();