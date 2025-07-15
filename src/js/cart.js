import {
  getLocalStorage,
  loadHeaderFooter,
  updateCartCount,
  setLocalStorage,
} from "./utils.mjs";

(async function () {
  // Load header and footer dynamically
  await loadHeaderFooter();
  updateCartCount();

  function renderCartContents() {
    const cartItems = getLocalStorage("so-cart") || [];
    const cartFooter = document.querySelector(".cart-footer");

    if (cartItems.length === 0) {
      document.querySelector(".product-list").innerHTML =
        "<p>Your cart is empty.</p>";
      cartFooter.classList.add("hide");
      return;
    }

    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Calculate and show total
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector(".cart-total").textContent =
      `Total: $${total.toFixed(2)}`;
    cartFooter.classList.remove("hide");

    // Attach event listeners to remove buttons
    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        removeFromCart(btn.dataset.id);
      });
    });
  }

  function cartItemTemplate(item) {
    return `<li class="cart-card divider">
      <span class="remove-item" data-id="${item.Id}">✖</span>
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#"><h2 class="card__name">${item.Name}</h2></a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
  }

  function removeFromCart(id) {
    let cart = getLocalStorage("so-cart") || [];
    cart = cart.filter((item) => item.Id !== id);
    setLocalStorage("so-cart", cart);
    renderCartContents();
    updateCartCount(); // update badge in header
  }

  renderCartContents();
})();
