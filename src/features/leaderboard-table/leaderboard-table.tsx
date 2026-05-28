'use client'

import { useState } from 'react'
import { ITopPlayer } from '@/entities/leaderboard'
import { LeaderboardTableInfo } from './ui/leaderboard-table-info'
import { LeaderboardTableContent } from './ui/leaderboard-table-content'
import { ShowMoreButton } from './ui/show-more-button'

interface Props {
  data: ITopPlayer[]
  title: string
  picture: string
}

export function LeaderboardTable({ data, title, picture }: Props) {
  const [visibleCount, setVisibleCount] = useState(5)

  const visibleData = data.slice(0, visibleCount)

  return (
    <div className='w-full bg-[#393939] rounded-[8px] px-[150px] pb-14 pt-5 mb-[50px] max-xl:px-[50px] max-sm:px-[15px] max-sm:pb-[20px]'>
      <LeaderboardTableInfo title={title} picture={picture} />
      <LeaderboardTableContent data={visibleData} />
      <ShowMoreButton
        isVisible={data.length > visibleCount}
        handleClickAction={() => setVisibleCount((prev) => prev + 5)}
      />
    </div>
  )
}
