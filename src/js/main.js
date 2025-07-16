import { updateCartCount } from "./utils.mjs";
updateCartCount();
import Alert from "./Alert.js";
const alert = new Alert("/json/alerts.json");
alert.init();
