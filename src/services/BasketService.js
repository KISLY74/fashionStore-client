import $api from "../http";
import { email } from "../http";

export default class BasketService {
  static async addProduct(productId, attributeValues, count) {
    return $api.post('/basket/addProduct', { email, productId, attributeValues, count })
  }
  static async getProducts() {
    return $api.get(`/basket/products/${email}`)
  }
}