import { PageTitle } from '@/shared/ui/page-title'
import { leaderboardService } from '@/entities/leaderboard'
import { LeaderboardSection } from '@/widgets/leaderboard'

export default async function LeaderboardPage() {
  const data = await leaderboardService.getTopPlayers()

  return (
    <div className='multi-container pt-10'>
      <PageTitle title='Таблица лидеров' img='/images/Leaderboard.svg' />
      <LeaderboardSection data={data} />
    </div>
  )
}
