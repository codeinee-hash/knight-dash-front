'use client'

import { Card, CardContent } from '@/shared/ui/kit/card'

const gameRules = [
  'Управляйте шахматным конём и собирайте GeekCoin на игровом поле!',
  'Делайте ходы конём только по правилам шахмат (буквой "Г").',
  'Ваша цель — набрать максимум очков, собирая GeekCoin за отведённое время.',
  'Чем больше GeekCoin соберёте, тем выше ваш рекорд в таблице лидеров!',
]

export function GameRulesList() {
  return (
    <div className='flex flex-col gap-6'>
      {gameRules.map((rule, idx) => (
        <Card
          key={idx}
          className='border border-[#494949] rounded-[8px] bg-[rgba(57,57,57,0.7)] py-5 px-2 w-full flex flex-col text-white hover:translate-y-[-2px] transition'
        >
          <CardContent className='text-white text-base font-medium'>
            <span className='text-primary'>{idx + 1}</span>. {rule}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
