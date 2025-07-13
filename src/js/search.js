document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q")?.trim().toLowerCase();
    const results = document.getElementById("results");
    const searchTitle = document.getElementById("searchTitle");

    if (!query) {
        results.innerHTML = `<p>Please enter a search term.</p>`;
        return;
    }

    searchTitle.style.display = "block";
    searchTitle.textContent = `Search Results for: "${query}"`;
    results.innerHTML = `<li>Loading...</li>`;

    fetch("../json/tents.json")
        .then((res) => {
            if (!res.ok) throw new Error(`Error ${res.status}`);
            return res.json();
        })
        .then((products) => {
            const filtered = products.filter((p) =>
                p.Name.toLowerCase().includes(query)
            );

            if (!filtered.length) {
                results.innerHTML = `<p>No products found.</p>`;
                return;
            }

            results.innerHTML = filtered
                .map((p) => {
                    const hasDiscount =
                        p.FinalPrice < p.SuggestedRetailPrice;
                    const discountPercent = hasDiscount
                        ? Math.round(
                            ((p.SuggestedRetailPrice - p.FinalPrice) /
                                p.SuggestedRetailPrice) *
                            100
                        )
                        : 0;

                    const discountBadge = hasDiscount
                        ? `<span class="discount-badge">Save ${discountPercent}%</span>`
                        : "";

                    return `
  <li class="product-card">
    <a href="/product_pages/index.html?product=${p.Id}">
      <img src="${p.Image}" alt="${p.Name}" />
      ${discountBadge}
      <h2 class="card__brand">${p.Brand?.Name ?? ""}</h2>
      <h3 class="card__name">${p.Name}</h3>
      <p class="product-card__price">
        $${p.FinalPrice}
        ${hasDiscount
                            ? `<span class="original-price">$${p.SuggestedRetailPrice}</span>`
                            : ""
                        }
      </p>
    </a>
  </li>`;
                })
                .join("");
        })
        .catch((err) => {
            console.error(err);
            results.innerHTML = `<p>Error loading products.</p>`;
        });
});