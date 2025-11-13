import { PageTitle } from '@/shared/ui/page-title'
import { TimeModeList } from '@/widgets/time-mode-list'

export default function TimeModePage() {
  return (
    <div className='multi-container pt-10'>
      <PageTitle title='Режим времени' img='/images/Time-mode.svg' />
      <TimeModeList />
    </div>
  )
}
