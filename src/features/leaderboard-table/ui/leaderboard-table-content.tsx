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
import { User } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

export function LeaderboardTableContent({ data }: { data: ITopPlayer[] }) {
  const session = useSession((state) => state.session)

  return (
    <Table className='max-md:max-w-full'>
      <TableHeader>
        <TableRow className='bg-[#212121] border-none'>
          <TableHead className='min-w-[30px] p-2.5 text-white max-sm:w-[40px]'>
            №
          </TableHead>
          <TableHead className='min-w-[100px] p-2.5 text-white max-sm:w-[100px]'>
            Игрок
          </TableHead>
          <TableHead className='min-w-[100px] p-2.5 text-white text-end max-sm:w-[80px]'>
            Рекорд
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='text-white'>
        {data.length > 0 ? (
          <AnimatePresence initial={false}>
            {data?.map((player, idx) => (
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
                  <span
                    className={cn(
                      'truncate whitespace-nowrap overflow-hidden max-w-[100px]',
                      player.login === session?.login && 'text-green-500',
                    )}
                  >
                    {player.login}
                  </span>
                </TableCell>
                <TableCell className='p-2.5 text-end'>
                  {player.totalScore ?? 0}
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
  )
}
