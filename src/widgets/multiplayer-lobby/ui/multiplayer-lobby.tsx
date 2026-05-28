'use client'

import { Button } from '@/shared/ui/kit/button'
import { Copy, Check, Users } from 'lucide-react'
import { useState } from 'react'
import { RoomJoinedData } from '@/entities/multiplayer-game/lib/use-multiplayer-socket'
import { useSession } from '@/entities/auth'

interface Props {
  roomInfo: RoomJoinedData | null
  opponentJoined: boolean
  readyCount: number
  isReady: boolean
  handleReady: () => void
  isCreator?: boolean
  handleCancelGame?: () => void
}

export function MultiplayerLobby({
  roomInfo,
  opponentJoined,
  readyCount,
  isReady,
  handleReady,
  isCreator,
  handleCancelGame,
}: Props) {
  const [copied, setCopied] = useState(false)
  const { session } = useSession()

  const myLogin = session?.login || 'Игрок 1'
  const opponentLogin =
    (roomInfo?.player1Login === session?.login
      ? roomInfo?.player2Login
      : roomInfo?.player1Login) || 'Игрок 2'

  const copyRoomCode = () => {
    if (roomInfo?.roomCode) {
      navigator.clipboard.writeText(roomInfo.roomCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-full w-full max-w-lg mx-auto'>
      <div className='bg-[#393939] rounded-2xl p-8 w-full shadow-xl flex flex-col gap-6 items-center'>
        <Users className='w-16 h-16 text-primary' />
        <h2 className='text-2xl font-semibold text-white'>Ожидание игроков</h2>

        <div className='flex flex-col items-center gap-2 bg-[#252525] p-6 rounded-xl w-full border border-white/5'>
          <span className='text-white/60 text-sm'>Код комнаты</span>
          <div className='flex items-center gap-4'>
            <span className='text-4xl font-mono tracking-widest text-white font-bold'>
              {roomInfo?.roomCode || '...'}
            </span>
            <Button
              variant='ghost'
              size='icon'
              onClick={copyRoomCode}
              className='text-white/60 hover:text-white hover:bg-white/10'
            >
              {copied ? (
                <Check className='w-5 h-5 text-green-500' />
              ) : (
                <Copy className='w-5 h-5' />
              )}
            </Button>
          </div>
          <span className='text-xs text-white/40 mt-2 text-center'>
            Отправьте этот код второму игроку, чтобы он смог присоединиться
          </span>
        </div>

        <div className='w-full flex flex-col gap-4'>
          <div className='flex justify-between items-center p-4 rounded-lg bg-white/5'>
            <span className='text-white'>{myLogin} (Вы)</span>
            <span
              className={
                isReady
                  ? 'text-green-400 font-medium'
                  : 'text-yellow-400 font-medium'
              }
            >
              {isReady ? 'Готов' : 'Ожидает'}
            </span>
          </div>

          <div className='flex justify-between items-center p-4 rounded-lg bg-white/5'>
            <span className='text-white'>
              {opponentJoined ? opponentLogin : 'Ожидание подключения...'}
            </span>
            {opponentJoined ? (
              <span
                className={
                  readyCount > (isReady ? 1 : 0)
                    ? 'text-green-400 font-medium'
                    : 'text-yellow-400 font-medium'
                }
              >
                {readyCount > (isReady ? 1 : 0) ? 'Готов' : 'Выбирает...'}
              </span>
            ) : (
              <SpinnerIcon className='w-5 h-5 text-white/40 animate-spin' />
            )}
          </div>
        </div>

        <div className='w-full flex flex-col gap-3 mt-4'>
          <Button
            className='w-full text-primary/80 bg-[#252525] hover:bg-primary/20 py-6 text-lg'
            onClick={handleReady}
            disabled={isReady || !opponentJoined}
          >
            {isReady ? 'Ожидаем второго игрока...' : 'Я готов!'}
          </Button>

          {isCreator && handleCancelGame && (
            <Button
              variant='destructive'
              className='w-full py-6 text-lg font-bold bg-red-400/10! text-red-500 hover:bg-red-500/20'
              onClick={handleCancelGame}
            >
              Отменить игру
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function SpinnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      ></circle>
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      ></path>
    </svg>
  )
}
