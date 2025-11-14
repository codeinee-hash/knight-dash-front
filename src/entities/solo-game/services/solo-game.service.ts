import { axiosWithAuth } from '@/entities/auth'
import { API_URL } from '@/shared/config/api.config'
import { ISoloGameSession } from '../model/types'

class SoloGameService {
  async createGame(timeMode: number) {
    const { data } = await axiosWithAuth<ISoloGameSession>({
      url: API_URL.soloGame('create'),
      method: 'POST',
      data: { timeMode },
    })

    return data
  }
}

export const soloGameService = new SoloGameService()
