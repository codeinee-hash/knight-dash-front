import { axiosClassic } from '@/entities/auth/api/api.interceptors'
import { API_URL } from '@/shared/config/api.config'
import { tokenService } from './token.service'
import { ISignInForm, ISignUpForm } from '../model/types'

class AuthService {
  async auth(type: 'sign-up' | 'sign-in', data: ISignInForm | ISignUpForm) {
    const response = await axiosClassic({
      url: API_URL.auth(`${type}`),
      method: 'POST',
      data,
    })

    if (response.data?.accessToken) {
      tokenService.save(response.data.accessToken)
    }

    return response.data
  }

  async getNewToken() {
    const { data } = await axiosClassic({
      url: API_URL.auth('refresh'),
      method: 'POST',
    })

    if (data?.accessToken) {
      tokenService.save(data.accessToken)
    }

    return data
  }

  async logout() {
    const { data } = await axiosClassic({
      url: API_URL.auth('logout'),
      method: 'POST',
    })

    if (data) tokenService.remove()

    return data
  }
}

export const authService = new AuthService()
