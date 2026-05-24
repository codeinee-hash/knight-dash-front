'use client'

import React from 'react'

import { cn } from '@/shared/lib/utils'

export type BoardCellData = {
  id: string
  x: number
  y: number
  color: 'black' | 'white' | string
  figure: {
    color: string
    name: string
    logo: string
  } | null
  coin: {
    nominal: number
    logo: string
  } | null
  available: boolean
}

function GameBoardCell({
  cell,
  onClick,
  selected,
  available,
}: {
  cell: BoardCellData
  selected: boolean
  available: boolean
  onClick: (cell: BoardCellData) => void
}) {

  const cellStyles = {
    base: 'w-[60px] h-[60px] flex items-center justify-center rounded-[3px] cursor-pointer max-[510px]:w-[44px] max-[510px]:h-[44px] max-[390px]:w-[36px] max-[390px]:h-[36px]',
    selected: 'border-2 border-primary',
    black: 'bg-gradient-to-b from-[#868686] to-[#000000z]',
    white: 'bg-gradient-to-b from-[#ffffff] to-[#d2d2d2]',
    availableWithCoin:
      'border-2 border-primary bg-gradient-to-b from-[#ffffff] to-[#fffdad]',
  }

  return (
    <div
      className={cn(
        cellStyles[cell.color as keyof typeof cellStyles],
        cellStyles.base,
        selected && cellStyles.selected,
        available && cell.coin && cellStyles.availableWithCoin,
      )}
      onClick={() => onClick(cell)}
    >
      {!cell.coin && available && (
        <div className='w-[24px] h-[24px] rounded-full bg-[#fff193] max-[510px]:w-[14px] max-[510px]:h-[14px]' />
      )}

      {cell.figure?.logo && (
        <img
          src={cell.figure.logo}
          alt={`${cell.figure.color}-${cell.figure.name}`}
          width={56}
          height={56}
          className='relative max-[510px]:w-[38px]! max-[510px]:h-[38px]!'
        />
      )}

      {cell.coin?.logo && (
        <img
          src={cell.coin.logo}
          alt={`coin-${cell.coin.nominal}`}
          width={40}
          height={40}
          className='max-[510px]:w-[26px]! max-[510px]:h-[26px]!'
        />
      )}
    </div>
  )
}

export default React.memo(GameBoardCell)
