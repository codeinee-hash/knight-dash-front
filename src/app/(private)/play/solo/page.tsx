'use client'

import { GamePanel } from '@/widgets/game-panel'
import { useCreateSoloGame } from '@/entities/solo-game'
import { PagesLayout } from '@/shared/ui/pages-layout'
import { PageTitle } from '@/shared/ui/page-title'

export default function SoloGamePage() {
  const { create, isPending } = useCreateSoloGame()

  return (
    <PagesLayout
      pageHeader={<PageTitle title='Один игрок' img='/images/Pictograms.svg' />}
      pageBody={<GamePanel onCreateGameAction={create} isPending={isPending} />}
    />
  )
}
