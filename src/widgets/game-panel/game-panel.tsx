'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { GameTimer } from '@/features/game-timer'
import { ISoloGameSession } from '@/entities/solo-game'
import { Layout } from './ui/layout'
import { ScoreboardList } from './ui/scoreboard-list'
import { GameModeSelect } from './ui/game-mode-select'
import { CreateSoloGameButton } from './ui/create-solo-game-button'

export function GamePanel({
  gameIsOn,
  gameSession,
  onCreateGameAction,
  onGameOverAction,
  isPending,
  initialSeconds,
}: {
  gameIsOn?: boolean
  gameSession?: ISoloGameSession
  onCreateGameAction?: (id: number) => void
  onGameOverAction?: () => void
  isPending?: boolean
  initialSeconds?: number
}) {
  const searchParams = useSearchParams()
  const timeMode = searchParams.get('timer')
  const [gameMode, setGameMode] = useState(
    ['15', '30', '60'].includes(timeMode!) ? timeMode : '30',
  )

  return (
    <Layout
      gameIsOn={gameIsOn}
      timer={
        <GameTimer
          initialSeconds={gameIsOn ? initialSeconds! : 0}
          onEndAction={onGameOverAction!}
        />
      }
      action={
        <>
          <GameModeSelect value={gameMode!} onChangeAction={setGameMode} />
          <CreateSoloGameButton
            isPending={isPending}
            handleClickAction={() => onCreateGameAction?.(Number(gameMode))}
          />
        </>
      }
      scoreboard={<ScoreboardList gameSession={gameSession} />}
    />
  )
}
