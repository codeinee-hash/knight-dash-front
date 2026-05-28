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
import { getTimeModeImage } from '@/shared/lib/helpers'
import Image from 'next/image'
import { ISoloGameSession } from '@/entities/solo-game'
import { ScoreboardList } from '@/widgets/game-panel'
import { Button } from '@/shared/ui/kit/button'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/shared/config/routes.config'
import { Spinner } from '@/shared/ui/kit/spinner'

interface Props {
  isGameOver: boolean
  isCreatingGame: boolean
  gameSession: ISoloGameSession
  onRestartGameAction: (timeMode: number) => void
}

export function SoloGameResults({
  isGameOver,
  onRestartGameAction,
  isCreatingGame,
  gameSession: soloGameSession,
}: Props) {
  const router = useRouter()
  const timeModeImage = getTimeModeImage(Number(soloGameSession?.timeMode))

  return (
    <AlertDialog open={isGameOver}>
      <AlertDialogContent className='p-7 bg-[#393939] border-none outline-none text-white'>
        <AlertDialogHeader className='flex flex-col items-center gap-2'>
          <Image src={timeModeImage} alt='time mode' width={70} height={70} />
          <AlertDialogTitle className='text-center font-semibold text-2xl mb-4'>
            Игра закончена
          </AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>

        <ScoreboardList gameSession={soloGameSession!} />

        <AlertDialogFooter>
          <Button
            className='text-white/60 px-3 bg-[#202020] hover:bg-[#252525] cursor-pointer'
            onClick={() => router.push(APP_ROUTES.soloGame())}
          >
            На главную
          </Button>
          <AlertDialogAction
            disabled={isCreatingGame}
            onClick={() =>
              onRestartGameAction(Number(soloGameSession?.timeMode))
            }
            className='text-primary/80 px-3 bg-[#252525] hover:bg-primary/20 cursor-pointer'
          >
            {isCreatingGame ? (
              <span className='flex gap-2'>
                <Spinner className='size-6 text-primary' /> Загрузка
              </span>
            ) : (
              <span>Начать снова</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
