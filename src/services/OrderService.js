import $api from "../http";
import { email } from "../http";

export default class OrderService {
  static async createOrder(ids, deliveryMethod, paymentMethod, price, address) {
    return $api.post('/order/create', { email, ids, deliveryMethod, paymentMethod, price, address })
  }
  static async getAllOrders() {
    return $api.get(`/order/all`)
  }
  static async changeStatusOrder(id, status) {
    return $api.put(`/order/status/${id}/${status}`)
  }
  static async getOrdersByUser(id) {
    return $api.get(`/order/all/${id}`)
  }
  static async getOrdersByStatus(status) {
    return $api.get(`/order/allByStatus/${status}`)
  }
  static async getOrdersByStatusOfUser(id, status) {
    return $api.get(`/order/all/${id}/${status}`)
  }
  static async getCountOrders(id) {
    return $api.get(`/order/length/${id}`)
  }
}