import { TimeModeList } from '@/widgets/time-mode-list'
import { PageTitle } from '@/shared/ui/page-title'
import { PageLayout } from '@/shared/ui/page-layout'

export default function TimeModePage() {
  return (
    <PageLayout
      pageHeader={
        <PageTitle title='Режим времени' img='/images/Time-mode.svg' />
      }
      pageBody={<TimeModeList />}
    />
  )
}
