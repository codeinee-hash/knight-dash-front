'use client'

import {
  LeaderboardTable,
  MultiplayerLeaderboardTable,
} from '@/features/leaderboard-table'
import {
  LeaderboardFilter,
  useLeaderboardFilter,
} from '@/features/leaderboard-filter'
import type { ITopPlayer, ITopPlayersByMode } from '@/entities/leaderboard'
import { MODES } from '../const/modes'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/kit/tabs'

interface Props {
  soloData: ITopPlayersByMode[]
  multiplayerData: ITopPlayer[]
}

export function LeaderboardSection({ soloData, multiplayerData }: Props) {
  const filter = useLeaderboardFilter((state) => state.filter)

  return (
    <div className='flex flex-col py-6'>
      <Tabs defaultValue='solo' className='w-full'>
        <TabsList className='mb-6 max-sm:h-auto max-sm:w-full bg-[#393939] p-1 rounded-2xl'>
          <TabsTrigger
            value='solo'
            className='px-6 py-2 rounded-xl font-bold max-sm:w-full data-[state=active]:bg-[#F5D91F] data-[state=active]:text-black text-white hover:text-white/80 transition-colors'
          >
            Одиночная игра
          </TabsTrigger>
          <TabsTrigger
            value='multiplayer'
            className='px-6 py-2 rounded-xl font-bold max-sm:w-full data-[state=active]:bg-[#F5D91F] data-[state=active]:text-black text-white hover:text-white/80 transition-colors'
          >
            Два игрока
          </TabsTrigger>
        </TabsList>

        <TabsContent value='solo' className='mt-0'>
          <LeaderboardFilter />
          {MODES.filter((mode) => filter === 'all' || filter === mode.key).map(
            (mode) => {
              const modeData = soloData.find(
                (d) => d.timeMode === mode.timeMode,
              )

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
        </TabsContent>

        <TabsContent value='multiplayer' className='mt-0'>
          <MultiplayerLeaderboardTable data={multiplayerData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
