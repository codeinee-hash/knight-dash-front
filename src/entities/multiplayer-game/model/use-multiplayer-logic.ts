import { useMultiplayerSocket } from '../lib/use-multiplayer-socket'
import { useSession } from '@/entities/auth'
import { useState } from 'react'
import { IMultiplayerGameSession } from '../api/multiplayer-game.service'

export function useMultiplayerLogic() {
  const {
    gameState,
    error,
    roomInfo,
    opponentJoined,
    opponentDisconnected,
    readyCount,
    gameStarted,
    winnerId,
    setReady,
    handleMoveFigure,
    handleCancelGame,
  } = useMultiplayerSocket()

  const { session } = useSession()
  const currentUserId = session?._id

  // Determine if current user has already clicked "Ready"
  // Since server just gives `readyCount`, we only know our own status locally
  const [isReady, setIsReady] = useState(false)

  const handleReady = () => {
    setReady()
    setIsReady(true)
  }

  let myScore = 0
  let opponentScore = 0
  if (gameState) {
    const myPlayer = gameState.players.find(p => p.id === currentUserId)
    const opponentPlayer = gameState.players.find(p => p.id !== currentUserId)
    myScore = myPlayer?.score || 0
    opponentScore = opponentPlayer?.score || 0
  }

  // Create a mock session to pass to GamePanel/Results
  const mockSession: IMultiplayerGameSession | null = roomInfo ? {
    _id: roomInfo.gameId,
    roomCode: roomInfo.roomCode,
    player1Id: currentUserId || 'mock',
    timeMode: roomInfo.timeMode,
    status: gameStarted ? (gameState?.finished ? 'finished' : 'playing') : 'waiting',
    winnerId: winnerId || undefined,
    player1Score: myScore,
    player2Score: opponentScore,
    player1Login: session?.login || 'Игрок 1',
    player1Avatar: roomInfo?.player1Login === session?.login ? roomInfo?.player1Avatar : roomInfo?.player2Avatar,
    player2Login: (roomInfo?.player1Login === session?.login ? roomInfo?.player2Login : roomInfo?.player1Login) || 'Игрок 2',
    player2Avatar: roomInfo?.player1Login === session?.login ? roomInfo?.player2Avatar : roomInfo?.player1Avatar,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } : null

  return {
    board: gameState,
    roomInfo,
    opponentJoined,
    opponentDisconnected,
    readyCount,
    gameStarted,
    isReady,
    handleReady,
    error,
    currentUserId,
    winnerId,
    initialSeconds: gameStarted && gameState ? gameState.remainingTime : (roomInfo?.timeMode ?? 0),
    gameSession: mockSession,
    handleSubmitScore: handleMoveFigure,
    handleCancelGame,
    isCreator: session?.login === roomInfo?.player1Login,
  }
}
