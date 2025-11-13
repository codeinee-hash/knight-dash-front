'use client'

import { ReactNode, useState } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/shared/ui/kit/alert-dialog'

interface Props {
  trigger: ReactNode
  onConfirm: () => void
  confirmText: string
  title: string
  description: string
  actionDisabled?: boolean
}

export function ConfirmDialog({
  trigger,
  onConfirm,
  actionDisabled,
  title,
  description,
  confirmText,
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className='p-7! bg-[#393939] border-none text-white'>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription className='text-white/80'>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setOpen(false)}
              className='text-white hover:text-white/70 px-3'
            >
              Отмена
            </AlertDialogCancel>
            <AlertDialogAction
              className='text-destructive px-3 border hover:bg-destructive/10!'
              style={{ backgroundColor: '#393939' }}
              disabled={actionDisabled}
              onClick={() => {
                setOpen(false)
                onConfirm()
              }}
            >
              {confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
