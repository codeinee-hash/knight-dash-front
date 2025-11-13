'use client'

import { Card, CardContent } from '@/shared/ui/kit/card'
import Image from 'next/image'
import { Button } from '@/shared/ui/kit/button'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/shared/config/routes.config'

export function TimeModeCard({
  mode,
  timer,
  imgSrc,
}: {
  mode: string
  imgSrc: string
  timer: string
}) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`${APP_ROUTES.soloGame()}?timer=${timer}`)
  }

  return (
    <Card className='border border-[#494949] rounded-[8px] bg-[rgba(57,57,57,0.7)] p-5 max-w-[306px] w-full max-md:max-w-full'>
      <CardContent className='w-full flex flex-col items-center text-white'>
        <Image src={imgSrc} alt={mode} width={84} height={84} />
        <p className='text-[24px] font-medium mb-2'>{mode}</p>
        <p className='text-base font-bold mb-5'>{timer} секунд</p>
        <Button
          variant='outline'
          onClick={handleClick}
          className='w-full active:translate-y-[1px] py-3 text-white! text-base font-medium rounded border border-primary cursor-pointer hover:bg-primary/20! transition-colors duration-200'
        >
          Играть
        </Button>
      </CardContent>
    </Card>
  )
}
