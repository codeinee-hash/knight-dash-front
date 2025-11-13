import { TimeModeCard } from '@/widgets/time-mode-list/ui/time-mode-card'

const timeModes = [
  { imgSrc: '/images/bullet-mode.svg', mode: 'Пуля', timer: '15' },
  { imgSrc: '/images/blitz-mode.svg', mode: 'Блиц', timer: '30' },
  { imgSrc: '/images/rapid-mode.svg', mode: 'Рапид', timer: '60' },
]

export function TimeModeList() {
  return (
    <div className='flex items-center gap-5 max-md:flex-col max-md:pb-[100px]'>
      {timeModes.map((timeMode) => (
        <TimeModeCard
          key={timeMode.mode}
          mode={timeMode.mode}
          imgSrc={timeMode.imgSrc}
          timer={timeMode.timer}
        />
      ))}
    </div>
  )
}
