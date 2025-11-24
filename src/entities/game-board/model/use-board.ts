'use client'

import { useState } from 'react'
import { Board } from './board'

export function useBoard() {
  const [board, setBoard] = useState(() => createInitialBoard())

  const resetBoard = () => setBoard(createInitialBoard())

  const updateCoinLevel = () => {
    setBoard((prev) => {
      prev.setCoinLevel(prev.getCoinLevel() + 1)
      return prev
    })
  }

  return { board, resetBoard, updateCoinLevel }
}

function createInitialBoard() {
  const b = new Board()
  b.initCells()
  b.addFiguresToSoloGame()
  b.addCoins(5)
  return b
}
