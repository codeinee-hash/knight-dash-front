export function GameLayout({
  pageHeader,
  gameBoard,
  gamePanel,
  gameResults,
}: {
  pageHeader: React.ReactNode
  gameBoard: React.ReactNode
  gamePanel: React.ReactNode
  gameResults: React.ReactNode
}) {
  return (
    <>
      <div className='py-10 px-[15px] flex justify-center flex-col items-center gap-4 lg:px-0 lg:flex-row lg:justify-between lg:items-start lg:gap-10'>
        <div className='flex-1 flex justify-center w-full'>
          <div className='max-w-[600px] w-full'>
            {pageHeader}
            <div className='flex justify-center'>{gameBoard}</div>
          </div>
        </div>
        <div className='lg:max-w-[330px] w-full'>{gamePanel}</div>
      </div>
      {gameResults}
    </>
  )
}
