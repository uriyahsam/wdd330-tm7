import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

loadHeaderFooter().then(() => {
    updateCartCount();
});


import Alert from "./Alert.js";
const alert = new Alert("/json/alerts.json");
alert.init();
