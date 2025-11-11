import Image from 'next/image'

export function PlayerInfo() {
  return (
    <div className='rounded bg-[#212121] p-2 mt-4 flex items-center gap-2.5'>
      <div className='w-[28px] h-[28px] bg-white rounded-full border border-[#F5D91F] py-[5px] pl-[6.75px] pr-[7.75px]'>
        <Image
          src='/images/yellow-logo.svg'
          alt='player logo'
          width={13.5}
          height={18}
        />
      </div>
      {'Codeinee'}
    </div>
  )
}
