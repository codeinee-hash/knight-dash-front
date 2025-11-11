'use client'

import Image from 'next/image'
import Link from 'next/link'

export function NavItems() {
  const sidebarItems = [
    { icon: '/images/Pictograms.svg', label: 'Один игрок' },
    { icon: '/images/Duel.svg', label: 'Два игрока' },
    { icon: '/images/Time-mode.svg', label: 'Режимы времени' },
    { icon: '/images/Leaderboard.svg', label: 'Таблица лидеров' },
    { icon: '/images/Game-rules.svg', label: 'Правила игры' },
    { icon: '/images/Settings.svg', label: 'Профиль' },
  ]

  return (
    <div className='flex flex-col bg-[#393939]'>
      {sidebarItems.map((item, idx) => (
        <Link
          key={idx}
          href={'/'}
          className='w-full py-3 px-6 rounded text-base font-medium flex items-center gap-2.5 cursor-pointer hover:bg-[#494949] transition-colors'
        >
          <Image src={item.icon} alt={item.label} width={26} height={26} />
          {item.label}
        </Link>
      ))}
    </div>
  )
}
