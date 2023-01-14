import axios from "axios"

export default {
  async getProducts() {
    let res = await axios.get("https://dummyjson.com/products");
    return res.data;
  },
  async getProduct(eventId) {
    let res = await axios.get("http://localhost:8000/products/" + eventId);
    return res.data;
  }
}