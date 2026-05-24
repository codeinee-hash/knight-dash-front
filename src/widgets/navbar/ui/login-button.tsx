'use client'

import Link from 'next/link'
import { LogInIcon } from 'lucide-react'
import { APP_ROUTES } from '@/shared/config/routes.config'
import { useNavbar } from '../store/use-navbar'

export function LoginButton() {
  const setOpen = useNavbar((state) => state.setOpen)

  return (
    <Link
      href={APP_ROUTES.login()}
      onClick={() => setOpen(false)}
      className='w-full py-3 px-6 rounded text-base font-medium flex items-center gap-2 text-white cursor-pointer hover:bg-[#494949] transition-colors'
    >
      <LogInIcon />
      Войти
    </Link>
  )
}
