import $api from "../http";

export default class ProductService {
  static async createProduct(product) {
    return $api.post('/product/add', product)
  }
  static async getAllProducts() {
    return $api.get('/product/all')
  }
  static async getAmountProduct(id) {
    return $api.get(`/product/amount/${id}`)
  }
  static async getProductsByFilter(gender, categoryName, subCategoryName, priceMinMax, priceSort, isTop, query) {
    return $api.get(`/product/filterBy/${gender}/${categoryName}/${subCategoryName}/${priceMinMax}/${priceSort}/${isTop}/${query}`)
  }
  static async getProductById(id) {
    return $api.post('/product/getById', { id })
  }
  static async getProductImageById(id) {
    return $api.post('/product/getImage', { id })
  }
  static async getCategoryName(id) {
    return $api.post('/category/get', { id })
  }
  static async getCountProduct(id, attributeValues) {
    return $api.post('/product/getCount', { id, attributeValues })
  }
  static async getAllCountProduct(id) {
    return $api.post('/product/getAllCountById', { id })
  }
  static async addProductCount(id, attributeValues, count) {
    return $api.post('/product/addCount', { id, attributeValues, count })
  }
  static async addProductImage(data) {
    return $api.post('/product/addImage', data)
  }
  static async getProductImages(id) {
    return $api.post('/product/getAllImagesById', { id })
  }
  static async getProductsByCategory(name, gender) {
    return $api.get(`/product/allByCategory/${name}/${gender}`)
  }
  static async getProductsBySubCategory(name, gender) {
    return $api.get(`/product/allBySubCategory/${name}/${gender}`)
  }
  static async getProductsByGender(value) {
    return $api.get(`/product/allByGender/${value}`)
  }
  static async getAttributeValues(id) {
    return $api.get(`/product/attributeValues/${id}`)
  }
}