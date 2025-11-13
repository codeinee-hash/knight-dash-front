import axios, { CreateAxiosDefaults } from 'axios'
import { tokenService } from '../services/token.service'
import { authService } from '../services/auth.service'
import { envConfig } from '@/shared/config/env.config'

const options: CreateAxiosDefaults = {
  baseURL: envConfig.NEXT_PUBLIC_SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = tokenService.get()
  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (error?.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true

      try {
        await authService.getNewToken()
        return axiosWithAuth.request(originalRequest)
      } catch (err) {
        tokenService.remove()
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)

export { axiosClassic, axiosWithAuth }
