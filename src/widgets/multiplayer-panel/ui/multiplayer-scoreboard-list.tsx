import { IMultiplayerGameSession } from '@/entities/multiplayer-game/api/multiplayer-game.service'
import { User } from 'lucide-react'

interface Props {
  gameSession?: IMultiplayerGameSession
  player1Login?: string
  player2Login?: string
  player1Avatar?: string
  player2Avatar?: string
}

export function MultiplayerScoreboardList({
  gameSession,
  player1Login = 'Игрок 1',
  player2Login = 'Игрок 2',
  player1Avatar,
  player2Avatar,
}: Props) {
  const getAvatarUrl = (path?: string) =>
    path
      ? `${(process.env.NEXT_PUBLIC_SERVER_URL || '').replace(/\/$/, '')}${path}`
      : null

  return (
    <div className='flex flex-row max-[510px]:gap-2 gap-6 pt-2 lg:pt-5 lg:flex-col'>
      <div className='flex-1 flex flex-col gap-2'>
        <div className='flex items-center gap-3 mb-2 max-[510px]:mb-0 max-[510px]:gap-2'>
          <div className='relative w-8 h-8 max-[510px]:w-6 max-[510px]:h-6 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shadow-inner border border-white/20 shrink-0'>
            {player1Avatar ? (
              <img
                src={getAvatarUrl(player1Avatar)!}
                alt='Player 1 Avatar'
                className='w-full h-full object-cover'
              />
            ) : (
              <User className='w-5 h-5 max-[510px]:w-4 max-[510px]:h-4 text-white/50' />
            )}
            <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center p-[2px] shadow-sm'>
              <img
                src='/images/white-knight.svg'
                alt='white knight'
                className='w-full h-full object-contain'
              />
            </div>
          </div>
          <h4 className='text-base max-[510px]:text-sm text-white font-bold truncate max-w-[100px]'>
            {player1Login}
          </h4>
        </div>
        <div className='flex items-center justify-between bg-[#252525] p-3 max-[510px]:p-2 rounded-xl border border-white/5'>
          <span className='text-white/60 max-[510px]:text-xs'>Счет:</span>
          <span className='text-xl max-[510px]:text-lg font-bold text-white'>
            {gameSession?.player1Score || 0}
          </span>
        </div>
      </div>

      <div className='flex-1 flex flex-col gap-2'>
        <div className='flex items-center gap-3 mb-2 max-[510px]:mb-0 max-[510px]:gap-2'>
          <div className='relative w-8 h-8 max-[510px]:w-6 max-[510px]:h-6 rounded-full overflow-hidden bg-[#111] flex items-center justify-center shadow-inner border border-white/20 shrink-0'>
            {player2Avatar ? (
              <img
                src={getAvatarUrl(player2Avatar)!}
                alt='Player 2 Avatar'
                className='w-full h-full object-cover'
              />
            ) : (
              <User className='w-5 h-5 max-[510px]:w-4 max-[510px]:h-4 text-white/50' />
            )}
            <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-[#111] rounded-full flex items-center justify-center p-[2px] shadow-sm border border-white/20'>
              <img
                src='/images/dark-knight.svg'
                alt='black knight'
                className='w-full h-full object-contain'
              />
            </div>
          </div>
          <h4 className='text-base max-[510px]:text-sm text-white font-bold truncate max-w-[100px]'>
            {player2Login}
          </h4>
        </div>
        <div className='flex items-center justify-between bg-[#252525] p-3 max-[510px]:p-2 rounded-xl border border-white/5'>
          <span className='text-white/60 max-[510px]:text-xs'>Счет:</span>
          <span className='text-xl max-[510px]:text-lg font-bold text-white'>
            {gameSession?.player2Score || 0}
          </span>
        </div>
      </div>
    </div>
  )
}
