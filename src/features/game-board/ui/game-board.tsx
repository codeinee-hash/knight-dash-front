'use client'

import { Board as BoardModel } from '@/entities/game-board'
import GameBoardCell from './game-board-cell'
import { useGameBoard } from '../model/use-game-board'

export function GameBoard({
  board,
  onMoveAction,
}: {
  board: BoardModel
  onMoveAction: (payload: { gameId: string; score: number }) => void
}) {
  const { selectedCell, handleCellClick } = useGameBoard({
    board,
    onMoveAction,
  })

  return (
    <div className='grid grid-cols-8 gap-0 w-[480px] max-[510px]:w-[352px] max-[390px]:w-[288px]'>
      {board.cells.map((row) =>
        row.map((cell) => (
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
