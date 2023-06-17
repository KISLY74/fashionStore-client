import $api from "../http";

export default class UserService {
  static async update(info) {
    return $api.post('/user/update', { info })
  }
  static async getInfo(id) {
    return $api.post(`/user/info/${id}`)
  }
  static async setRating(userId, productId, value) {
    return $api.post(`/user/rate`, { userId, productId, value })
  }
  static async getRating(userId, productId) {
    return $api.get(`/user/rate/${userId}/${productId}`)
  }
}