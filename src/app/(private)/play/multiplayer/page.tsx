import { PageTitle } from '@/shared/ui/page-title'
import { GamePanel } from '@/widgets/game-panel'

export default function MultiplayerGamePage() {
  return (
    <div className='multi-container flex flex-col py-10 px-[15px] w-full mx-auto'>
      <PageTitle title='Два игрока' img='/images/Duel.svg' />
      <GamePanel />
    </div>
  )
}
