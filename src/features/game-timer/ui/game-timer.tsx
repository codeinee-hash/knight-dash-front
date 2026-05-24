'use client'

import { useEffect, useState } from 'react'
import { formatTime } from '@/shared/lib/helpers'

export function GameTimer({
  initialSeconds,
  onEndAction,
  isActive = true,
}: {
  initialSeconds: number
  onEndAction: () => void
  isActive?: boolean
}) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)

  useEffect(() => {
    setTimeLeft(initialSeconds)
  }, [initialSeconds])

  // Отдельный эффект для отсчёта
  useEffect(() => {
    if (!isActive) return
    if (timeLeft <= 0) {
      onEndAction?.()
      return
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft, onEndAction])

  return (
    <div className='w-[120px] h-[44px] rounded border border-primary flex items-center justify-center font-semibold bg-[#393939] text-white shadow-[0_0_6px_2px_#f5d91f]'>
      {formatTime(timeLeft)}
    </div>
  )
}
