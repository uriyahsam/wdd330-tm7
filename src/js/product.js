import { getParam, loadHeaderFooter, updateCartCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

(async function () {
  // Load header/footer dynamically
  await loadHeaderFooter();
  updateCartCount();

  const productId = getParam("product");
  const dataSource = new ProductData("tents");
  const product = new ProductDetails(productId, dataSource);

  product.init();
})();
