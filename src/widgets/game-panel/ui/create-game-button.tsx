'use client'

import { Spinner } from '@/shared/ui/kit/spinner'
import { Button } from '@/shared/ui/kit/button'

export function CreateGameButton({
  handleClickAction,
  isPending,
}: {
  handleClickAction: () => void
  isPending: boolean
}) {
  return (
    <Button
      onClick={handleClickAction}
      disabled={isPending}
      className='w-full h-[44px] rounded-[8px] text-[#2C2E35] font-semibold text-base mb-3 disabled:bg-primary/80 cursor-pointer'
    >
      {isPending ? (
        <span className='flex gap-2'>
          <Spinner className='size-6 text-black' /> Загрузка
        </span>
      ) : (
        <span>Начать игру</span>
      )}
    </Button>
  )
}
