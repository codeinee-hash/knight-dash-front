import { User } from 'lucide-react'

interface Props {
  username: string
  avatarUrl?: string | null
}

export function PlayerInfo({ username, avatarUrl }: Props) {
  const getAvatarUrl = (path?: string | null) =>
    path
      ? `${(process.env.NEXT_PUBLIC_SERVER_URL || '').replace(/\/$/, '')}${path}`
      : null

  return (
    <div className='rounded bg-[#212121] p-2 mt-4 flex items-center gap-2.5'>
      <div className='relative w-[28px] h-[28px] bg-white/10 rounded-full border border-primary flex items-center justify-center overflow-hidden shrink-0'>
        {avatarUrl ? (
          <img
            src={getAvatarUrl(avatarUrl)!}
            alt='player avatar'
            className='w-full h-full object-cover'
          />
        ) : (
          <User className='w-4 h-4 text-white/50' />
        )}
      </div>
      <span className='truncate text-white text-sm font-medium overflow-hidden text-ellipsis max-w-[200px]'>
        {username}
      </span>
    </div>
  )
}
