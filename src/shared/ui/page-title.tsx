import Image from 'next/image'

export function PageTitle({ title, img }: { title: string; img: string }) {
  return (
    <div className='flex items-center gap-5 max-sm:gap-3 mb-8 max-sm:mb-3'>
      <Image
        src={img}
        alt={title}
        width={80}
        height={80}
        className='max-sm:w-14! max-sm:h-14!'
      />
      <h2 className='text-white text-[28px] font-bold max-sm:text-[20px]'>
        {title}
      </h2>
    </div>
  )
}
