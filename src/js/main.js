import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";
updateCartCount();
import Alert from "./Alert.js";
const alert = new Alert("/json/alerts.json");
alert.init();

const dataSource = new ProductData("tents");

const productListElement = document.querySelector(".product-list"); // Ensure this class exists in your HTML

const tentList = new ProductList("tents", dataSource, productListElement);
tentList.init();
