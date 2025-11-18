'use client'

import { PageTitle } from '@/shared/ui/page-title'
import { GameBoard } from '@/features/game-board'
import { GamePanel } from '@/widgets/game-panel'
import { useSoloGameLogic } from '@/entities/solo-game'
import { SoloGameResults } from '@/widgets/solo-game-results'

export default function SoloGameRoom() {
  const {
    board,
    initialSeconds,
    gameSession,
    handleGameOver,
    isGameOver,
    handleRestartGame,
    handleSubmitScore,
    isCreatingGame,
  } = useSoloGameLogic()

  console.log('GameSession', gameSession)

  return (
    <>
      <div className='py-10 px-[15px] flex justify-center flex-col items-center gap-4 lg:px-0 lg:flex-row lg:justify-between lg:items-start lg:gap-10'>
        <div className='flex-1 flex justify-center w-full'>
          <div className='max-w-[600px] w-full'>
            <PageTitle title='Один игрок' img='/images/Pictograms.svg' />
            <div className='flex justify-center'>
              <GameBoard board={board} onMoveAction={handleSubmitScore} />
            </div>
          </div>
        </div>
        <div className='lg:max-w-[330px] w-full'>
          <GamePanel
            gameIsOn
            initialSeconds={initialSeconds!}
            gameSession={gameSession!}
            onGameOverAction={handleGameOver}
          />
        </div>
      </div>
      <SoloGameResults
        isGameOver={isGameOver}
        gameSession={gameSession!}
        isCreatingGame={isCreatingGame}
        onRestartGameAction={handleRestartGame}
      />
    </>
  )
}
