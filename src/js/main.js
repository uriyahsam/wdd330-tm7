import { updateCartCount, loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";

(async function () {
  await loadHeaderFooter();
  updateCartCount();

  const alert = new Alert("/json/alerts.json");
  alert.init();
})();
