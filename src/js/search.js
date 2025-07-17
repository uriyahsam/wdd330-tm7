document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q")?.trim().toLowerCase();
    const results = document.getElementById("results");
    const searchTitle = document.getElementById("searchTitle");

    const baseURL = import.meta.env.VITE_SERVER_URL;

    if (!query) {
        results.innerHTML = `<p>Please enter a search term.</p>`;
        return;
    }

    searchTitle.style.display = "block";
    searchTitle.textContent = `Search Results for: "${query}"`;
    results.innerHTML = `<li>Loading...</li>`;

    const categories = ["tents", "backpacks", "hammocks", "sleeping-bags"];

    Promise.all(
        categories.map((category) =>
            fetch(`https://wdd330-backend.onrender.com/products/search/${category}`)
                .then((res) => {
                    if (!res.ok) throw new Error(`Error ${res.status}`);
                    return res.json();
                })
                .then((data) => data.Result || [])
        )
    )
        .then((allData) => {
            // flatten all results
            const allProducts = allData.flat();
            const filtered = allProducts.filter((p) =>
                p.Name.toLowerCase().includes(query)
            );

            if (!filtered.length) {
                results.innerHTML = `<p>No products found.</p>`;
                return;
            }

            results.innerHTML = filtered
                .map((p) => {
                    const hasDiscount = p.FinalPrice < p.SuggestedRetailPrice;
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
        <a href="../product_pages/index.html?product=${p.Id}">
          <img src="${p.Images?.PrimaryMedium}" alt="${p.Name}" />
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
