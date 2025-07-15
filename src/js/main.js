import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount, loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";

(async function () {
  // Load header & footer first
  await loadHeaderFooter();

  // Update cart badge after header is loaded
  updateCartCount();

  // Show alerts
  const alert = new Alert("/json/alerts.json");
  alert.init();

  // Render product list
  const dataSource = new ProductData("tents");
  const productListElement = document.querySelector(".product-list");
  const tentList = new ProductList("tents", dataSource, productListElement);
  tentList.init();
})();
