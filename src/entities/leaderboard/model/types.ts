export interface ITopPlayer {
  _id: string
  login: string
  avatarUrl?: string | null
  winRate?: number
  wins?: number
  losses?: number
  totalGames?: number
  telephone: string
  totalScore: number
  timeMode: number
}

export interface ITopPlayersByMode {
  timeMode: number
  players: ITopPlayer[]
}

export interface ITopPlayersResponse {
  status: 'success'
  data: ITopPlayersByMode[]
}
