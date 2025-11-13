'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/kit/table'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useSession } from '@/entities/auth'
import { ITopPlayer } from '@/entities/leaderboard'

export function LeaderboardTableContent({ data }: { data: ITopPlayer[] }) {
  const session = useSession((state) => state.session)

  return (
    <Table className='max-md:max-w-[600px]'>
      <TableHeader>
        <TableRow className='bg-[#212121] border-none'>
          <TableHead className='min-w-[30px] p-2.5 text-white max-sm:w-[40px]'>
            №
          </TableHead>
          <TableHead className='min-w-[100px] p-2.5 text-white max-sm:w-[100px]'>
            Игрок
          </TableHead>
          <TableHead className='min-w-[100px] p-2.5 text-white max-sm:w-[80px]'>
            Рекорд
          </TableHead>
          <TableHead className='min-w-[100px] p-2.5 text-white hidden lg:table-cell'>
            Выиграл
          </TableHead>
          <TableHead className='min-w-[100px] text-right p-2.5 text-white hidden lg:table-cell'>
            Проиграл
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='text-white'>
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
                <div className='w-[28px] h-[28px] bg-white rounded-full border border-[#F5D91F] flex items-center justify-center'>
                  <Image
                    src={'/images/yellow-logo.svg'}
                    alt={player.login}
                    width={13.5}
                    height={18}
                  />
                </div>
                <span className='truncate whitespace-nowrap overflow-hidden max-w-[100px]'>
                  {player.login} {player.login === session?.login && '⭐'}
                </span>
              </TableCell>
              <TableCell className='p-2.5'>{player.totalScore ?? 0}</TableCell>
              <TableCell className='p-2.5 text-[#F5D91F] hidden lg:table-cell'>
                0
              </TableCell>
              <TableCell className='text-right text-[#EE3535] p-2.5 hidden lg:table-cell'>
                0
              </TableCell>
            </motion.tr>
          ))}
        </AnimatePresence>
      </TableBody>
    </Table>
  )
}
