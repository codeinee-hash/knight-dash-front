'use client'

import { LeaderboardTable } from '@/features/leaderboard-table'
import {
  LeaderboardFilter,
  useLeaderboardFilter,
} from '@/features/leaderboard-filter'
import type { ITopPlayersByMode } from '@/entities/leaderboard'
import { MODES } from '../const/modes'

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
