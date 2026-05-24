'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/kit/dialog'
import { Button } from '@/shared/ui/kit/button'
import { Input } from '@/shared/ui/kit/input'
import { Loader2 } from 'lucide-react'
import { profileService } from '@/entities/profile/api/profile.service'

interface Props {
  isOpen: boolean
  onClose: () => void
  currentLogin: string
  onSuccess: () => void
}

export function EditLoginDialog({ isOpen, onClose, currentLogin, onSuccess }: Props) {
  const [login, setLogin] = useState(currentLogin)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (login === currentLogin) {
      onClose()
      return
    }

    if (login.length < 3) {
      setError('Логин должен содержать минимум 3 символа')
      return
    }

    setIsLoading(true)
    setError('')
    try {
      await profileService.updateLogin(login)
      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при обновлении логина')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md bg-[#252525] border-white/5'>
        <DialogHeader>
          <DialogTitle className='text-white'>Изменить никнейм</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
          <div className='flex flex-col gap-2'>
            <Input
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder='Новый никнейм'
              className='bg-[#393939] border-white/10 text-white placeholder:text-white/40'
              disabled={isLoading}
            />
            {error && <span className='text-red-400 text-sm'>{error}</span>}
          </div>

          <div className='flex justify-end gap-3 mt-4'>
            <Button
              type='button'
              variant='ghost'
              onClick={onClose}
              disabled={isLoading}
              className='text-white/60 hover:text-white hover:bg-white/5'
            >
              Отмена
            </Button>
            <Button
              type='submit'
              disabled={isLoading}
              className='bg-primary text-black hover:bg-primary/90'
            >
              {isLoading ? <Loader2 className='w-4 h-4 animate-spin mr-2' /> : null}
              Сохранить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
