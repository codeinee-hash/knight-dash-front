import { APP_ROUTES } from '@/shared/config/routes.config'

export const sidebarItems = [
  {
    icon: '/images/Pictograms.svg',
    label: 'Один игрок',
    href: APP_ROUTES.soloGame(),
  },
  {
    icon: '/images/Duel.svg',
    label: 'Два игрока',
    href: APP_ROUTES.multiplayerGame(),
  },
  {
    icon: '/images/Time-mode.svg',
    label: 'Режимы времени',
    href: APP_ROUTES.timeMode(),
  },
  {
    icon: '/images/Leaderboard.svg',
    label: 'Таблица лидеров',
    href: APP_ROUTES.leaderboard(),
  },
  {
    icon: '/images/Game-rules.svg',
    label: 'Правила игры',
    href: APP_ROUTES.gameRules(),
  },
  {
    icon: '/images/Settings.svg',
    label: 'Профиль',
    href: APP_ROUTES.profile(),
  },
]
