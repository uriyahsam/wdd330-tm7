import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const productListElement = document.querySelector(".product-list"); // Ensure this class exists in your HTML

const tentList = new ProductList("tents", dataSource, productListElement);
tentList.init();
