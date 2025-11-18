import { axiosClassic } from '@/entities/auth'
import { API_URL } from '@/shared/config/api.config'
import { ITopPlayersResponse } from '../model/types'

class LeaderboardService {
  async getTopPlayers() {
    const { data } = await axiosClassic<ITopPlayersResponse>({
      url: API_URL.players(),
      method: 'GET',
    })

    return data.data
  }
}

export const leaderboardService = new LeaderboardService()
