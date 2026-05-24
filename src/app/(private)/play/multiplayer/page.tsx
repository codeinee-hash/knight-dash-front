import { PageTitle } from '@/shared/ui/page-title'
import { MultiplayerPanel } from '@/widgets/multiplayer-panel/ui/multiplayer-panel'
import { PageLayout } from '@/shared/ui/page-layout'
import { Suspense } from 'react'

export default function MultiplayerGamePage() {
  return (
    <PageLayout
      pageHeader={<PageTitle title='Два игрока' img='/images/Duel.svg' />}
      pageBody={
        <Suspense fallback={<div>Loading...</div>}>
          <MultiplayerPanel />
        </Suspense>
      }
    />
  )
}
