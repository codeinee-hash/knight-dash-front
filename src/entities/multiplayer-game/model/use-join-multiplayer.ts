import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/shared/config/routes.config'
import { multiplayerGameService } from '../api/multiplayer-game.service'
import { toast } from 'sonner'

export function useJoinMultiplayerGame() {
  const router = useRouter()

  const { mutate: join, isPending } = useMutation({
    mutationFn: (roomCode: string) => multiplayerGameService.joinGame(roomCode),
    onSuccess: (data) => {
      router.push(APP_ROUTES.multiplayerGameRoom(data.gameId))
    },
    onError: (error: Error) => {
      const axiosError = error as import('axios').AxiosError<{ message: string }>
      const message = axiosError?.response?.data?.message || 'Не удалось присоединиться к игре'
      toast.error(message)
    },
  })

  return { join, isPending }
}
