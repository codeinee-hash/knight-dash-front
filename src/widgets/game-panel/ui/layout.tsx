interface Props {
  gameIsOn?: boolean
  timer: React.ReactNode
  action: React.ReactNode
  scoreboard: React.ReactNode
}

export function Layout({ timer, gameIsOn, action, scoreboard }: Props) {
  return (
    <aside className='w-[700px] max-w-full mx-auto p-5 rounded-[16px] lg:rounded-r-none lg:rounded-l-[16px] bg-[#393939] max-h-[740px] h-full flex flex-col gap-5'>
      {timer}

      {gameIsOn && (
        <h3 className='text-white max-[510px]:hidden font-bold'>
          {'РЕЗУЛЬТАТЫ:'}
        </h3>
      )}

      {action && !gameIsOn && action}
      {scoreboard}
    </aside>
  )
}
