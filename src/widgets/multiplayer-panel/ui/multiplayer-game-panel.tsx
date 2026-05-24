'use client'

import { GameTimer } from '@/features/game-timer'
import { Layout } from '@/widgets/game-panel/ui/layout'
import { MultiplayerScoreboardList } from './multiplayer-scoreboard-list'
import { IMultiplayerGameSession } from '@/entities/multiplayer-game/api/multiplayer-game.service'

export function MultiplayerGamePanel({
  gameIsOn,
  gameSession,
  initialSeconds,
}: {
  gameIsOn?: boolean
  gameSession?: IMultiplayerGameSession
  initialSeconds?: number
}) {
  return (
    <Layout
      gameIsOn={gameIsOn}
      timer={
        <GameTimer
          initialSeconds={gameIsOn ? initialSeconds! : 0}
          isActive={gameIsOn}
          onEndAction={() => {}} // GameOver is handled by server now
        />
      }
      action={<div className='hidden' />} // No action needed during multiplayer game
      scoreboard={<MultiplayerScoreboardList gameSession={gameSession} player1Login={gameSession?.player1Login} player2Login={gameSession?.player2Login} player1Avatar={gameSession?.player1Avatar} player2Avatar={gameSession?.player2Avatar} />}
    />
  )
}
