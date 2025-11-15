import { Cell } from '@/entities/game-board'
import { Colors, FigureNames } from '@/shared/types/types'
import { nanoid } from 'nanoid'

export class Figure {
  id: string
  color: Colors
  logo: string | null
  cell: Cell
  name: FigureNames

  constructor(color: Colors, cell: Cell) {
    this.color = color
    this.cell = cell
    this.cell.figure = this
    this.logo = null
    this.name = FigureNames.KNIGHT
    this.id = nanoid()
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false
    }

    return true
  }

  moveFigure(target: Cell) {
    this.cell.figure = null

    if (target.coin) {
      target.addLostCoin(target.coin.nominal)
      target.coin = null
    }

    target.figure = this
    this.cell = target
  }
}
