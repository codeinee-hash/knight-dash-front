import Image from 'next/image'

interface Props {
  title: string
  picture: string
}

export function LeaderboardTableInfo({ title, picture }: Props) {
  return (
    <div className='flex flex-col items-center mb-5'>
      <Image
        src={picture}
        alt='bullet mode'
        width={84}
        height={84}
        className='max-sm:w-[54px]! max-sm:h-[54px]!'
      />
      <h4 className='text-white font-bold text-[24px] max-sm:text-[20px]'>
        {title}
      </h4>
    </div>
  )
}
