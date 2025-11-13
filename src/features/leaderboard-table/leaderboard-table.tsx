'use client'

import { LeaderboardTableInfo } from './ui/leaderboard-table-info'
import { LeaderboardTableContent } from './ui/leaderboard-table-content'
import { ITopPlayer } from '@/entities/leaderboard'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

export function LeaderboardTable({
  data,
  title,
  picture,
}: {
  data: ITopPlayer[]
  title: string
  picture: string
}) {
  const [visibleCount, setVisibleCount] = useState(5)

  const visibleData = data.slice(0, visibleCount)

  return (
    <div className='w-full bg-[#393939] rounded-[8px] px-[150px] pb-14 pt-5 mb-[50px] max-xl:px-[50px] max-sm:px-[15px] max-sm:pb-[20px]'>
      <LeaderboardTableInfo title={title} picture={picture} />
      <LeaderboardTableContent data={visibleData} />
      {data.length > visibleCount && (
        <div className='mt-6! flex justify-center'>
          <button
            onClick={() => setVisibleCount((prev) => prev + 5)}
            className='text-primary transition-all outline-none border-none bg-none flex items-center gap-2 font-medium max-sm:text-[14px] cursor-pointer'
          >
            Смотреть больше <ChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}
