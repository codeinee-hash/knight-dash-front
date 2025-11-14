import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { TOKEN_KEYS } from '@/entities/auth'
import { APP_ROUTES } from '@/shared/config/routes.config'

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(TOKEN_KEYS.ACCESS)?.value
  const pathname = req.nextUrl.pathname

  const authRoutes = [APP_ROUTES.login(), APP_ROUTES.register()]
  const protectedRoutes = [APP_ROUTES.profile()]

  if (pathname === '/') {
    const soloGameUrl = new URL(APP_ROUTES.soloGame(), req.url)
    return NextResponse.redirect(soloGameUrl)
  }

  if (accessToken && authRoutes.some((route) => pathname.startsWith(route))) {
    const homeUrl = new URL(APP_ROUTES.home(), req.url)
    return NextResponse.redirect(homeUrl)
  }

  const publicPlayPages = ['/play/solo', '/play/multiplayer']

  if (publicPlayPages.includes(pathname)) {
    return NextResponse.next()
  }

  if (
    pathname.startsWith('/play/solo/') ||
    pathname.startsWith('/play/multiplayer/')
  ) {
    if (!accessToken) {
      const loginUrl = new URL(APP_ROUTES.login(), req.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (
    !accessToken &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    const loginUrl = new URL(APP_ROUTES.login(), req.url)
    loginUrl.searchParams.set('from', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/play/:path*', '/sign-in', '/sign-up', '/'],
}
