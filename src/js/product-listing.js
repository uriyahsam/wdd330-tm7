import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam } from './utils.mjs';



const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

// Set the title
const titleSpan = document.querySelector('.title');
if (titleSpan) {
    titleSpan.textContent =
        category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
}

listing.init();

