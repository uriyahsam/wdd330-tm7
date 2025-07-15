/* eslint-disable no-console */
const baseURL = import.meta.env.VITE_SERVER_URL;
console.log("API Base URL:", baseURL);

export default class ProductData {
  // Fetch products by category
  async getData(category) {
    try {
      const response = await fetch(`${baseURL}products/search/${category}`);
      if (!response.ok) throw new Error(`Error fetching category: ${category}`);
      const data = await response.json();
      return data.Result;
    } catch (error) {
      console.error("getData error:", error);
      return [];
    }
  }

  // Fetch single product by ID
  async findProductById(id) {
    try {
      const response = await fetch(`${baseURL}product/${id}`);
      if (!response.ok) throw new Error(`Error fetching product ID: ${id}`);
      const data = await response.json();
      return data.Result;
    } catch (error) {
      console.error("findProductById error:", error);
      return null;
    }
  }
}
