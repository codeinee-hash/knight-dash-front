'use client'

import { GamePanel } from '@/widgets/game-panel'
import { PageTitle } from '@/shared/ui/page-title'
import { useCreateSoloGame } from '@/entities/solo-game'

export default function SoloGamePage() {
  const { create, isPending } = useCreateSoloGame()

  return (
    <div className='multi-container flex flex-col py-10 px-[15px] w-full mx-auto'>
      <PageTitle title='Один игрок' img='/images/Pictograms.svg' />
      <GamePanel onCreateGameAction={create} isPending={isPending} />
    </div>
  )
}
