import { PageTitle } from '@/shared/ui/page-title'
import { GamePanel } from '@/widgets/game-panel'
import { PageLayout } from '@/shared/ui/page-layout'

export default function MultiplayerGamePage() {
  return (
    <PageLayout
      pageHeader={<PageTitle title='Два игрока' img='/images/Duel.svg' />}
      pageBody={<GamePanel />}
    />
  )
}
