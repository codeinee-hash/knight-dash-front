import { PageTitle } from '@/shared/ui/page-title'
import { PageLayout } from '@/shared/ui/page-layout'

export default function ProfilePage() {
  return (
    <PageLayout
      pageHeader={<PageTitle title='Профиль' img='images/Settings.svg' />}
      pageBody={<></>}
    />
  )
}
