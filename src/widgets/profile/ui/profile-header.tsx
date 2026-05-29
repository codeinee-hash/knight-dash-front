'use client'

import { useRef, useState } from 'react'
import { Edit2, Loader2, Camera, User } from 'lucide-react'
import { IProfilePlayer } from '@/entities/profile'
import { profileService } from '@/entities/profile/api/profile.service'
import { useSession } from '@/entities/auth'
import { EditLoginDialog } from './edit-login-dialog'

interface Props {
  player: IProfilePlayer
  onUpdate: () => void
}

export function ProfileHeader({ player, onUpdate }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setSession } = useSession()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      await profileService.uploadAvatar(file)
      onUpdate()
    } catch (error) {
      console.error('Failed to upload avatar:', error)
      alert('Ошибка при загрузке аватара')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className='flex flex-col md:flex-row items-center gap-6 bg-[#252525] p-6 rounded-2xl border border-white/5'>
      <div className='relative group'>
        <div className='relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 bg-[#393939] flex items-center justify-center'>
          {player.avatarUrl ? (
            <img
              src={`${(process.env.NEXT_PUBLIC_SERVER_URL || '').replace(/\/$/, '')}${player.avatarUrl}`}
              alt='Avatar'
              className='w-full h-full object-cover'
            />
          ) : (
            <User className='w-12 h-12 text-white/40' />
          )}
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className='absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-100'
        >
          {isUploading ? (
            <Loader2 className='w-6 h-6 text-white animate-spin' />
          ) : (
            <Camera className='w-6 h-6 text-white' />
          )}
        </button>
        <input
          type='file'
          ref={fileInputRef}
          className='hidden'
          accept='image/png, image/jpeg, image/webp'
          onChange={handleFileChange}
        />
      </div>

      <div className='flex flex-col items-center md:items-start'>
        <div className='flex items-center gap-3'>
          <h2 className='text-2xl font-bold text-white'>{player.login}</h2>
          <button
            onClick={() => setIsEditDialogOpen(true)}
            className='text-white/40 hover:text-primary transition-colors'
          >
            <Edit2 className='w-4 h-4' />
          </button>
        </div>
        <span className='text-white/60'>{player.email}</span>
      </div>

      <EditLoginDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        currentLogin={player.login}
        onSuccess={() => {
          setSession() // Refresh token
          onUpdate() // Refresh profile
        }}
      />
    </div>
  )
}
