import { IProfileStats } from '@/entities/profile'
import { Trophy, Swords, Target } from 'lucide-react'

export function ProfileStats({ stats }: { stats: IProfileStats }) {
  const getWinRateColor = (rate: number) => {
    if (rate < 50) return 'text-white'
    if (rate >= 50 && rate < 60) return 'text-green-500'
    if (rate >= 60 && rate < 70) return 'text-blue-500'
    return 'text-purple-500'
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <div className='bg-[#252525] p-5 rounded-2xl border border-white/5 flex items-center gap-4'>
        <div className='p-3 bg-blue-500/10 rounded-xl text-blue-500'>
          <Swords className='w-6 h-6' />
        </div>
        <div>
          <p className='text-sm text-white/50'>Сыграно игр</p>
          <p className='text-2xl font-bold text-white'>{stats.totalGames}</p>
        </div>
      </div>

      <div className='bg-[#252525] p-5 rounded-2xl border border-white/5 flex items-center gap-4'>
        <div className='p-3 bg-green-500/10 rounded-xl text-green-500'>
          <Trophy className='w-6 h-6' />
        </div>
        <div>
          <p className='text-sm text-white/50'>Процент побед</p>
          <p className={`text-2xl font-bold ${getWinRateColor(stats.winRate)}`}>{stats.winRate}%</p>
        </div>
      </div>

      <div className='bg-[#252525] p-5 rounded-2xl border border-white/5 flex items-center gap-4'>
        <div className='p-3 bg-yellow-500/10 rounded-xl text-yellow-500'>
          <Target className='w-6 h-6' />
        </div>
        <div>
          <p className='text-sm text-white/50'>Средний счет</p>
          <p className='text-2xl font-bold text-white'>{stats.avgScore}</p>
        </div>
      </div>
    </div>
  )
}
