'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/kit/alert-dialog'
import { Button } from '@/shared/ui/kit/button'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/shared/config/routes.config'
import { IMultiplayerGameSession } from '@/entities/multiplayer-game/api/multiplayer-game.service'

export function MultiplayerResults({
  isGameOver,
  gameSession,
  currentUserId,
}: {
  isGameOver: boolean
  gameSession: IMultiplayerGameSession | null
  currentUserId?: string
}) {
  const router = useRouter()

  if (!gameSession) return null

  const isPlayer1 = currentUserId === gameSession.player1Id
  const myScore = isPlayer1 ? gameSession.player1Score : gameSession.player2Score
  const opponentScore = isPlayer1 ? gameSession.player2Score : gameSession.player1Score

  let resultTitle = 'Игра закончена'
  let resultColor = 'text-white'

  if (gameSession.winnerId) {
    if (gameSession.winnerId === currentUserId) {
      resultTitle = 'Вы победили! 🎉'
      resultColor = 'text-green-400'
    } else {
      resultTitle = 'Вы проиграли 😔'
      resultColor = 'text-red-400'
    }
  } else {
    resultTitle = 'Ничья 🤝'
    resultColor = 'text-yellow-400'
  }

  return (
    <AlertDialog open={isGameOver}>
      <AlertDialogContent className='p-7 bg-[#393939] border-none outline-none text-white'>
        <AlertDialogHeader className='flex flex-col items-center gap-2'>
          <AlertDialogTitle className={`text-center font-bold text-3xl mb-4 ${resultColor}`}>
            {resultTitle}
          </AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>

        <div className='flex justify-between items-center bg-[#252525] rounded-xl p-6 my-4 border border-white/5'>
          <div className='flex flex-col items-center gap-2'>
            <span className='text-white/60 text-sm'>Ваш счет</span>
            <span className='text-4xl font-bold text-white'>{myScore}</span>
          </div>
          <div className='h-16 w-px bg-white/10' />
          <div className='flex flex-col items-center gap-2'>
            <span className='text-white/60 text-sm'>Счет соперника</span>
            <span className='text-4xl font-bold text-white'>{opponentScore}</span>
          </div>
        </div>

        <AlertDialogFooter className='sm:justify-center'>
          <Button
            className='text-white/60 px-6 bg-[#202020] hover:bg-[#252525] cursor-pointer'
            onClick={() => router.push(APP_ROUTES.multiplayerGame())}
          >
            Выйти в меню
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
