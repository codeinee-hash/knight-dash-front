import { PageTitle } from '@/shared/ui/page-title'
import { GameRulesList } from '@/widgets/game-rules-list'

export default function GameRulesPage() {
  return (
    <div className='multi-container pt-10'>
      <PageTitle title='Правила игры' img='/images/Game-rules.svg' />
      <GameRulesList />
    </div>
  )
}
