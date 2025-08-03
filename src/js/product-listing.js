import ProductData from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";
import Breadcrumb from "./Breadcrumb.js";

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);
const breadcrumb = new Breadcrumb();

async function init() {
  const list = await listing.init(); // Make sure init returns the product list
  breadcrumb.showBreadcrumbForCategory(category, list.length);

  // Set the title
  const titleSpan = document.querySelector(".title");
  if (titleSpan) {
    titleSpan.textContent =
      category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ");
  }
}
init();

