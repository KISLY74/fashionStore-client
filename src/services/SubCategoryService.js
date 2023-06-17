import $api from "../http";

export default class SubCategoryService {
  static async addSubCategory(name, categoryName) {
    return $api.post('/subCategory/add', { name, categoryName })
  }
  static async changeSubCategory(name, newName) {
    const res = await SubCategoryService.getSubCategory(name)
    return $api.put(`/subCategory/change/${res.data.id}`, { newName })
  }
  static async deleteSubCategory(name) {
    const res = await SubCategoryService.getSubCategory(name)
    return $api.delete(`/subCategory/delete/${res.data.id}`)
  }
  static async getSubCategory(name) {
    return $api.get(`/subCategory/get/${name}`)
  }
  static async getAllByCategoryName(categoryName) {
    return $api.get(`/subCategory/all/${categoryName}`)
  }
}