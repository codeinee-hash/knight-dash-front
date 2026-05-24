'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/kit/table'
import { AnimatePresence, motion } from 'framer-motion'
import { useSession } from '@/entities/auth'
import { ITopPlayer } from '@/entities/leaderboard'
import { ShowMoreButton } from './show-more-button'
import { useState } from 'react'
import { User } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

export function MultiplayerLeaderboardTable({ data }: { data: ITopPlayer[] }) {
  const session = useSession((state) => state.session)
  const [visibleCount, setVisibleCount] = useState(5)

  const visibleData = data.slice(0, visibleCount)

  const getWinRateColor = (rate: number) => {
    if (rate < 50) return 'text-white'
    if (rate >= 50 && rate < 60) return 'text-green-500'
    if (rate >= 60 && rate < 70) return 'text-blue-500'
    return 'text-purple-500'
  }

  return (
    <div className='w-full bg-[#393939] rounded-[8px] px-[150px] pb-14 pt-8 mb-[50px] max-xl:px-[50px] max-sm:px-[15px] max-sm:pb-[20px]'>
      <h2 className='text-3xl font-black text-white text-center mb-8 uppercase tracking-widest text-shadow-sm max-md:text-2xl'>
        Два Игрока
      </h2>
      <Table className='max-md:max-w-full'>
        <TableHeader>
          <TableRow className='bg-[#212121] border-none'>
            <TableHead className='min-w-[30px] p-2.5 text-white max-sm:w-[40px]'>
              №
            </TableHead>
            <TableHead className='min-w-[100px] p-2.5 text-white max-sm:w-[100px]'>
              Игрок
            </TableHead>
            <TableHead className='min-w-[80px] p-2.5 text-white'>
              Выиграл
            </TableHead>
            <TableHead className='min-w-[80px] p-2.5 text-white'>
              Проиграл
            </TableHead>
            <TableHead className='min-w-[100px] text-right p-2.5 text-white'>
              Процент побед
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-white'>
          {visibleData.length > 0 ? (
            <AnimatePresence initial={false}>
              {visibleData?.map((player, idx) => (
                <motion.tr
                  key={player._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className='border-b border-b-[#666666] font-bold hover:bg-muted/10'
                >
                  <TableCell className='font-medium p-2.5'>{idx + 1}.</TableCell>
                  <TableCell className='font-medium p-2.5 flex items-center gap-2.5'>
                    <div className='w-[28px] h-[28px] bg-white/10 rounded-full border border-[#F5D91F] flex items-center justify-center overflow-hidden shrink-0'>
                      {player.avatarUrl ? (
                        <img
                          src={`${(process.env.NEXT_PUBLIC_SERVER_URL || '').replace(/\/$/, '')}${player.avatarUrl}`}
                          alt={player.login}
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <User className='w-4 h-4 text-white/50' />
                      )}
                    </div>
                    <span className={cn('truncate whitespace-nowrap overflow-hidden max-w-[100px]', player.login === session?.login && 'text-green-500')}>
                      {player.login}
                    </span>
                  </TableCell>
                  <TableCell className='p-2.5 text-[#F5D91F]'>
                    {player.wins ?? 0}
                  </TableCell>
                  <TableCell className='p-2.5 text-[#EE3535]'>
                    {player.losses ?? 0}
                  </TableCell>
                  <TableCell className={`text-right font-bold p-2.5 ${getWinRateColor(player.winRate || 0)}`}>
                    {player.winRate ?? 0}%
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          ) : (
            <TableRow>
              <TableCell colSpan={5} className='text-center py-6 font-semibold'>
                Здесь пока пусто
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ShowMoreButton
        isVisible={data.length > visibleCount}
        handleClickAction={() => setVisibleCount((prev) => prev + 5)}
      />
    </div>
  )
}
