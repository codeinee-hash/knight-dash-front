import { useQuery } from '@tanstack/react-query'
import { soloGameService } from '../services/solo-game.service'

export function useSoloGameSession(gameId: string) {
  const { data: soloGameSession } = useQuery({
    queryKey: ['solo-game-session', gameId],
    queryFn: () => soloGameService.getGameSession(gameId),
    enabled: !!gameId,
    staleTime: Infinity,
  })

  return { soloGameSession }
}
