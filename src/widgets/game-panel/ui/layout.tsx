interface Props {
  gameIsOn?: boolean
  timer: React.ReactNode
  action: React.ReactNode
  scoreboard: React.ReactNode
}

export function Layout({ timer, gameIsOn, action, scoreboard }: Props) {
  return (
    <aside className='max-w-[600px] lg:max-w-[330px] w-full p-5 rounded-l-[16px] bg-[#393939] max-h-[740px] h-full flex flex-col gap-5'>
      {timer}

      {gameIsOn && (
        <h3 className='text-white max-[510px]:hidden'>{'РЕЗУЛЬТАТЫ:'}</h3>
      )}

      {action && action}
      {scoreboard}
    </aside>
  )
}
