'use client'

import { useState } from 'react'
import { Layout } from './ui/layout'
import { ScoreboardList } from './ui/scoreboard-list'
import { GameModeSelect } from './ui/game-mode-select'
import { GameTimer } from '@/features/game-timer'
import { Button } from '@/shared/ui/kit/button'
import { ISoloGameSession } from '@/entities/solo-game'
import { useSearchParams } from 'next/navigation'
import { Spinner } from '@/shared/ui/kit/spinner'

export function GamePanel({
  gameIsOn,
  gameSession,
  onCreateGameAction,
  onGameOverAction,
  isPending,
  initialSeconds,
}: {
  gameIsOn?: boolean
  gameSession: ISoloGameSession
  onCreateGameAction?: (id: number) => void
  onGameOverAction?: () => void
  isPending?: boolean
  initialSeconds: number
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
          initialSeconds={gameIsOn ? initialSeconds : 0}
          onEndAction={onGameOverAction!}
        />
      }
      action={
        <>
          <GameModeSelect value={gameMode!} onChangeAction={setGameMode} />
          <Button
            onClick={() => onCreateGameAction?.(Number(gameMode))}
            disabled={isPending}
            className='w-full h-[44px] rounded-[8px] text-[#2C2E35] font-semibold text-base mb-3 disabled:bg-primary/80 cursor-pointer'
          >
            {isPending ? (
              <span className='flex gap-2'>
                <Spinner className='size-6 text-black' /> Загрузка
              </span>
            ) : (
              <span>Начать игру</span>
            )}
          </Button>
        </>
      }
      scoreboard={<ScoreboardList gameSession={gameSession} />}
    />
  )
}
