import { makeAutoObservable } from "mobx"
import AuthService from "../services/AuthServices";
import { API_URL } from "../http";
import axios from "axios";

export default class Store {
  user = {}
  isAuth = false;
  isLoading = true;
  error_code = 0;
  error = {}
  attributeValues = {}

  constructor() {
    this._countProduct = ""
    this._checkedProducts = []
    this._attributeValuesInitial = {}
    this._priceMinMax = false
    this._priceSort = false
    this._isTop = false
    this._query = false
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this.isAuth = bool
  }

  setSorts(min, max) {
    if (min && max)
      this._priceMinMax = min + "-" + max
    else
      this._priceMinMax = false
  }

  setIsTop(bool) {
    this._isTop = bool
  }

  setPriceAscDesc(priceSort) {
    if (priceSort === 'Цена по убыванию')
      this._priceSort = "DESC"
    else if (priceSort === 'Цена по возрастанию')
      this._priceSort = "ASC"
    else
      this._priceSort = false
  }

  setQuery(query) {
    this._query = query
  }

  get priceMinMax() {
    return this._priceMinMax
  }

  get isTop() {
    return this._isTop
  }

  get query() {
    return this._query
  }

  get priceSort() {
    return this._priceSort
  }

  setAttributeValuesInitial(name, values) {
    this._attributeValuesInitial[name] = values
  }

  get attributeValuesInitial() {
    return this._attributeValuesInitial
  }

  setUser(user) {
    this.user = user
  }

  setIsLoading(bool) {
    this.isLoading = bool
  }

  setCountProduct(count) {
    this._countProduct = count
  }

  get countProduct() {
    return this._countProduct
  }

  setCheckedProducts(item, value) {
    if (value !== 'on') {
      this._checkedProducts = this._checkedProducts.filter(el => el.idB !== item.id + item.attributeValues.join(''))
    } else {
      this._checkedProducts.push({ idB: item.id + item.attributeValues.join(''), ...item })
    }
  }

  get checkedProducts() {
    return this._checkedProducts
  }

  setError(err) {
    this.error = err
  }

  setErrorCode(code) {
    this.error_code = code
  }

  getErrorMessage() {
    return this.error.response.data.message;
  }

  isEmailError() {
    return this.error_code === 102
  }

  isPasswordError() {
    return this.error_code === 103
  }

  setAttributeValues(name, value) {
    this.attributeValues[name] = value
  }

  clearAttributeValues() {
    this.attributeValues = {}
  }

  getAttributeValues() {
    return this.attributeValues
  }

  async logout() {
    try {
      await AuthService.logout()
      localStorage.removeItem('token')
      this.setIsAuth(false)
      this.setUser({})
    } catch (e) {
      return e
    }
  }

  async checkAuth() {
    this.setIsLoading(false)
    try {
      const res = await axios.get(`${API_URL}/user/refresh`, { withCredentials: true })
      localStorage.setItem('token', res.data.accessToken)
      this.setIsAuth(true)
      this.setUser(res.data.user)
    } catch (e) {
      this.setIsAuth(false)
      this.setUser({})
      return e
    } finally {
      this.setIsLoading(true)
    }
  }
}