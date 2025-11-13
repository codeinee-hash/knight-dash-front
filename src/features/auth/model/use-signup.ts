'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authService, ISignUpForm } from '@/entities/auth'
import { APP_ROUTES } from '@/shared/config/routes.config'
import { registerSchema } from '@/features/auth/lib/zod.schema'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export function useSignUp() {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      login: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  })

  const registerMutation = useMutation({
    mutationFn: (data: ISignUpForm) => authService.auth('sign-up', data),
    onSuccess: () => router.push(APP_ROUTES.home()),
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || `Ошибка при авторизации:`)
      }
    },
  })

  const onSubmit = (formData: ISignUpForm & { passwordConfirm: string }) => {
    registerMutation.mutate({
      login: formData.login,
      email: formData.email,
      password: formData.password,
    })
  }

  return {
    form,
    onSubmit,
    isPending: registerMutation.isPending,
  }
}
