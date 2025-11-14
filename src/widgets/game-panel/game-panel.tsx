'use client'

import { useState } from 'react'
import { Layout } from './ui/layout'
import { ScoreboardList } from './ui/scoreboard-list'
import { GameModeSelect } from './ui/game-mode-select'
import { GameTimer } from '@/features/game-timer'
import { Button } from '@/shared/ui/kit/button'
import { ISoloGameSession } from '@/entities/solo-game'

export function GamePanel({ gameIsOn }: { gameIsOn?: boolean }) {
  const [gameMode, setGameMode] = useState('30')

  return (
    <Layout
      gameIsOn={gameIsOn}
      timer={<GameTimer initialSeconds={0} onEndAction={() => {}} />}
      action={
        <>
          <GameModeSelect value={gameMode} onChangeAction={setGameMode} />
          <Button
            onClick={() => console.log(gameMode)}
            className='w-full h-[44px] rounded-[8px] text-[#2C2E35] font-semibold text-base mb-3'
          >
            Начать игру
          </Button>
        </>
      }
      scoreboard={<ScoreboardList gameSession={{} as ISoloGameSession} />}
    />
  )
}
