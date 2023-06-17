import axios from "axios"
import jwt_decode from "jwt-decode"

export const API_URL = `http://localhost:4000/api`
// export const API_URL = `https://fashionstore-jlu4.onrender.com/api`
export const BASE_URL = `http://localhost:4000/`
// export const BASE_URL = `https://fashionstore-jlu4.onrender.com/`
export const email = localStorage.getItem('token') && jwt_decode(localStorage.getItem('token')).email

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use(config => {
  return config
}, async error => {
  const originalRequest = error.config
  if (error.response.status === 401 && !error.config._isRetry) {
    originalRequest._isRetry = true
    try {
      const res = await axios.get(`${API_URL}/user/refresh`, { withCredentials: true })
      localStorage.setItem('token', res.data.accessToken)
      return $api.request(originalRequest)
    } catch (e) {
      console.log('Не авторизован')
    }
  }
  throw error
})

export default $api