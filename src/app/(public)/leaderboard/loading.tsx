'use client'

import { Spinner } from '@/shared/ui/kit/spinner'

export default function Loading() {
  return (
    <div className='flex justify-center items-center h-[70vh] text-white'>
      <Spinner className='size-6 text-primary' />
      <p className='ml-4 text-lg font-semibold'>Загрузка таблицы лидеров...</p>
    </div>
  )
}
