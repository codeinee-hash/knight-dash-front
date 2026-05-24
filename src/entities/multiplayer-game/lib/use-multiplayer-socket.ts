import { useEffect, useRef, useCallback, useState } from 'react'
import { useParams } from 'next/navigation'
import { multiplayerSocketApi } from '../api/socket-client'
import { GameState, ServerError } from '@/shared/types/types'

export interface RoomJoinedData {
  message: string
  gameId: string
  roomCode: string
  timeMode: number
  playersInRoom: number
  player1Login?: string
  player2Login?: string
  player1Avatar?: string
  player2Avatar?: string
}

export interface PlayerReadyStatusData {
  playerId: string
  readyCount: number
}

export interface GameOverData extends GameState {
  winnerId: string | null
}

function getInitialState() {
  return {
    gameState: null as GameState | null,
    error: null as ServerError | null,
    roomInfo: null as RoomJoinedData | null,
    opponentJoined: false,
    opponentDisconnected: false,
    readyCount: 0,
    gameStarted: false,
    winnerId: null as string | null,
  }
}

type SocketState = ReturnType<typeof getInitialState>

export function useMultiplayerSocket() {
  const params = useParams()
  const gameId = params.id as string

  const [state, setState] = useState<SocketState>(getInitialState)
  const hasConnected = useRef(false)

  useEffect(() => {
    // Если gameId изменился — полностью пересоздаём подключение
    hasConnected.current = false

    multiplayerSocketApi.createConnection()

    const handleConnect = () => {
      multiplayerSocketApi.socket?.emit('join-room', { gameId })
    }

    const handleRoomJoined = (data: RoomJoinedData) => {
      setState(prev => ({
        ...prev,
        roomInfo: data,
        // Если в комнате уже 2 сокета — значит оппонент уже здесь
        opponentJoined: data.playersInRoom >= 2,
      }))
    }

    const handlePlayerJoined = (data: { playerId: string; login?: string; avatarUrl?: string }) => {
      setState(prev => {
        const isPlayer1 = prev.roomInfo?.player1Login !== undefined && !prev.roomInfo?.player2Login
        return {
          ...prev,
          opponentJoined: true,
          roomInfo: prev.roomInfo ? {
            ...prev.roomInfo,
            player2Login: isPlayer1 ? data.login : prev.roomInfo.player2Login,
            player2Avatar: isPlayer1 ? data.avatarUrl : prev.roomInfo.player2Avatar,
          } : prev.roomInfo
        }
      })
    }

    const handlePlayerReadyStatus = (data: PlayerReadyStatusData) => {
      setState(prev => ({ ...prev, readyCount: data.readyCount }))
    }

    const handleGameStarted = (data: GameState) => {
      setState(prev => ({ ...prev, gameStarted: true, gameState: data }))
    }

    const handleStateUpdated = (data: GameState) => {
      setState(prev => ({ ...prev, gameState: data }))
    }

    const handleGameOver = (data: GameOverData) => {
      setState(prev => ({
        ...prev,
        gameState: data,
        winnerId: data.winnerId,
      }))
    }

    const handleServerError = (errorData: ServerError) => {
      setState(prev => ({ ...prev, error: errorData }))
    }

    const handlePlayerDisconnected = (_data: { playerId: string }) => {
      setState(prev => ({ ...prev, opponentDisconnected: true }))
    }

    const handlePlayerReconnected = (_data: { playerId: string }) => {
      setState(prev => ({ ...prev, opponentDisconnected: false }))
    }

    const handleGameCancelled = (data: { message: string }) => {
      setState((prev) => ({ ...prev, error: { message: data.message, status: 400 } as ServerError }))
      multiplayerSocketApi.disconnect()
    }

    multiplayerSocketApi.socket?.on('connect', handleConnect)
    multiplayerSocketApi.socket?.on('room-joined', handleRoomJoined)
    multiplayerSocketApi.socket?.on('player-joined', handlePlayerJoined)
    multiplayerSocketApi.socket?.on('player-ready-status', handlePlayerReadyStatus)
    multiplayerSocketApi.socket?.on('game-started', handleGameStarted)
    multiplayerSocketApi.socket?.on('state-updated', handleStateUpdated)
    multiplayerSocketApi.socket?.on('game-over', handleGameOver)
    multiplayerSocketApi.socket?.on('server-error', handleServerError)
    multiplayerSocketApi.socket?.on('player-disconnected', handlePlayerDisconnected)
    multiplayerSocketApi.socket?.on('player-reconnected', handlePlayerReconnected)
    multiplayerSocketApi.socket?.on('game-cancelled', handleGameCancelled)

    if (multiplayerSocketApi.socket?.connected) {
      handleConnect()
    }

    return () => {
      multiplayerSocketApi.socket?.off('connect', handleConnect)
      multiplayerSocketApi.socket?.off('room-joined', handleRoomJoined)
      multiplayerSocketApi.socket?.off('player-joined', handlePlayerJoined)
      multiplayerSocketApi.socket?.off('player-ready-status', handlePlayerReadyStatus)
      multiplayerSocketApi.socket?.off('game-started', handleGameStarted)
      multiplayerSocketApi.socket?.off('state-updated', handleStateUpdated)
      multiplayerSocketApi.socket?.off('game-over', handleGameOver)
      multiplayerSocketApi.socket?.off('server-error', handleServerError)
      multiplayerSocketApi.socket?.off('player-disconnected', handlePlayerDisconnected)
      multiplayerSocketApi.socket?.off('player-reconnected', handlePlayerReconnected)
      multiplayerSocketApi.socket?.off('game-cancelled', handleGameCancelled)
      multiplayerSocketApi.disconnect()
    }
  }, [gameId])

  const setReady = useCallback(() => {
    multiplayerSocketApi.socket?.emit('player-ready', { gameId })
  }, [gameId])

  const handleMoveFigure = useCallback((toX: number, toY: number) => {
    multiplayerSocketApi.socket?.emit('move-figure', { gameId, toX, toY })
  }, [gameId])

  const handleCancelGame = useCallback(() => {
    multiplayerSocketApi.socket?.emit('cancel-game', { gameId })
  }, [gameId])

  return {
    gameState: state.gameState,
    error: state.error,
    roomInfo: state.roomInfo,
    opponentJoined: state.opponentJoined,
    opponentDisconnected: state.opponentDisconnected,
    readyCount: state.readyCount,
    gameStarted: state.gameStarted,
    winnerId: state.winnerId,
    setReady,
    handleMoveFigure,
    handleCancelGame,
  }
}
