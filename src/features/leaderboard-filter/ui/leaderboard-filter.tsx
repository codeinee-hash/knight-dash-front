'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/kit/select'
import Image from 'next/image'
import { filterOptions } from '../model/const'
import { useLeaderboardFilter } from '../model/use-leaderboard-filter'

export function LeaderboardFilter() {
  const value = useLeaderboardFilter((state) => state.filter)
  const onChange = useLeaderboardFilter((state) => state.setFilter)

  return (
    <Select defaultValue='all' value={value} onValueChange={onChange}>
      <SelectTrigger className='w-[440px] bg-[#393939]! border-[#393939] p-6! mb-6! text-white/60! max-sm:w-full'>
        <SelectValue placeholder='Все' />
      </SelectTrigger>
      <SelectContent className='w-[440px] border-none bg-[#393939] text-white/60 max-sm:w-full'>
        <div className='p-4!'>
          {filterOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className='px-2! py-2! hover:bg-[#494949]! hover:text-white!'
            >
              <Image
                src={option.imgSrc}
                alt={`${option.value}-mode`}
                width={26}
                height={26}
              />
              {option.label}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  )
}
