import { Layout } from './ui/layout'
import { Logo } from './ui/logo'
import { NavItems } from './ui/nav-items'
import { PlayerInfo } from './ui/player-info'
import { LoginButton } from './ui/login-button'
import { LogoutButton } from './ui/logout-button'

export function Navbar({ variant }: { variant: 'public' | 'private' }) {
  const isPrivate = variant === 'private'

  return (
    <Layout
      logo={<Logo />}
      nav={<NavItems />}
      player={isPrivate && <PlayerInfo />}
      actions={isPrivate ? <LogoutButton /> : <LoginButton />}
    />
  )
}
