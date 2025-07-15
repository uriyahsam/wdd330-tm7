import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product details
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    // Attach Add to Cart event
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addProductToCart(product) {
    let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    cart.push(product);
    setLocalStorage("so-cart", cart);
  }

  addToCart() {
    this.addProductToCart(this.product);
  }

  renderProductDetails() {
    const discount =
      this.product.FinalPrice < this.product.SuggestedRetailPrice
        ? Math.round(
            ((this.product.SuggestedRetailPrice - this.product.FinalPrice) /
              this.product.SuggestedRetailPrice) *
              100
          )
        : null;

    const discountBadge = discount
      ? `<span class="discount-badge">Save ${discount}%</span>`
      : "";

    document.querySelector(".product-detail").innerHTML = `
      <h3>${this.product.Name}</h3>
      <img src="${this.product.Images.PrimaryLarge}" alt="${this.product.Name}" />
      ${discountBadge}
      <p>${this.product.Description}</p>
      <p class="price">
        $${this.product.FinalPrice.toFixed(2)}
        ${
          discount
            ? `<span class="original-price">$${this.product.SuggestedRetailPrice.toFixed(
                2
              )}</span>`
            : ""
        }
      </p>
      <button id="addToCart">Add to Cart</button>
    `;
  }
}
