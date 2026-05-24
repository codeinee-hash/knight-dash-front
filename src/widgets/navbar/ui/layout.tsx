'use client'

import { useState, useEffect } from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/kit/sheet'
import { ChevronRight, Menu } from 'lucide-react'
import { useMediaQuery } from '@/shared/hooks/use-responsive'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/kit/popover'
import { Button } from '@/shared/ui/kit/button'
import { useNavbar } from '../store/use-navbar'

interface Props {
  logo?: React.ReactNode
  player?: React.ReactNode
  nav?: React.ReactNode
  actions?: React.ReactNode
}

export function Layout({ logo, player, nav, actions }: Props) {
  const open = useNavbar((state) => state.open)
  const setOpen = useNavbar((state) => state.setOpen)

  const isMobile = useMediaQuery('(max-width: 1023px)')

  if (isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='secondary'
            className='text-yellow-400 bg-[#212121] p-2 rounded-md shadow fixed top-4 right-4 z-50'
          >
            <Menu className='w-6 h-6' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side='bottom'
          className='w-[300px] p-4 mr-4 mt-2 bg-[#393939] border-none text-white'
        >
          <div className='mb-4!'>{logo}</div>
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
        <Button className='max-md:hidden fixed left-0 z-40 h-screen w-[60px] cursor-pointer rounded-r-md bg-[#393939] hover:bg-[#404040] text-primary flex items-center justify-center shadow-lg outline-none border-none'>
          <ChevronRight className='w-6! h-6!' />
        </Button>
      </SheetTrigger>

      <SheetContent
        side='left'
        className='w-[322px] h-full bg-[#393939] border-none outline-none px-5 pt-7 text-white gap-5 pb-[100px]'
      >
        <div className='flex-grow flex flex-col gap-5 pb-[100px]'>
          <SheetHeader>
            <SheetTitle>{logo}</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          {player}
          {nav}
        </div>
        {actions}
      </SheetContent>
    </Sheet>
  )
}
