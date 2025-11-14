import Image from 'next/image'
import { cn } from '@/shared/lib/utils'

interface Props {
  isTotal?: boolean
  label: string
  value: number
  logo: string
}

export function ScoreboardItem({ isTotal, label, value, logo }: Props) {
  return (
    <div className='w-full flex items-center justify-between'>
      <div className='flex items-center gap-2.5 text-white'>
        <Image width={isTotal ? 72 : 30} height={30} src={logo} alt={label} />
        <p>{label}</p>
      </div>
      <p
        className={cn(
          isTotal && 'text-primary!',
          'text-white text-base font-medium',
        )}
      >
        {value || 0}
      </p>
    </div>
  )
}
