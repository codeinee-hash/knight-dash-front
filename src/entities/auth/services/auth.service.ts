import { axiosClassic } from '@/entities/auth/api/api.interceptors'
import { API_URL } from '@/shared/config/api.config'
import { authTokenService } from './auth-token-service'
import { ISignInForm, ISignUpForm } from '../types/auth.interface'

class AuthService {
  async auth(type: 'sign-up' | 'sign-in', data: ISignInForm | ISignUpForm) {
    const response = await axiosClassic({
      url: API_URL.auth(`${type}`),
      method: 'POST',
      data,
    })

    return response.data
  }

  async getNewToken() {
    const { data } = await axiosClassic({
      url: API_URL.auth('refresh'),
      method: 'POST',
    })

    return data
  }

  async logout() {
    const { data } = await axiosClassic({
      url: API_URL.auth('logout'),
      method: 'POST',
    })

    if (data) authTokenService.remove()

    return data
  }
}

export const authService = new AuthService()
