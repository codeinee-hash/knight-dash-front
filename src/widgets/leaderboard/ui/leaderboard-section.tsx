'use client'

import type { ITopPlayer, ITopPlayersByMode } from '@/entities/leaderboard'
import { LeaderboardTable } from '@/features/leaderboard-table'
import {
  LeaderboardFilter,
  useLeaderboardFilter,
} from '@/features/leaderboard-filter'

const MODES = [
  {
    key: 'bullet',
    timeMode: 15,
    picture: '/images/bullet-mode.svg',
    title: 'Режим Пулька',
  },
  {
    key: 'blitz',
    timeMode: 30,
    picture: '/images/blitz-mode.svg',
    title: 'Режим Блиц',
  },
  {
    key: 'rapid',
    timeMode: 60,
    picture: '/images/rapid-mode.svg',
    title: 'Режим Раппид',
  },
] as const

export function LeaderboardSection({ data }: { data: ITopPlayersByMode[] }) {
  const filter = useLeaderboardFilter((state) => state.filter)

  return (
    <div className='flex flex-col py-6'>
      <LeaderboardFilter />

      {MODES.filter((mode) => filter === 'all' || filter === mode.key).map(
        (mode) => {
          const modeData = data.find((d) => d.timeMode === mode.timeMode)

          return (
            <LeaderboardTable
              key={mode.key}
              data={modeData?.players || []}
              picture={mode.picture}
              title={mode.title}
            />
          )
        },
      )}
    </div>
  )
}
