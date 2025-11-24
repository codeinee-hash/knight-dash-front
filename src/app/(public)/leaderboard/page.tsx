import { PageTitle } from '@/shared/ui/page-title'
import { leaderboardService } from '@/entities/leaderboard'
import { LeaderboardSection } from '@/widgets/leaderboard'
import { PageLayout } from '@/shared/ui/page-layout'

export default async function LeaderboardPage() {
  const data = await leaderboardService.getTopPlayers()

  return (
    <PageLayout
      pageHeader={
        <PageTitle title='Таблица лидеров' img='/images/Leaderboard.svg' />
      }
      pageBody={<LeaderboardSection data={data} />}
    />
  )
}
