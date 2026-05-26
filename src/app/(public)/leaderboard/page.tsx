import { PageTitle } from '@/shared/ui/page-title'
import { leaderboardService } from '@/entities/leaderboard'
import { LeaderboardSection } from '@/widgets/leaderboard'
import { PageLayout } from '@/shared/ui/page-layout'

export const dynamic = 'force-dynamic'

export default async function LeaderboardPage() {
  const [soloData, multiplayerData] = await Promise.all([
    leaderboardService.getTopPlayers(),
    leaderboardService.getTopMultiplayerPlayers(),
  ])

  return (
    <PageLayout
      pageHeader={
        <PageTitle title='Таблица лидеров' img='/images/Leaderboard.svg' />
      }
      pageBody={<LeaderboardSection soloData={soloData} multiplayerData={multiplayerData} />}
    />
  )
}
