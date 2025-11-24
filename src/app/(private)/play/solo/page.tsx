'use client'

import { GamePanel } from '@/widgets/game-panel'
import { useCreateSoloGame } from '@/entities/solo-game'
import { PageLayout } from '@/shared/ui/page-layout'
import { PageTitle } from '@/shared/ui/page-title'

export default function SoloGamePage() {
  const { create, isPending } = useCreateSoloGame()

  return (
    <PageLayout
      pageHeader={<PageTitle title='Один игрок' img='/images/Pictograms.svg' />}
      pageBody={<GamePanel onCreateGameAction={create} isPending={isPending} />}
    />
  )
}
