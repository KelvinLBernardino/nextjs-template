import axios from 'axios'
import { keyLocalStorage } from '@/config/constants'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
})

api.interceptors.request.use(
  (config) => {
    const dataUser = localStorage.getItem(keyLocalStorage)
    if (dataUser) {
      const tempUser = JSON.parse(dataUser)
      config.headers.Authentication = tempUser.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Lidar com erros globais aqui (ex.: redirecionar para login se o token expirou)
//     if (error.response.status === 401) {
//       // Redirecionar para a página de login
//     }
//     return Promise.reject(error)
//   },
// )

export default api
