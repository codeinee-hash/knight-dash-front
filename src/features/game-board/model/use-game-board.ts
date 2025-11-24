import { useCallback, useState } from 'react'
import { useParams } from 'next/navigation'
import { Board, Cell } from '@/entities/game-board'

export function useGameBoard({
  board,
  onMoveAction,
}: {
  board: Board
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

  return {
    selectedCell,
    handleCellClick,
  }
}
