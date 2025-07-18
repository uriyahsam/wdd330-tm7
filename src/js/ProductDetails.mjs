import { setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Get product details
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    // Attach Add to Cart listener
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addProductToCart(product) {
    let cart = JSON.parse(localStorage.getItem("so-cart")) || [];

    // Check if product already exists in the cart
    const existing = cart.find((item) => item.Id === product.Id);

    if (existing) {
      // If exists, increment qty
      existing.qty = (existing.qty || 1) + 1;
    } else {
      // Otherwise add new with qty 1
      product.qty = 1;
      cart.push(product);
    }

    setLocalStorage("so-cart", cart);
  }


  addToCart() {
    this.addProductToCart(this.product);
    updateCartCount();
  }

  renderProductDetails() {
    const discount = this.product.FinalPrice < this.product.SuggestedRetailPrice
      ? Math.round(((this.product.SuggestedRetailPrice - this.product.FinalPrice) / this.product.SuggestedRetailPrice) * 100)
      : null;

    const discountBadge = discount
      ? `<span class="discount-badge">Save ${discount}%</span>`
      : "";

    document.querySelector(".product-detail").innerHTML = `
    <h3>${this.product.Name}</h3>
    <img src="${this.product.Images.PrimaryLarge}" alt="${this.product.Name}" />
    ${discountBadge}
    <p>${this.product.DescriptionHtmlSimple}</p>
    <p class="price">
      $${this.product.FinalPrice}
      ${discount ? `<span class="original-price">$${this.product.SuggestedRetailPrice}</span>` : ""}
    </p>
    <button id="addToCart">Add to Cart</button>
  `;
  }
}
