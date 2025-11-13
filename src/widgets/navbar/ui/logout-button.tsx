'use client'

import { LogOut } from 'lucide-react'
import { useSignOut } from '@/features/auth'
import { ConfirmDialog } from '@/shared/ui/confirm-dialog'

export function LogoutButton() {
  const { signOut, isPending } = useSignOut()

  return (
    <ConfirmDialog
      onConfirm={() => signOut()}
      title='Выход из аккаунта'
      description='Вы действительно хотите выйти? Вам нужно будет снова войти, чтобы продолжить.'
      confirmText='Выйти'
      actionDisabled={isPending}
      trigger={
        <div className='w-full py-3 px-6 rounded text-base font-medium flex items-center gap-2 text-white cursor-pointer active:translate-y-[1px] hover:bg-destructive/5 hover:text-destructive transition-colors'>
          <LogOut />
          Выйти
        </div>
      }
    />
  )
}
