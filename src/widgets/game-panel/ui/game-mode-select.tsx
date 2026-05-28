'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/kit/select'
import Image from 'next/image'
import { gameModeSelectOptions } from '../const/constants'

interface Props {
  value: string
  onChangeAction: (value: string) => void
}

export function GameModeSelect({ value, onChangeAction }: Props) {
  return (
    <Select defaultValue='15' value={value} onValueChange={onChangeAction}>
      <SelectTrigger className='w-full bg-[#494949] border-[#393939] p-6 text-white/60!'>
        <SelectValue placeholder='Выберите режим' />
      </SelectTrigger>
      <SelectContent className='w-full border-none bg-[#393939] text-white/60'>
        <div className='p-4!'>
          {gameModeSelectOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className='px-2! py-2! hover:bg-[#494949]! hover:text-white!'
            >
              <Image
                src={option.picture}
                alt={option.label}
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
