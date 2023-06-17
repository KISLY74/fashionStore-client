import $api from "../http";

export default class AttributeService {
  static async addAttribute(name) {
    return $api.post('/attribute/add', { name })
  }
  static async changeAttribute(name, newName) {
    const res = await AttributeService.getAttribute(name)
    return $api.put(`/attribute/change/${res.data.id}`, { newName })
  }
  static async deleteAttribute(name) {
    const res = await AttributeService.getAttribute(name)
    return $api.delete(`/attribute/delete/${res.data.id}`)
  }
  static async getAttribute(name) {
    return $api.get(`/attribute/get/${name}`)
  }
  static async getAllAttributes() {
    return $api.get('/attribute/all')
  }
  static async getAllByProduct(id) {
    return $api.get(`/attribute/allByProduct/${id}`)
  }
}