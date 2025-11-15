import { nanoid } from 'nanoid'
import { CoinNominals, Colors } from '@/shared/types/types'
import { Coin } from '@/entities/coin'
import { Figure } from '@/entities/figure'
import { Board } from '@/entities/game-board'

export class Cell {
  readonly x: number
  readonly y: number
  readonly color: Colors
  figure: Figure | null
  coin: Coin | null
  board: Board
  id: string
  available: boolean // can you move

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null,
    coin: Coin | null,
  ) {
    this.x = x
    this.y = y
    this.color = color
    this.figure = figure
    this.coin = coin
    this.board = board
    this.available = false
    this.id = nanoid()
  }

  isEmpty(): boolean {
    return this.figure === null
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color
    }

    return false
  }

  setFigure(figure: Figure) {
    this.figure = figure
    this.figure.cell = this
  }

  addLostCoin(nominal: CoinNominals | undefined) {
    if (nominal) {
      this.board.lostCoins[nominal]?.push(nominal)
    }
  }
}
