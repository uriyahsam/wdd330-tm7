import { getParam } from "./utils.mjs";
import ProductData from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import Breadcrumb from "./Breadcrumb.js";
import { updateCartCount } from "./utils.mjs";
updateCartCount();

const productId = getParam("product");
const dataSource = new ProductData("tents");
const product = new ProductDetails(productId, dataSource);
const breadcrumb = new Breadcrumb();
breadcrumb.showBreadcrumbForProduct(product.Category);


product.init();
