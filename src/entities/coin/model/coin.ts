import { CoinNominals } from '@/shared/types/types'
import { nanoid } from 'nanoid'
import { Cell } from '@/entities/game-board'

const COIN_LOGOS: Record<CoinNominals, string> = {
  [CoinNominals.COIN150]: '/images/geekcoin 150.svg',
  [CoinNominals.COIN200]: '/images/geekcoin 200.svg',
  [CoinNominals.COIN250]: '/images/geekcoin 250.svg',
  [CoinNominals.COIN300]: '/images/geekcoin 300.svg',
  [CoinNominals.COIN350]: '/images/geekcoin 350.svg',
}

export class Coin {
  id: string
  logo: string | null
  cell: Cell
  nominal: CoinNominals

  constructor(cell: Cell, nominal: CoinNominals) {
    this.cell = cell
    this.nominal = nominal
    this.id = nanoid()
    this.logo = COIN_LOGOS[nominal]
    cell.coin = this
  }
}
