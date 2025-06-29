import { setLocalStorage } from "./utils.mjs";

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
    cart.push(product);
    setLocalStorage("so-cart", cart);
  }

  addToCart() {
    this.addProductToCart(this.product);
  }

  renderProductDetails() {
    document.querySelector(".product-detail").innerHTML = `
      <h3>${this.product.Name}</h3>
      <img src="${this.product.Image}" alt="${this.product.Name}" />
      <p>${this.product.Description}</p>
      <p class="price">$${this.product.FinalPrice}</p>
      <button id="addToCart">Add to Cart</button>
    `;
  }
}