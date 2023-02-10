import axios from "axios"

export default {
  async getProducts() {
    let res = await axios.get("https://dummyjson.com/products");
    return res.data;
  },
  async getCategories() {
    let res = await axios.get("https://dummyjson.com/products/categories");
    return res.data;
  },
  async getProduct(productID) {
    let res = await axios.get("https://dummyjson.com/products/" + productID);
    return res.data;
  },
  async createProduct(productData) {
    let res = await axios.post("https://dummyjson.com/products/add",productData);
    return res.data;
  },
  async updateProduct(productData) {
    let res = await axios.put(`https://dummyjson.com/products/${productData.id}`  , productData);
    return res.data;
  },
  async deleteProduct(productID) {
    let res = await axios.delete("https://dummyjson.com/products/"+productID);
    return res.data;
  },
}
