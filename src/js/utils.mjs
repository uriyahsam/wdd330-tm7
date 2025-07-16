// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) parentElement.innerHTML = "";

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

  // sum up total quantity
  const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  const countEl = document.getElementById("cart-count");
  const iconWrapper = document.querySelector(".cart-icon-wrapper");

  if (countEl) countEl.textContent = count;

  if (iconWrapper) {
    iconWrapper.classList.remove("animate"); // reset animation
    void iconWrapper.offsetWidth;            // force reflow
    iconWrapper.classList.add("animate");   // trigger animation
  }
}

