import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/shared/config/routes.config'
import { multiplayerGameService } from '../api/multiplayer-game.service'
import { toast } from 'sonner'

export function useCreateMultiplayerGame() {
  const router = useRouter()

  const { mutate: create, isPending } = useMutation({
    mutationFn: (timeMode: number) => multiplayerGameService.createGame(timeMode),
    onSuccess: (data) => {
      router.push(APP_ROUTES.multiplayerGameRoom(data.gameId))
    },
    onError: () => {
      toast.error('Не удалось создать мультиплеерную игру')
    },
  })

  return { create, isPending }
}
