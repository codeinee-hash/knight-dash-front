import { GameRulesList } from '@/widgets/game-rules-list'
import { PagesLayout } from '@/shared/ui/pages-layout'
import { PageTitle } from '@/shared/ui/page-title'

export default function GameRulesPage() {
  return (
    <PagesLayout
      pageHeader={
        <PageTitle title='Правила игры' img='/images/Game-rules.svg' />
      }
      pageBody={<GameRulesList />}
    />
  )
}
