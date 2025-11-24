import { APP_ROUTES } from '@/shared/config/routes.config'

export const sidebarItems = [
  {
    icon: '/images/Pictograms.svg',
    label: 'Один игрок',
    href: APP_ROUTES.soloGame(),
    private: true,
  },
  {
    icon: '/images/Duel.svg',
    label: 'Два игрока',
    href: APP_ROUTES.multiplayerGame(),
    private: true,
  },
  {
    icon: '/images/Time-mode.svg',
    label: 'Режимы времени',
    href: APP_ROUTES.timeMode(),
    private: false,
  },
  {
    icon: '/images/Leaderboard.svg',
    label: 'Таблица лидеров',
    href: APP_ROUTES.leaderboard(),
    private: false,
  },
  {
    icon: '/images/Game-rules.svg',
    label: 'Правила игры',
    href: APP_ROUTES.gameRules(),
    private: false,
  },
  {
    icon: '/images/Settings.svg',
    label: 'Профиль',
    href: APP_ROUTES.profile(),
    private: true,
  },
]
