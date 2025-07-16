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

  attachRemoveListeners(); // reattach listeners after re-render
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <span class="remove-item" data-id="${item.Id}">✖</span>
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
    </a>
    <a href="#"><h2 class="card__name">${item.Name}</h2></a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.qty || 1}</p>
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

      if (index !== -1) {
        if (cart[index].qty > 1) {
          cart[index].qty--; // just decrement quantity
        } else {
          cart.splice(index, 1); // remove item entirely
        }
      }

      setLocalStorage("so-cart", cart);
      updateCartCount();
      renderCartContents();
    });
  });
}

renderCartContents();
