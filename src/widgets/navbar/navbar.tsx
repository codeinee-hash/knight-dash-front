'use client'

import { Layout } from './ui/layout'
import { Logo } from './ui/logo'
import { NavItems } from './ui/nav-items'
import { PlayerInfo } from './ui/player-info'

import { LogOut } from 'lucide-react'

export function Navbar() {
  return (
    <Layout
      logo={<Logo />}
      nav={<NavItems />}
      player={<PlayerInfo />}
      actions={
        <div
          onClick={() => {}}
          className='w-full py-3 px-6 rounded text-base font-medium flex items-center gap-2 text-white cursor-pointer hover:bg-destructive/5 hover:text-destructive transition-colors'
        >
          <LogOut />
          Выйти
        </div>
      }
    />
  )
}
