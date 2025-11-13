'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { sidebarItems } from '../const/nav-items'
import { useNavbar } from '../store/use-navbar'

export function NavItems() {
  const pathname = usePathname()

  const setOpen = useNavbar((state) => state.setOpen)

  return (
    <div className='flex flex-col bg-[#393939]'>
      {sidebarItems.map((item, idx) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={idx}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              isActive && 'bg-primary/10 hover:bg-primary/10!',
              'w-full py-3 px-6 rounded text-base font-medium flex items-center gap-2.5 cursor-pointer hover:bg-[#494949] transition-colors',
            )}
          >
            <Image src={item.icon} alt={item.label} width={26} height={26} />
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}
