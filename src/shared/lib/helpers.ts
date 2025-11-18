export const formatTime = (seconds: number): string => {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
}

export function getTimeModeImage(mode: number): string {
  return (
    {
      15: '/images/bullet-mode.svg',
      30: '/images/blitz-mode.svg',
      60: '/images/rapid-mode.svg',
    }[mode] ?? '/images/blitz-mode.svg'
  )
}
