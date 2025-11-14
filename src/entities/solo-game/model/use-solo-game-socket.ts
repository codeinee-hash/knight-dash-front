import { useEffect, useState } from 'react'
import { socketApi } from '../api/socket-client'
import type { ISoloGameSession } from './types'

export function useSoloGameSocket() {
  const [resData, setResData] = useState<ISoloGameSession | null>(null)
  const [error, setError] = useState<string | null>(null)

  const connectSocket = () => {
    if (!socketApi.socket) {
      socketApi.createConnection()
    }

    socketApi.socket?.on('event-submit-score', (data: ISoloGameSession) => {
      setResData((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(data)) {
          return data
        }
        return prev
      })

      if (data.finished) {
        socketApi.socket?.disconnect()
        socketApi.disconnect()
      }
    })

    socketApi.socket?.on(
      'server-error',
      (error: { message: string; status: number }) => {
        setError(error.message)
        if (error.message === 'Игра уже закончена') {
          socketApi.socket?.disconnect()
          socketApi.disconnect()
        }
      },
    )
  }

  const handleGameEnd = () => {
    socketApi.socket?.off('event-submit-score')
    socketApi.socket?.off('server-error')
    socketApi.disconnect()
  }

  const reconnectSocket = () => {
    socketApi.disconnect()
    connectSocket()
  }

  useEffect(() => {
    connectSocket()

    return () => {
      socketApi.socket?.off('event-submit-score')
      socketApi.socket?.off('server-error')
      socketApi.disconnect()
    }
  }, [])

  return {
    resData,
    error,
    handleGameEnd,
    reconnectSocket,
  }
}
