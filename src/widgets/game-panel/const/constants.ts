export const gameModeSelectOptions = [
  { value: '15', label: 'Пулька (15 сек)', picture: '/images/bullet-mode.svg' },
  { value: '30', label: 'Блиц (30 сек)', picture: '/images/blitz-mode.svg' },
  { value: '60', label: 'Рапид (60 сек)', picture: '/images/rapid-mode.svg' },
]

export const coinConfig = [
  {
    scoreKey: 'score150',
    value: 150,
    logo: '/images/geekcoin 150.svg',
    label: 'GeekCoin 150',
  },
  {
    scoreKey: 'score200',
    value: 200,
    logo: '/images/geekcoin 200.svg',
    label: 'GeekCoin 200',
  },
  {
    scoreKey: 'score250',
    value: 250,
    logo: '/images/geekcoin 250.svg',
    label: 'GeekCoin 250',
  },
  {
    scoreKey: 'score300',
    value: 300,
    logo: '/images/geekcoin 300.svg',
    label: 'GeekCoin 300',
  },
  {
    scoreKey: 'score350',
    value: 350,
    logo: '/images/geekcoin 350.svg',
    label: 'GeekCoin 350',
  },
] as const
