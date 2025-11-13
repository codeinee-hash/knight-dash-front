'use client'

import { Layout } from './ui/layout'
import { Logo } from './ui/logo'
import { NavItems } from './ui/nav-items'
import { PlayerInfo } from './ui/player-info'
import { LoginButton } from './ui/login-button'
import { LogoutButton } from './ui/logout-button'
import { useSession } from '@/entities/auth'

export function Navbar() {
  const session = useSession((state) => state.session)

  return (
    <Layout
      logo={<Logo />}
      nav={<NavItems />}
      player={session && <PlayerInfo username={session.login} />}
      actions={session ? <LogoutButton /> : <LoginButton />}
    />
  )
}
