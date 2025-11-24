import { Cell } from './cell'
import { CoinNominals, Colors } from '@/shared/types/types'
import { Coin } from '@/entities/coin'
import { Knight } from '@/entities/figure'

export class Board {
  private coinLevel = 1
  cells: Cell[][] = []
  lostCoins: Partial<Record<CoinNominals, CoinNominals[]>> = {
    [CoinNominals.COIN150]: [],
    [CoinNominals.COIN200]: [],
    [CoinNominals.COIN250]: [],
    [CoinNominals.COIN300]: [],
    [CoinNominals.COIN350]: [],
  }

  private getRandomEmptyCell(): Cell | null {
    const flatCells = this.cells.flat()
    const emptyCells = flatCells.filter((cell) => !cell.figure && !cell.coin)

    if (emptyCells.length === 0) {
      return null
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length)
    return emptyCells[randomIndex]
  }

  private getRandomNominal(): CoinNominals {
    const random = Math.random() * 100
    let result: CoinNominals

    if (this.coinLevel >= 5) {
      if (random < 40) result = CoinNominals.COIN250
      else if (random < 75) result = CoinNominals.COIN300
      else result = CoinNominals.COIN350
    } else if (this.coinLevel >= 4) {
      if (random < 15) result = CoinNominals.COIN150
      else if (random < 35) result = CoinNominals.COIN200
      else if (random < 60) result = CoinNominals.COIN250
      else if (random < 85) result = CoinNominals.COIN300
      else result = CoinNominals.COIN350
    } else if (this.coinLevel >= 3) {
      if (random < 25) result = CoinNominals.COIN150
      else if (random < 45) result = CoinNominals.COIN200
      else if (random < 70) result = CoinNominals.COIN250
      else if (random < 90) result = CoinNominals.COIN300
      else result = CoinNominals.COIN350
    } else if (this.coinLevel >= 2) {
      if (random < 40) result = CoinNominals.COIN150
      else if (random < 65) result = CoinNominals.COIN200
      else if (random < 85) result = CoinNominals.COIN250
      else result = CoinNominals.COIN300
    } else if (this.coinLevel >= 1) {
      if (random < 60) result = CoinNominals.COIN150
      else if (random < 85) result = CoinNominals.COIN200
      else result = CoinNominals.COIN250
    } else {
      result = CoinNominals.COIN150
    }

    return result
  }

  public addCoins(count = 10) {
    for (let i = 0; i < count; i++) {
      const cell = this.getRandomEmptyCell()
      if (!cell) break

      cell.coin = new Coin(cell, this.getRandomNominal())
    }
  }

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = []

      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null, null))
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null, null))
        }
      }

      this.cells.push(row)
    }
  }

  public setCoinLevel(level: number) {
    this.coinLevel = Math.min(level, 5)
  }

  public getCoinLevel(): number {
    return this.coinLevel
  }

  public getCopyBoard(): Board {
    const newBoard = new Board()
    newBoard.cells = this.cells.map((row) =>
      row.map(
        (cell) =>
          new Cell(
            newBoard,
            cell.x,
            cell.y,
            cell.color,
            cell.figure ? new Knight(cell.figure.color, cell) : null,
            cell.coin ? new Coin(cell, cell.coin.nominal) : null,
          ),
      ),
    )
    newBoard.lostCoins = { ...this.lostCoins }
    return newBoard
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i]

      for (let j = 0; j < row.length; j++) {
        const target = row[j]
        target.available = !!selectedCell?.figure?.canMove(target)
      }
    }
  }

  clearHighlights() {
    this.cells.forEach((row) =>
      row.forEach((cell) => {
        cell.available = false
      }),
    )
  }

  public moveFigure(from: Cell, to: Cell) {
    if (from.figure && from.figure.canMove(to)) {
      const hadCoin = !!to.coin

      to.setFigure(from.figure)
      if (hadCoin && to.coin) {
        to.addLostCoin(to.coin.nominal)
        to.coin = null
      }
      from.figure = null

      // playSound(hadCoin ? 'capture' : 'move')

      if (hadCoin) {
        const newCell = this.getRandomEmptyCell()
        if (newCell) {
          newCell.coin = new Coin(newCell, this.getRandomNominal())
        }
      }
    }
  }

  get totalScore(): number {
    return Object.entries(this.lostCoins).reduce(
      (sum, [nominal, coins]) => sum + Number(nominal) * coins.length,
      0,
    )
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x]
  }

  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(0, 7))
  }

  public addFigures() {
    this.addKnights()
    // ...
  }
}
