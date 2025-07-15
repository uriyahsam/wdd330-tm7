import { loadHeaderFooter, updateCartCount, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

(async function () {
  // Load header & footer first
  await loadHeaderFooter();

  // Update cart count badge
  updateCartCount();

  // Get category from query parameter (default to "tents")
  const category = getParam("category") || "tents";

  // Update page heading dynamically
  document.querySelector("h2").textContent = `Shop ${capitalize(category)}`;

  // Fetch and render category products
  const dataSource = new ProductData();
  const listElement = document.querySelector(".product-list");
  const categoryList = new ProductList(category, dataSource, listElement);
  categoryList.init();
})();

// Utility to capitalize category name for heading
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
