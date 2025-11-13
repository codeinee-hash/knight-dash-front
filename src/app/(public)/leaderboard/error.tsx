'use client'

import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/shared/config/routes.config'
import { Button } from '@/shared/ui/kit/button'

export default function Error() {
  const router = useRouter()

  return (
    <div className='flex flex-col items-center justify-center h-[60vh] text-white'>
      <h2 className='text-3xl font-semibold mb-4'>Что-то пошло не так 😔</h2>
      <p className='mb-6'>Ошибка при загрузке данных</p>
      <Button
        onClick={() => router.push(APP_ROUTES.home())}
        className='px-4 py-2 text-white rounded hover:bg-primary/80 font-semibold transition-colors'
      >
        На главную
      </Button>
    </div>
  )
}
