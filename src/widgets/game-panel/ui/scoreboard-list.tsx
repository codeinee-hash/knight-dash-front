import { ISoloGameSession } from '@/entities/solo-game'
import { ScoreboardItem } from './scoreboard-item'
import { coinConfig } from '../const/constants'

export function ScoreboardList({
  gameSession,
}: {
  gameSession: ISoloGameSession
}) {
  return (
    <>
      <div className='flex flex-col gap-2 text-white pb-5 border-b border-b-[#666666]'>
        {coinConfig.map((coin) => (
          <ScoreboardItem
            key={coin.value}
            value={gameSession ? gameSession[coin.scoreKey] * coin.value : 0}
            logo={coin.logo}
            label={coin.label}
          />
        ))}
      </div>

      <div className='text-[15px] pt-5'>
        <h4 className='text-base mb-[15px] text-white font-bold!'>Общий:</h4>
        <ScoreboardItem
          isTotal
          value={gameSession?.totalScore}
          logo='/images/total-coins.png'
          label='GeekCoins'
        />
      </div>
    </>
  )
}
