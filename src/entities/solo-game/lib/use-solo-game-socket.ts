'use client'

import { useEffect, useState, useRef } from 'react'
import { socketApi } from '../api/socket-client'
import { useParams } from 'next/navigation'
import { GameState } from '@/shared/types/types'
import { ISoloGameSession } from '../model/types'

export function useSoloGameSocket() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { id: gameId } = useParams<{ id: string }>()
  const hasConnected = useRef(false)

  useEffect(() => {
    setGameState(null)
    setError(null)
    
    if (hasConnected.current) return
    hasConnected.current = true

    socketApi.createConnection()

    const handleConnect = () => {
      socketApi.socket?.emit('start-game', { gameId })
    }
    
    if (socketApi.socket?.connected) {
      handleConnect()
    } else {
      socketApi.socket?.on('connect', handleConnect)
    }

    const handleGameState = (data: GameState) => {
      setGameState(data)
      if (data.finished) {
        socketApi.disconnect()
      }
    }

    const handleServerError = (err: { message: string }) => {
      setError(err.message)
      if (err.message === 'Игра уже закончена') {
        socketApi.disconnect()
      }
    }

    socketApi.socket?.on('game-state', handleGameState)
    socketApi.socket?.on('state-updated', handleGameState)
    socketApi.socket?.on('game-over', handleGameState)
    socketApi.socket?.on('server-error', handleServerError)

    return () => {
      socketApi.socket?.off('connect', handleConnect)
      socketApi.socket?.off('game-state', handleGameState)
      socketApi.socket?.off('state-updated', handleGameState)
      socketApi.socket?.off('game-over', handleGameState)
      socketApi.socket?.off('server-error', handleServerError)
      socketApi.disconnect()
      hasConnected.current = false
    }
  }, [gameId])

  const handleMoveFigure = (toX: number, toY: number) => {
    socketApi.socket?.emit('move-figure', { gameId, toX, toY })
  }



  const handleGameEnd = () => {
    socketApi.socket?.off('game-state')
    socketApi.socket?.off('state-updated')
    socketApi.socket?.off('game-over')
    socketApi.socket?.off('server-error')
    socketApi.disconnect()
  }

  return {
    gameState,
    error,
    handleMoveFigure,
    handleGameEnd,
  }
}
