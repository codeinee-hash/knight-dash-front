import { Figure } from './figure'
import { Colors, FigureNames } from '@/shared/types/types'
import { Cell } from '@/entities/game-board'

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)

    this.logo = '/images/white-knight.svg'
    this.name = FigureNames.KNIGHT
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }

    const dx = Math.abs(this.cell.x - target.x)
    const dy = Math.abs(this.cell.y - target.y)

    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
  }
}
