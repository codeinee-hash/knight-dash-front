'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/kit/sheet'
import { useState } from 'react'
import { ChevronRight, Menu } from 'lucide-react'
import { useMediaQuery } from '@/shared/hooks/use-responsive'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/kit/popover'

interface Props {
  logo?: React.ReactNode
  player?: React.ReactNode
  nav?: React.ReactNode
  actions?: React.ReactNode
}

export function Layout({ logo, player, nav, actions }: Props) {
  const [open, setOpen] = useState(false)

  const isMobile = useMediaQuery('(max-width: 1023px)')

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className='fixed top-4 right-4 z-50'>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className='text-yellow-400 bg-[#212121] p-2! rounded-md shadow'
            >
              <Menu className='w-6 h-6' />
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          side='bottom'
          className='w-[300px] p-4 mr-4 mt-2 bg-[#393939] border-none text-white'
        >
          {logo}
          {player}
          <div className='my-4'>{nav}</div>
          {actions}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className='max-md:hidden fixed left-0 z-40 h-screen w-[60px] cursor-pointer rounded-r-md bg-[#393939] text-[#F5D91F] flex items-center justify-center shadow-lg'>
          <ChevronRight />
        </div>
      </SheetTrigger>

      <SheetContent
        side='left'
        className='w-[322px] h-full bg-[#393939] border-none outline-none px-5 pt-7 text-white gap-5 pb-[100px]'
      >
        <div className='flex-grow flex flex-col gap-5 pb-[100px]!'>
          <SheetHeader>
            <SheetTitle>{logo}</SheetTitle>
          </SheetHeader>
          {player}
          {nav}
        </div>
        {actions}
      </SheetContent>
    </Sheet>
  )
}
