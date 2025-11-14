import { GamePanel } from '@/widgets/game-panel'
import { PageTitle } from '@/shared/ui/page-title'

export default function SoloGamePage() {
  return (
    <div className='py-10 px-[15px] flex justify-center flex-col items-center gap-4 lg:px-0 lg:flex-row lg:justify-between lg:items-start lg:gap-10'>
      <div className='flex-1 flex justify-center w-full'>
        <div className='max-w-[600px] w-full'>
          <PageTitle title='Один игрок' img='/images/Pictograms.svg' />
          <div className='hidden lg:block'>Board</div>
        </div>
      </div>
      <GamePanel />
    </div>
  )
}
