export interface IProfileStats {
  totalGames: number
  winRate: number
  avgScore: number
}

export interface IProfilePlayer {
  _id: string
  login: string
  email: string
  avatarUrl: string | null
  createdAt: string
}

export interface IRecentGame {
  _id: string
  status: 'finished'
  player1Id: { _id: string; login: string } | string
  player2Id: { _id: string; login: string } | string
  player1Score: number
  player2Score: number
  winnerId: string | null
  timeMode: number
  createdAt: string
}

export interface IProfileResponse {
  player: IProfilePlayer
  stats: IProfileStats
  recentGames: IRecentGame[]
}
