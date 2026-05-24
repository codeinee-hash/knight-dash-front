export const CoinNominals = {
  COIN150: 150,
  COIN200: 200,
  COIN250: 250,
  COIN300: 300,
  COIN350: 350,
} as const

export const Colors = {
  WHITE: 'white',
  BLACK: 'black',
} as const

export const FigureNames = {
  KNIGHT: 'knight',
} as const

export type CoinNominals = (typeof CoinNominals)[keyof typeof CoinNominals]
export type Colors = (typeof Colors)[keyof typeof Colors]
export type FigureNames = (typeof FigureNames)[keyof typeof FigureNames]

// --- Backend Types ---

export interface CoinState {
    x: number
    y: number
    nominal: CoinNominals
}

export interface PlayerState {
    id: string
    x: number
    y: number
    score: number
    coinCounts: Record<CoinNominals, number>
}

export interface GameState {
    players: PlayerState[]
    coins: CoinState[]
    finished: boolean
    remainingTime: number
    timeMode: number
}

export interface ServerError {
    message: string
    status: number
}
