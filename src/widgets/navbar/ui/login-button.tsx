'use client'

import Link from 'next/link'
import { LogInIcon } from 'lucide-react'
import { APP_ROUTES } from '@/shared/config/routes.config'

export function LoginButton() {
  return (
    <Link
      href={APP_ROUTES.login()}
      className='w-full py-3 px-6 rounded text-base font-medium flex items-center gap-2 text-white cursor-pointer hover:bg-[#494949] transition-colors'
    >
      <LogInIcon />
      Войти
    </Link>
  )
}
