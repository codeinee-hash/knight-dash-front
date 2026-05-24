import { axiosWithAuth } from '@/entities/auth'

export interface IMultiplayerGameSession {
  _id: string
  roomCode: string
  player1Id: string
  player2Id?: string
  player1Login?: string
  player2Login?: string
  player1Avatar?: string
  player2Avatar?: string
  timeMode: number
  status: 'waiting' | 'playing' | 'finished'
  winnerId?: string
  player1Score: number
  player2Score: number
  startedAt?: string
  createdAt: string
  updatedAt: string
}

class MultiplayerGameService {
  private BASE_URL = '/api/v1/multiplayer-game'

  async createGame(timeMode: number) {
    const response = await axiosWithAuth.post<{ gameId: string; roomCode: string }>(
      `${this.BASE_URL}/create`,
      { timeMode },
    )
    return response.data
  }

  async joinGame(roomCode: string) {
    const response = await axiosWithAuth.post<{ gameId: string }>(
      `${this.BASE_URL}/join`,
      { roomCode },
    )
    return response.data
  }

  async getGameById(gameId: string) {
    const response = await axiosWithAuth.get<IMultiplayerGameSession>(
      `${this.BASE_URL}/${gameId}`,
    )
    return response.data
  }
}

export const multiplayerGameService = new MultiplayerGameService()
