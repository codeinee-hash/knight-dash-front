'use client'

import { GamePanel } from '@/widgets/game-panel'
import { PageTitle } from '@/shared/ui/page-title'

export default function SoloGamePage() {
  return (
    <div className='multi-container flex flex-col py-10 px-[15px] w-full mx-auto'>
      <PageTitle title='Один игрок' img='/images/Pictograms.svg' />
      <GamePanel />
    </div>
  )
}
