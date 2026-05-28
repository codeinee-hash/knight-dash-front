import { IRecentGame } from '@/entities/profile'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/kit/table'

interface Props {
  games: IRecentGame[]
  currentUserId: string
}

export function ProfileRecentGames({ games, currentUserId }: Props) {
  if (!games.length) {
    return (
      <div className='bg-[#252525] p-8 rounded-2xl border border-white/5 text-center'>
        <p className='text-white/50'>У вас еще нет сыгранных игр</p>
      </div>
    )
  }

  return (
    <div className='bg-[#252525] rounded-2xl border border-white/5 overflow-hidden'>
      <Table>
        <TableHeader className='bg-white/5'>
          <TableRow className='hover:bg-transparent border-white/10'>
            <TableHead className='text-white/60'>Дата</TableHead>
            <TableHead className='text-white/60'>Соперник</TableHead>
            <TableHead className='text-white/60'>Счет</TableHead>
            <TableHead className='text-white/60 text-right'>
              Результат
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => {
            const isPlayer1 =
              typeof game.player1Id !== 'string' &&
              game.player1Id._id === currentUserId

            const opponent = isPlayer1 ? game.player2Id : game.player1Id
            const opponentLogin =
              typeof opponent !== 'string' ? opponent?.login : 'Неизвестно'

            const myScore = isPlayer1 ? game.player1Score : game.player2Score
            const opponentScore = isPlayer1
              ? game.player2Score
              : game.player1Score

            let resultText = 'Ничья'
            let resultColor = 'text-gray-400'

            if (game.winnerId) {
              if (game.winnerId === currentUserId) {
                resultText = 'Победа'
                resultColor = 'text-green-500'
              } else {
                resultText = 'Поражение'
                resultColor = 'text-red-500'
              }
            }

            return (
              <TableRow
                key={game._id}
                className='border-white/5 hover:bg-white/5 transition-colors'
              >
                <TableCell className='text-white font-medium'>
                  {new Date(game.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className='text-white/80'>{opponentLogin}</TableCell>
                <TableCell className='text-white/80'>
                  {myScore} : {opponentScore}
                </TableCell>
                <TableCell className={`text-right font-medium ${resultColor}`}>
                  {resultText}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
