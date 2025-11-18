'use client'

import { useMutation } from '@tanstack/react-query'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { soloGameService } from '../services/solo-game.service'
import { APP_ROUTES } from '@/shared/config/routes.config'
import { AxiosError } from 'axios'

export function useCreateSoloGame() {
  const router = useRouter()
  const abortControllerRef = useRef<AbortController | null>(null)

  const createMutation = useMutation({
    mutationFn: (timeMode: number) => soloGameService.createGame(timeMode),
    onSuccess: (data) => router.push(APP_ROUTES.soloGameRoom(data._id)),
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.name === 'CanceledError') toast.info('Игра отменена')
        else if (err.status === 401)
          toast.info('Войдите в аккаунт, чтобы начать игру')
        else toast.error('Ошибка при создании игры')
      }

      router.push(APP_ROUTES.soloGame())
    },
  })

  const cancel = () => {
    abortControllerRef.current?.abort()
  }

  return {
    create: createMutation.mutate,
    cancel,
    isPending: createMutation.isPending,
  }
}
