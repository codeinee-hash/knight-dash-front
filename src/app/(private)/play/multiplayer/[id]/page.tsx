'use client'

import { PageTitle } from '@/shared/ui/page-title'
import { GameBoard } from '@/features/game-board'
import { MultiplayerGamePanel } from '@/widgets/multiplayer-panel/ui/multiplayer-game-panel'
import { useMultiplayerLogic } from '@/entities/multiplayer-game/model/use-multiplayer-logic'
import { MultiplayerResults } from '@/widgets/multiplayer-results/ui/multiplayer-results'
import { MultiplayerLobby } from '@/widgets/multiplayer-lobby/ui/multiplayer-lobby'
import { GameLayout } from '@/shared/ui/game-layout'
import { Button } from '@/shared/ui/kit/button'

export default function MultiplayerGameRoom() {
  const {
    board,
    roomInfo,
    opponentJoined,
    opponentDisconnected,
    readyCount,
    gameStarted,
    isReady,
    handleReady,
    currentUserId,
    winnerId,
    initialSeconds,
    gameSession,
    handleSubmitScore,
    handleCancelGame,
    error,
    isCreator,
  } = useMultiplayerLogic()

  const isGameOver = gameSession?.status === 'finished'

  if (error) {
    return (
      <div className='flex flex-col h-full w-full'>
        <PageTitle title='Два игрока' img='/images/Duel.svg' />
        <div className='flex-1 flex flex-col items-center justify-center p-4 gap-4'>
          <div className='bg-red-500/10 text-red-500 p-4 rounded-lg max-w-md text-center'>
            <h3 className='font-bold text-lg mb-2'>Ошибка</h3>
            <p>{typeof error === 'string' ? error : error.message}</p>
          </div>
          <Button onClick={() => window.location.href = '/time-mode'}>
            Вернуться к выбору режима
          </Button>
        </div>
      </div>
    )
  }

  if (!gameStarted) {
    return (
      <div className='flex flex-col h-full w-full'>
        <PageTitle title='Два игрока' img='/images/Duel.svg' />
        <div className='flex-1 flex items-center justify-center p-4'>
          <MultiplayerLobby
            roomInfo={roomInfo}
            opponentJoined={opponentJoined}
            readyCount={readyCount}
            isReady={isReady}
            handleReady={handleReady}
            isCreator={isCreator}
            handleCancelGame={handleCancelGame}
          />
        </div>
      </div>
    )
  }

  return (
    <GameLayout
      pageHeader={<PageTitle title='Два игрока' img='/images/Duel.svg' />}
      gameBoard={
        <div className='relative'>
          {opponentDisconnected && (
            <div className='absolute -top-10 left-0 right-0 z-10 bg-yellow-500/90 text-black text-sm font-medium text-center py-2 px-4 rounded-lg animate-pulse'>
              Соперник отключился. Ожидание переподключения...
            </div>
          )}
          <GameBoard 
            board={board} 
            currentUserId={currentUserId}
            onMoveAction={handleSubmitScore} 
          />
        </div>
      }
      gamePanel={
        board ? (
          <MultiplayerGamePanel
            gameIsOn={!isGameOver}
            initialSeconds={initialSeconds}
            gameSession={gameSession ?? undefined}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white">Загрузка...</div>
        )
      }
      gameResults={
        <MultiplayerResults
          isGameOver={isGameOver}
          gameSession={gameSession}
          currentUserId={currentUserId}
        />
      }
    />
  )
}
