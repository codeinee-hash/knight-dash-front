'use client'

import { PageTitle } from '@/shared/ui/page-title'
import { GameBoard } from '@/features/game-board'
import { GamePanel } from '@/widgets/game-panel'
import { useSoloGameLogic } from '@/entities/solo-game'
import { SoloGameResults } from '@/widgets/solo-game-results'
import { SoloGameLayout } from '@/shared/ui/solo-game-layout'

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
    <SoloGameLayout
      pageHeader={<PageTitle title='Один игрок' img='/images/Pictograms.svg' />}
      gameBoard={<GameBoard board={board} onMoveAction={handleSubmitScore} />}
      gamePanel={
        <GamePanel
          gameIsOn
          initialSeconds={initialSeconds!}
          gameSession={gameSession!}
          onGameOverAction={handleGameOver}
        />
      }
      gameResults={
        <SoloGameResults
          isGameOver={isGameOver}
          gameSession={gameSession!}
          isCreatingGame={isCreatingGame}
          onRestartGameAction={handleRestartGame}
        />
      }
    />
  )
}
