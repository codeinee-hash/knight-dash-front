'use client'

import { GamePanel } from '@/widgets/game-panel'
import { useCreateSoloGame } from '@/entities/solo-game'
import { PageLayout } from '@/shared/ui/page-layout'
import { PageTitle } from '@/shared/ui/page-title'
import { Suspense } from 'react'

export default function SoloGamePage() {
  const { create, isPending } = useCreateSoloGame()

  return (
    <PageLayout
      pageHeader={<PageTitle title='Один игрок' img='/images/Pictograms.svg' />}
      pageBody={
        <Suspense fallback={<div>Loading...</div>}>
          <GamePanel onCreateGameAction={create} isPending={isPending} />
        </Suspense>
      }
    />
  )
}
