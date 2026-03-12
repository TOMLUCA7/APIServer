import axios from 'axios'

export const TOKEN_STORAGE_KEY = 'auth_token'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
