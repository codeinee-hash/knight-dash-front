'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useCreateSoloGame } from './use-create-solo-game'
import { useSoloGameSocket } from '../lib/use-solo-game-socket'
import { useSoloGame } from '../lib/use-solo-game'

export function useSoloGameLogic() {
  const createGame = useCreateSoloGame()
  const { gameState, handleMoveFigure, handleGameEnd } =
    useSoloGameSocket()
  const { isGameOver, setIsGameOver } = useSoloGame()
  
  const handleGameOver = useCallback(() => {
    setIsGameOver(true)
    handleGameEnd()
  }, [handleGameEnd, setIsGameOver])

  useEffect(() => {
    setIsGameOver(false)
    if (!gameState) return
    setIsGameOver(gameState.finished)
  }, [gameState, setIsGameOver])

  const handleRestartGame = (timeMode: number) => {
    createGame.create(timeMode)
    setIsGameOver(false)
  }

  const playerState = gameState?.players?.[0]
  const mockGameSession = gameState ? {
    _id: "mock",
    playerId: playerState?.id || "mock",
    timeMode: gameState.timeMode, 
    remainingTime: gameState.remainingTime,
    totalScore: playerState?.score || 0,
    finished: gameState.finished,
    score150: playerState?.coinCounts?.[150] || 0,
    score200: playerState?.coinCounts?.[200] || 0,
    score250: playerState?.coinCounts?.[250] || 0,
    score300: playerState?.coinCounts?.[300] || 0,
    score350: playerState?.coinCounts?.[350] || 0,
    startedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  } : null;

  return {
    board: gameState, // Передаем GameState как board
    gameSession: mockGameSession,
    initialSeconds: gameState?.remainingTime ?? 0,
    isGameOver,
    isCreatingGame: createGame.isPending,
    createGame,
    handleGameOver,
    handleRestartGame,
    handleSubmitScore: handleMoveFigure,
  }
}
