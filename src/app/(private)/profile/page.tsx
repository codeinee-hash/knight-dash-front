'use client'

import { useEffect, useState } from 'react'
import { PageTitle } from '@/shared/ui/page-title'
import { PageLayout } from '@/shared/ui/page-layout'
import { IProfileResponse } from '@/entities/profile'
import { profileService } from '@/entities/profile/api/profile.service'
import { ProfileHeader } from '@/widgets/profile/ui/profile-header'
import { ProfileStats } from '@/widgets/profile/ui/profile-stats'
import { ProfileRecentGames } from '@/widgets/profile/ui/profile-recent-games'
import { Loader2 } from 'lucide-react'

export default function ProfilePage() {
  const [data, setData] = useState<IProfileResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const profile = await profileService.getProfile()
      setData(profile)
    } catch (err: any) {
      setError('Не удалось загрузить профиль')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  let content = null

  if (loading) {
    content = (
      <div className='flex justify-center items-center h-64'>
        <Loader2 className='w-8 h-8 text-primary animate-spin' />
      </div>
    )
  } else if (error) {
    content = (
      <div className='text-center p-8 bg-red-500/10 text-red-500 rounded-2xl'>
        {error}
      </div>
    )
  } else if (data) {
    content = (
      <div className='flex flex-col gap-8 max-w-4xl mx-auto'>
        <ProfileHeader player={data.player} onUpdate={fetchProfile} />
        
        <div className='flex flex-col gap-4'>
          <h3 className='text-xl font-bold text-white'>Статистика (Два игрока)</h3>
          <ProfileStats stats={data.stats} />
        </div>

        <div className='flex flex-col gap-4'>
          <h3 className='text-xl font-bold text-white'>Недавние игры</h3>
          <ProfileRecentGames games={data.recentGames} currentUserId={data.player._id} />
        </div>
      </div>
    )
  }

  return (
    <PageLayout
      pageHeader={<PageTitle title='Профиль' img='/images/Settings.svg' />}
      pageBody={content}
    />
  )
}
