export default class Breadcrumb {
  constructor(containerId = "breadcrumb") {
    this.container = document.getElementById(containerId);
  }

  showBreadcrumbForCategory(category, count) {
    if (!this.container) return;
    this.container.innerHTML = `
      <p>${category.charAt(0).toUpperCase() + category.slice(1)} &rarr; (${count} items)</p>
    `;
    this.container.style.display = "block";
  }

  showBreadcrumbForProduct(category) {
    if (!this.container) return;
    this.container.innerHTML = `<p>${category}</p>`;
    this.container.style.display = "block";
  }

  hide() {
    if (this.container) this.container.style.display = "none";
  }
}
