import { axiosWithAuth } from '@/entities/auth'
import { tokenService } from '@/entities/auth/services/token.service'
import { API_URL } from '@/shared/config/api.config'
import { IProfileResponse, IProfilePlayer } from '../model/types'

class ProfileService {
  async getProfile() {
    const response = await axiosWithAuth.get<IProfileResponse>(API_URL.profile())
    return response.data
  }

  async updateLogin(login: string) {
    const response = await axiosWithAuth.patch<IProfilePlayer & { accessToken?: string }>(API_URL.profile(), { login })
    if (response.data?.accessToken) {
      tokenService.save(response.data.accessToken)
    }
    return response.data
  }

  async uploadAvatar(file: File) {
    const formData = new FormData()
    formData.append('avatar', file)

    const response = await axiosWithAuth.post<IProfilePlayer & { accessToken?: string }>(API_URL.profile('avatar'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (response.data?.accessToken) {
      tokenService.save(response.data.accessToken)
    }
    return response.data
  }
}

export const profileService = new ProfileService()
