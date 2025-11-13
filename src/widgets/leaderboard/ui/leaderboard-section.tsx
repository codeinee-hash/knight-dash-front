'use client'

import type { ITopPlayer, ITopPlayersByMode } from '@/entities/leaderboard'
import { LeaderboardTable } from '@/features/leaderboard-table'
import {
  LeaderboardFilter,
  useLeaderboardFilter,
} from '@/features/leaderboard-filter'

export function LeaderboardSection({ data }: { data: ITopPlayersByMode[] }) {
  const filter = useLeaderboardFilter((state) => state.filter)

  return (
    <div className='flex flex-col py-6 max-xl:px-[40px] max-sm:px-[15px]'>
      <LeaderboardFilter />
      {(filter === 'all' || filter === 'bullet') && (
        <LeaderboardTable
          data={
            data.find((item) => item.timeMode === 15)?.players as ITopPlayer[]
          }
          picture='/images/bullet-mode.svg'
          title='Режим Пулька'
        />
      )}

      {(filter === 'all' || filter === 'blitz') && (
        <LeaderboardTable
          data={
            data.find((item) => item.timeMode === 30)?.players as ITopPlayer[]
          }
          picture='/images/blitz-mode.svg'
          title='Режим Блиц'
        />
      )}

      {(filter === 'all' || filter === 'rapid') && (
        <LeaderboardTable
          data={
            data.find((item) => item.timeMode === 60)?.players as ITopPlayer[]
          }
          picture='/images/rapid-mode.svg'
          title='Режим Раппид'
        />
      )}
    </div>
  )
}
