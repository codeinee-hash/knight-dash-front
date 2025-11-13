'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authService, ISignInForm } from '@/entities/auth'
import { APP_ROUTES } from '@/shared/config/routes.config'
import { loginSchema } from '../lib/zod.schema'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export function useSignIn() {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginOrEmail: '',
      password: '',
    },
  })

  const loginMutation = useMutation({
    mutationFn: (data: ISignInForm) => authService.auth('sign-in', data),
    onSuccess: () => router.push(APP_ROUTES.home()),
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'Ошибка при авторизации')
      }
    },
  })

  const onSubmit = (formData: ISignInForm) => {
    loginMutation.mutate(formData)
  }

  return {
    form,
    onSubmit,
    isPending: loginMutation.isPending,
  }
}
