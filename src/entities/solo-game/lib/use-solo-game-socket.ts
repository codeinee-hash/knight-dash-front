'use client'

import { useEffect, useState, useRef } from 'react'
import { socketApi } from '../api/socket-client'
import type { ISoloGameSession } from '../model/types'
import { useParams } from 'next/navigation'

export function useSoloGameSocket() {
  const [gameSession, setGameSession] = useState<ISoloGameSession | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { id: gameId } = useParams<{ id: string }>()
  const hasConnected = useRef(false) // ← защита от повторного подключения

  useEffect(() => {
    if (hasConnected.current) return
    hasConnected.current = true

    socketApi.createConnection()
    socketApi.socket?.emit('client-enter-room', { gameId })

    const handleConnectionSuccess = (data: ISoloGameSession) => {
      setGameSession(data)
    }

    const handleScoreUpdate = (data: ISoloGameSession) => {
      setGameSession(data)
      if (data.finished) {
        socketApi.disconnect()
      }
    }

    const handleServerError = (error: { message: string }) => {
      setError(error.message)
      if (error.message === 'Игра уже закончена') {
        socketApi.disconnect()
      }
    }

    socketApi.socket?.on('connection-success', handleConnectionSuccess)
    socketApi.socket?.on('event-submit-score', handleScoreUpdate)
    socketApi.socket?.on('server-error', handleServerError)

    return () => {
      socketApi.socket?.off('connection-success', handleConnectionSuccess)
      socketApi.socket?.off('event-submit-score', handleScoreUpdate)
      socketApi.socket?.off('server-error', handleServerError)
      socketApi.disconnect()
      hasConnected.current = false
    }
  }, [gameId])

  const handleSubmitScore = ({ score }: { score: number }) => {
    socketApi.socket?.emit('event-submit-score', { gameId, score })
  }

  const reconnectSocket = () => {
    socketApi.disconnect()
    hasConnected.current = false
  }

  const handleGameEnd = () => {
    socketApi.socket?.off('event-submit-score')
    socketApi.socket?.off('server-error')
    socketApi.disconnect()
  }

  return {
    gameSession,
    error,
    handleSubmitScore,
    reconnectSocket,
    handleGameEnd,
  }
}
