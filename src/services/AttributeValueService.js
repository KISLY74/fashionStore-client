import $api from "../http";

export default class AttributeValueService {
  static async addAttributeValue(name, value) {
    return $api.post('/attributeValue/add', { name, value })
  }
  static async changeAttributeValue(value, newValue) {
    const res = await AttributeValueService.getAttributeValue(value)
    return $api.put(`/attributeValue/change/${res.data.id}`, { newValue })
  }
  static async deleteAttributeValue(value) {
    const res = await AttributeValueService.getAttributeValue(value)
    return $api.delete(`/attributeValue/delete/${res.data.id}`)
  }
  static async getAttributeValue(value) {
    return $api.get(`/attributeValue/get/${value}`)
  }
  static async getAllByAttribute(id) {
    return $api.get(`/attributeValue/all/${id}`)
  }
}