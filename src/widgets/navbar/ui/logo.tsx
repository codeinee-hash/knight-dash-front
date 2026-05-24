'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useNavbar } from '../store/use-navbar'
import { APP_ROUTES } from '@/shared/config/routes.config'

export function Logo() {
  const setOpen = useNavbar((state) => state.setOpen)

  return (
    <Link href={APP_ROUTES.home()} onClick={() => setOpen(false)}>
      <Image src={'/images/geeks 2.png'} alt={'logo'} width={189} height={37} priority />
    </Link>
  )
}
