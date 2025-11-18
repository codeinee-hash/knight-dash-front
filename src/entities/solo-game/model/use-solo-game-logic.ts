'use client'

import { useCallback, useEffect } from 'react'
import { useBoard } from '@/entities/game-board'
import { useCreateSoloGame } from './use-create-solo-game'
import { useSoloGameSocket } from '../lib/use-solo-game-socket'
import { useSoloGame } from '../lib/use-solo-game'

export function useSoloGameLogic() {
  const createGame = useCreateSoloGame()
  const { gameSession, reconnectSocket, handleGameEnd, handleSubmitScore } =
    useSoloGameSocket()
  const { board, updateCoinLevel } = useBoard()
  const { isGameOver, setIsGameOver } = useSoloGame()

  const handleGameOver = useCallback(() => {
    setIsGameOver(true)
    handleGameEnd()
  }, [handleGameEnd, setIsGameOver])

  useEffect(() => {
    if (!gameSession) return
    setIsGameOver(gameSession.finished)
  }, [gameSession?.finished])

  useEffect(() => {
    if (isGameOver) return
    const i = setInterval(updateCoinLevel, 10000)
    return () => clearInterval(i)
  }, [isGameOver, updateCoinLevel])

  const handleRestartGame = (timeMode: number) => {
    createGame.create(timeMode)
    reconnectSocket()
    setIsGameOver(false)
  }

  return {
    gameSession,
    board,
    isGameOver,
    initialSeconds: gameSession?.remainingTime,
    isCreatingGame: createGame.isPending,
    createGame,
    reconnectSocket,
    handleGameOver,
    handleRestartGame,
    handleSubmitScore,
  }
}
