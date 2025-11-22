import { PageTitle } from '@/shared/ui/page-title'
import { GamePanel } from '@/widgets/game-panel'
import { PagesLayout } from '@/shared/ui/pages-layout'

export default function MultiplayerGamePage() {
  return (
    <PagesLayout
      pageHeader={<PageTitle title='Два игрока' img='/images/Duel.svg' />}
      pageBody={<GamePanel />}
    />
  )
}
