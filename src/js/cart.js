import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartFooter = document.querySelector(".cart-footer");

  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
    cartFooter?.classList.add("hide");
    return;
  }

  const htmlItems = cartItems.map(cartItemTemplate);
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Total calculation now respects quantity
  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.qty || 1),
    0
  );
  document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(
    2
  )}`;

  cartFooter?.classList.remove("hide");

  attachRemoveListeners();
  attachQuantityButtons();


}
function attachQuantityListeners() {
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", () => {
      const id = input.dataset.id;
      const newQty = parseInt(input.value);
      let cart = getLocalStorage("so-cart") || [];

      const index = cart.findIndex((item) => item.Id === id);

      if (index !== -1 && newQty > 0) {
        cart[index].qty = newQty;
      }

      setLocalStorage("so-cart", cart);
      updateCartCount();
      renderCartContents();
    });
  });
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <span class="remove-item" data-id="${item.Id}">✖</span>
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
    </a>
    <a href="#"><h2 class="card__name">${item.Name}</h2></a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="quantity-control" data-id="${item.Id}">
    <button class="qty-btn decrement">–</button>
    <span class="qty-value">${item.qty || 1}</span>
    <button class="qty-btn increment">+</button>
  </div>

    <p class="cart-card__price">$${(item.FinalPrice * (item.qty || 1)).toFixed(
    2
  )}</p>
  </li>`;
}

// reattach event listeners because the DOM is re-rendered each time
function attachRemoveListeners() {
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      let cart = getLocalStorage("so-cart") || [];

      const index = cart.findIndex((item) => item.Id === id);

      cart.splice(index, 1);


      setLocalStorage("so-cart", cart);
      updateCartCount();
      renderCartContents();
    });
  });
}
function attachQuantityButtons() {
  document.querySelectorAll(".quantity-control").forEach((control) => {
    const id = control.dataset.id;

    control.querySelector(".increment").addEventListener("click", () => {
      changeQuantity(id, 1);
    });

    control.querySelector(".decrement").addEventListener("click", () => {
      changeQuantity(id, -1);
    });
  });
}

function changeQuantity(id, delta) {
  let cart = getLocalStorage("so-cart") || [];
  const index = cart.findIndex((item) => item.Id === id);

  if (index !== -1) {
    cart[index].qty = Math.max(1, (cart[index].qty || 1) + delta);
  }

  setLocalStorage("so-cart", cart);
  updateCartCount();
  renderCartContents();
}

renderCartContents();
