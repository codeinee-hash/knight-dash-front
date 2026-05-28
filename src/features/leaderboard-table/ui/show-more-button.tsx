'use client'

import { ChevronRight } from 'lucide-react'

interface Props {
  isVisible: boolean
  handleClickAction: () => void
}

export function ShowMoreButton({ isVisible, handleClickAction }: Props) {
  if (!isVisible) return null

  return (
    <div className='mt-6! flex justify-center'>
      <button
        onClick={handleClickAction}
        className='text-primary transition-all outline-none border-none bg-none flex items-center gap-2 font-medium max-sm:text-[14px] cursor-pointer'
      >
        Смотреть больше <ChevronRight />
      </button>
    </div>
  )
}
