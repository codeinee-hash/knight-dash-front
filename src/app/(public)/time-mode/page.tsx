import { PageTitle } from '@/shared/ui/page-title'
import { TimeModeList } from '@/widgets/time-mode-list'
import { PagesLayout } from '@/shared/ui/pages-layout'

export default function TimeModePage() {
  return (
    <PagesLayout
      pageHeader={
        <PageTitle title='Режим времени' img='/images/Time-mode.svg' />
      }
      pageBody={<TimeModeList />}
    />
  )
}
