import { GameRulesList } from '@/widgets/game-rules-list'
import { PageLayout } from '@/shared/ui/page-layout'
import { PageTitle } from '@/shared/ui/page-title'

export default function GameRulesPage() {
  return (
    <PageLayout
      pageHeader={
        <PageTitle title='Правила игры' img='/images/Game-rules.svg' />
      }
      pageBody={<GameRulesList />}
    />
  )
}
