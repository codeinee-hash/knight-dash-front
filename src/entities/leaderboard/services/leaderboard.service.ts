import { axiosClassic } from '@/entities/auth'
import { API_URL } from '@/shared/config/api.config'
import { ITopPlayer, ITopPlayersResponse } from '../model/types'

class LeaderboardService {
  async getTopPlayers() {
    const { data } = await axiosClassic<ITopPlayersResponse>({
      url: API_URL.players(),
      method: 'GET',
    })

    return data.data
  }

  async getTopMultiplayerPlayers() {
    const { data } = await axiosClassic<{ status: string, data: ITopPlayer[] }>({
      url: API_URL.multiplayerPlayers(),
      method: 'GET',
    })

    return data.data
  }
}

export const leaderboardService = new LeaderboardService()
