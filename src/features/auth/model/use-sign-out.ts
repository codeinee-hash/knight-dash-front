'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { APP_ROUTES } from '@/shared/config/routes.config'
import { authService } from '@/entities/auth'

export function useSignOut() {
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: async () => router.push(APP_ROUTES.login()),
  })

  return {
    signOut: mutateAsync,
    isPending,
  }
}
