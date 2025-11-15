'use client'

import { useCallback, useState } from 'react'
import { Board as BoardModel, Cell, GameBoardCell } from '@/entities/game-board'

export function GameBoard({
  board,
  onMoveAction,
}: {
  board: BoardModel
  onMoveAction: (from: Cell, to: Cell) => void
}) {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  const handleCellClick = useCallback(
    (cell: Cell) => {
      if (!selectedCell) {
        if (cell.figure) {
          setSelectedCell(cell)
          board.highlightCells(cell)
        }
        return
      }

      if (cell.available) {
        onMoveAction(selectedCell, cell)
        board.clearHighlights()
        setSelectedCell(null)
      } else if (
        cell.figure &&
        cell.figure.color === selectedCell.figure?.color
      ) {
        setSelectedCell(cell)
        board.highlightCells(cell)
      } else {
        board.clearHighlights()
        setSelectedCell(null)
      }
    },
    [selectedCell, board, onMoveAction],
  )

  return (
    <div className='grid grid-cols-8 gap-0 w-[480px] max-[510px]:w-[352px] max-[390px]:w-[288px]'>
      {board.cells.map((row, y) =>
        row.map((cell, x) => (
          <GameBoardCell
            key={cell.id}
            cell={cell}
            selected={selectedCell?.id === cell.id}
            available={cell.available}
            onClick={handleCellClick}
          />
        )),
      )}
    </div>
  )
}
