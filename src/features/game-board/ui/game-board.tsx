'use client'

import { useCallback, useState } from 'react'
import { Board as BoardModel, Cell } from '@/entities/game-board'
import GameBoardCell from './game-board-cell'
import { useParams } from 'next/navigation'

export function GameBoard({
  board,
  onMoveAction,
}: {
  board: BoardModel
  onMoveAction: (payload: { gameId: string; score: number }) => void
}) {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
  const { id: gameId } = useParams()

  const handleCellClick = useCallback(
    (cell: Cell) => {
      if (!selectedCell) {
        if (cell.figure) {
          setSelectedCell(cell)
          board.highlightCells(cell)
        }
        return
      }

      if (
        selectedCell &&
        selectedCell !== cell &&
        selectedCell.figure?.canMove(cell)
      ) {
        const hadCoin = !!cell.coin
        const coinNominal = cell.coin?.nominal
        board.moveFigure(selectedCell, cell)
        setSelectedCell(null)
        board.clearHighlights()

        if (hadCoin && coinNominal) {
          onMoveAction({ gameId: String(gameId), score: coinNominal })
        }
      }
    },
    [selectedCell, board, onMoveAction, gameId],
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
