import $api from "../http";

export default class UserService {
  static async update(info) {
    return $api.post('/user/update', { info })
  }
  static async getInfo(id) {
    return $api.post(`/user/info/${id}`)
  }
}