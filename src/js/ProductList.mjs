import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const hasDiscount = product.FinalPrice < product.SuggestedRetailPrice;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
          100
      )
    : 0;

  const discountBadge = hasDiscount
    ? `<span class="discount-badge">Save ${discountPercent}%</span>`
    : "";

  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      ${discountBadge}
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">
        $${product.FinalPrice}
        ${
          hasDiscount
            ? `<span class="original-price">$${product.SuggestedRetailPrice}</span>`
            : ""
        }
      </p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = []; // cache
  }

  async init() {
    this.products = await this.dataSource.getData(this.category);
    this.renderList(this.products);

    const sortSelect = document.getElementById("sort");
    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        this.sortAndRender(sortSelect.value);
      });
    }

    return this.products; // ✅ Return product list for breadcrumb
  }

  sortAndRender(sortBy) {
    let sorted = [...this.products];
    if (sortBy === "name") {
      sorted.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (sortBy === "price") {
      sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    this.renderList(sorted);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
