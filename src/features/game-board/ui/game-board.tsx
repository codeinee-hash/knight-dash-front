'use client'

import { useState } from 'react'
import GameBoardCell from './game-board-cell'
import { GameState } from '@/shared/types/types'

function isValidKnightMove(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.abs(x1 - x2)
  const dy = Math.abs(y1 - y2)
  return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
}

interface Props {
  board: GameState | null
  currentUserId?: string
  onMoveAction: (toX: number, toY: number) => void
}

export function GameBoard({ board: gameState, currentUserId, onMoveAction }: Props) {
  const [selectedPos, setSelectedPos] = useState<{ x: number; y: number } | null>(null)

  // Пустая сетка 8x8
  const grid = Array.from({ length: 8 }, (_, y) =>
    Array.from({ length: 8 }, (_, x) => ({ x, y }))
  )

  const players = gameState?.players || []
  const myPlayerState = currentUserId 
    ? players.find(p => p.id === currentUserId) 
    : players[0]

  const handleCellClick = (x: number, y: number) => {
    if (!gameState || !myPlayerState) return

    // Если клик на своего коня - выделяем его
    if (myPlayerState.x === x && myPlayerState.y === y) {
      setSelectedPos({ x, y })
      return
    }

    // Если конь выделен и клик на пустую клетку или монету
    if (selectedPos) {
      if (isValidKnightMove(selectedPos.x, selectedPos.y, x, y)) {
        onMoveAction(x, y)
        setSelectedPos(null)
      }
    }
  }

  return (
    <div className='grid grid-cols-8 gap-0 w-[480px] max-[510px]:w-[352px] max-[390px]:w-[288px]'>
      {grid.map((row, y) =>
        row.map(({ x }) => {
          const coin = gameState?.coins.find(c => c.x === x && c.y === y) || null
          const playerOnCell = players.find(p => p.x === x && p.y === y)
          const isMyFigure = playerOnCell?.id === myPlayerState?.id

          // Определяем цвет коня: создатель (первый игрок) - белый, второй - черный
          // Если игроков несколько, берем индекс: 0 -> белый, 1 -> черный
          const playerIndex = playerOnCell ? players.findIndex(p => p.id === playerOnCell.id) : -1
          const figureColor = playerIndex === 0 ? 'white' : 'black'
          const logoPath = figureColor === 'white' ? '/images/white-knight.svg' : '/images/dark-knight.svg'

          const selected = selectedPos?.x === x && selectedPos?.y === y
          let available = false

          if (selectedPos) {
            available = isValidKnightMove(selectedPos.x, selectedPos.y, x, y)
          }

          // Мокаем объект Cell для обратной совместимости с GameBoardCell
          const mockCell = {
            id: `${x}-${y}`,
            x,
            y,
            color: (x + y) % 2 !== 0 ? 'black' : 'white',
            figure: playerOnCell ? { 
              color: figureColor, 
              name: 'knight', 
              logo: logoPath
            } : null,
            coin: coin ? {
              nominal: coin.nominal,
              logo: `/images/geekcoin ${coin.nominal}.svg`
            } : null,
            available
          }

          return (
            <GameBoardCell
              key={mockCell.id}
              cell={mockCell}
              selected={selected}
              available={available}
              onClick={() => handleCellClick(x, y)}
            />
          )
        }),
      )}
    </div>
  )
}
