import { PageTitle } from '@/shared/ui/page-title'
import { leaderboardService } from '@/entities/leaderboard'
import { LeaderboardSection } from '@/widgets/leaderboard'
import { PagesLayout } from '@/shared/ui/pages-layout'

export default async function LeaderboardPage() {
  const data = await leaderboardService.getTopPlayers()

  return (
    <PagesLayout
      pageHeader={
        <PageTitle title='Таблица лидеров' img='/images/Leaderboard.svg' />
      }
      pageBody={<LeaderboardSection data={data} />}
    />
  )
}
